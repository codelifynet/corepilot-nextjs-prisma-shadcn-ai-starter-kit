import { cn } from "@/lib/utils";

// Base Skeleton Component
interface SkeletonProps {
	className?: string;
	animate?: boolean;
}

function Skeleton({ className, animate = true }: SkeletonProps) {
	const baseClasses = "bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 dark:from-gray-700 dark:via-gray-600 dark:to-gray-700 rounded-lg";
	const animationClasses = animate ? "animate-pulse" : "";

	return (
		<div
			className={cn(baseClasses, animationClasses, className)}
		/>
	);
}

// ActionCard Skeleton
export function ActionCardSkeleton({ className, animate = true }: SkeletonProps) {
	return (
		<div className={cn("group relative bg-white/80 dark:bg-slate-800/90 backdrop-blur-sm p-6 rounded-2xl shadow-lg/10 shadow-slate-200/30 dark:shadow-slate-900/20 border border-slate-200/60 dark:border-slate-700/60 overflow-hidden", className)}>
			<div className="relative z-10">
				{/* Header */}
				<div className="flex items-center justify-between mb-4">
					<Skeleton className="w-32 h-6" animate={animate} />
					<Skeleton className="w-8 h-8 rounded-full" animate={animate} />
				</div>
				
				{/* Content */}
				<div className="space-y-3">
					<Skeleton className="w-full h-4" animate={animate} />
					<Skeleton className="w-3/4 h-4" animate={animate} />
				</div>
				
				{/* Button */}
				<div className="mt-4">
					<Skeleton className="w-24 h-8 rounded-lg" animate={animate} />
				</div>
			</div>
			
			{animate && (
				<div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full animate-shimmer rounded-2xl" />
			)}
		</div>
	);
}

// AlertCard Skeleton
export function AlertCardSkeleton({ className, animate = true }: SkeletonProps) {
	return (
		<div className={cn("group relative bg-white/80 dark:bg-slate-800/90 backdrop-blur-sm p-6 rounded-2xl shadow-lg/10 shadow-slate-200/30 dark:shadow-slate-900/20 border border-slate-200/60 dark:border-slate-700/60 overflow-hidden", className)}>
			<div className="relative z-10">
				{/* Alert Header */}
				<div className="flex items-start space-x-3 mb-4">
					<Skeleton className="w-6 h-6 rounded-full" animate={animate} />
					<div className="flex-1 space-y-2">
						<Skeleton className="w-40 h-5" animate={animate} />
						<Skeleton className="w-24 h-3" animate={animate} />
					</div>
				</div>
				
				{/* Alert Content */}
				<div className="space-y-2">
					<Skeleton className="w-full h-4" animate={animate} />
					<Skeleton className="w-2/3 h-4" animate={animate} />
				</div>
			</div>
			
			{animate && (
				<div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full animate-shimmer rounded-2xl" />
			)}
		</div>
	);
}

// AreaChart Skeleton
export function AreaChartSkeleton({ className, animate = true }: SkeletonProps) {
	return (
		<div className={cn("group relative bg-white/80 dark:bg-slate-800/90 backdrop-blur-sm p-6 rounded-2xl shadow-lg/10 shadow-slate-200/30 dark:shadow-slate-900/20 border border-slate-200/60 dark:border-slate-700/60 overflow-hidden", className)}>
			<div className="relative z-10">
				{/* Chart Header */}
				<div className="flex items-center justify-between mb-6">
					<Skeleton className="w-48 h-6" animate={animate} />
					<div className="flex space-x-2">
						<Skeleton className="w-16 h-6 rounded-full" animate={animate} />
						<Skeleton className="w-16 h-6 rounded-full" animate={animate} />
					</div>
				</div>
				
				{/* Chart Area */}
				<Skeleton className="w-full h-64 rounded-lg" animate={animate} />
			</div>
			
			{animate && (
				<div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full animate-shimmer rounded-2xl" />
			)}
		</div>
	);
}

// DashboardChart Skeleton
export function DashboardChartSkeleton({ className, animate = true }: SkeletonProps) {
	return (
		<div className={cn("group relative bg-white/80 dark:bg-slate-800/90 backdrop-blur-sm p-6 rounded-2xl shadow-lg/10 shadow-slate-200/30 dark:shadow-slate-900/20 border border-slate-200/60 dark:border-slate-700/60 overflow-hidden", className)}>
			<div className="relative z-10">
				{/* Chart Title */}
				<Skeleton className="w-40 h-6 mb-6" animate={animate} />
				
				{/* Chart Container */}
				<div className="flex items-center justify-center">
					<Skeleton className="w-48 h-48 rounded-full" animate={animate} />
				</div>
				
				{/* Legend */}
				<div className="mt-6 space-y-2">
					{Array.from({ length: 3 }).map((_, index) => (
						<div key={index} className="flex items-center space-x-2">
							<Skeleton className="w-4 h-4 rounded-full" animate={animate} />
							<Skeleton className="w-20 h-4" animate={animate} />
						</div>
					))}
				</div>
			</div>
			
			{animate && (
				<div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full animate-shimmer rounded-2xl" />
			)}
		</div>
	);
}

// LoadingSpinner Skeleton
export function LoadingSpinnerSkeleton({ className, animate = true }: SkeletonProps) {
	return (
		<div className={cn("flex items-center justify-center p-8", className)}>
			<div className="relative">
				<Skeleton className="w-8 h-8 rounded-full" animate={animate} />
				{animate && (
					<div className="absolute inset-0 border-2 border-blue-500/30 border-t-blue-500 rounded-full animate-spin" />
				)}
			</div>
		</div>
	);
}

// PerformanceChart Skeleton
export function PerformanceChartSkeleton({ className, animate = true }: SkeletonProps) {
	return (
		<div className={cn("group relative bg-white/80 dark:bg-slate-800/90 backdrop-blur-sm p-6 rounded-2xl shadow-lg/10 shadow-slate-200/30 dark:shadow-slate-900/20 border border-slate-200/60 dark:border-slate-700/60 overflow-hidden", className)}>
			<div className="relative z-10">
				{/* Header */}
				<div className="flex items-center justify-between mb-6">
					<Skeleton className="w-56 h-6" animate={animate} />
					<Skeleton className="w-24 h-8 rounded-full" animate={animate} />
				</div>
				
				{/* Chart */}
				<Skeleton className="w-full h-64 rounded-lg" animate={animate} />
				
				{/* Chart Legend */}
				<div className="mt-4 flex justify-center space-x-6">
					{Array.from({ length: 2 }).map((_, index) => (
						<div key={index} className="flex items-center space-x-2">
							<Skeleton className="w-3 h-3 rounded-full" animate={animate} />
							<Skeleton className="w-16 h-3" animate={animate} />
						</div>
					))}
				</div>
			</div>
			
			{animate && (
				<div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full animate-shimmer rounded-2xl" />
			)}
		</div>
	);
}

// RadarChart Skeleton
export function RadarChartSkeleton({ className, animate = true }: SkeletonProps) {
	return (
		<div className={cn("group relative bg-white/80 dark:bg-slate-800/90 backdrop-blur-sm p-6 rounded-2xl shadow-lg/10 shadow-slate-200/30 dark:shadow-slate-900/20 border border-slate-200/60 dark:border-slate-700/60 overflow-hidden", className)}>
			<div className="relative z-10">
				{/* Title */}
				<Skeleton className="w-48 h-6 mb-6" animate={animate} />
				
				{/* Radar Chart Container */}
				<div className="flex items-center justify-center">
					<div className="relative w-64 h-64">
						{/* Outer circle */}
						<Skeleton className="w-full h-full rounded-full" animate={animate} />
						{/* Inner circles */}
						<div className="absolute inset-8">
							<Skeleton className="w-full h-full rounded-full" animate={animate} />
						</div>
						<div className="absolute inset-16">
							<Skeleton className="w-full h-full rounded-full" animate={animate} />
						</div>
					</div>
				</div>
			</div>
			
			{animate && (
				<div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full animate-shimmer rounded-2xl" />
			)}
		</div>
	);
}

// ScatterChart Skeleton
export function ScatterChartSkeleton({ className, animate = true }: SkeletonProps) {
	return (
		<div className={cn("group relative bg-white/80 dark:bg-slate-800/90 backdrop-blur-sm p-6 rounded-2xl shadow-lg/10 shadow-slate-200/30 dark:shadow-slate-900/20 border border-slate-200/60 dark:border-slate-700/60 overflow-hidden", className)}>
			<div className="relative z-10">
				{/* Header */}
				<div className="flex items-center justify-between mb-6">
					<Skeleton className="w-44 h-6" animate={animate} />
					<div className="flex space-x-2">
						<Skeleton className="w-12 h-6 rounded-full" animate={animate} />
						<Skeleton className="w-12 h-6 rounded-full" animate={animate} />
					</div>
				</div>
				
				{/* Scatter Chart */}
				<Skeleton className="w-full h-64 rounded-lg" animate={animate} />
				
				{/* Axis Labels */}
				<div className="mt-4 flex justify-between">
					<Skeleton className="w-16 h-3" animate={animate} />
					<Skeleton className="w-16 h-3" animate={animate} />
				</div>
			</div>
			
			{animate && (
				<div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full animate-shimmer rounded-2xl" />
			)}
		</div>
	);
}

// SystemInfoCard Skeleton
export function SystemInfoCardSkeleton({ className, animate = true }: SkeletonProps) {
	return (
		<div className={cn("group relative bg-white/80 dark:bg-slate-800/90 backdrop-blur-sm p-6 rounded-2xl shadow-lg/10 shadow-slate-200/30 dark:shadow-slate-900/20 border border-slate-200/60 dark:border-slate-700/60 overflow-hidden", className)}>
			<div className="absolute inset-0 bg-gradient-to-br from-purple-50/50 to-transparent dark:from-purple-900/10 dark:to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
			<div className="relative z-10">
				{/* Header Section */}
				<div className="flex items-center space-x-3 mb-6">
					{/* Icon Skeleton */}
					<div className="p-3 bg-gradient-to-br from-purple-500/20 to-purple-600/20 rounded-2xl shadow-lg">
						<Skeleton className="w-6 h-6" animate={animate} />
					</div>
					<div className="space-y-2">
						{/* Title Skeleton */}
						<Skeleton className="w-24 h-5" animate={animate} />
						{/* Subtitle Skeleton */}
						<Skeleton className="w-32 h-3" animate={animate} />
					</div>
				</div>

				{/* Specs Section */}
				<div className="space-y-3">
					{Array.from({ length: 4 }).map((_, index) => (
						<div
							key={index}
							className="bg-slate-50/80 dark:bg-slate-700/30 p-3 rounded-xl backdrop-blur-sm"
						>
							<div className="flex justify-between items-center">
								{/* Label Skeleton */}
								<Skeleton className="w-16 h-4" animate={animate} />
								{/* Value Skeleton */}
								<Skeleton className="w-20 h-4" animate={animate} />
							</div>
						</div>
					))}
				</div>
			</div>

			{/* Animated gradient overlay */}
			{animate && (
				<div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full animate-shimmer rounded-2xl" />
			)}
		</div>
	);
}

// SystemResourceCard Skeleton
export function SystemResourceCardSkeleton({ className, animate = true }: SkeletonProps) {
	return (
		<div className={cn("group relative bg-white/80 dark:bg-slate-800/90 backdrop-blur-sm p-6 rounded-2xl shadow-lg/10 shadow-slate-200/30 dark:shadow-slate-900/20 border border-slate-200/60 dark:border-slate-700/60 overflow-hidden", className)}>
			<div className="absolute inset-0 bg-gradient-to-br from-indigo-50/50 to-transparent dark:from-indigo-900/10 dark:to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
			<div className="relative z-10">
				{/* Header Section */}
				<div className="flex items-center justify-between mb-6">
					<div className="flex items-center space-x-3">
						{/* Icon Skeleton */}
						<div className="p-3 bg-gradient-to-br from-indigo-500/20 to-indigo-600/20 rounded-2xl shadow-lg">
							<Skeleton className="w-6 h-6" animate={animate} />
						</div>
						<div className="space-y-2">
							{/* Title Skeleton */}
							<Skeleton className="w-20 h-5" animate={animate} />
							{/* Subtitle Skeleton */}
							<Skeleton className="w-28 h-3" animate={animate} />
						</div>
					</div>
					{/* Percentage Skeleton */}
					<Skeleton className="w-12 h-8" animate={animate} />
				</div>

				{/* Chart Section */}
				<div className="flex items-center justify-center mb-6">
					<div className="relative w-32 h-32">
						{/* Outer circle */}
						<Skeleton className="w-full h-full rounded-full" animate={animate} />
						{/* Inner circle (donut hole) */}
						<div className="absolute inset-4">
							<div className="w-full h-full bg-white dark:bg-slate-800 rounded-full flex items-center justify-center">
								<Skeleton className="w-8 h-6" animate={animate} />
							</div>
						</div>
					</div>
				</div>

				{/* Details Section */}
				<div className="space-y-3">
					{Array.from({ length: 3 }).map((_, index) => (
						<div
							key={index}
							className="bg-slate-50/80 dark:bg-slate-700/30 p-3 rounded-xl backdrop-blur-sm"
						>
							<div className="flex justify-between items-center">
								{/* Label Skeleton */}
								<Skeleton className="w-14 h-3" animate={animate} />
								{/* Value Skeleton */}
								<Skeleton className="w-16 h-3" animate={animate} />
							</div>
						</div>
					))}
				</div>

				{/* Additional Info Section */}
				<div className="mt-4 pt-3 border-t border-slate-200/60 dark:border-slate-700/60">
					<Skeleton className="w-24 h-3" animate={animate} />
				</div>
			</div>

			{/* Animated gradient overlay */}
			{animate && (
				<div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full animate-shimmer rounded-2xl" />
			)}
		</div>
	);
}

// StatsCard Skeleton
export function StatsCardSkeleton({ className, animate = true }: SkeletonProps) {
	return (
		<div className={cn("group relative bg-white/80 dark:bg-slate-800/90 backdrop-blur-sm p-6 rounded-2xl shadow-lg/10 shadow-slate-200/30 dark:shadow-slate-900/20 border border-slate-200/60 dark:border-slate-700/60 overflow-hidden", className)}>
			<div className="absolute inset-0 bg-gradient-to-br from-slate-50/30 to-transparent dark:from-slate-700/10 dark:to-transparent"></div>
			<div className="relative z-10">
				{/* Icon and Action Button */}
				<div className="flex items-center justify-between mb-4">
					<div className="w-10 h-10 bg-gradient-to-br from-blue-500/20 to-purple-600/20 rounded-xl">
						<Skeleton className="w-full h-full rounded-xl" animate={animate} />
					</div>
					<Skeleton className="w-6 h-6 rounded" animate={animate} />
				</div>
				
				{/* Value */}
				<Skeleton className="w-16 h-8 rounded mb-2" animate={animate} />
				
				{/* Label */}
				<Skeleton className="w-20 h-4 rounded" animate={animate} />
			</div>
			
			{animate && (
				<div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full animate-shimmer rounded-2xl" />
			)}
		</div>
	);
}

// DashboardSkeleton Skeleton Component
export function DashboardSkeletonSkeleton({ className, animate = true }: SkeletonProps) {
	return (
		<div className={cn(
			"relative overflow-hidden rounded-2xl bg-gradient-to-br from-slate-50 to-slate-100/50 dark:from-slate-900 dark:to-slate-800/50 p-6 border border-slate-200/60 dark:border-slate-700/60 shadow-sm hover:shadow-md transition-all duration-300",
			className
		)}>
			{/* Header Section */}
			<div className="mb-6">
				<Skeleton className="w-48 h-8 mb-2" animate={animate} />
				<Skeleton className="w-32 h-4" animate={animate} />
			</div>

			{/* Stats Cards Grid */}
			<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
				{Array.from({ length: 4 }).map((_, i) => (
					<div key={i} className="p-4 rounded-xl bg-white/50 dark:bg-slate-800/50 border border-slate-200/40 dark:border-slate-700/40">
						<Skeleton className="w-6 h-6 mb-2" animate={animate} />
						<Skeleton className="w-16 h-6 mb-1" animate={animate} />
						<Skeleton className="w-20 h-3" animate={animate} />
					</div>
				))}
			</div>

			{/* Main Charts Section */}
			<div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
				{/* Large Chart */}
				<div className="lg:col-span-2 p-4 rounded-xl bg-white/50 dark:bg-slate-800/50 border border-slate-200/40 dark:border-slate-700/40">
					<Skeleton className="w-32 h-6 mb-4" animate={animate} />
					<Skeleton className="w-full h-64" animate={animate} />
				</div>

				{/* Side Chart */}
				<div className="p-4 rounded-xl bg-white/50 dark:bg-slate-800/50 border border-slate-200/40 dark:border-slate-700/40">
					<Skeleton className="w-24 h-6 mb-4" animate={animate} />
					<Skeleton className="w-full h-64" animate={animate} />
				</div>
			</div>

			{/* Additional Charts */}
			<div className="grid grid-cols-1 md:grid-cols-2 gap-6">
				{Array.from({ length: 2 }).map((_, i) => (
					<div key={i} className="p-4 rounded-xl bg-white/50 dark:bg-slate-800/50 border border-slate-200/40 dark:border-slate-700/40">
						<Skeleton className="w-28 h-6 mb-4" animate={animate} />
						<Skeleton className="w-full h-48" animate={animate} />
					</div>
				))}
			</div>

			{/* Animated gradient overlay */}
			{animate && (
				<div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full animate-shimmer rounded-2xl" />
			)}
		</div>
	);
}