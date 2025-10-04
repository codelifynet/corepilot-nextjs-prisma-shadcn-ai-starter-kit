// Permission Types - Field-level permission type definitions for RBAC system

export interface Permission {
	id: string;
	entity: string; // e.g., "user", "product", "order"
	field: string; // e.g., "email", "name", "*" for all fields
	action: string; // e.g., "create", "read", "update", "delete"
	maskType?: string | null; // e.g., "none", "partial", "hidden", "encrypted", "redacted"
	createdAt: Date;
	updatedAt: Date;
	roleId: string;
}

// Permission with role relation
export interface PermissionWithRole extends Permission {
	role?: Role;
}

// Permission creation input
export interface CreatePermissionInput {
	entity: string;
	field: string;
	action: string;
	maskType?: string;
	roleId: string;
}

// Permission update input
export interface UpdatePermissionInput {
	entity?: string;
	field?: string;
	action?: string;
	maskType?: string;
	roleId?: string;
}

// Permission query filters
export interface PermissionFilters {
	search?: string;
	entity?: string;
	field?: string;
	action?: string;
	maskType?: string;
	roleId?: string;
	createdAfter?: Date;
	createdBefore?: Date;
}

// Permission statistics
export interface PermissionStats {
	totalPermissions: number;
	permissionsByEntity: Record<string, number>;
	permissionsByAction: Record<string, number>;
	permissionsByMaskType: Record<string, number>;
	rolesWithPermissions: number;
}

// Permission actions enum
export enum PermissionAction {
	CREATE = "create",
	READ = "read",
	UPDATE = "update",
	DELETE = "delete",
	ADMIN = "admin",
}

// Mask types enum
export enum MaskType {
	NONE = "none",
	PARTIAL = "partial",
	HIDDEN = "hidden",
	ENCRYPTED = "encrypted",
	REDACTED = "redacted",
}

// Common entities enum
export enum EntityType {
	USER = "user",
	PRODUCT = "product",
	ORDER = "order",
	CUSTOMER = "customer",
	BLOG_POST = "blog_post",
	CATEGORY = "category",
	CAMPAIGN = "campaign",
	NOTIFICATION = "notification",
	SUPPORT_TICKET = "support_ticket",
	AI_MODEL = "ai_model",
	SITE_SETTINGS = "site_settings",
	SEO_SETTINGS = "seo_settings",
}

// Permission validation result
export interface PermissionValidationResult {
	isValid: boolean;
	errors: string[];
	warnings: string[];
}

// Bulk permission operations
export interface BulkPermissionOperation {
	action: "create" | "update" | "delete";
	permissions: CreatePermissionInput[] | UpdatePermissionInput[] | string[];
}

// Import Role type (this would be defined in role.types.ts)
interface Role {
	id: string;
	name: string;
	description?: string | null;
	isActive: boolean;
	isSystem: boolean;
	createdAt: Date;
	updatedAt: Date;
}
