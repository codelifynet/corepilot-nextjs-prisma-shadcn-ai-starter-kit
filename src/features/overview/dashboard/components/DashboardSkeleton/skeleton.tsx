interface DashboardSkeletonSkeletonProps {
	className?: string;
	showCharts?: boolean;
}

function Skeleton({ className = "", width = "w-full", height = "h-4" }: { className?: string; width?: string; height?: string }) {
	return (
		<div className={`animate-pulse bg-gradient-to-r from-slate-200/60 via-slate-300/40 to-slate-200/60 dark:from-slate-700/60 dark:via-slate-600/40 dark:to-slate-700/60 rounded-lg ${width} ${height} ${className}`} />
	);
}

export function DashboardSkeletonSkeleton({ className = "", showCharts = true }: DashboardSkeletonSkeletonProps) {
	return (
		<div className={`space-y-6 ${className}`}>
			{/* Header skeleton */}
			<div className="flex items-center justify-between">
				<div className="space-y-2">
					<Skeleton width="w-48" height="h-8" />
					<Skeleton width="w-32" height="h-4" />
				</div>
				<Skeleton width="w-24" height="h-10" className="rounded-xl" />
			</div>
			
			{/* Stats cards skeleton */}
			<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
				{Array.from({ length: 4 }).map((_, index) => (
					<div key={index} className="group relative bg-white/80 dark:bg-slate-800/90 backdrop-blur-sm p-6 rounded-2xl shadow-lg/10 shadow-slate-200/30 dark:shadow-slate-900/20 border border-slate-200/60 dark:border-slate-700/60 overflow-hidden">
						<div className="absolute inset-0 bg-gradient-to-br from-slate-50/30 to-transparent dark:from-slate-700/10 dark:to-transparent"></div>
						<div className="relative z-10">
							<div className="flex items-center justify-between mb-4">
								<Skeleton width="w-10" height="h-10" className="rounded-xl" />
								<Skeleton width="w-6" height="h-6" />
							</div>
							<Skeleton width="w-16" height="h-8" className="mb-2" />
							<Skeleton width="w-20" height="h-4" />
						</div>
					</div>
				))}
			</div>
			
			{showCharts && (
				<>
					{/* Main charts skeleton */}
					<div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
						{/* Large chart skeleton */}
						<div className="lg:col-span-2">
							<div className="group relative bg-white/80 dark:bg-slate-800/90 backdrop-blur-sm p-6 rounded-2xl shadow-lg/10 shadow-slate-200/30 dark:shadow-slate-900/20 border border-slate-200/60 dark:border-slate-700/60 overflow-hidden">
								<div className="absolute inset-0 bg-gradient-to-br from-slate-50/30 to-transparent dark:from-slate-700/10 dark:to-transparent"></div>
								<div className="relative z-10">
									<Skeleton width="w-40" height="h-6" className="mb-6" />
									<Skeleton width="w-full" height="h-64" className="rounded-lg" />
								</div>
							</div>
						</div>
						
						{/* Side charts skeleton */}
						{Array.from({ length: 2 }).map((_, index) => (
							<div key={index} className="group relative bg-white/80 dark:bg-slate-800/90 backdrop-blur-sm p-6 rounded-2xl shadow-lg/10 shadow-slate-200/30 dark:shadow-slate-900/20 border border-slate-200/60 dark:border-slate-700/60 overflow-hidden">
								<div className="absolute inset-0 bg-gradient-to-br from-slate-50/30 to-transparent dark:from-slate-700/10 dark:to-transparent"></div>
								<div className="relative z-10">
									<Skeleton width="w-32" height="h-6" className="mb-6" />
									<Skeleton width="w-full" height="h-48" className="rounded-lg" />
								</div>
							</div>
						))}
					</div>
					
					{/* Additional charts skeleton */}
					<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
						{Array.from({ length: 3 }).map((_, index) => (
							<div key={index} className="group relative bg-white/80 dark:bg-slate-800/90 backdrop-blur-sm p-6 rounded-2xl shadow-lg/10 shadow-slate-200/30 dark:shadow-slate-900/20 border border-slate-200/60 dark:border-slate-700/60 overflow-hidden">
								<div className="absolute inset-0 bg-gradient-to-br from-slate-50/30 to-transparent dark:from-slate-700/10 dark:to-transparent"></div>
								<div className="relative z-10">
									<Skeleton width="w-28" height="h-6" className="mb-4" />
									<Skeleton width="w-full" height="h-32" className="rounded-lg" />
								</div>
							</div>
						))}
					</div>
				</>
			)}
			
			{/* System info cards skeleton */}
			<div className="grid grid-cols-1 md:grid-cols-2 gap-6">
				{Array.from({ length: 2 }).map((_, index) => (
					<div key={index} className="group relative bg-white/80 dark:bg-slate-800/90 backdrop-blur-sm p-6 rounded-2xl shadow-lg/10 shadow-slate-200/30 dark:shadow-slate-900/20 border border-slate-200/60 dark:border-slate-700/60 overflow-hidden">
						<div className="absolute inset-0 bg-gradient-to-br from-slate-50/30 to-transparent dark:from-slate-700/10 dark:to-transparent"></div>
						<div className="relative z-10">
							<div className="flex items-center space-x-3 mb-6">
								<Skeleton width="w-12" height="h-12" className="rounded-2xl" />
								<div className="space-y-2">
									<Skeleton width="w-24" height="h-5" />
									<Skeleton width="w-16" height="h-3" />
								</div>
							</div>
							<div className="space-y-3">
								{Array.from({ length: 4 }).map((_, specIndex) => (
									<div key={specIndex} className="flex justify-between items-center">
										<Skeleton width="w-20" height="h-4" />
										<Skeleton width="w-16" height="h-4" />
									</div>
								))}
							</div>
						</div>
					</div>
				))}
			</div>
		</div>
	);
}

export default DashboardSkeletonSkeleton;