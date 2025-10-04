// Dashboard Types
export type DashboardStats = {
	totalUsers: number;
	totalOrders: number;
	revenue: number;
	growth: number;
};

export type ChartData = {
	name: string;
	value: number;
	fill?: string;
};

export type RevenueData = {
	month: string;
	revenue: number;
	orders: number;
};

// System Monitoring Types
export interface SystemStats {
	cpu: {
		usage: number;
		total: number;
		used: number;
		cores: number;
		model: string;
		speed: number;
		temperature?: number;
	};
	memory: {
		usage: number;
		total: number;
		used: number;
		free: number;
		available: number;
		buffers: number;
		cached: number;
	};
	disk: {
		usage: number;
		total: number;
		used: number;
		free: number;
		type: string;
		readSpeed: number;
		writeSpeed: number;
	};
	network: {
		rx: number;
		tx: number;
		rxSec: number;
		txSec: number;
		interfaces: NetworkInterface[];
	};
	system: {
		hostname: string;
		platform: string;
		arch: string;
		release: string;
		uptime: number;
		loadAverage: number[];
		processCount: number;
	};
}

export interface NetworkInterface {
	name: string;
	ip4: string;
	ip6: string;
	mac: string;
	speed: number;
	operstate: string;
}

export interface SystemMetricData {
	id: string;
	type:
	| "CPU"
	| "MEMORY"
	| "DISK"
	| "NETWORK"
	| "PROCESS"
	| "TEMPERATURE"
	| "UPTIME"
	| "DATABASE"
	| "CUSTOM";
	name: string;
	value: number;
	unit: string;
	hostname?: string;
	component?: string;
	metadata?: Record<string, any>;
	tags?: string[];
	createdAt: Date;
	updatedAt: Date;
}

export interface SystemAlertData {
	id: string;
	title: string;
	description?: string;
	level: "INFO" | "WARNING" | "ERROR" | "CRITICAL";
	status: "ACTIVE" | "ACKNOWLEDGED" | "RESOLVED" | "IGNORED";
	threshold?: number;
	currentValue?: number;
	metricId?: string;
	metadata?: Record<string, any>;
	tags?: string[];
	createdAt: Date;
	updatedAt: Date;
	resolvedAt?: Date;
	acknowledgedAt?: Date;
	acknowledgedBy?: string;
}

// Additional Dashboard Types
export interface DashboardWidgetData {
	id: string;
	title: string;
	description?: string;
	type: string;
	size: string;
	position: {
		x: number;
		y: number;
		w: number;
		h: number;
	};
	isActive: boolean;
	dataSource: string;
	config: Record<string, any>;
	dashboardId: string;
}

export interface DashboardData {
	id: string;
	title: string;
	description?: string;
	slug: string;
	layout?: Record<string, any>;
	isDefault: boolean;
	isPublic: boolean;
	userId?: string;
	widgets?: DashboardWidgetData[];
	refreshInterval?: number;
	theme?: string;
	createdAt: Date;
	updatedAt: Date;
}

// Service Input Types
export interface CreateSystemMetricInput {
	type: SystemMetricData["type"];
	name: string;
	value: number;
	unit: string;
	hostname?: string;
	component?: string;
	metadata?: Record<string, any>;
	tags?: string[];
}

export interface CreateSystemAlertInput {
	title: string;
	description?: string;
	level: SystemAlertData["level"];
	threshold?: number;
	currentValue?: number;
	metricId?: string;
	metadata?: Record<string, any>;
	tags?: string[];
}

export interface CreateDashboardInput {
	title: string;
	description?: string;
	slug: string;
	layout?: Record<string, any>;
	isDefault?: boolean;
	isPublic?: boolean;
	userId?: string;
	refreshInterval?: number;
	theme?: string;
}

export interface UpdateDashboardInput {
	title?: string;
	description?: string;
	slug?: string;
	layout?: Record<string, any>;
	isDefault?: boolean;
	isPublic?: boolean;
	refreshInterval?: number;
	theme?: string;
}

export interface CreateDashboardWidgetInput {
	title: string;
	description?: string;
	type: string;
	size: string;
	position: DashboardWidgetData["position"];
	isActive?: boolean;
	dataSource: string;
	config: Record<string, any>;
	dashboardId: string;
}

export interface UpdateDashboardWidgetInput {
	title?: string;
	description?: string;
	type?: string;
	size?: string;
	position?: DashboardWidgetData["position"];
	isActive?: boolean;
	dataSource?: string;
	config?: Record<string, any>;
}

export interface UpdateSystemMetricInput {
	type?: SystemMetricData["type"];
	name?: string;
	value?: number;
	unit?: string;
	hostname?: string;
	component?: string;
	metadata?: Record<string, any>;
	tags?: string[];
}

export interface UpdateSystemAlertInput {
	title?: string;
	description?: string;
	level?: SystemAlertData["level"];
	status?: SystemAlertData["status"];
	threshold?: number;
	currentValue?: number;
	metadata?: Record<string, any>;
	tags?: string[];
	acknowledgedBy?: string;
	resolvedAt?: Date | null;
	acknowledgedAt?: Date | null;
}

// API Response Types
export interface SystemStatsResponse {
	success: boolean;
	data: SystemStats;
	timestamp: Date;
}

export interface SystemMetricsResponse {
	success: boolean;
	data: SystemMetricData[];
	pagination?: {
		page: number;
		limit: number;
		total: number;
		totalPages: number;
	};
}

// Filter and Query Types
export interface SystemMetricsFilters {
	type?: SystemMetricData["type"];
	hostname?: string;
	component?: string;
	tags?: string[];
	dateFrom?: Date;
	dateTo?: Date;
}

export interface SystemAlertsFilters {
	level?: SystemAlertData["level"];
	status?: SystemAlertData["status"];
	metricId?: string;
	tags?: string[];
	dateFrom?: Date;
	dateTo?: Date;
}

export interface PaginationParams {
	page?: number;
	limit?: number;
	sortBy?: string;
	sortOrder?: "asc" | "desc";
}

export type UserActivity = {
	date: string;
	users: number;
	sessions: number;
};

export type LegacyDashboardData = {
	id: string;
	title: string;
	metrics: DashboardMetrics[];
	createdAt: Date;
};

export type DashboardMetric = {
	id: string;
	title: string;
	value: string;
	icon: string;
	color: string;
	change: number;
	changeType: "increase" | "decrease" | "neutral";
};

export type DashboardChart = {
	id: string;
	title: string;
	type: "line" | "bar" | "pie" | "area";
	data?: any;
};

export type SystemMetric = {
	id: string;
	title: string;
	value: number;
	unit: string;
	type: "cpu" | "memory" | "storage" | "network";
	status?: "normal" | "warning" | "critical";
	details?: {
		used: number;
		total: number;
		free: number;
	};
};

export type NotificationItem = {
	id: string;
	title: string;
	message: string;
	type: "info" | "warning" | "error" | "success";
	timestamp: Date;
	read: boolean;
};

export type DashboardNotification = NotificationItem;

export type LogEntry = {
	id: string;
	level: string;
	message: string;
	details?: string;
	source: string;
	timestamp: Date;
};

export type DashboardMetrics = {
	stats: DashboardStats;
	revenueChart: RevenueData[];
	userActivity: UserActivity[];
	categoryStats: ChartData[];
};

// Business Metrics Types
export interface BusinessMetricsResponse {
	success: boolean;
	data: {
		userMetrics: {
			monthlyGrowth: Array<{
				users: number;
				newUsers: number;
				month?: string;
				date?: string;
			}>;
			totalUsers: number;
			activeUsers: number;
			userRetention: number;
		};
		performanceMetrics: {
			speed: number;
			speedEfficiency: number;
			speedQuality: number;
			reliability: number;
			reliabilityEfficiency: number;
			reliabilityQuality: number;
			security: number;
			securityEfficiency: number;
			securityQuality: number;
			usability: number;
			usabilityEfficiency: number;
			usabilityQuality: number;
			scalability: number;
			scalabilityEfficiency: number;
			scalabilityQuality: number;
			efficiency: number;
			efficiencyEfficiency: number;
			efficiencyQuality: number;
		};
		revenueMetrics: {
			monthlyData: Array<{
				revenue: number;
				customers: number;
				month?: string;
				date?: string;
			}>;
			totalRevenue: number;
			monthlyRecurringRevenue: number;
			averageRevenuePerUser: number;
		};
		systemMetrics: {
			uptime: number;
			responseTime: number;
			errorRate: number;
			throughput: number;
		};
		businessKPIs: {
			conversionRate: number;
			customerSatisfaction: number;
			churnRate: number;
			lifetimeValue: number;
		};
	};
	message?: string;
	timestamp: Date;
}
