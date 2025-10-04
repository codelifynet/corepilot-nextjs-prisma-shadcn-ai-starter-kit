"use client";

import React from "react";
import { cn } from "@/lib/utils";

interface StarBorderButtonProps
	extends React.ButtonHTMLAttributes<HTMLButtonElement> {
	children: React.ReactNode;
	className?: string;
	as?: React.ElementType;
	href?: string;
}

export const StarBorderButton = React.forwardRef<
	HTMLButtonElement,
	StarBorderButtonProps
>(({ children, className, as: Component = "button", href, ...props }, ref) => {
	const Comp = href ? "a" : Component;

	return (
		<Comp
			ref={ref}
			href={href}
			className={cn(
				"group relative inline-flex h-12 overflow-hidden rounded-xl p-[1px] focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2 focus:ring-offset-slate-50",
				className,
			)}
			{...props}
		>
			<span className="absolute inset-[-1000%] animate-[spin_2s_linear_infinite] bg-[conic-gradient(from_90deg_at_50%_50%,#E2CBFF_0%,#393BB2_50%,#E2CBFF_100%)]" />
			<span className="inline-flex h-full w-full cursor-pointer items-center justify-center rounded-xl bg-slate-950 px-6 py-1 text-sm font-medium text-white backdrop-blur-3xl transition-all duration-200 group-hover:bg-slate-900">
				{children}
			</span>
		</Comp>
	);
});

StarBorderButton.displayName = "StarBorderButton";
