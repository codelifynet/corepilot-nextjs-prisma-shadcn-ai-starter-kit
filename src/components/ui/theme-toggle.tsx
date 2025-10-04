"use client";

import * as React from "react";
import { Icon } from "@iconify/react";
import { useTheme } from "next-themes";

import { Button } from "@/components/ui/button";

export function ThemeToggle() {
	const { setTheme, resolvedTheme } = useTheme();
	const [mounted, setMounted] = React.useState(false);

	// useEffect only runs on the client, so now we can safely show the UI
	React.useEffect(() => {
		setMounted(true);
	}, []);

	if (!mounted) {
		return (
			<Button variant="ghost" size="icon" disabled>
				<Icon icon="lucide:sun" className="h-[1.2rem] w-[1.2rem]" />
			</Button>
		);
	}

	const isDark = resolvedTheme === "dark";

	return (
		<Button
			variant="ghost"
			size="icon"
			onClick={() => setTheme(isDark ? "light" : "dark")}
			className="hover:bg-zinc-100 dark:hover:bg-zinc-800"
		>
			<Icon
				icon="lucide:sun"
				className={`h-[1.2rem] w-[1.2rem] transition-all ${isDark ? "rotate-90 scale-0" : "rotate-0 scale-100"}`}
			/>
			<Icon
				icon="lucide:moon"
				className={`absolute h-[1.2rem] w-[1.2rem] transition-all ${isDark ? "rotate-0 scale-100" : "-rotate-90 scale-0"}`}
			/>
			<span className="sr-only">Tema değiştir</span>
		</Button>
	);
}
