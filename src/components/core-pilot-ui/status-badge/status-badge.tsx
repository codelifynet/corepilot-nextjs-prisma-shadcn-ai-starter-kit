import type React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

// Extend shadcn badge variants with status-specific variants
const statusBadgeVariants = cva("", {
	variants: {
		status: {
			active:
				"bg-emerald-50 text-emerald-700 !border-emerald-200 hover:bg-emerald-100 dark:bg-emerald-900/20 dark:text-emerald-300 dark:border-emerald-800 shadow-emerald-500/20",
			inactive:
				"bg-slate-50 text-slate-700 !border-slate-200 hover:bg-slate-100 dark:bg-slate-900/20 dark:text-slate-300 dark:border-slate-700 shadow-slate-500/20",
			blocked:
				"bg-red-50 text-red-700 !border-red-200 hover:bg-red-100 dark:bg-red-900/20 dark:text-red-300 dark:border-red-800 shadow-red-500/20 ",
			pending:
				"bg-amber-50 text-amber-700 !border-amber-200 hover:bg-amber-100 dark:bg-amber-900/20 dark:text-amber-300 dark:border-amber-800 shadow-amber-500/20",
			suspended:
				"bg-orange-50 text-orange-700 !border-orange-200 hover:bg-orange-100 dark:bg-orange-900/20 dark:text-orange-300 dark:border-orange-800 shadow-orange-500/20",
		},
		size: {
			sm: "px-2 py-0.5 text-xs",
			md: "px-2.5 py-1 text-xs",
			lg: "px-3 py-1.5 text-sm",
		},
		dotVariant: {
			true: "gap-1.5",
			false: "",
		},
	},
	defaultVariants: {
		size: "md",
		dotVariant: false,
	},
});

const statusDotVariants = cva("h-1.5 w-1.5 rounded-full", {
	variants: {
		status: {
			active: "bg-emerald-500",
			inactive: "bg-slate-400",
			blocked: "bg-red-500",
			pending: "bg-amber-500",
			suspended: "bg-orange-500",
		},
	},
});

export interface StatusBadgeProps
	extends Omit<React.ComponentProps<typeof Badge>, "variant">,
		VariantProps<typeof statusBadgeVariants> {
	status: "active" | "inactive" | "blocked" | "pending" | "suspended";
	showDot?: boolean;
	children?: React.ReactNode;
}

function StatusBadge({
	className,
	status,
	size,
	showDot = false,
	children,
	...props
}: StatusBadgeProps) {
	return (
		<Badge
			className={cn(
				statusBadgeVariants({
					status,
					size,
					dotVariant: showDot,
				}),
				className,
			)}
			{...props}
		>
			{showDot && <span className={statusDotVariants({ status })} />}
			{children}
		</Badge>
	);
}

export { StatusBadge, statusBadgeVariants };
