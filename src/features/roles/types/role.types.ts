// Role Types - Core role type definitions for RBAC system

export interface Role {
	id: string;
	name: string;
	description?: string | null;
	isActive: boolean;
	isSystem: boolean;
	createdAt: Date;
	updatedAt: Date;
	userCount?: number;
	permissions?: { entity: string; field: string; action: string; maskType?: string }[];
	_count?: {
		userRoles: number;
		permissions: number;
	};
}

// Role with relations
export interface RoleWithRelations extends Omit<Role, "permissions"> {
	permissions?: Permission[];
	users?: User[];
	userRoles?: UserRole[];
	resourcePermissions?: ResourcePermission[];
}

// Role creation input
export interface CreateRoleInput {
	name: string;
	description?: string;
	isActive?: boolean;
	isSystem?: boolean;
	permissions?: { entity: string; field: string; action: string; maskType?: string }[];
}

// Role update input
export interface UpdateRoleInput {
	name?: string;
	description?: string;
	isActive?: boolean;
	isSystem?: boolean;
	permissions?: { entity: string; field: string; action: string; maskType?: string }[];
}

// Role query filters
export interface RoleFilters {
	search?: string;
	isActive?: boolean;
	isSystem?: boolean;
	createdAfter?: Date;
	sortBy?: keyof Role;
	sortOrder?: "asc" | "desc";
	createdBefore?: Date;
}

// Role statistics
export interface RoleStats {
	totalRoles: number;
	activeRoles: number;
	systemRoles: number;
	customRoles: number;
	rolesWithUsers: number;
	rolesWithPermissions: number;
}

// Import types from other modules (these would be defined in their respective files)
interface Permission {
	id: string;
	entity: string;
	field: string;
	action: string;
	maskType?: string | null;
	createdAt: Date;
	updatedAt: Date;
	roleId: string;
}

interface User {
	id: string;
	name: string;
	email: string;
}

interface UserRole {
	id: string;
	userId: string;
	roleId: string;
	createdAt: Date;
	updatedAt: Date;
}

interface ResourcePermission {
	id: string;
	resourceType: string;
	resourceId: string;
	action: string;
	granted: boolean;
	createdAt: Date;
	updatedAt: Date;
	roleId: string;
}
