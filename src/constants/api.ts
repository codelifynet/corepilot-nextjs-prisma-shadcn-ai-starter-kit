/**
 * API Endpoints Constants
 * All API route paths should be defined here for centralized management
 */

// Base API path
export const API_BASE = "/api";

// Authentication API routes
export const AUTH_API = {
	LOGIN: `${API_BASE}/auth/login`,
	REGISTER: `${API_BASE}/auth/register`,
	LOGOUT: `${API_BASE}/auth/logout`,
	VERIFY_EMAIL: `${API_BASE}/auth/verify-email`,
	RESET_PASSWORD: `${API_BASE}/auth/reset-password`,
	PROFILE: `${API_BASE}/auth/profile`,
} as const;

// User Management API routes
export const USERS_API = {
	BASE: `${API_BASE}/users`,
	BY_ID: (id: string) => `${API_BASE}/users/${id}`,
	STATS: `${API_BASE}/users/stats`,
} as const;

// Admin API routes
export const ADMIN_API = {
	DASHBOARD: `${API_BASE}/admin/dashboard`,
	USERS: `${API_BASE}/admin/users`,
	SETTINGS: `${API_BASE}/admin/settings`,
	STATS: `${API_BASE}/admin/stats`,
	ROLES: `${API_BASE}/admin/roles`,
	PERMISSIONS: `${API_BASE}/admin/permissions`,
	PERMISSIONS_STATS: `${API_BASE}/admin/permissions/stats`,
} as const;

// Support API routes
export const SUPPORT_API = {
	TICKETS: `${API_BASE}/support/tickets`,
	TICKET_BY_ID: (id: string) => `${API_BASE}/support/tickets/${id}`,
	TICKET_REPLIES: (ticketId: string) =>
		`${API_BASE}/support/tickets/${ticketId}/replies`,
	KNOWLEDGE_BASE: `${API_BASE}/support/knowledge-base`,
	KNOWLEDGE_BASE_BY_ID: (id: string) =>
		`${API_BASE}/support/knowledge-base/${id}`,
	KNOWLEDGE_BASE_BY_SLUG: (slug: string) =>
		`${API_BASE}/support/knowledge-base/slug/${slug}`,
	FAQS: `${API_BASE}/support/faqs`,
	FAQ_BY_ID: (id: string) => `${API_BASE}/support/faqs/${id}`,
	ATTACHMENTS: `${API_BASE}/support/attachments`,
	STATS: `${API_BASE}/support/stats`,
} as const;

// Finance API routes
export const FINANCE_API = {
	// Payment processing
	PAYMENTS: `${API_BASE}/finance/payments`,
	PAYMENT_BY_ID: (id: string) => `${API_BASE}/finance/payments/${id}`,
	PAYMENT_INTENT: `${API_BASE}/finance/payment-intent`,
	PROCESS_PAYMENT: `${API_BASE}/finance/process-payment`,

	// Subscription management
	SUBSCRIPTIONS: `${API_BASE}/finance/subscriptions`,
	SUBSCRIPTION_BY_ID: (id: string) => `${API_BASE}/finance/subscriptions/${id}`,
	SUBSCRIPTION_PLANS: `${API_BASE}/finance/subscription-plans`,
	CANCEL_SUBSCRIPTION: (id: string) =>
		`${API_BASE}/finance/subscriptions/${id}/cancel`,

	// Invoice management
	INVOICES: `${API_BASE}/finance/invoices`,
	INVOICE_BY_ID: (id: string) => `${API_BASE}/finance/invoices/${id}`,

	// Payment methods
	PAYMENT_METHODS: `${API_BASE}/finance/payment-methods`,
	PAYMENT_METHOD_BY_ID: (id: string) =>
		`${API_BASE}/finance/payment-methods/${id}`,

	// Provider settings
	PROVIDER_SETTINGS: `${API_BASE}/finance/provider-settings`,
	TEST_PROVIDER: `${API_BASE}/finance/test-provider`,

	// Analytics
	FINANCIAL_METRICS: `${API_BASE}/finance/metrics`,
	REVENUE_ANALYTICS: `${API_BASE}/finance/analytics/revenue`,

	// Webhooks
	PADDLE_WEBHOOK: `${API_BASE}/finance/webhooks/paddle`,
	STRIPE_WEBHOOK: `${API_BASE}/finance/webhooks/stripe`,
	PAYPAL_WEBHOOK: `${API_BASE}/finance/webhooks/paypal`,
} as const;

// Products API routes
export const PRODUCTS_API = {
	BASE: `${API_BASE}/products`,
	BY_ID: (id: string) => `${API_BASE}/products/${id}`,
	STATS: `${API_BASE}/products/stats`,
	PADDLE: {
		BASE: `${API_BASE}/paddle/products`,
		BY_ID: (id: string) => `${API_BASE}/paddle/products/${id}`,
		STATS: `${API_BASE}/paddle/products/stats`,
	},
} as const;

// External API endpoints
export const EXTERNAL_API = {
	PADDLE: {
		SANDBOX: {
			BASE: "https://sandbox-api.paddle.com",
			CHECKOUT: "https://sandbox-checkout.paddle.com",
			PRODUCTS: "https://sandbox-api.paddle.com/products",
			PRICES: "https://sandbox-api.paddle.com/prices",
			SUBSCRIPTIONS: "https://sandbox-api.paddle.com/subscriptions",
			TRANSACTIONS: "https://sandbox-api.paddle.com/transactions",
			CUSTOMERS: "https://sandbox-api.paddle.com/customers",
		},
		PRODUCTION: {
			BASE: "https://api.paddle.com",
			CHECKOUT: "https://checkout.paddle.com",
			PRODUCTS: "https://api.paddle.com/products",
			PRICES: "https://api.paddle.com/prices",
			SUBSCRIPTIONS: "https://api.paddle.com/subscriptions",
			TRANSACTIONS: "https://api.paddle.com/transactions",
			CUSTOMERS: "https://api.paddle.com/customers",
		},
	},
	STRIPE: {
		BASE: "https://api.stripe.com/v1",
		PAYMENT_INTENTS: "https://api.stripe.com/v1/payment_intents",
		SUBSCRIPTIONS: "https://api.stripe.com/v1/subscriptions",
		CUSTOMERS: "https://api.stripe.com/v1/customers",
		PRODUCTS: "https://api.stripe.com/v1/products",
		PRICES: "https://api.stripe.com/v1/prices",
	},
	PAYPAL: {
		SANDBOX: {
			BASE: "https://api.sandbox.paypal.com",
			ORDERS: "https://api.sandbox.paypal.com/v2/checkout/orders",
			SUBSCRIPTIONS: "https://api.sandbox.paypal.com/v1/billing/subscriptions",
		},
		PRODUCTION: {
			BASE: "https://api.paypal.com",
			ORDERS: "https://api.paypal.com/v2/checkout/orders",
			SUBSCRIPTIONS: "https://api.paypal.com/v1/billing/subscriptions",
		},
	},
} as const;
