"use client";

import { useState, useEffect } from "react";
import { AdminHeader } from "@/components/admin-header";
import { AdminSidebar } from "@/components/admin-sidebar";
import { AnimatePresence } from "framer-motion";

interface AdminLayoutClientProps {
	children: React.ReactNode;
}

export function AdminLayoutClient({ children }: AdminLayoutClientProps) {
	const [isCollapsed, setIsCollapsed] = useState(false);
	const [isMobile, setIsMobile] = useState(false);
	const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

	// Mobile detection and window resize handler
	useEffect(() => {
		const checkMobile = () => {
			const mobile = window.innerWidth < 1024;
			setIsMobile(mobile);
			if (mobile) {
				setIsCollapsed(false);
				setIsMobileMenuOpen(false);
			}
		};

		checkMobile();
		window.addEventListener("resize", checkMobile);
		return () => window.removeEventListener("resize", checkMobile);
	}, []);

	// ESC key handler for mobile menu
	useEffect(() => {
		const handleEscKey = (event: KeyboardEvent) => {
			if (event.key === "Escape" && isMobileMenuOpen) {
				setIsMobileMenuOpen(false);
			}
		};

		if (isMobileMenuOpen) {
			document.addEventListener("keydown", handleEscKey);
			document.body.style.overflow = "hidden";
		} else {
			document.body.style.overflow = "unset";
		}

		return () => {
			document.removeEventListener("keydown", handleEscKey);
			document.body.style.overflow = "unset";
		};
	}, [isMobileMenuOpen]);

	const toggleMobileMenu = () => {
		setIsMobileMenuOpen(!isMobileMenuOpen);
	};

	const closeMobileMenu = () => {
		setIsMobileMenuOpen(false);
	};

	return (
		<div className="min-h-screen bg-gradient-to-br from-gray-50/50 via-white to-blue-50/30 dark:from-gray-900 dark:via-gray-900 dark:to-gray-800">
			<div className="flex min-h-screen">
				{/* Desktop Sidebar */}
				{!isMobile && (
					<AdminSidebar
						isCollapsed={isCollapsed}
						onToggleCollapse={() => setIsCollapsed(!isCollapsed)}
					/>
				)}

				{/* Mobile Sidebar */}
				<AnimatePresence mode="wait">
					{isMobile && isMobileMenuOpen && (
						<AdminSidebar
							key="mobile-sidebar"
							isMobile={true}
							onClose={closeMobileMenu}
						/>
					)}
				</AnimatePresence>

				{/* Main Content Area */}
				<div
					className={`flex z-0 flex-1 relative flex-col bg-slate-50/80 dark:bg-slate-900/80 transition-all duration-300 ease-in-out ${!isMobile ? (isCollapsed ? "ml-[4.5rem]" : "ml-72") : "ml-0"
						}`}
				>
					{/* Admin Header */}
					<AdminHeader
						isCollapsed={isCollapsed}
						onToggleCollapse={() => setIsCollapsed(!isCollapsed)}
						isMobile={isMobile}
						onToggleMobileMenu={toggleMobileMenu}
					/>

					{/* Main Content */}
					<main className="flex-1 overflow-hidden">
						<div className="container mx-auto px-0 sm:px-6 lg:px-8 py-4 sm:py-6 lg:py-8">
							{children}
						</div>
					</main>
				</div>
			</div>
		</div>
	);
}
