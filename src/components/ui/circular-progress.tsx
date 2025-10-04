import { cn } from "@/lib/utils";

interface CircularProgressProps {
	value: number;
	size?: number;
	strokeWidth?: number;
	className?: string;
	children?: React.ReactNode;
}

export function CircularProgress({
	value,
	size = 120,
	strokeWidth = 8,
	className,
	children,
}: CircularProgressProps) {
	const radius = (size - strokeWidth) / 2;
	const circumference = radius * 2 * Math.PI;
	const strokeDasharray = circumference;
	const strokeDashoffset = circumference - (value / 100) * circumference;

	return (
		<div
			className={cn(
				"relative inline-flex items-center justify-center",
				className,
			)}
		>
			<svg
				width={size}
				height={size}
				className="transform -rotate-90"
				aria-label={`Progress: ${value}%`}
			>
				<title>Circular Progress Bar</title>
				{/* Background circle */}
				<circle
					cx={size / 2}
					cy={size / 2}
					r={radius}
					stroke="currentColor"
					strokeWidth={strokeWidth}
					fill="none"
					className="text-gray-200 dark:text-gray-700"
				/>
				{/* Progress circle */}
				<circle
					cx={size / 2}
					cy={size / 2}
					r={radius}
					stroke="currentColor"
					strokeWidth={strokeWidth}
					fill="none"
					strokeDasharray={strokeDasharray}
					strokeDashoffset={strokeDashoffset}
					className="text-red-500 transition-all duration-500 ease-in-out"
					strokeLinecap="round"
				/>
			</svg>
			{/* Content */}
			<div className="absolute inset-0 flex items-center justify-center">
				{children}
			</div>
		</div>
	);
}
