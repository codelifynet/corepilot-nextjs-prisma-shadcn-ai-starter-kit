// Dashboard Hooks
export {
	// System Monitoring
	useSystemStats,
	useCPUInfo,
	useMemoryInfo,
	useDiskInfo,
	useNetworkInfo,
	// Dashboard Management
	useDashboards,
	useDashboard,
	useCreateDashboard,
	useUpdateDashboard,
	useDeleteDashboard,
	// Widget Management
	useDashboardWidgets,
	useCreateWidget,
	// Alert Management
	useAlerts,
	useAlert,
	useCreateAlert,
	useAcknowledgeAlert,
	useDeleteAlert,
	// Dashboard Statistics
	useDashboardStats,
	// Business Metrics
	useBusinessMetrics,
	// Query Keys
	dashboardQueryKeys,
} from "./useDashboard";
