"use client";

import { useState } from "react";
import { signOut } from "@/lib/auth-client";
import { Button } from "@/components/ui/button";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { ThemeToggle } from "@/components/ui/theme-toggle";
import { Icon } from "@iconify/react";
import { cn } from "@/lib/utils";

interface AdminHeaderProps {
	title?: string;
	isCollapsed?: boolean;
	onToggleCollapse?: () => void;
	isMobile?: boolean;
	onToggleMobileMenu?: () => void;
}

interface Notification {
	id: string;
	title: string;
	message: string;
	type: "info" | "success" | "warning" | "error";
	isRead: boolean;
	timestamp: Date;
}

export function AdminHeader({
	title = "Dashboard",
	isCollapsed,
	onToggleCollapse,
	isMobile = false,
	onToggleMobileMenu,
}: AdminHeaderProps) {
	// Sample notifications data
	const [notifications, setNotifications] = useState<Notification[]>([
		{
			id: "1",
			title: "Yeni Kullanıcı Kaydı",
			message: "Yeni bir kullanıcı sisteme kayıt oldu.",
			type: "info",
			isRead: false,
			timestamp: new Date(Date.now() - 5 * 60 * 1000),
		},
		{
			id: "2",
			title: "Başarılı İşlem",
			message: "Veri yedekleme işlemi başarıyla tamamlandı.",
			type: "success",
			isRead: false,
			timestamp: new Date(Date.now() - 15 * 60 * 1000),
		},
		{
			id: "3",
			title: "Sistem Uyarısı",
			message: "Disk alanı %85 doluluk oranına ulaştı.",
			type: "warning",
			isRead: true,
			timestamp: new Date(Date.now() - 30 * 60 * 1000),
		},
		{
			id: "4",
			title: "Hata Bildirimi",
			message: "API bağlantısında geçici bir sorun yaşandı.",
			type: "error",
			isRead: false,
			timestamp: new Date(Date.now() - 45 * 60 * 1000),
		},
	]);

	const unreadCount = notifications.filter((n) => !n.isRead).length;

	const handleSignOut = async () => {
		try {
			await signOut();
			// Redirect will be handled by middleware automatically
			window.location.href = "/admin/login";
		} catch (error) {
			console.error("Logout error:", error);
			// Force redirect even if logout fails
			window.location.href = "/admin/login";
		}
	};

	const getInitials = (name: string) => {
		return name
			.split(" ")
			.map((word) => word.charAt(0))
			.join("")
			.toUpperCase()
			.slice(0, 2);
	};

	const markAsRead = (notificationId: string) => {
		setNotifications((prev) =>
			prev.map((notification) =>
				notification.id === notificationId
					? { ...notification, isRead: true }
					: notification,
			),
		);
	};

	const markAllAsRead = () => {
		setNotifications((prev) =>
			prev.map((notification) => ({ ...notification, isRead: true })),
		);
	};

	const getNotificationIcon = (type: Notification["type"]) => {
		switch (type) {
			case "info":
				return "lucide:info";
			case "success":
				return "lucide:check-circle";
			case "warning":
				return "lucide:alert-triangle";
			case "error":
				return "lucide:alert-circle";
			default:
				return "lucide:bell";
		}
	};

	const getBadgeVariant = (type: Notification["type"]) => {
		switch (type) {
			case "info":
				return "bg-blue-100 text-blue-800 dark:bg-blue-900/20 dark:text-blue-400";
			case "success":
				return "bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400";
			case "warning":
				return "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-400";
			case "error":
				return "bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-400";
			default:
				return "bg-gray-100 text-gray-800 dark:bg-gray-900/20 dark:text-gray-400";
		}
	};

	const formatTimeAgo = (timestamp: Date) => {
		const now = new Date();
		const diffInMinutes = Math.floor(
			(now.getTime() - timestamp.getTime()) / (1000 * 60),
		);

		if (diffInMinutes < 1) return "Şimdi";
		if (diffInMinutes < 60) return `${diffInMinutes} dakika önce`;

		const diffInHours = Math.floor(diffInMinutes / 60);
		if (diffInHours < 24) return `${diffInHours} saat önce`;

		const diffInDays = Math.floor(diffInHours / 24);
		return `${diffInDays} gün önce`;
	};

	return (
		<header className="sticky top-0 z-40 border-b bg-white/95 dark:bg-gray-900/95 backdrop-blur supports-[backdrop-filter]:bg-white/60 dark:supports-[backdrop-filter]:bg-gray-900/60 border-gray-200 dark:border-gray-700">
			<div className="flex h-16 items-center justify-between px-4 sm:px-6">
				{/* Title and Sidebar Toggle */}
				<div className="flex items-center space-x-4">
					{/* Mobile Menu Toggle Button */}
					{isMobile && onToggleMobileMenu && (
						<Button
							variant="ghost"
							size="sm"
							onClick={onToggleMobileMenu}
							className="hover:bg-gray-100 dark:hover:bg-gray-800 p-2 lg:hidden"
							aria-label="Open menu"
						>
							<Icon
								icon="lucide:menu"
								className="h-5 w-5 text-gray-600 dark:text-gray-300"
							/>
						</Button>
					)}

					{/* Desktop Sidebar Toggle Button */}
					{!isMobile && onToggleCollapse && (
						<Button
							variant="ghost"
							size="sm"
							onClick={onToggleCollapse}
							className="hover:bg-gray-100 dark:hover:bg-gray-800 p-2 hidden lg:flex"
							aria-label={isCollapsed ? "Expand sidebar" : "Collapse sidebar"}
						>
							<Icon
								icon={
									isCollapsed
										? "lucide:panel-left-open"
										: "lucide:panel-left-close"
								}
								className="h-4 w-4 text-gray-600 dark:text-gray-300"
							/>
						</Button>
					)}
					<h1 className="text-lg lg:text-xl font-semibold text-gray-900 dark:text-white truncate">
						{title}
					</h1>
				</div>

				{/* Right side */}
				<div className="flex items-center space-x-2 sm:space-x-4">
					{/* Notifications */}
					<DropdownMenu>
						<DropdownMenuTrigger asChild>
							<Button
								variant="ghost"
								size="sm"
								className="relative bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 text-white hover:text-white p-2 rounded-lg transition-all duration-200"
							>
								<Icon icon="lucide:bell" className="h-4 w-4" />
								{unreadCount > 0 && (
									<Badge
										variant="destructive"
										className="absolute -top-2 -right-2 h-5 w-5 text-xs p-0 flex items-center justify-center bg-indigo-600 text-white border !border-white !shadow-indigo-900 !shadow-xl"
									>
										{unreadCount}
									</Badge>
								)}
							</Button>
						</DropdownMenuTrigger>
						<DropdownMenuContent
							className="w-80 bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700 max-h-96 overflow-y-auto"
							align="end"
							forceMount
						>
							<DropdownMenuLabel className="font-normal border-b border-gray-200 dark:border-gray-700 pb-2">
								<div className="flex items-center justify-between">
									<span className="text-sm font-semibold text-gray-900 dark:text-white">
										Bildirimler
									</span>
									{unreadCount > 0 && (
										<Button
											variant="ghost"
											size="sm"
											onClick={markAllAsRead}
											className="text-xs text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 p-1 h-auto"
										>
											Tümünü okundu işaretle
										</Button>
									)}
								</div>
							</DropdownMenuLabel>

							{notifications.length === 0 ? (
								<div className="p-4 text-center text-gray-500 dark:text-gray-400">
									<Icon
										icon="lucide:bell-off"
										className="h-8 w-8 mx-auto mb-2 opacity-50"
									/>
									<p className="text-sm">Henüz bildirim yok</p>
								</div>
							) : (
								<div className="max-h-80 overflow-y-auto">
									{notifications.map((notification) => (
										<DropdownMenuItem
											key={notification.id}
											onClick={() => markAsRead(notification.id)}
											className={cn(
												"p-4 cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-700/50 border-b border-gray-100 dark:border-gray-700 last:border-b-0",
												!notification.isRead &&
													"bg-blue-50/50 dark:bg-blue-900/10",
											)}
										>
											<div className="flex items-start space-x-3">
												<div className="flex-shrink-0">
													<Icon
														icon={getNotificationIcon(notification.type)}
														className="h-5 w-5 text-gray-600 dark:text-gray-300"
													/>
												</div>
												<div className="flex-1 min-w-0">
													<div className="flex items-center justify-between mb-1">
														<p className="text-sm font-medium text-gray-900 dark:text-white truncate">
															{notification.title}
														</p>
														<div className="flex items-center space-x-2">
															<Badge
																className={cn(
																	"text-xs px-2 py-1 rounded-full border-0",
																	getBadgeVariant(notification.type),
																)}
															>
																{notification.type}
															</Badge>
															{!notification.isRead && (
																<div className="w-2 h-2 bg-blue-500 rounded-full"></div>
															)}
														</div>
													</div>
													<p className="text-sm text-gray-600 dark:text-gray-300 mb-1">
														{notification.message}
													</p>
													<p className="text-xs text-gray-500 dark:text-gray-400">
														{formatTimeAgo(notification.timestamp)}
													</p>
												</div>
											</div>
										</DropdownMenuItem>
									))}
								</div>
							)}
						</DropdownMenuContent>
					</DropdownMenu>

					{/* Theme Toggle - Hidden on small screens */}
					<div className="hidden sm:block">
						<ThemeToggle />
					</div>

					{/* User Menu */}
					<DropdownMenu>
						<DropdownMenuTrigger asChild>
							<Button
								variant="ghost"
								className="relative h-8 w-8 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800"
							>
								<Avatar className="h-8 w-8">
									<AvatarImage src={""} alt={"Admin"} />
									<AvatarFallback className="bg-gray-200 dark:bg-gray-700 text-gray-900 dark:text-white">
										{getInitials("Admin")}
									</AvatarFallback>
								</Avatar>
							</Button>
						</DropdownMenuTrigger>
						<DropdownMenuContent
							className="w-56 bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700"
							align="end"
							forceMount
						>
							<DropdownMenuLabel className="font-normal">
								<div className="flex flex-col space-y-1">
									<p className="text-sm font-medium leading-none text-gray-900 dark:text-white">
										Admin
									</p>
									<p className="text-xs leading-none text-gray-600 dark:text-gray-300">
										fdgfdgfgf
									</p>
								</div>
							</DropdownMenuLabel>
							<DropdownMenuSeparator className="bg-gray-200 dark:bg-gray-700" />
							<DropdownMenuItem className="text-gray-900 dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700">
								<Icon icon="lucide:user" className="mr-2 h-4 w-4" />
								<span>Profile</span>
							</DropdownMenuItem>
							<DropdownMenuItem className="text-gray-900 dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700">
								<Icon icon="lucide:settings" className="mr-2 h-4 w-4" />
								<span>Settings</span>
							</DropdownMenuItem>
							{/* Theme Toggle for mobile */}
							<div className="sm:hidden">
								<DropdownMenuSeparator className="bg-gray-200 dark:bg-gray-700" />
								<div className="px-2 py-2">
									<div className="flex items-center justify-between">
										<span className="text-sm text-gray-900 dark:text-white">
											Theme
										</span>
										<ThemeToggle />
									</div>
								</div>
							</div>
							<DropdownMenuSeparator className="bg-gray-200 dark:bg-gray-700" />
							<DropdownMenuItem
								onClick={handleSignOut}
								className="text-gray-900 dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700"
							>
								<Icon icon="lucide:log-out" className="mr-2 h-4 w-4" />
								<span>Sign Out</span>
							</DropdownMenuItem>
						</DropdownMenuContent>
					</DropdownMenu>
				</div>
			</div>
		</header>
	);
}
