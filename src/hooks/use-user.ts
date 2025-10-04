"use client";

import { authClient } from "@/lib/auth-client";
import type { SessionUser } from "@/lib/auth";

export function useUser() {
	const { data: session, isPending, error } = authClient.useSession();

	// Safely cast the user to SessionUser type
	const user = session?.user
		? ({
				...session.user,
				role: (session.user as { role?: string }).role || "USER",
			} as SessionUser)
		: null;

	return {
		user,
		session,
		isLoading: isPending,
		error,
		isAuthenticated: !!session?.user,
		isAdmin: user?.role === "ADMIN",
	};
}
