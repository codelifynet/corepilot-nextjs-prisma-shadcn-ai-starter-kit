import { cache } from "react";
import { prisma } from "@/lib/prisma";
import si from "systeminformation";
import type {
	DashboardData,
	DashboardWidgetData,
	SystemStats,
	SystemMetricData,
	SystemAlertData,
	SystemAlertsFilters,
	SystemMetricsFilters,
	PaginationParams,
	BusinessMetricsResponse,
} from "../types/dashboard.types";

/**
 * Dashboard Get Service
 * Handles all read operations for dashboard-related data
 * Following FDD principles with SOLID design patterns
 */

// ============================================================================
// DASHBOARD READ OPERATIONS
// ============================================================================

/**
 * Get all dashboards with optional user filtering
 */
export const getDashboards = cache(async (userId?: string): Promise<DashboardData[]> => {
	try {
		const where = userId ? { userId } : {};

		const dashboards = await prisma.dashboard.findMany({
			where,
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
			orderBy: [
				{ isDefault: "desc" },
				{ createdAt: "desc" },
			],
		});

		return dashboards.map(mapDashboard);
	} catch (error) {
		console.error("Error fetching dashboards:", error);
		throw new Error("Failed to fetch dashboards");
	}
});

/**
 * Get dashboard by ID
 */
export const getDashboardById = cache(async (id: string): Promise<DashboardData | null> => {
	try {
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

		return dashboard ? mapDashboard(dashboard) : null;
	} catch (error) {
		console.error("Error fetching dashboard by ID:", error);
		throw new Error("Failed to fetch dashboard");
	}
});

/**
 * Get dashboard by slug
 */
export const getDashboardBySlug = cache(async (slug: string): Promise<DashboardData | null> => {
	try {
		const dashboard = await prisma.dashboard.findUnique({
			where: { slug },
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

		return dashboard ? mapDashboard(dashboard) : null;
	} catch (error) {
		console.error("Error fetching dashboard by slug:", error);
		throw new Error("Failed to fetch dashboard");
	}
});

/**
 * Get default dashboard
 */
export const getDefaultDashboard = cache(async (): Promise<DashboardData | null> => {
	try {
		const dashboard = await prisma.dashboard.findFirst({
			where: { isDefault: true },
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

		return dashboard ? mapDashboard(dashboard) : null;
	} catch (error) {
		console.error("Error fetching default dashboard:", error);
		throw new Error("Failed to fetch default dashboard");
	}
});

/**
 * Get public dashboards
 */
export const getPublicDashboards = cache(async (): Promise<DashboardData[]> => {
	try {
		const dashboards = await prisma.dashboard.findMany({
			where: { isPublic: true },
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
			orderBy: { createdAt: "desc" },
		});

		return dashboards.map(mapDashboard);
	} catch (error) {
		console.error("Error fetching public dashboards:", error);
		throw new Error("Failed to fetch public dashboards");
	}
});

// ============================================================================
// DASHBOARD WIDGET READ OPERATIONS
// ============================================================================

/**
 * Get all widgets for a dashboard
 */
export const getDashboardWidgets = cache(async (dashboardId: string): Promise<DashboardWidgetData[]> => {
	try {
		const widgets = await prisma.dashboardWidget.findMany({
			where: { dashboardId },
			orderBy: { createdAt: "asc" },
		});

		return widgets.map(mapWidget);
	} catch (error) {
		console.error("Error fetching dashboard widgets:", error);
		throw new Error("Failed to fetch dashboard widgets");
	}
});

/**
 * Get widget by ID
 */
export const getWidgetById = cache(async (id: string): Promise<DashboardWidgetData | null> => {
	try {
		const widget = await prisma.dashboardWidget.findUnique({
			where: { id },
		});

		return widget ? mapWidget(widget) : null;
	} catch (error) {
		console.error("Error fetching widget by ID:", error);
		throw new Error("Failed to fetch widget");
	}
});

/**
 * Get active widgets for a dashboard
 */
export const getActiveDashboardWidgets = cache(async (dashboardId: string): Promise<DashboardWidgetData[]> => {
	try {
		const widgets = await prisma.dashboardWidget.findMany({
			where: {
				dashboardId,
				isActive: true,
			},
			orderBy: { createdAt: "asc" },
		});

		return widgets.map(mapWidget);
	} catch (error) {
		console.error("Error fetching active dashboard widgets:", error);
		throw new Error("Failed to fetch active dashboard widgets");
	}
});

// ============================================================================
// SYSTEM MONITORING READ OPERATIONS
// ============================================================================

/**
 * Get real-time system statistics
 */
export const getSystemStats = cache(async (): Promise<SystemStats> => {
	try {
		// Check if we're in a browser environment
		if (typeof window !== 'undefined') {
			return getMockSystemStats();
		}

		const [
			cpu,
			memory,
			disk,
			network,
			system,
			processes,
			temperature,
			uptime,
		] = await Promise.all([
			si.cpu(),
			si.mem(),
			si.fsSize(),
			si.networkStats(),
			si.osInfo(),
			si.processes(),
			getCPUTemperature(),
			si.time(),
		]);

		const cpuUsage = await si.currentLoad();
		const networkInterfaces = await si.networkInterfaces();

		return {
			cpu: {
				usage: Math.round(cpuUsage.currentLoad || 0),
				total: cpu.cores || 0,
				used: Math.round((cpuUsage.currentLoad || 0) * (cpu.cores || 1) / 100),
				cores: cpu.cores || 0,
				model: cpu.manufacturer + " " + cpu.brand || "Unknown",
				speed: cpu.speed || 0,
				temperature: temperature.main || undefined,
			},
			memory: {
				usage: Math.round(((memory.used || 0) / (memory.total || 1)) * 100),
				total: memory.total || 0,
				used: memory.used || 0,
				free: memory.free || 0,
				available: memory.available || 0,
				buffers: memory.buffers || 0,
				cached: memory.cached || 0,
			},
			disk: {
				usage: Math.round(((disk[0]?.used || 0) / (disk[0]?.size || 1)) * 100),
				total: disk[0]?.size || 0,
				used: disk[0]?.used || 0,
				free: disk[0]?.available || 0,
				type: disk[0]?.type || "Unknown",
				readSpeed: 0, // Would need additional monitoring
				writeSpeed: 0, // Would need additional monitoring
			},
			network: {
				rx: network[0]?.rx_bytes || 0,
				tx: network[0]?.tx_bytes || 0,
				rxSec: network[0]?.rx_sec || 0,
				txSec: network[0]?.tx_sec || 0,
				interfaces: networkInterfaces.map(iface => ({
					name: iface.iface || "Unknown",
					ip4: iface.ip4 || "",
					ip6: iface.ip6 || "",
					mac: iface.mac || "",
					speed: iface.speed || 0,
					operstate: iface.operstate || "unknown",
				})),
			},
			system: {
				hostname: system.hostname || "Unknown",
				platform: system.platform || "Unknown",
				arch: system.arch || "Unknown",
				release: system.release || "Unknown",
				uptime: uptime.uptime || 0,
				loadAverage: [0, 0, 0], // Would need OS-specific implementation
				processCount: processes.all || 0,
			},
		};
	} catch (error) {
		console.error("Error fetching system stats:", error);
		return getMockSystemStats();
	}
});

/**
 * Get CPU information
 */
export const getCPUInfo = cache(async () => {
	try {
		if (typeof window !== 'undefined') {
			return { usage: 45, cores: 8, model: "Mock CPU", speed: 2400 };
		}

		const [cpu, cpuUsage] = await Promise.all([
			si.cpu(),
			si.currentLoad(),
		]);

		return {
			usage: Math.round(cpuUsage.currentLoad || 0),
			cores: cpu.cores || 0,
			model: cpu.manufacturer + " " + cpu.brand || "Unknown",
			speed: cpu.speed || 0,
		};
	} catch (error) {
		console.error("Error fetching CPU info:", error);
		return { usage: 0, cores: 0, model: "Unknown", speed: 0 };
	}
});

/**
 * Get memory information
 */
export const getMemoryInfo = cache(async () => {
	try {
		if (typeof window !== 'undefined') {
			return { usage: 65, total: 16000000000, used: 10400000000, free: 5600000000 };
		}

		const memory = await si.mem();

		return {
			usage: Math.round(((memory.used || 0) / (memory.total || 1)) * 100),
			total: memory.total || 0,
			used: memory.used || 0,
			free: memory.free || 0,
		};
	} catch (error) {
		console.error("Error fetching memory info:", error);
		return { usage: 0, total: 0, used: 0, free: 0 };
	}
});

/**
 * Get disk information
 */
export const getDiskInfo = cache(async () => {
	try {
		if (typeof window !== 'undefined') {
			return { usage: 75, total: 500000000000, used: 375000000000, free: 125000000000 };
		}

		const disk = await si.fsSize();
		const primaryDisk = disk[0];

		if (!primaryDisk) {
			return { usage: 0, total: 0, used: 0, free: 0 };
		}

		return {
			usage: Math.round(((primaryDisk.used || 0) / (primaryDisk.size || 1)) * 100),
			total: primaryDisk.size || 0,
			used: primaryDisk.used || 0,
			free: primaryDisk.available || 0,
		};
	} catch (error) {
		console.error("Error fetching disk info:", error);
		return { usage: 0, total: 0, used: 0, free: 0 };
	}
});

/**
 * Get network information
 */
export const getNetworkInfo = cache(async () => {
	try {
		if (typeof window !== 'undefined') {
			return { rx: 1024000, tx: 512000, rxSec: 1024, txSec: 512 };
		}

		const network = await si.networkStats();
		const primaryInterface = network[0];

		if (!primaryInterface) {
			return { rx: 0, tx: 0, rxSec: 0, txSec: 0 };
		}

		return {
			rx: primaryInterface.rx_bytes || 0,
			tx: primaryInterface.tx_bytes || 0,
			rxSec: primaryInterface.rx_sec || 0,
			txSec: primaryInterface.tx_sec || 0,
		};
	} catch (error) {
		console.error("Error fetching network info:", error);
		return { rx: 0, tx: 0, rxSec: 0, txSec: 0 };
	}
});

// ============================================================================
// SYSTEM METRICS READ OPERATIONS
// ============================================================================

/**
 * Get system metrics with filters and pagination
 */
export const getSystemMetrics = async (
	filters?: SystemMetricsFilters,
	pagination?: PaginationParams
): Promise<{
	metrics: SystemMetricData[];
	total: number;
	page: number;
	totalPages: number;
}> => {
	try {
		const page = pagination?.page || 1;
		const limit = Math.min(pagination?.limit || 50, 100);
		const skip = (page - 1) * limit;

		const where: any = {};

		if (filters?.type) {
			where.type = filters.type;
		}

		if (filters?.hostname) {
			where.hostname = { contains: filters.hostname, mode: "insensitive" };
		}

		if (filters?.component) {
			where.component = { contains: filters.component, mode: "insensitive" };
		}

		if (filters?.tags && filters.tags.length > 0) {
			where.tags = { hasSome: filters.tags };
		}

		if (filters?.dateFrom || filters?.dateTo) {
			where.createdAt = {};
			if (filters.dateFrom) {
				where.createdAt.gte = filters.dateFrom;
			}
			if (filters.dateTo) {
				where.createdAt.lte = filters.dateTo;
			}
		}

		const [metrics, total] = await Promise.all([
			prisma.systemMetric.findMany({
				where,
				skip,
				take: limit,
				orderBy: { createdAt: "desc" },
				include: {
					alerts: {
						where: { status: "ACTIVE" },
						select: { id: true, level: true },
					},
				},
			}),
			prisma.systemMetric.count({ where }),
		]);

		return {
			metrics: metrics.map(mapSystemMetric),
			total,
			page,
			totalPages: Math.ceil(total / limit),
		};
	} catch (error) {
		console.error("Error fetching system metrics:", error);
		throw new Error("Failed to fetch system metrics");
	}
};

/**
 * Get historical metrics for charts
 */
export const getHistoricalMetrics = async (
	type?: "CPU" | "MEMORY" | "DISK" | "NETWORK",
	hours: number = 24
): Promise<SystemMetricData[]> => {
	try {
		const startDate = new Date();
		startDate.setHours(startDate.getHours() - hours);

		const where: any = {
			createdAt: { gte: startDate },
		};

		if (type) {
			where.type = type;
		}

		const metrics = await prisma.systemMetric.findMany({
			where,
			orderBy: { createdAt: "asc" },
			take: 1000, // Limit to prevent excessive data
		});

		return metrics.map(mapSystemMetric);
	} catch (error) {
		console.error("Error fetching historical metrics:", error);
		throw new Error("Failed to fetch historical metrics");
	}
};

// ============================================================================
// SYSTEM ALERTS READ OPERATIONS
// ============================================================================

/**
 * Get system alert by ID
 */
export const getSystemAlertById = async (id: string): Promise<SystemAlertData | null> => {
	try {
		const alert = await prisma.systemAlert.findUnique({
			where: { id },
		});

		return alert ? mapSystemAlert(alert) : null;
	} catch (error) {
		console.error("Error fetching system alert:", error);
		throw new Error("Failed to fetch system alert");
	}
};

/**
 * Get system alerts with filters and pagination
 */
export const getSystemAlerts = async (
	filters?: SystemAlertsFilters,
	pagination?: PaginationParams
): Promise<{
	alerts: SystemAlertData[];
	total: number;
	page: number;
	totalPages: number;
}> => {
	try {
		const page = pagination?.page || 1;
		const limit = Math.min(pagination?.limit || 50, 100);
		const skip = (page - 1) * limit;

		const where: any = {};

		if (filters?.level) {
			where.level = filters.level;
		}

		if (filters?.status) {
			where.status = filters.status;
		}

		if (filters?.metricId) {
			where.metricId = filters.metricId;
		}

		if (filters?.tags && filters.tags.length > 0) {
			where.tags = { hasSome: filters.tags };
		}

		if (filters?.dateFrom || filters?.dateTo) {
			where.createdAt = {};
			if (filters.dateFrom) {
				where.createdAt.gte = filters.dateFrom;
			}
			if (filters.dateTo) {
				where.createdAt.lte = filters.dateTo;
			}
		}

		const [alerts, total] = await Promise.all([
			prisma.systemAlert.findMany({
				where,
				skip,
				take: limit,
				orderBy: { createdAt: "desc" },
			}),
			prisma.systemAlert.count({ where }),
		]);

		return {
			alerts: alerts.map(mapSystemAlert),
			total,
			page,
			totalPages: Math.ceil(total / limit),
		};
	} catch (error) {
		console.error("Error fetching system alerts:", error);
		throw new Error("Failed to fetch system alerts");
	}
};

/**
 * Get active alerts
 */
export const getActiveAlerts = cache(async (): Promise<SystemAlertData[]> => {
	try {
		const alerts = await prisma.systemAlert.findMany({
			where: { status: "ACTIVE" },
			orderBy: [
				{ level: "desc" }, // CRITICAL first
				{ createdAt: "desc" },
			],
			take: 100,
		});

		return alerts.map(mapSystemAlert);
	} catch (error) {
		console.error("Error fetching active alerts:", error);
		throw new Error("Failed to fetch active alerts");
	}
});

/**
 * Get critical alerts
 */
export const getCriticalAlerts = cache(async (): Promise<SystemAlertData[]> => {
	try {
		const alerts = await prisma.systemAlert.findMany({
			where: {
				level: "CRITICAL",
				status: "ACTIVE",
			},
			orderBy: { createdAt: "desc" },
			take: 50,
		});

		return alerts.map(mapSystemAlert);
	} catch (error) {
		console.error("Error fetching critical alerts:", error);
		throw new Error("Failed to fetch critical alerts");
	}
});

/**
 * Get alert statistics
 */
export const getAlertStats = cache(async (): Promise<{
	total: number;
	active: number;
	acknowledged: number;
	resolved: number;
	ignored: number;
	critical: number;
	error: number;
	warning: number;
	info: number;
}> => {
	try {
		const [
			total,
			active,
			acknowledged,
			resolved,
			ignored,
			critical,
			error,
			warning,
			info,
		] = await Promise.all([
			prisma.systemAlert.count(),
			prisma.systemAlert.count({ where: { status: "ACTIVE" } }),
			prisma.systemAlert.count({ where: { status: "ACKNOWLEDGED" } }),
			prisma.systemAlert.count({ where: { status: "RESOLVED" } }),
			prisma.systemAlert.count({ where: { status: "IGNORED" } }),
			prisma.systemAlert.count({ where: { level: "CRITICAL" } }),
			prisma.systemAlert.count({ where: { level: "ERROR" } }),
			prisma.systemAlert.count({ where: { level: "WARNING" } }),
			prisma.systemAlert.count({ where: { level: "INFO" } }),
		]);

		return {
			total,
			active,
			acknowledged,
			resolved,
			ignored,
			critical,
			error,
			warning,
			info,
		};
	} catch (error) {
		console.error("Error fetching alert stats:", error);
		throw new Error("Failed to fetch alert stats");
	}
});

// ============================================================================
// BUSINESS METRICS READ OPERATIONS
// ============================================================================

/**
 * Get comprehensive business metrics
 */
export const getBusinessMetrics = cache(async (): Promise<BusinessMetricsResponse> => {
	try {
		const now = new Date();
		const oneYearAgo = new Date(now.getTime() - 365 * 24 * 60 * 60 * 1000);

		// User metrics
		const [totalUsers, monthlyUserGrowth] = await Promise.all([
			prisma.user.count(),
			prisma.user.groupBy({
				by: ['createdAt'],
				_count: { id: true },
				where: { createdAt: { gte: oneYearAgo } },
				orderBy: { createdAt: 'asc' },
			}),
		]);

		// Mock performance and revenue metrics (replace with actual data sources)
		const performanceMetrics = {
			speed: 85,
			speedEfficiency: 90,
			speedQuality: 88,
			reliability: 95,
			reliabilityEfficiency: 92,
			reliabilityQuality: 97,
			security: 98,
			securityEfficiency: 96,
			securityQuality: 99,
			usability: 87,
			usabilityEfficiency: 85,
			usabilityQuality: 89,
			scalability: 92,
			scalabilityEfficiency: 90,
			scalabilityQuality: 94,
			efficiency: 88,
			efficiencyEfficiency: 86,
			efficiencyQuality: 90,
		};

		const revenueMetrics = {
			monthlyData: Array.from({ length: 12 }, (_, i) => ({
				revenue: Math.floor(Math.random() * 100000) + 50000,
				customers: Math.floor(Math.random() * 1000) + 500,
				month: new Date(now.getFullYear(), now.getMonth() - i, 1).toISOString(),
			})).reverse(),
			totalRevenue: 1250000,
			monthlyRecurringRevenue: 85000,
			averageRevenuePerUser: 125,
		};

		const systemMetrics = {
			uptime: 99.9,
			responseTime: 150,
			errorRate: 0.1,
			throughput: 1500,
		};

		const businessKPIs = {
			conversionRate: 3.2,
			customerSatisfaction: 4.7,
			churnRate: 2.1,
			lifetimeValue: 2500,
		};

		return {
			success: true,
			data: {
				userMetrics: {
					monthlyGrowth: monthlyUserGrowth.map(item => ({
						users: item._count.id,
						newUsers: item._count.id,
						date: item.createdAt.toISOString(),
					})),
					totalUsers,
					activeUsers: Math.floor(totalUsers * 0.7), // Mock active users
					userRetention: 85.5, // Mock retention rate
				},
				performanceMetrics,
				revenueMetrics,
				systemMetrics,
				businessKPIs,
			},
			timestamp: now,
		};
	} catch (error) {
		console.error("Error fetching business metrics:", error);
		throw new Error("Failed to fetch business metrics");
	}
});

// ============================================================================
// HELPER FUNCTIONS
// ============================================================================

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

/**
 * Get CPU temperature with platform-specific handling
 */
async function getCPUTemperature() {
	try {
		const os = process.platform;

		if (os === 'darwin') {
			return await si.cpuTemperature().catch(() => ({ main: undefined, cores: [], max: 0 }));
		} else {
			return await si.cpuTemperature().catch(() => ({ main: undefined, cores: [], max: 0 }));
		}
	} catch (error) {
		console.warn('CPU temperature monitoring not available on this platform:', error);
		return { main: undefined, cores: [], max: 0 };
	}
}

/**
 * Mock system stats for browser environment or when systeminformation fails
 */
function getMockSystemStats(): SystemStats {
	return {
		cpu: {
			usage: Math.floor(Math.random() * 30) + 20, // 20-50%
			total: 8,
			used: 3,
			cores: 8,
			model: "Mock CPU Model",
			speed: 2400,
			temperature: 45,
		},
		memory: {
			usage: Math.floor(Math.random() * 20) + 60, // 60-80%
			total: 16000000000, // 16GB
			used: 10400000000, // ~65%
			free: 5600000000,
			available: 5600000000,
			buffers: 200000000,
			cached: 1000000000,
		},
		disk: {
			usage: Math.floor(Math.random() * 20) + 70, // 70-90%
			total: 500000000000, // 500GB
			used: 375000000000, // 75%
			free: 125000000000,
			type: "SSD",
			readSpeed: 500,
			writeSpeed: 450,
		},
		network: {
			rx: 1024000,
			tx: 512000,
			rxSec: 1024,
			txSec: 512,
			interfaces: [
				{
					name: "eth0",
					ip4: "192.168.1.100",
					ip6: "::1",
					mac: "00:11:22:33:44:55",
					speed: 1000,
					operstate: "up",
				},
			],
		},
		system: {
			hostname: "mock-server",
			platform: "linux",
			arch: "x64",
			release: "5.4.0",
			uptime: 86400, // 1 day
			loadAverage: [1.2, 1.5, 1.8],
			processCount: 150,
		},
	};
}