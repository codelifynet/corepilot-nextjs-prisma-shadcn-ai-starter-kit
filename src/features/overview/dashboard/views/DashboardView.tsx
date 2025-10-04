"use client";

import { PageHeader } from "@/components/ui/page-header";
import { getPageGradient } from "@/lib/page-utils";
import { StatsCard } from "@/components/core-pilot-ui/stats-card";
import {
	SystemResourceCard,
	SystemInfoCard,
	PerformanceChart,
	ActionCard,
	AlertCard,
	AreaChart,
	RadarChart,
	ScatterChart,
	DashboardSkeleton,
} from "../components";
import { useSystemStats, useDashboardStats, useBusinessMetrics } from "../hooks";
import {
	CHART_COLORS,
	PERFORMANCE_DATA,
	SYSTEM_ACTIONS,
	CARD_GRADIENTS,
	CHART_DATA_KEYS,
} from "../constants";
import { formatMemoryUsage, formatDiskUsage, formatUptime } from "../utils";
import { Monitor, Cpu, HardDrive, Info, Users, FileText, DollarSign, TrendingUp } from "lucide-react";

export function DashboardView() {
	const { data: systemStats, isLoading: systemLoading } = useSystemStats();
	const { isLoading: dashboardLoading } = useDashboardStats();
	const { data: businessMetrics, isLoading: businessLoading } = useBusinessMetrics();

	const isLoading = systemLoading || dashboardLoading || businessLoading;

	// Calculate health percentages from real data
	const cpuUsage = systemStats?.cpu?.usage || 0;
	const memoryUsage = systemStats?.memory?.usage || 0;
	const diskUsage = systemStats?.disk?.usage || 0;
	const uptime = systemStats?.system?.uptime || 0;
	// Loading state
	if (isLoading) {
		return <DashboardSkeleton />;
	}

	// Data calculations for charts using real API data
	const cpuData = [
		{ name: "Used", value: cpuUsage, color: CHART_COLORS.cpu[0] },
		{
			name: "Free",
			value: 100 - cpuUsage,
			color: CHART_COLORS.cpu[1],
		},
	];

	const ramData = [
		{ name: "Used", value: memoryUsage, color: CHART_COLORS.ram[0] },
		{
			name: "Free",
			value: 100 - memoryUsage,
			color: CHART_COLORS.ram[1],
		},
	];

	const storageData = [
		{
			name: "Used",
			value: diskUsage,
			color: CHART_COLORS.storage[0],
		},
		{
			name: "Free",
			value: 100 - diskUsage,
			color: CHART_COLORS.storage[1],
		},
	];

	// Network Traffic Analysis Data (10+ metrics)
	const networkTrafficData = [
		{
			name: "HTTP Requests",
			usage: 2847,
			color: "#3B82F6",
		},
		{
			name: "HTTPS Requests",
			usage: 4521,
			color: "#10B981",
		},
		{
			name: "WebSocket Connections",
			usage: 892,
			color: "#F59E0B",
		},
		{
			name: "API Calls",
			usage: 1634,
			color: "#EF4444",
		},
		{
			name: "Database Queries",
			usage: 3247,
			color: "#8B5CF6",
		},
		{
			name: "Cache Hits",
			usage: 5689,
			color: "#06B6D4",
		},
		{
			name: "Cache Misses",
			usage: 1234,
			color: "#F97316",
		},
		{
			name: "File Downloads",
			usage: 567,
			color: "#84CC16",
		},
		{
			name: "File Uploads",
			usage: 234,
			color: "#EC4899",
		},
		{
			name: "Email Notifications",
			usage: 1456,
			color: "#6366F1",
		},
		{
			name: "Push Notifications",
			usage: 2789,
			color: "#14B8A6",
		},
		{
			name: "Error Responses",
			usage: 89,
			color: "#DC2626",
		},
	];

	// Business metrics data for different chart types
	const userGrowthAreaData = businessMetrics?.data?.userMetrics?.monthlyGrowth?.map((item: any, index: number) => ({
		name: `Month ${index + 1}`,
		users: item.users || 0,
		newUsers: item.newUsers || 0,
	})) || [
			{ name: "Jan", users: 1200, newUsers: 150 },
			{ name: "Feb", users: 1350, newUsers: 180 },
			{ name: "Mar", users: 1530, newUsers: 220 },
			{ name: "Apr", users: 1750, newUsers: 280 },
			{ name: "May", users: 2030, newUsers: 320 },
			{ name: "Jun", users: 2350, newUsers: 380 },
		];

	const performanceRadarData = [
		{
			subject: "Speed",
			value: businessMetrics?.data?.performanceMetrics?.speed || 20,
			efficiency: businessMetrics?.data?.performanceMetrics?.speedEfficiency || 40,
			quality: businessMetrics?.data?.performanceMetrics?.speedQuality || 92,
			fullMark: 100,
		},
		{
			subject: "Reliability",
			value: businessMetrics?.data?.performanceMetrics?.reliability || 90,
			efficiency: businessMetrics?.data?.performanceMetrics?.reliabilityEfficiency || 15,
			quality: businessMetrics?.data?.performanceMetrics?.reliabilityQuality || 60,
			fullMark: 100,
		},
		{
			subject: "Security",
			value: businessMetrics?.data?.performanceMetrics?.security || 80,
			efficiency: businessMetrics?.data?.performanceMetrics?.securityEfficiency || 95,
			quality: businessMetrics?.data?.performanceMetrics?.securityQuality || 10,
			fullMark: 100,
		},
		{
			subject: "Usability",
			value: businessMetrics?.data?.performanceMetrics?.usability || 89,
			efficiency: businessMetrics?.data?.performanceMetrics?.usabilityEfficiency || 93,
			quality: businessMetrics?.data?.performanceMetrics?.usabilityQuality || 87,
			fullMark: 100,
		},
		{
			subject: "Scalability",
			value: businessMetrics?.data?.performanceMetrics?.scalability || 42,
			efficiency: businessMetrics?.data?.performanceMetrics?.scalabilityEfficiency || 38,
			quality: businessMetrics?.data?.performanceMetrics?.scalabilityQuality || 45,
			fullMark: 100,
		},
		{
			subject: "Efficiency",
			value: businessMetrics?.data?.performanceMetrics?.efficiency || 83,
			efficiency: businessMetrics?.data?.performanceMetrics?.efficiencyEfficiency || 79,
			quality: businessMetrics?.data?.performanceMetrics?.efficiencyQuality || 86,
			fullMark: 100,
		},
	];

	const revenueScatterData = businessMetrics?.data?.revenueMetrics?.monthlyData?.map((item: any, index: number) => ({
		x: index + 1,
		y: item.revenue || Math.random() * 10000 + 5000,
		z: item.customers || Math.random() * 100 + 50,
	})) || [
			{ x: 1, y: 5200, z: 45 },
			{ x: 2, y: 6800, z: 62 },
			{ x: 3, y: 7500, z: 78 },
			{ x: 4, y: 8200, z: 85 },
			{ x: 5, y: 9100, z: 92 },
			{ x: 6, y: 10500, z: 108 },
		];

	return (
		<div className="container mx-auto p-6 space-y-8">
			<PageHeader
				title="System Dashboard"
				description="Comprehensive system performance monitoring and analytics"
				gradient={getPageGradient("/admin/overview")}
			/>



			{/* Business Metrics Cards */}
			<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
				<StatsCard
					title="Total Users"
					value={businessMetrics?.data?.userMetrics?.totalUsers?.toLocaleString() || "0"}
					change={businessMetrics?.data?.userMetrics?.userRetention || 0}
					changeType={
						(businessMetrics?.data?.userMetrics?.userRetention || 0) > 0
							? "increase"
							: (businessMetrics?.data?.userMetrics?.userRetention || 0) < 0
								? "decrease"
								: "neutral"
					}
					icon={<Users className="w-6 h-6 text-white" />}
					gradient={CARD_GRADIENTS.blue}
					description="Registered users"
				/>
				<StatsCard
					title="Active Users"
					value={businessMetrics?.data?.userMetrics?.activeUsers?.toLocaleString() || "0"}
					change={businessMetrics?.data?.userMetrics?.userRetention || 0}
					changeType={
						(businessMetrics?.data?.userMetrics?.userRetention || 0) > 0
							? "increase"
							: (businessMetrics?.data?.userMetrics?.userRetention || 0) < 0
								? "decrease"
								: "neutral"
					}
					icon={<FileText className="w-6 h-6 text-white" />}
					gradient={CARD_GRADIENTS.emerald}
					description="Active users"
				/>
				<StatsCard
					title="Total Revenue"
					value={`$${businessMetrics?.data?.revenueMetrics?.totalRevenue?.toLocaleString() || "0"}`}
					change={businessMetrics?.data?.revenueMetrics?.averageRevenuePerUser || 0}
					changeType={
						(businessMetrics?.data?.revenueMetrics?.averageRevenuePerUser || 0) > 0
							? "increase"
							: (businessMetrics?.data?.revenueMetrics?.averageRevenuePerUser || 0) < 0
								? "decrease"
								: "neutral"
					}
					icon={<DollarSign className="w-6 h-6 text-white" />}
					gradient={CARD_GRADIENTS.amber}
					description="Total earnings"
				/>
				<StatsCard
					title="Performance Score"
					value={`${businessMetrics?.data?.performanceMetrics?.efficiency || 95}%`}
					change={businessMetrics?.data?.performanceMetrics?.speed || 5.2}
					changeType="increase"
					icon={<TrendingUp className="w-6 h-6 text-white" />}
					gradient={CARD_GRADIENTS.purple}
					description="Overall performance"
				/>
			</div>

			{/* System Resources Grid - 4 columns */}
			<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
				{/* CPU Usage */}
				<SystemResourceCard
					title="CPU"
					subtitle="Processor Usage"
					percentage={cpuUsage}
					data={cpuData}
					icon={<Cpu className="w-6 h-6 text-white" />}
					iconColor="from-indigo-500 to-indigo-600 dark:from-indigo-600 dark:to-indigo-700"
					details={[
						{
							label: "Cores",
							value: systemStats?.cpu?.cores?.toString() || "0",
						},
						{ label: "Model", value: systemStats?.cpu?.model || "Unknown" },
					]}
					additionalInfo={`of ${systemStats?.cpu?.cores || 0} cores`}
				/>

				{/* RAM Usage */}
				<SystemResourceCard
					title="RAM"
					subtitle="Memory Usage"
					percentage={memoryUsage}
					data={ramData}
					icon={<Monitor className="w-6 h-6 text-white" />}
					iconColor="from-emerald-500 to-emerald-600 dark:from-emerald-600 dark:to-emerald-700"
					details={[
						{
							label: "Total",
							value: formatMemoryUsage(systemStats?.memory?.total || 0),
						},
						{
							label: "Available",
							value: formatMemoryUsage(systemStats?.memory?.available || 0),
						},
					]}
					additionalInfo={`${formatMemoryUsage(systemStats?.memory?.used || 0)} used`}
				/>

				{/* Storage Usage */}
				<SystemResourceCard
					title="Storage"
					subtitle="Disk Usage"
					percentage={diskUsage}
					data={storageData}
					icon={<HardDrive className="w-6 h-6 text-white" />}
					iconColor="from-red-500 to-red-600 dark:from-red-600 dark:to-red-700"
					details={[
						{ label: "Type", value: systemStats?.disk?.type || "Unknown" },
						{
							label: "Total",
							value: formatDiskUsage(systemStats?.disk?.total || 0),
						},
					]}
					additionalInfo={`${formatDiskUsage(systemStats?.disk?.used || 0)} used`}
				/>

				{/* System Specifications */}
				<SystemInfoCard
					title="System Info"
					subtitle="Hardware Details"
					icon={<Info className="w-6 h-6 text-white" />}
					iconColor="from-purple-500 to-purple-600 dark:from-purple-600 dark:to-purple-700"
					specs={[
						{
							label: "Platform",
							value: systemStats?.system?.platform || "Unknown",
						},
						{
							label: "Uptime",
							value: formatUptime(uptime || 0),
						},
						{
							label: "Hostname",
							value: systemStats?.system?.hostname || "Unknown",
						},
						{ label: "Arch", value: systemStats?.system?.arch || "Unknown" },
					]}
				/>
			</div>

			{/* Performance Charts */}
			<div className="space-y-6">
				{/* System Performance Overview */}
				<div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
					<PerformanceChart
						type="line"
						title="24-Hour Performance Trend"
						data={PERFORMANCE_DATA}
					/>
					<PerformanceChart
						type="bar"
						title="Network Traffic Analysis"
						data={networkTrafficData}
					/>
				</div>

				{/* Business Analytics Charts */}
				<div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
					<AreaChart
						title="User Growth Trend"
						data={userGrowthAreaData}
						dataKeys={CHART_DATA_KEYS.USER_ANALYTICS}
						height={300}
					/>
					<RadarChart
						title="Performance Metrics"
						data={performanceRadarData}
						dataKeys={CHART_DATA_KEYS.PERFORMANCE_METRICS}
						height={300}
					/>
				</div>

				{/* Advanced Analytics */}
				<div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
					<ScatterChart
						title="Revenue vs Customer Correlation"
						data={revenueScatterData}
						height={300}
					/>

				</div>
			</div>

			{/* Quick Actions and Recent Activity */}
			<div className="grid grid-cols-1 md:grid-cols-2 gap-6">
				<ActionCard title="System Actions" actions={SYSTEM_ACTIONS} />
				<AlertCard
					title="System Alerts"
					alerts={[
						{
							type: "success",
							message: "System running normally",
							animated: false,
						},
						{
							type: "info",
							message: `CPU usage at ${cpuUsage.toFixed(1)}%`,
							animated: false,
						},
						{
							type: memoryUsage > 80 ? "warning" : "info",
							message: `Memory usage at ${memoryUsage.toFixed(1)}%`,
							animated: memoryUsage > 80,
						},
						{
							type: diskUsage > 80 ? "warning" : "success",
							message: `Disk usage at ${diskUsage.toFixed(1)}%`,
							animated: false,
						},
					]}
				/>
			</div>
		</div>
	);
}

export default DashboardView;
