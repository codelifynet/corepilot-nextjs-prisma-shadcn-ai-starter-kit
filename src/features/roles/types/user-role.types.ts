// UserRole Types - User-Role relationship type definitions for RBAC system

export interface UserRole {
	id: string;
	userId: string;
	roleId: string;
	createdAt: Date;
	updatedAt: Date;
}

// UserRole with relations
export interface UserRoleWithRelations extends UserRole {
	user?: User;
	role?: Role;
}

// UserRole creation input
export interface CreateUserRoleInput {
	userId: string;
	roleId: string;
	assignedBy: string;
	expiresAt?: Date;
}

// UserRole update input (limited fields that can be updated)
export interface UpdateUserRoleInput {
	userId?: string;
	roleId?: string;
}

// UserRole query filters
export interface UserRoleFilters {
	userId?: string;
	roleId?: string;
	userName?: string;
	userEmail?: string;
	roleName?: string;
	isActive?: boolean;
	createdAfter?: Date;
	createdBefore?: Date;
}

// UserRole statistics
export interface UserRoleStats {
	totalAssignments: number;
	uniqueUsers: number;
	uniqueRoles: number;
	assignmentsByRole: Record<string, number>;
	assignmentsByUser: Record<string, number>;
	recentAssignments: number;
}

// Bulk user role operations
export interface BulkUserRoleOperation {
	action: "assign" | "revoke";
	userIds: string[];
	roleIds: string[];
}

// User role assignment result
export interface UserRoleAssignmentResult {
	success: boolean;
	userRole?: UserRole;
	error?: string;
	warnings?: string[];
}

// Bulk assignment result
export interface BulkUserRoleResult {
	successful: UserRoleAssignmentResult[];
	failed: UserRoleAssignmentResult[];
	summary: {
		total: number;
		successful: number;
		failed: number;
	};
}

// User with roles
export interface UserWithRoles {
	id: string;
	name: string;
	email: string;
	isActive: boolean;
	roles: Role[];
	userRoles: UserRole[];
}

// Role with users
export interface RoleWithUsers {
	id: string;
	name: string;
	description?: string | null;
	isActive: boolean;
	isSystem: boolean;
	users: User[];
	userRoles: UserRole[];
	userCount: number;
}

// User role validation
export interface UserRoleValidation {
	isValid: boolean;
	canAssign: boolean;
	canRevoke: boolean;
	errors: string[];
	warnings: string[];
	conflicts: string[];
}

// Import types from other modules
interface User {
	id: string;
	name: string;
	email: string;
	isActive: boolean;
	createdAt: Date;
	updatedAt: Date;
}

interface Role {
	id: string;
	name: string;
	description?: string | null;
	isActive: boolean;
	isSystem: boolean;
	createdAt: Date;
	updatedAt: Date;
}
