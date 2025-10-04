import { prisma } from "@/lib/prisma";
import type {
	User,
	UserStats,
	ListUsersParams,
	ListUsersResponse,
	UserSession,
	UserActivity,
	UserFilters,
} from "../types";

/**
 * User Get Service - Read operations for user management
 */

/**
 * List users with filters, pagination, and sorting
 */
export async function listUsers(
	params: ListUsersParams,
): Promise<ListUsersResponse> {
	const {
		page = 1,
		limit = 10,
		sort = "createdAt",
		order = "desc",
		filters = {},
	} = params;

	const skip = (page - 1) * limit;
	const where: any = {};

	// Apply filters based on UserFilters interface
	if (filters.search) {
		where.OR = [
			{ name: { contains: filters.search, mode: "insensitive" } },
			{ email: { contains: filters.search, mode: "insensitive" } },
		];
	}

	if (filters.role) {
		where.userRoles = {
			some: {
				role: {
					name: filters.role,
				},
			},
		};
	}

	if (filters.banned !== undefined) {
		where.banned = filters.banned;
	}

	if (filters.emailVerified !== undefined) {
		where.emailVerified = filters.emailVerified;
	}

	if (filters.createdFrom) {
		where.createdAt = { gte: new Date(filters.createdFrom) };
	}

	if (filters.createdTo) {
		where.createdAt = {
			...where.createdAt,
			lte: new Date(filters.createdTo),
		};
	}

	// Execute queries
	const [users, totalCount] = await Promise.all([
		prisma.user.findMany({
			where,
			skip,
			take: limit,
			orderBy: { [sort]: order },
			include: {
				userRoles: {
					include: {
						role: true,
					},
				},
			},
		}),
		prisma.user.count({ where }),
	]);

	// Transform users to match User interface
	const transformedUsers: User[] = users.map((user) => ({
		id: user.id,
		name: user.name,
		email: user.email,
		emailVerified: user.emailVerified,
		image: user.image || undefined,
		banned: user.banned || undefined,
		banReason: user.banReason || undefined,
		banExpires: user.banExpires || undefined,
		createdAt: user.createdAt,
		updatedAt: user.updatedAt,
		userRoles: user.userRoles.map((ur) => ({
			id: ur.id,
			roleId: ur.roleId,
			userId: ur.userId,
			role: {
				id: ur.role.id,
				name: ur.role.name,
				displayName: ur.role.name,
				description: ur.role.description || "",
				type: "USER" as const,
				status: ur.role.isActive ? ("ACTIVE" as const) : ("INACTIVE" as const),
				createdAt: ur.role.createdAt,
				updatedAt: ur.role.updatedAt,
			},
		})),
	}));

	return {
		users: transformedUsers,
		pagination: {
			page,
			limit,
			totalPages: Math.ceil(totalCount / limit),
			totalCount,
		},
	};
}

/**
 * Get user by ID with roles
 */
export async function getUserById(id: string): Promise<User | null> {
	const user = await prisma.user.findUnique({
		where: { id },
		include: {
			userRoles: {
				include: {
					role: true,
				},
			},
		},
	});

	if (!user) return null;

	return {
		id: user.id,
		name: user.name,
		email: user.email,
		emailVerified: user.emailVerified,
		image: user.image || undefined,
		banned: user.banned || undefined,
		banReason: user.banReason || undefined,
		banExpires: user.banExpires || undefined,
		createdAt: user.createdAt,
		updatedAt: user.updatedAt,
		userRoles: user.userRoles.map((ur) => ({
			id: ur.id,
			roleId: ur.roleId,
			userId: ur.userId,
			role: {
				id: ur.role.id,
				name: ur.role.name,
				displayName: ur.role.name,
				description: ur.role.description || "",
				type: "USER" as const,
				status: ur.role.isActive ? ("ACTIVE" as const) : ("INACTIVE" as const),
				createdAt: ur.role.createdAt,
				updatedAt: ur.role.updatedAt,
			},
		})),
	};
}

/**
 * Get user by email with roles
 */
export async function getUserByEmail(email: string): Promise<User | null> {
	const user = await prisma.user.findUnique({
		where: { email },
		include: {
			userRoles: {
				include: {
					role: true,
				},
			},
		},
	});

	if (!user) return null;

	return {
		id: user.id,
		name: user.name,
		email: user.email,
		emailVerified: user.emailVerified,
		image: user.image || undefined,
		banned: user.banned || undefined,
		banReason: user.banReason || undefined,
		banExpires: user.banExpires || undefined,
		createdAt: user.createdAt,
		updatedAt: user.updatedAt,
		userRoles: user.userRoles.map((ur) => ({
			id: ur.id,
			roleId: ur.roleId,
			userId: ur.userId,
			role: {
				id: ur.role.id,
				name: ur.role.name,
				displayName: ur.role.name,
				description: ur.role.description || "",
				type: "USER" as const,
				status: ur.role.isActive ? ("ACTIVE" as const) : ("INACTIVE" as const),
				createdAt: ur.role.createdAt,
				updatedAt: ur.role.updatedAt,
			},
		})),
	};
}

/**
 * List user sessions
 */
export async function listUserSessions(userId: string): Promise<UserSession[]> {
	const sessions = await prisma.session.findMany({
		where: { userId },
		orderBy: { createdAt: "desc" },
	});

	return sessions.map((session) => ({
		id: session.id,
		token: session.token,
		expiresAt: session.expiresAt,
		ipAddress: session.ipAddress || undefined,
		userAgent: session.userAgent || undefined,
		createdAt: session.createdAt,
		updatedAt: session.updatedAt,
	}));
}

/**
 * Get user statistics
 */
export async function getUserStats(): Promise<UserStats> {
	const [
		totalUsers,
		activeUsers,
		bannedUsers,
		unverifiedUsers,
		adminUsers,
		recentSignups,
		activeSessions,
	] = await Promise.all([
		prisma.user.count(),
		prisma.user.count({
			where: {
				sessions: {
					some: {
						expiresAt: { gt: new Date() },
					},
				},
			},
		}),
		prisma.user.count({ where: { banned: true } }),
		prisma.user.count({ where: { emailVerified: false } }),
		prisma.user.count({
			where: {
				userRoles: {
					some: {
						role: { name: "admin" },
					},
				},
			},
		}),
		prisma.user.count({
			where: {
				createdAt: {
					gte: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000), // Last 30 days
				},
			},
		}),
		prisma.session.count({
			where: {
				expiresAt: { gt: new Date() },
			},
		}),
	]);

	return {
		totalUsers,
		activeUsers,
		bannedUsers,
		unverifiedUsers,
		adminUsers,
		recentSignups,
		activeSessions,
	};
}

/**
 * Get user activity (placeholder implementation)
 */
export async function getUserActivity(): Promise<UserActivity[]> {
	// This would typically come from an activity log table
	// For now, return empty array as placeholder
	return [];
}

/**
 * Check if user has permission
 */
export async function hasPermission(
	userId: string,
	entity: string,
	field: string,
	action: string,
): Promise<boolean> {
	const userRoles = await prisma.userRole.findMany({
		where: { userId },
		include: {
			role: {
				include: {
					permissions: true,
				},
			},
		},
	});

	for (const userRole of userRoles) {
		for (const permission of userRole.role.permissions) {
			if (
				permission.entity === entity &&
				(permission.field === field || permission.field === "*") &&
				permission.action === action
			) {
				return true;
			}
		}
	}

	return false;
}

/**
 * Check role permission
 */
export async function checkRolePermission(
	roleName: string,
	entity: string,
	field: string,
	action: string,
): Promise<boolean> {
	const role = await prisma.role.findUnique({
		where: { name: roleName },
		include: {
			permissions: true,
		},
	});

	if (!role) return false;

	return role.permissions.some(
		(permission) =>
			permission.entity === entity &&
			(permission.field === field || permission.field === "*") &&
			permission.action === action,
	);
}

/**
 * Export users data
 */
export async function exportUsers(options: {
	format: "csv" | "json";
	filters?: UserFilters;
}): Promise<string> {
	const { format, filters = {} } = options;

	const where: any = {};
	
	// Apply filters
	if (filters.role) {
		where.userRoles = {
			some: {
				role: { name: filters.role },
			},
		};
	}

	if (filters.banned !== undefined) {
		where.banned = filters.banned;
	}

	if (filters.emailVerified !== undefined) {
		where.emailVerified = filters.emailVerified;
	}

	const users = await prisma.user.findMany({
		where,
		include: {
			userRoles: {
				include: {
					role: true,
				},
			},
		},
	});

	if (format === "json") {
		return JSON.stringify(users, null, 2);
	}

	// CSV format
	const headers = ["ID", "Name", "Email", "Status", "Created At", "Roles"];
	const rows = users.map((user) => [
		user.id,
		user.name || "",
		user.email,
		user.banned ? "Banned" : "Active",
		user.createdAt.toISOString(),
		user.userRoles.map((ur) => ur.role.name).join(", "),
	]);

	return [headers, ...rows].map((row) => row.join(",")).join("\n");
}