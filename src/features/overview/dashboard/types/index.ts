// features/dashboard/types/index.ts
export type DashboardStats = {
	totalUsers: number;
	totalOrders: number;
	revenue: number;
	growth: number;
};

export type BusinessMetric = {
	id: string;
	title: string;
	value: string | number;
	previousValue?: string | number;
	change: number;
	changeType: "increase" | "decrease" | "neutral";
	type: string;
	icon: string;
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

export type UserActivity = {
	date: string;
	users: number;
	sessions: number;
};

export type DashboardData = {
	id: string;
	title: string;
	metrics: DashboardMetrics[];
	createdAt: Date;
};

export type DashboardMetrics = {
	stats: DashboardStats;
	revenueChart: RevenueData[];
	userActivity: UserActivity[];
	categoryStats: ChartData[];
};

// Business Metrics Types
export type BusinessMetrics = {
	users: UserMetrics;
	content: ContentMetrics;
	revenue: RevenueMetrics;
	orders: OrderMetrics;
	support: SupportMetrics;
	performance: PerformanceMetrics;
};

export type UserMetrics = {
	total: number;
	newThisMonth: number;
	growth: number;
	changeType: "increase" | "decrease" | "neutral";
};

export type ContentMetrics = {
	total: number;
	posts: number;
	knowledgeBase: number;
	faqs: number;
};

export type RevenueMetrics = {
	total: number;
	thisMonth: number;
	growth: number;
	changeType: "increase" | "decrease" | "neutral";
	currency: string;
};

export type OrderMetrics = {
	total: number;
	active: number;
	conversionRate: number;
};

export type SupportMetrics = {
	totalTickets: number;
	openTickets: number;
	resolvedTickets: number;
	resolutionRate: number;
};

export type PerformanceMetrics = {
	customerSatisfaction: number;
	averageResponseTime: string;
	systemUptime: number;
};

export type BusinessMetricsResponse = {
	success: boolean;
	data: BusinessMetrics;
	timestamp: Date;
};

export type BusinessMetricCard = {
	id: string;
	title: string;
	value: string | number;
	subtitle?: string;
	change?: number;
	changeType?: "increase" | "decrease" | "neutral";
	icon: string;
	color: "blue" | "green" | "purple" | "orange" | "red" | "gray";
};
