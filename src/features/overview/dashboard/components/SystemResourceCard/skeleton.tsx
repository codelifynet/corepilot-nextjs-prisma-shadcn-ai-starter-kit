interface SystemResourceCardSkeletonProps {
	className?: string;
	showChart?: boolean;
}

function Skeleton({ className = "", width = "w-full", height = "h-4" }: { className?: string; width?: string; height?: string }) {
	return (
		<div className={`animate-pulse bg-gradient-to-r from-slate-200/60 via-slate-300/40 to-slate-200/60 dark:from-slate-700/60 dark:via-slate-600/40 dark:to-slate-700/60 rounded-lg ${width} ${height} ${className}`} />
	);
}

export function SystemResourceCardSkeleton({ className = "", showChart = true }: SystemResourceCardSkeletonProps) {
	return (
		<div className={`group relative bg-white/80 dark:bg-slate-800/90 backdrop-blur-sm p-6 rounded-2xl shadow-lg/10 shadow-slate-200/30 dark:shadow-slate-900/20 border border-slate-200/60 dark:border-slate-700/60 overflow-hidden transition-all duration-300 hover:shadow-xl/20 hover:shadow-slate-300/40 dark:hover:shadow-slate-900/30 hover:-translate-y-1 ${className}`}>
			{/* Gradient background */}
			<div className="absolute inset-0 bg-gradient-to-br from-slate-50/30 to-transparent dark:from-slate-700/10 dark:to-transparent"></div>
			
			<div className="relative z-10">
				{/* Header with icon, title and percentage */}
				<div className="flex items-center justify-between mb-6">
					<div className="flex items-center space-x-3">
						<Skeleton width="w-10" height="h-10" className="rounded-xl" />
						<div className="space-y-2">
							<Skeleton width="w-24" height="h-5" />
							<Skeleton width="w-16" height="h-3" />
						</div>
					</div>
					<div className="text-right space-y-1">
						<Skeleton width="w-12" height="h-6" />
						<Skeleton width="w-8" height="h-3" />
					</div>
				</div>
				
				{showChart && (
					<>
						{/* Chart area */}
						<div className="mb-6">
							<Skeleton width="w-full" height="h-32" className="rounded-lg" />
						</div>
						
						{/* Chart legend/data points */}
						<div className="grid grid-cols-2 gap-4 mb-4">
							{Array.from({ length: 4 }).map((_, index) => (
								<div key={index} className="flex items-center space-x-2">
									<Skeleton width="w-3" height="h-3" className="rounded-full" />
									<Skeleton width="w-16" height="h-3" />
								</div>
							))}
						</div>
					</>
				)}
				
				{/* Details section */}
				<div className="space-y-3">
					{Array.from({ length: 3 }).map((_, index) => (
						<div key={index} className="flex justify-between items-center py-2 border-b border-slate-200/40 dark:border-slate-700/40 last:border-b-0">
							<Skeleton width="w-20" height="h-4" />
							<Skeleton width="w-16" height="h-4" />
						</div>
					))}
				</div>
				
				{/* Additional info */}
				<div className="mt-4 pt-4 border-t border-slate-200/40 dark:border-slate-700/40">
					<div className="flex items-center justify-between">
						<Skeleton width="w-24" height="h-4" />
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

export default SystemResourceCardSkeleton;