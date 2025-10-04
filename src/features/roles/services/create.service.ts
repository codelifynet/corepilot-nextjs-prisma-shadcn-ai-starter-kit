import { prisma } from "@/lib/prisma";
import { roleExists } from "./get.service";
import type { ServiceResponse } from "@/types/api";
import { errorResponse, safeAsync } from "@/utils/error-handler";

/**
 * Create a new role with new permission structure
 */
export const createRole = async (data: {
	name: string;
	description?: string;
	isActive?: boolean;
	isSystem?: boolean;
	permissions?: Array<{
		entity: string;
		field: string;
		action: string;
		maskType?: string;
	}>;
}): Promise<ServiceResponse<any>> => {
	return safeAsync(async () => {
		// Check if role name already exists
		const exists = await roleExists(data.name);
		if (exists) {
			const error = await errorResponse.conflict(
				"Role with this name already exists",
				{ roleName: data.name }
			);
			throw error.error;
		}

		const { permissions, ...roleData } = data;

		// Create role first
		const role = await prisma.role.create({
			data: roleData,
			include: {
				permissions: true,
				_count: {
					select: {
						userRoles: true,
						permissions: true,
					},
				},
			},
		});

		// Create permissions if provided
		if (permissions && permissions.length > 0) {
			await prisma.permission.createMany({
				data: permissions.map(permission => ({
					entity: permission.entity,
					field: permission.field,
					action: permission.action,
					maskType: permission.maskType || "none",
					roleId: role.id,
				})),
			});

			// Fetch the role again with permissions
			const roleWithPermissions = await prisma.role.findUnique({
				where: { id: role.id },
				include: {
					permissions: true,
					_count: {
						select: {
							userRoles: true,
							permissions: true,
						},
					},
				},
			});

			return roleWithPermissions;
		}

		return role;
	});
};

/**
 * Create role with permission names instead of IDs
 */
export const createRoleWithPermissionNames = async (data: {
	name: string;
	description?: string;
	isActive?: boolean;
	isSystem?: boolean;
	permissionNames?: string[];
}): Promise<ServiceResponse<any>> => {
	return safeAsync(async () => {
		// Check if role name already exists
		const exists = await roleExists(data.name);
		if (exists) {
			const error = await errorResponse.conflict(
				"Role with this name already exists",
				{ roleName: data.name }
			);
			throw error.error;
		}

		const { permissionNames, ...roleData } = data;

		// Get permission IDs from names if provided
		let permissionIds: string[] = [];
		if (permissionNames && permissionNames.length > 0) {
			const permissions = await prisma.permission.findMany({
				where: {
					entity: { in: permissionNames },
				},
				select: { id: true, entity: true },
			});

			const foundPermissionNames = permissions.map((p) => p.entity);
			const missingPermissions = permissionNames.filter(
				(name) => !foundPermissionNames.includes(name),
			);

			if (missingPermissions.length > 0) {
				const error = await errorResponse.notFound(
					`Permissions not found: ${missingPermissions.join(", ")}`,
					{ missingPermissions }
				);
				throw error.error;
			}

			permissionIds = permissions.map((p) => p.id);
		}

		// Create role with permissions
		const role = await prisma.role.create({
			data: {
				...roleData,
				permissions:
					permissionIds.length > 0
						? {
							connect: permissionIds.map((id) => ({ id })),
						}
						: undefined,
			},
			include: {
				permissions: true,
				_count: {
					select: {
						userRoles: true,
						permissions: true,
					},
				},
			},
		});

		return role;
	});
};

/**
 * Create multiple roles in batch
 */
export const createRolesBatch = async (
	roles: Array<{
		name: string;
		description?: string;
		isActive?: boolean;
		isSystem?: boolean;
	}>,
): Promise<ServiceResponse<any>> => {
	return safeAsync(async () => {
		// Check for duplicate names in the batch
		const names = roles.map((r) => r.name);
		const duplicates = names.filter(
			(name, index) => names.indexOf(name) !== index,
		);
		if (duplicates.length > 0) {
			const error = await errorResponse.badRequest(`Duplicate role names in batch: ${duplicates.join(", ")}`, { duplicates });
			throw error.error;
		}

		// Check if any role names already exist
		const existingRoles = await prisma.role.findMany({
			where: {
				name: { in: names },
			},
			select: { name: true },
		});

		if (existingRoles.length > 0) {
			const existingNames = existingRoles.map((r) => r.name);
			const error = await errorResponse.conflict(`Roles already exist: ${existingNames.join(", ")}`, { existingNames });
			throw error.error;
		}

		// Create all roles
		const createdRoles = await prisma.role.createMany({
			data: roles,
			skipDuplicates: true,
		});

		return createdRoles;
	});
};

/**
 * Create a role from template
 */
export const createRoleFromTemplate = async (
	templateRoleId: string,
	newRoleName: string,
	description?: string,
): Promise<ServiceResponse<any>> => {
	return safeAsync(async () => {
		// Check if new role name already exists
		const exists = await roleExists(newRoleName);
		if (exists) {
			const error = await errorResponse.conflict("Role with this name already exists", { roleName: newRoleName });
			throw error.error;
		}

		// Get template role with permissions
		const templateRole = await prisma.role.findUnique({
			where: { id: templateRoleId },
			include: {
				permissions: true,
			},
		});

		if (!templateRole) {
			const error = await errorResponse.notFound("Template role not found", { templateRoleId });
			throw error.error;
		}

		// Create new role with same permissions as template
		const newRole = await prisma.role.create({
			data: {
				name: newRoleName,
				description: description || `Copy of ${templateRole.name}`,
				isActive: true,
				isSystem: false, // Copied roles are never system roles
				permissions: {
					connect: templateRole.permissions.map((p) => ({ id: p.id })),
				},
			},
			include: {
				permissions: true,
				_count: {
					select: {
						userRoles: true,
						permissions: true,
					},
				},
			},
		});

		return newRole;
	});
};

/**
 * Create default system roles
 */
export const createDefaultRoles = async (): Promise<ServiceResponse<any[]>> => {
	return safeAsync(async () => {
		const defaultRoles = [
			{
				name: "admin",
				description: "System administrator with full access",
				isActive: true,
				isSystem: true,
			},
			{
				name: "user",
				description: "Standard user with basic permissions",
				isActive: true,
				isSystem: true,
			},
			{
				name: "moderator",
				description: "Content moderator with limited admin access",
				isActive: true,
				isSystem: true,
			},
		];

		const createdRoles = [];

		for (const roleData of defaultRoles) {
			const exists = await roleExists(roleData.name);
			if (!exists) {
				const role = await prisma.role.create({
					data: roleData,
					include: {
						permissions: true,
						_count: {
							select: {
								userRoles: true,
								permissions: true,
							},
						},
					},
				});
				createdRoles.push(role);
			}
		}

		return createdRoles;
	});
};
