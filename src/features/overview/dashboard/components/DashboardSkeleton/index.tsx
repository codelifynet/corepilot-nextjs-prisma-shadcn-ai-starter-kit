import { PageHeader } from "@/components/ui/page-header";
import { getPageGradient } from "@/lib/page-utils";
import {
	SystemResourceCardSkeleton,
	SystemInfoCardSkeleton,
	PerformanceChartSkeleton,
	ActionCardSkeleton,
	AlertCardSkeleton,
	AreaChartSkeleton,
	RadarChartSkeleton,
	ScatterChartSkeleton,
	StatsCardSkeleton,
} from "../skeletons";

export function DashboardSkeleton() {
	return (
		<div className="container mx-auto p-6 space-y-8">
			<PageHeader
				title="System Dashboard"
				description="Comprehensive system performance monitoring and analytics"
				gradient={getPageGradient("/admin/overview")}
			/>

			{/* Business Metrics Cards Skeleton */}
			<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
				{Array.from({ length: 4 }).map((_, index) => (
					<StatsCardSkeleton key={index} />
				))}
			</div>

			{/* System Resources Grid Skeleton - 4 columns */}
			<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
				<SystemResourceCardSkeleton />
				<SystemResourceCardSkeleton />
				<SystemResourceCardSkeleton />
				<SystemInfoCardSkeleton />
			</div>

			{/* Performance Chart Skeleton */}
			<div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
				<div className="lg:col-span-2">
					<PerformanceChartSkeleton />
				</div>
				<div className="space-y-6">
					<ActionCardSkeleton />
					<AlertCardSkeleton />
				</div>
			</div>

			{/* Charts Grid Skeleton */}
			<div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
				<AreaChartSkeleton />
				<RadarChartSkeleton />
				<ScatterChartSkeleton />
			</div>
		</div>
	);
}

export default DashboardSkeleton;