import { z } from 'zod';

// Social Media URLs Schema
export const socialMediaUrlsSchema = z.object({
  facebookUrl: z.string().url().optional().or(z.literal('')),
  twitterUrl: z.string().url().optional().or(z.literal('')),
  instagramUrl: z.string().url().optional().or(z.literal('')),
  linkedinUrl: z.string().url().optional().or(z.literal('')),
  youtubeUrl: z.string().url().optional().or(z.literal('')),
  githubUrl: z.string().url().optional().or(z.literal('')),
});

// Social Settings Schema
export const socialSettingsSchema = z.object({
  ...socialMediaUrlsSchema.shape,
  enableSocialSharing: z.boolean().default(true),
  enableSocialLogin: z.boolean().default(false),
  socialSharingPlatforms: z.array(z.string()).default(['facebook', 'twitter', 'linkedin']),
});

// API Request Schemas
export const updateSocialSettingsRequestSchema = socialSettingsSchema;

// Types
export type SocialMediaUrls = z.infer<typeof socialMediaUrlsSchema>;
export type SocialSettings = z.infer<typeof socialSettingsSchema>;
export type UpdateSocialSettingsRequest = z.infer<typeof updateSocialSettingsRequestSchema>;