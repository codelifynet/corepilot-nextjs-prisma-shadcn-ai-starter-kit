// RBAC System Types - Updated to work with new role system

export interface User {
	id: string;
	name: string;
	email: string;
	emailVerified: boolean;
	image?: string;
	banned?: boolean;
	banReason?: string;
	banExpires?: Date;
	createdAt: Date;
	updatedAt: Date;
	// RBAC Relations
	userRoles?: UserRoleAssignment[];
}

export interface UserRoleAssignment {
	id: string;
	roleId: string;
	userId: string;
	role: Role;
}

export interface Role {
	id: string;
	name: string;
	displayName?: string;
	description: string;
	type: "SUPERADMIN" | "ADMIN" | "USER";
	status: "ACTIVE" | "INACTIVE" | "PENDING";
	rolePermissions?: RolePermission[];
	createdAt: Date;
	updatedAt: Date;
}

export interface RolePermission {
	id: string;
	roleId: string;
	permissionId: string;
	permission: Permission;
	createdAt: Date;
	updatedAt: Date;
}

export interface Permission {
	id: string;
	name: string;
	displayName?: string;
	description?: string;
	action: string;
	resource: string;
	type: "ALLOW" | "DENY";
	createdAt: Date;
	updatedAt: Date;
}

export interface UserWithPermissions extends User {
	permissions: string[];
	effectiveRoles: Role[];
}

export interface UserFilters {
	search?: string;
	role?: string; // Changed from UserRole to string (role name)
	banned?: boolean;
	emailVerified?: boolean;
	createdFrom?: Date;
	createdTo?: Date;
}

export interface UserSession {
	id: string;
	token: string;
	expiresAt: Date;
	ipAddress?: string;
	userAgent?: string;
	createdAt: Date;
	updatedAt: Date;
}

export interface CreateUserInput {
	name: string;
	email: string;
	password: string;
	roleIds?: string[]; // Changed to role IDs array
	emailVerified?: boolean;
}

export interface UpdateUserInput {
	name?: string;
	email?: string;
	roleIds?: string[]; // Changed to role IDs array
	emailVerified?: boolean;
	image?: string;
}

export interface BanUserInput {
	userId: string;
	reason: string;
	expiresIn?: number; // seconds
}

export interface UserActivity {
	id: string;
	userId?: string;
	sessionId: string;
	action: string;
	endpoint?: string;
	duration?: number;
	userAgent?: string;
	ipAddress?: string;
	timestamp: Date;
}

export interface UserStats {
	totalUsers: number;
	activeUsers: number;
	bannedUsers: number;
	unverifiedUsers: number;
	adminUsers: number;
	recentSignups: number;
	activeSessions: number;
}

export interface UsersResponse {
	users: User[];
	pagination: {
		page: number;
		limit: number;
		totalCount: number;
		totalPages: number;
	};
}

export interface UserResponse {
	user: UserWithPermissions;
}

// Helper types for role management
export interface AssignRoleInput {
	userId: string;
	roleId: string;
}

export interface RemoveRoleInput {
	userId: string;
	roleId: string;
}

// Export helper functions to work with roles
export function getUserPrimaryRole(user: User): Role | undefined {
	if (!user.userRoles || user.userRoles.length === 0) return undefined;

	// Sort by role type priority: SUPERADMIN > ADMIN > USER
	const rolePriority = { SUPERADMIN: 3, ADMIN: 2, USER: 1 };

	return user.userRoles
		.map((ur) => ur.role)
		.sort((a, b) => rolePriority[b.type] - rolePriority[a.type])[0];
}

export function hasRole(user: User, roleName: string): boolean {
	if (!user.userRoles) return false;

	return user.userRoles.some((ur) => ur.role.name === roleName);
}

export function hasAnyRole(user: User, roleNames: string[]): boolean {
	return roleNames.some((roleName) => hasRole(user, roleName));
}

export function getUserRoleNames(user: User): string[] {
	if (!user.userRoles) return [];

	return user.userRoles.map((ur) => ur.role.name);
}

export type UserSortField =
	| "name"
	| "email"
	| "role"
	| "createdAt"
	| "updatedAt";
export type SortOrder = "asc" | "desc";

export interface UserPagination {
	page: number;
	limit: number;
	totalPages: number;
	totalCount: number;
}

export interface ListUsersParams {
	page?: number;
	limit?: number;
	sort?: UserSortField;
	order?: SortOrder;
	filters?: UserFilters;
}

export interface ListUsersResponse {
	users: User[];
	pagination: UserPagination;
	stats?: UserStats;
}

// Re-export schema types (updated for RBAC)
export type { SetUserPasswordInput } from "../schemas";
