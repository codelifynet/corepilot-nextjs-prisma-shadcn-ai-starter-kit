"use client";

import { cn } from "@/lib/utils";
import {
	Dialog,
	DialogContent,
	DialogHeader,
	DialogTitle,
	DialogFooter,
} from "@/components/ui/dialog";
import type {
	CorePilotDialogProps,
	CorePilotDialogHeaderProps,
	CorePilotDialogFooterProps
} from "./types";

const maxWidthClasses = {
	sm: "!max-w-sm",
	md: "!max-w-md",
	lg: "!max-w-lg",
	xl: "!max-w-xl",
	"2xl": "!max-w-2xl",
	"3xl": "!max-w-3xl",
	"4xl": "!max-w-4xl",
	"5xl": "!max-w-5xl",
	"6xl": "!max-w-6xl",
	"7xl": "!max-w-7xl",
};

export function CorePilotDialog({
	open,
	onOpenChange,
	title,
	children,
	footerActions,
	className,
	maxWidth = "lg",
}: CorePilotDialogProps) {
	return (
		<Dialog open={open} onOpenChange={onOpenChange}>
			<DialogContent
				className={cn(
					"flex flex-col max-h-[90vh] !p-0 gap-0 bg-background border shadow-lg",
					maxWidthClasses[maxWidth],
					className,
				)}
			>
				<CorePilotDialogHeader title={title} />

				<div className="flex-1 overflow-y-auto p-6 min-h-0">
					{children}
				</div>

				{footerActions && (
					<CorePilotDialogFooter>
						{footerActions}
					</CorePilotDialogFooter>
				)}
			</DialogContent>
		</Dialog>
	);
}

export function CorePilotDialogHeader({ title, className }: CorePilotDialogHeaderProps) {
	return (
		<DialogHeader className={cn("px-6 py-4 bg-gray-200/70 dark:bg-gray-900 border-b border-border", className)}>
			<DialogTitle className="text-lg font-semibold">{title}</DialogTitle>
		</DialogHeader>
	);
}

export function CorePilotDialogFooter({ children, className }: CorePilotDialogFooterProps) {
	return (
		<DialogFooter className={cn("px-6 py-4 mt-0 bg-gray-200/70 dark:bg-gray-900 border-t border-border justify-end", className)}>
			{children}
		</DialogFooter>
	);
}
