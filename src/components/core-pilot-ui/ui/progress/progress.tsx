"use client";

import type React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { Progress as BaseProgress } from "@/components/ui/progress";
import { cn } from "@/lib/utils";

// Enhanced progress variants
const progressVariants = cva(
	"relative h-2 w-full overflow-hidden rounded-full transition-all duration-300",
	{
		variants: {
			variant: {
				default: "bg-secondary",
				success: "bg-green-100 dark:bg-green-900/20",
				warning: "bg-yellow-100 dark:bg-yellow-900/20",
				error: "bg-red-100 dark:bg-red-900/20",
				info: "bg-blue-100 dark:bg-blue-900/20",
				gradient: "bg-gradient-to-r from-blue-100 to-purple-100 dark:from-blue-900/20 dark:to-purple-900/20",
			},
			size: {
				sm: "h-1",
				default: "h-2",
				lg: "h-3",
				xl: "h-4",
				"2xl": "h-5",
				"3xl": "h-6",
			},
			rounded: {
				none: "rounded-none",
				sm: "rounded-sm",
				default: "rounded-full",
				lg: "rounded-lg",
			},
		},
		defaultVariants: {
			variant: "default",
			size: "default",
			rounded: "default",
		},
	}
);

// Enhanced progress indicator variants
const progressIndicatorVariants = cva(
	"h-full w-full flex-1 transition-all duration-500 ease-out",
	{
		variants: {
			variant: {
				default: "bg-primary",
				success: "bg-green-600",
				warning: "bg-yellow-500",
				error: "bg-red-600",
				info: "bg-blue-600",
				gradient: "bg-gradient-to-r from-blue-600 to-purple-600",
			},
			animated: {
				true: "bg-[length:20px_20px] animate-pulse",
				false: "",
			},
			striped: {
				true: "bg-[linear-gradient(45deg,rgba(255,255,255,.15)_25%,transparent_25%,transparent_50%,rgba(255,255,255,.15)_50%,rgba(255,255,255,.15)_75%,transparent_75%,transparent)] bg-[length:20px_20px]",
				false: "",
			},
		},
		defaultVariants: {
			variant: "default",
			animated: false,
			striped: false,
		},
	}
);

export interface ProgressProps
	extends Omit<React.ComponentProps<typeof BaseProgress>, "className">,
		VariantProps<typeof progressVariants> {
	value?: number;
	max?: number;
	showValue?: boolean;
	valuePosition?: "inside" | "outside" | "top" | "bottom";
	label?: string;
	description?: string;
	className?: string;
	indicatorClassName?: string;
	animated?: boolean;
	striped?: boolean;
	pulse?: boolean;
	indeterminate?: boolean;
}

function Progress({
	value = 0,
	max = 100,
	showValue = false,
	valuePosition = "outside",
	label,
	description,
	className,
	indicatorClassName,
	variant = "default",
	size = "default",
	rounded = "default",
	animated = false,
	striped = false,
	pulse = false,
	indeterminate = false,
	...props
}: ProgressProps) {
	const percentage = Math.min(Math.max((value / max) * 100, 0), 100);
	const displayValue = `${Math.round(percentage)}%`;

	const getValueColor = () => {
		switch (variant) {
			case "success":
				return "text-green-600 dark:text-green-400";
			case "warning":
				return "text-yellow-600 dark:text-yellow-400";
			case "error":
				return "text-red-600 dark:text-red-400";
			case "info":
				return "text-blue-600 dark:text-blue-400";
			case "gradient":
				return "text-purple-600 dark:text-purple-400";
			default:
				return "text-primary";
		}
	};

	const renderValue = () => {
		if (!showValue) return null;

		const valueElement = (
			<span className={cn("text-sm font-medium tabular-nums", getValueColor())}>
				{displayValue}
			</span>
		);

		switch (valuePosition) {
			case "inside":
				return (
					<div className="absolute inset-0 flex items-center justify-center">
						{valueElement}
					</div>
				);
			case "top":
				return <div className="mb-2 flex justify-end">{valueElement}</div>;
			case "bottom":
				return <div className="mt-2 flex justify-end">{valueElement}</div>;
			case "outside":
			default:
				return null;
		}
	};

	const renderTopContent = () => (
		<>
			{(label || (showValue && valuePosition === "top")) && (
				<div className="mb-2 flex items-center justify-between">
					{label && (
						<span className="text-sm font-medium text-foreground">{label}</span>
					)}
					{showValue && valuePosition === "top" && renderValue()}
				</div>
			)}
		</>
	);

	const renderBottomContent = () => (
		<>
			{(description || (showValue && valuePosition === "bottom")) && (
				<div className="mt-2 flex items-center justify-between">
					{description && (
						<span className="text-xs text-muted-foreground">{description}</span>
					)}
					{showValue && valuePosition === "bottom" && renderValue()}
				</div>
			)}
		</>
	);

	return (
		<div className="w-full">
			{renderTopContent()}
			
			<div className="relative">
				<BaseProgress
					value={indeterminate ? undefined : percentage}
					className={cn(
						progressVariants({ variant, size, rounded }),
						pulse && "animate-pulse",
						className
					)}
					{...props}
				>
					<div
						className={cn(
							progressIndicatorVariants({ 
								variant, 
								animated: animated || indeterminate, 
								striped 
							}),
							indeterminate && "bg-[length:40px_40px] animate-bounce",
							indicatorClassName
						)}
						style={{
							transform: indeterminate 
								? "translateX(-100%)" 
								: `translateX(-${100 - percentage}%)`
						}}
					/>
				</BaseProgress>
				
				{showValue && valuePosition === "inside" && renderValue()}
				
				{showValue && valuePosition === "outside" && (
					<div className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-full pl-2">
						<span className={cn("text-sm font-medium tabular-nums", getValueColor())}>
							{displayValue}
						</span>
					</div>
				)}
			</div>
			
			{renderBottomContent()}
		</div>
	);
}

// Specialized progress components
function CircularProgress({
	value = 0,
	max = 100,
	size = 120,
	strokeWidth = 8,
	showValue = true,
	variant = "default",
	className,
	children,
	...props
}: {
	value?: number;
	max?: number;
	size?: number;
	strokeWidth?: number;
	showValue?: boolean;
	variant?: ProgressProps["variant"];
	className?: string;
	children?: React.ReactNode;
} & Omit<React.SVGProps<SVGSVGElement>, "size">) {
	const percentage = Math.min(Math.max((value / max) * 100, 0), 100);
	const radius = (size - strokeWidth) / 2;
	const circumference = 2 * Math.PI * radius;
	const strokeDasharray = circumference;
	const strokeDashoffset = circumference - (percentage / 100) * circumference;

	const getStrokeColor = () => {
		switch (variant) {
			case "success":
				return "stroke-green-600";
			case "warning":
				return "stroke-yellow-500";
			case "error":
				return "stroke-red-600";
			case "info":
				return "stroke-blue-600";
			case "gradient":
				return "stroke-purple-600";
			default:
				return "stroke-primary";
		}
	};

	return (
		<div className={cn("relative inline-flex items-center justify-center", className)}>
			<svg
				width={size}
				height={size}
				className="transform -rotate-90"
				{...props}
			>
				<title>Circular Progress {Math.round(percentage)}%</title>
				{/* Background circle */}
				<circle
					cx={size / 2}
					cy={size / 2}
					r={radius}
					strokeWidth={strokeWidth}
					className="fill-none stroke-muted"
				/>
				{/* Progress circle */}
				<circle
					cx={size / 2}
					cy={size / 2}
					r={radius}
					strokeWidth={strokeWidth}
					strokeLinecap="round"
					className={cn("fill-none transition-all duration-500 ease-out", getStrokeColor())}
					style={{
						strokeDasharray,
						strokeDashoffset,
					}}
				/>
			</svg>
			{/* Content */}
			<div className="absolute inset-0 flex items-center justify-center">
				{children || (showValue && (
					<span className={cn("text-lg font-semibold", getStrokeColor().replace("stroke-", "text-"))}>
						{Math.round(percentage)}%
					</span>
				))}
			</div>
		</div>
	);
}

export {
	Progress,
	CircularProgress,
	progressVariants,
	progressIndicatorVariants,
};
