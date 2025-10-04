import {
	USER_ROLE_LABELS,
	USER_ROLE_COLORS,
	USER_STATUS_COLORS,
} from "../constants";
import { type User, getUserPrimaryRole, hasRole, hasAnyRole } from "../types";

/**
 * Get user role label (works with RBAC system)
 */
export function getUserRoleLabel(user: User): string {
	const primaryRole = getUserPrimaryRole(user);
	if (!primaryRole) return "No Role";

	return (
		USER_ROLE_LABELS[primaryRole.name] ||
		primaryRole.displayName ||
		primaryRole.name
	);
}

/**
 * Get user role color classes (works with RBAC system)
 */
export function getUserRoleColor(user: User): string {
	const primaryRole = getUserPrimaryRole(user);
	if (!primaryRole) return USER_ROLE_COLORS["user"] || "";

	return USER_ROLE_COLORS[primaryRole.name] || USER_ROLE_COLORS["user"] || "";
}

/**
 * Get user status based on user properties
 */
export function getUserStatus(user: User): "active" | "banned" | "unverified" {
	if (user.banned) return "banned";
	if (!user.emailVerified) return "unverified";
	return "active";
}

/**
 * Get user status color classes
 */
export function getUserStatusColor(
	status: "active" | "banned" | "unverified",
): string {
	return USER_STATUS_COLORS[status];
}

/**
 * Check if user is admin (has admin or superadmin role)
 */
export function isAdmin(user: User): boolean {
	return hasAnyRole(user, ["admin", "superadmin"]);
}

/**
 * Check if user is super admin
 */
export function isSuperAdmin(user: User): boolean {
	return hasRole(user, "superadmin");
}

/**
 * Check if user can manage other user
 */
export function canManageUser(currentUser: User, targetUser: User): boolean {
	// Super admins can manage anyone
	if (isSuperAdmin(currentUser)) return true;

	// Admins can manage regular users but not other admins
	if (isAdmin(currentUser) && !isAdmin(targetUser)) return true;

	// Users can only manage themselves (for certain actions)
	return currentUser.id === targetUser.id;
}

/**
 * Get user initials for avatar
 */
export function getUserInitials(user: User): string {
	const names = user.name.split(" ");
	if (names.length >= 2) {
		return `${names[0][0]}${names[1][0]}`.toUpperCase();
	}
	return user.name.substring(0, 2).toUpperCase();
}

/**
 * Format user display name
 */
export function getUserDisplayName(user: User): string {
	return user.name || user.email;
}

/**
 * Check if user ban is expired
 */
export function isBanExpired(user: User): boolean {
	if (!user.banned || !user.banExpires) return false;
	return new Date() > new Date(user.banExpires);
}

/**
 * Get time until ban expires
 */
export function getBanTimeRemaining(user: User): string | null {
	if (!user.banned || !user.banExpires) return null;

	const now = new Date();
	const banExpires = new Date(user.banExpires);

	if (now >= banExpires) return "Expired";

	const diff = banExpires.getTime() - now.getTime();
	const days = Math.floor(diff / (1000 * 60 * 60 * 24));
	const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
	const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));

	if (days > 0) return `${days}d ${hours}h`;
	if (hours > 0) return `${hours}h ${minutes}m`;
	return `${minutes}m`;
}

/**
 * Validate email format
 */
export function isValidEmail(email: string): boolean {
	const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
	return emailRegex.test(email);
}

/**
 * Validate password strength
 */
export function validatePassword(password: string): {
	isValid: boolean;
	errors: string[];
} {
	const errors: string[] = [];

	if (password.length < 8) {
		errors.push("Password must be at least 8 characters long");
	}

	if (password.length > 128) {
		errors.push("Password must be less than 128 characters");
	}

	if (!/[a-z]/.test(password)) {
		errors.push("Password must contain at least one lowercase letter");
	}

	if (!/[A-Z]/.test(password)) {
		errors.push("Password must contain at least one uppercase letter");
	}

	if (!/\d/.test(password)) {
		errors.push("Password must contain at least one number");
	}

	if (!/[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]/.test(password)) {
		errors.push("Password must contain at least one special character");
	}

	return {
		isValid: errors.length === 0,
		errors,
	};
}

/**
 * Generate a secure random password
 */
export function generatePassword(length = 12): string {
	const uppercase = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
	const lowercase = "abcdefghijklmnopqrstuvwxyz";
	const numbers = "0123456789";
	const symbols = "!@#$%^&*()_+-=[]{}|;:,.<>?";

	const all = uppercase + lowercase + numbers + symbols;

	let password = "";

	// Ensure at least one character from each set
	password += uppercase[Math.floor(Math.random() * uppercase.length)];
	password += lowercase[Math.floor(Math.random() * lowercase.length)];
	password += numbers[Math.floor(Math.random() * numbers.length)];
	password += symbols[Math.floor(Math.random() * symbols.length)];

	// Fill the rest randomly
	for (let i = 4; i < length; i++) {
		password += all[Math.floor(Math.random() * all.length)];
	}

	// Shuffle the password
	return password
		.split("")
		.sort(() => Math.random() - 0.5)
		.join("");
}

/**
 * Format user last seen date
 */
export function formatLastSeen(date: Date): string {
	const now = new Date();
	const diff = now.getTime() - date.getTime();

	const minutes = Math.floor(diff / (1000 * 60));
	const hours = Math.floor(diff / (1000 * 60 * 60));
	const days = Math.floor(diff / (1000 * 60 * 60 * 24));

	if (minutes < 1) return "Just now";
	if (minutes < 60) return `${minutes}m ago`;
	if (hours < 24) return `${hours}h ago`;
	if (days < 7) return `${days}d ago`;

	return date.toLocaleDateString();
}

/**
 * Get user permission level as number for comparison (RBAC version)
 */
export function getUserPermissionLevel(user: User): number {
	const primaryRole = getUserPrimaryRole(user);
	if (!primaryRole) return 0;

	switch (primaryRole.name) {
		case "superadmin":
			return 3;
		case "admin":
			return 2;
		case "user":
			return 1;
		default:
			return 0;
	}
}

/**
 * Check if current user can perform action on target user (RBAC version)
 */
export function canPerformAction(
	currentUser: User,
	targetUser: User,
	action: "view" | "edit" | "delete" | "ban" | "change-role",
): boolean {
	const currentLevel = getUserPermissionLevel(currentUser);
	const targetLevel = getUserPermissionLevel(targetUser);

	// Can't perform actions on users with higher or equal permission level
	if (targetLevel >= currentLevel) return false;

	switch (action) {
		case "view":
			return currentLevel >= 2; // Admin or higher
		case "edit":
			return currentLevel >= 2; // Admin or higher
		case "delete":
			return currentLevel >= 3; // Super admin only
		case "ban":
			return currentLevel >= 2; // Admin or higher
		case "change-role":
			return currentLevel >= 3; // Super admin only
		default:
			return false;
	}
}
