// Dashboard API Endpoints - Centralized constants for dashboard feature

export const DASHBOARD_API = {
	BASE: "/api/admin/dashboard",
	SYSTEM_STATS: "/api/admin/dashboard/system-stats",
	CPU: "/api/admin/dashboard/cpu",
	MEMORY: "/api/admin/dashboard/memory",
	DISK: "/api/admin/dashboard/disk",
	NETWORK: "/api/admin/dashboard/network",
	DASHBOARDS: "/api/admin/dashboard/dashboards",
	DASHBOARD: (id: string) => `/api/admin/dashboard/dashboards/${id}`,
	WIDGETS: (dashboardId: string) => `/api/admin/dashboard/dashboards/${dashboardId}/widgets`,
	ALERTS: "/api/admin/dashboard/alerts",
	ALERT: (id: string) => `/api/admin/dashboard/alerts/${id}`,
	STATS: "/api/admin/dashboard/stats",
	BUSINESS_METRICS: "/api/admin/dashboard/business-metrics",
} as const;

// Dashboard Routes - Internal application routes
export const DASHBOARD_ROUTES = {
	DASHBOARD: "/dashboard",
	ADMIN_DASHBOARD: "/admin/dashboard",
	SYSTEM_MONITORING: "/admin/dashboard/system",
	ALERTS: "/admin/dashboard/alerts",
	WIDGETS: "/admin/dashboard/widgets",
} as const;