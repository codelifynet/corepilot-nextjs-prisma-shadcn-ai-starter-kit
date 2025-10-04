import { createAuthClient } from "better-auth/react";
import { multiSessionClient, adminClient } from "better-auth/client/plugins";
import {
	ac,
	adminRole,
	userRole,
	moderatorRole,
	superadminRole,
} from "@/lib/auth-permissions";

export const authClient = createAuthClient({
	baseURL: process.env.NEXT_PUBLIC_BETTER_AUTH_URL || "http://localhost:3007",
	plugins: [
		multiSessionClient(),
		adminClient({
			ac,
			roles: {
				admin: adminRole,
				user: userRole,
				moderator: moderatorRole,
				superadmin: superadminRole,
			},
		}),
	],
});

export type AuthClient = typeof authClient;

// Export all methods for convenience
export const {
	useSession,
	signIn,
	signUp,
	signOut,
	resetPassword,
	sendVerificationEmail,
	verifyEmail,
	requestPasswordReset,
	updateUser,
	deleteUser,
	getSession,
	listSessions,
	revokeSession,
	revokeSessions,
	revokeOtherSessions,
} = authClient;

// Multi-session methods
export const { listDeviceSessions } = authClient.multiSession;

// Admin methods
export const {
	listUsers,
	setUserPassword,
	banUser,
	unbanUser,
	listUserSessions,
	revokeUserSession,
	revokeUserSessions,
	impersonateUser,
	stopImpersonating,
	removeUser,
	hasPermission,
	checkRolePermission,
} = authClient.admin;

// Simple Role Check Hook
export const useRole = () => {
	const { data: session } = useSession();

	const user = session?.user;

	return {
		user,
		isAuthenticated: !!user,
		role: user?.role || "USER",
		isAdmin: user?.role === "ADMIN" || user?.role === "SUPERADMIN",
		isSuperAdmin: user?.role === "SUPERADMIN",
		hasRole: (roleName: string) => user?.role === roleName,
	};
};
