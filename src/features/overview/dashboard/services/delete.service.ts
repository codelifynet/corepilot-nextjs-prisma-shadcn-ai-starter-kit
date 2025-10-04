import type { AlertLevel, AlertStatus, SystemMetricType } from "@/generated/prisma/client";
import { prisma } from "@/lib/prisma";
import { revalidateTag } from "next/cache";

/**
 * Dashboard Delete Service
 * Handles all deletion operations for dashboard-related entities
 * Following FDD principles with SOLID design patterns
 */

// ============================================================================
// DASHBOARD DELETE OPERATIONS
// ============================================================================

/**
 * Delete a dashboard and all its associated widgets
 */
export async function deleteDashboard(
	id: string,
	userId?: string,
): Promise<{ success: boolean; message: string }> {
	try {
		// Verify dashboard exists
		const existingDashboard = await prisma.dashboard.findUnique({
			where: { id },
			include: {
				widgets: {
					select: { id: true },
				},
			},
		});

		if (!existingDashboard) {
			throw new Error("Dashboard not found");
		}

		// Check ownership if userId is provided
		if (userId && existingDashboard.userId !== userId) {
			throw new Error("Unauthorized to delete this dashboard");
		}

		// Prevent deletion of default dashboard
		if (existingDashboard.isDefault) {
			throw new Error("Cannot delete the default dashboard");
		}

		// Delete dashboard and all associated widgets in transaction
		await prisma.$transaction(async (tx) => {
			// Delete all widgets first
			if (existingDashboard.widgets.length > 0) {
				await tx.dashboardWidget.deleteMany({
					where: { dashboardId: id },
				});
			}

			// Delete the dashboard
			await tx.dashboard.delete({
				where: { id },
			});
		});

		// Revalidate cache
		revalidateTag("dashboards");
		revalidateTag(`dashboard-${id}`);
		revalidateTag(`dashboard-widgets-${id}`);

		return {
			success: true,
			message: `Dashboard "${existingDashboard.title}" deleted successfully`,
		};
	} catch (error) {
		console.error("Error deleting dashboard:", error);
		if (error instanceof Error) {
			throw error;
		}
		throw new Error("Failed to delete dashboard");
	}
}

/**
 * Delete multiple dashboards
 */
export async function deleteDashboards(
	ids: string[],
	userId?: string,
): Promise<{ success: boolean; message: string; deletedCount: number }> {
	try {
		if (!ids || ids.length === 0) {
			throw new Error("No dashboard IDs provided");
		}

		// Verify all dashboards exist and check permissions
		const existingDashboards = await prisma.dashboard.findMany({
			where: { id: { in: ids } },
			select: {
				id: true,
				title: true,
				userId: true,
				isDefault: true,
			},
		});

		if (existingDashboards.length !== ids.length) {
			throw new Error("One or more dashboards not found");
		}

		// Check ownership and default status
		for (const dashboard of existingDashboards) {
			if (userId && dashboard.userId !== userId) {
				throw new Error(
					`Unauthorized to delete dashboard "${dashboard.title}"`,
				);
			}
			if (dashboard.isDefault) {
				throw new Error(`Cannot delete default dashboard "${dashboard.title}"`);
			}
		}

		// Delete dashboards and their widgets in transaction
		let deletedCount = 0;
		await prisma.$transaction(async (tx) => {
			// Delete all widgets for these dashboards
			await tx.dashboardWidget.deleteMany({
				where: { dashboardId: { in: ids } },
			});

			// Delete the dashboards
			const result = await tx.dashboard.deleteMany({
				where: { id: { in: ids } },
			});

			deletedCount = result.count;
		});

		// Revalidate cache
		revalidateTag("dashboards");
		ids.forEach((id) => {
			revalidateTag(`dashboard-${id}`);
			revalidateTag(`dashboard-widgets-${id}`);
		});

		return {
			success: true,
			message: `${deletedCount} dashboard(s) deleted successfully`,
			deletedCount,
		};
	} catch (error) {
		console.error("Error deleting dashboards:", error);
		if (error instanceof Error) {
			throw error;
		}
		throw new Error("Failed to delete dashboards");
	}
}

/**
 * Delete all dashboards for a user
 */
export async function deleteUserDashboards(
	userId: string,
): Promise<{ success: boolean; message: string; deletedCount: number }> {
	try {
		if (!userId) {
			throw new Error("User ID is required");
		}

		// Get all user dashboards except default ones
		const userDashboards = await prisma.dashboard.findMany({
			where: {
				userId,
				isDefault: false,
			},
			select: { id: true },
		});

		if (userDashboards.length === 0) {
			return {
				success: true,
				message: "No non-default dashboards found to delete",
				deletedCount: 0,
			};
		}

		const dashboardIds = userDashboards.map((d) => d.id);

		// Delete dashboards and their widgets in transaction
		let deletedCount = 0;
		await prisma.$transaction(async (tx) => {
			// Delete all widgets for these dashboards
			await tx.dashboardWidget.deleteMany({
				where: { dashboardId: { in: dashboardIds } },
			});

			// Delete the dashboards
			const result = await tx.dashboard.deleteMany({
				where: {
					userId,
					isDefault: false,
				},
			});

			deletedCount = result.count;
		});

		// Revalidate cache
		revalidateTag("dashboards");
		dashboardIds.forEach((id) => {
			revalidateTag(`dashboard-${id}`);
			revalidateTag(`dashboard-widgets-${id}`);
		});

		return {
			success: true,
			message: `${deletedCount} dashboard(s) deleted for user`,
			deletedCount,
		};
	} catch (error) {
		console.error("Error deleting user dashboards:", error);
		if (error instanceof Error) {
			throw error;
		}
		throw new Error("Failed to delete user dashboards");
	}
}

// ============================================================================
// DASHBOARD WIDGET DELETE OPERATIONS
// ============================================================================

/**
 * Delete a dashboard widget
 */
export async function deleteDashboardWidget(
	id: string,
): Promise<{ success: boolean; message: string }> {
	try {
		// Verify widget exists
		const existingWidget = await prisma.dashboardWidget.findUnique({
			where: { id },
			select: {
				id: true,
				title: true,
				dashboardId: true,
			},
		});

		if (!existingWidget) {
			throw new Error("Widget not found");
		}

		// Delete the widget
		await prisma.dashboardWidget.delete({
			where: { id },
		});

		// Revalidate cache
		revalidateTag("dashboards");
		revalidateTag(`dashboard-${existingWidget.dashboardId}`);
		revalidateTag(`dashboard-widgets-${existingWidget.dashboardId}`);

		return {
			success: true,
			message: `Widget "${existingWidget.title}" deleted successfully`,
		};
	} catch (error) {
		console.error("Error deleting dashboard widget:", error);
		if (error instanceof Error) {
			throw error;
		}
		throw new Error("Failed to delete dashboard widget");
	}
}

/**
 * Delete multiple dashboard widgets
 */
export async function deleteDashboardWidgets(
	ids: string[],
): Promise<{ success: boolean; message: string; deletedCount: number }> {
	try {
		if (!ids || ids.length === 0) {
			throw new Error("No widget IDs provided");
		}

		// Verify all widgets exist
		const existingWidgets = await prisma.dashboardWidget.findMany({
			where: { id: { in: ids } },
			select: {
				id: true,
				dashboardId: true,
			},
		});

		if (existingWidgets.length !== ids.length) {
			throw new Error("One or more widgets not found");
		}

		// Delete the widgets
		const result = await prisma.dashboardWidget.deleteMany({
			where: { id: { in: ids } },
		});

		// Get unique dashboard IDs for cache invalidation
		const dashboardIds = [
			...new Set(existingWidgets.map((w) => w.dashboardId)),
		];

		// Revalidate cache
		revalidateTag("dashboards");
		dashboardIds.forEach((dashboardId) => {
			revalidateTag(`dashboard-${dashboardId}`);
			revalidateTag(`dashboard-widgets-${dashboardId}`);
		});

		return {
			success: true,
			message: `${result.count} widget(s) deleted successfully`,
			deletedCount: result.count,
		};
	} catch (error) {
		console.error("Error deleting dashboard widgets:", error);
		if (error instanceof Error) {
			throw error;
		}
		throw new Error("Failed to delete dashboard widgets");
	}
}

/**
 * Delete all widgets from a dashboard
 */
export async function deleteDashboardAllWidgets(
	dashboardId: string,
): Promise<{ success: boolean; message: string; deletedCount: number }> {
	try {
		if (!dashboardId) {
			throw new Error("Dashboard ID is required");
		}

		// Verify dashboard exists
		const dashboard = await prisma.dashboard.findUnique({
			where: { id: dashboardId },
			select: { id: true, title: true },
		});

		if (!dashboard) {
			throw new Error("Dashboard not found");
		}

		// Delete all widgets for this dashboard
		const result = await prisma.dashboardWidget.deleteMany({
			where: { dashboardId },
		});

		// Revalidate cache
		revalidateTag("dashboards");
		revalidateTag(`dashboard-${dashboardId}`);
		revalidateTag(`dashboard-widgets-${dashboardId}`);

		return {
			success: true,
			message: `${result.count} widget(s) deleted from dashboard "${dashboard.title}"`,
			deletedCount: result.count,
		};
	} catch (error) {
		console.error("Error deleting dashboard widgets:", error);
		if (error instanceof Error) {
			throw error;
		}
		throw new Error("Failed to delete dashboard widgets");
	}
}

/**
 * Delete inactive widgets from a dashboard
 */
export async function deleteInactiveWidgets(
	dashboardId?: string,
): Promise<{ success: boolean; message: string; deletedCount: number }> {
	try {
		const whereClause: any = { isActive: false };
		if (dashboardId) {
			whereClause.dashboardId = dashboardId;
		}

		// Delete inactive widgets
		const result = await prisma.dashboardWidget.deleteMany({
			where: whereClause,
		});

		// Revalidate cache
		revalidateTag("dashboards");
		if (dashboardId) {
			revalidateTag(`dashboard-${dashboardId}`);
			revalidateTag(`dashboard-widgets-${dashboardId}`);
		}

		return {
			success: true,
			message: `${result.count} inactive widget(s) deleted`,
			deletedCount: result.count,
		};
	} catch (error) {
		console.error("Error deleting inactive widgets:", error);
		if (error instanceof Error) {
			throw error;
		}
		throw new Error("Failed to delete inactive widgets");
	}
}

// ============================================================================
// SYSTEM METRICS DELETE OPERATIONS
// ============================================================================

/**
 * Delete a system metric
 */
export async function deleteSystemMetric(
	id: string,
): Promise<{ success: boolean; message: string }> {
	try {
		// Verify metric exists
		const existingMetric = await prisma.systemMetric.findUnique({
			where: { id },
			select: {
				id: true,
				name: true,
			},
		});

		if (!existingMetric) {
			throw new Error("System metric not found");
		}

		// Delete the metric
		await prisma.systemMetric.delete({
			where: { id },
		});

		// Revalidate cache
		revalidateTag("system-metrics");

		return {
			success: true,
			message: `System metric "${existingMetric.name}" deleted successfully`,
		};
	} catch (error) {
		console.error("Error deleting system metric:", error);
		if (error instanceof Error) {
			throw error;
		}
		throw new Error("Failed to delete system metric");
	}
}

/**
 * Delete multiple system metrics
 */
export async function deleteSystemMetrics(
	ids: string[],
): Promise<{ success: boolean; message: string; deletedCount: number }> {
	try {
		if (!ids || ids.length === 0) {
			throw new Error("No metric IDs provided");
		}

		// Delete the metrics
		const result = await prisma.systemMetric.deleteMany({
			where: { id: { in: ids } },
		});

		// Revalidate cache
		revalidateTag("system-metrics");

		return {
			success: true,
			message: `${result.count} system metric(s) deleted successfully`,
			deletedCount: result.count,
		};
	} catch (error) {
		console.error("Error deleting system metrics:", error);
		if (error instanceof Error) {
			throw error;
		}
		throw new Error("Failed to delete system metrics");
	}
}

/**
 * Delete old system metrics (older than specified days)
 */
export async function deleteOldSystemMetrics(
	daysOld: number = 30,
): Promise<{ success: boolean; message: string; deletedCount: number }> {
	try {
		if (daysOld <= 0) {
			throw new Error("Days old must be a positive number");
		}

		const cutoffDate = new Date();
		cutoffDate.setDate(cutoffDate.getDate() - daysOld);

		// Delete old metrics
		const result = await prisma.systemMetric.deleteMany({
			where: {
				createdAt: {
					lt: cutoffDate,
				},
			},
		});

		// Revalidate cache
		revalidateTag("system-metrics");

		return {
			success: true,
			message: `${result.count} old system metric(s) deleted (older than ${daysOld} days)`,
			deletedCount: result.count,
		};
	} catch (error) {
		console.error("Error deleting old system metrics:", error);
		if (error instanceof Error) {
			throw error;
		}
		throw new Error("Failed to delete old system metrics");
	}
}

/**
 * Delete system metrics by type
 */
export async function deleteSystemMetricsByType(
	type: string,
): Promise<{ success: boolean; message: string; deletedCount: number }> {
	try {
		if (!type) {
			throw new Error("Metric type is required");
		}

		// Delete metrics by type
		const result = await prisma.systemMetric.deleteMany({
			where: { type: type as SystemMetricType },
		});

		// Revalidate cache
		revalidateTag("system-metrics");

		return {
			success: true,
			message: `${result.count} system metric(s) of type "${type}" deleted successfully`,
			deletedCount: result.count,
		};
	} catch (error) {
		console.error("Error deleting system metrics by type:", error);
		if (error instanceof Error) {
			throw error;
		}
		throw new Error("Failed to delete system metrics by type");
	}
}

/**
 * Delete system metrics by hostname
 */
export async function deleteSystemMetricsByHostname(
	hostname: string,
): Promise<{ success: boolean; message: string; deletedCount: number }> {
	try {
		if (!hostname) {
			throw new Error("Hostname is required");
		}

		// Delete metrics by hostname
		const result = await prisma.systemMetric.deleteMany({
			where: { hostname },
		});

		// Revalidate cache
		revalidateTag("system-metrics");

		return {
			success: true,
			message: `${result.count} system metric(s) for hostname "${hostname}" deleted successfully`,
			deletedCount: result.count,
		};
	} catch (error) {
		console.error("Error deleting system metrics by hostname:", error);
		if (error instanceof Error) {
			throw error;
		}
		throw new Error("Failed to delete system metrics by hostname");
	}
}

// ============================================================================
// SYSTEM ALERTS DELETE OPERATIONS
// ============================================================================

/**
 * Delete a system alert
 */
export async function deleteSystemAlert(
	id: string,
): Promise<{ success: boolean; message: string }> {
	try {
		// Verify alert exists
		const existingAlert = await prisma.systemAlert.findUnique({
			where: { id },
			select: {
				id: true,
				title: true,
			},
		});

		if (!existingAlert) {
			throw new Error("System alert not found");
		}

		// Delete the alert
		await prisma.systemAlert.delete({
			where: { id },
		});

		// Revalidate cache
		revalidateTag("system-alerts");
		revalidateTag("active-alerts");

		return {
			success: true,
			message: `System alert "${existingAlert.title}" deleted successfully`,
		};
	} catch (error) {
		console.error("Error deleting system alert:", error);
		if (error instanceof Error) {
			throw error;
		}
		throw new Error("Failed to delete system alert");
	}
}

/**
 * Delete multiple system alerts
 */
export async function deleteSystemAlerts(
	ids: string[],
): Promise<{ success: boolean; message: string; deletedCount: number }> {
	try {
		if (!ids || ids.length === 0) {
			throw new Error("No alert IDs provided");
		}

		// Delete the alerts
		const result = await prisma.systemAlert.deleteMany({
			where: { id: { in: ids } },
		});

		// Revalidate cache
		revalidateTag("system-alerts");
		revalidateTag("active-alerts");

		return {
			success: true,
			message: `${result.count} system alert(s) deleted successfully`,
			deletedCount: result.count,
		};
	} catch (error) {
		console.error("Error deleting system alerts:", error);
		if (error instanceof Error) {
			throw error;
		}
		throw new Error("Failed to delete system alerts");
	}
}

/**
 * Delete resolved alerts
 */
export async function deleteResolvedAlerts(): Promise<{
	success: boolean;
	message: string;
	deletedCount: number;
}> {
	try {
		// Delete resolved alerts
		const result = await prisma.systemAlert.deleteMany({
			where: {
				status: "RESOLVED",
			},
		});

		// Revalidate cache
		revalidateTag("system-alerts");
		revalidateTag("active-alerts");

		return {
			success: true,
			message: `${result.count} resolved alert(s) deleted successfully`,
			deletedCount: result.count,
		};
	} catch (error) {
		console.error("Error deleting resolved alerts:", error);
		if (error instanceof Error) {
			throw error;
		}
		throw new Error("Failed to delete resolved alerts");
	}
}

/**
 * Delete old alerts (older than specified days)
 */
export async function deleteOldAlerts(
	daysOld: number = 30,
): Promise<{ success: boolean; message: string; deletedCount: number }> {
	try {
		if (daysOld <= 0) {
			throw new Error("Days old must be a positive number");
		}

		const cutoffDate = new Date();
		cutoffDate.setDate(cutoffDate.getDate() - daysOld);

		// Delete old alerts
		const result = await prisma.systemAlert.deleteMany({
			where: {
				createdAt: {
					lt: cutoffDate,
				},
			},
		});

		// Revalidate cache
		revalidateTag("system-alerts");
		revalidateTag("active-alerts");

		return {
			success: true,
			message: `${result.count} old alert(s) deleted (older than ${daysOld} days)`,
			deletedCount: result.count,
		};
	} catch (error) {
		console.error("Error deleting old alerts:", error);
		if (error instanceof Error) {
			throw error;
		}
		throw new Error("Failed to delete old alerts");
	}
}

/**
 * Delete alerts by level
 */
export async function deleteAlertsByLevel(
	level: string,
): Promise<{ success: boolean; message: string; deletedCount: number }> {
	try {
		if (!level) {
			throw new Error("Alert level is required");
		}

		const validLevels = ["INFO", "WARNING", "ERROR", "CRITICAL"];
		if (!validLevels.includes(level)) {
			throw new Error(
				`Invalid alert level. Must be one of: ${validLevels.join(", ")}`,
			);
		}

		// Delete alerts by level
		const result = await prisma.systemAlert.deleteMany({
			where: { level: level as AlertLevel },
		});

		// Revalidate cache
		revalidateTag("system-alerts");
		revalidateTag("active-alerts");

		return {
			success: true,
			message: `${result.count} alert(s) with level "${level}" deleted successfully`,
			deletedCount: result.count,
		};
	} catch (error) {
		console.error("Error deleting alerts by level:", error);
		if (error instanceof Error) {
			throw error;
		}
		throw new Error("Failed to delete alerts by level");
	}
}

/**
 * Delete alerts by status
 */
export async function deleteAlertsByStatus(
	status: string,
): Promise<{ success: boolean; message: string; deletedCount: number }> {
	try {
		if (!status) {
			throw new Error("Alert status is required");
		}

		const validStatuses = ["ACTIVE", "ACKNOWLEDGED", "RESOLVED", "IGNORED"];
		if (!validStatuses.includes(status)) {
			throw new Error(
				`Invalid alert status. Must be one of: ${validStatuses.join(", ")}`,
			);
		}

		// Delete alerts by status
		const result = await prisma.systemAlert.deleteMany({
			where: { status: status as AlertStatus },
		});

		// Revalidate cache
		revalidateTag("system-alerts");
		revalidateTag("active-alerts");

		return {
			success: true,
			message: `${result.count} alert(s) with status "${status}" deleted successfully`,
			deletedCount: result.count,
		};
	} catch (error) {
		console.error("Error deleting alerts by status:", error);
		if (error instanceof Error) {
			throw error;
		}
		throw new Error("Failed to delete alerts by status");
	}
}

/**
 * Clean up system data (delete old metrics and resolved alerts)
 */
export async function cleanupSystemData(
	metricsRetentionDays: number = 30,
	alertsRetentionDays: number = 90,
): Promise<{
	success: boolean;
	message: string;
	deletedMetrics: number;
	deletedAlerts: number;
}> {
	try {
		// Delete old metrics and resolved alerts in parallel
		const [metricsResult, alertsResult] = await Promise.all([
			deleteOldSystemMetrics(metricsRetentionDays),
			deleteOldAlerts(alertsRetentionDays),
		]);

		return {
			success: true,
			message: `System cleanup completed: ${metricsResult.deletedCount} old metrics and ${alertsResult.deletedCount} old alerts deleted`,
			deletedMetrics: metricsResult.deletedCount,
			deletedAlerts: alertsResult.deletedCount,
		};
	} catch (error) {
		console.error("Error during system cleanup:", error);
		if (error instanceof Error) {
			throw error;
		}
		throw new Error("Failed to cleanup system data");
	}
}
