interface RadarChartSkeletonProps {
	className?: string;
	height?: number;
}

function Skeleton({ className = "", width = "w-full", height = "h-4" }: { className?: string; width?: string; height?: string }) {
	return (
		<div className={`animate-pulse bg-gradient-to-r from-slate-200/60 via-slate-300/40 to-slate-200/60 dark:from-slate-700/60 dark:via-slate-600/40 dark:to-slate-700/60 rounded-lg ${width} ${height} ${className}`} />
	);
}

export function RadarChartSkeleton({ className = "", height = 300 }: RadarChartSkeletonProps) {
	return (
		<div className={`group relative bg-white/80 dark:bg-slate-800/90 backdrop-blur-sm p-6 rounded-2xl shadow-lg/10 shadow-slate-200/30 dark:shadow-slate-900/20 border border-slate-200/60 dark:border-slate-700/60 overflow-hidden ${className}`}>
			<div className="absolute inset-0 bg-gradient-to-br from-slate-50/30 to-transparent dark:from-slate-700/10 dark:to-transparent"></div>
			<div className="relative z-10">
				{/* Title skeleton */}
				<Skeleton className="mb-6" width="w-40" height="h-6" />

				{/* Radar chart area skeleton */}
				<div style={{ height }} className="relative flex items-center justify-center">
					{/* Radar chart background */}
					<div className="relative w-64 h-64">
						{/* Radar grid circles */}
						{Array.from({ length: 5 }).map((_, index) => (
							<div
								key={index}
								className="absolute border border-slate-300/40 dark:border-slate-600/40 rounded-full animate-pulse"
								style={{
									width: `${(index + 1) * 20}%`,
									height: `${(index + 1) * 20}%`,
									top: '50%',
									left: '50%',
									transform: 'translate(-50%, -50%)'
								}}
							/>
						))}

						{/* Radar grid lines */}
						{Array.from({ length: 6 }).map((_, index) => (
							<div
								key={`line-${index}`}
								className="absolute w-px h-32 bg-slate-300/40 dark:bg-slate-600/40 animate-pulse"
								style={{
									top: '50%',
									left: '50%',
									transformOrigin: 'bottom',
									transform: `translate(-50%, -100%) rotate(${index * 60}deg)`
								}}
							/>
						))}

						{/* Radar data area */}
						<div className="absolute inset-0 flex items-center justify-center">
							<svg className="w-48 h-48" viewBox="0 0 100 100" role="img" aria-label="Radar chart skeleton visualization">
								<polygon
									points="50,20 75,35 70,65 30,65 25,35"
									fill="rgb(59 130 246 / 0.2)"
									stroke="rgb(59 130 246 / 0.6)"
									strokeWidth="2"
									className="animate-pulse"
								/>
								<polygon
									points="50,30 65,40 60,60 40,60 35,40"
									fill="rgb(16 185 129 / 0.2)"
									stroke="rgb(16 185 129 / 0.6)"
									strokeWidth="2"
									className="animate-pulse"
								/>
							</svg>
						</div>

						{/* Radar axis labels */}
						<div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
							<Skeleton width="w-12" height="h-3" />
						</div>
						<div className="absolute top-1/4 -right-8">
							<Skeleton width="w-10" height="h-3" />
						</div>
						<div className="absolute bottom-1/4 -right-8">
							<Skeleton width="w-14" height="h-3" />
						</div>
						<div className="absolute -bottom-4 left-1/2 transform -translate-x-1/2">
							<Skeleton width="w-16" height="h-3" />
						</div>
						<div className="absolute bottom-1/4 -left-8">
							<Skeleton width="w-12" height="h-3" />
						</div>
						<div className="absolute top-1/4 -left-8">
							<Skeleton width="w-8" height="h-3" />
						</div>
					</div>
				</div>

				{/* Legend skeleton */}
				<div className="mt-6 flex justify-center space-x-6">
					<div className="flex items-center space-x-2">
						<Skeleton width="w-3" height="h-3" className="rounded-full" />
						<Skeleton width="w-16" height="h-3" />
					</div>
					<div className="flex items-center space-x-2">
						<Skeleton width="w-3" height="h-3" className="rounded-full" />
						<Skeleton width="w-20" height="h-3" />
					</div>
				</div>
			</div>
		</div>
	);
}

export default RadarChartSkeleton;