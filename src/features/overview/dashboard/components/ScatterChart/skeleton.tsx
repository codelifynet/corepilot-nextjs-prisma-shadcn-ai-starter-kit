interface ScatterChartSkeletonProps {
	className?: string;
	height?: number;
}

function Skeleton({ className = "", width = "w-full", height = "h-4" }: { className?: string; width?: string; height?: string }) {
	return (
		<div className={`animate-pulse bg-gradient-to-r from-slate-200/60 via-slate-300/40 to-slate-200/60 dark:from-slate-700/60 dark:via-slate-600/40 dark:to-slate-700/60 rounded-lg ${width} ${height} ${className}`} />
	);
}

export function ScatterChartSkeleton({ className = "", height = 300 }: ScatterChartSkeletonProps) {
	return (
		<div className={`group relative bg-white/80 dark:bg-slate-800/90 backdrop-blur-sm p-6 rounded-2xl shadow-lg/10 shadow-slate-200/30 dark:shadow-slate-900/20 border border-slate-200/60 dark:border-slate-700/60 overflow-hidden ${className}`}>
			<div className="absolute inset-0 bg-gradient-to-br from-slate-50/30 to-transparent dark:from-slate-700/10 dark:to-transparent"></div>
			<div className="relative z-10">
				{/* Title skeleton */}
				<Skeleton className="mb-6" width="w-48" height="h-6" />
				
				{/* Chart area skeleton */}
				<div style={{ height }} className="relative">
					{/* Chart background */}
					<div className="absolute inset-0 bg-gradient-to-br from-slate-50/50 to-slate-100/30 dark:from-slate-700/20 dark:to-slate-600/10 rounded-lg border border-slate-200/40 dark:border-slate-600/40">
						{/* Grid lines skeleton */}
						<div className="absolute inset-4">
							{/* Horizontal grid lines */}
							{Array.from({ length: 6 }).map((_, index) => (
								<div key={`h-${index}`} className="absolute w-full h-px bg-slate-300/40 dark:bg-slate-600/40" style={{ top: `${index * 20}%` }} />
							))}
							{/* Vertical grid lines */}
							{Array.from({ length: 8 }).map((_, index) => (
								<div key={`v-${index}`} className="absolute h-full w-px bg-slate-300/40 dark:bg-slate-600/40" style={{ left: `${index * 14.28}%` }} />
							))}
							
							{/* Scatter points skeleton */}
							<div className="absolute inset-0">
								{/* First dataset points */}
								{Array.from({ length: 12 }).map((_, index) => (
									<div
										key={`point1-${index}`}
										className="absolute w-2 h-2 bg-blue-400/60 dark:bg-blue-500/60 rounded-full animate-pulse"
										style={{
											left: `${Math.random() * 90 + 5}%`,
											top: `${Math.random() * 80 + 10}%`,
											animationDelay: `${index * 0.1}s`
										}}
									/>
								))}
								
								{/* Second dataset points */}
								{Array.from({ length: 10 }).map((_, index) => (
									<div
										key={`point2-${index}`}
										className="absolute w-2 h-2 bg-green-400/60 dark:bg-green-500/60 rounded-full animate-pulse"
										style={{
											left: `${Math.random() * 90 + 5}%`,
											top: `${Math.random() * 80 + 10}%`,
											animationDelay: `${index * 0.15}s`
										}}
									/>
								))}
								
								{/* Third dataset points */}
								{Array.from({ length: 8 }).map((_, index) => (
									<div
										key={`point3-${index}`}
										className="absolute w-2 h-2 bg-amber-400/60 dark:bg-amber-500/60 rounded-full animate-pulse"
										style={{
											left: `${Math.random() * 90 + 5}%`,
											top: `${Math.random() * 80 + 10}%`,
											animationDelay: `${index * 0.2}s`
										}}
									/>
								))}
							</div>
						</div>
						
						{/* Axis labels skeleton */}
						<div className="absolute -bottom-6 left-1/2 transform -translate-x-1/2">
							<Skeleton width="w-16" height="h-3" />
						</div>
						<div className="absolute -left-8 top-1/2 transform -translate-y-1/2 -rotate-90">
							<Skeleton width="w-12" height="h-3" />
						</div>
					</div>
					
					{/* Legend skeleton */}
					<div className="absolute top-2 right-2 flex flex-col space-y-2">
						<div className="flex items-center space-x-2">
							<Skeleton width="w-3" height="h-3" className="rounded-full" />
							<Skeleton width="w-16" height="h-3" />
						</div>
						<div className="flex items-center space-x-2">
							<Skeleton width="w-3" height="h-3" className="rounded-full" />
							<Skeleton width="w-20" height="h-3" />
						</div>
						<div className="flex items-center space-x-2">
							<Skeleton width="w-3" height="h-3" className="rounded-full" />
							<Skeleton width="w-14" height="h-3" />
						</div>
					</div>
				</div>
				
				{/* Statistics skeleton */}
				<div className="mt-4 grid grid-cols-3 gap-4">
					<div className="text-center">
						<Skeleton width="w-8" height="h-5" className="mx-auto mb-1" />
						<Skeleton width="w-12" height="h-3" className="mx-auto" />
					</div>
					<div className="text-center">
						<Skeleton width="w-10" height="h-5" className="mx-auto mb-1" />
						<Skeleton width="w-16" height="h-3" className="mx-auto" />
					</div>
					<div className="text-center">
						<Skeleton width="w-6" height="h-5" className="mx-auto mb-1" />
						<Skeleton width="w-10" height="h-3" className="mx-auto" />
					</div>
				</div>
			</div>
		</div>
	);
}

export default ScatterChartSkeleton;