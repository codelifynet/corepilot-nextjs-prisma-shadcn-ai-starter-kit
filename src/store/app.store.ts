"use client";

import { create } from "zustand";
import { devtools, persist } from "zustand/middleware";

interface AppState {
	// Global app state
	theme: "light" | "dark" | "system";
	sidebarCollapsed: boolean;
	notifications: Notification[];
	user: User | null;

	// Global loading states
	globalLoading: boolean;

	// Actions
	setTheme: (theme: "light" | "dark" | "system") => void;
	toggleSidebar: () => void;
	setSidebarCollapsed: (collapsed: boolean) => void;
	addNotification: (
		notification: Omit<Notification, "id" | "timestamp">,
	) => void;
	removeNotification: (id: string) => void;
	clearNotifications: () => void;
	setUser: (user: User | null) => void;
	setGlobalLoading: (loading: boolean) => void;
}

interface Notification {
	id: string;
	title: string;
	message: string;
	type: "info" | "success" | "warning" | "error";
	timestamp: Date;
	read: boolean;
}

interface User {
	id: string;
	name: string;
	email: string;
	role: string;
	avatar?: string;
}

const initialState = {
	theme: "system" as const,
	sidebarCollapsed: false,
	notifications: [],
	user: null,
	globalLoading: false,
};

export const useAppStore = create<AppState>()(
	devtools(
		persist(
			(set) => ({
				...initialState,

				setTheme: (theme) => {
					set({ theme }, false, "app/setTheme");
				},

				toggleSidebar: () => {
					set(
						(state) => ({ sidebarCollapsed: !state.sidebarCollapsed }),
						false,
						"app/toggleSidebar",
					);
				},

				setSidebarCollapsed: (collapsed) => {
					set(
						{ sidebarCollapsed: collapsed },
						false,
						"app/setSidebarCollapsed",
					);
				},

				addNotification: (notification) => {
					const newNotification: Notification = {
						...notification,
						id: crypto.randomUUID(),
						timestamp: new Date(),
						read: false,
					};

					set(
						(state) => ({
							notifications: [newNotification, ...state.notifications],
						}),
						false,
						"app/addNotification",
					);
				},

				removeNotification: (id) => {
					set(
						(state) => ({
							notifications: state.notifications.filter((n) => n.id !== id),
						}),
						false,
						"app/removeNotification",
					);
				},

				clearNotifications: () => {
					set({ notifications: [] }, false, "app/clearNotifications");
				},

				setUser: (user) => {
					set({ user }, false, "app/setUser");
				},

				setGlobalLoading: (loading) => {
					set({ globalLoading: loading }, false, "app/setGlobalLoading");
				},
			}),
			{
				name: "app-store",
				partialize: (state) => ({
					theme: state.theme,
					sidebarCollapsed: state.sidebarCollapsed,
					user: state.user,
				}),
			},
		),
		{
			name: "app-store",
		},
	),
);

// Selectors for better performance
export const useTheme = () => useAppStore((state) => state.theme);
export const useSidebarCollapsed = () =>
	useAppStore((state) => state.sidebarCollapsed);
export const useNotifications = () =>
	useAppStore((state) => state.notifications);
export const useUser = () => useAppStore((state) => state.user);
export const useGlobalLoading = () =>
	useAppStore((state) => state.globalLoading);

export const useAppActions = () =>
	useAppStore((state) => ({
		setTheme: state.setTheme,
		toggleSidebar: state.toggleSidebar,
		setSidebarCollapsed: state.setSidebarCollapsed,
		addNotification: state.addNotification,
		removeNotification: state.removeNotification,
		clearNotifications: state.clearNotifications,
		setUser: state.setUser,
		setGlobalLoading: state.setGlobalLoading,
	}));
