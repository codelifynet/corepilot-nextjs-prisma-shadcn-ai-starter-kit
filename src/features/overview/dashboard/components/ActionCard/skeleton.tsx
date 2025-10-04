interface ActionCardSkeletonProps {
	className?: string;
	actionCount?: number;
}

function Skeleton({ className = "", width = "w-full", height = "h-4" }: { className?: string; width?: string; height?: string }) {
	return (
		<div className={`animate-pulse bg-gradient-to-r from-slate-200/60 via-slate-300/40 to-slate-200/60 dark:from-slate-700/60 dark:via-slate-600/40 dark:to-slate-700/60 rounded-lg ${width} ${height} ${className}`} />
	);
}

export function ActionCardSkeleton({ className = "", actionCount = 3 }: ActionCardSkeletonProps) {
	return (
		<div className={`group relative bg-white/80 dark:bg-slate-800/90 backdrop-blur-sm p-6 rounded-2xl shadow-lg/10 shadow-slate-200/30 dark:shadow-slate-900/20 border border-slate-200/60 dark:border-slate-700/60 overflow-hidden ${className}`}>
			<div className="absolute inset-0 bg-gradient-to-br from-slate-50/30 to-transparent dark:from-slate-700/10 dark:to-transparent"></div>
			<div className="relative z-10">
				{/* Title skeleton */}
				<Skeleton className="mb-6" width="w-32" height="h-6" />
				
				{/* Actions skeleton */}
				<div className="grid grid-cols-1 gap-3">
					{Array.from({ length: actionCount }).map((_, index) => (
						<div key={index} className="flex items-center justify-between p-4 rounded-xl bg-gradient-to-r from-slate-50/50 to-slate-100/30 dark:from-slate-700/30 dark:to-slate-600/20 border border-slate-200/40 dark:border-slate-600/40">
							<div className="flex items-center space-x-3">
								{/* Icon skeleton */}
								<Skeleton width="w-5" height="h-5" className="rounded-full" />
								{/* Label skeleton */}
								<Skeleton width="w-24" height="h-4" />
							</div>
							{/* Button skeleton */}
							<Skeleton width="w-16" height="h-8" className="rounded-lg" />
						</div>
					))}
				</div>
			</div>
		</div>
	);
}

export default ActionCardSkeleton;