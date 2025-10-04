/**
 * Site Settings Zod Validation Schemas
 */

import { z } from 'zod';
import {
  SiteLanguage,
  SiteCurrency,
  DateFormat,
  TimeFormat,
  MaintenanceType
} from '../types/site-settings.types';

// Enum schemas
export const siteLanguageSchema = z.nativeEnum(SiteLanguage);
export const siteCurrencySchema = z.nativeEnum(SiteCurrency);
export const dateFormatSchema = z.nativeEnum(DateFormat);
export const timeFormatSchema = z.nativeEnum(TimeFormat);
export const maintenanceTypeSchema = z.nativeEnum(MaintenanceType);

// Basic validation helpers
const urlSchema = z.string().url().optional().or(z.literal(''));
const emailSchema = z.string().email().optional().or(z.literal(''));
const phoneSchema = z.string().min(10).max(20).optional().or(z.literal(''));
const positiveIntSchema = z.number().int().positive();

// Basic Site Information Schema
export const basicSiteInfoSchema = z.object({
  siteName: z.string().min(1, 'Site name is required').max(100, 'Site name must be less than 100 characters'),
  siteDescription: z.string().max(500, 'Description must be less than 500 characters').optional().or(z.literal('')),
  siteUrl: urlSchema,
  adminEmail: emailSchema,
  timezone: z.string().min(1, 'Timezone is required'),
  language: siteLanguageSchema,
  currency: siteCurrencySchema,
  dateFormat: dateFormatSchema,
  timeFormat: timeFormatSchema
});

// Contact Information Schema
export const contactInfoSchema = z.object({
  contactEmail: emailSchema,
  contactPhone: phoneSchema,
  contactAddress: z.string().max(500, 'Address must be less than 500 characters').optional().or(z.literal('')),
  businessHours: z.string().max(200, 'Business hours must be less than 200 characters').optional().or(z.literal('')),
  supportEmail: emailSchema
});

// Social Media URLs Schema
export const socialMediaUrlsSchema = z.object({
  facebookUrl: urlSchema,
  twitterUrl: urlSchema,
  instagramUrl: urlSchema,
  linkedinUrl: urlSchema,
  youtubeUrl: urlSchema,
  githubUrl: urlSchema
});

// SEO & Meta Settings Schema
export const seoMetaSettingsSchema = z.object({
  metaTitle: z.string().max(60, 'Meta title should be less than 60 characters').optional().or(z.literal('')),
  metaDescription: z.string().max(160, 'Meta description should be less than 160 characters').optional().or(z.literal('')),
  metaKeywords: z.string().max(500, 'Meta keywords must be less than 500 characters').optional().or(z.literal('')),
  ogTitle: z.string().max(60, 'OG title should be less than 60 characters').optional().or(z.literal('')),
  ogDescription: z.string().max(160, 'OG description should be less than 160 characters').optional().or(z.literal('')),
  ogImage: urlSchema,
  twitterCard: z.string().max(100).optional().or(z.literal('')),
  robotsTxt: z.string().max(2000, 'Robots.txt must be less than 2000 characters').optional().or(z.literal(''))
});

// Analytics Settings Schema
export const analyticsSettingsSchema = z.object({
  analyticsId: z.string().max(50, 'Analytics ID must be less than 50 characters').optional().or(z.literal('')),
  gtmId: z.string().max(50, 'GTM ID must be less than 50 characters').optional().or(z.literal(''))
});

// Maintenance Settings Schema
export const maintenanceSettingsSchema = z.object({
  maintenanceMode: z.boolean(),
  maintenanceType: maintenanceTypeSchema,
  maintenanceMessage: z.string().max(1000, 'Maintenance message must be less than 1000 characters').optional().or(z.literal('')),
  maintenanceStartAt: z.date().optional().nullable(),
  maintenanceEndAt: z.date().optional().nullable()
}).refine((data) => {
  if (data.maintenanceStartAt && data.maintenanceEndAt) {
    return data.maintenanceEndAt > data.maintenanceStartAt;
  }
  return true;
}, {
  message: 'Maintenance end time must be after start time',
  path: ['maintenanceEndAt']
});

// Authentication & Security Settings Schema
export const authSecuritySettingsSchema = z.object({
  allowRegistration: z.boolean(),
  requireEmailVerification: z.boolean(),
  sessionTimeout: positiveIntSchema.min(5, 'Session timeout must be at least 5 minutes').max(1440, 'Session timeout cannot exceed 24 hours'),
  passwordMinLength: positiveIntSchema.min(6, 'Password minimum length must be at least 6').max(50, 'Password minimum length cannot exceed 50'),
  enableTwoFactor: z.boolean()
});

// Performance Settings Schema
export const performanceSettingsSchema = z.object({
  cacheEnabled: z.boolean(),
  cacheTtl: positiveIntSchema.min(60, 'Cache TTL must be at least 60 seconds').max(86400, 'Cache TTL cannot exceed 24 hours'),
  maxFileSize: positiveIntSchema.min(1, 'Max file size must be at least 1 MB').max(100, 'Max file size cannot exceed 100 MB'),
  enableLogging: z.boolean(),
  logLevel: z.enum(['error', 'warn', 'info', 'debug']),
  backupEnabled: z.boolean(),
  backupFrequency: z.enum(['hourly', 'daily', 'weekly', 'monthly'])
});

// Security Settings Schema
export const securitySettingsSchema = z.object({
  enableRateLimit: z.boolean(),
  rateLimitRequests: positiveIntSchema.min(10, 'Rate limit requests must be at least 10').max(10000, 'Rate limit requests cannot exceed 10000'),
  rateLimitWindow: positiveIntSchema.min(60, 'Rate limit window must be at least 60 seconds').max(3600, 'Rate limit window cannot exceed 1 hour'),
  enableCors: z.boolean(),
  corsOrigins: z.string().max(1000, 'CORS origins must be less than 1000 characters').optional().or(z.literal('')),
  enableCsp: z.boolean(),
  cspDirectives: z.string().max(2000, 'CSP directives must be less than 2000 characters').optional().or(z.literal('')),
  enableHsts: z.boolean()
});

// Complete Site Settings Schema
export const siteSettingsSchema = z.object({
  id: z.string().cuid(),
  createdAt: z.date(),
  updatedAt: z.date(),
  ...basicSiteInfoSchema.shape,
  ...contactInfoSchema.shape,
  ...socialMediaUrlsSchema.shape,
  ...seoMetaSettingsSchema.shape,
  ...analyticsSettingsSchema.shape,
  ...maintenanceSettingsSchema.shape,
  ...authSecuritySettingsSchema.shape,
  ...performanceSettingsSchema.shape,
  ...securitySettingsSchema.shape
});

// Update Schema (partial, excluding id and timestamps)
export const siteSettingsUpdateSchema = siteSettingsSchema
  .omit({ id: true, createdAt: true, updatedAt: true })
  .partial();

// API Request Schemas
export const updateSiteSettingsRequestSchema = z.object({
  data: siteSettingsUpdateSchema
});

// Section-specific update schemas for API endpoints
export const updateBasicInfoRequestSchema = z.object({
  data: basicSiteInfoSchema
});

export const updateContactInfoRequestSchema = z.object({
  data: contactInfoSchema
});

export const updateSocialMediaRequestSchema = z.object({
  data: socialMediaUrlsSchema
});

export const updateSeoMetaRequestSchema = z.object({
  data: seoMetaSettingsSchema
});

export const updateAnalyticsRequestSchema = z.object({
  data: analyticsSettingsSchema
});

export const updateMaintenanceRequestSchema = z.object({
  data: maintenanceSettingsSchema
});

export const updateAuthSecurityRequestSchema = z.object({
  data: authSecuritySettingsSchema
});

export const updatePerformanceRequestSchema = z.object({
  data: performanceSettingsSchema
});

export const updateSecurityRequestSchema = z.object({
  data: securitySettingsSchema
});

// Bulk update schema
export const bulkUpdateSiteSettingsRequestSchema = z.object({
  basicInfo: basicSiteInfoSchema.optional(),
  contactInfo: contactInfoSchema.optional(),
  socialMedia: socialMediaUrlsSchema.optional(),
  seoMeta: seoMetaSettingsSchema.optional(),
  analytics: analyticsSettingsSchema.optional(),
  maintenance: maintenanceSettingsSchema.optional(),
  authSecurity: authSecuritySettingsSchema.optional(),
  performance: performanceSettingsSchema.optional(),
  security: securitySettingsSchema.optional()
}).refine((data) => {
  // At least one section must be provided
  return Object.values(data).some(section => section !== undefined);
}, {
  message: 'At least one section must be provided for bulk update'
});

// Form validation schemas (for client-side validation)
export const formValidationSchemas = {
  basicInfo: basicSiteInfoSchema,
  contactInfo: contactInfoSchema,
  socialMedia: socialMediaUrlsSchema,
  seoMeta: seoMetaSettingsSchema,
  analytics: analyticsSettingsSchema,
  maintenance: maintenanceSettingsSchema,
  authSecurity: authSecuritySettingsSchema,
  performance: performanceSettingsSchema,
  security: securitySettingsSchema
} as const;

// Type inference helpers
export type SiteSettingsFormData = z.infer<typeof siteSettingsSchema>;
export type SiteSettingsUpdateData = z.infer<typeof siteSettingsUpdateSchema>;
export type BasicSiteInfoFormData = z.infer<typeof basicSiteInfoSchema>;
export type ContactInfoFormData = z.infer<typeof contactInfoSchema>;
export type SocialMediaUrlsFormData = z.infer<typeof socialMediaUrlsSchema>;
export type SeoMetaSettingsFormData = z.infer<typeof seoMetaSettingsSchema>;
export type AnalyticsSettingsFormData = z.infer<typeof analyticsSettingsSchema>;
export type MaintenanceSettingsFormData = z.infer<typeof maintenanceSettingsSchema>;
export type AuthSecuritySettingsFormData = z.infer<typeof authSecuritySettingsSchema>;
export type PerformanceSettingsFormData = z.infer<typeof performanceSettingsSchema>;
export type SecuritySettingsFormData = z.infer<typeof securitySettingsSchema>;