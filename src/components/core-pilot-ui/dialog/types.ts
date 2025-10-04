import type { ReactNode } from "react";

export interface CorePilotDialogProps {
	open: boolean;
	onOpenChange: (open: boolean) => void;
	title: string;
	children: ReactNode;
	footerActions?: ReactNode;
	className?: string;
	showCloseButton?: boolean;
	maxWidth?: "sm" | "md" | "lg" | "xl" | "2xl" | "3xl" | "4xl" | "5xl" | "6xl" | "7xl";
}

export interface CorePilotDialogHeaderProps {
	title: string;
	className?: string;
}

export interface CorePilotDialogFooterProps {
	children: ReactNode;
	className?: string;
}