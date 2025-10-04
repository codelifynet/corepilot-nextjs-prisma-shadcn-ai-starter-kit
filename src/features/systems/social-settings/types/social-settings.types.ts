// Social Settings Types
export interface SocialMediaUrls {
  facebookUrl?: string;
  twitterUrl?: string;
  instagramUrl?: string;
  linkedinUrl?: string;
  youtubeUrl?: string;
  githubUrl?: string;
}

export interface SocialSettings extends SocialMediaUrls {
  enableSocialSharing: boolean;
  enableSocialLogin: boolean;
  socialSharingPlatforms: string[];
}

// Component Props
export interface SocialSettingsFormProps {
  initialData?: SocialSettings | null;
  onChange?: () => void;
}

// API Types
export interface SocialSettingsResponse {
  success: boolean;
  data: SocialSettings;
  message?: string;
}

export interface SocialSettingsUpdateRequest {
  socialSettings: Partial<SocialSettings>;
}