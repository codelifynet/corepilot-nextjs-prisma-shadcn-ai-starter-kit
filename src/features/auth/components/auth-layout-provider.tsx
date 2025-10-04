"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ThemeToggle } from "@/components/ui/theme-toggle";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Logo } from "@/components/core-pilot-ui/logo";

interface AuthLayoutProviderProps {
	children: React.ReactNode;
}

const backgroundPatterns = [
	"M60 60h40v40H60V60zm20 20h20v20H80V80z",
	"M20 20h60v60H20V20zm40 40h20v20H60V60z",
	"M40 20h20v60H40V20zm20 20h20v20H60V40z",
];

export function AuthLayoutProvider({ children }: AuthLayoutProviderProps) {
	const [currentPattern, setCurrentPattern] = useState(0);
	const [mounted, setMounted] = useState(false);

	useEffect(() => {
		setMounted(true);
		const interval = setInterval(() => {
			setCurrentPattern((prev) => (prev + 1) % backgroundPatterns.length);
		}, 5000);

		return () => clearInterval(interval);
	}, []);

	if (!mounted) {
		return (
			<div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50" />
		);
	}

	return (
		<div className="min-h-screen relative overflow-hidden bg-gradient-to-br from-slate-50 via-white to-blue-50/30 dark:from-gray-900 dark:via-gray-900 dark:to-gray-800">
			{/* Animated Background Pattern */}
			<div className="absolute inset-0 opacity-[0.03] dark:opacity-[0.05]">
				<AnimatePresence mode="wait">
					<motion.div
						key={currentPattern}
						initial={{ opacity: 0, scale: 1.1 }}
						animate={{ opacity: 1, scale: 1 }}
						exit={{ opacity: 0, scale: 0.9 }}
						transition={{ duration: 1.5, ease: "easeInOut" }}
						className="w-full h-full"
					>
						<svg
							width="100%"
							height="100%"
							className="fill-blue-600 dark:fill-blue-400"
							aria-hidden="true"
						>
							<title>Background Pattern</title>
							<pattern
								id={`pattern-${currentPattern}`}
								x="0"
								y="0"
								width="100"
								height="100"
								patternUnits="userSpaceOnUse"
							>
								<path d={backgroundPatterns[currentPattern]} />
							</pattern>
							<rect
								width="100%"
								height="100%"
								fill={`url(#pattern-${currentPattern})`}
							/>
						</svg>
					</motion.div>
				</AnimatePresence>
			</div>

			{/* Gradient Overlays */}
			<div className="absolute inset-0">
				<div className="absolute top-0 left-0 w-72 h-72 bg-gradient-to-r from-blue-400/20 to-purple-400/20 rounded-full blur-3xl animate-pulse" />
				<div className="absolute bottom-0 right-0 w-96 h-96 bg-gradient-to-r from-indigo-400/20 to-cyan-400/20 rounded-full blur-3xl animate-pulse delay-1000" />
				<div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-gradient-to-r from-pink-400/10 to-yellow-400/10 rounded-full blur-3xl animate-pulse delay-2000" />
			</div>

			{/* Header */}
			<header className="relative z-10 p-6 flex justify-between items-center">
				<Logo size="lg" showBrand={true} showHoverEffects={true} />

				<div className="flex items-center space-x-4">
					<ThemeToggle />
					<Button variant="ghost" size="sm" asChild>
						<Link href="/products" className="text-sm font-medium">
							Ürünler
						</Link>
					</Button>
				</div>
			</header>

			{/* Main Content */}
			<main className="relative z-10 flex items-center justify-center px-6 py-8 min-h-[calc(100vh-160px)] overflow-y-auto">
				<motion.div
					initial={{ opacity: 0, y: 20 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ delay: 0.3, duration: 0.6 }}
					className="w-full max-w-md my-auto"
				>
					{children}
				</motion.div>
			</main>

			{/* Footer */}
			<footer className="relative z-10 p-6 text-center">
				<motion.p
					initial={{ opacity: 0 }}
					animate={{ opacity: 1 }}
					transition={{ delay: 0.5 }}
					className="text-sm text-gray-600 dark:text-gray-400"
				>
					© 2025 CorePilot. Tüm hakları saklıdır.
				</motion.p>
			</footer>
		</div>
	);
}
