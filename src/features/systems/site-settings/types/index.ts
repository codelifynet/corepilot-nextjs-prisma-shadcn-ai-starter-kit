/**
 * Site Settings Types - Barrel Exports
 */

// Main types
export * from './site-settings.types';
export * from './api.types';

// Re-export commonly used types for convenience
export type {
  SiteSettings,
  SiteSettingsUpdateData,
  BasicSiteInfo,
  ContactInfo,
  SocialMediaUrls,
  SeoMetaSettings,
  AnalyticsSettings,
  MaintenanceSettings,
  AuthSecuritySettings,
  PerformanceSettings,
  SecuritySettings,
  SelectOption
} from './site-settings.types';

export type {
  ApiResponse,
  GetSiteSettingsResponse,
  UpdateSiteSettingsResponse,
  UpdateSiteSettingsRequest,
  ValidationError,
  ValidationErrorResponse,
  FormState,
  UseSiteSettingsReturn,
  UseUpdateSiteSettingsReturn
} from './api.types';