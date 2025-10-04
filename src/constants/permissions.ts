// Permission Constants - Centralized permission definitions for RBAC system

/**
 * Entity types for permission system
 */
export const ENTITIES = {
	// Core entities
	USER: "user",
	ROLE: "role",
	PERMISSION: "permission",
	
	// System entities
	SYSTEM: "system",
	DASHBOARD: "dashboard",
	SETTINGS: "settings",
	NOTIFICATION: "notification",
	LOG: "log",
	SUPPORT_TICKET: "support_ticket",
	
	// E-commerce entities
	PRODUCT: "product",
	ORDER: "order",
	CUSTOMER: "customer",
	CAMPAIGN: "campaign",
	COUPON: "coupon",
	INVENTORY: "inventory",
	
	// CMS entities
	BLOG: "blog",
	PAGE: "page",
	MEDIA: "media",
	COMMENT: "comment",
	MENU: "menu",
	CATEGORY: "category",
	TAG: "tag",
	
	// Finance entities
	PAYMENT: "payment",
	SUBSCRIPTION: "subscription",
	INVOICE: "invoice",
	FINANCE: "finance",
	
	// Analytics and AI
	ANALYTICS: "analytics",
	AI_MODEL: "ai_model",
	
	// Legacy entities
	SUPPORT: "support",
	SITE_SETTINGS: "site_settings",
	SEO_SETTINGS: "seo_settings",
	BLOG_POST: "blog_post",
} as const;

/**
 * Action types for permission system
 */
export const ACTIONS = {
  // Basic CRUD operations
  CREATE: "create",
  READ: "read",
  UPDATE: "update",
  DELETE: "delete",
  LIST: "list",
  
  // Advanced operations
  EXPORT: "export",
  IMPORT: "import",
  APPROVE: "approve",
  REJECT: "reject",
  PUBLISH: "publish",
  ARCHIVE: "archive",
  MANAGE: "manage",
  
  // User management operations
  BAN: "ban",
  UNBAN: "unban",
  ASSIGN: "assign",
  REVOKE: "revoke",
  
  // System operations
  CONFIGURE: "configure",
  MONITOR: "monitor",
  BACKUP: "backup",
  RESTORE: "restore",
  MAINTAIN: "maintain",
  EXECUTE: "execute",
  
  // Content operations
  SHARE: "share",
  COMMENT: "comment",
} as const;

/**
 * Mask types for field-level data protection
 */
export const MASK_TYPES = {
	NONE: "none",
	PARTIAL: "partial",
	HIDDEN: "hidden",
	ENCRYPTED: "encrypted",
	REDACTED: "redacted",
} as const;

/**
 * TypeScript types derived from constants
 */
export type EntityType = (typeof ENTITIES)[keyof typeof ENTITIES];
export type ActionType = (typeof ACTIONS)[keyof typeof ACTIONS];
export type MaskType = (typeof MASK_TYPES)[keyof typeof MASK_TYPES];

/**
 * Permission definition interface
 */
export interface PermissionDefinition {
	entity: EntityType;
	field: string;
	action: ActionType;
	maskType: MaskType;
	displayName?: string;
	description?: string;
}

/**
 * Default role permissions configuration
 */
export const DEFAULT_ROLE_PERMISSIONS = {
	SUPER_ADMIN: {
		name: "SUPERADMIN",
		permissions: [
			// Full access to all entities and actions
			{ entity: ENTITIES.USER, field: "*", action: ACTIONS.CREATE, maskType: MASK_TYPES.NONE },
			{ entity: ENTITIES.USER, field: "*", action: ACTIONS.READ, maskType: MASK_TYPES.NONE },
			{ entity: ENTITIES.USER, field: "*", action: ACTIONS.UPDATE, maskType: MASK_TYPES.NONE },
			{ entity: ENTITIES.USER, field: "*", action: ACTIONS.DELETE, maskType: MASK_TYPES.NONE },
			{ entity: ENTITIES.USER, field: "*", action: ACTIONS.BAN, maskType: MASK_TYPES.NONE },
			{ entity: ENTITIES.USER, field: "*", action: ACTIONS.UNBAN, maskType: MASK_TYPES.NONE },
			
			{ entity: ENTITIES.ROLE, field: "*", action: ACTIONS.CREATE, maskType: MASK_TYPES.NONE },
			{ entity: ENTITIES.ROLE, field: "*", action: ACTIONS.READ, maskType: MASK_TYPES.NONE },
			{ entity: ENTITIES.ROLE, field: "*", action: ACTIONS.UPDATE, maskType: MASK_TYPES.NONE },
			{ entity: ENTITIES.ROLE, field: "*", action: ACTIONS.DELETE, maskType: MASK_TYPES.NONE },
			{ entity: ENTITIES.ROLE, field: "*", action: ACTIONS.ASSIGN, maskType: MASK_TYPES.NONE },
			{ entity: ENTITIES.ROLE, field: "*", action: ACTIONS.REVOKE, maskType: MASK_TYPES.NONE },
			
			{ entity: ENTITIES.PERMISSION, field: "*", action: ACTIONS.READ, maskType: MASK_TYPES.NONE },
			{ entity: ENTITIES.PERMISSION, field: "*", action: ACTIONS.ASSIGN, maskType: MASK_TYPES.NONE },
			{ entity: ENTITIES.PERMISSION, field: "*", action: ACTIONS.REVOKE, maskType: MASK_TYPES.NONE },
			
			{ entity: ENTITIES.SETTINGS, field: "*", action: ACTIONS.CONFIGURE, maskType: MASK_TYPES.NONE },
			{ entity: ENTITIES.SETTINGS, field: "*", action: ACTIONS.MONITOR, maskType: MASK_TYPES.NONE },
			{ entity: ENTITIES.SETTINGS, field: "*", action: ACTIONS.MAINTAIN, maskType: MASK_TYPES.NONE },
			
			{ entity: ENTITIES.ANALYTICS, field: "*", action: ACTIONS.READ, maskType: MASK_TYPES.NONE },
			{ entity: ENTITIES.ANALYTICS, field: "*", action: ACTIONS.EXPORT, maskType: MASK_TYPES.NONE },
			
			{ entity: ENTITIES.FINANCE, field: "*", action: ACTIONS.READ, maskType: MASK_TYPES.NONE },
			{ entity: ENTITIES.FINANCE, field: "*", action: ACTIONS.MANAGE, maskType: MASK_TYPES.NONE },
		] as PermissionDefinition[],
	},
	
	ADMIN: {
		name: "ADMIN",
		permissions: [
			// User management
			{ entity: ENTITIES.USER, field: "*", action: ACTIONS.CREATE, maskType: MASK_TYPES.NONE },
			{ entity: ENTITIES.USER, field: "*", action: ACTIONS.READ, maskType: MASK_TYPES.NONE },
			{ entity: ENTITIES.USER, field: "*", action: ACTIONS.UPDATE, maskType: MASK_TYPES.NONE },
			{ entity: ENTITIES.USER, field: "*", action: ACTIONS.DELETE, maskType: MASK_TYPES.NONE },
			{ entity: ENTITIES.USER, field: "*", action: ACTIONS.BAN, maskType: MASK_TYPES.NONE },
			{ entity: ENTITIES.USER, field: "*", action: ACTIONS.UNBAN, maskType: MASK_TYPES.NONE },
			
			// Role management
			{ entity: ENTITIES.ROLE, field: "*", action: ACTIONS.CREATE, maskType: MASK_TYPES.NONE },
			{ entity: ENTITIES.ROLE, field: "*", action: ACTIONS.READ, maskType: MASK_TYPES.NONE },
			{ entity: ENTITIES.ROLE, field: "*", action: ACTIONS.UPDATE, maskType: MASK_TYPES.NONE },
			{ entity: ENTITIES.ROLE, field: "*", action: ACTIONS.DELETE, maskType: MASK_TYPES.NONE },
			{ entity: ENTITIES.ROLE, field: "*", action: ACTIONS.ASSIGN, maskType: MASK_TYPES.NONE },
			{ entity: ENTITIES.ROLE, field: "*", action: ACTIONS.REVOKE, maskType: MASK_TYPES.NONE },
			
			// Permission management
			{ entity: ENTITIES.PERMISSION, field: "*", action: ACTIONS.READ, maskType: MASK_TYPES.NONE },
			{ entity: ENTITIES.PERMISSION, field: "*", action: ACTIONS.ASSIGN, maskType: MASK_TYPES.NONE },
			{ entity: ENTITIES.PERMISSION, field: "*", action: ACTIONS.REVOKE, maskType: MASK_TYPES.NONE },
			
			// Content management
			{ entity: ENTITIES.BLOG, field: "*", action: ACTIONS.CREATE, maskType: MASK_TYPES.NONE },
			{ entity: ENTITIES.BLOG, field: "*", action: ACTIONS.READ, maskType: MASK_TYPES.NONE },
			{ entity: ENTITIES.BLOG, field: "*", action: ACTIONS.UPDATE, maskType: MASK_TYPES.NONE },
			{ entity: ENTITIES.BLOG, field: "*", action: ACTIONS.DELETE, maskType: MASK_TYPES.NONE },
			{ entity: ENTITIES.BLOG, field: "*", action: ACTIONS.PUBLISH, maskType: MASK_TYPES.NONE },
			
			// Analytics
			{ entity: ENTITIES.ANALYTICS, field: "*", action: ACTIONS.READ, maskType: MASK_TYPES.NONE },
			{ entity: ENTITIES.ANALYTICS, field: "*", action: ACTIONS.EXPORT, maskType: MASK_TYPES.NONE },
			
			// Finance (limited)
			{ entity: ENTITIES.FINANCE, field: "*", action: ACTIONS.READ, maskType: MASK_TYPES.NONE },
			{ entity: ENTITIES.FINANCE, field: "*", action: ACTIONS.MANAGE, maskType: MASK_TYPES.NONE },
		] as PermissionDefinition[],
	},
	
	USER: {
		name: "USER",
		permissions: [
			// Basic user permissions
			{ entity: ENTITIES.USER, field: "*", action: ACTIONS.READ, maskType: MASK_TYPES.PARTIAL },
			
			// Content reading
			{ entity: ENTITIES.BLOG, field: "*", action: ACTIONS.READ, maskType: MASK_TYPES.NONE },
			
			// Analytics (limited)
			{ entity: ENTITIES.ANALYTICS, field: "*", action: ACTIONS.READ, maskType: MASK_TYPES.PARTIAL },
		] as PermissionDefinition[],
	},
} as const;

/**
 * Field type mappings for different entities
 */
export const ENTITY_FIELD_TYPES = {
	[ENTITIES.USER]: {
		email: "email",
		phone: "phone",
		name: "string",
		password: "password",
		salary: "currency",
		avatar: "url",
		createdAt: "datetime",
		updatedAt: "datetime",
	},
	[ENTITIES.PRODUCT]: {
		name: "string",
		price: "currency",
		description: "text",
		sku: "string",
		stock: "number",
		createdAt: "datetime",
		updatedAt: "datetime",
	},
	[ENTITIES.ORDER]: {
		total: "currency",
		status: "string",
		customerEmail: "email",
		customerPhone: "phone",
		createdAt: "datetime",
		updatedAt: "datetime",
	},
} as const;

/**
 * Sensitive fields that require special handling
 */
export const SENSITIVE_FIELDS = [
	"password",
	"email",
	"phone",
	"salary",
	"creditCard",
	"ssn",
	"bankAccount",
	"apiKey",
	"token",
	"secret",
] as const;

/**
 * System roles that cannot be deleted or modified
 */
export const SYSTEM_ROLES = ["SUPERADMIN"] as const;

/**
 * Maximum number of roles a user can have
 */
export const MAX_ROLES_PER_USER = 5;

/**
 * Permission validation rules
 */
export const PERMISSION_VALIDATION = {
	ENTITY_MAX_LENGTH: 50,
	FIELD_MAX_LENGTH: 100,
	ACTION_MAX_LENGTH: 50,
	MASK_TYPE_MAX_LENGTH: 20,
} as const;