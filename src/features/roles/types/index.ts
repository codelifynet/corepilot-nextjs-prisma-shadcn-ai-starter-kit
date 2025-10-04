// Roles Types - Barrel exports for all role-related type definitions

// Role types
export type {
	Role,
	RoleWithRelations,
	CreateRoleInput,
	UpdateRoleInput,
	RoleFilters,
	RoleStats,
} from "./role.types";

// Permission types
export type {
	Permission,
	PermissionWithRole,
	CreatePermissionInput,
	UpdatePermissionInput,
	PermissionFilters,
	PermissionStats,
	PermissionValidationResult,
	BulkPermissionOperation,
} from "./permission.types";

export {
	PermissionAction,
	MaskType,
	EntityType,
} from "./permission.types";

// UserRole types
export type {
	UserRole,
	UserRoleWithRelations,
	CreateUserRoleInput,
	UpdateUserRoleInput,
	UserRoleFilters,
	UserRoleStats,
	BulkUserRoleOperation,
	UserRoleAssignmentResult,
	BulkUserRoleResult,
	UserWithRoles,
	RoleWithUsers,
	UserRoleValidation,
} from "./user-role.types";

// ResourcePermission types
export type {
	ResourcePermission,
	ResourcePermissionWithRole,
	CreateResourcePermissionInput,
	UpdateResourcePermissionInput,
	ResourcePermissionFilters,
	ResourcePermissionStats,
	PermissionCheckResult,
	BulkResourcePermissionOperation,
	ResourcePermissionValidation,
	ResourceWithPermissions,
	RoleResourcePermissionsSummary,
	PermissionInheritanceChain,
} from "./resource-permission.types";

export {
	ResourceAction,
	ResourceType,
} from "./resource-permission.types";

// RoleAuditLog types
export type {
	RoleAuditLog,
	RoleAuditLogWithRelations,
	CreateRoleAuditLogInput,
	RoleAuditLogFilters,
	RoleAuditStats,
	AuditTimelineEntry,
	AuditReportConfig,
	AuditReportResult,
	SecurityAlertConfig,
	SecurityAlert,
	AuditLogValidation,
	ChangeSummary,
} from "./role-audit-log.types";

export { AuditAction } from "./role-audit-log.types";

// API types
export type {
	ApiResponse,
	PaginatedResponse,
	ApiError,
	ValidationError,
	BulkOperationResponse,
	ListQueryParams,
	RoleApiEndpoints,
	HttpMethod,
	ApiRequestConfig,
	ApiClientConfig,
	RoleWebhookPayload,
} from "./api.types";

// All types are already exported from their respective files above
