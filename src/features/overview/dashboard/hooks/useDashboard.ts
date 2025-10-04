import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import type {
	SystemStats,
	SystemAlertData,
	DashboardData,
	DashboardWidgetData,
	CreateDashboardInput,
	UpdateDashboardInput,
	CreateDashboardWidgetInput,
	CreateSystemAlertInput,
	BusinessMetricsResponse,
} from "@/features/overview/dashboard/types/dashboard.types";
import { DASHBOARD_API } from "@/constants/paths/dashboard";

// API Functions
const dashboardAPI = {
	// System Stats
	getSystemStats: async (): Promise<SystemStats> => {
		const response = await fetch(DASHBOARD_API.SYSTEM_STATS);
		if (!response.ok) throw new Error("Failed to fetch system stats");
		const data = await response.json();
		return data.data;
	},

	getCPUInfo: async () => {
		const response = await fetch(DASHBOARD_API.CPU);
		if (!response.ok) throw new Error("Failed to fetch CPU info");
		return response.json();
	},

	getMemoryInfo: async () => {
		const response = await fetch(DASHBOARD_API.MEMORY);
		if (!response.ok) throw new Error("Failed to fetch memory info");
		return response.json();
	},

	getDiskInfo: async () => {
		const response = await fetch(DASHBOARD_API.DISK);
		if (!response.ok) throw new Error("Failed to fetch disk info");
		return response.json();
	},

	getNetworkInfo: async () => {
		const response = await fetch(DASHBOARD_API.NETWORK);
		if (!response.ok) throw new Error("Failed to fetch network info");
		return response.json();
	},

	// Dashboard Management
	getDashboards: async (userId?: string): Promise<DashboardData[]> => {
		const url = userId
			? `${DASHBOARD_API.DASHBOARDS}?userId=${userId}`
			: DASHBOARD_API.DASHBOARDS;
		const response = await fetch(url);
		if (!response.ok) throw new Error("Failed to fetch dashboards");
		const data = await response.json();
		return data.data;
	},

	getDashboard: async (id: string): Promise<DashboardData> => {
		const response = await fetch(DASHBOARD_API.DASHBOARD(id));
		if (!response.ok) throw new Error("Failed to fetch dashboard");
		const data = await response.json();
		return data.data;
	},

	createDashboard: async (
		input: CreateDashboardInput,
	): Promise<DashboardData> => {
		const response = await fetch(DASHBOARD_API.DASHBOARDS, {
			method: "POST",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify(input),
		});
		if (!response.ok) throw new Error("Failed to create dashboard");
		const data = await response.json();
		return data.data;
	},

	updateDashboard: async (
		id: string,
		input: UpdateDashboardInput,
	): Promise<DashboardData> => {
		const response = await fetch(DASHBOARD_API.DASHBOARD(id), {
			method: "PUT",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify(input),
		});
		if (!response.ok) throw new Error("Failed to update dashboard");
		const data = await response.json();
		return data.data;
	},

	deleteDashboard: async (id: string): Promise<void> => {
		const response = await fetch(DASHBOARD_API.DASHBOARD(id), {
			method: "DELETE",
		});
		if (!response.ok) throw new Error("Failed to delete dashboard");
	},

	// Widget Management
	getDashboardWidgets: async (
		dashboardId: string,
	): Promise<DashboardWidgetData[]> => {
		const response = await fetch(DASHBOARD_API.WIDGETS(dashboardId));
		if (!response.ok) throw new Error("Failed to fetch dashboard widgets");
		const data = await response.json();
		return data.data;
	},

	createWidget: async (
		input: CreateDashboardWidgetInput,
	): Promise<DashboardWidgetData> => {
		const response = await fetch(DASHBOARD_API.WIDGETS(input.dashboardId), {
			method: "POST",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify(input),
		});
		if (!response.ok) throw new Error("Failed to create widget");
		const data = await response.json();
		return data.data;
	},

	// Alert Management
	getAlerts: async (filters?: {
		status?: string;
		level?: string;
	}): Promise<SystemAlertData[]> => {
		const searchParams = new URLSearchParams();
		if (filters?.status) searchParams.append("status", filters.status);
		if (filters?.level) searchParams.append("level", filters.level);

		const url = `${DASHBOARD_API.ALERTS}?${searchParams.toString()}`;
		const response = await fetch(url);
		if (!response.ok) throw new Error("Failed to fetch alerts");
		const data = await response.json();
		return data.data;
	},

	getAlert: async (id: string): Promise<SystemAlertData> => {
		const response = await fetch(DASHBOARD_API.ALERT(id));
		if (!response.ok) throw new Error("Failed to fetch alert");
		const data = await response.json();
		return data.data;
	},

	createAlert: async (
		input: CreateSystemAlertInput,
	): Promise<SystemAlertData> => {
		const response = await fetch(DASHBOARD_API.ALERTS, {
			method: "POST",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify(input),
		});
		if (!response.ok) throw new Error("Failed to create alert");
		const data = await response.json();
		return data.data;
	},

	acknowledgeAlert: async (
		id: string,
		acknowledgedBy: string,
	): Promise<SystemAlertData> => {
		const response = await fetch(DASHBOARD_API.ALERT(id), {
			method: "PATCH",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify({ acknowledgedBy }),
		});
		if (!response.ok) throw new Error("Failed to acknowledge alert");
		const data = await response.json();
		return data.data;
	},

	deleteAlert: async (id: string): Promise<void> => {
		const response = await fetch(DASHBOARD_API.ALERT(id), {
			method: "DELETE",
		});
		if (!response.ok) throw new Error("Failed to delete alert");
	},

	// Dashboard Stats
	getDashboardStats: async () => {
		const response = await fetch(DASHBOARD_API.STATS);
		if (!response.ok) throw new Error("Failed to fetch dashboard stats");
		return response.json();
	},

	// Business Metrics API
	getBusinessMetrics: async (): Promise<BusinessMetricsResponse> => {
		const response = await fetch(DASHBOARD_API.BUSINESS_METRICS);
		if (!response.ok) throw new Error("Failed to fetch business metrics");
		return response.json();
	},
};

// Query Keys
export const dashboardQueryKeys = {
	all: ["dashboard"] as const,
	systemStats: () => [...dashboardQueryKeys.all, "system-stats"] as const,
	cpu: () => [...dashboardQueryKeys.all, "cpu"] as const,
	memory: () => [...dashboardQueryKeys.all, "memory"] as const,
	disk: () => [...dashboardQueryKeys.all, "disk"] as const,
	network: () => [...dashboardQueryKeys.all, "network"] as const,
	dashboards: () => [...dashboardQueryKeys.all, "dashboards"] as const,
	dashboard: (id: string) => [...dashboardQueryKeys.dashboards(), id] as const,
	widgets: (dashboardId: string) =>
		[...dashboardQueryKeys.all, "widgets", dashboardId] as const,
	alerts: (filters?: { status?: string; level?: string }) =>
		[...dashboardQueryKeys.all, "alerts", filters] as const,
	alert: (id: string) => [...dashboardQueryKeys.all, "alerts", id] as const,
	stats: () => [...dashboardQueryKeys.all, "stats"] as const,
	businessMetrics: () =>
		[...dashboardQueryKeys.all, "business-metrics"] as const,
};

// System Monitoring Hooks
export const useSystemStats = (options?: {
	enabled?: boolean;
	refetchInterval?: number;
}) => {
	return useQuery({
		queryKey: dashboardQueryKeys.systemStats(),
		queryFn: dashboardAPI.getSystemStats,
		refetchInterval: options?.refetchInterval || 5000, // 5 seconds
		enabled: options?.enabled ?? true,
	});
};

export const useCPUInfo = (options?: {
	enabled?: boolean;
	refetchInterval?: number;
}) => {
	return useQuery({
		queryKey: dashboardQueryKeys.cpu(),
		queryFn: dashboardAPI.getCPUInfo,
		refetchInterval: options?.refetchInterval || 5000,
		enabled: options?.enabled ?? true,
	});
};

export const useMemoryInfo = (options?: {
	enabled?: boolean;
	refetchInterval?: number;
}) => {
	return useQuery({
		queryKey: dashboardQueryKeys.memory(),
		queryFn: dashboardAPI.getMemoryInfo,
		refetchInterval: options?.refetchInterval || 5000,
		enabled: options?.enabled ?? true,
	});
};

export const useDiskInfo = (options?: {
	enabled?: boolean;
	refetchInterval?: number;
}) => {
	return useQuery({
		queryKey: dashboardQueryKeys.disk(),
		queryFn: dashboardAPI.getDiskInfo,
		refetchInterval: options?.refetchInterval || 10000, // 10 seconds for disk
		enabled: options?.enabled ?? true,
	});
};

export const useNetworkInfo = (options?: {
	enabled?: boolean;
	refetchInterval?: number;
}) => {
	return useQuery({
		queryKey: dashboardQueryKeys.network(),
		queryFn: dashboardAPI.getNetworkInfo,
		refetchInterval: options?.refetchInterval || 5000,
		enabled: options?.enabled ?? true,
	});
};

// Dashboard Hooks
export const useDashboards = (userId?: string) => {
	return useQuery({
		queryKey: dashboardQueryKeys.dashboards(),
		queryFn: () => dashboardAPI.getDashboards(userId),
	});
};

export const useDashboard = (id: string, options?: { enabled?: boolean }) => {
	return useQuery({
		queryKey: dashboardQueryKeys.dashboard(id),
		queryFn: () => dashboardAPI.getDashboard(id),
		enabled: options?.enabled ?? !!id,
	});
};

export const useCreateDashboard = () => {
	const queryClient = useQueryClient();

	return useMutation({
		mutationFn: dashboardAPI.createDashboard,
		onSuccess: () => {
			queryClient.invalidateQueries({
				queryKey: dashboardQueryKeys.dashboards(),
			});
		},
	});
};

export const useUpdateDashboard = () => {
	const queryClient = useQueryClient();

	return useMutation({
		mutationFn: ({ id, ...input }: { id: string } & UpdateDashboardInput) =>
			dashboardAPI.updateDashboard(id, input),
		onSuccess: (_, variables) => {
			queryClient.invalidateQueries({
				queryKey: dashboardQueryKeys.dashboard(variables.id),
			});
			queryClient.invalidateQueries({
				queryKey: dashboardQueryKeys.dashboards(),
			});
		},
	});
};

export const useDeleteDashboard = () => {
	const queryClient = useQueryClient();

	return useMutation({
		mutationFn: dashboardAPI.deleteDashboard,
		onSuccess: () => {
			queryClient.invalidateQueries({
				queryKey: dashboardQueryKeys.dashboards(),
			});
		},
	});
};

// Widget Hooks
export const useDashboardWidgets = (
	dashboardId: string,
	options?: { enabled?: boolean },
) => {
	return useQuery({
		queryKey: dashboardQueryKeys.widgets(dashboardId),
		queryFn: () => dashboardAPI.getDashboardWidgets(dashboardId),
		enabled: options?.enabled ?? !!dashboardId,
	});
};

export const useCreateWidget = () => {
	const queryClient = useQueryClient();

	return useMutation({
		mutationFn: dashboardAPI.createWidget,
		onSuccess: (_, variables) => {
			queryClient.invalidateQueries({
				queryKey: dashboardQueryKeys.widgets(variables.dashboardId),
			});
		},
	});
};

// Alert Hooks
export const useAlerts = (filters?: { status?: string; level?: string }) => {
	return useQuery({
		queryKey: dashboardQueryKeys.alerts(filters),
		queryFn: () => dashboardAPI.getAlerts(filters),
		refetchInterval: 30000, // 30 seconds for alerts
	});
};

export const useAlert = (id: string, options?: { enabled?: boolean }) => {
	return useQuery({
		queryKey: dashboardQueryKeys.alert(id),
		queryFn: () => dashboardAPI.getAlert(id),
		enabled: options?.enabled ?? !!id,
	});
};

export const useCreateAlert = () => {
	const queryClient = useQueryClient();

	return useMutation({
		mutationFn: dashboardAPI.createAlert,
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: dashboardQueryKeys.alerts() });
		},
	});
};

export const useAcknowledgeAlert = () => {
	const queryClient = useQueryClient();

	return useMutation({
		mutationFn: ({
			id,
			acknowledgedBy,
		}: {
			id: string;
			acknowledgedBy: string;
		}) => dashboardAPI.acknowledgeAlert(id, acknowledgedBy),
		onSuccess: (_, variables) => {
			queryClient.invalidateQueries({
				queryKey: dashboardQueryKeys.alert(variables.id),
			});
			queryClient.invalidateQueries({ queryKey: dashboardQueryKeys.alerts() });
		},
	});
};

export const useDeleteAlert = () => {
	const queryClient = useQueryClient();

	return useMutation({
		mutationFn: dashboardAPI.deleteAlert,
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: dashboardQueryKeys.alerts() });
		},
	});
};

// Dashboard Stats Hook
export const useDashboardStats = (options?: {
	enabled?: boolean;
	refetchInterval?: number;
}) => {
	return useQuery({
		queryKey: dashboardQueryKeys.stats(),
		queryFn: dashboardAPI.getDashboardStats,
		refetchInterval: options?.refetchInterval || 30000, // 30 seconds
		enabled: options?.enabled ?? true,
	});
};

// Business Metrics Hook
export const useBusinessMetrics = (options?: {
	enabled?: boolean;
	refetchInterval?: number;
}) => {
	return useQuery({
		queryKey: dashboardQueryKeys.businessMetrics(),
		queryFn: dashboardAPI.getBusinessMetrics,
		refetchInterval: options?.refetchInterval || 60000, // 1 minute
		enabled: options?.enabled ?? true,
	});
};
