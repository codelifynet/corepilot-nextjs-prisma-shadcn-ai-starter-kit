// Users API Endpoints - Centralized constants for users feature

export const USERS_API = {
	BASE: "/api/admin/users",
	USER: (id: string) => `/api/admin/users/${id}`,
	STATS: "/api/admin/users/stats",
	SESSIONS: (userId: string) => `/api/admin/users/${userId}/sessions`,
	SESSION: (userId: string, sessionId: string) => `/api/admin/users/${userId}/sessions/${sessionId}`,
	BAN: (id: string) => `/api/admin/users/${id}/ban`,
	UNBAN: (id: string) => `/api/admin/users/${id}/unban`,
	PASSWORD: (id: string) => `/api/admin/users/${id}/password`,
	ROLE: (id: string) => `/api/admin/users/${id}/role`,
	PERMISSIONS: (id: string) => `/api/admin/users/${id}/permissions`,
	IMPERSONATE: (id: string) => `/api/admin/users/${id}/impersonate`,
} as const;

// Users Routes - Internal application routes
export const USERS_ROUTES = {
	USERS: "/admin/users",
	USER_DETAIL: (id: string) => `/admin/users/${id}`,
	USER_EDIT: (id: string) => `/admin/users/${id}/edit`,
	USER_CREATE: "/admin/users/create",
	USER_MANAGEMENT: "/admin/user-management",
	PROFILE: "/profile",
} as const;