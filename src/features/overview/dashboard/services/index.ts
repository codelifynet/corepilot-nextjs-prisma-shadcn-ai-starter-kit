// Dashboard Services Index - FDD Structure
// ============================================================================
// NEW FDD-STRUCTURED SERVICES (RECOMMENDED)
// ============================================================================

// Read Operations (GET)
export * from "./get.service";

// Create Operations (POST)
export * from "./create.service";

// Update Operations (PUT/PATCH)
export * from "./update.service";

// Delete Operations (DELETE)
export * from "./delete.service";

// ============================================================================
// SERVICE INSTANCES FOR EASY IMPORT
// ============================================================================

// Export service instances for easy import
// Note: Old service classes have been replaced with functional services
// export { dashboardService } from "./dashboard.service";
// export { alertService } from "./alert.service";

// ============================================================================
// COMMONLY USED FUNCTIONS (DIRECT EXPORTS)
// ============================================================================

// System Monitoring Functions
export {
	getSystemStats,
	getCPUInfo,
	getMemoryInfo,
	getDiskInfo,
	getNetworkInfo,
	getSystemMetrics,
	getHistoricalMetrics,
} from "./get.service";

// Dashboard Functions
export { getDashboards, getDashboardById, getDashboardBySlug, getDefaultDashboard, getPublicDashboards } from "./get.service";
export { createDashboard, createDashboardFromTemplate, duplicateDashboard } from "./create.service";

export { updateDashboard, updateDashboardLayout, setDefaultDashboard, toggleDashboardPublic } from "./update.service";
export { deleteDashboard, deleteDashboards, deleteUserDashboards } from "./delete.service";

// Dashboard Widget Functions
export {
	getDashboardWidgets,
	getWidgetById,
	getActiveDashboardWidgets,
} from "./get.service";

export {
	createDashboardWidget,
	createDashboardWidgets,
} from "./create.service";

export {
	updateDashboardWidget,
	updateWidgetPosition,
	updateWidgetConfig,
	toggleWidgetActive,
	updateWidgetPositions,
} from "./update.service";

export {
	deleteDashboardWidget,
	deleteDashboardWidgets,
	deleteDashboardAllWidgets,
	deleteInactiveWidgets,
} from "./delete.service";

// System Alert Functions
export {
	getSystemAlertById,
	getSystemAlerts,
	getActiveAlerts,
	getCriticalAlerts,
	getAlertStats,
} from "./get.service";

export {
	createSystemAlert,
	createSystemAlerts,
	createAlertFromMetric,
} from "./create.service";

export {
	updateSystemAlert,
	acknowledgeAlert,
	resolveAlert,
	ignoreAlert,
	reactivateAlert,
	updateAlertCurrentValue,
	bulkAcknowledgeAlerts,
	bulkResolveAlerts,
} from "./update.service";

export {
	deleteSystemAlert,
	deleteSystemAlerts,
	deleteResolvedAlerts,
	deleteOldAlerts,
	deleteAlertsByLevel,
	deleteAlertsByStatus,
} from "./delete.service";

// System Metrics Functions
export {
	createSystemMetric,
	createSystemMetrics,
	saveSystemStats,
} from "./create.service";

export {
	updateSystemMetric,
	updateMetricValue,
	updateMetricMetadata,
	updateMetricTags,
} from "./update.service";

export {
	deleteSystemMetric,
	deleteSystemMetrics,
	deleteOldSystemMetrics,
	deleteSystemMetricsByType,
	deleteSystemMetricsByHostname,
} from "./delete.service";

// Business Metrics Functions
export {
	getBusinessMetrics,
} from "./get.service";

// Utility Functions
export {
	cleanupSystemData,
} from "./delete.service";

