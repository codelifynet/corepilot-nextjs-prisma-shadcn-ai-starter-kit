interface AlertCardSkeletonProps {
	className?: string;
	alertCount?: number;
}

function Skeleton({ className = "", width = "w-full", height = "h-4" }: { className?: string; width?: string; height?: string }) {
	return (
		<div className={`animate-pulse bg-gradient-to-r from-slate-200/60 via-slate-300/40 to-slate-200/60 dark:from-slate-700/60 dark:via-slate-600/40 dark:to-slate-700/60 rounded-lg ${width} ${height} ${className}`} />
	);
}

export function AlertCardSkeleton({ className = "", alertCount = 3 }: AlertCardSkeletonProps) {
	return (
		<div className={`group relative bg-white/80 dark:bg-slate-800/90 backdrop-blur-sm p-6 rounded-2xl shadow-lg/10 shadow-slate-200/30 dark:shadow-slate-900/20 border border-slate-200/60 dark:border-slate-700/60 overflow-hidden ${className}`}>
			<div className="absolute inset-0 bg-gradient-to-br from-slate-50/30 to-transparent dark:from-slate-700/10 dark:to-transparent"></div>
			<div className="relative z-10">
				{/* Title skeleton */}
				<Skeleton className="mb-6" width="w-28" height="h-6" />
				
				{/* Alerts skeleton */}
				<div className="space-y-4">
					{Array.from({ length: alertCount }).map((_, index) => (
						<div key={index} className="flex items-center space-x-4 p-4 rounded-2xl bg-gradient-to-r from-slate-50/80 to-slate-100/30 dark:from-slate-700/20 dark:to-slate-600/10 border border-slate-200/50 dark:border-slate-600/30 backdrop-blur-sm">
							{/* Alert dot skeleton */}
							<Skeleton width="w-3" height="h-3" className="rounded-full" />
							{/* Alert message skeleton */}
							<Skeleton width="w-48" height="h-4" />
						</div>
					))}
				</div>
			</div>
		</div>
	);
}

export default AlertCardSkeleton;