// RBAC Role Constants - Updated for new role system

export const USER_ROLES = {
	USER: "user",
	ADMIN: "admin",
	SUPERADMIN: "superadmin",
} as const;

export const USER_ROLE_LABELS: Record<string, string> = {
	user: "User",
	admin: "Admin",
	superadmin: "Super Admin",
} as const;

export const USER_ROLE_DESCRIPTIONS: Record<string, string> = {
	user: "Standard user with basic permissions",
	admin: "Administrator with elevated permissions",
	superadmin: "Super administrator with full system access",
} as const;

export const USER_ROLE_COLORS: Record<string, string> = {
	user: "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200",
	admin:
		"bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-200",
	superadmin: "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200",
} as const;

export const USER_STATUS_COLORS = {
	active: "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200",
	banned: "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200",
	unverified:
		"bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200",
} as const;

export const DEFAULT_USER_FILTERS = {
	page: 1,
	limit: 10,
	sort: "createdAt" as const,
	order: "desc" as const,
} as const;

export const USER_SORT_OPTIONS = [
	{ value: "name", label: "Name" },
	{ value: "email", label: "Email" },
	{ value: "role", label: "Role" },
	{ value: "createdAt", label: "Created Date" },
	{ value: "updatedAt", label: "Updated Date" },
] as const;

export const USER_PERMISSIONS = {
	USER: {
		user: ["read"],
		content: ["read"],
		analytics: ["read"],
	},
	ADMIN: {
		user: ["create", "read", "update", "delete", "ban", "unban"],
		role: ["create", "read", "update", "delete", "assign", "revoke"],
		permission: ["read", "assign", "revoke"],
		content: ["create", "read", "update", "delete", "publish"],
		analytics: ["read", "export"],
		billing: ["read", "manage"],
	},
	SUPERADMIN: {
		user: ["create", "read", "update", "delete", "ban", "unban"],
		role: ["create", "read", "update", "delete", "assign", "revoke"],
		permission: ["read", "assign", "revoke"],
		system: ["configure", "monitor", "maintain"],
		content: ["create", "read", "update", "delete", "publish"],
		analytics: ["read", "export"],
		billing: ["read", "manage"],
	},
} as const;

export const BAN_DURATION_OPTIONS = [
	{ value: 3600, label: "1 Hour" },
	{ value: 86400, label: "1 Day" },
	{ value: 604800, label: "1 Week" },
	{ value: 2592000, label: "1 Month" },
	{ value: 31536000, label: "1 Year" },
	{ value: 0, label: "Permanent" },
] as const;

export const USER_ACTIVITY_COLORS = {
	login: "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200",
	logout: "bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200",
	create: "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200",
	update:
		"bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200",
	delete: "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200",
	view: "bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200",
} as const;

export const BULK_ACTION_OPTIONS = [
	{ value: "ban", label: "Ban Users" },
	{ value: "unban", label: "Unban Users" },
	{ value: "verify-email", label: "Verify Email" },
	{ value: "unverify-email", label: "Unverify Email" },
	{ value: "set-role", label: "Set Role" },
	{ value: "delete", label: "Delete Users" },
] as const;
