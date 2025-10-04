"use client";

import type React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { Badge as ShadcnBadge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

// Badge variants - background colors vary, text is white
const badgeVariants = cva("text-white font-medium shadow-sm", {
	variants: {
		variant: {
			// AI Provider Colors
			openai: "bg-emerald-600 hover:bg-emerald-700 border-emerald-600",
			anthropic: "bg-orange-600 hover:bg-orange-700 border-orange-600", 
			google: "bg-blue-600 hover:bg-blue-700 border-blue-600",
			meta: "bg-indigo-600 hover:bg-indigo-700 border-indigo-600",
			mistral: "bg-purple-600 hover:bg-purple-700 border-purple-600",
			
			// Status Colors
			active: "bg-green-600 hover:bg-green-700 border-green-600",
			inactive: "bg-gray-600 hover:bg-gray-700 border-gray-600",
			pending: "bg-yellow-600 hover:bg-yellow-700 border-yellow-600",
			error: "bg-red-600 hover:bg-red-700 border-red-600",
			
			// Category Colors
			premium: "bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 border-purple-600",
			free: "bg-teal-600 hover:bg-teal-700 border-teal-600",
			beta: "bg-cyan-600 hover:bg-cyan-700 border-cyan-600",
			
			// Feature Colors
			featured: "bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 border-blue-600",
			new: "bg-rose-600 hover:bg-rose-700 border-rose-600",
			popular: "bg-amber-600 hover:bg-amber-700 border-amber-600",
			
			// Neutral Colors
			default: "bg-slate-600 hover:bg-slate-700 border-slate-600",
			dark: "bg-gray-800 hover:bg-gray-900 border-gray-800",
			light: "bg-gray-500 hover:bg-gray-600 border-gray-500",

			outline: "border-transparent bg-transparent !text-black dark:!text-white hover:bg-accent hover:text-accent-foreground",


		},
		size: {
			sm: "px-2 py-0.5 text-xs",
			md: "px-2.5 py-1 text-xs",
			lg: "px-3 py-1.5 text-sm",
			xl: "px-4 py-2 text-base",
			"2xl": "px-5 py-2.5 text-lg",
			"3xl": "px-6 py-3 text-xl",
			"4xl": "px-7 py-3.5 text-2xl",
			"5xl": "px-8 py-4 text-3xl",	
		},
		rounded: {
			none: "rounded-none",
			sm: "rounded-sm", 
			md: "rounded-md",
			lg: "rounded-lg",
			full: "rounded-full",
		},
	},
	defaultVariants: {
		variant: "default",
		size: "md",
		rounded: "md",
	},
});

export interface BadgeProps
	extends Omit<React.ComponentProps<typeof ShadcnBadge>, "variant">,
		VariantProps<typeof badgeVariants> {
	variant?: 
		| "openai" 
		| "anthropic" 
		| "google" 
		| "meta" 
		| "mistral"
		| "active" 
		| "inactive" 
		| "pending" 
		| "error"
		| "premium" 
		| "free" 
		| "beta"
		| "featured" 
		| "new" 
		| "popular"
		| "default" 
		| "dark" 
		| "light"
		| "outline";
	children?: React.ReactNode;
	icon?: React.ReactNode;
	iconPosition?: "left" | "right";
}

function Badge({
	className,
	variant = "default",
	size = "md",
	rounded = "md",
	children,
	icon,
	iconPosition = "left",
	...props
}: BadgeProps) {
	return (
		<ShadcnBadge
			className={cn(
				badgeVariants({
					variant,
					size,
					rounded,
				}),
				"inline-flex items-center gap-1.5 transition-all duration-200",
				className,
			)}
			{...props}
		>
			{icon && iconPosition === "left" && (
				<span className="flex items-center justify-center">
					{icon}
				</span>
			)}
			{children}
			{icon && iconPosition === "right" && (
				<span className="flex items-center justify-center">
					{icon}
				</span>
			)}
		</ShadcnBadge>
	);
}

// Helper function for predefined provider badge's
export const getProviderBadgeVariant = (provider: string): VariantProps<typeof badgeVariants>["variant"] => {
	const providerLower = provider.toLowerCase();
	
	if (providerLower.includes("openai") || providerLower.includes("gpt")) {
		return "openai";
	}
	if (providerLower.includes("anthropic") || providerLower.includes("claude")) {
		return "anthropic";
	}
	if (providerLower.includes("google") || providerLower.includes("gemini")) {
		return "google";
	}
	if (providerLower.includes("meta") || providerLower.includes("llama")) {
		return "meta";
	}
	if (providerLower.includes("mistral")) {
		return "mistral";
	}
	
	return "default";
};

export { 	Badge, badgeVariants };
