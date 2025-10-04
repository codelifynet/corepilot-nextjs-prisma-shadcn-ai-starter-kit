// RoleAuditLog Types - Audit trail type definitions for role changes

export interface RoleAuditLog {
	id: string;
	action: AuditAction;
	oldValue?: any | null;
	newValue?: any | null;
	timestamp: Date;
	ipAddress?: string | null;
	userAgent?: string | null;
	userId?: string | null;
	roleId?: string | null;
}

// RoleAuditLog with relations
export interface RoleAuditLogWithRelations extends RoleAuditLog {
	user?: User | null;
	role?: Role | null;
	details?: string | null;
}

// RoleAuditLog creation input
export interface CreateRoleAuditLogInput {
	action: AuditAction;
	oldValue?: any;
	newValue?: any;
	ipAddress?: string;
	userAgent?: string;
	userId?: string;
	roleId?: string;
}

// RoleAuditLog query filters
export interface RoleAuditLogFilters {
	search?: string;
	action?: AuditAction | AuditAction[];
	userId?: string;
	roleId?: string;
	userName?: string;
	roleName?: string;
	ipAddress?: string;
	dateFrom?: Date;
	dateTo?: Date;
	timeRange?: TimeRange;
}

export enum TimeRange {
	TODAY = "today",
	WEEK = "week",
	MONTH = "month",
	QUARTER = "quarter",
	YEAR = "year",
}

// Audit action enum
export enum AuditAction {
	CREATED = "CREATED",
	UPDATED = "UPDATED",
	DELETED = "DELETED",
	ASSIGNED = "ASSIGNED",
	REVOKED = "REVOKED",
	ACTIVATED = "ACTIVATED",
	DEACTIVATED = "DEACTIVATED",
	PERMISSION_GRANTED = "PERMISSION_GRANTED",
	PERMISSION_REVOKED = "PERMISSION_REVOKED",
	BULK_ASSIGNED = "BULK_ASSIGNED",
	BULK_REVOKED = "BULK_REVOKED",
}

// Audit statistics
export interface RoleAuditStats {
	totalLogs: number;
	logsByAction: Record<AuditAction, number>;
	logsByUser: Record<string, number>;
	logsByRole: Record<string, number>;
	recentActivity: number;
	topUsers: {
		userId: string;
		userName: string;
		actionCount: number;
	}[];
	topRoles: {
		roleId: string;
		roleName: string;
		actionCount: number;
	}[];
}

// Audit timeline entry
export interface AuditTimelineEntry {
	id: string;
	timestamp: Date;
	action: AuditAction;
	description: string;
	user?: {
		id: string;
		name: string;
		email: string;
	};
	role?: {
		id: string;
		name: string;
	};
	changes?: {
		field: string;
		oldValue: any;
		newValue: any;
	}[];
	metadata?: {
		ipAddress?: string;
		userAgent?: string;
		location?: string;
	};
}

// Audit report configuration
export interface AuditReportConfig {
	dateRange: {
		from: Date;
		to: Date;
	};
	filters: RoleAuditLogFilters;
	groupBy: "action" | "user" | "role" | "date";
	includeDetails: boolean;
	format: "json" | "csv" | "pdf";
}

// Audit report result
export interface AuditReportResult {
	config: AuditReportConfig;
	summary: RoleAuditStats;
	timeline: AuditTimelineEntry[];
	generatedAt: Date;
	totalRecords: number;
}

// Security alert configuration
export interface SecurityAlertConfig {
	suspiciousActions: AuditAction[];
	thresholds: {
		actionsPerMinute: number;
		actionsPerHour: number;
		actionsPerDay: number;
	};
	alertChannels: ("email" | "slack" | "webhook")[];
}

// Security alert
export interface SecurityAlert {
	id: string;
	type:
		| "suspicious_activity"
		| "bulk_changes"
		| "privilege_escalation"
		| "unusual_pattern";
	severity: "low" | "medium" | "high" | "critical";
	description: string;
	triggeredAt: Date;
	userId?: string;
	roleId?: string;
	relatedLogs: string[]; // Audit log IDs
	resolved: boolean;
	resolvedAt?: Date;
	resolvedBy?: string;
}

// Audit log validation
export interface AuditLogValidation {
	isValid: boolean;
	errors: string[];
	warnings: string[];
	requiredFields: string[];
}

// Change summary for complex updates
export interface ChangeSummary {
	totalChanges: number;
	fieldChanges: {
		field: string;
		type: "added" | "removed" | "modified";
		oldValue?: any;
		newValue?: any;
	}[];
	relationChanges: {
		relation: string;
		type: "added" | "removed";
		items: string[];
	}[];
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
