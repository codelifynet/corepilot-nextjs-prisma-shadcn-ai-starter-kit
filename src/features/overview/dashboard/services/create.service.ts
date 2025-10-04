import { prisma } from "@/lib/prisma";
import { revalidateTag } from "next/cache";
import type {
  CreateDashboardInput,
  CreateDashboardWidgetInput,
  CreateSystemMetricInput,
  CreateSystemAlertInput,
  DashboardData,
  DashboardWidgetData,
  SystemMetricData,
  SystemAlertData,
} from "../types/dashboard.types";

/**
 * Dashboard Create Service
 * Handles all creation operations for dashboard-related entities
 * Following FDD principles with SOLID design patterns
 */

// ============================================================================
// DASHBOARD CREATION OPERATIONS
// ============================================================================

/**
 * Create a new dashboard
 */
export async function createDashboard(
  data: CreateDashboardInput,
  userId?: string
): Promise<DashboardData> {
  try {
    // Validate required fields
    if (!data.title?.trim()) {
      throw new Error("Dashboard title is required");
    }

    // Generate slug if not provided
    const slug = data.slug || generateSlug(data.title);

    // Check if slug already exists
    const existingDashboard = await prisma.dashboard.findUnique({
      where: { slug },
    });

    if (existingDashboard) {
      throw new Error(`Dashboard with slug "${slug}" already exists`);
    }

    // If this is set as default, unset other defaults for this user
    if (data.isDefault && userId) {
      await prisma.dashboard.updateMany({
        where: { 
          userId,
          isDefault: true,
        },
        data: { isDefault: false },
      });
    }

    // Create the dashboard
    const dashboard = await prisma.dashboard.create({
      data: {
        title: data.title.trim(),
        description: data.description?.trim(),
        slug,
        layout: data.layout || {},
        isDefault: data.isDefault || false,
        isPublic: data.isPublic || false,
        userId: userId || null,
        refreshInterval: data.refreshInterval,
        theme: data.theme,
      },
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
    revalidateTag(`dashboard-${dashboard.id}`);

    return mapDashboard(dashboard);
  } catch (error) {
    console.error("Error creating dashboard:", error);
    if (error instanceof Error) {
      throw error;
    }
    throw new Error("Failed to create dashboard");
  }
}

/**
 * Create a dashboard from template
 */
export async function createDashboardFromTemplate(
  templateId: string,
  data: Partial<CreateDashboardInput>,
  userId?: string
): Promise<DashboardData> {
  try {
    // Get the template dashboard
    const template = await prisma.dashboard.findUnique({
      where: { id: templateId },
      include: {
        widgets: true,
      },
    });

    if (!template) {
      throw new Error("Template dashboard not found");
    }

    // Create new dashboard based on template
    const newDashboard = await createDashboard(
      {
        title: data.title || `${template.title} (Copy)`,
        description: data.description || template.description || undefined,
        slug: data.slug || generateSlug(data.title || `${template.title} (Copy)`),
        layout: data.layout || (template.layout && typeof template.layout === 'object' && !Array.isArray(template.layout) ? template.layout as Record<string, any> : undefined),
        isDefault: data.isDefault || false,
        isPublic: data.isPublic || false,
        refreshInterval: data.refreshInterval || template.refreshInterval || undefined,
        theme: data.theme || template.theme || undefined,
      },
      userId
    );

    // Copy widgets from template
    if (template.widgets && template.widgets.length > 0) {
      const widgetPromises = template.widgets.map((widget) =>
        createDashboardWidget({
          title: widget.title,
          description: widget.description || undefined, // Convert null to undefined
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
          dashboardId: newDashboard.id,
        })
      );

      await Promise.all(widgetPromises);
    }

    // Return the complete dashboard with widgets
    return getDashboardById(newDashboard.id);
  } catch (error) {
    console.error("Error creating dashboard from template:", error);
    if (error instanceof Error) {
      throw error;
    }
    throw new Error("Failed to create dashboard from template");
  }
}

/**
 * Duplicate an existing dashboard
 */
export async function duplicateDashboard(
  dashboardId: string,
  data?: Partial<CreateDashboardInput>,
  userId?: string
): Promise<DashboardData> {
  try {
    return await createDashboardFromTemplate(dashboardId, data || {}, userId);
  } catch (error) {
    console.error("Error duplicating dashboard:", error);
    if (error instanceof Error) {
      throw error;
    }
    throw new Error("Failed to duplicate dashboard");
  }
}

// ============================================================================
// DASHBOARD WIDGET CREATION OPERATIONS
// ============================================================================

/**
 * Create a new dashboard widget
 */
export async function createDashboardWidget(
  data: CreateDashboardWidgetInput
): Promise<DashboardWidgetData> {
  try {
    // Validate required fields
    if (!data.title?.trim()) {
      throw new Error("Widget title is required");
    }

    if (!data.dashboardId) {
      throw new Error("Dashboard ID is required");
    }

    if (!data.type) {
      throw new Error("Widget type is required");
    }

    // Verify dashboard exists
    const dashboard = await prisma.dashboard.findUnique({
      where: { id: data.dashboardId },
    });

    if (!dashboard) {
      throw new Error("Dashboard not found");
    }

    // Validate position
    if (!data.position || typeof data.position !== 'object') {
      throw new Error("Widget position is required");
    }

    const { x, y, w, h } = data.position;
    if (typeof x !== 'number' || typeof y !== 'number' || 
        typeof w !== 'number' || typeof h !== 'number') {
      throw new Error("Widget position must contain numeric x, y, w, h values");
    }

    // Create the widget
    const widget = await prisma.dashboardWidget.create({
      data: {
        title: data.title.trim(),
        description: data.description?.trim(),
        type: data.type,
        size: data.size || "medium",
        position: data.position,
        isActive: data.isActive !== false, // Default to true
        dataSource: data.dataSource || "system",
        config: data.config || {},
        dashboardId: data.dashboardId,
      },
    });

    // Revalidate cache
    revalidateTag("dashboards");
    revalidateTag(`dashboard-${data.dashboardId}`);
    revalidateTag(`dashboard-widgets-${data.dashboardId}`);

    return mapWidget(widget);
  } catch (error) {
    console.error("Error creating dashboard widget:", error);
    if (error instanceof Error) {
      throw error;
    }
    throw new Error("Failed to create dashboard widget");
  }
}

/**
 * Create multiple dashboard widgets in batch
 */
export async function createDashboardWidgets(
  widgets: CreateDashboardWidgetInput[]
): Promise<DashboardWidgetData[]> {
  try {
    if (!widgets || widgets.length === 0) {
      throw new Error("No widgets provided");
    }

    // Validate all widgets first
    for (const widget of widgets) {
      if (!widget.title?.trim()) {
        throw new Error("All widgets must have a title");
      }
      if (!widget.dashboardId) {
        throw new Error("All widgets must have a dashboard ID");
      }
      if (!widget.type) {
        throw new Error("All widgets must have a type");
      }
    }

    // Get unique dashboard IDs to verify they exist
    const dashboardIds = [...new Set(widgets.map(w => w.dashboardId))];
    const dashboards = await prisma.dashboard.findMany({
      where: { id: { in: dashboardIds } },
      select: { id: true },
    });

    if (dashboards.length !== dashboardIds.length) {
      throw new Error("One or more dashboards not found");
    }

    // Create widgets in transaction
    const createdWidgets = await prisma.$transaction(
      widgets.map((widget) =>
        prisma.dashboardWidget.create({
          data: {
            title: widget.title.trim(),
            description: widget.description?.trim(),
            type: widget.type,
            size: widget.size || "medium",
            position: widget.position,
            isActive: widget.isActive !== false,
            dataSource: widget.dataSource || "system",
            config: widget.config || {},
            dashboardId: widget.dashboardId,
          },
        })
      )
    );

    // Revalidate cache for all affected dashboards
    dashboardIds.forEach(dashboardId => {
      revalidateTag(`dashboard-${dashboardId}`);
      revalidateTag(`dashboard-widgets-${dashboardId}`);
    });
    revalidateTag("dashboards");

    return createdWidgets.map(mapWidget);
  } catch (error) {
    console.error("Error creating dashboard widgets:", error);
    if (error instanceof Error) {
      throw error;
    }
    throw new Error("Failed to create dashboard widgets");
  }
}

// ============================================================================
// SYSTEM METRICS CREATION OPERATIONS
// ============================================================================

/**
 * Create a new system metric
 */
export async function createSystemMetric(
  data: CreateSystemMetricInput
): Promise<SystemMetricData> {
  try {
    // Validate required fields
    if (!data.type) {
      throw new Error("Metric type is required");
    }

    if (!data.name?.trim()) {
      throw new Error("Metric name is required");
    }

    if (typeof data.value !== 'number') {
      throw new Error("Metric value must be a number");
    }

    if (!data.unit?.trim()) {
      throw new Error("Metric unit is required");
    }

    // Create the metric
    const metric = await prisma.systemMetric.create({
      data: {
        type: data.type,
        name: data.name.trim(),
        value: data.value,
        unit: data.unit.trim(),
        hostname: data.hostname?.trim(),
        component: data.component?.trim(),
        metadata: data.metadata || {},
        tags: data.tags || [],
      },
    });

    // Revalidate cache
    revalidateTag("system-metrics");

    return mapSystemMetric(metric);
  } catch (error) {
    console.error("Error creating system metric:", error);
    if (error instanceof Error) {
      throw error;
    }
    throw new Error("Failed to create system metric");
  }
}

/**
 * Create multiple system metrics in batch
 */
export async function createSystemMetrics(
  metrics: CreateSystemMetricInput[]
): Promise<SystemMetricData[]> {
  try {
    if (!metrics || metrics.length === 0) {
      throw new Error("No metrics provided");
    }

    // Validate all metrics first
    for (const metric of metrics) {
      if (!metric.type) {
        throw new Error("All metrics must have a type");
      }
      if (!metric.name?.trim()) {
        throw new Error("All metrics must have a name");
      }
      if (typeof metric.value !== 'number') {
        throw new Error("All metric values must be numbers");
      }
      if (!metric.unit?.trim()) {
        throw new Error("All metrics must have a unit");
      }
    }

    // Create metrics in transaction
    const createdMetrics = await prisma.$transaction(
      metrics.map((metric) =>
        prisma.systemMetric.create({
          data: {
            type: metric.type,
            name: metric.name.trim(),
            value: metric.value,
            unit: metric.unit.trim(),
            hostname: metric.hostname?.trim(),
            component: metric.component?.trim(),
            metadata: metric.metadata || {},
            tags: metric.tags || [],
          },
        })
      )
    );

    // Revalidate cache
    revalidateTag("system-metrics");

    return createdMetrics.map(mapSystemMetric);
  } catch (error) {
    console.error("Error creating system metrics:", error);
    if (error instanceof Error) {
      throw error;
    }
    throw new Error("Failed to create system metrics");
  }
}

/**
 * Save current system statistics as metrics
 */
export async function saveSystemStats(
  stats: {
    cpu: { usage: number; temperature?: number };
    memory: { usage: number; total: number; used: number };
    disk: { usage: number; total: number; used: number };
    network: { rx: number; tx: number; rxSec: number; txSec: number };
  },
  hostname?: string
): Promise<SystemMetricData[]> {
  try {
    const timestamp = new Date();
    const host = hostname || "localhost";

    const metrics: CreateSystemMetricInput[] = [
      // CPU metrics
      {
        type: "CPU",
        name: "cpu_usage",
        value: stats.cpu.usage,
        unit: "percent",
        hostname: host,
        component: "system",
        metadata: { timestamp: timestamp.toISOString() },
        tags: ["system", "cpu"],
      },
      // Memory metrics
      {
        type: "MEMORY",
        name: "memory_usage",
        value: stats.memory.usage,
        unit: "percent",
        hostname: host,
        component: "system",
        metadata: { 
          timestamp: timestamp.toISOString(),
          total: stats.memory.total,
          used: stats.memory.used,
        },
        tags: ["system", "memory"],
      },
      // Disk metrics
      {
        type: "DISK",
        name: "disk_usage",
        value: stats.disk.usage,
        unit: "percent",
        hostname: host,
        component: "system",
        metadata: { 
          timestamp: timestamp.toISOString(),
          total: stats.disk.total,
          used: stats.disk.used,
        },
        tags: ["system", "disk"],
      },
      // Network metrics
      {
        type: "NETWORK",
        name: "network_rx",
        value: stats.network.rxSec,
        unit: "bytes/sec",
        hostname: host,
        component: "system",
        metadata: { 
          timestamp: timestamp.toISOString(),
          total_rx: stats.network.rx,
          total_tx: stats.network.tx,
        },
        tags: ["system", "network", "rx"],
      },
      {
        type: "NETWORK",
        name: "network_tx",
        value: stats.network.txSec,
        unit: "bytes/sec",
        hostname: host,
        component: "system",
        metadata: { 
          timestamp: timestamp.toISOString(),
          total_rx: stats.network.rx,
          total_tx: stats.network.tx,
        },
        tags: ["system", "network", "tx"],
      },
    ];

    // Add CPU temperature if available
    if (stats.cpu.temperature !== undefined) {
      metrics.push({
        type: "CPU",
        name: "cpu_temperature",
        value: stats.cpu.temperature,
        unit: "celsius",
        hostname: host,
        component: "system",
        metadata: { timestamp: timestamp.toISOString() },
        tags: ["system", "cpu", "temperature"],
      });
    }

    return await createSystemMetrics(metrics);
  } catch (error) {
    console.error("Error saving system stats:", error);
    if (error instanceof Error) {
      throw error;
    }
    throw new Error("Failed to save system stats");
  }
}

// ============================================================================
// SYSTEM ALERTS CREATION OPERATIONS
// ============================================================================

/**
 * Create a new system alert
 */
export async function createSystemAlert(
  data: CreateSystemAlertInput
): Promise<SystemAlertData> {
  try {
    // Validate required fields
    if (!data.title?.trim()) {
      throw new Error("Alert title is required");
    }

    if (!data.level) {
      throw new Error("Alert level is required");
    }

    // Validate level
    const validLevels = ["INFO", "WARNING", "ERROR", "CRITICAL"];
    if (!validLevels.includes(data.level)) {
      throw new Error(`Invalid alert level. Must be one of: ${validLevels.join(", ")}`);
    }

    // Validate metric ID if provided
    if (data.metricId) {
      const metric = await prisma.systemMetric.findUnique({
        where: { id: data.metricId },
      });

      if (!metric) {
        throw new Error("Associated metric not found");
      }
    }

    // Create the alert
    const alert = await prisma.systemAlert.create({
      data: {
        title: data.title.trim(),
        description: data.description?.trim(),
        level: data.level,
        status: "ACTIVE", // New alerts are always active
        threshold: data.threshold,
        currentValue: data.currentValue,
        ...(data.metricId && { metricId: data.metricId }),
        metadata: data.metadata || {},
        tags: data.tags || [],
        type: "SYSTEM", // Default type for system alerts
        message: data.title.trim(), // Use title as message
      },
    });

    // Revalidate cache
    revalidateTag("system-alerts");
    revalidateTag("active-alerts");

    return mapSystemAlert(alert);
  } catch (error) {
    console.error("Error creating system alert:", error);
    if (error instanceof Error) {
      throw error;
    }
    throw new Error("Failed to create system alert");
  }
}

/**
 * Create multiple system alerts in batch
 */
export async function createSystemAlerts(
  alerts: CreateSystemAlertInput[]
): Promise<SystemAlertData[]> {
  try {
    if (!alerts || alerts.length === 0) {
      throw new Error("No alerts provided");
    }

    // Validate all alerts first
    const validLevels = ["INFO", "WARNING", "ERROR", "CRITICAL"];
    for (const alert of alerts) {
      if (!alert.title?.trim()) {
        throw new Error("All alerts must have a title");
      }
      if (!alert.level) {
        throw new Error("All alerts must have a level");
      }
      if (!validLevels.includes(alert.level)) {
        throw new Error(`Invalid alert level: ${alert.level}`);
      }
    }

    // Validate metric IDs if provided
    const metricIds = alerts
      .map(alert => alert.metricId)
      .filter(Boolean) as string[];

    if (metricIds.length > 0) {
      const metrics = await prisma.systemMetric.findMany({
        where: { id: { in: metricIds } },
        select: { id: true },
      });

      if (metrics.length !== metricIds.length) {
        throw new Error("One or more associated metrics not found");
      }
    }

    // Create alerts in transaction
    const createdAlerts = await prisma.$transaction(
      alerts.map((alert) =>
        prisma.systemAlert.create({
          data: {
            title: alert.title.trim(),
            description: alert.description?.trim(),
            level: alert.level,
            status: "ACTIVE",
            threshold: alert.threshold,
            currentValue: alert.currentValue,
            ...(alert.metricId && { metricId: alert.metricId }),
            metadata: alert.metadata || {},
            tags: alert.tags || [],
            type: "SYSTEM", // Default type for system alerts
            message: alert.title.trim(), // Use title as message
          },
        })
      )
    );

    // Revalidate cache
    revalidateTag("system-alerts");
    revalidateTag("active-alerts");

    return createdAlerts.map(mapSystemAlert);
  } catch (error) {
    console.error("Error creating system alerts:", error);
    if (error instanceof Error) {
      throw error;
    }
    throw new Error("Failed to create system alerts");
  }
}

/**
 * Create alert from metric threshold violation
 */
export async function createAlertFromMetric(
  metricId: string,
  threshold: number,
  currentValue: number,
  level: "INFO" | "WARNING" | "ERROR" | "CRITICAL" = "WARNING"
): Promise<SystemAlertData> {
  try {
    // Get the metric
    const metric = await prisma.systemMetric.findUnique({
      where: { id: metricId },
    });

    if (!metric) {
      throw new Error("Metric not found");
    }

    // Check if similar alert already exists and is active
    const existingAlert = await prisma.systemAlert.findFirst({
      where: {
        metricId,
        status: "ACTIVE",
        threshold,
      },
    });

    if (existingAlert) {
      // Update existing alert with new current value
      const updatedAlert = await prisma.systemAlert.update({
        where: { id: existingAlert.id },
        data: { 
          currentValue,
          updatedAt: new Date(),
        },
      });

      return mapSystemAlert(updatedAlert);
    }

    // Create new alert
    const title = `${metric.name} threshold exceeded`;
    const description = `${metric.name} value (${currentValue} ${metric.unit}) has exceeded the threshold of ${threshold} ${metric.unit}`;

    return await createSystemAlert({
      title,
      description,
      level,
      threshold,
      currentValue,
      metricId,
      metadata: {
        metricName: metric.name,
        metricType: metric.type,
        hostname: metric.hostname,
        component: metric.component,
      },
      tags: [...(metric.tags || []), "threshold", "automated"],
    });
  } catch (error) {
    console.error("Error creating alert from metric:", error);
    if (error instanceof Error) {
      throw error;
    }
    throw new Error("Failed to create alert from metric");
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
 * Get dashboard by ID (used in template creation)
 */
async function getDashboardById(id: string): Promise<DashboardData> {
  const dashboard = await prisma.dashboard.findUnique({
    where: { id },
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

  if (!dashboard) {
    throw new Error("Dashboard not found");
  }

  return mapDashboard(dashboard);
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