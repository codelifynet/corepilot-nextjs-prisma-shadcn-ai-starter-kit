// API Types - Common API request/response type definitions for roles feature

// Generic API response wrapper
export interface ApiResponse<T = any> {
	success: boolean;
	data?: T;
	error?: string;
	message?: string;
	timestamp: string;
}

// Paginated response
export interface PaginatedResponse<T = any> {
	data: T[];
	pagination: {
		page: number;
		limit: number;
		total: number;
		totalPages: number;
		hasNext: boolean;
		hasPrev: boolean;
	};
}

// API error response
export interface ApiError {
	code: string;
	message: string;
	details?: Record<string, any>;
	field?: string;
	timestamp: string;
}

// Validation error
export interface ValidationError {
	field: string;
	message: string;
	code: string;
	value?: any;
}

// Bulk operation response
export interface BulkOperationResponse<T = any> {
	successful: T[];
	failed: {
		item: any;
		error: ApiError;
	}[];
	summary: {
		total: number;
		successful: number;
		failed: number;
	};
}

// Query parameters for list endpoints
export interface ListQueryParams {
	page?: number;
	limit?: number;
	search?: string;
	sortBy?: string;
	sortOrder?: "asc" | "desc";
	filters?: Record<string, any>;
}

// Role API endpoints
export interface RoleApiEndpoints {
	// Role endpoints
	getRoles: (params?: ListQueryParams) => Promise<PaginatedResponse<Role>>;
	getRole: (id: string) => Promise<ApiResponse<Role>>;
	createRole: (data: CreateRoleInput) => Promise<ApiResponse<Role>>;
	updateRole: (id: string, data: UpdateRoleInput) => Promise<ApiResponse<Role>>;
	deleteRole: (id: string) => Promise<ApiResponse<void>>;
	getRoleStats: () => Promise<ApiResponse<RoleStats>>;

	// Permission endpoints
	getPermissions: (
		params?: ListQueryParams,
	) => Promise<PaginatedResponse<Permission>>;
	getPermission: (id: string) => Promise<ApiResponse<Permission>>;
	createPermission: (
		data: CreatePermissionInput,
	) => Promise<ApiResponse<Permission>>;
	updatePermission: (
		id: string,
		data: UpdatePermissionInput,
	) => Promise<ApiResponse<Permission>>;
	deletePermission: (id: string) => Promise<ApiResponse<void>>;
	getPermissionStats: () => Promise<ApiResponse<PermissionStats>>;

	// UserRole endpoints
	getUserRoles: (
		params?: ListQueryParams,
	) => Promise<PaginatedResponse<UserRole>>;
	getUserRole: (id: string) => Promise<ApiResponse<UserRole>>;
	assignRole: (data: CreateUserRoleInput) => Promise<ApiResponse<UserRole>>;
	revokeRole: (id: string) => Promise<ApiResponse<void>>;
	getUserRoleStats: () => Promise<ApiResponse<UserRoleStats>>;

	// ResourcePermission endpoints
	getResourcePermissions: (
		params?: ListQueryParams,
	) => Promise<PaginatedResponse<ResourcePermission>>;
	getResourcePermission: (
		id: string,
	) => Promise<ApiResponse<ResourcePermission>>;
	createResourcePermission: (
		data: CreateResourcePermissionInput,
	) => Promise<ApiResponse<ResourcePermission>>;
	updateResourcePermission: (
		id: string,
		data: UpdateResourcePermissionInput,
	) => Promise<ApiResponse<ResourcePermission>>;
	deleteResourcePermission: (id: string) => Promise<ApiResponse<void>>;
	checkResourcePermission: (
		resourceType: string,
		resourceId: string,
		action: string,
		roleId: string,
	) => Promise<ApiResponse<PermissionCheckResult>>;

	// Audit endpoints
	getAuditLogs: (
		params?: ListQueryParams,
	) => Promise<PaginatedResponse<RoleAuditLog>>;
	getAuditLog: (id: string) => Promise<ApiResponse<RoleAuditLog>>;
	getAuditStats: () => Promise<ApiResponse<RoleAuditStats>>;
	generateAuditReport: (
		config: AuditReportConfig,
	) => Promise<ApiResponse<AuditReportResult>>;
}

// HTTP methods
export type HttpMethod = "GET" | "POST" | "PUT" | "PATCH" | "DELETE";

// API request configuration
export interface ApiRequestConfig {
	method: HttpMethod;
	url: string;
	data?: any;
	params?: Record<string, any>;
	headers?: Record<string, string>;
	timeout?: number;
}

// API client configuration
export interface ApiClientConfig {
	baseURL: string;
	timeout: number;
	headers: Record<string, string>;
	retries: number;
	retryDelay: number;
}

// Webhook payload for role events
export interface RoleWebhookPayload {
	event:
		| "role.created"
		| "role.updated"
		| "role.deleted"
		| "role.assigned"
		| "role.revoked";
	timestamp: string;
	data: {
		role?: Role;
		user?: User;
		userRole?: UserRole;
		permission?: Permission;
		resourcePermission?: ResourcePermission;
		auditLog?: RoleAuditLog;
	};
	metadata: {
		userId?: string;
		ipAddress?: string;
		userAgent?: string;
	};
}

// Import types from other files
import type {
	Role,
	CreateRoleInput,
	UpdateRoleInput,
	RoleStats,
} from "./role.types";
import type {
	Permission,
	CreatePermissionInput,
	UpdatePermissionInput,
	PermissionStats,
} from "./permission.types";
import type {
	UserRole,
	CreateUserRoleInput,
	UserRoleStats,
} from "./user-role.types";
import type {
	ResourcePermission,
	CreateResourcePermissionInput,
	UpdateResourcePermissionInput,
	PermissionCheckResult,
} from "./resource-permission.types";
import type {
	RoleAuditLog,
	RoleAuditStats,
	AuditReportConfig,
	AuditReportResult,
} from "./role-audit-log.types";

// User type (simplified)
interface User {
	id: string;
	name: string;
	email: string;
}
