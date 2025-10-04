import { PrismaClient } from "@/generated/prisma";
import {
	ENTITIES,
	ACTIONS,
	MASK_TYPES,
	type PermissionDefinition,
} from "@/constants/permissions";

const prisma = new PrismaClient();

/**
 * Generate all possible permissions for the system
 * Creates permissions for each entity with all available actions
 */
function generateAllPermissions(): PermissionDefinition[] {
	const permissions: PermissionDefinition[] = [];

	// Create basic permissions for each entity
	Object.values(ENTITIES).forEach((entity) => {
		// Basic CRUD operations
		const basicActions = [
			ACTIONS.CREATE,
			ACTIONS.READ,
			ACTIONS.UPDATE,
			ACTIONS.DELETE,
			ACTIONS.LIST,
		];

		basicActions.forEach((action) => {
			permissions.push({
				entity,
				field: "*", // All fields
				action,
				maskType: MASK_TYPES.NONE,
			});
		});

		// Special operations
		const specialActions = [
			ACTIONS.EXPORT,
			ACTIONS.IMPORT,
			ACTIONS.APPROVE,
			ACTIONS.REJECT,
			ACTIONS.PUBLISH,
			ACTIONS.ARCHIVE,
			ACTIONS.MANAGE,
		];

		specialActions.forEach((action) => {
			permissions.push({
				entity,
				field: "*",
				action,
				maskType: MASK_TYPES.NONE,
			});
		});
	});

	// Add field-specific permissions with masking
	Object.values(ENTITIES).forEach((entity) => {
		// Sensitive fields that might need masking
		const sensitiveFields = ["email", "phone", "salary", "password"];

		sensitiveFields.forEach((field) => {
			Object.values(MASK_TYPES).forEach((maskType) => {
				if (maskType !== MASK_TYPES.NONE) {
					permissions.push({
						entity,
						field,
						action: ACTIONS.READ,
						maskType,
					});
				}
			});
		});
	});

	return permissions;
}

/**
 * Enrich permission with display information
 */
function enrichPermission(permission: PermissionDefinition) {
	const entityDisplayNames: Record<string, string> = {
		[ENTITIES.USER]: "User Management",
		[ENTITIES.ROLE]: "Role Management",
		[ENTITIES.PERMISSION]: "Permission Management",
		[ENTITIES.PRODUCT]: "Product Management",
		[ENTITIES.ORDER]: "Order Management",
		[ENTITIES.CUSTOMER]: "Customer Management",
		[ENTITIES.CAMPAIGN]: "Campaign Management",
		[ENTITIES.BLOG]: "Blog Management",
		[ENTITIES.CATEGORY]: "Category Management",
		[ENTITIES.TAG]: "Tag Management",
		[ENTITIES.COMMENT]: "Comment Management",
		[ENTITIES.MEDIA]: "Media Management",
		[ENTITIES.SETTINGS]: "Settings Management",
		[ENTITIES.ANALYTICS]: "Analytics Management",
		[ENTITIES.NOTIFICATION]: "Notification Management",
		[ENTITIES.SUPPORT]: "Support Management",
		[ENTITIES.FINANCE]: "Finance Management",
	};

	const actionDisplayNames: Record<string, string> = {
		[ACTIONS.CREATE]: "Create",
		[ACTIONS.READ]: "Read",
		[ACTIONS.UPDATE]: "Update",
		[ACTIONS.DELETE]: "Delete",
		[ACTIONS.LIST]: "List",
		[ACTIONS.EXPORT]: "Export",
		[ACTIONS.IMPORT]: "Import",
		[ACTIONS.APPROVE]: "Approve",
		[ACTIONS.REJECT]: "Reject",
		[ACTIONS.PUBLISH]: "Publish",
		[ACTIONS.ARCHIVE]: "Archive",
		[ACTIONS.MANAGE]: "Manage",
	};

	const maskDisplayNames: Record<string, string> = {
		[MASK_TYPES.NONE]: "No Masking",
		[MASK_TYPES.PARTIAL]: "Partial Masking",
		[MASK_TYPES.HIDDEN]: "Hidden Masking",
		[MASK_TYPES.ENCRYPTED]: "Encrypted Masking",
		[MASK_TYPES.REDACTED]: "Redacted Masking",
	};

	const entityDisplay =
		entityDisplayNames[permission.entity] || permission.entity;
	const actionDisplay =
		actionDisplayNames[permission.action] || permission.action;
	const maskDisplay =
		maskDisplayNames[permission.maskType as keyof typeof maskDisplayNames] ||
		permission.maskType;

	let displayName = `${entityDisplay} - ${actionDisplay}`;
	let description = `${actionDisplay} permission for ${entityDisplay}`;

	if (permission.field !== "*") {
		displayName += ` (${permission.field})`;
		description += ` on ${permission.field} field`;
	}

	if (permission.maskType !== MASK_TYPES.NONE) {
		displayName += ` [${maskDisplay}]`;
		description += ` with ${maskDisplay?.toLowerCase()}`;
	}

	return {
		...permission,
		displayName,
		description,
	};
}

/**
 * Seed all permissions into the database
 */
export async function seedPermissions() {
	console.log("🔐 Permissions seeding started...");

	try {
		// Clear existing permissions in development
		if (process.env.NODE_ENV !== "production") {
			console.log("🧹 Clearing existing permissions...");
			await prisma.permission.deleteMany({});
			console.log("✅ Existing permissions cleared");
		}

		// Generate all permissions
		const allPermissions = generateAllPermissions();
		console.log(`📋 Generated ${allPermissions.length} permissions`);

		// Create permissions in database without role assignment
		const createdPermissions = [];
		for (const permission of allPermissions) {
			const enrichedPermission = enrichPermission(permission);

			// Create permission without role assignment initially
			// Roles will assign permissions to themselves during role seeding
			const created = await prisma.permission.create({
				data: {
					entity: enrichedPermission.entity,
					field: enrichedPermission.field,
					action: enrichedPermission.action,
					maskType: enrichedPermission.maskType,
					displayName: enrichedPermission.displayName,
					description: enrichedPermission.description,
					// Create with a default role that will be updated later
					roleId: "default-temp-role",
				},
			});

			createdPermissions.push(created);
		}

		console.log(
			`✅ Successfully created ${createdPermissions.length} permissions`,
		);
		return createdPermissions;
	} catch (error) {
		console.error("❌ Error seeding permissions:", error);
		throw error;
	}
}

// Allow running this seed file directly
if (require.main === module) {
	seedPermissions()
		.catch((e) => {
			console.error(e);
			process.exit(1);
		})
		.finally(async () => {
			await prisma.$disconnect();
		});
}
