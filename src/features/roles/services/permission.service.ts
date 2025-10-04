import { prisma } from "@/lib/prisma";

/**
 * Get all permissions with optional filtering
 */
export const getPermissions = async (filters?: {
	search?: string;
	entity?: string;
	action?: string;
	roleId?: string;
}) => {
	const where: any = {};

	if (filters?.search) {
		where.OR = [
			{ entity: { contains: filters.search, mode: "insensitive" } },
			{ action: { contains: filters.search, mode: "insensitive" } },
			{ field: { contains: filters.search, mode: "insensitive" } },
		];
	}

	if (filters?.entity) {
		where.entity = { contains: filters.entity, mode: "insensitive" };
	}

	if (filters?.action) {
		where.action = { contains: filters.action, mode: "insensitive" };
	}

	if (filters?.roleId) {
		where.roleId = filters.roleId;
	}

	return await prisma.permission.findMany({
		where,
		include: {
			role: {
				select: {
					id: true,
					name: true,
					isActive: true,
				},
			},
		},
		orderBy: [{ entity: "asc" }, { action: "asc" }],
	});
};

/**
 * Get permission by ID
 */
export const getPermissionById = async (id: string) => {
	return await prisma.permission.findUnique({
		where: { id },
		include: {
			role: {
				select: {
					id: true,
					name: true,
					isActive: true,
				},
			},
		},
	});
};

/**
 * Get permissions by entity
 */
export const getPermissionsByEntity = async (entity: string) => {
	return await prisma.permission.findMany({
		where: { entity },
		include: {
			role: {
				select: {
					id: true,
					name: true,
					isActive: true,
				},
			},
		},
		orderBy: { action: "asc" },
	});
};

/**
 * Get permissions by action
 */
export const getPermissionsByAction = async (action: string) => {
	return await prisma.permission.findMany({
		where: { action },
		include: {
			role: {
				select: {
					id: true,
					name: true,
					isActive: true,
				},
			},
		},
		orderBy: { entity: "asc" },
	});
};

/**
 * Get permissions by role ID
 */
export const getPermissionsByRole = async (roleId: string) => {
	return await prisma.permission.findMany({
		where: {
			roleId: roleId,
		},
		include: {
			role: {
				select: {
					id: true,
					name: true,
					isActive: true,
				},
			},
		},
		orderBy: [{ entity: "asc" }, { action: "asc" }],
	});
};

/**
 * Check if permission exists by entity, field and action
 */
export const permissionExists = async (
	entity: string,
	field: string,
	action: string,
	roleId: string,
) => {
	const permission = await prisma.permission.findFirst({
		where: {
			entity,
			field,
			action,
			roleId,
		},
		select: { id: true },
	});

	return !!permission;
};

/**
 * Get unique entities from permissions
 */
export const getUniqueEntities = async () => {
	const result = await prisma.permission.findMany({
		select: { entity: true },
		distinct: ["entity"],
		orderBy: { entity: "asc" },
	});

	return result.map((p) => p.entity);
};

/**
 * Get unique actions from permissions
 */
export const getUniqueActions = async () => {
	const result = await prisma.permission.findMany({
		select: { action: true },
		distinct: ["action"],
		orderBy: { action: "asc" },
	});

	return result.map((p) => p.action);
};

/**
 * Get permissions grouped by entity
 */
export const getPermissionsGroupedByEntity = async () => {
	const permissions = await prisma.permission.findMany({
		include: {
			role: {
				select: {
					id: true,
					name: true,
					isActive: true,
				},
			},
		},
		orderBy: [{ entity: "asc" }, { action: "asc" }],
	});

	const grouped = permissions.reduce(
		(acc, permission) => {
			if (!acc[permission.entity]) {
				acc[permission.entity] = [];
			}
			acc[permission.entity].push(permission);
			return acc;
		},
		{} as Record<string, typeof permissions>,
	);

	return grouped;
};

/**
 * Get unique permissions for permission selector (without role association)
 */
export const getUniquePermissionsForSelector = async () => {
	const permissions = await prisma.permission.findMany({
		select: {
			entity: true,
			field: true,
			action: true,
			maskType: true,
			displayName: true,
			description: true,
		},
		distinct: ["entity", "field", "action"],
		orderBy: [{ entity: "asc" }, { action: "asc" }],
	});

	return permissions;
};

/**
 * Get permissions grouped by role
 */
export const getPermissionsGroupedByRole = async () => {
	const permissions = await prisma.permission.findMany({
		include: {
			role: {
				select: {
					id: true,
					name: true,
					isActive: true,
				},
			},
		},
		orderBy: [{ entity: "asc" }, { action: "asc" }],
	});

	const grouped = permissions.reduce(
		(acc, permission) => {
			const roleId = permission.roleId;
			if (!acc[roleId]) {
				acc[roleId] = {
					role: permission.role,
					permissions: [],
				};
			}
			acc[roleId].permissions.push(permission);
			return acc;
		},
		{} as Record<string, { role: any; permissions: typeof permissions }>,
	);

	return grouped;
};

/**
 * Get permission statistics
 */
export const getPermissionStats = async () => {
	const [totalPermissions, entitiesCount, actionsCount, rolesWithPermissions] =
		await Promise.all([
			prisma.permission.count(),
			prisma.permission.findMany({
				select: { entity: true },
				distinct: ["entity"],
			}),
			prisma.permission.findMany({
				select: { action: true },
				distinct: ["action"],
			}),
			prisma.role.count({
				where: {
					permissions: {
						some: {},
					},
				},
			}),
		]);

	return {
		totalPermissions,
		uniqueEntities: entitiesCount.length,
		uniqueActions: actionsCount.length,
		rolesWithPermissions,
	};
};

/**
 * Check if a role has a specific permission
 */
export const roleHasPermission = async (
	roleId: string,
	entity: string,
	field: string,
	action: string,
) => {
	const permission = await prisma.permission.findFirst({
		where: {
			roleId,
			entity,
			field,
			action,
		},
		select: { id: true },
	});

	return !!permission;
};
