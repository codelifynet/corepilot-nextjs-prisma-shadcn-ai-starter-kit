/**
 * Site Settings API Types
 * Request and Response types for Site Settings API endpoints
 */

import type {
	SiteSettings,
	SiteSettingsUpdateData,
} from "./site-settings.types";

// Base API Response structure
export interface ApiResponse<T = unknown> {
	success: boolean;
	data?: T;
	error?: string;
	message?: string;
}

// Site Settings API Responses
export type GetSiteSettingsResponse = ApiResponse<SiteSettings>;

export type UpdateSiteSettingsResponse = ApiResponse<SiteSettings>;

// Site Settings API Requests
export interface UpdateSiteSettingsRequest {
	data: SiteSettingsUpdateData;
}

// Validation error structure
export interface ValidationError {
	field: string;
	message: string;
	code?: string;
}

export interface ValidationErrorResponse extends ApiResponse {
	success: false;
	error: string;
	validationErrors?: ValidationError[];
}

// API Error types
export type SiteSettingsApiError =
	| "SETTINGS_NOT_FOUND"
	| "VALIDATION_ERROR"
	| "UNAUTHORIZED"
	| "INTERNAL_ERROR"
	| "INVALID_REQUEST";

// Form submission states
export interface FormState {
	isLoading: boolean;
	isSubmitting: boolean;
	error?: string;
	success?: boolean;
	lastUpdated?: Date;
}

// Section-specific update requests
export interface UpdateBasicInfoRequest {
	siteName: string;
	siteDescription?: string;
	siteUrl?: string;
	adminEmail?: string;
	timezone: string;
	language: string;
	currency: string;
	dateFormat: string;
	timeFormat: string;
}

export interface UpdateContactInfoRequest {
	contactEmail?: string;
	contactPhone?: string;
	contactAddress?: string;
	businessHours?: string;
	supportEmail?: string;
}

export interface UpdateSocialMediaRequest {
	facebookUrl?: string;
	twitterUrl?: string;
	instagramUrl?: string;
	linkedinUrl?: string;
	youtubeUrl?: string;
	githubUrl?: string;
}

export interface UpdateSeoMetaRequest {
	metaTitle?: string;
	metaDescription?: string;
	metaKeywords?: string;
	ogTitle?: string;
	ogDescription?: string;
	ogImage?: string;
	twitterCard?: string;
	robotsTxt?: string;
}

export interface UpdateAnalyticsRequest {
	analyticsId?: string;
	gtmId?: string;
}

export interface UpdateMaintenanceRequest {
	maintenanceMode: boolean;
	maintenanceType: string;
	maintenanceMessage?: string;
	maintenanceStartAt?: string; // ISO string
	maintenanceEndAt?: string; // ISO string
}

export interface UpdateAuthSecurityRequest {
	allowRegistration: boolean;
	requireEmailVerification: boolean;
	sessionTimeout: number;
	passwordMinLength: number;
	enableTwoFactor: boolean;
}

export interface UpdatePerformanceRequest {
	cacheEnabled: boolean;
	cacheTtl: number;
	maxFileSize: number;
	enableLogging: boolean;
	logLevel: string;
	backupEnabled: boolean;
	backupFrequency: string;
}

export interface UpdateSecurityRequest {
	enableRateLimit: boolean;
	rateLimitRequests: number;
	rateLimitWindow: number;
	enableCors: boolean;
	corsOrigins?: string;
	enableCsp: boolean;
	cspDirectives?: string;
	enableHsts: boolean;
}

// Bulk update request (for updating multiple sections at once)
export interface BulkUpdateSiteSettingsRequest {
	basicInfo?: UpdateBasicInfoRequest;
	contactInfo?: UpdateContactInfoRequest;
	socialMedia?: UpdateSocialMediaRequest;
	seoMeta?: UpdateSeoMetaRequest;
	analytics?: UpdateAnalyticsRequest;
	maintenance?: UpdateMaintenanceRequest;
	authSecurity?: UpdateAuthSecurityRequest;
	performance?: UpdatePerformanceRequest;
	security?: UpdateSecurityRequest;
}

// API endpoint paths (will be used in services)
export const SITE_SETTINGS_ENDPOINTS = {
	GET: "/api/site-settings",
	UPDATE: "/api/site-settings",
	BULK_UPDATE: "/api/site-settings/bulk",
	RESET: "/api/site-settings/reset",
	EXPORT: "/api/site-settings/export",
	IMPORT: "/api/site-settings/import",
} as const;

// HTTP Methods
export type HttpMethod = "GET" | "POST" | "PUT" | "PATCH" | "DELETE";

// Generic API request configuration
export interface ApiRequestConfig {
	method: HttpMethod;
	endpoint: string;
	data?: unknown;
	headers?: Record<string, string>;
}

// API Hook return types
export interface UseSiteSettingsReturn {
	data: SiteSettings | null;
	isLoading: boolean;
	error: string | null;
	refetch: () => Promise<void>;
}

export interface UseUpdateSiteSettingsReturn {
	updateSettings: (data: SiteSettingsUpdateData) => Promise<void>;
	isUpdating: boolean;
	error: string | null;
	success: boolean;
	reset: () => void;
}
