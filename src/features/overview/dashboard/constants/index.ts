import type {
	DashboardStats,
	ChartData,
	RevenueData,
	UserActivity,
} from "../types";

export const MOCK_DASHBOARD_STATS: DashboardStats = {
	totalUsers: 12847,
	totalOrders: 3426,
	revenue: 67,
	growth: 142,
};

// System data for system monitoring
export const SYSTEM_DATA = {
	cpu: {
		used: 65,
		total: 100,
		name: "Intel Core i7-12700K",
		cores: 12,
		threads: 20,
	},
	ram: {
		used: 8.5,
		total: 16,
		type: "DDR4",
		speed: "3200 MHz",
	},
	storage: {
		used: 750,
		total: 1000,
		type: "NVMe SSD",
		model: "Samsung 980 Pro",
	},
	specs: {
		os: "macOS Sonoma 14.5",
		uptime: "7 days, 14 hours",
		motherboard: "ASUS ROG Strix Z690-E",
		gpu: "NVIDIA RTX 4070 Ti",
		network: "1 Gbps Ethernet",
	},
};

export const CHART_COLORS = {
	cpu: ["#4F46E5", "#E0E7FF"],
	ram: ["#059669", "#D1FAE5"],
	storage: ["#DC2626", "#FEE2E2"],
};

export const PERFORMANCE_DATA = [
	{ time: "00:00", cpu: 45, ram: 60, network: 25 },
	{ time: "04:00", cpu: 35, ram: 55, network: 15 },
	{ time: "08:00", cpu: 65, ram: 70, network: 45 },
	{ time: "12:00", cpu: 75, ram: 85, network: 65 },
	{ time: "16:00", cpu: 85, ram: 90, network: 85 },
	{ time: "20:00", cpu: 70, ram: 75, network: 55 },
];

export const SYSTEM_ACTIONS = [
	{ icon: "🔄", label: "Restart Services", color: "blue" },
	{ icon: "🧹", label: "Clear Cache", color: "emerald" },
	{ icon: "📊", label: "Generate Report", color: "amber" },
	{ icon: "⚙️", label: "System Settings", color: "purple" },
];

export const SYSTEM_ALERTS = [
	{
		type: "success" as const,
		message: "System backup completed successfully",
		animated: true,
	},
	{
		type: "info" as const,
		message: "Database optimization finished",
		animated: true,
	},
	{
		type: "warning" as const,
		message: "High memory usage detected",
		animated: true,
	},
	{ type: "neutral" as const, message: "Scheduled maintenance in 2 hours" },
];

export const MOCK_SYSTEM_STATUS: ChartData[] = [
	{ name: "Active", value: 85, fill: "#10B981" },
	{ name: "Warning", value: 12, fill: "#F59E0B" },
	{ name: "Error", value: 3, fill: "#EF4444" },
];

export const MOCK_TRAFFIC_DATA: ChartData[] = [
	{ name: "Organic", value: 4234, fill: "#3B82F6" },
	{ name: "Direct", value: 2847, fill: "#10B981" },
	{ name: "Social", value: 1923, fill: "#F59E0B" },
	{ name: "Referral", value: 1456, fill: "#8B5CF6" },
];

export const MOCK_REVENUE_DATA: RevenueData[] = [
	{ month: "Jan", revenue: 12000, orders: 234 },
	{ month: "Feb", revenue: 15000, orders: 287 },
	{ month: "Mar", revenue: 18000, orders: 321 },
	{ month: "Apr", revenue: 22000, orders: 398 },
	{ month: "May", revenue: 25000, orders: 445 },
	{ month: "Jun", revenue: 28000, orders: 502 },
];

export const MOCK_USER_ACTIVITY: UserActivity[] = [
	{ date: "Mon", users: 1200, sessions: 1800 },
	{ date: "Tue", users: 1500, sessions: 2100 },
	{ date: "Wed", users: 1800, sessions: 2400 },
	{ date: "Thu", users: 2200, sessions: 2800 },
	{ date: "Fri", users: 2600, sessions: 3200 },
	{ date: "Sat", users: 2100, sessions: 2700 },
	{ date: "Sun", users: 1800, sessions: 2300 },
];

export const DASHBOARD_COLORS = {
	primary: "#3B82F6",
	success: "#10B981",
	warning: "#F59E0B",
	danger: "#EF4444",
	purple: "#8B5CF6",
	pink: "#EC4899",
	indigo: "#6366F1",
	teal: "#14B8A6",
};

export const CARD_GRADIENTS = {
	blue: "from-blue-500 to-blue-600 dark:from-blue-600 dark:to-blue-700",
	emerald:
		"from-emerald-500 to-emerald-600 dark:from-emerald-600 dark:to-emerald-700",
	amber: "from-amber-500 to-amber-600 dark:from-amber-600 dark:to-amber-700",
	purple:
		"from-purple-500 to-purple-600 dark:from-purple-600 dark:to-purple-700",
	pink: "from-pink-500 to-pink-600 dark:from-pink-600 dark:to-pink-700",
	indigo:
		"from-indigo-500 to-indigo-600 dark:from-indigo-600 dark:to-indigo-700",
};

// Chart Data Keys Configuration
export const CHART_DATA_KEYS = {
	USER_ANALYTICS: [
		{ key: "users", color: "#3B82F6", name: "Total Users" },
		{ key: "newUsers", color: "#10B981", name: "New Users" }
	],
	PERFORMANCE_METRICS: [
		{ key: "value", color: "#8B5CF6", name: "Performance Score" },
		{ key: "efficiency", color: "#10B981", name: "Efficiency Rating" },
		{ key: "quality", color: "#F59E0B", name: "Quality Index" }
	]
};
