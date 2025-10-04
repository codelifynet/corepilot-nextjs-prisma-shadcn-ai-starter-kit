// Dashboard Feature Exports
export * from "./components";
export * from "./views";
export * from "./types";
export * from "./constants";
export * from "./services";
export * from "./hooks";

// Re-export main components for easy access
export { DashboardView } from "./views";
export { DashboardChart } from "./components";
export { MOCK_DASHBOARD_STATS, CARD_GRADIENTS } from "./constants";

// Re-export services for easy access
export {
	getSystemStats,
	getDashboards,
	getDashboardById,
	createDashboard,
	updateDashboard,
	deleteDashboard,
	getDashboardWidgets,
	createDashboardWidget,
	updateDashboardWidget,
	deleteDashboardWidget,
} from "./services";
