"use client";

import * as React from "react";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
	MoreHorizontal,
	Eye,
	Edit,
	Trash2,
	Copy,
	Download,
	Play,
	Pause,
	type LucideIcon,
} from "lucide-react";
import { cn } from "@/lib/utils";

export interface ActionItem {
	label: string;
	icon: LucideIcon;
	onClick: () => void;
	variant?: "default" | "destructive" | "warning" | "success";
	badge?: string | number;
	disabled?: boolean;
	separator?: boolean; // Add separator before this item
}

interface ActionDropdownProps {
	actions: ActionItem[];
	trigger?: React.ReactNode;
	align?: "start" | "center" | "end";
	className?: string;
	size?: "sm" | "default" | "lg";
	disabled?: boolean;
}

const variantStyles = {
	default: "text-foreground hover:bg-accent",
	destructive:
		"text-red-600 hover:bg-red-50 focus:bg-red-50 dark:hover:bg-red-950 dark:focus:bg-red-950",
	warning:
		"text-amber-600 hover:bg-amber-50 focus:bg-amber-50 dark:hover:bg-amber-950 dark:focus:bg-amber-950",
	success:
		"text-green-600 hover:bg-green-50 focus:bg-green-50 dark:hover:bg-green-950 dark:focus:bg-green-950",
};

const badgeVariants = {
	default: "bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-300",
	destructive: "bg-red-100 text-red-700 dark:bg-red-900 dark:text-red-300",
	warning: "bg-amber-100 text-amber-700 dark:bg-amber-900 dark:text-amber-300",
	success: "bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-300",
};

export function ActionDropdown({
	actions,
	trigger,
	align = "end",
	className,
	size = "default",
	disabled = false,
}: ActionDropdownProps) {
	const defaultTrigger = (
		<Button
			variant="ghost"
			size={size === "sm" ? "sm" : size === "lg" ? "lg" : "sm"}
			className={cn(
				"h-8 w-8 p-0 data-[state=open]:bg-muted",
				size === "lg" && "h-10 w-10",
				className,
			)}
			disabled={disabled}
		>
			<span className="sr-only">Open actions menu</span>
			<MoreHorizontal className={cn("h-4 w-4", size === "lg" && "h-5 w-5")} />
		</Button>
	);

	if (actions.length === 0) {
		return null;
	}

	return (
		<DropdownMenu>
			<DropdownMenuTrigger asChild>
				{trigger || defaultTrigger}
			</DropdownMenuTrigger>
			<DropdownMenuContent
				align={align}
				className="w-56 animate-in fade-in-0 zoom-in-95"
				side="bottom"
				sideOffset={4}
			>
				{actions.map((action, index) => (
					<React.Fragment key={`${action.label}-${index}`}>
						{action.separator && index > 0 && <DropdownMenuSeparator />}
						<DropdownMenuItem
							onClick={action.onClick}
							disabled={action.disabled}
							className={cn(
								"flex items-center justify-between gap-3 px-3 py-2.5 cursor-pointer transition-colors",
								variantStyles[action.variant || "default"],
								action.disabled && "opacity-50 cursor-not-allowed",
							)}
						>
							<div className="flex items-center gap-3">
								<action.icon className="h-4 w-4 flex-shrink-0" />
								<span className="font-medium text-sm">{action.label}</span>
							</div>
							{action.badge && (
								<Badge
									variant="secondary"
									className={cn(
										"text-xs px-2 py-0.5 font-medium border-0",
										badgeVariants[action.variant || "default"],
									)}
								>
									{action.badge}
								</Badge>
							)}
						</DropdownMenuItem>
					</React.Fragment>
				))}
			</DropdownMenuContent>
		</DropdownMenu>
	);
}

// Pre-configured action builders for common use cases

export const createViewAction = (onClick: () => void): ActionItem => ({
	label: "View Details",
	icon: Eye,
	onClick,
	variant: "default",
});

export const createEditAction = (onClick: () => void): ActionItem => ({
	label: "Edit",
	icon: Edit,
	onClick,
	variant: "default",
});

export const createDeleteAction = (onClick: () => void): ActionItem => ({
	label: "Delete",
	icon: Trash2,
	onClick,
	variant: "destructive",
	separator: true,
});

export const createCopyAction = (onClick: () => void): ActionItem => ({
	label: "Copy",
	icon: Copy,
	onClick,
	variant: "default",
});

export const createDownloadAction = (onClick: () => void): ActionItem => ({
	label: "Download",
	icon: Download,
	onClick,
	variant: "default",
});

export const createActivateAction = (onClick: () => void): ActionItem => ({
	label: "Activate",
	icon: Play,
	onClick,
	variant: "success",
});

export const createDeactivateAction = (onClick: () => void): ActionItem => ({
	label: "Deactivate",
	icon: Pause,
	onClick,
	variant: "warning",
});
