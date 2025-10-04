"use client";

import * as React from "react";
import * as TabsPrimitive from "@radix-ui/react-tabs";
import { cn } from "@/lib/utils";
import { cva, type VariantProps } from "class-variance-authority";

// Modern tabs variants with beautiful animations and gradients
const modernTabsListVariants = cva(
	"inline-flex items-center justify-start w-full relative overflow-hidden",
	{
		variants: {
			variant: {
				// Sliding pill style with smooth animations
				pill: [
					"bg-slate-100 dark:bg-slate-800/50 backdrop-blur-sm",
					"rounded-xl p-1.5 gap-1",
					"border border-slate-200/50 dark:border-slate-700/50",
					"shadow-sm",
				],
				// Modern underline with gradient effect
				gradient: [
					"bg-transparent rounded-none p-0 gap-0",
					"border-b border-slate-200 dark:border-slate-800",
					"relative",
				],
				// Segmented control style
				segmented: [
					"bg-white dark:bg-slate-900",
					"rounded-2xl p-2 gap-2",
					"border border-slate-200 dark:border-slate-700",
					"shadow-lg shadow-slate-200/50 dark:shadow-slate-900/50",
				],
				// Floating cards style
				floating: ["bg-transparent rounded-none p-0 gap-3", "relative"],
			},
		},
		defaultVariants: {
			variant: "pill",
		},
	},
);

const modernTabsTriggerVariants = cva(
	[
		"inline-flex items-center justify-center whitespace-nowrap",
		"font-medium text-sm",
		"transition-all duration-300 ease-in-out",
		"focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
		"disabled:pointer-events-none disabled:opacity-50",
		"relative overflow-hidden",
		"px-4 py-2.5 gap-2 min-w-[100px]",
		"group",
	],
	{
		variants: {
			variant: {
				pill: [
					"text-slate-600 hover:text-slate-900 dark:text-slate-400 dark:hover:text-slate-100",
					"rounded-lg",
					"data-[state=active]:bg-white dark:data-[state=active]:bg-slate-700",
					"data-[state=active]:text-slate-900 dark:data-[state=active]:text-slate-100",
					"data-[state=active]:shadow-md data-[state=active]:shadow-slate-200/50 dark:data-[state=active]:shadow-slate-900/50",
					"data-[state=active]:border data-[state=active]:border-slate-200/50 dark:data-[state=active]:border-slate-600/50",
					"hover:bg-slate-50 dark:hover:bg-slate-700/50",
					"transform data-[state=active]:scale-[1.02]",
				],
				gradient: [
					"text-slate-500 hover:text-slate-700 dark:text-slate-400 dark:hover:text-slate-200",
					"rounded-none px-6 py-4",
					"data-[state=active]:text-blue-600 dark:data-[state=active]:text-blue-400",
					"data-[state=active]:font-semibold",
					"relative",
					"after:absolute after:bottom-0 after:left-0 after:h-0.5 after:w-0",
					"after:bg-gradient-to-r after:from-blue-500 after:to-purple-600",
					"after:transition-all after:duration-300 after:ease-out",
					"data-[state=active]:after:w-full",
					"before:absolute before:bottom-0 before:left-0 before:w-full before:h-0.5",
					"before:bg-gradient-to-r before:from-blue-500/20 before:to-purple-600/20",
					"before:scale-x-0 before:transition-transform before:duration-300",
					"hover:before:scale-x-100",
				],
				segmented: [
					"text-slate-600 hover:text-slate-800 dark:text-slate-400 dark:hover:text-slate-200",
					"rounded-xl",
					"data-[state=active]:bg-blue-500 dark:data-[state=active]:bg-blue-600",
					"data-[state=active]:text-white",
					"data-[state=active]:shadow-lg data-[state=active]:shadow-blue-200/50 dark:data-[state=active]:shadow-blue-900/50",
					"hover:bg-slate-100 dark:hover:bg-slate-800",
					"transform data-[state=active]:scale-105",
				],
				floating: [
					"text-slate-600 hover:text-slate-800 dark:text-slate-400 dark:hover:text-slate-200",
					"rounded-xl",
					"bg-white dark:bg-slate-900",
					"border border-slate-200 dark:border-slate-700",
					"shadow-sm hover:shadow-md",
					"data-[state=active]:bg-gradient-to-br data-[state=active]:from-blue-50 data-[state=active]:to-indigo-50",
					"dark:data-[state=active]:from-blue-900/20 dark:data-[state=active]:to-indigo-900/20",
					"data-[state=active]:border-blue-200 dark:data-[state=active]:border-blue-700/50",
					"data-[state=active]:text-blue-700 dark:data-[state=active]:text-blue-300",
					"data-[state=active]:shadow-lg data-[state=active]:shadow-blue-200/25 dark:data-[state=active]:shadow-blue-900/25",
					"transform hover:scale-105 data-[state=active]:scale-110",
					"backdrop-blur-sm",
				],
			},
		},
		defaultVariants: {
			variant: "pill",
		},
	},
);

// Enhanced interfaces
interface ModernTabData {
	label: string;
	value: string;
	content: React.ReactNode;
	icon?: React.ReactNode;
	badge?: string | number;
	disabled?: boolean;
	tooltip?: string;
}

interface ModernTabsProps
	extends React.ComponentPropsWithoutRef<typeof TabsPrimitive.Root> {
	variant?: VariantProps<typeof modernTabsListVariants>["variant"];
	tabs: ModernTabData[];
	onValueChange?: (value: string) => void;
	className?: string;
	animated?: boolean;
}

const ModernTabs = React.forwardRef<
	React.ElementRef<typeof TabsPrimitive.Root>,
	ModernTabsProps
>(
	(
		{
			className,
			variant = "pill",
			tabs,
			onValueChange,
			animated = true,
			...props
		},
		ref,
	) => {
		const [activeValue, setActiveValue] = React.useState(
			props.defaultValue || tabs[0]?.value,
		);

		const handleValueChange = (value: string) => {
			setActiveValue(value);
			onValueChange?.(value);
		};

		return (
			<TabsPrimitive.Root
				ref={ref}
				className={cn("w-full", className)}
				onValueChange={handleValueChange}
				{...props}
			>
				{/* Modern Tabs List */}
				<TabsPrimitive.List
					className={cn(
						modernTabsListVariants({ variant }),
						"scroll-smooth overflow-x-auto scrollbar-hide",
					)}
				>
					{tabs.map((tab) => (
						<TabsPrimitive.Trigger
							key={tab.value}
							value={tab.value}
							disabled={tab.disabled}
							className={cn(
								modernTabsTriggerVariants({ variant }),
								tab.disabled && "cursor-not-allowed opacity-50",
							)}
							title={tab.tooltip}
						>
							{/* Icon */}
							{tab.icon && (
								<span className="flex items-center justify-center shrink-0 transition-transform duration-300 group-hover:scale-110">
									{tab.icon}
								</span>
							)}

							{/* Label */}
							<span className="relative z-10 truncate font-medium">
								{tab.label}
							</span>

							{/* Badge */}
							{tab.badge && (
								<span
									className={cn(
										"inline-flex items-center justify-center",
										"min-w-[18px] h-[18px] px-1.5 py-0.5",
										"text-xs font-bold rounded-full",
										"transition-all duration-300",
										variant === "pill" &&
											"bg-slate-200 text-slate-700 dark:bg-slate-600 dark:text-slate-200 data-[state=active]:bg-blue-100 data-[state=active]:text-blue-700",
										variant === "gradient" &&
											"bg-blue-100 text-blue-700 dark:bg-blue-900/50 dark:text-blue-300",
										variant === "segmented" &&
											"bg-slate-200 text-slate-700 dark:bg-slate-700 dark:text-slate-200 data-[state=active]:bg-blue-100 data-[state=active]:text-blue-700",
										variant === "floating" &&
											"bg-slate-100 text-slate-600 dark:bg-slate-800 dark:text-slate-300 data-[state=active]:bg-blue-100 data-[state=active]:text-blue-700",
									)}
								>
									{tab.badge}
								</span>
							)}

							{/* Active indicator (for some variants) */}
							{variant === "pill" && activeValue === tab.value && (
								<span className="absolute inset-0 bg-gradient-to-r from-blue-500/5 to-purple-600/5 rounded-lg" />
							)}
						</TabsPrimitive.Trigger>
					))}
				</TabsPrimitive.List>

				{/* Modern Tabs Content */}
				{tabs.map((tab) => (
					<TabsPrimitive.Content
						key={tab.value}
						value={tab.value}
						className={cn(
							"mt-4 ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
							animated &&
								"data-[state=active]:animate-in data-[state=active]:fade-in-50 data-[state=active]:slide-in-from-bottom-2 duration-300",
							"data-[state=inactive]:hidden",
						)}
					>
						<div
							className={cn(
								"rounded-xl p-6",
								"bg-white dark:bg-slate-900/50",
								"border border-slate-200/50 dark:border-slate-700/50",
								"shadow-sm backdrop-blur-sm",
								animated && "transition-all duration-300 ease-in-out",
							)}
						>
							{tab.content}
						</div>
					</TabsPrimitive.Content>
				))}
			</TabsPrimitive.Root>
		);
	},
);

ModernTabs.displayName = "ModernTabs";

export { ModernTabs, modernTabsListVariants, modernTabsTriggerVariants };
export type { ModernTabData, ModernTabsProps };
