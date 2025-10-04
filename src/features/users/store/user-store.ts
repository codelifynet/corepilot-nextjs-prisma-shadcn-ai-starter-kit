import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { UserFilters, UserSortField, SortOrder } from "../types";
import { DEFAULT_USER_FILTERS } from "../constants";

interface UserStore {
	// Filters and sorting
	filters: UserFilters;
	sortField: UserSortField;
	sortOrder: SortOrder;
	page: number;
	limit: number;

	// UI state
	selectedUsers: string[];
	showBulkActions: boolean;
	viewMode: "grid" | "table";

	// Actions
	setFilters: (filters: Partial<UserFilters>) => void;
	resetFilters: () => void;
	setSorting: (field: UserSortField, order: SortOrder) => void;
	setPage: (page: number) => void;
	setLimit: (limit: number) => void;
	setSelectedUsers: (userIds: string[]) => void;
	toggleUserSelection: (userId: string) => void;
	clearSelection: () => void;
	setShowBulkActions: (show: boolean) => void;
	setViewMode: (mode: "grid" | "table") => void;
}

export const useUserStore = create<UserStore>()(
	persist(
		(set) => ({
			// Initial state
			filters: {},
			sortField: DEFAULT_USER_FILTERS.sort,
			sortOrder: DEFAULT_USER_FILTERS.order,
			page: DEFAULT_USER_FILTERS.page,
			limit: DEFAULT_USER_FILTERS.limit,
			selectedUsers: [],
			showBulkActions: false,
			viewMode: "table",

			// Actions
			setFilters: (newFilters) =>
				set((state) => ({
					filters: { ...state.filters, ...newFilters },
					page: 1, // Reset page when filters change
				})),

			resetFilters: () =>
				set(() => ({
					filters: {},
					page: 1,
				})),

			setSorting: (field, order) =>
				set(() => ({
					sortField: field,
					sortOrder: order,
					page: 1, // Reset page when sorting changes
				})),

			setPage: (page) => set(() => ({ page })),

			setLimit: (limit) =>
				set(() => ({
					limit,
					page: 1, // Reset page when limit changes
				})),

			setSelectedUsers: (userIds) =>
				set(() => ({
					selectedUsers: userIds,
					showBulkActions: userIds.length > 0,
				})),

			toggleUserSelection: (userId) =>
				set((state) => {
					const isSelected = state.selectedUsers.includes(userId);
					const newSelectedUsers = isSelected
						? state.selectedUsers.filter((id) => id !== userId)
						: [...state.selectedUsers, userId];

					return {
						selectedUsers: newSelectedUsers,
						showBulkActions: newSelectedUsers.length > 0,
					};
				}),

			clearSelection: () =>
				set(() => ({
					selectedUsers: [],
					showBulkActions: false,
				})),

			setShowBulkActions: (show) => set(() => ({ showBulkActions: show })),

			setViewMode: (mode) => set(() => ({ viewMode: mode })),
		}),
		{
			name: "user-store",
			partialize: (state) => ({
				filters: state.filters,
				sortField: state.sortField,
				sortOrder: state.sortOrder,
				limit: state.limit,
				viewMode: state.viewMode,
			}),
		},
	),
);
