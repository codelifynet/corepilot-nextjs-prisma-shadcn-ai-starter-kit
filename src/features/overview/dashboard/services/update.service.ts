import { prisma } from "@/lib/prisma";
import { revalidateTag } from "next/cache";
import type {
	UpdateDashboardInput,
	UpdateDashboardWidgetInput,
	UpdateSystemMetricInput,
	UpdateSystemAlertInput,
	DashboardData,
	DashboardWidgetData,
	SystemMetricData,
	SystemAlertData,
} from "../types/dashboard.types";

/**
 * Dashboard Update Service
 * Handles all update operations for dashboard-related entities
 * Following FDD principles with SOLID design patterns
 */

// ============================================================================
// DASHBOARD UPDATE OPERATIONS
// ============================================================================

/**
 * Update an existing dashboard
 */
export async function updateDashboard(
	id: string,
	data: UpdateDashboardInput,
	userId?: string
): Promise<DashboardData> {
	try {
		// Verify dashboard exists
		const existingDashboard = await prisma.dashboard.findUnique({
			where: { id },
		});

		if (!existingDashboard) {
			throw new Error("Dashboard not found");
		}

		// Check ownership if userId is provided
		if (userId && existingDashboard.userId !== userId) {
			throw new Error("Unauthorized to update this dashboard");
		}

		// Handle slug update
		let slug = data.slug;
		if (data.title && !slug) {
			slug = generateSlug(data.title);
		}

		// Check if new slug conflicts with existing dashboards
		if (slug && slug !== existingDashboard.slug) {
			const conflictingDashboard = await prisma.dashboard.findUnique({
				where: { slug },
			});

			if (conflictingDashboard && conflictingDashboard.id !== id) {
				throw new Error(`Dashboard with slug "${slug}" already exists`);
			}
		}

		// If setting as default, unset other defaults for this user
		if (data.isDefault === true && existingDashboard.userId) {
			await prisma.dashboard.updateMany({
				where: {
					userId: existingDashboard.userId,
					isDefault: true,
					id: { not: id },
				},
				data: { isDefault: false },
			});
		}

		// Prepare update data
		const updateData: any = {};

		if (data.title !== undefined) {
			updateData.title = data.title.trim();
		}
		if (data.description !== undefined) {
			updateData.description = data.description?.trim() || null;
		}
		if (slug) {
			updateData.slug = slug;
		}
		if (data.layout !== undefined) {
			updateData.layout = data.layout;
		}
		if (data.isDefault !== undefined) {
			updateData.isDefault = data.isDefault;
		}
		if (data.isPublic !== undefined) {
			updateData.isPublic = data.isPublic;
		}
		if (data.refreshInterval !== undefined) {
			updateData.refreshInterval = data.refreshInterval;
		}
		if (data.theme !== undefined) {
			updateData.theme = data.theme;
		}

		// Update the dashboard
		const dashboard = await prisma.dashboard.update({
			where: { id },
			data: updateData,
			include: {
				widgets: {
					orderBy: { createdAt: "asc" },
				},
				user: {
					select: {
						id: true,
						name: true,
						email: true,
					},
				},
			},
		});

		// Revalidate cache
		revalidateTag("dashboards");
		revalidateTag(`dashboard-${id}`);

		return mapDashboard(dashboard);
	} catch (error) {
		console.error("Error updating dashboard:", error);
		if (error instanceof Error) {
			throw error;
		}
		throw new Error("Failed to update dashboard");
	}
}

/**
 * Update dashboard layout
 */
export async function updateDashboardLayout(
	id: string,
	layout: Record<string, any>,
	userId?: string
): Promise<DashboardData> {
	try {
		return await updateDashboard(id, { layout }, userId);
	} catch (error) {
		console.error("Error updating dashboard layout:", error);
		if (error instanceof Error) {
			throw error;
		}
		throw new Error("Failed to update dashboard layout");
	}
}

/**
 * Set dashboard as default
 */
export async function setDefaultDashboard(
	id: string,
	userId?: string
): Promise<DashboardData> {
	try {
		return await updateDashboard(id, { isDefault: true }, userId);
	} catch (error) {
		console.error("Error setting default dashboard:", error);
		if (error instanceof Error) {
			throw error;
		}
		throw new Error("Failed to set default dashboard");
	}
}

/**
 * Toggle dashboard public status
 */
export async function toggleDashboardPublic(
	id: string,
	userId?: string
): Promise<DashboardData> {
	try {
		// Get current status
		const dashboard = await prisma.dashboard.findUnique({
			where: { id },
			select: { isPublic: true, userId: true },
		});

		if (!dashboard) {
			throw new Error("Dashboard not found");
		}

		// Check ownership
		if (userId && dashboard.userId !== userId) {
			throw new Error("Unauthorized to update this dashboard");
		}

		return await updateDashboard(id, { isPublic: !dashboard.isPublic }, userId);
	} catch (error) {
		console.error("Error toggling dashboard public status:", error);
		if (error instanceof Error) {
			throw error;
		}
		throw new Error("Failed to toggle dashboard public status");
	}
}

// ============================================================================
// DASHBOARD WIDGET UPDATE OPERATIONS
// ============================================================================

/**
 * Update an existing dashboard widget
 */
export async function updateDashboardWidget(
	id: string,
	data: UpdateDashboardWidgetInput
): Promise<DashboardWidgetData> {
	try {
		// Verify widget exists
		const existingWidget = await prisma.dashboardWidget.findUnique({
			where: { id },
			include: {
				dashboard: {
					select: { id: true, userId: true },
				},
			},
		});

		if (!existingWidget) {
			throw new Error("Widget not found");
		}

		// Validate position if provided
		if (data.position) {
			const { x, y, w, h } = data.position;
			if (typeof x !== 'number' || typeof y !== 'number' ||
				typeof w !== 'number' || typeof h !== 'number') {
				throw new Error("Widget position must contain numeric x, y, w, h values");
			}
		}

		// Prepare update data
		const updateData: any = {};

		if (data.title !== undefined) {
			updateData.title = data.title.trim();
		}
		if (data.description !== undefined) {
			updateData.description = data.description?.trim() || null;
		}
		if (data.type !== undefined) {
			updateData.type = data.type;
		}
		if (data.size !== undefined) {
			updateData.size = data.size;
		}
		if (data.position !== undefined) {
			updateData.position = data.position;
		}
		if (data.isActive !== undefined) {
			updateData.isActive = data.isActive;
		}
		if (data.dataSource !== undefined) {
			updateData.dataSource = data.dataSource;
		}
		if (data.config !== undefined) {
			updateData.config = data.config;
		}

		// Update the widget
		const widget = await prisma.dashboardWidget.update({
			where: { id },
			data: updateData,
		});

		// Revalidate cache
		revalidateTag("dashboards");
		revalidateTag(`dashboard-${existingWidget.dashboardId}`);
		revalidateTag(`dashboard-widgets-${existingWidget.dashboardId}`);

		return mapWidget(widget);
	} catch (error) {
		console.error("Error updating dashboard widget:", error);
		if (error instanceof Error) {
			throw error;
		}
		throw new Error("Failed to update dashboard widget");
	}
}

/**
 * Update widget position
 */
export async function updateWidgetPosition(
	id: string,
	position: { x: number; y: number; w: number; h: number }
): Promise<DashboardWidgetData> {
	try {
		return await updateDashboardWidget(id, { position });
	} catch (error) {
		console.error("Error updating widget position:", error);
		if (error instanceof Error) {
			throw error;
		}
		throw new Error("Failed to update widget position");
	}
}

/**
 * Update widget configuration
 */
export async function updateWidgetConfig(
	id: string,
	config: Record<string, any>
): Promise<DashboardWidgetData> {
	try {
		return await updateDashboardWidget(id, { config });
	} catch (error) {
		console.error("Error updating widget config:", error);
		if (error instanceof Error) {
			throw error;
		}
		throw new Error("Failed to update widget config");
	}
}

/**
 * Toggle widget active status
 */
export async function toggleWidgetActive(id: string): Promise<DashboardWidgetData> {
	try {
		// Get current status
		const widget = await prisma.dashboardWidget.findUnique({
			where: { id },
			select: { isActive: true },
		});

		if (!widget) {
			throw new Error("Widget not found");
		}

		return await updateDashboardWidget(id, { isActive: !widget.isActive });
	} catch (error) {
		console.error("Error toggling widget active status:", error);
		if (error instanceof Error) {
			throw error;
		}
		throw new Error("Failed to toggle widget active status");
	}
}

/**
 * Update multiple widget positions in batch
 */
export async function updateWidgetPositions(
	updates: Array<{
		id: string;
		position: { x: number; y: number; w: number; h: number };
	}>
): Promise<DashboardWidgetData[]> {
	try {
		if (!updates || updates.length === 0) {
			throw new Error("No position updates provided");
		}

		// Validate all positions
		for (const update of updates) {
			const { x, y, w, h } = update.position;
			if (typeof x !== 'number' || typeof y !== 'number' ||
				typeof w !== 'number' || typeof h !== 'number') {
				throw new Error(`Invalid position for widget ${update.id}`);
			}
		}

		// Update widgets in transaction
		const updatedWidgets = await prisma.$transaction(
			updates.map((update) =>
				prisma.dashboardWidget.update({
					where: { id: update.id },
					data: { position: update.position },
				})
			)
		);

		// Get unique dashboard IDs for cache invalidation
		const dashboardIds = [...new Set(updatedWidgets.map(w => w.dashboardId))];

		// Revalidate cache
		dashboardIds.forEach(dashboardId => {
			revalidateTag(`dashboard-${dashboardId}`);
			revalidateTag(`dashboard-widgets-${dashboardId}`);
		});
		revalidateTag("dashboards");

		return updatedWidgets.map(mapWidget);
	} catch (error) {
		console.error("Error updating widget positions:", error);
		if (error instanceof Error) {
			throw error;
		}
		throw new Error("Failed to update widget positions");
	}
}

// ============================================================================
// SYSTEM METRICS UPDATE OPERATIONS
// ============================================================================

/**
 * Update an existing system metric
 */
export async function updateSystemMetric(
	id: string,
	data: UpdateSystemMetricInput
): Promise<SystemMetricData> {
	try {
		// Verify metric exists
		const existingMetric = await prisma.systemMetric.findUnique({
			where: { id },
		});

		if (!existingMetric) {
			throw new Error("System metric not found");
		}

		// Prepare update data
		const updateData: any = {};

		if (data.type !== undefined) {
			updateData.type = data.type;
		}
		if (data.name !== undefined) {
			updateData.name = data.name.trim();
		}
		if (data.value !== undefined) {
			if (typeof data.value !== 'number') {
				throw new Error("Metric value must be a number");
			}
			updateData.value = data.value;
		}
		if (data.unit !== undefined) {
			updateData.unit = data.unit.trim();
		}
		if (data.hostname !== undefined) {
			updateData.hostname = data.hostname?.trim() || null;
		}
		if (data.component !== undefined) {
			updateData.component = data.component?.trim() || null;
		}
		if (data.metadata !== undefined) {
			updateData.metadata = data.metadata;
		}
		if (data.tags !== undefined) {
			updateData.tags = data.tags;
		}

		// Update the metric
		const metric = await prisma.systemMetric.update({
			where: { id },
			data: updateData,
		});

		// Revalidate cache
		revalidateTag("system-metrics");

		return mapSystemMetric(metric);
	} catch (error) {
		console.error("Error updating system metric:", error);
		if (error instanceof Error) {
			throw error;
		}
		throw new Error("Failed to update system metric");
	}
}

/**
 * Update metric value
 */
export async function updateMetricValue(
	id: string,
	value: number
): Promise<SystemMetricData> {
	try {
		return await updateSystemMetric(id, { value });
	} catch (error) {
		console.error("Error updating metric value:", error);
		if (error instanceof Error) {
			throw error;
		}
		throw new Error("Failed to update metric value");
	}
}

/**
 * Update metric metadata
 */
export async function updateMetricMetadata(
	id: string,
	metadata: Record<string, any>
): Promise<SystemMetricData> {
	try {
		return await updateSystemMetric(id, { metadata });
	} catch (error) {
		console.error("Error updating metric metadata:", error);
		if (error instanceof Error) {
			throw error;
		}
		throw new Error("Failed to update metric metadata");
	}
}

/**
 * Update metric tags
 */
export async function updateMetricTags(
	id: string,
	tags: string[]
): Promise<SystemMetricData> {
	try {
		return await updateSystemMetric(id, { tags });
	} catch (error) {
		console.error("Error updating metric tags:", error);
		if (error instanceof Error) {
			throw error;
		}
		throw new Error("Failed to update metric tags");
	}
}

// ============================================================================
// SYSTEM ALERTS UPDATE OPERATIONS
// ============================================================================

/**
 * Update an existing system alert
 */
export async function updateSystemAlert(
	id: string,
	data: UpdateSystemAlertInput
): Promise<SystemAlertData> {
	try {
		// Verify alert exists
		const existingAlert = await prisma.systemAlert.findUnique({
			where: { id },
		});

		if (!existingAlert) {
			throw new Error("System alert not found");
		}

		// Validate level if provided
		if (data.level) {
			const validLevels = ["INFO", "WARNING", "ERROR", "CRITICAL"];
			if (!validLevels.includes(data.level)) {
				throw new Error(`Invalid alert level. Must be one of: ${validLevels.join(", ")}`);
			}
		}

		// Validate status if provided
		if (data.status) {
			const validStatuses = ["ACTIVE", "ACKNOWLEDGED", "RESOLVED", "IGNORED"];
			if (!validStatuses.includes(data.status)) {
				throw new Error(`Invalid alert status. Must be one of: ${validStatuses.join(", ")}`);
			}
		}

		// Prepare update data
		const updateData: any = {};

		if (data.title !== undefined) {
			updateData.title = data.title.trim();
		}
		if (data.description !== undefined) {
			updateData.description = data.description?.trim() || null;
		}
		if (data.level !== undefined) {
			updateData.level = data.level;
		}
		if (data.status !== undefined) {
			updateData.status = data.status;

			// Set timestamps based on status
			if (data.status === "RESOLVED" && !existingAlert.resolvedAt) {
				updateData.resolvedAt = new Date();
			} else if (data.status === "ACKNOWLEDGED" && !existingAlert.acknowledgedAt) {
				updateData.acknowledgedAt = new Date();
			}
		}
		if (data.threshold !== undefined) {
			updateData.threshold = data.threshold;
		}
		if (data.currentValue !== undefined) {
			updateData.currentValue = data.currentValue;
		}
		if (data.metadata !== undefined) {
			updateData.metadata = data.metadata;
		}
		if (data.tags !== undefined) {
			updateData.tags = data.tags;
		}
		if (data.acknowledgedBy !== undefined) {
			updateData.acknowledgedBy = data.acknowledgedBy;
			if (data.acknowledgedBy && !existingAlert.acknowledgedAt) {
				updateData.acknowledgedAt = new Date();
				updateData.status = "ACKNOWLEDGED";
			}
		}

		// Update the alert
		const alert = await prisma.systemAlert.update({
			where: { id },
			data: updateData,
		});

		// Revalidate cache
		revalidateTag("system-alerts");
		revalidateTag("active-alerts");

		return mapSystemAlert(alert);
	} catch (error) {
		console.error("Error updating system alert:", error);
		if (error instanceof Error) {
			throw error;
		}
		throw new Error("Failed to update system alert");
	}
}

/**
 * Acknowledge an alert
 */
export async function acknowledgeAlert(
	id: string,
	acknowledgedBy?: string
): Promise<SystemAlertData> {
	try {
		return await updateSystemAlert(id, {
			status: "ACKNOWLEDGED",
			acknowledgedBy,
		});
	} catch (error) {
		console.error("Error acknowledging alert:", error);
		if (error instanceof Error) {
			throw error;
		}
		throw new Error("Failed to acknowledge alert");
	}
}

/**
 * Resolve an alert
 */
export async function resolveAlert(id: string): Promise<SystemAlertData> {
	try {
		return await updateSystemAlert(id, {
			status: "RESOLVED",
		});
	} catch (error) {
		console.error("Error resolving alert:", error);
		if (error instanceof Error) {
			throw error;
		}
		throw new Error("Failed to resolve alert");
	}
}

/**
 * Ignore an alert
 */
export async function ignoreAlert(id: string): Promise<SystemAlertData> {
	try {
		return await updateSystemAlert(id, {
			status: "IGNORED",
		});
	} catch (error) {
		console.error("Error ignoring alert:", error);
		if (error instanceof Error) {
			throw error;
		}
		throw new Error("Failed to ignore alert");
	}
}

/**
 * Reactivate an alert
 */
export async function reactivateAlert(id: string): Promise<SystemAlertData> {
	try {
		return await updateSystemAlert(id, {
			status: "ACTIVE",
			resolvedAt: undefined,
			acknowledgedAt: undefined,
			acknowledgedBy: undefined,
		});
	} catch (error) {
		console.error("Error reactivating alert:", error);
		if (error instanceof Error) {
			throw error;
		}
		throw new Error("Failed to reactivate alert");
	}
}

/**
 * Update alert current value
 */
export async function updateAlertCurrentValue(
	id: string,
	currentValue: number
): Promise<SystemAlertData> {
	try {
		return await updateSystemAlert(id, { currentValue });
	} catch (error) {
		console.error("Error updating alert current value:", error);
		if (error instanceof Error) {
			throw error;
		}
		throw new Error("Failed to update alert current value");
	}
}

/**
 * Bulk acknowledge alerts
 */
export async function bulkAcknowledgeAlerts(
	alertIds: string[],
	acknowledgedBy?: string
): Promise<SystemAlertData[]> {
	try {
		if (!alertIds || alertIds.length === 0) {
			throw new Error("No alert IDs provided");
		}

		// Update alerts in transaction
		const updatedAlerts = await prisma.$transaction(
			alertIds.map((id) =>
				prisma.systemAlert.update({
					where: { id },
					data: {
						status: "ACKNOWLEDGED",
						acknowledgedAt: new Date(),
						acknowledgedBy: acknowledgedBy || null,
					},
				})
			)
		);

		// Revalidate cache
		revalidateTag("system-alerts");
		revalidateTag("active-alerts");

		return updatedAlerts.map(mapSystemAlert);
	} catch (error) {
		console.error("Error bulk acknowledging alerts:", error);
		if (error instanceof Error) {
			throw error;
		}
		throw new Error("Failed to bulk acknowledge alerts");
	}
}

/**
 * Bulk resolve alerts
 */
export async function bulkResolveAlerts(alertIds: string[]): Promise<SystemAlertData[]> {
	try {
		if (!alertIds || alertIds.length === 0) {
			throw new Error("No alert IDs provided");
		}

		// Update alerts in transaction
		const updatedAlerts = await prisma.$transaction(
			alertIds.map((id) =>
				prisma.systemAlert.update({
					where: { id },
					data: {
						status: "RESOLVED",
						resolvedAt: new Date(),
					},
				})
			)
		);

		// Revalidate cache
		revalidateTag("system-alerts");
		revalidateTag("active-alerts");

		return updatedAlerts.map(mapSystemAlert);
	} catch (error) {
		console.error("Error bulk resolving alerts:", error);
		if (error instanceof Error) {
			throw error;
		}
		throw new Error("Failed to bulk resolve alerts");
	}
}

// ============================================================================
// HELPER FUNCTIONS
// ============================================================================

/**
 * Generate a URL-friendly slug from a title
 */
function generateSlug(title: string): string {
	return title
		.toLowerCase()
		.trim()
		.replace(/[^\w\s-]/g, '') // Remove special characters
		.replace(/[\s_-]+/g, '-') // Replace spaces and underscores with hyphens
		.replace(/^-+|-+$/g, ''); // Remove leading/trailing hyphens
}

/**
 * Map Prisma dashboard to DashboardData type
 */
function mapDashboard(dashboard: any): DashboardData {
	return {
		id: dashboard.id,
		title: dashboard.title,
		description: dashboard.description || undefined,
		slug: dashboard.slug,
		layout: (dashboard.layout as Record<string, any>) || {},
		isDefault: dashboard.isDefault,
		isPublic: dashboard.isPublic,
		userId: dashboard.userId || undefined,
		widgets: dashboard.widgets?.map(mapWidget) || [],
		refreshInterval: dashboard.refreshInterval || undefined,
		theme: dashboard.theme || undefined,
		createdAt: dashboard.createdAt,
		updatedAt: dashboard.updatedAt,
	};
}

/**
 * Map Prisma widget to DashboardWidgetData type
 */
function mapWidget(widget: any): DashboardWidgetData {
	return {
		id: widget.id,
		title: widget.title,
		description: widget.description || undefined,
		type: widget.type,
		size: widget.size,
		position: widget.position as {
			x: number;
			y: number;
			w: number;
			h: number;
		},
		isActive: widget.isActive,
		dataSource: widget.dataSource,
		config: widget.config as Record<string, any>,
		dashboardId: widget.dashboardId,
	};
}

/**
 * Map Prisma system metric to SystemMetricData type
 */
function mapSystemMetric(metric: any): SystemMetricData {
	return {
		id: metric.id,
		type: metric.type as SystemMetricData["type"],
		name: metric.name,
		value: metric.value,
		unit: metric.unit,
		hostname: metric.hostname || undefined,
		component: metric.component || undefined,
		metadata: (metric.metadata as Record<string, any>) || {},
		tags: metric.tags || [],
		createdAt: metric.createdAt,
		updatedAt: metric.updatedAt,
	};
}

/**
 * Map Prisma system alert to SystemAlertData type
 */
function mapSystemAlert(alert: any): SystemAlertData {
	return {
		id: alert.id,
		title: alert.title,
		description: alert.description || undefined,
		level: alert.level as SystemAlertData["level"],
		status: alert.status as SystemAlertData["status"],
		threshold: alert.threshold || undefined,
		currentValue: alert.currentValue || undefined,
		metricId: alert.metricId || undefined,
		metadata: (alert.metadata as Record<string, any>) || {},
		tags: alert.tags || [],
		createdAt: alert.createdAt,
		updatedAt: alert.updatedAt,
		resolvedAt: alert.resolvedAt || undefined,
		acknowledgedAt: alert.acknowledgedAt || undefined,
		acknowledgedBy: alert.acknowledgedBy || undefined,
	};
}