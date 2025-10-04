import { cn } from "@/lib/utils";

interface LoadingSpinnerProps {
	size?: "sm" | "md" | "lg" | "xl";
	variant?: "default" | "dots" | "pulse" | "bounce" | "gradient";
	className?: string;
	text?: string;
}

export function LoadingSpinner({
	size = "md",
	variant = "default",
	className,
	text
}: LoadingSpinnerProps) {
	const sizeClasses = {
		sm: "w-4 h-4",
		md: "w-6 h-6",
		lg: "w-8 h-8",
		xl: "w-12 h-12"
	};

	const textSizeClasses = {
		sm: "text-xs",
		md: "text-sm",
		lg: "text-base",
		xl: "text-lg"
	};

	if (variant === "dots") {
		return (
			<div className={cn("flex items-center space-x-1", className)}>
				{[0, 1, 2].map((i) => (
					<div
						key={i}
						className={cn(
							"bg-blue-500 rounded-full animate-bounce",
							sizeClasses[size]
						)}
						style={{
							animationDelay: `${i * 0.1}s`,
							animationDuration: "0.6s"
						}}
					/>
				))}
				{text && (
					<span className={cn("ml-3 text-gray-600 dark:text-gray-400", textSizeClasses[size])}>
						{text}
					</span>
				)}
			</div>
		);
	}

	if (variant === "pulse") {
		return (
			<div className={cn("flex items-center space-x-3", className)}>
				<div className={cn(
					"bg-blue-500 rounded-full animate-pulse",
					sizeClasses[size]
				)} />
				{text && (
					<span className={cn("text-gray-600 dark:text-gray-400 animate-pulse", textSizeClasses[size])}>
						{text}
					</span>
				)}
			</div>
		);
	}

	if (variant === "bounce") {
		return (
			<div className={cn("flex flex-col items-center space-y-2", className)}>
				<div className={cn(
					"bg-gradient-to-r from-blue-500 to-purple-600 rounded-full animate-bounce",
					sizeClasses[size]
				)} />
				{text && (
					<span className={cn("text-gray-600 dark:text-gray-400", textSizeClasses[size])}>
						{text}
					</span>
				)}
			</div>
		);
	}

	if (variant === "gradient") {
		return (
			<div className={cn("flex items-center space-x-3", className)}>
				<div className="relative">
					<div className={cn(
						"border-4 border-gray-200 dark:border-gray-700 rounded-full",
						sizeClasses[size]
					)} />
					<div className={cn(
						"absolute inset-0 border-4 border-transparent border-t-blue-500 border-r-purple-500 rounded-full animate-spin",
						sizeClasses[size]
					)} />
				</div>
				{text && (
					<span className={cn("text-gray-600 dark:text-gray-400", textSizeClasses[size])}>
						{text}
					</span>
				)}
			</div>
		);
	}

	// Default spinner
	return (
		<div className={cn("flex items-center space-x-3", className)}>
			<div className={cn(
				"border-2 border-gray-200 dark:border-gray-700 border-t-blue-500 rounded-full animate-spin",
				sizeClasses[size]
			)} />
			{text && (
				<span className={cn("text-gray-600 dark:text-gray-400", textSizeClasses[size])}>
					{text}
				</span>
			)}
		</div>
	);
}

export default LoadingSpinner;