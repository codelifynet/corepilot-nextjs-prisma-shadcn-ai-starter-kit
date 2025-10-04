"use client";

import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { Icon } from "@iconify/react";
import { cn } from "@/lib/utils";

export function ThemeToggle() {
	const { setTheme, resolvedTheme } = useTheme();
	const [mounted, setMounted] = useState(false);

	// Hydration mismatch'i önlemek için
	useEffect(() => {
		setMounted(true);
	}, []);

	const handleToggle = () => {
		setTheme(resolvedTheme === "dark" ? "light" : "dark");
	};

	const handleKeyDown = (event: React.KeyboardEvent) => {
		if (event.key === "Enter" || event.key === " ") {
			event.preventDefault();
			handleToggle();
		}
	};

	// Hydration tamamlanana kadar loading state göster
	if (!mounted) {
		return <div className="w-12 h-6 bg-gray-200 rounded-full animate-pulse" />;
	}

	const isDark = resolvedTheme === "dark";

	return (
		<button
			type="button"
			onClick={handleToggle}
			onKeyDown={handleKeyDown}
			tabIndex={0}
			aria-label={`Switch to ${isDark ? "light" : "dark"} mode`}
			className={cn(
				"group relative inline-flex h-6 w-12 items-center rounded-full transition-all duration-500 ease-in-out focus:outline-none  focus:ring-offset-white dark:focus:ring-offset-gray-900 hover:scale-105",
				isDark
					? "bg-slate-700 shadow-inner"
					: "bg-gray-200 hover:bg-gray-300 shadow-sm",
			)}
		>
			{/* Toggle circle */}
			<span
				className={cn(
					" h-5 w-5 transform rounded-full shadow-lg transition-all duration-500 ease-in-out flex items-center justify-center group-hover:scale-110",
					isDark
						? "translate-x-7 bg-slate-900 ring-2 ring-blue-900 "
						: "translate-x-0.5 bg-white ring-2 ring-yellow-400",
				)}
			>
				{/* Icon with rotation animation */}
				<Icon
					icon={isDark ? "tabler:moon-filled" : "tabler:sun-filled"}
					className={cn(
						"h-3 w-3 transition-all duration-500 ease-in-out",
						isDark
							? "text-slate-300 rotate-0 group-hover:rotate-360"
							: "text-yellow-500 rotate-0 group-hover:rotate-180",
					)}
				/>
			</span>
		</button>
	);
}
