interface PerformanceChartSkeletonProps {
	className?: string;
	type?: "line" | "bar";
	height?: number;
}

function Skeleton({ className = "", width = "w-full", height = "h-4" }: { className?: string; width?: string; height?: string }) {
	return (
		<div className={`animate-pulse bg-gradient-to-r from-slate-200/60 via-slate-300/40 to-slate-200/60 dark:from-slate-700/60 dark:via-slate-600/40 dark:to-slate-700/60 rounded-lg ${width} ${height} ${className}`} />
	);
}

export function PerformanceChartSkeleton({ className = "", type = "line", height = 264 }: PerformanceChartSkeletonProps) {
	return (
		<div className={`group relative bg-white/80 dark:bg-slate-800/90 backdrop-blur-sm p-6 rounded-2xl shadow-lg/10 shadow-slate-200/30 dark:shadow-slate-900/20 border border-slate-200/60 dark:border-slate-700/60 overflow-hidden ${className}`}>
			<div className="absolute inset-0 bg-gradient-to-br from-slate-50/30 to-transparent dark:from-slate-700/10 dark:to-transparent"></div>
			<div className="relative z-10">
				{/* Title skeleton */}
				<Skeleton className="mb-6" width="w-44" height="h-6" />

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
							{Array.from({ length: 8 }).map((_, index) => (
								<div key={`v-${index}`} className="absolute h-full w-px bg-slate-300/40 dark:bg-slate-600/40" style={{ left: `${index * 14.28}%` }} />
							))}

							{type === "line" ? (
								/* Line chart skeleton */
								<>
									{/* CPU line */}
									<div className="absolute inset-0">
										<svg className="w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none" role="img" aria-label="CPU usage graph skeleton">
											<path
												d="M0,80 Q25,60 50,70 T100,50"
												stroke="rgb(59 130 246 / 0.6)"
												strokeWidth="2"
												fill="none"
												className="animate-pulse"
											/>
										</svg>
									</div>
									{/* RAM line */}
									<div className="absolute inset-0">
										<svg className="w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none" role="img" aria-label="RAM usage graph skeleton">
											<path
												d="M0,60 Q25,40 50,50 T100,30"
												stroke="rgb(16 185 129 / 0.6)"
												strokeWidth="2"
												fill="none"
												className="animate-pulse"
											/>
										</svg>
									</div>
									{/* Network line */}
									<div className="absolute inset-0">
										<svg className="w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none" role="img" aria-label="Network usage graph skeleton">
											<path
												d="M0,90 Q25,70 50,80 T100,60"
												stroke="rgb(245 158 11 / 0.6)"
												strokeWidth="2"
												fill="none"
												className="animate-pulse"
											/>
										</svg>
									</div>
								</>
							) : (
								/* Bar chart skeleton */
								<div className="absolute bottom-0 left-0 w-full h-full flex items-end justify-around px-4">
									{Array.from({ length: 6 }).map((_, index) => (
										<div
											key={index}
											className="bg-gradient-to-t from-blue-200/60 to-blue-100/30 dark:from-blue-800/40 dark:to-blue-700/20 rounded-t-lg animate-pulse"
											style={{
												width: '12%',
												height: `${Math.random() * 60 + 20}%`
											}}
										/>
									))}
								</div>
							)}
						</div>
					</div>

					{/* Legend skeleton */}
					<div className="absolute top-2 right-2 flex space-x-4">
						<div className="flex items-center space-x-2">
							<Skeleton width="w-3" height="h-3" className="rounded-full" />
							<Skeleton width="w-8" height="h-3" />
						</div>
						<div className="flex items-center space-x-2">
							<Skeleton width="w-3" height="h-3" className="rounded-full" />
							<Skeleton width="w-8" height="h-3" />
						</div>
						<div className="flex items-center space-x-2">
							<Skeleton width="w-3" height="h-3" className="rounded-full" />
							<Skeleton width="w-12" height="h-3" />
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}

export default PerformanceChartSkeleton;