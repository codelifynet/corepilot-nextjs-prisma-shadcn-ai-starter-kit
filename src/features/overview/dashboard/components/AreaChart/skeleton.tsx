interface AreaChartSkeletonProps {
	className?: string;
	height?: number;
}

function Skeleton({ className = "", width = "w-full", height = "h-4" }: { className?: string; width?: string; height?: string }) {
	return (
		<div className={`animate-pulse bg-gradient-to-r from-slate-200/60 via-slate-300/40 to-slate-200/60 dark:from-slate-700/60 dark:via-slate-600/40 dark:to-slate-700/60 rounded-lg ${width} ${height} ${className}`} />
	);
}

export function AreaChartSkeleton({ className = "", height = 300 }: AreaChartSkeletonProps) {
	return (
		<div className={`group relative bg-white/80 dark:bg-slate-800/90 backdrop-blur-sm p-6 rounded-2xl shadow-lg/10 shadow-slate-200/30 dark:shadow-slate-900/20 border border-slate-200/60 dark:border-slate-700/60 overflow-hidden ${className}`}>
			<div className="absolute inset-0 bg-gradient-to-br from-indigo-50/30 to-transparent dark:from-indigo-900/10 dark:to-transparent"></div>
			<div className="relative z-10">
				{/* Title skeleton */}
				<Skeleton className="mb-4" width="w-36" height="h-6" />
				
				{/* Chart area skeleton */}
				<div style={{ height }} className="relative">
					{/* Chart background */}
					<div className="absolute inset-0 bg-gradient-to-br from-slate-50/50 to-slate-100/30 dark:from-slate-700/20 dark:to-slate-600/10 rounded-lg border border-slate-200/40 dark:border-slate-600/40">
						{/* Grid lines skeleton */}
						<div className="absolute inset-4">
							{/* Horizontal grid lines */}
							{Array.from({ length: 5 }).map((_, index) => (
								<div key={`h-${index}`} className="absolute w-full h-px bg-slate-300/40 dark:bg-slate-600/40" style={{ top: `${index * 25}%` }} />
							))}
							{/* Vertical grid lines */}
							{Array.from({ length: 6 }).map((_, index) => (
								<div key={`v-${index}`} className="absolute h-full w-px bg-slate-300/40 dark:bg-slate-600/40" style={{ left: `${index * 20}%` }} />
							))}
							
							{/* Area chart shape skeleton */}
							<div className="absolute bottom-0 left-0 w-full h-3/4 bg-gradient-to-t from-indigo-200/60 to-indigo-100/30 dark:from-indigo-800/40 dark:to-indigo-700/20 rounded-b-lg opacity-60" />
							<div className="absolute bottom-0 left-0 w-full h-1/2 bg-gradient-to-t from-blue-200/60 to-blue-100/30 dark:from-blue-800/40 dark:to-blue-700/20 rounded-b-lg opacity-40" />
						</div>
					</div>
					
					{/* Legend skeleton */}
					<div className="absolute top-2 right-2 flex space-x-4">
						<div className="flex items-center space-x-2">
							<Skeleton width="w-3" height="h-3" className="rounded-full" />
							<Skeleton width="w-16" height="h-3" />
						</div>
						<div className="flex items-center space-x-2">
							<Skeleton width="w-3" height="h-3" className="rounded-full" />
							<Skeleton width="w-16" height="h-3" />
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}

export default AreaChartSkeleton;