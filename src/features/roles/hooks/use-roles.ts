import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import type {
	Role,
	RoleWithRelations,
	CreateRoleInput,
	UpdateRoleInput,
	RoleFilters,
	RoleStats,
} from "../types";
import { API_ENDPOINTS } from "../constants";

// Query keys for roles
export const roleKeys = {
	all: ["roles"] as const,
	lists: () => [...roleKeys.all, "list"] as const,
	list: (params: RoleFilters) => [...roleKeys.lists(), params] as const,
	details: () => [...roleKeys.all, "detail"] as const,
	detail: (id: string) => [...roleKeys.details(), id] as const,
	stats: () => [...roleKeys.all, "stats"] as const,
};

/**
 * Hook to list roles with filters and pagination
 */
export function useRoles(params: RoleFilters & { page?: number; limit?: number } = {}) {
	return useQuery({
		queryKey: roleKeys.list(params),
		queryFn: async (): Promise<{
			roles: Role[];
			pagination: {
				page: number;
				limit: number;
				total: number;
				totalPages: number;
				hasNext: boolean;
				hasPrev: boolean;
			};
		}> => {
			// Build query parameters
			const searchParams = new URLSearchParams();

			if (params.search) searchParams.append("search", params.search);
			if (params.isActive !== undefined)
				searchParams.append("isActive", params.isActive.toString());
			if (params.isSystem !== undefined)
				searchParams.append("isSystem", params.isSystem.toString());
			if (params.sortBy) searchParams.append("sortBy", params.sortBy);
			if (params.sortOrder) searchParams.append("sortOrder", params.sortOrder);
			if (params.createdAfter)
				searchParams.append("createdAfter", params.createdAfter.toISOString());
			if (params.createdBefore)
				searchParams.append(
					"createdBefore",
					params.createdBefore.toISOString(),
				);
			if (params.page) searchParams.append("page", params.page.toString());
			if (params.limit) searchParams.append("limit", params.limit.toString());

			const response = await fetch(
				`${API_ENDPOINTS.ROLES}?${searchParams.toString()}`,
				{
					method: "GET",
					headers: {
						"Content-Type": "application/json",
					},
				},
			);

			if (!response.ok) {
				const errorData = await response.text();
				console.error("Roles API error:", errorData);
				throw new Error("Failed to fetch roles");
			}

			const data = await response.json();
			
			// Return the data in the expected format
			return {
				roles: data.data,
				pagination: data.pagination,
			};
		},
	});
}

/**
 * Hook to get role by ID
 */
export function useRole(id: string) {
	return useQuery({
		queryKey: roleKeys.detail(id),
		queryFn: async (): Promise<RoleWithRelations> => {
			const response = await fetch(`${API_ENDPOINTS.ROLES}/${id}`);

			if (!response.ok) {
				throw new Error("Failed to fetch role");
			}

			return response.json();
		},
		enabled: !!id,
	});
}

/**
 * Hook to get role statistics
 */
export function useRoleStats() {
	return useQuery({
		queryKey: roleKeys.stats(),
		queryFn: async (): Promise<RoleStats> => {
			const response = await fetch(API_ENDPOINTS.STATS.ROLES);

			if (!response.ok) {
				throw new Error("Failed to fetch role stats");
			}

			return response.json();
		},
	});
}

/**
 * Hook to create a role
 */
export function useCreateRole() {
	const queryClient = useQueryClient();

	return useMutation({
		mutationFn: async (data: CreateRoleInput): Promise<Role> => {
			const response = await fetch(API_ENDPOINTS.ROLES, {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify(data),
			});

			if (!response.ok) {
				const error = await response.json();
				throw new Error(error.message || "Failed to create role");
			}

			return response.json();
		},
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: roleKeys.lists() });
			queryClient.invalidateQueries({ queryKey: roleKeys.stats() });
			toast.success("Role created successfully");
		},
		onError: (error: Error) => {
			toast.error(error.message || "Failed to create role");
		},
	});
}

/**
 * Hook to update a role
 */
export function useUpdateRole() {
	const queryClient = useQueryClient();

	return useMutation({
		mutationFn: async ({
			id,
			data,
		}: {
			id: string;
			data: UpdateRoleInput;
		}): Promise<Role> => {
			const response = await fetch(`${API_ENDPOINTS.ROLES}/${id}`, {
				method: "PUT",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify(data),
			});

			if (!response.ok) {
				const error = await response.json();
				throw new Error(error.message || "Failed to update role");
			}

			return response.json();
		},
		onSuccess: (data, variables) => {
			queryClient.invalidateQueries({ queryKey: roleKeys.lists() });
			queryClient.invalidateQueries({
				queryKey: roleKeys.detail(variables.id),
			});
			queryClient.invalidateQueries({ queryKey: roleKeys.stats() });
			toast.success("Role updated successfully");
		},
		onError: (error: Error) => {
			toast.error(error.message || "Failed to update role");
		},
	});
}

/**
 * Hook to delete a role
 */
export function useDeleteRole() {
	const queryClient = useQueryClient();

	return useMutation({
		mutationFn: async (id: string): Promise<void> => {
			const response = await fetch(`${API_ENDPOINTS.ROLES}/${id}`, {
				method: "DELETE",
			});

			if (!response.ok) {
				const error = await response.json();
				throw new Error(error.message || "Failed to delete role");
			}
		},
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: roleKeys.lists() });
			queryClient.invalidateQueries({ queryKey: roleKeys.stats() });
			toast.success("Role deleted successfully");
		},
		onError: (error: Error) => {
			toast.error(error.message || "Failed to delete role");
		},
	});
}

/**
 * Hook to toggle role active status
 */
export function useToggleRoleStatus() {
	const queryClient = useQueryClient();

	return useMutation({
		mutationFn: async ({
			id,
			isActive,
		}: {
			id: string;
			isActive: boolean;
		}): Promise<Role> => {
			const response = await fetch(`${API_ENDPOINTS.ROLES}/${id}`, {
				method: "PUT",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({ isActive }),
			});

			if (!response.ok) {
				const error = await response.json();
				throw new Error(error.message || "Failed to toggle role status");
			}

			return response.json();
		},
		onSuccess: (data, variables) => {
			queryClient.invalidateQueries({ queryKey: roleKeys.lists() });
			queryClient.invalidateQueries({
				queryKey: roleKeys.detail(variables.id),
			});
			queryClient.invalidateQueries({ queryKey: roleKeys.stats() });
			toast.success(
				`Role ${variables.isActive ? "activated" : "deactivated"} successfully`,
			);
		},
		onError: (error: Error) => {
			toast.error(error.message || "Failed to toggle role status");
		},
	});
}

/**
 * Hook to check if a role can be deleted
 */
export function useCanDeleteRole(id: string) {
	return useQuery({
		queryKey: [...roleKeys.detail(id), "canDelete"],
		queryFn: async (): Promise<{ canDelete: boolean; reason?: string }> => {
			const response = await fetch(`${API_ENDPOINTS.ROLES}/${id}/can-delete`);

			if (!response.ok) {
				throw new Error("Failed to check if role can be deleted");
			}

			return response.json();
		},
		enabled: !!id,
	});
}

/**
 * Hook to get active roles (for dropdowns, etc.)
 */
export function useActiveRoles() {
	return useQuery({
		queryKey: [...roleKeys.lists(), "active"],
		queryFn: async (): Promise<Role[]> => {
			const response = await fetch(`${API_ENDPOINTS.ROLES}?isActive=true`);

			if (!response.ok) {
				throw new Error("Failed to fetch active roles");
			}

			const data = await response.json();
			return data.roles || [];
		},
	});
}

/**
 * Hook to get system roles
 */
export function useSystemRoles() {
	return useQuery({
		queryKey: [...roleKeys.lists(), "system"],
		queryFn: async (): Promise<Role[]> => {
			const response = await fetch(`${API_ENDPOINTS.ROLES}?isSystem=true`);

			if (!response.ok) {
				throw new Error("Failed to fetch system roles");
			}

			const data = await response.json();
			return data.roles || [];
		},
	});
}

/**
 * Hook to get custom roles (non-system)
 */
export function useCustomRoles() {
	return useQuery({
		queryKey: [...roleKeys.lists(), "custom"],
		queryFn: async (): Promise<Role[]> => {
			const response = await fetch(`${API_ENDPOINTS.ROLES}?isSystem=false`);

			if (!response.ok) {
				throw new Error("Failed to fetch custom roles");
			}

			const data = await response.json();
			return data.roles || [];
		},
	});
}