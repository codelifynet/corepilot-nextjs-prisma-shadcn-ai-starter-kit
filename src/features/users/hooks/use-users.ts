import {
	// listUsers as clientListUsers,  // Temporarily disabled
	// setUserRole as clientSetUserRole,  // Not available in this version
	setUserPassword as clientSetUserPassword,
	banUser as clientBanUser,
	unbanUser as clientUnbanUser,
	removeUser as clientRemoveUser,
	listUserSessions as clientListUserSessions,
	revokeUserSession as clientRevokeUserSession,
	revokeUserSessions as clientRevokeUserSessions,
	impersonateUser as clientImpersonateUser,
	stopImpersonating as clientStopImpersonating,
	hasPermission as clientHasPermission,
	checkRolePermission as clientCheckRolePermission,
} from "@/lib/auth-client";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { USERS_API } from "@/constants/paths/users";
import type {
	ListUsersParams,
	ListUsersResponse,
	User,
	UserSession,
	UserStats,
	BanUserInput,
	// SetUserRoleInput,  // Temporarily disabled
	SetUserPasswordInput,
} from "../types";

// Query keys
export const userKeys = {
	all: ["users"] as const,
	lists: () => [...userKeys.all, "list"] as const,
	list: (params: ListUsersParams) => [...userKeys.lists(), params] as const,
	details: () => [...userKeys.all, "detail"] as const,
	detail: (id: string) => [...userKeys.details(), id] as const,
	sessions: (userId: string) => [...userKeys.all, "sessions", userId] as const,
	stats: () => [...userKeys.all, "stats"] as const,
	permissions: () => [...userKeys.all, "permissions"] as const,
};

/**
 * Hook to list users with filters and pagination
 */
export function useUsers(params: ListUsersParams = {}) {
	return useQuery({
		queryKey: userKeys.list(params),
		queryFn: async (): Promise<ListUsersResponse> => {
			// Build query parameters
			const searchParams = new URLSearchParams();

			if (params.page) searchParams.append("page", params.page.toString());
			if (params.limit) searchParams.append("limit", params.limit.toString());

			// Handle sorting - convert from params.sort to sortBy
			if (params.sort) searchParams.append("sortBy", params.sort);
			if (params.order) searchParams.append("sortOrder", params.order);

			// Handle filters
			if (params.filters) {
				if (params.filters.search)
					searchParams.append("search", params.filters.search);
				if (params.filters.role)
					searchParams.append("role", params.filters.role);
				if (params.filters.banned !== undefined)
					searchParams.append(
						"status",
						params.filters.banned ? "banned" : "active",
					);
			}

			const response = await fetch(
				`${USERS_API.BASE}?${searchParams.toString()}`,
				{
					method: "GET",
					headers: {
						"Content-Type": "application/json",
					},
				},
			);

			console.log("Users API response:", response);
			console.log("Query params sent:", searchParams.toString());

			if (!response.ok) {
				const errorData = await response.text();
				console.error("API error:", errorData);
				throw new Error("Failed to fetch users");
			}

			return response.json();
		},
	});
}

/**
 * Hook to get user by ID
 */
export function useUser(id: string) {
	return useQuery({
		queryKey: userKeys.detail(id),
		queryFn: async (): Promise<User> => {
			const response = await fetch(USERS_API.USER(id));

			if (!response.ok) {
				throw new Error("Failed to fetch user");
			}

			return response.json();
		},
		enabled: !!id,
	});
}

/**
 * Hook to get user statistics
 */
export function useUserStats() {
	return useQuery({
		queryKey: userKeys.stats(),
		queryFn: async (): Promise<UserStats> => {
			const response = await fetch(USERS_API.STATS);

			if (!response.ok) {
				throw new Error("Failed to fetch user stats");
			}

			return response.json();
		},
	});
}

/**
 * Hook to get user sessions
 */
export function useUserSessions(userId: string) {
	return useQuery({
		queryKey: userKeys.sessions(userId),
		queryFn: async (): Promise<UserSession[]> => {
			const response = await clientListUserSessions({
				userId,
			});
			// Handle both success and error cases from better-auth
			if ("sessions" in response) {
				return (response.sessions || []) as UserSession[];
			}
			return [];
		},
		enabled: !!userId,
	});
}

/**
 * Hook to create a user
 */
export function useCreateUser() {
	const queryClient = useQueryClient();

	return useMutation({
		mutationFn: async (data: {
			name: string;
			email: string;
			password: string;
			role?: string;
			emailVerified?: boolean;
		}) => {
			const response = await fetch(USERS_API.BASE, {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify(data),
			});

			if (!response.ok) {
				const error = await response.json();
				throw new Error(error.message || "Failed to create user");
			}

			return response.json();
		},
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: userKeys.lists() });
			queryClient.invalidateQueries({ queryKey: userKeys.stats() });
			toast.success("User created successfully");
		},
		onError: (error: Error) => {
			toast.error(error.message || "Failed to create user");
		},
	});
}

/**
 * Hook to update a user
 */
export function useUpdateUser() {
	const queryClient = useQueryClient();

	return useMutation({
		mutationFn: async ({
			id,
			data,
		}: {
			id: string;
			data: {
				name?: string;
				email?: string;
				role?: string;
				emailVerified?: boolean;
				image?: string;
			};
		}) => {
			const response = await fetch(USERS_API.USER(id), {
				method: "PATCH",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify(data),
			});

			if (!response.ok) {
				const error = await response.json();
				throw new Error(error.message || "Failed to update user");
			}

			return response.json();
		},
		onSuccess: (_, { id }) => {
			queryClient.invalidateQueries({ queryKey: userKeys.lists() });
			queryClient.invalidateQueries({ queryKey: userKeys.detail(id) });
			queryClient.invalidateQueries({ queryKey: userKeys.stats() });
			toast.success("User updated successfully");
		},
		onError: (error: Error) => {
			toast.error(error.message || "Failed to update user");
		},
	});
}

/**
 * Hook to set user role
 * Note: Temporarily disabled - setUserRole not available in current better-auth version
 */
export function useSetUserRole() {
	// const queryClient = useQueryClient();

	return useMutation({
		mutationFn: async () => {
			// return clientSetUserRole(data);
			throw new Error(
				"setUserRole not available in current better-auth version",
			);
		},
		onSuccess: () => {
			// queryClient.invalidateQueries({ queryKey: userKeys.lists() });
			// queryClient.invalidateQueries({ queryKey: userKeys.detail(userId) });
			// queryClient.invalidateQueries({ queryKey: userKeys.stats() });
			toast.success("User role updated successfully");
		},
		onError: (error: Error) => {
			toast.error(error.message || "Failed to update user role");
		},
	});
}

/**
 * Hook to set user password
 */
export function useSetUserPassword() {
	return useMutation({
		mutationFn: async (data: SetUserPasswordInput) => {
			return clientSetUserPassword(data);
		},
		onSuccess: () => {
			toast.success("User password updated successfully");
		},
		onError: (error: Error) => {
			toast.error(error.message || "Failed to update user password");
		},
	});
}

/**
 * Hook to ban a user
 */
export function useBanUser() {
	const queryClient = useQueryClient();

	return useMutation({
		mutationFn: async (data: BanUserInput) => {
			return clientBanUser(data);
		},
		onSuccess: (_, { userId }) => {
			queryClient.invalidateQueries({ queryKey: userKeys.lists() });
			queryClient.invalidateQueries({ queryKey: userKeys.detail(userId) });
			queryClient.invalidateQueries({ queryKey: userKeys.stats() });
			toast.success("User banned successfully");
		},
		onError: (error: Error) => {
			toast.error(error.message || "Failed to ban user");
		},
	});
}

/**
 * Hook to unban a user
 */
export function useUnbanUser() {
	const queryClient = useQueryClient();

	return useMutation({
		mutationFn: async (userId: string) => {
			return clientUnbanUser({
				userId,
			});
		},
		onSuccess: (_, userId) => {
			queryClient.invalidateQueries({ queryKey: userKeys.lists() });
			queryClient.invalidateQueries({ queryKey: userKeys.detail(userId) });
			queryClient.invalidateQueries({ queryKey: userKeys.stats() });
			toast.success("User unbanned successfully");
		},
		onError: (error: Error) => {
			toast.error(error.message || "Failed to unban user");
		},
	});
}

/**
 * Hook to remove a user
 */
export function useRemoveUser() {
	const queryClient = useQueryClient();

	return useMutation({
		mutationFn: async (userId: string) => {
			return clientRemoveUser({
				userId,
			});
		},
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: userKeys.lists() });
			queryClient.invalidateQueries({ queryKey: userKeys.stats() });
			toast.success("User removed successfully");
		},
		onError: (error: Error) => {
			toast.error(error.message || "Failed to remove user");
		},
	});
}

/**
 * Hook to revoke user session
 */
export function useRevokeUserSession() {
	const queryClient = useQueryClient();

	return useMutation({
		mutationFn: async ({
			sessionToken,
		}: {
			sessionToken: string;
			userId: string;
		}) => {
			return clientRevokeUserSession({
				sessionToken,
			});
		},
		onSuccess: (_, { userId }) => {
			queryClient.invalidateQueries({ queryKey: userKeys.sessions(userId) });
			toast.success("Session revoked successfully");
		},
		onError: (error: Error) => {
			toast.error(error.message || "Failed to revoke session");
		},
	});
}

/**
 * Hook to revoke all user sessions
 */
export function useRevokeUserSessions() {
	const queryClient = useQueryClient();

	return useMutation({
		mutationFn: async (userId: string) => {
			return clientRevokeUserSessions({
				userId,
			});
		},
		onSuccess: (_, userId) => {
			queryClient.invalidateQueries({ queryKey: userKeys.sessions(userId) });
			toast.success("All sessions revoked successfully");
		},
		onError: (error: Error) => {
			toast.error(error.message || "Failed to revoke sessions");
		},
	});
}

/**
 * Hook to impersonate a user
 */
export function useImpersonateUser() {
	return useMutation({
		mutationFn: async (userId: string) => {
			return clientImpersonateUser({
				userId,
			});
		},
		onSuccess: () => {
			toast.success("User impersonation started");
			// Reload the page to reflect the impersonation
			window.location.reload();
		},
		onError: (error: Error) => {
			toast.error(error.message || "Failed to impersonate user");
		},
	});
}

/**
 * Hook to stop impersonating
 */
export function useStopImpersonating() {
	return useMutation({
		mutationFn: async () => {
			return clientStopImpersonating();
		},
		onSuccess: () => {
			toast.success("Impersonation stopped");
			// Reload the page to reflect the change
			window.location.reload();
		},
		onError: (error: Error) => {
			toast.error(error.message || "Failed to stop impersonation");
		},
	});
}

/**
 * Hook to check user permissions
 */
export function useHasPermission() {
	return useMutation({
		mutationFn: async (permissions: Record<string, string[]>) => {
			return clientHasPermission({
				permissions,
			});
		},
	});
}

/**
 * Hook to check role permissions
 */
export function useCheckRolePermission() {
	return useMutation({
		mutationFn: async ({
			role,
			permissions,
		}: {
			role: string;
			permissions: Record<string, string[]>;
		}) => {
			return clientCheckRolePermission({
				role: role as "user" | "admin" | "moderator" | "superadmin",
				permissions,
			});
		},
	});
}
