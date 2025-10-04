"use client";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import {
	ArrowLeft,
	Edit,
	Trash2,
	Save,
	X,
	Plus,
	Eye,
	Download,
	Upload,
	RefreshCw,
	Copy,
	Settings,
	MoreHorizontal,
	type LucideIcon,
} from "lucide-react";
import type React from "react";

// Action button types
export type ActionButtonType =
	| "back"
	| "edit"
	| "delete"
	| "save"
	| "cancel"
	| "add"
	| "view"
	| "download"
	| "upload"
	| "refresh"
	| "copy"
	| "settings"
	| "more";

// Icon mapping for each action type
const actionIcons: Record<ActionButtonType, LucideIcon> = {
	back: ArrowLeft,
	edit: Edit,
	delete: Trash2,
	save: Save,
	cancel: X,
	add: Plus,
	view: Eye,
	download: Download,
	upload: Upload,
	refresh: RefreshCw,
	copy: Copy,
	settings: Settings,
	more: MoreHorizontal,
};

// Default styling for each action type
const actionStyles: Record<ActionButtonType, string> = {
	back: "hover:bg-gray-50 dark:hover:bg-gray-800",
	edit: "hover:bg-blue-50 dark:hover:bg-blue-950 text-blue-600 dark:text-blue-400",
	delete:
		"text-red-600 hover:text-red-700 hover:bg-red-50 dark:hover:bg-red-950 dark:text-red-400 dark:hover:text-red-300",
	save: "bg-blue-600 text-white hover:bg-blue-700 dark:bg-blue-600 dark:hover:bg-blue-700",
	cancel: "hover:bg-gray-50 dark:hover:bg-gray-800",
	add: "bg-green-600 text-white hover:bg-green-700 dark:bg-green-600 dark:hover:bg-green-700",
	view: "hover:bg-gray-50 dark:hover:bg-gray-800",
	download:
		"hover:bg-emerald-50 dark:hover:bg-emerald-950 text-emerald-600 dark:text-emerald-400",
	upload:
		"hover:bg-indigo-50 dark:hover:bg-indigo-950 text-indigo-600 dark:text-indigo-400",
	refresh: "hover:bg-gray-50 dark:hover:bg-gray-800",
	copy: "hover:bg-purple-50 dark:hover:bg-purple-950 text-purple-600 dark:text-purple-400",
	settings: "hover:bg-gray-50 dark:hover:bg-gray-800",
	more: "hover:bg-gray-50 dark:hover:bg-gray-800",
};

// Default labels for each action type
const actionLabels: Record<ActionButtonType, string> = {
	back: "Back",
	edit: "Edit",
	delete: "Delete",
	save: "Save",
	cancel: "Cancel",
	add: "Add",
	view: "View",
	download: "Download",
	upload: "Upload",
	refresh: "Refresh",
	copy: "Copy",
	settings: "Settings",
	more: "More",
};

export interface ActionButtonProps {
	action: ActionButtonType;
	onClick?: () => void;
	disabled?: boolean;
	loading?: boolean;
	children?: React.ReactNode;
	className?: string;
	variant?: "default" | "outline" | "ghost" | "link";
	size?: "default" | "sm" | "lg" | "icon";
	hideIcon?: boolean;
	hideLabel?: boolean;
}

export function ActionButton({
	action,
	onClick,
	disabled = false,
	loading = false,
	children,
	className,
	variant = "outline",
	size = "default",
	hideIcon = false,
	hideLabel = false,
	...props
}: ActionButtonProps) {
	const Icon = actionIcons[action];
	const defaultLabel = actionLabels[action];
	const defaultStyles = actionStyles[action];

	// Override variant for specific actions
	const buttonVariant =
		action === "save" || action === "add" ? "default" : variant;

	return (
		<Button
			variant={buttonVariant}
			size={size}
			onClick={onClick}
			disabled={disabled || loading}
			className={cn(
				defaultStyles,
				loading && "cursor-not-allowed opacity-50",
				className,
			)}
			{...props}
		>
			{!hideIcon && (
				<Icon
					className={cn(
						"h-4 w-4",
						size === "sm" && "h-3 w-3",
						size === "lg" && "h-5 w-5",
						(!hideLabel && children) || (!hideLabel && defaultLabel)
							? "mr-2"
							: "",
					)}
				/>
			)}
			{!hideLabel && (children || defaultLabel)}
		</Button>
	);
}

export interface ActionButtonGroupProps {
	actions: Array<ActionButtonProps>;
	className?: string;
}

export function ActionButtonGroup({
	actions,
	className,
}: ActionButtonGroupProps) {
	return (
		<div className={cn("flex items-center gap-2", className)}>
			{actions.map((actionProps, index) => (
				<ActionButton key={index} {...actionProps} />
			))}
		</div>
	);
}

// Predefined common button groups
export const createDetailViewActions = (
	onBack?: () => void,
	onEdit?: () => void,
	onDelete?: () => void,
	options?: {
		backLabel?: string;
		editLabel?: string;
		deleteLabel?: string;
		deleteDisabled?: boolean;
		deleteLoading?: boolean;
	},
): ActionButtonProps[] => [
	{
		action: "back",
		onClick: onBack,
		children: options?.backLabel,
	},
	{
		action: "edit",
		onClick: onEdit,
		children: options?.editLabel,
	},
	{
		action: "delete",
		onClick: onDelete,
		disabled: options?.deleteDisabled,
		loading: options?.deleteLoading,
		children: options?.deleteLabel,
	},
];

export const createFormActions = (
	onSave?: () => void,
	onCancel?: () => void,
	options?: {
		saveLabel?: string;
		cancelLabel?: string;
		saveDisabled?: boolean;
		saveLoading?: boolean;
	},
): ActionButtonProps[] => [
	{
		action: "cancel",
		onClick: onCancel,
		children: options?.cancelLabel,
	},
	{
		action: "save",
		onClick: onSave,
		disabled: options?.saveDisabled,
		loading: options?.saveLoading,
		children: options?.saveLabel,
	},
];

export const createListActions = (
	onAdd?: () => void,
	onRefresh?: () => void,
	options?: {
		addLabel?: string;
		refreshLabel?: string;
		addDisabled?: boolean;
		refreshLoading?: boolean;
	},
): ActionButtonProps[] => [
	{
		action: "refresh",
		onClick: onRefresh,
		loading: options?.refreshLoading,
		children: options?.refreshLabel,
	},
	{
		action: "add",
		onClick: onAdd,
		disabled: options?.addDisabled,
		children: options?.addLabel,
	},
];
