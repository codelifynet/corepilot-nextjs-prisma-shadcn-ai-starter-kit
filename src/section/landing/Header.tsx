"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Menu, X } from "lucide-react";
import Link from "next/link";
import { ThemeToggle } from "@/components/theme-toggle";
import { Logo } from "@/components/core-pilot-ui/logo";
import { LanguageSwitcher } from "@/components/ui/language-switcher";

export function Header() {
	const [isMenuOpen, setIsMenuOpen] = useState(false);

	return (
		<header className="sticky top-0 z-50 w-full border-b border-gray-200/20 dark:border-gray-800/20 bg-white/80 dark:bg-gray-900/80 backdrop-blur-xl supports-[backdrop-filter]:bg-white/60 dark:supports-[backdrop-filter]:bg-gray-900/60">
			{/* Gradient overlay for visual enhancement */}
			<div className="absolute inset-0 bg-gradient-to-r from-pink-500/5 via-transparent to-orange-500/5 pointer-events-none" />

			<div className="container mx-auto px-4 sm:px-6 lg:px-8 relative">
				<div className="flex h-16 items-center justify-between">
					{/* Logo */}
					<div className="relative">
						<Logo size="md" showBrand={true} showHoverEffects={true} />
						{/* Subtle glow effect */}
						<div className="absolute -inset-2 bg-gradient-to-r from-pink-500/10 to-orange-500/10 rounded-lg blur-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
					</div>

					{/* Desktop Navigation */}
					<nav className="hidden md:flex items-center space-x-8">
						<Link
							href="#features"
							className="relative text-sm font-medium text-gray-700 dark:text-gray-300 hover:text-transparent hover:bg-gradient-to-r hover:from-pink-600 hover:to-orange-600 hover:bg-clip-text transition-all duration-300 group"
						>
							Features
							<span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-pink-600 to-orange-600 group-hover:w-full transition-all duration-300" />
						</Link>
						<Link
							href="#testimonials"
							className="relative text-sm font-medium text-gray-700 dark:text-gray-300 hover:text-transparent hover:bg-gradient-to-r hover:from-pink-600 hover:to-orange-600 hover:bg-clip-text transition-all duration-300 group"
						>
							Testimonials
							<span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-pink-600 to-orange-600 group-hover:w-full transition-all duration-300" />
						</Link>
						<Link
							href="#pricing"
							className="relative text-sm font-medium text-gray-700 dark:text-gray-300 hover:text-transparent hover:bg-gradient-to-r hover:from-pink-600 hover:to-orange-600 hover:bg-clip-text transition-all duration-300 group"
						>
							Pricing
							<span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-pink-600 to-orange-600 group-hover:w-full transition-all duration-300" />
						</Link>
						<Link
							href="#contact"
							className="relative text-sm font-medium text-gray-700 dark:text-gray-300 hover:text-transparent hover:bg-gradient-to-r hover:from-pink-600 hover:to-orange-600 hover:bg-clip-text transition-all duration-300 group"
						>
							Contact
							<span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-pink-600 to-orange-600 group-hover:w-full transition-all duration-300" />
						</Link>
					</nav>

					{/* CTA Buttons */}
					<div className="hidden md:flex items-center space-x-3">
						<LanguageSwitcher />
						<ThemeToggle />
						<Link href="/auth/sign-in">
							<Button
								variant="ghost"
								size="sm"
								className="hover:bg-gradient-to-r hover:from-pink-50 hover:to-orange-50 dark:hover:from-pink-950/20 dark:hover:to-orange-950/20 hover:text-gray-900 dark:hover:text-white transition-all duration-300"
							>
								Sign In
							</Button>
						</Link>
						<Link href="/auth/sign-up">
							<Button
								size="sm"
								className="bg-gradient-to-r from-pink-600 to-orange-600 hover:from-pink-700 hover:to-orange-700 text-white shadow-lg hover:shadow-xl hover:shadow-pink-500/25 transition-all duration-300 border-0"
							>
								Get Started
							</Button>
						</Link>
					</div>

					{/* Mobile Menu Button */}
					<div className="md:hidden">
						<Button
							variant="ghost"
							size="sm"
							onClick={() => setIsMenuOpen(!isMenuOpen)}
							className="hover:bg-gradient-to-r hover:from-pink-50 hover:to-orange-50 dark:hover:from-pink-950/20 dark:hover:to-orange-950/20 transition-all duration-300"
						>
							{isMenuOpen ? (
								<X className="h-5 w-5" />
							) : (
								<Menu className="h-5 w-5" />
							)}
						</Button>
					</div>
				</div>

				{/* Mobile Menu */}
				{isMenuOpen && (
					<div className="md:hidden border-t border-gray-200/20 dark:border-gray-800/20 bg-white/95 dark:bg-gray-900/95 backdrop-blur-xl">
						{/* Mobile menu gradient overlay */}
						<div className="absolute inset-0 bg-gradient-to-br from-pink-500/5 via-transparent to-orange-500/5 pointer-events-none" />

						<div className="px-4 py-6 space-y-4 relative">
							<Link
								href="#features"
								className="block text-sm font-medium text-gray-700 dark:text-gray-300 hover:text-transparent hover:bg-gradient-to-r hover:from-pink-600 hover:to-orange-600 hover:bg-clip-text transition-all duration-300"
								onClick={() => setIsMenuOpen(false)}
							>
								Features
							</Link>
							<Link
								href="#testimonials"
								className="block text-sm font-medium text-gray-700 dark:text-gray-300 hover:text-transparent hover:bg-gradient-to-r hover:from-pink-600 hover:to-orange-600 hover:bg-clip-text transition-all duration-300"
								onClick={() => setIsMenuOpen(false)}
							>
								Testimonials
							</Link>
							<Link
								href="#pricing"
								className="block text-sm font-medium text-gray-700 dark:text-gray-300 hover:text-transparent hover:bg-gradient-to-r hover:from-pink-600 hover:to-orange-600 hover:bg-clip-text transition-all duration-300"
								onClick={() => setIsMenuOpen(false)}
							>
								Pricing
							</Link>
							<Link
								href="#contact"
								className="block text-sm font-medium text-gray-700 dark:text-gray-300 hover:text-transparent hover:bg-gradient-to-r hover:from-pink-600 hover:to-orange-600 hover:bg-clip-text transition-all duration-300"
								onClick={() => setIsMenuOpen(false)}
							>
								Contact
							</Link>
							<div className="pt-4 space-y-3 border-t border-gray-200/20 dark:border-gray-800/20">
								<div className="flex items-center justify-between">
									<span className="text-sm font-medium text-gray-600 dark:text-gray-400">Language</span>
									<LanguageSwitcher />
								</div>
								<div className="flex items-center justify-between">
									<span className="text-sm font-medium text-gray-600 dark:text-gray-400">Theme</span>
									<ThemeToggle />
								</div>
								<Button
									variant="ghost"
									size="sm"
									className="w-full justify-start hover:bg-gradient-to-r hover:from-pink-50 hover:to-orange-50 dark:hover:from-pink-950/20 dark:hover:to-orange-950/20 transition-all duration-300"
								>
									Sign In
								</Button>
								<Button
									size="sm"
									className="w-full bg-gradient-to-r from-pink-600 to-orange-600 hover:from-pink-700 hover:to-orange-700 text-white shadow-lg hover:shadow-xl transition-all duration-300"
								>
									Get Started
								</Button>
							</div>
						</div>
					</div>
				)}
			</div>
		</header>
	);
}

export default Header;
