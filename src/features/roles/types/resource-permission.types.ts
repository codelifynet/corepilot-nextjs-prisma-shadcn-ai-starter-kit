// ResourcePermission Types - Resource-specific permission type definitions for fine-grained access control

import type { Role } from "./role.types";

export interface ResourcePermission {
	id: string;
	resourceType: string; // e.g., "document", "project", "team"
	resourceId: string; // ID of the specific resource
	action: string; // e.g., "read", "write", "delete", "admin"
	actions: string[]; // Array of actions for multiple permissions
	granted: boolean; // true = allow, false = deny
	grantedAt: Date; // When the permission was granted
	grantedBy?: {
		id: string;
		email?: string;
		name?: string;
	}; // Who granted the permission
	createdAt: Date;
	updatedAt: Date;
	roleId: string;
	role?: Role; // Role relation
}

// ResourcePermission with role relation
export interface ResourcePermissionWithRole extends ResourcePermission {
	role?: Role;
}

// ResourcePermission creation input
export interface CreateResourcePermissionInput {
	resourceType: string;
	resourceId: string;
	action: string;
	granted?: boolean;
	roleId: string;
}

// ResourcePermission update input
export interface UpdateResourcePermissionInput {
	resourceType?: string;
	resourceId?: string;
	action?: string;
	granted?: boolean;
	roleId?: string;
}

// ResourcePermission query filters
export interface ResourcePermissionFilters {
	search?: string;
	resourceType?: string;
	resourceId?: string;
	action?: string;
	granted?: boolean;
	roleId?: string;
	roleName?: string;
	createdAfter?: Date;
	createdBefore?: Date;
}

// ResourcePermission statistics
export interface ResourcePermissionStats {
	totalPermissions: number;
	grantedPermissions: number;
	deniedPermissions: number;
	permissionsByResourceType: Record<string, number>;
	permissionsByAction: Record<string, number>;
	permissionsByRole: Record<string, number>;
	uniqueResources: number;
	rolesWithResourcePermissions: number;
}

// Resource actions enum
export enum ResourceAction {
	READ = "read",
	WRITE = "write",
	DELETE = "delete",
	ADMIN = "admin",
	EXECUTE = "execute",
	SHARE = "share",
	COMMENT = "comment",
	APPROVE = "approve",
	REJECT = "reject",
}

// Resource types enum
export enum ResourceType {
	DOCUMENT = "document",
	PROJECT = "project",
	TEAM = "team",
	WORKSPACE = "workspace",
	FOLDER = "folder",
	FILE = "file",
	DASHBOARD = "dashboard",
	REPORT = "report",
	API_KEY = "api_key",
	INTEGRATION = "integration",
	WEBHOOK = "webhook",
	TEMPLATE = "template",
}

// Permission check result
export interface PermissionCheckResult {
	hasPermission: boolean;
	granted: boolean;
	reason?: string;
	conflictingPermissions?: ResourcePermission[];
}

// Bulk resource permission operations
export interface BulkResourcePermissionOperation {
	action: "grant" | "revoke" | "update";
	permissions:
		| CreateResourcePermissionInput[]
		| UpdateResourcePermissionInput[]
		| string[];
}

// Resource permission validation
export interface ResourcePermissionValidation {
	isValid: boolean;
	canGrant: boolean;
	canRevoke: boolean;
	errors: string[];
	warnings: string[];
	conflicts: ResourcePermission[];
}

// Resource with permissions
export interface ResourceWithPermissions {
	resourceType: string;
	resourceId: string;
	permissions: ResourcePermission[];
	effectivePermissions: {
		canRead: boolean;
		canWrite: boolean;
		canDelete: boolean;
		canAdmin: boolean;
	};
}

// Role resource permissions summary
export interface RoleResourcePermissionsSummary {
	roleId: string;
	roleName: string;
	totalPermissions: number;
	grantedPermissions: number;
	deniedPermissions: number;
	resourceTypes: string[];
	actions: string[];
	lastUpdated: Date;
}

// Permission inheritance chain
export interface PermissionInheritanceChain {
	resourceType: string;
	resourceId: string;
	action: string;
	chain: {
		level: number;
		source: "direct" | "inherited" | "default";
		permission?: ResourcePermission;
		granted: boolean;
	}[];
	finalResult: boolean;
}

// Import Role type
