// RBAC Authorization Utilities
// Field-level authorization and permission checking for Role-Based Access Control

import { prisma } from "@/lib/prisma";
import {
	ENTITIES,
	ACTIONS,
	MASK_TYPES,
	type EntityType,
	type ActionType,
	type MaskType,
} from "@/constants/permissions";
import { applyObjectMasking } from "@/lib/field-masking";

/**
 * User permission context for authorization
 */
export interface UserPermissionContext {
	userId: string;
	roleId?: string | null;
	roles?: Array<{
		id: string;
		name: string;
		permissions: Array<{
			entity: string;
			field: string;
			action: string;
			maskType: string | null;
		}>;
	}>;
}

/**
 * Permission check result
 */
export interface PermissionResult {
	allowed: boolean;
	maskType?: MaskType | null;
	reason?: string;
}

/**
 * Field permission information
 */
export interface FieldPermission {
	field: string;
	canRead: boolean;
	canWrite: boolean;
	maskType: MaskType | null;
}

/**
 * Get user's complete permission context from database
 * @param userId - User ID to get permissions for
 * @returns User permission context with roles and permissions
 */
export async function getUserPermissionContext(
	userId: string,
): Promise<UserPermissionContext | null> {
	try {
		const user = await prisma.user.findUnique({
			where: { id: userId },
			include: {
				role: {
					include: {
						permissions: true,
					},
				},
				userRoles: {
					include: {
						role: {
							include: {
								permissions: true,
							},
						},
					},
				},
			},
		});

		if (!user) {
			return null;
		}

		// Combine primary role and additional roles
		const roles = [];

		// Add primary role if exists
		if (user.role) {
			roles.push({
				id: user.role.id,
				name: user.role.name,
				permissions: user.role.permissions,
			});
		}

		// Add additional roles from UserRole junction table
		for (const userRole of user.userRoles) {
			if (userRole.role && !roles.find((r) => r.id === userRole.role.id)) {
				roles.push({
					id: userRole.role.id,
					name: userRole.role.name,
					permissions: userRole.role.permissions,
				});
			}
		}

		return {
			userId: user.id,
			roleId: user.roleId,
			roles,
		};
	} catch (error) {
		console.error("Error getting user permission context:", error);
		return null;
	}
}

/**
 * Check if user has permission for a specific action on an entity/field
 * @param userContext - User permission context
 * @param entity - Entity name (e.g., 'user', 'product')
 * @param action - Action name (e.g., 'read', 'create')
 * @param field - Field name (optional, '*' for all fields)
 * @returns Permission result with allowed status and mask type
 */
export function checkPermission(
	userContext: UserPermissionContext,
	entity: EntityType,
	action: ActionType,
	field: string = "*",
): PermissionResult {
	if (!userContext.roles || userContext.roles.length === 0) {
		return {
			allowed: false,
			reason: "No roles assigned to user",
		};
	}

	let bestPermission: PermissionResult = {
		allowed: false,
		reason: "No matching permission found",
	};

	// Check all roles for the most permissive access
	for (const role of userContext.roles) {
		for (const permission of role.permissions) {
			// Check if permission matches entity and action
			if (permission.entity === entity && permission.action === action) {
				// Check field match (exact match or wildcard)
				if (
					permission.field === field ||
					permission.field === "*" ||
					field === "*"
				) {
					const maskType = permission.maskType as MaskType | null;

					// If we find a permission with no masking, that's the best we can get
					if (!maskType || maskType === MASK_TYPES.NONE) {
						return {
							allowed: true,
							maskType: MASK_TYPES.NONE,
						};
					}

					// Otherwise, keep the least restrictive masking we've found
					if (
						!bestPermission.allowed ||
						(bestPermission.maskType &&
							isMaskTypeLessRestrictive(maskType, bestPermission.maskType))
					) {
						bestPermission = {
							allowed: true,
							maskType,
						};
					}
				}
			}
		}
	}

	return bestPermission;
}

/**
 * Check if user can perform action on entity
 * @param userContext - User permission context
 * @param entity - Entity name
 * @param action - Action name
 * @returns True if user has permission
 */
export function canPerformAction(
	userContext: UserPermissionContext,
	entity: EntityType,
	action: ActionType,
): boolean {
	const result = checkPermission(userContext, entity, action);
	return result.allowed;
}

/**
 * Get field-level permissions for an entity
 * @param userContext - User permission context
 * @param entity - Entity name
 * @param fields - Array of field names to check
 * @returns Map of field permissions
 */
export function getFieldPermissions(
	userContext: UserPermissionContext,
	entity: EntityType,
	fields: string[],
): Record<string, FieldPermission> {
	const fieldPermissions: Record<string, FieldPermission> = {};

	for (const field of fields) {
		const readPermission = checkPermission(
			userContext,
			entity,
			ACTIONS.READ,
			field,
		);
		const writePermission = checkPermission(
			userContext,
			entity,
			ACTIONS.UPDATE,
			field,
		);

		fieldPermissions[field] = {
			field,
			canRead: readPermission.allowed,
			canWrite: writePermission.allowed,
			maskType: readPermission.maskType || null,
		};
	}

	return fieldPermissions;
}

/**
 * Apply field-level authorization to data object
 * @param data - Data object to authorize
 * @param userContext - User permission context
 * @param entity - Entity name
 * @param action - Action being performed (usually 'read')
 * @returns Authorized and masked data
 */
export function authorizeAndMaskData<T extends Record<string, unknown>>(
	data: T,
	userContext: UserPermissionContext,
	entity: EntityType,
): Partial<T> {
	const fields = Object.keys(data);
	const fieldPermissions = getFieldPermissions(userContext, entity, fields);

	// Remove fields user cannot access
	const authorizedData = { ...data };
	for (const [fieldName, permission] of Object.entries(fieldPermissions)) {
		if (!permission.canRead) {
			delete authorizedData[fieldName];
		}
	}

	// Apply masking to remaining fields
	const maskingMap = Object.fromEntries(
		Object.entries(fieldPermissions)
			.filter(([, permission]) => permission.canRead)
			.map(([fieldName, permission]) => [
				fieldName,
				{
					maskType: permission.maskType,
					fieldType: getFieldType(entity, fieldName),
				},
			]),
	);

	return applyObjectMasking(authorizedData, maskingMap);
}

/**
 * Apply field-level authorization to array of data objects
 * @param dataArray - Array of data objects
 * @param userContext - User permission context
 * @param entity - Entity name
 * @param action - Action being performed
 * @returns Array of authorized and masked data
 */
export function authorizeAndMaskArray<T extends Record<string, unknown>>(
	dataArray: T[],
	userContext: UserPermissionContext,
	entity: EntityType,
): Partial<T>[] {
	if (dataArray.length === 0) {
		return [];
	}

	// Use first object to determine fields (assuming consistent structure)
	const fields = Object.keys(dataArray[0]);
	const fieldPermissions = getFieldPermissions(userContext, entity, fields);

	// Create masking map
	const maskingMap = Object.fromEntries(
		Object.entries(fieldPermissions)
			.filter(([, permission]) => permission.canRead)
			.map(([fieldName, permission]) => [
				fieldName,
				{
					maskType: permission.maskType,
					fieldType: getFieldType(entity, fieldName),
				},
			]),
	);

	// Apply authorization and masking to each item
	return dataArray.map((item) => {
		// Remove unauthorized fields
		const authorizedItem = { ...item };
		for (const [fieldName, permission] of Object.entries(fieldPermissions)) {
			if (!permission.canRead) {
				delete authorizedItem[fieldName];
			}
		}

		// Apply masking
		return applyObjectMasking(authorizedItem, maskingMap);
	});
}

/**
 * Check if user has permission to access specific resource instance
 * @param userContext - User permission context
 * @param resourceType - Type of resource
 * @param resourceId - ID of specific resource
 * @param action - Action to perform
 * @returns True if user has permission
 */
export async function checkResourcePermission(
	userContext: UserPermissionContext,
	resourceType: string,
	resourceId: string,
	action: ActionType,
): Promise<boolean> {
	try {
		// First check general entity permissions
		const entityPermission = checkPermission(
			userContext,
			resourceType as EntityType,
			action,
		);
		if (entityPermission.allowed) {
			return true;
		}

		// Check specific resource permissions
		const resourcePermission = await prisma.resourcePermission.findFirst({
			where: {
				resourceId,
				resourceType,
				action,
				OR: [
					{ userId: userContext.userId },
					{
						roleId: {
							in: userContext.roles?.map((r) => r.id) || [],
						},
					},
				],
			},
		});

		return !!resourcePermission;
	} catch (error) {
		console.error("Error checking resource permission:", error);
		return false;
	}
}

/**
 * Get field type for specialized masking
 * @param entity - Entity name
 * @param fieldName - Field name
 * @returns Field type for masking
 */
function getFieldType(
	entity: EntityType,
	fieldName: string,
): string | undefined {
	// Define field type mappings for specialized masking
	const fieldTypeMap: Record<string, Record<string, string>> = {
		[ENTITIES.USER]: {
			email: "email",
			phone: "phone",
			address: "address",
			name: "name",
		},
		[ENTITIES.CUSTOMER]: {
			email: "email",
			phone: "phone",
			address: "address",
			name: "name",
			birthDate: "date",
		},
		[ENTITIES.ORDER]: {
			totalAmount: "amount",
			paymentMethod: "credit_card",
		},
		[ENTITIES.PRODUCT]: {
			price: "amount",
			cost: "amount",
		},
		[ENTITIES.FINANCE]: {
			amount: "amount",
		},
	};

	return fieldTypeMap[entity]?.[fieldName];
}

/**
 * Compare mask types to determine which is less restrictive
 * @param maskType1 - First mask type
 * @param maskType2 - Second mask type
 * @returns True if maskType1 is less restrictive than maskType2
 */
function isMaskTypeLessRestrictive(
	maskType1: MaskType,
	maskType2: MaskType,
): boolean {
	const restrictiveness = {
		[MASK_TYPES.NONE]: 0,
		[MASK_TYPES.PARTIAL]: 1,
		[MASK_TYPES.ENCRYPTED]: 2,
		[MASK_TYPES.REDACTED]: 3,
		[MASK_TYPES.HIDDEN]: 4,
	};

	return restrictiveness[maskType1] < restrictiveness[maskType2];
}

/**
 * Middleware function for API route authorization
 * @param userContext - User permission context
 * @param entity - Entity being accessed
 * @param action - Action being performed
 * @returns Authorization result
 */
export function authorizeApiAccess(
	userContext: UserPermissionContext | null,
	entity: EntityType,
	action: ActionType,
): { authorized: boolean; error?: string } {
	if (!userContext) {
		return {
			authorized: false,
			error: "User not authenticated",
		};
	}

	const permission = checkPermission(userContext, entity, action);

	if (!permission.allowed) {
		return {
			authorized: false,
			error: `Insufficient permissions for ${action} on ${entity}`,
		};
	}

	return { authorized: true };
}

/**
 * Create a permission checker function for a specific user
 * @param userId - User ID
 * @returns Function that checks permissions for the user
 */
export async function createUserPermissionChecker(userId: string) {
	const userContext = await getUserPermissionContext(userId);

	if (!userContext) {
		throw new Error("User not found or has no permissions");
	}

	return {
		canPerform: (entity: EntityType, action: ActionType) =>
			canPerformAction(userContext, entity, action),

		checkPermission: (entity: EntityType, action: ActionType, field?: string) =>
			checkPermission(userContext, entity, action, field),

		authorizeData: <T extends Record<string, unknown>>(
			data: T,
			entity: EntityType,
		) => authorizeAndMaskData(data, userContext, entity),

		authorizeArray: <T extends Record<string, unknown>>(
			dataArray: T[],
			entity: EntityType,
		) => authorizeAndMaskArray(dataArray, userContext, entity),

		getFieldPermissions: (entity: EntityType, fields: string[]) =>
			getFieldPermissions(userContext, entity, fields),
	};
}
