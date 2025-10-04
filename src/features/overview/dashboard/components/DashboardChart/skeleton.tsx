interface DashboardChartSkeletonProps {
	className?: string;
	height?: number;
}

function Skeleton({ className = "", width = "w-full", height = "h-4" }: { className?: string; width?: string; height?: string }) {
	return (
		<div className={`animate-pulse bg-gradient-to-r from-slate-200/60 via-slate-300/40 to-slate-200/60 dark:from-slate-700/60 dark:via-slate-600/40 dark:to-slate-700/60 rounded-lg ${width} ${height} ${className}`} />
	);
}

export function DashboardChartSkeleton({ className = "", height = 300 }: DashboardChartSkeletonProps) {
	return (
		<div className={`group relative bg-white/80 dark:bg-slate-800/90 backdrop-blur-sm p-6 rounded-2xl shadow-lg/10 shadow-slate-200/30 dark:shadow-slate-900/20 border border-slate-200/60 dark:border-slate-700/60 overflow-hidden ${className}`}>
			<div className="absolute inset-0 bg-gradient-to-br from-slate-50/30 to-transparent dark:from-slate-900/10 dark:to-transparent"></div>
			<div className="relative z-10">
				{/* Title skeleton */}
				<Skeleton className="mb-6" width="w-40" height="h-6" />
				
				{/* Chart area skeleton */}
				<div style={{ height }} className="relative flex items-center justify-center">
					{/* Pie chart skeleton */}
					<div className="relative">
						{/* Outer circle */}
						<div className="w-48 h-48 rounded-full border-8 border-slate-200/60 dark:border-slate-700/60 animate-pulse">
							{/* Inner circle (donut hole) */}
							<div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-24 h-24 rounded-full bg-white/80 dark:bg-slate-800/90 border-4 border-slate-200/40 dark:border-slate-700/40" />
						</div>
						
						{/* Pie segments skeleton */}
						<div className="absolute inset-0 rounded-full overflow-hidden">
							<div className="absolute top-0 left-1/2 w-1/2 h-1/2 bg-blue-200/60 dark:bg-blue-800/40 origin-bottom-left transform rotate-0" style={{ clipPath: 'polygon(0 100%, 100% 100%, 100% 0)' }} />
							<div className="absolute top-0 left-1/2 w-1/2 h-1/2 bg-green-200/60 dark:bg-green-800/40 origin-bottom-left transform rotate-90" style={{ clipPath: 'polygon(0 100%, 100% 100%, 100% 0)' }} />
							<div className="absolute top-0 left-1/2 w-1/2 h-1/2 bg-amber-200/60 dark:bg-amber-800/40 origin-bottom-left transform rotate-180" style={{ clipPath: 'polygon(0 100%, 100% 100%, 100% 0)' }} />
							<div className="absolute top-0 left-1/2 w-1/2 h-1/2 bg-purple-200/60 dark:bg-purple-800/40 origin-bottom-left transform rotate-270" style={{ clipPath: 'polygon(0 100%, 100% 100%, 100% 0)' }} />
						</div>
					</div>
				</div>
				
				{/* Legend skeleton */}
				<div className="mt-6 grid grid-cols-2 gap-4">
					{Array.from({ length: 4 }).map((_, index) => (
						<div key={index} className="flex items-center space-x-3">
							<Skeleton width="w-4" height="h-4" className="rounded-full" />
							<div className="flex-1">
								<Skeleton width="w-20" height="h-3" className="mb-1" />
								<Skeleton width="w-12" height="h-3" />
							</div>
						</div>
					))}
				</div>
			</div>
		</div>
	);
}

export default DashboardChartSkeleton;