import { prisma } from "@/lib/prisma";
import { roleExists } from "./get.service";
import type { ServiceResponse } from "@/types/api";
import { errorResponse, safeAsync } from "@/utils/error-handler";

/**
 * Update a role
 */
export const updateRole = async (
	id: string,
	data: {
		name?: string;
		description?: string;
		isActive?: boolean;
		isSystem?: boolean;
		permissions?: { entity: string; field: string; action: string; maskType?: string }[];
	},
): Promise<ServiceResponse<any>> => {
	return safeAsync(async () => {
		// Check if role exists
		const existingRole = await prisma.role.findUnique({
			where: { id },
		});

		if (!existingRole) {
			const error = await errorResponse.notFound(
				"Role not found",
				{ roleId: id }
			);
			throw error.error;
		}

		// Check if new name already exists (if name is being changed)
		if (data.name && data.name !== existingRole.name) {
			const nameExists = await roleExists(data.name, id);
			if (nameExists) {
				const error = await errorResponse.conflict(
					`Role with name '${data.name}' already exists`,
					{ roleName: data.name, roleId: id }
				);
				throw error.error;
			}
		}

		// Prevent changing system status of system roles
		if (existingRole.isSystem && data.isSystem === false) {
			const error = await errorResponse.forbidden(
				"Cannot change system status of system roles",
				{ roleId: id, isSystem: existingRole.isSystem }
			);
			throw error.error;
		}

		const { permissions, ...roleData } = data;

		// Update role with permissions if provided
		const updatedRole = await prisma.role.update({
			where: { id },
			data: {
				...roleData,
				permissions: permissions
					? {
						deleteMany: {},
						create: permissions.map((permission) => ({
							entity: permission.entity,
							field: permission.field,
							action: permission.action,
							maskType: permission.maskType || "none",
						})),
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

		return updatedRole;
	});
};

/**
 * Update role permissions
 */
export const updateRolePermissions = async (
	roleId: string,
	permissionIds: string[],
): Promise<ServiceResponse<any>> => {
	return safeAsync(async () => {
		// Check if role exists
		const role = await prisma.role.findUnique({
			where: { id: roleId },
		});

		if (!role) {
			const error = await errorResponse.notFound("Role not found", { roleId });
			throw error.error;
		}

		// Verify all permission IDs exist
		const permissions = await prisma.permission.findMany({
			where: {
				id: { in: permissionIds },
			},
			select: { id: true },
		});

		const foundIds = permissions.map((p) => p.id);
		const missingIds = permissionIds.filter((id) => !foundIds.includes(id));

		if (missingIds.length > 0) {
			const error = await errorResponse.notFound(
				`Permissions not found: ${missingIds.join(", ")}`,
				{ roleId, missingIds }
			);
			throw error.error;
		}

		// Update role permissions
		const updatedRole = await prisma.role.update({
			where: { id: roleId },
			data: {
				permissions: {
					set: permissionIds.map((id) => ({ id })),
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

		return updatedRole;
	});
};

/**
 * Add permissions to role
 */
export const addPermissionsToRole = async (
	roleId: string,
	permissionIds: string[],
): Promise<ServiceResponse<any>> => {
	return safeAsync(async () => {
		// Check if role exists
		const role = await prisma.role.findUnique({
			where: { id: roleId },
			include: {
				permissions: true,
			},
		});

		if (!role) {
			const error = await errorResponse.notFound("Role not found", { roleId });
			throw error.error;
		}

		// Filter out permissions that are already assigned
		const existingPermissionIds = role.permissions.map((p) => p.id);
		const newPermissionIds = permissionIds.filter(
			(id) => !existingPermissionIds.includes(id),
		);

		if (newPermissionIds.length === 0) {
			return role; // No new permissions to add
		}

		// Verify new permission IDs exist
		const permissions = await prisma.permission.findMany({
			where: {
				id: { in: newPermissionIds },
			},
			select: { id: true },
		});

		const foundIds = permissions.map((p) => p.id);
		const missingIds = newPermissionIds.filter((id) => !foundIds.includes(id));

		if (missingIds.length > 0) {
			const error = await errorResponse.notFound(
				`Permissions not found: ${missingIds.join(", ")}`,
				{ roleId, missingIds }
			);
			throw error.error;
		}

		// Add new permissions to role
		const updatedRole = await prisma.role.update({
			where: { id: roleId },
			data: {
				permissions: {
					connect: newPermissionIds.map((id) => ({ id })),
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

		return updatedRole;
	});
};

/**
 * Remove permissions from role
 */
export const removePermissionsFromRole = async (
	roleId: string,
	permissionIds: string[],
): Promise<ServiceResponse<any>> => {
	return safeAsync(async () => {
		// Check if role exists
		const role = await prisma.role.findUnique({
			where: { id: roleId },
			include: {
				permissions: true,
			},
		});

		if (!role) {
			const error = await errorResponse.notFound("Role not found", { roleId });
			throw error.error;
		}

		// Filter permissions that are actually assigned to the role
		const existingPermissionIds = role.permissions.map((p) => p.id);
		const permissionsToRemove = permissionIds.filter((id) =>
			existingPermissionIds.includes(id),
		);

		if (permissionsToRemove.length === 0) {
			return role; // No permissions to remove
		}

		// Remove permissions from role
		const updatedRole = await prisma.role.update({
			where: { id: roleId },
			data: {
				permissions: {
					disconnect: permissionsToRemove.map((id) => ({ id })),
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

		return updatedRole;
	});
};

/**
 * Activate role
 */
export const activateRole = async (roleId: string) => {
	return await updateRole(roleId, { isActive: true });
};

/**
 * Deactivate role
 */
export const deactivateRole = async (roleId: string): Promise<ServiceResponse<any>> => {
	return safeAsync(async () => {
		// Check if role has active users
		const activeUserRoles = await prisma.userRole.count({
			where: {
				roleId,
			},
		});

		if (activeUserRoles > 0) {
			const error = await errorResponse.conflict(
				`Cannot deactivate role. ${activeUserRoles} users are currently assigned to this role.`,
				{ roleId, activeUserRoles }
			);
			throw error.error;
		}

		const result = await updateRole(roleId, { isActive: false });
		if (!result.success) {
			throw result.error;
		}
		return result.data;
	});
};

/**
 * Bulk update roles
 */
export const bulkUpdateRoles = async (
	updates: Array<{
		id: string;
		data: {
			name?: string;
			description?: string;
			isActive?: boolean;
		};
	}>,
) => {
	const results = [];

	for (const update of updates) {
		try {
			const updatedRole = await updateRole(update.id, update.data);
			results.push({ success: true, role: updatedRole });
		} catch (error) {
			results.push({
				success: false,
				id: update.id,
				error: error instanceof Error ? error.message : "Unknown error",
			});
		}
	}

	return results;
};

/**
 * Sync role permissions with permission names
 */
export const syncRolePermissionsByNames = async (
	roleId: string,
	permissionNames: string[],
): Promise<ServiceResponse<any>> => {
	return safeAsync(async () => {
		// Get permission IDs from names
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
			const error = await errorResponse.notFound(`Permissions not found: ${missingPermissions.join(", ")}`, { missingPermissions });
			throw error.error;
		}

		const permissionIds = permissions.map((p) => p.id);
		const result = await updateRolePermissions(roleId, permissionIds);
		if (!result.success) {
			throw result.error;
		}
		return result.data;
	});
};
