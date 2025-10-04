import { useEffect, useState } from "react";
import { authClient } from "@/lib/auth-client";
import type { SessionUser } from "@/lib/auth";

/**
 * Hook to get current user session with loading state
 */
export function useUser() {
	const { data: session, isPending, error } = authClient.useSession();

	const user = session?.user as unknown as SessionUser | null;
	const isAdmin = user?.role === "ADMIN" || user?.role === "SUPERADMIN";

	return {
		user,
		session,
		isLoading: isPending,
		error,
		isAuthenticated: !!session?.user,
		isAdmin,
	};
}

/**
 * Hook to check if user has specific role
 */
export function useRole(role: string) {
	const { user } = useUser();
	return user?.role === role;
}

/**
 * Hook to require authentication - redirects to login if not authenticated
 */
export function useRequireAuth() {
	const { user, isLoading } = useUser();
	const [shouldRedirect, setShouldRedirect] = useState(false);

	useEffect(() => {
		if (!isLoading && !user) {
			setShouldRedirect(true);
		}
	}, [user, isLoading]);

	return {
		user,
		isLoading,
		shouldRedirect,
	};
}

/**
 * Hook to require admin role - redirects if not admin
 */
export function useRequireAdmin() {
	const { user, isLoading, isAdmin } = useUser();
	const [shouldRedirect, setShouldRedirect] = useState(false);

	useEffect(() => {
		if (!isLoading && (!user || !isAdmin)) {
			setShouldRedirect(true);
		}
	}, [user, isLoading, isAdmin]);

	return {
		user,
		isLoading,
		isAdmin,
		shouldRedirect,
	};
}

/**
 * Hook for client-side authentication state
 */
export function useAuthState() {
	const { user, isLoading, isAuthenticated } = useUser();

	return {
		user,
		isLoading,
		isAuthenticated,
		// Note: Role checking will be updated with new RBAC system
		// For now, using legacy role field if available
		isAdmin: (user as any)?.role === "ADMIN",
		isUser: (user as any)?.role === "USER",
		isSuperAdmin: (user as any)?.role === "SUPERADMIN",
		hasRole: (role: string) => (user as any)?.role === role,
		hasAnyRole: (roles: string[]) =>
			(user as any)?.role && roles.includes((user as any).role),
		displayName: user?.name || user?.email?.split("@")[0] || "User",
	};
}
