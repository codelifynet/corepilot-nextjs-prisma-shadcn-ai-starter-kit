/**
 * Site Settings Types
 * Based on Prisma SiteSettings model
 */

// Enums from Prisma schema
export enum SiteLanguage {
  TR = 'TR',
  EN = 'EN',
  DE = 'DE',
  FR = 'FR',
  ES = 'ES'
}

export enum SiteCurrency {
  TRY = 'TRY',
  USD = 'USD',
  EUR = 'EUR',
  GBP = 'GBP'
}

export enum DateFormat {
  DD_MM_YYYY = 'DD_MM_YYYY',
  MM_DD_YYYY = 'MM_DD_YYYY',
  YYYY_MM_DD = 'YYYY_MM_DD'
}

export enum TimeFormat {
  TWELVE_HOUR = 'TWELVE_HOUR',
  TWENTY_FOUR_HOUR = 'TWENTY_FOUR_HOUR'
}

export enum MaintenanceType {
  SCHEDULED = 'SCHEDULED',
  EMERGENCY = 'EMERGENCY',
  UPGRADE = 'UPGRADE'
}

// Main SiteSettings interface
export interface SiteSettings {
  id: string;
  createdAt: Date;
  updatedAt: Date;
  
  // Basic Site Information
  siteName: string;
  siteDescription?: string;
  siteUrl?: string;
  adminEmail?: string;
  timezone: string;
  language: SiteLanguage;
  currency: SiteCurrency;
  dateFormat: DateFormat;
  timeFormat: TimeFormat;
  
  // Contact Information
  contactEmail?: string;
  contactPhone?: string;
  contactAddress?: string;
  businessHours?: string;
  supportEmail?: string;
  
  // Social Media URLs
  facebookUrl?: string;
  twitterUrl?: string;
  instagramUrl?: string;
  linkedinUrl?: string;
  youtubeUrl?: string;
  githubUrl?: string;
  
  // SEO & Meta
  metaTitle?: string;
  metaDescription?: string;
  metaKeywords?: string;
  ogTitle?: string;
  ogDescription?: string;
  ogImage?: string;
  twitterCard?: string;
  robotsTxt?: string;
  
  // Analytics
  analyticsId?: string;
  gtmId?: string;
  
  // Maintenance
  maintenanceMode: boolean;
  maintenanceType: MaintenanceType;
  maintenanceMessage?: string;
  maintenanceStartAt?: Date | null;
  maintenanceEndAt?: Date | null;
  
  // Authentication & Security
  allowRegistration: boolean;
  requireEmailVerification: boolean;
  sessionTimeout: number;
  passwordMinLength: number;
  enableTwoFactor: boolean;
  
  // Performance & Caching
  cacheEnabled: boolean;
  cacheTtl: number;
  maxFileSize: number;
  
  // Logging
  enableLogging: boolean;
  logLevel: 'error' | 'warn' | 'info' | 'debug';
  backupEnabled: boolean;
  backupFrequency: 'hourly' | 'daily' | 'weekly' | 'monthly';
  
  // Security & Rate Limiting
  enableRateLimit: boolean;
  rateLimitRequests: number;
  rateLimitWindow: number;
  enableCors: boolean;
  corsOrigins?: string;
  enableCsp: boolean;
  cspDirectives?: string;
  enableHsts: boolean;
}

// Form data interfaces for different sections
export interface BasicSiteInfo {
  siteName: string;
  siteDescription?: string;
  siteUrl?: string;
  adminEmail?: string;
  timezone: string;
  language: SiteLanguage;
  currency: SiteCurrency;
  dateFormat: DateFormat;
  timeFormat: TimeFormat;
}

export interface ContactInfo {
  contactEmail?: string;
  contactPhone?: string;
  contactAddress?: string;
  businessHours?: string;
  supportEmail?: string;
}

export interface SocialMediaUrls {
  facebookUrl?: string;
  twitterUrl?: string;
  instagramUrl?: string;
  linkedinUrl?: string;
  youtubeUrl?: string;
  githubUrl?: string;
}

export interface SeoMetaSettings {
  metaTitle?: string;
  metaDescription?: string;
  metaKeywords?: string;
  ogTitle?: string;
  ogDescription?: string;
  ogImage?: string;
  twitterCard?: string;
  robotsTxt?: string;
}

export interface AnalyticsSettings {
  analyticsId?: string;
  gtmId?: string;
}

export interface MaintenanceSettings {
  maintenanceMode: boolean;
  maintenanceType: MaintenanceType;
  maintenanceMessage?: string;
  maintenanceStartAt?: Date | null;
  maintenanceEndAt?: Date | null;
}

export interface AuthSecuritySettings {
  allowRegistration: boolean;
  requireEmailVerification: boolean;
  sessionTimeout: number;
  passwordMinLength: number;
  enableTwoFactor: boolean;
}

export interface PerformanceSettings {
  cacheEnabled: boolean;
  cacheTtl: number;
  maxFileSize: number;
  enableLogging: boolean;
  logLevel: 'error' | 'warn' | 'info' | 'debug';
  backupEnabled: boolean;
  backupFrequency: 'hourly' | 'daily' | 'weekly' | 'monthly';
}

export interface SecuritySettings {
  enableRateLimit: boolean;
  rateLimitRequests: number;
  rateLimitWindow: number;
  enableCors: boolean;
  corsOrigins?: string;
  enableCsp: boolean;
  cspDirectives?: string;
  enableHsts: boolean;
}

// Update form data type
export type SiteSettingsUpdateData = Partial<Omit<SiteSettings, 'id' | 'createdAt' | 'updatedAt'>>;

// Display options for dropdowns
export interface SelectOption {
  value: string;
  label: string;
}

export const LANGUAGE_OPTIONS: SelectOption[] = [
  { value: SiteLanguage.TR, label: 'Türkçe' },
  { value: SiteLanguage.EN, label: 'English' },
  { value: SiteLanguage.DE, label: 'Deutsch' },
  { value: SiteLanguage.FR, label: 'Français' },
  { value: SiteLanguage.ES, label: 'Español' }
];

export const CURRENCY_OPTIONS: SelectOption[] = [
  { value: SiteCurrency.TRY, label: 'Turkish Lira (₺)' },
  { value: SiteCurrency.USD, label: 'US Dollar ($)' },
  { value: SiteCurrency.EUR, label: 'Euro (€)' },
  { value: SiteCurrency.GBP, label: 'British Pound (£)' }
];

export const DATE_FORMAT_OPTIONS: SelectOption[] = [
  { value: DateFormat.DD_MM_YYYY, label: 'DD/MM/YYYY' },
  { value: DateFormat.MM_DD_YYYY, label: 'MM/DD/YYYY' },
  { value: DateFormat.YYYY_MM_DD, label: 'YYYY-MM-DD' }
];

export const TIME_FORMAT_OPTIONS: SelectOption[] = [
  { value: TimeFormat.TWELVE_HOUR, label: '12 Hour (AM/PM)' },
  { value: TimeFormat.TWENTY_FOUR_HOUR, label: '24 Hour' }
];

export const MAINTENANCE_TYPE_OPTIONS: SelectOption[] = [
  { value: MaintenanceType.SCHEDULED, label: 'Scheduled Maintenance' },
  { value: MaintenanceType.EMERGENCY, label: 'Emergency Maintenance' },
  { value: MaintenanceType.UPGRADE, label: 'System Upgrade' }
];

export const LOG_LEVEL_OPTIONS: SelectOption[] = [
  { value: 'error', label: 'Error Only' },
  { value: 'warn', label: 'Warning & Error' },
  { value: 'info', label: 'Info, Warning & Error' },
  { value: 'debug', label: 'All Logs (Debug)' }
];

export const BACKUP_FREQUENCY_OPTIONS: SelectOption[] = [
  { value: 'hourly', label: 'Every Hour' },
  { value: 'daily', label: 'Daily' },
  { value: 'weekly', label: 'Weekly' },
  { value: 'monthly', label: 'Monthly' }
];

// Form Props Interfaces
export interface BasicSiteInfoFormProps {
  initialData?: SiteSettings | null;
  onChange?: () => void;
}

export interface ContactInfoFormProps {
  initialData?: SiteSettings | null;
  onChange?: () => void;
}

export interface AnalyticsFormProps {
  initialData?: SiteSettings | null;
  onChange?: () => void;
}

export interface MaintenanceFormProps {
  initialData?: SiteSettings | null;
  onChange?: () => void;
}

export interface AuthSecurityFormProps {
  initialData?: SiteSettings | null;
  onChange?: () => void;
}

export interface PerformanceFormProps {
  initialData?: SiteSettings | null;
  onChange?: () => void;
}

export interface SecurityFormProps {
  initialData?: SiteSettings | null;
  onChange?: () => void;
}