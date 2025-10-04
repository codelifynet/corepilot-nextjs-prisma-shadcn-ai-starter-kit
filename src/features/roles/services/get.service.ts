import { prisma } from "@/lib/prisma";
import type { Prisma } from "@/generated/prisma";
import type { RoleFilters } from "../types";

import { errorResponse, safeAsync } from "@/utils/error-handler";
import type { ServiceResponse } from "@/types/api";
/**
 * Get all roles with optional filtering
 */
export const getRoles = async (filters?: RoleFilters): Promise<ServiceResponse<any[]>> => {
	return safeAsync(async () => {
		const where: Prisma.RoleWhereInput = {};

		if (filters?.search) {
			where.OR = [
				{ name: { contains: filters.search, mode: "insensitive" } },
				{ description: { contains: filters.search, mode: "insensitive" } },
			];
		}

		if (filters?.isActive !== undefined) {
			where.isActive = filters.isActive;
		}

		if (filters?.isSystem !== undefined) {
			where.isSystem = filters.isSystem;
		}

		const roles = await prisma.role.findMany({
			where,
			include: {
				permissions: true,
				_count: {
					select: {
						userRoles: true,
						permissions: true,
					},
				},
			},
			orderBy: { createdAt: "desc" },
		});

		return roles;
	});
};

/**
 * Get a single role by ID with full details
 */
export const getRoleById = async (id: string): Promise<ServiceResponse<any>> => {
	return safeAsync(async () => {
		const role = await prisma.role.findUnique({
			where: { id },
			include: {
				permissions: true,
				userRoles: {
					include: {
						user: {
							select: {
								id: true,
								email: true,
								name: true,
							},
						},
					},
				},
				_count: {
					select: {
						userRoles: true,
						permissions: true,
					},
				},
			},
		});

		if (!role) {
			const error = await errorResponse.notFound(
				"Role not found",
				{ roleId: id }
			);
			throw error.error;
		}

		return role;
	});
};

/**
 * Get a role by name
 */
export const getRoleByName = async (name: string) => {
	return await prisma.role.findUnique({
		where: { name },
		include: {
			permissions: true,
		},
	});
};

/**
 * Check if a role exists by name
 */
export const roleExists = async (name: string, excludeId?: string) => {
	const where: Prisma.RoleWhereInput = { name };

	if (excludeId) {
		where.id = { not: excludeId };
	}

	const role = await prisma.role.findFirst({ where });
	return !!role;
};

/**
 * Get active roles only
 */
export const getActiveRoles = async () => {
	return await prisma.role.findMany({
		where: { isActive: true },
		include: {
			permissions: true,
			_count: {
				select: {
					userRoles: true,
					permissions: true,
				},
			},
		},
		orderBy: { name: "asc" },
	});
};

/**
 * Get system roles only
 */
export const getSystemRoles = async () => {
	return await prisma.role.findMany({
		where: { isSystem: true },
		include: {
			permissions: true,
		},
		orderBy: { name: "asc" },
	});
};

/**
 * Get role statistics
 */
export const getRoleStats = async () => {
	const [totalRoles, activeRoles, systemRoles, rolesWithUsers] =
		await Promise.all([
			prisma.role.count(),
			prisma.role.count({ where: { isActive: true } }),
			prisma.role.count({ where: { isSystem: true } }),
			prisma.role.count({
				where: {
					userRoles: {
						some: {},
					},
				},
			}),
		]);

	return {
		totalRoles,
		activeRoles,
		systemRoles,
		rolesWithUsers,
		inactiveRoles: totalRoles - activeRoles,
		customRoles: totalRoles - systemRoles,
	};
};

/**
 * Validate role permissions
 */
export const validateRolePermissions = async (
	roleId: string,
	requiredPermissions: string[],
) => {
	const role = await prisma.role.findUnique({
		where: { id: roleId },
		include: {
			permissions: true,
		},
	});

	if (!role) {
		return { isValid: false, reason: "Role not found" };
	}

	if (!role.isActive) {
		return { isValid: false, reason: "Role is not active" };
	}

	const rolePermissionNames = role.permissions.map(
		(p) => `${p.entity}:${p.action}`,
	);
	const missingPermissions = requiredPermissions.filter(
		(p) => !rolePermissionNames.includes(p),
	);

	if (missingPermissions.length > 0) {
		return {
			isValid: false,
			reason: `Missing permissions: ${missingPermissions.join(", ")}`,
			missingPermissions,
		};
	}

	return { isValid: true };
};

/**
 * Check if role has access to specific resource and action
 */
export const checkRoleAccess = async (
	roleId: string,
	resource: string,
	action: string,
) => {
	const role = await prisma.role.findUnique({
		where: { id: roleId },
		include: {
			permissions: true,
		},
	});

	if (!role || !role.isActive) {
		return false;
	}

	return role.permissions.some(
		(permission) =>
			permission.entity === resource && permission.action === action,
	);
};
