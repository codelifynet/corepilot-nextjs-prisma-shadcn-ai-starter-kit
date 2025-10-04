interface LoadingSpinnerSkeletonProps {
	className?: string;
	size?: "sm" | "md" | "lg" | "xl";
}

function Skeleton({ className = "", width = "w-full", height = "h-4" }: { className?: string; width?: string; height?: string }) {
	return (
		<div className={`animate-pulse bg-gradient-to-r from-slate-200/60 via-slate-300/40 to-slate-200/60 dark:from-slate-700/60 dark:via-slate-600/40 dark:to-slate-700/60 rounded-lg ${width} ${height} ${className}`} />
	);
}

export function LoadingSpinnerSkeleton({ className = "", size = "md" }: LoadingSpinnerSkeletonProps) {
	const sizeClasses = {
		sm: "w-4 h-4",
		md: "w-8 h-8",
		lg: "w-12 h-12",
		xl: "w-16 h-16"
	};

	return (
		<div className={`flex items-center justify-center ${className}`}>
			<div className={`relative ${sizeClasses[size]}`}>
				{/* Outer spinning ring */}
				<div className="absolute inset-0 rounded-full border-2 border-slate-200/60 dark:border-slate-700/60"></div>
				
				{/* Inner spinning element */}
				<Skeleton 
					width={sizeClasses[size]} 
					height={sizeClasses[size]} 
					className="rounded-full animate-spin border-2 border-transparent border-t-slate-400 dark:border-t-slate-500" 
				/>
				
				{/* Center dot */}
				<div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
					<Skeleton 
						width="w-1" 
						height="h-1" 
						className="rounded-full" 
					/>
				</div>
			</div>
		</div>
	);
}

export default LoadingSpinnerSkeleton;