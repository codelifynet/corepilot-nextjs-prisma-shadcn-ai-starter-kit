// Roles Constants - Configuration and constant values for roles feature

// Default pagination settings
export const PAGINATION_DEFAULTS = {
	PAGE: 1,
	LIMIT: 10,
	MAX_LIMIT: 100,
	MIN_LIMIT: 1,
} as const;

// Role configuration
export const ROLE_CONFIG = {
	NAME_MIN_LENGTH: 2,
	NAME_MAX_LENGTH: 50,
	DESCRIPTION_MAX_LENGTH: 500,
	MAX_ROLES_PER_USER: 10,
	SYSTEM_ROLES: {
		SUPER_ADMIN: "super_admin",
		ADMIN: "admin",
		USER: "user",
		GUEST: "guest",
	},
} as const;

// Permission configuration
export const PERMISSION_CONFIG = {
	ENTITY_MAX_LENGTH: 50,
	FIELD_MAX_LENGTH: 50,
	ACTION_MAX_LENGTH: 20,
	MASK_TYPE_MAX_LENGTH: 20,
	MAX_PERMISSIONS_PER_ROLE: 1000,
} as const;

// Audit log configuration
export const AUDIT_CONFIG = {
	RETENTION_DAYS: 365,
	MAX_LOGS_PER_QUERY: 1000,
	BATCH_SIZE: 100,
	IP_ADDRESS_MAX_LENGTH: 45, // IPv6 max length
	USER_AGENT_MAX_LENGTH: 500,
} as const;

// Resource permission configuration
export const RESOURCE_PERMISSION_CONFIG = {
	RESOURCE_TYPE_MAX_LENGTH: 50,
	RESOURCE_ID_MAX_LENGTH: 100,
	ACTION_MAX_LENGTH: 20,
	MAX_RESOURCE_PERMISSIONS_PER_ROLE: 10000,
} as const;

// API endpoints for roles feature
export const API_ENDPOINTS = {
	ROLES: "/api/admin/roles",
	PERMISSIONS: "/api/admin/permissions",
	USER_ROLES: "/api/admin/user-roles",
	RESOURCE_PERMISSIONS: "/api/admin/resource-permissions",
	AUDIT_LOGS: "/api/admin/audit-logs",
	STATS: {
		ROLES: "/api/admin/roles/stats",
		PERMISSIONS: "/api/admin/permissions/stats",
		USER_ROLES: "/api/admin/user-roles/stats",
		RESOURCE_PERMISSIONS: "/api/admin/resource-permissions/stats",
		AUDIT_LOGS: "/api/admin/audit-logs/stats",
	},
} as const;

// Application routes for roles feature
export const ROUTES = {
	ADMIN: "/admin",
	USER_MANAGEMENT: "/admin/user-management",
	ROLES: "/admin/user-management/roles",
	ROLE_DETAIL: (id: string) => `/admin/user-management/roles/${id}`,
	ROLE_EDIT: (id: string) => `/admin/user-management/roles/${id}/edit`,
	ROLE_CREATE: "/admin/user-management/roles/create",
	PERMISSIONS: "/admin/user-management/permissions",
	USER_ROLES: "/admin/user-management/user-roles",
} as const;

// Breadcrumb configurations
export const BREADCRUMBS = {
	ADMIN: { label: "Admin", href: "/admin" },
	USER_MANAGEMENT: { label: "User Management", href: "/admin/user-management" },
	ROLES: { label: "Roles", href: "/admin/user-management/roles" },
	PERMISSIONS: {
		label: "Permissions",
		href: "/admin/user-management/permissions",
	},
	USER_ROLES: {
		label: "User Roles",
		href: "/admin/user-management/user-roles",
	},
	// Dynamic breadcrumbs
	ROLE_DETAIL: (roleName: string) => ({ label: roleName }),
	ROLE_EDIT: (roleName?: string) => ({ label: roleName || "Edit Role" }),
	ROLE_CREATE: { label: "Create Role" },
} as const;

// Error messages
export const ERROR_MESSAGES = {
	ROLE: {
		NOT_FOUND: "Role not found",
		NAME_REQUIRED: "Role name is required",
		NAME_TOO_SHORT: `Role name must be at least ${ROLE_CONFIG.NAME_MIN_LENGTH} characters`,
		NAME_TOO_LONG: `Role name must not exceed ${ROLE_CONFIG.NAME_MAX_LENGTH} characters`,
		NAME_ALREADY_EXISTS: "Role name already exists",
		DESCRIPTION_TOO_LONG: `Description must not exceed ${ROLE_CONFIG.DESCRIPTION_MAX_LENGTH} characters`,
		CANNOT_DELETE_SYSTEM_ROLE: "System roles cannot be deleted",
		CANNOT_MODIFY_SYSTEM_ROLE: "System roles cannot be modified",
		HAS_ACTIVE_USERS: "Cannot delete role with active users",
	},
	PERMISSION: {
		NOT_FOUND: "Permission not found",
		ENTITY_REQUIRED: "Entity is required",
		FIELD_REQUIRED: "Field is required",
		ACTION_REQUIRED: "Action is required",
		ROLE_REQUIRED: "Role is required",
		DUPLICATE_PERMISSION: "Permission already exists for this role",
		INVALID_MASK_TYPE: "Invalid mask type",
	},
	USER_ROLE: {
		NOT_FOUND: "User role assignment not found",
		USER_REQUIRED: "User is required",
		ROLE_REQUIRED: "Role is required",
		ALREADY_ASSIGNED: "Role is already assigned to user",
		MAX_ROLES_EXCEEDED: `User cannot have more than ${ROLE_CONFIG.MAX_ROLES_PER_USER} roles`,
		CANNOT_REVOKE_LAST_ADMIN: "Cannot revoke the last admin role",
	},
	RESOURCE_PERMISSION: {
		NOT_FOUND: "Resource permission not found",
		RESOURCE_TYPE_REQUIRED: "Resource type is required",
		RESOURCE_ID_REQUIRED: "Resource ID is required",
		ACTION_REQUIRED: "Action is required",
		ROLE_REQUIRED: "Role is required",
		DUPLICATE_PERMISSION: "Resource permission already exists",
	},
	AUDIT: {
		NOT_FOUND: "Audit log not found",
		ACTION_REQUIRED: "Action is required",
		INVALID_DATE_RANGE: "Invalid date range",
		RETENTION_EXCEEDED: `Audit logs older than ${AUDIT_CONFIG.RETENTION_DAYS} days are not available`,
	},
	GENERAL: {
		UNAUTHORIZED: "Unauthorized access",
		FORBIDDEN: "Access forbidden",
		INVALID_INPUT: "Invalid input data",
		INTERNAL_ERROR: "Internal server error",
		VALIDATION_FAILED: "Validation failed",
		RESOURCE_NOT_FOUND: "Resource not found",
	},
} as const;

// Success messages
export const SUCCESS_MESSAGES = {
	ROLE: {
		CREATED: "Role created successfully",
		UPDATED: "Role updated successfully",
		DELETED: "Role deleted successfully",
		ACTIVATED: "Role activated successfully",
		DEACTIVATED: "Role deactivated successfully",
	},
	PERMISSION: {
		CREATED: "Permission created successfully",
		UPDATED: "Permission updated successfully",
		DELETED: "Permission deleted successfully",
		GRANTED: "Permission granted successfully",
		REVOKED: "Permission revoked successfully",
	},
	USER_ROLE: {
		ASSIGNED: "Role assigned successfully",
		REVOKED: "Role revoked successfully",
		BULK_ASSIGNED: "Roles assigned successfully",
		BULK_REVOKED: "Roles revoked successfully",
	},
	RESOURCE_PERMISSION: {
		CREATED: "Resource permission created successfully",
		UPDATED: "Resource permission updated successfully",
		DELETED: "Resource permission deleted successfully",
	},
} as const;

// Sort options
export const SORT_OPTIONS = {
	ROLES: [
		{ value: "name", label: "Name" },
		{ value: "createdAt", label: "Created Date" },
		{ value: "updatedAt", label: "Updated Date" },
		{ value: "isActive", label: "Status" },
	],
	PERMISSIONS: [
		{ value: "entity", label: "Entity" },
		{ value: "action", label: "Action" },
		{ value: "createdAt", label: "Created Date" },
	],
	USER_ROLES: [
		{ value: "createdAt", label: "Assigned Date" },
		{ value: "user.name", label: "User Name" },
		{ value: "role.name", label: "Role Name" },
	],
	AUDIT_LOGS: [
		{ value: "timestamp", label: "Timestamp" },
		{ value: "action", label: "Action" },
		{ value: "user.name", label: "User" },
	],
} as const;

// Filter options
export const FILTER_OPTIONS = {
	BOOLEAN: [
		{ value: "true", label: "Yes" },
		{ value: "false", label: "No" },
	],
	TIME_RANGES: [
		{ value: "today", label: "Today" },
		{ value: "week", label: "This Week" },
		{ value: "month", label: "This Month" },
		{ value: "quarter", label: "This Quarter" },
		{ value: "year", label: "This Year" },
	],
} as const;

// Cache keys
export const CACHE_KEYS = {
	ROLES: "roles",
	ROLE_STATS: "role_stats",
	PERMISSIONS: "permissions",
	PERMISSION_STATS: "permission_stats",
	USER_ROLES: "user_roles",
	USER_ROLE_STATS: "user_role_stats",
	RESOURCE_PERMISSIONS: "resource_permissions",
	AUDIT_LOGS: "audit_logs",
} as const;

// Cache TTL (in seconds)
export const CACHE_TTL = {
	SHORT: 300, // 5 minutes
	MEDIUM: 1800, // 30 minutes
	LONG: 3600, // 1 hour
	STATS: 900, // 15 minutes
} as const;

// Rate limiting
export const RATE_LIMITS = {
	ROLES: {
		CREATE: { requests: 10, window: 60 }, // 10 requests per minute
		UPDATE: { requests: 20, window: 60 },
		DELETE: { requests: 5, window: 60 },
	},
	PERMISSIONS: {
		CREATE: { requests: 50, window: 60 },
		UPDATE: { requests: 100, window: 60 },
		DELETE: { requests: 20, window: 60 },
	},
	USER_ROLES: {
		ASSIGN: { requests: 30, window: 60 },
		REVOKE: { requests: 30, window: 60 },
	},
} as const;
