"use client";

import { useUser } from "@/hooks/use-auth";
import { Icon } from "@iconify/react";

interface AuthGuardProps {
	children: React.ReactNode;
	fallback?: React.ReactNode;
	requireAdmin?: boolean;
}

export function AuthGuard({
	children,
	fallback,
	requireAdmin = false,
}: AuthGuardProps) {
	const { user, isLoading, isAdmin } = useUser();

	if (isLoading) {
		return (
			fallback || (
				<div className="flex items-center justify-center min-h-screen">
					<Icon icon="lucide:loader-2" className="h-8 w-8 animate-spin" />
				</div>
			)
		);
	}

	if (!user) {
		return (
			fallback || (
				<div className="flex items-center justify-center min-h-screen">
					<div className="text-center">
						<h2 className="text-2xl font-bold mb-4">Unauthorized</h2>
						<p className="text-gray-600">Please log in to access this page.</p>
					</div>
				</div>
			)
		);
	}

	if (requireAdmin && !isAdmin) {
		return (
			fallback || (
				<div className="flex items-center justify-center min-h-screen">
					<div className="text-center">
						<h2 className="text-2xl font-bold mb-4">Forbidden</h2>
						<p className="text-gray-600">
							You don't have permission to access this page.
						</p>
					</div>
				</div>
			)
		);
	}

	return <>{children}</>;
}

import Image from "next/image";

interface UserAvatarProps {
	user?: {
		name?: string;
		email?: string;
		image?: string;
	};
	size?: "sm" | "md" | "lg";
	className?: string;
}

export function UserAvatar({
	user,
	size = "md",
	className = "",
}: UserAvatarProps) {
	const { user: currentUser } = useUser();
	const userData = user || currentUser;

	if (!userData) return null;

	const sizeClasses = {
		sm: "h-8 w-8 text-sm",
		md: "h-10 w-10 text-base",
		lg: "h-12 w-12 text-lg",
	};

	const displayName = userData.name || userData.email?.split("@")[0] || "U";
	const initials = displayName.substring(0, 2).toUpperCase();

	if (userData.image) {
		return (
			<Image
				src={userData.image}
				alt={displayName}
				width={size === "sm" ? 32 : size === "md" ? 40 : 48}
				height={size === "sm" ? 32 : size === "md" ? 40 : 48}
				className={`${sizeClasses[size]} rounded-full object-cover ${className}`}
			/>
		);
	}

	return (
		<div
			className={`${sizeClasses[size]} rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white font-medium ${className}`}
		>
			{initials}
		</div>
	);
}

interface RoleGuardProps {
	children: React.ReactNode;
	allowedRoles: string[];
	fallback?: React.ReactNode;
}

export function RoleGuard({
	children,
	allowedRoles,
	fallback,
}: RoleGuardProps) {
	const { user } = useUser();

	// Note: Role checking will be updated with new RBAC system
	// For now, allowing all authenticated users
	if (!user) {
		return fallback || null;
	}

	// TODO: Implement proper role checking with new RBAC system
	console.log("Allowed roles:", allowedRoles);

	return <>{children}</>;
}
