// Social Settings Feature
export * from './components';
export * from './views';

// Explicit exports to avoid conflicts
export type { 
  SocialMediaUrls, 
  SocialSettings, 
  SocialSettingsFormProps,
  SocialSettingsResponse,
  SocialSettingsUpdateRequest
} from './types';

export { 
  socialMediaUrlsSchema, 
  socialSettingsSchema, 
  updateSocialSettingsRequestSchema 
} from './schemas';