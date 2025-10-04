/**
 * Application Path Constants
 * All internal route paths should be defined here for centralized management
 */

// Default redirect paths
export const DEFAULT_REDIRECTS = {
	AFTER_LOGIN: "/admin/overview/dashboard",
	AFTER_LOGOUT: "/login",
	UNAUTHORIZED: "/login",
	NOT_FOUND: "/404",
} as const;

// Public routes
export const PUBLIC_ROUTES = {
	HOME: "/",
	LOGIN: "/login",
	REGISTER: "/auth/register",
	FORGOT_PASSWORD: "/auth/forgot-password",
	RESET_PASSWORD: "/auth/reset-password",
	VERIFY_EMAIL: "/auth/verify-email",
	TERMS: "/legal/terms",
	PRIVACY: "/legal/privacy",
} as const;

// Protected routes
export const PROTECTED_ROUTES = {
	DASHBOARD: "/admin/overview/dashboard", // Default dashboard after login
	PROFILE: "/profile",
	SETTINGS: "/profile/settings",
	CART: "/cart",
	PRODUCTS: "/products",
} as const;

// Admin routes
export const ADMIN_ROUTES = {
	BASE: "/admin",
	OVERVIEW: {
		BASE: "/admin/overview",
		DASHBOARD: "/admin/overview/dashboard",
		ANALYTICS: "/admin/overview/analytics",
	},
	ECOMMERCE: {
		BASE: "/admin/ecommerce",
		PRODUCTS: "/admin/ecommerce/products",
		CATEGORIES: "/admin/ecommerce/categories",
		ORDERS: "/admin/ecommerce/orders",
		INVENTORY: "/admin/ecommerce/inventory",
		COUPONS: "/admin/ecommerce/coupons",
		CAMPAIGNS: "/admin/ecommerce/campaigns",
	},
	USER_MANAGEMENT: {
		BASE: "/admin/user-management",
		CUSTOMERS: "/admin/user-management/customers",
		USERS: "/admin/user-management/users",
		ROLES: "/admin/user-management/roles",
	},
	CONTENT_MANAGEMENT: {
		BASE: "/admin/content-management",
		CONTENT: "/admin/content-management/content",
		PAGES: "/admin/content-management/pages",
		MEDIA: "/admin/content-management/media",
		COMMENTS: "/admin/content-management/comments",
		MENU: "/admin/content-management/menu",
	},
	AI_TOOLS: {
		BASE: "/admin/ai-tools",
		CONTENT_GENERATOR: "/admin/ai-tools/content-generator",
		IMAGE_GENERATOR: "/admin/ai-tools/image-generator",
		CHAT_ASSISTANT: "/admin/ai-tools/chat-assistant",
		SETTINGS: "/admin/ai-tools/settings",
	},
	FINANCE: {
		BASE: "/admin/finance",
		PAYMENTS: "/admin/finance/payments",
		SUBSCRIPTIONS: "/admin/finance/subscriptions",
		SETTINGS: "/admin/finance/settings",
	},
	SYSTEM: {
		BASE: "/admin/system",
		SITE_SETTINGS: "/admin/system/settings/site",
		THEME_SETTINGS: "/admin/system/settings/theme",
		SOCIAL_SETTINGS: "/admin/system/settings/social",
		SEO_SETTINGS: "/admin/system/settings/seo",
		NOTIFICATIONS: "/admin/system/notifications",
		INTEGRATIONS: "/admin/system/integrations",
		LOGS: "/admin/system/logs",
		SUPPORT: {
			BASE: "/admin/system/support",
			DASHBOARD: "/admin/system/support",
			TICKETS: {
				BASE: "/admin/system/support/tickets",
				NEW: "/admin/system/support/tickets/new",
				DETAIL: (id: string) => `/admin/system/support/tickets/${id}`,
				EDIT: (id: string) => `/admin/system/support/tickets/${id}/edit`,
			},
			FAQS: {
				BASE: "/admin/system/support/faqs",
				NEW: "/admin/system/support/faqs/new",
				DETAIL: (id: string) => `/admin/system/support/faqs/${id}`,
				EDIT: (id: string) => `/admin/system/support/faqs/${id}/edit`,
			},
			KNOWLEDGE_BASE: {
				BASE: "/admin/system/support/knowledge-base",
				NEW: "/admin/system/support/knowledge-base/new",
				DETAIL: (id: string) => `/admin/system/support/knowledge-base/${id}`,
				EDIT: (id: string) => `/admin/system/support/knowledge-base/${id}/edit`,
			},
		},
	},
} as const;

// Feature-specific routes
export const AI_TOOLS_ROUTES = {
	DASHBOARD: "/ai-tools",
	CHAT: "/ai-tools/chat",
	MODELS: "/ai-tools/models",
	SETTINGS: "/ai-tools/settings",
	ANALYTICS: "/ai-tools/analytics",
} as const;

// Dynamic route builders
export const DYNAMIC_ROUTES = {
	USER_PROFILE: (id: string) => `/users/${id}`,
	PRODUCT_DETAIL: (id: string) => `/products/${id}`,
	ORDER_DETAIL: (id: string) => `/orders/${id}`,
	EDIT_USER: (id: string) => `/admin/users/${id}/edit`,
	EDIT_PRODUCT: (id: string) => `/admin/products/${id}/edit`,
} as const;

// Route arrays for middleware and navigation
export const PUBLIC_ROUTE_LIST = Object.values(PUBLIC_ROUTES);
export const PROTECTED_ROUTE_LIST = Object.values(PROTECTED_ROUTES);
export const ADMIN_ROUTE_LIST = Object.values(ADMIN_ROUTES);
