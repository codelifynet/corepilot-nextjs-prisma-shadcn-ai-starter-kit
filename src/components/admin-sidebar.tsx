"use client";

import { Icon } from "@iconify/react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useMemo, useEffect, useCallback } from "react";
import { Button } from "@/components/ui/button";
import {
	Tooltip,
	TooltipContent,
	TooltipProvider,
	TooltipTrigger,
} from "@/components/ui/tooltip";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { ScrollArea } from "@/components/ui/scroll-area";
import { cn } from "@/lib/utils";
import { motion, AnimatePresence } from "framer-motion";
import { menuGroups } from "@/constants";

interface AdminSidebarProps {
	className?: string;
	isMobile?: boolean;
	onClose?: () => void;
	isCollapsed?: boolean;
	onToggleCollapse?: () => void;
}

export function AdminSidebar({
	className,
	isMobile = false,
	onClose,
	isCollapsed: externalIsCollapsed,
}: AdminSidebarProps) {
	const pathname = usePathname();
	const [internalIsCollapsed] = useState(false);

	// Use external collapsed state if provided, otherwise use internal state
	const isCollapsed =
		externalIsCollapsed !== undefined
			? externalIsCollapsed
			: internalIsCollapsed;
	const [openSubMenus, setOpenSubMenus] = useState<string[]>([]);
	const [openNestedSubMenus, setOpenNestedSubMenus] = useState<string[]>([]);

	// Helper function to check if a path is active (including sub-pages)
	const isPathActive = useCallback((href: string | undefined, currentPath: string) => {
		if (!href) return false;

		// Exact match
		if (href === currentPath) return true;

		const hrefParts = href.split("/").filter((part) => part.length > 0);
		const currentParts = currentPath
			.split("/")
			.filter((part) => part.length > 0);

		// If href has more parts than current path, it can't be active
		if (hrefParts.length > currentParts.length) return false;

		// Check if all href parts match the beginning of current path
		for (let i = 0; i < hrefParts.length; i++) {
			if (hrefParts[i] !== currentParts[i]) return false;
		}
		if (hrefParts.length < currentParts.length) {
			const nextSegment = currentParts[hrefParts.length];
			const lastHrefSegment = hrefParts[hrefParts.length - 1];
			if (nextSegment && nextSegment.startsWith(lastHrefSegment + "-")) {
				return false;
			}
		}

		return true;
	}, []);

	// Helper function to check if any nested sub-item is active
	const hasActiveNestedSubItem = useCallback((subItems: any[] | undefined, currentPath: string): boolean => {
		if (!subItems) return false;

		return subItems.some(subItem => {
			if (isPathActive(subItem.href, currentPath)) return true;
			if (subItem.subItems) {
				return hasActiveNestedSubItem(subItem.subItems, currentPath);
			}
			return false;
		});
	}, [isPathActive]);

	// Auto-open sub-menus for active sub-items
	useEffect(() => {
		const activeSubMenus: string[] = [];
		const activeNestedSubMenus: string[] = [];

		menuGroups.forEach((group) => {
			group.items.forEach((item) => {
				// Check if any direct sub-item is active
				if (item.subItems?.some((subItem) => isPathActive(subItem.href, pathname))) {
					activeSubMenus.push(item.title);
				}

				// Check for nested sub-items
				item.subItems?.forEach((subItem) => {
					if (hasActiveNestedSubItem(subItem.subItems, pathname)) {
						activeSubMenus.push(item.title);
						activeNestedSubMenus.push(subItem.title);
					}
				});
			});
		});

		// Set only the active sub-menus, replacing any manually opened ones
		if (activeSubMenus.length > 0) {
			setOpenSubMenus(activeSubMenus);
		}
		if (activeNestedSubMenus.length > 0) {
			setOpenNestedSubMenus(activeNestedSubMenus);
		}
	}, [pathname, isPathActive, hasActiveNestedSubItem]);

	// Close all sub menus and groups when sidebar is collapsed
	useEffect(() => {
		if (isCollapsed) {
			setOpenSubMenus([]);
			setOpenNestedSubMenus([]);
			setOpenGroups([]);
		}
	}, [isCollapsed]);

	const activeGroup = useMemo(
		() =>
			menuGroups.find((group) =>
				group.items.some(
					(item) =>
						isPathActive(item.href, pathname) ||
						item.subItems?.some((subItem) =>
							isPathActive(subItem.href, pathname) ||
							hasActiveNestedSubItem(subItem.subItems, pathname)
						),
				),
			)?.title,
		[pathname, isPathActive, hasActiveNestedSubItem],
	);

	const [openGroups, setOpenGroups] = useState<string[]>([
		activeGroup || "Overview",
	]);

	// Update open groups when active group changes (for navigation)
	useEffect(() => {
		if (activeGroup) {
			setOpenGroups([activeGroup]);
		}
	}, [activeGroup]);

	// Mock user data - in real app this will come from context or hook
	const user = {
		name: "Musa Yazlık",
		email: "musa@example.com",
		role: "Admin",
		avatar: "https://github.com/shadcn.png",
	};

	const toggleGroup = (groupTitle: string) => {
		if (isCollapsed) {
			setOpenGroups([groupTitle]);
			return;
		}
		setOpenGroups((prev) => {
			// If clicking on already open group, close it
			if (prev.includes(groupTitle)) {
				return prev.filter((g) => g !== groupTitle);
			}
			// Otherwise, close all other groups and open only this one
			return [groupTitle];
		});
	};

	const toggleSubMenu = (itemTitle: string) => {
		setOpenSubMenus((prev) => {
			// If clicking on already open sub-menu, close it
			if (prev.includes(itemTitle)) {
				return prev.filter((item) => item !== itemTitle);
			}
			// Otherwise, close all other sub-menus and open only this one
			return [itemTitle];
		});
	};

	const toggleNestedSubMenu = (subItemTitle: string) => {
		setOpenNestedSubMenus((prev) => {
			// If clicking on already open nested sub-menu, close it
			if (prev.includes(subItemTitle)) {
				return prev.filter((item) => item !== subItemTitle);
			}
			// Otherwise, add this nested sub-menu to open ones (allow multiple nested sub-menus open)
			return [...prev, subItemTitle];
		});
	};

	// Helper function to handle nested sub-menu item click
	const handleNestedSubMenuItemClick = (href: string | undefined, subItemTitle: string, hasNestedSubItems: boolean) => {
		if (!href && hasNestedSubItems) {
			// No URL provided, only toggle nested sub-menu
			toggleNestedSubMenu(subItemTitle);
		} else if (href) {
			// URL provided, navigate to the page
			// The Link component will handle the navigation
		}
	};

	const handleLogout = () => {
		// Logout functionality will be added here
		console.log("Logout process");
	};

	const sidebarContent = (
		<div
			className={cn(
				"flex h-full flex-col bg-white dark:bg-gray-900 transition-[width] duration-300 ease-in-out",
				isMobile
					? "w-full shadow-2xl border-r border-slate-200/50 dark:border-gray-700/50"
					: "fixed left-0 bottom-0 z-40 overflow-y-auto border-r border-slate-200/80 dark:border-gray-700/80 shadow-xl",
				!isMobile && isCollapsed ? "w-[4.5rem]" : "w-72", // Adjusted widths: collapsed w-[4.5rem] (72px) -> expanded 64
			)}
		>
			{/* Header */}
			<div className="flex h-16 items-center justify-between px-4 border-b border-slate-200/50 dark:border-gray-700/50 bg-white/70 dark:bg-gray-900/70 backdrop-blur-md shrink-0">
				{!isCollapsed ? (
					<Link href="/" className="flex items-center space-x-3 group">
						<div className="relative">
							<div className="w-9 h-9 rounded-xl bg-gradient-to-br from-blue-500 via-blue-600 to-indigo-600 flex items-center justify-center shadow-lg group-hover:shadow-xl transition-all  group-hover:scale-105">
								<Icon
									icon="svg-spinners:blocks-scale"
									className="h-5 w-5 text-white"
								/>
							</div>
						</div>
						<div className="flex flex-col">
							<h2 className="text-lg font-bold bg-gradient-to-r from-slate-800 via-slate-700 to-slate-600 dark:from-white dark:via-gray-200 dark:to-gray-300 bg-clip-text text-transparent leading-none">
								Admin Panel
							</h2>
							<span className="text-xs text-slate-500 dark:text-gray-400 font-medium">
								Management Panel
							</span>
						</div>
					</Link>
				) : (
					<Link
						href="/"
						className="flex items-center justify-center w-full group"
					>
						<div className="relative">
							<div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-500 via-blue-600 to-indigo-600 flex items-center justify-center shadow-lg group-hover:shadow-xl transition-all  group-hover:scale-105">
								<Icon
									icon="svg-spinners:blocks-scale"
									className="h-5 w-5 text-white"
								/>
							</div>
						</div>
					</Link>
				)}

				{isMobile && onClose && (
					<Button
						variant="ghost"
						size="icon"
						onClick={onClose}
						className="h-9 w-9 hover:bg-slate-200/70 dark:hover:bg-gray-700/70 transition-colors duration-200 focus:outline-none focus:ring-0"
					>
						<Icon
							icon="lucide:chevron-left"
							className="h-5 w-5 text-slate-600 dark:text-gray-300"
						/>
					</Button>
				)}
			</div>

			{/* User Info */}
			{!isCollapsed && (
				<div className="mx-3 my-4 shrink-0">
					<DropdownMenu>
						<DropdownMenuTrigger asChild>
							<Button
								variant="ghost"
								className="w-full h-auto p-0 hover:bg-transparent group focus:outline-none focus:ring-0"
							>
								<div className="relative w-full p-4 rounded-2xl bg-gradient-to-br from-white/90 to-slate-50/60 dark:from-gray-800/90 dark:to-gray-700/60 backdrop-blur-sm border border-slate-200/40 dark:border-gray-600/40 shadow-lg transition-all  group-hover:shadow-xl group-hover:scale-[1.02]">
									{/* Background decoration */}
									<div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-br from-blue-400/20 to-purple-500/20 rounded-full blur-xl" />
									<div className="absolute bottom-0 left-0 w-16 h-16 bg-gradient-to-tr from-emerald-400/20 to-cyan-500/20 rounded-full blur-lg" />

									<div className="relative flex items-center space-x-3">
										<div className="relative">
											<Avatar className="h-12 w-12 border-3 border-white shadow-xl ring-2 ring-blue-200/50">
												<AvatarImage
													src={user.avatar}
													alt={user.name}
													className="object-cover"
												/>
												<AvatarFallback className="bg-gradient-to-br from-blue-500 via-purple-500 to-indigo-600 text-white font-bold text-lg">
													{user.name
														.split(" ")
														.map((n) => n[0])
														.join("")}
												</AvatarFallback>
											</Avatar>
											{/* Online indicator */}
											<div className="absolute -bottom-0.5 -right-0.5 w-4 h-4 bg-emerald-500 border-2 border-white rounded-full shadow-sm" />
										</div>

										<div className="flex-1 text-left min-w-0">
											<div className="flex items-center space-x-1">
												<p className="text-sm font-bold text-slate-800 dark:text-white truncate">
													{user.name}
												</p>
												<Icon
													icon="lucide:crown"
													className="h-3.5 w-3.5 text-amber-500 flex-shrink-0"
												/>
											</div>
											<p className="text-xs text-slate-500 dark:text-gray-400 truncate font-medium">
												{(user as any).role || "User"}
											</p>
											<div className="flex items-center space-x-1 mt-1">
												<div className="w-1.5 h-1.5 bg-emerald-500 rounded-full" />
												<span className="text-xs text-emerald-600 dark:text-emerald-400 font-medium">
													Active
												</span>
											</div>
										</div>

										<div className="flex flex-col items-center space-y-1">
											<Icon
												icon="lucide:chevron-down"
												className="h-4 w-4 text-slate-400 dark:text-gray-300 transition-transform duration-200 group-hover:translate-y-0.5"
											/>
										</div>
									</div>
								</div>
							</Button>
						</DropdownMenuTrigger>
						<DropdownMenuContent
							align="start"
							className="w-72 mt-2 border-0 shadow-2xl"
						>
							<div className="bg-gradient-to-br from-white to-slate-50 dark:from-gray-800 dark:to-gray-700 rounded-xl p-1">
								<DropdownMenuLabel className="text-slate-700 dark:text-gray-200 font-semibold px-3 py-2">
									Account Information
								</DropdownMenuLabel>
								<DropdownMenuSeparator className="bg-slate-200/60 dark:bg-gray-600/60" />
								<DropdownMenuItem className="rounded-lg mx-1 my-1 focus:bg-blue-50 dark:focus:bg-blue-900/50 focus:text-blue-700 dark:focus:text-blue-300 transition-colors text-slate-700 dark:text-gray-200">
									<Icon icon="lucide:user" className="h-4 w-4 mr-3" />
									<span className="font-medium">Profile Settings</span>
								</DropdownMenuItem>
								<DropdownMenuItem className="rounded-lg mx-1 my-1 focus:bg-blue-50 dark:focus:bg-blue-900/50 focus:text-blue-700 dark:focus:text-blue-300 transition-colors text-slate-700 dark:text-gray-200">
									<Icon icon="lucide:mail" className="h-4 w-4 mr-3" />
									<div className="flex flex-col">
										<span className="font-medium">Email</span>
										<span className="text-xs text-slate-500 dark:text-gray-400">
											{user.email}
										</span>
									</div>
								</DropdownMenuItem>
								<DropdownMenuItem className="rounded-lg mx-1 my-1 focus:bg-blue-50 dark:focus:bg-blue-900/50 focus:text-blue-700 dark:focus:text-blue-300 transition-colors text-slate-700 dark:text-gray-200">
									<Icon icon="lucide:settings" className="h-4 w-4 mr-3" />
									<span className="font-medium">Account Settings</span>
								</DropdownMenuItem>
							</div>
						</DropdownMenuContent>
					</DropdownMenu>
				</div>
			)}

			{/* Navigation */}
			<ScrollArea className="flex-1 px-3 py-2 min-h-0 [&>[data-radix-scroll-area-scrollbar]]:hidden">
				<nav className="space-y-2 pb-4">
					{menuGroups.map((group) => {
						const groupIconName = group.icon;
						const isOpen = openGroups.includes(group.title);
						const hasActiveItem = group.items.some(
							(item) =>
								isPathActive(item.href, pathname) ||
								item.subItems?.some((subItem) =>
									isPathActive(subItem.href, pathname),
								),
						);
						// In collapsed mode, only show active if the group itself is the active page
						// In expanded mode, show active if group has active items OR if it's currently open
						const shouldShowActive = isCollapsed
							? group.items.some(
								(item) => isPathActive(item.href, pathname) && !item.subItems,
							) ||
							isPathActive(
								`/admin/${group.title.toLowerCase().replace(/\s+/g, "-")}`,
								pathname,
							)
							: hasActiveItem || isOpen;

						return (
							<div key={group.title} className="mb-2">
								{isCollapsed ? (
									<Tooltip>
										<TooltipTrigger asChild>
											<Button
												variant="ghost"
												size="sm"
												onClick={() => toggleGroup(group.title)}
												className={cn(
													"w-11 h-11 mb-1 group relative overflow-hidden transition-colors duration-200 ease-in-out focus:outline-none focus:ring-0 px-0 flex items-center justify-center rounded-lg", // Made it square w-11 h-11 and added rounded-lg
													shouldShowActive
														? `bg-gradient-to-br ${group.gradient} text-white shadow-lg border border-white/20`
														: `text-slate-600 dark:text-gray-300 hover:text-white hover:bg-gradient-to-br ${group.gradient} hover:shadow-lg border border-transparent hover:border-white/20`,
												)}
												title={group.title} // Tooltip for full text in collapsed mode
											>
												<div
													className={cn(
														"w-8 h-8 max-h-8 rounded-lg flex items-center justify-center transition-all duration-200 flex-shrink-0",
														shouldShowActive
															? `bg-white/10`
															: "bg-slate-200/70 dark:bg-gray-600/70 group-hover:bg-white/10",
													)}
												>
													<Icon
														icon={groupIconName}
														className={cn(
															"h-4 w-4 transition-colors duration-200",
															shouldShowActive
																? "text-white"
																: "text-slate-600 dark:text-gray-300 group-hover:text-white",
														)}
													/>
												</div>
											</Button>
										</TooltipTrigger>
										<TooltipContent
											side="right"
											className={group.tooltipColor}
											arrowClassName={group.tooltipArrowColor}
										>
											{group.title}
										</TooltipContent>
									</Tooltip>
								) : (
									<Button
										variant="ghost"
										size="sm"
										onClick={() => toggleGroup(group.title)}
										className={cn(
											"w-full h-10 mb-1 group relative overflow-hidden transition-colors duration-200 ease-in-out focus:outline-none focus:ring-0 justify-start px-3 min-h-[40px]", // Reduced height and padding
											shouldShowActive
												? `bg-gradient-to-r ${group.gradient} text-white shadow-lg`
												: `text-slate-600 dark:text-gray-300 hover:text-white dark:hover:text-white hover:bg-gradient-to-r ${group.gradient} hover:shadow-lg`,
										)}
									>
										<div className="flex items-center relative z-10 justify-between w-full">
											<div className="flex items-center">
												<div
													className={cn(
														"w-7 h-7 rounded-lg flex items-center justify-center transition-colors duration-200 flex-shrink-0", // Reduced icon container size
														shouldShowActive
															? `bg-white/10`
															: "bg-slate-200/70 dark:bg-gray-600/70 group-hover:bg-white/10",
													)}
												>
													<Icon
														icon={groupIconName}
														className={cn(
															"h-4 w-4 transition-colors duration-200",
															shouldShowActive
																? "text-white"
																: "text-slate-600 dark:text-gray-300 group-hover:text-white",
														)}
													/>
												</div>
												<span
													className={cn(
														"ml-3 text-sm font-semibold truncate text-left transition-opacity duration-200 max-w-[160px] overflow-hidden text-ellipsis whitespace-nowrap", // Reduced max-width for smaller sidebar
														shouldShowActive
															? "text-white dark:text-white group-hover:text-white dark:group-hover:text-white"
															: "text-slate-800 dark:text-gray-300 group-hover:text-white dark:group-hover:text-white",
													)}

												>
													{group.title}
												</span>
											</div>
											<Icon
												icon="lucide:chevron-down"
												className={cn(
													"h-4 w-4 transition-all duration-200 ease-in-out flex-shrink-0", // Removed margin
													shouldShowActive
														? "text-white"
														: "text-slate-600 dark:text-gray-300 group-hover:text-white",
													isOpen && "rotate-180",
												)}
											/>
										</div>
									</Button>
								)}

								<AnimatePresence initial={false}>
									{!isCollapsed && isOpen && (
										<motion.div
											key="content"
											initial="collapsed"
											animate="open"
											exit="collapsed"
											variants={{
												open: { opacity: 1, height: "auto" },
												collapsed: { opacity: 0, height: 0 },
											}}
											transition={{
												duration: 0.3,
												ease: [0.04, 0.62, 0.23, 0.98],
											}}
											className="space-y-1 overflow-hidden pb-1"
										>
											<div className="relative pl-0 pt-2 pb-1">
												{/* Background wrapper for sub-menu items */}
												<div className="bg-gray-200/50 dark:bg-gray-800/30 rounded-xl p-3 border border-gray-200/30 shadow-lg shadow-gray-200/80 dark:shadow-slate-900/50  dark:border-gray-700/30">
													<div className="space-y-2">
														{group.items.map((item) => {
															const itemIconName = item.icon;
															const isActive = isPathActive(
																item.href,
																pathname,
															);
															const hasActiveSubItem = item.subItems?.some(
																(subItem) =>
																	isPathActive(subItem.href, pathname),
															);
															const isSubMenuOpen = openSubMenus.includes(
																item.title,
															);

															return (
																<div key={item.title} className="space-y-1">
																	<div className="flex items-center">
																		{item.href ? (
																			item.isPro ? (
																				<div className="flex-1">
																					<Button
																						variant="ghost"
																						size="sm"
																						disabled
																						className={cn(
																							"w-full justify-start h-auto py-2 group transition-all duration-300 ease-in-out group relative rounded-lg px-3 focus:outline-none focus:ring-0 min-h-[36px] opacity-60 cursor-not-allowed",
																							"text-slate-400 dark:text-gray-500 bg-gray-100/50 dark:bg-gray-800/50 hover:bg-gray-100/50 dark:hover:bg-gray-800/50"
																						)}
																					>
																						<div className="flex items-center justify-between w-full">
																							<div className="flex items-center">
																								<Icon
																									icon={itemIconName}
																									className="h-4 w-4 mr-3 flex-shrink-0"
																								/>
																								<span className="truncate text-sm font-medium text-left leading-tight max-w-[120px] overflow-hidden text-ellipsis whitespace-nowrap">
																									{item.title}
																								</span>
																							</div>
																							<ProBadge className="ml-2" />
																						</div>
																					</Button>
																				</div>
																			) : (
																				<Link href={item.href} className="flex-1">
																					<Button
																						variant="ghost"
																						size="sm"
																						className={cn(
																							"w-full justify-start h-auto py-2 group  transition-all duration-300 ease-in-out group relative rounded-lg px-3 focus:outline-none focus:ring-0 min-h-[36px]", // Reduced padding and height
																							isActive || hasActiveSubItem
																								? `bg-gradient-to-r ${group.gradient} text-white shadow-lg hover:shadow-xl hover:brightness-110 transition-all duration-200 hover:text-white `
																								: `text-slate-600 dark:text-gray-400 hover:text-white dark:hover:text-white hover:bg-gradient-to-r ${group.gradient} hover:shadow-lg hover:brightness-110 transition-all duration-200`,
																						)}

																					>
																						<div className="flex items-center justify-between w-full group-hover:!text-white">
																							<div className="flex items-center">
																								<Icon
																									icon={itemIconName}
																									className="h-4 w-4 mr-3 flex-shrink-0"
																								/>
																								<span className="truncate text-sm font-medium text-left leading-tight max-w-[160px] overflow-hidden text-ellipsis whitespace-nowrap">
																									{" "}
																									{/* Reduced max-width for smaller sidebar */}
																									{item.title}
																								</span>
																							</div>
																							{(isActive || hasActiveSubItem) && (
																								<motion.div
																									layoutId="active-indicator"
																									className="w-1 h-4 bg-white/50 rounded-full flex-shrink-0"
																								/>
																							)}
																						</div>
																					</Button>
																				</Link>
																			)
																		) : (
																			<Button
																				variant="ghost"
																				size="sm"
																				disabled
																				className={cn(
																					"flex-1 w-full justify-start h-auto py-2 group transition-all duration-300 ease-in-out group relative rounded-lg px-3 focus:outline-none focus:ring-0 min-h-[36px] opacity-50 cursor-not-allowed",
																					"text-slate-400 dark:text-gray-500"
																				)}
																			>
																				<div className="flex items-center justify-between w-full">
																					<div className="flex items-center">
																						<Icon
																							icon={itemIconName}
																							className="h-4 w-4 mr-3 flex-shrink-0"
																						/>
																						<span className="truncate text-sm font-medium text-left leading-tight max-w-[120px] overflow-hidden text-ellipsis whitespace-nowrap">
																							{item.title}
																						</span>
																					</div>
																					<ProBadge className="ml-2" />
																				</div>
																			</Button>
																		)}
																		{item.subItems && (
																			<Button
																				variant="outline"
																				size="icon"
																				onClick={() =>
																					toggleSubMenu(item.title)
																				}
																				className="h-8 w-8 ml-2 hover:bg-slate-100/60 dark:hover:bg-gray-700/60 hover:text-slate-700 dark:hover:text-white rounded-lg focus:outline-none focus:ring-0 group border-0 shadow-none" // Reduced size
																			>
																				<Icon
																					icon="lucide:chevron-down"
																					className={cn(
																						"h-3 w-3 transition-transform text-slate-500 dark:text-gray-400 group-hover:text-slate-700 dark:group-hover:text-white",
																						isSubMenuOpen && "rotate-180",
																					)}
																				/>
																			</Button>
																		)}
																	</div>

																	{/* Sub Menu */}
																	{item.subItems && (
																		<AnimatePresence initial={false}>
																			{isSubMenuOpen && (
																				<motion.div
																					initial="collapsed"
																					animate="open"
																					exit="collapsed"
																					variants={{
																						open: {
																							opacity: 1,
																							height: "auto",
																						},
																						collapsed: {
																							opacity: 0,
																							height: 0,
																						},
																					}}
																					transition={{ duration: 0.2 }}
																					className="overflow-hidden mt-2 ml-4"
																				>
																					<div className="bg-slate-100/50 dark:bg-gray-700/30 rounded-lg p-2 border border-slate-200/40 dark:border-gray-600/40">
																						<div className="flex gap-1 flex-col border-l-2 border-slate-300/60 dark:border-gray-500/60 pl-3">
																							{item.subItems.map((subItem) => {
																								const isSubActive = isPathActive(subItem.href, pathname);
																								const hasNestedSubItems = !!subItem.subItems;
																								const isNestedSubMenuOpen = openNestedSubMenus.includes(subItem.title);
																								const hasActiveNestedSubItemCheck = hasActiveNestedSubItem(subItem.subItems, pathname);

																								return (
																									<div key={subItem.title} className="space-y-1">
																										<div className="flex items-center">
																											{subItem.isPro ? (
																												<Button
																													variant="ghost"
																													size="sm"
																													disabled
																													className={cn(
																														"group w-full justify-start h-8 text-xs transition-all duration-200 rounded-lg px-3 focus:outline-none focus:ring-0 min-h-[32px] opacity-50 cursor-not-allowed",
																														"text-slate-400 dark:text-gray-500"
																													)}
																												>
																													<div className="flex items-center justify-between w-full">
																														<div className="flex items-center flex-1">
																															<div className="w-1.5 h-1.5 rounded-full mr-3 flex-shrink-0 bg-slate-400/60 dark:bg-gray-500/60" />
																															<span className="truncate text-left leading-tight max-w-[100px] overflow-hidden text-ellipsis whitespace-nowrap">
																																{subItem.title}
																															</span>
																														</div>
																														<ProBadge className="ml-1 scale-75" />
																													</div>
																												</Button>
																											) : subItem.href ? (
																												<Link href={subItem.href} className="flex-1">
																													<Button
																														variant="ghost"
																														size="sm"
																														className={cn(
																															"group w-full justify-start h-8 text-xs transition-all duration-200 rounded-lg px-3 focus:outline-none focus:ring-0 group-hover:!text-white min-h-[32px]", // Reduced height and padding
																															isSubActive || hasActiveNestedSubItemCheck
																																? `bg-gradient-to-r ${group.gradient} text-white hover:text-white shadow-md font-medium hover:shadow-lg hover:brightness-110 transition-all duration-200`
																																: `text-slate-700 dark:text-gray-400 dark:hover:text-white hover:text-white hover:bg-gradient-to-r ${group.gradient} hover:shadow-lg hover:brightness-110 transition-all duration-200`,
																														)}

																													>
																														<div className="flex items-center flex-1">
																															<div
																																className={cn(
																																	"w-1.5 h-1.5 rounded-full mr-3 flex-shrink-0",
																																	isSubActive || hasActiveNestedSubItemCheck
																																		? "bg-white/80"
																																		: "bg-slate-400/60 dark:bg-gray-500/60 group-hover:bg-white/80",
																																)}
																															/>
																															<span className="truncate text-left leading-tight max-w-[140px] overflow-hidden text-ellipsis whitespace-nowrap">
																																{subItem.title}
																															</span>
																														</div>
																													</Button>
																												</Link>
																											) : (
																												<Button
																													variant="ghost"
																													size="sm"
																													onClick={() => handleNestedSubMenuItemClick(subItem.href, subItem.title, hasNestedSubItems)}
																													className={cn(
																														"flex-1 group w-full justify-start h-8 text-xs transition-all duration-200 rounded-lg px-3 focus:outline-none focus:ring-0 group-hover:!text-white min-h-[32px]", // Reduced height and padding
																														isSubActive || hasActiveNestedSubItemCheck
																															? `bg-gradient-to-r ${group.gradient} text-white shadow-md font-medium hover:shadow-lg hover:brightness-110 transition-all duration-200`
																															: `text-slate-700 dark:text-gray-400 dark:hover:text-white hover:text-white hover:bg-gradient-to-r ${group.gradient} hover:shadow-lg hover:brightness-110 transition-all duration-200`,
																													)}
																													title={subItem.title} // Tooltip for full text
																												>
																													<div className="flex items-center flex-1">
																														<div
																															className={cn(
																																"w-1.5 h-1.5 rounded-full mr-3 flex-shrink-0",
																																isSubActive || hasActiveNestedSubItemCheck
																																	? "bg-white/80"
																																	: "bg-slate-400/60 dark:bg-gray-500/60 group-hover:bg-white/80",
																															)}
																														/>
																														<span className="truncate text-left leading-tight max-w-[140px] overflow-hidden text-ellipsis whitespace-nowrap">
																															{subItem.title}
																														</span>
																													</div>
																												</Button>
																											)}
																											{hasNestedSubItems && (
																												<Button
																													variant="outline"
																													size="icon"
																													onClick={() => toggleNestedSubMenu(subItem.title)}
																													className="h-6 w-6 ml-2 hover:bg-slate-100/60 dark:hover:bg-gray-700/60 hover:text-slate-700 dark:hover:text-white rounded-lg focus:outline-none focus:ring-0 group border-0 shadow-none"
																												>
																													<Icon
																														icon="lucide:chevron-down"
																														className={cn(
																															"h-2.5 w-2.5 transition-transform text-slate-500 dark:text-gray-400 group-hover:text-slate-700 dark:group-hover:text-white",
																															isNestedSubMenuOpen && "rotate-180",
																														)}
																													/>
																												</Button>
																											)}
																										</div>

																										{/* Nested Sub Menu */}
																										{hasNestedSubItems && (
																											<AnimatePresence initial={false}>
																												{isNestedSubMenuOpen && (
																													<motion.div
																														initial="collapsed"
																														animate="open"
																														exit="collapsed"
																														variants={{
																															open: {
																																opacity: 1,
																																height: "auto",
																															},
																															collapsed: {
																																opacity: 0,
																																height: 0,
																															},
																														}}
																														transition={{ duration: 0.2 }}
																														className="overflow-hidden mt-1 ml-3"
																													>
																														<div className="bg-slate-50/80 dark:bg-gray-800/40 rounded-lg p-2">
																															<div className="flex gap-1 flex-col pl-2">
																																{subItem.subItems?.map((nestedSubItem) => {
																																	const isNestedSubActive = isPathActive(nestedSubItem.href, pathname);

																																	return (
																																		<Link
																																			key={nestedSubItem.title}
																																			href={nestedSubItem.href || '#'}
																																		>
																																			<Button
																																				variant="ghost"
																																				size="sm"
																																				className={cn(
																																					"group w-full justify-start h-7 text-xs transition-all duration-200 rounded-lg px-2 focus:outline-none focus:ring-0 group-hover:!text-white min-h-[28px]",
																																					isNestedSubActive
																																						? `bg-gradient-to-r ${group.gradient} text-white shadow-sm font-medium hover:shadow-md hover:brightness-110 transition-all duration-200`
																																						: `text-slate-600 dark:text-gray-500 dark:hover:text-white hover:text-white hover:bg-gradient-to-r ${group.gradient} hover:shadow-md hover:brightness-110 transition-all duration-200`,
																																				)}
																																				title={nestedSubItem.title}
																																			>
																																				<div className="flex items-center flex-1">
																																					<div
																																						className={cn(
																																							"w-1 h-1 rounded-full mr-2 flex-shrink-0",
																																							isNestedSubActive
																																								? "bg-white/90"
																																								: "bg-slate-400/50 dark:bg-gray-500/50 group-hover:bg-white/90",
																																						)}
																																					/>
																																					<span className="truncate text-left leading-tight max-w-[120px] overflow-hidden text-ellipsis whitespace-nowrap">
																																						{nestedSubItem.title}
																																					</span>
																																				</div>
																																			</Button>
																																		</Link>
																																	);
																																})}
																															</div>
																														</div>
																													</motion.div>
																												)}
																											</AnimatePresence>
																										)}
																									</div>
																								);
																							})}
																						</div>
																					</div>
																				</motion.div>
																			)}
																		</AnimatePresence>
																	)}
																</div>
															);
														})}
													</div>
												</div>
											</div>
										</motion.div>
									)}
								</AnimatePresence>
							</div>
						);
					})}
				</nav>
			</ScrollArea>

			{/* Logout Button */}
			<div className="mx-3 mb-4 shrink-0">
				{isCollapsed ? (
					<Tooltip>
						<TooltipTrigger asChild>
							<Button
								variant="ghost"
								size="icon"
								onClick={handleLogout}
								className="w-11 h-11 rounded-lg hover:bg-red-50 dark:hover:bg-red-900/50 hover:text-red-600 dark:hover:text-red-300 transition-all duration-200 border border-red-200/50 dark:border-red-700/50 shadow-sm focus:outline-none focus:ring-0 px-0 flex items-center justify-center"
							>
								<div className="w-7 h-7 rounded-lg bg-red-100 dark:bg-red-800/50 flex items-center justify-center transition-colors group-hover:bg-red-200 dark:group-hover:bg-red-700/50">
									<Icon
										icon="lucide:log-out"
										className="h-4 w-4 text-red-600 dark:text-red-400"
									/>
								</div>
							</Button>
						</TooltipTrigger>
						<TooltipContent side="right">Logout</TooltipContent>
					</Tooltip>
				) : (
					<Button
						variant="ghost"
						onClick={handleLogout}
						className="w-full justify-start h-10 rounded-xl bg-gradient-to-r from-red-50 to-rose-50 dark:from-red-900/50 dark:to-red-800/50 border border-red-200/50 dark:border-red-700/50 text-red-700 dark:text-red-300 hover:from-red-100 hover:to-rose-100 dark:hover:from-red-800/70 dark:hover:to-red-700/70 hover:border-red-300/50 dark:hover:border-red-600/50 transition-all duration-200 group shadow-sm hover:shadow-md focus:outline-none focus:ring-0"
					>
						<div className="flex items-center space-x-3">
							<div className="w-7 h-7 rounded-lg bg-red-100 flex items-center justify-center group-hover:bg-red-200 transition-colors">
								<Icon icon="lucide:log-out" className="h-4 w-4 text-red-600" />
							</div>
							<span className="text-sm font-semibold text-red-700 dark:text-red-300">
								Logout
							</span>
						</div>
					</Button>
				)}
			</div>
		</div>
	);

	if (isMobile) {
		return (
			<div className="fixed inset-0 z-50 lg:hidden">
				{/* Animated Overlay */}
				<motion.div
					initial={{ opacity: 0 }}
					animate={{ opacity: 1 }}
					exit={{ opacity: 0 }}
					transition={{ duration: 0.3, ease: "easeInOut" }}
					className="fixed inset-0 bg-black/50 dark:bg-black/70 backdrop-blur-sm"
					onClick={onClose}
					onKeyDown={(e) => {
						if (e.key === "Enter" || e.key === " ") {
							e.preventDefault();
							onClose?.();
						}
					}}
					aria-label="Close menu"
				/>

				{/* Animated Sidebar */}
				<motion.div
					initial={{ x: "-80vw" }}
					animate={{ x: 0 }}
					exit={{ x: "-80vw" }}
					transition={{
						type: "spring",
						damping: 28,
						stiffness: 280,
						mass: 0.9,
					}}
					className="fixed left-0 top-0 h-screen w-[80vw] z-10"
				>
					<TooltipProvider delayDuration={0}>{sidebarContent}</TooltipProvider>
				</motion.div>
			</div>
		);
	}

	return (
		<TooltipProvider delayDuration={0}>
			<div className={cn("hidden lg:block max-h-screen ", className)}>
				{sidebarContent}
			</div>
		</TooltipProvider>
	);
}

// Pro Badge Component
const ProBadge = ({ className }: { className?: string }) => (
	<div className={cn(
		"inline-flex items-center px-1 py-0.5 rounded-full text-xs font-medium bg-gradient-to-r from-amber-400 to-orange-500 text-white shadow-sm",
		className
	)}>
		<Icon icon="lucide:crown" className="h-2 w-2 " />
	</div>
);
