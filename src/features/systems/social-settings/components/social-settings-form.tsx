'use client';

import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Icon } from '@iconify/react';
import { toast } from 'sonner';

import { socialMediaUrlsSchema } from '../schemas';
import type { SocialMediaUrls, SocialSettingsFormProps } from '../types';

export function SocialSettingsForm({ initialData, onChange }: SocialSettingsFormProps) {
  const form = useForm<SocialMediaUrls>({
    resolver: zodResolver(socialMediaUrlsSchema),
    defaultValues: {
      facebookUrl: initialData?.facebookUrl || '',
      twitterUrl: initialData?.twitterUrl || '',
      instagramUrl: initialData?.instagramUrl || '',
      linkedinUrl: initialData?.linkedinUrl || '',
      youtubeUrl: initialData?.youtubeUrl || '',
      githubUrl: initialData?.githubUrl || '',
    },
  });

  const { handleSubmit, formState: { isSubmitting, isDirty } } = form;

  const onSubmit = async (data: SocialMediaUrls) => {
    try {
      // TODO: Implement API call to update social media links
      console.log('Updating social media links:', data);
      await new Promise(resolve => setTimeout(resolve, 1000)); // Simulate API call
      
      toast.success('Social media links updated successfully');
      onChange?.();
    } catch (error) {
      toast.error('Failed to update social media links');
      console.error('Update error:', error);
    }
  };

  // Watch for form changes
  React.useEffect(() => {
    if (isDirty) {
      onChange?.();
    }
  }, [isDirty, onChange]);

  const socialPlatforms = [
    {
      name: 'facebookUrl' as keyof SocialMediaUrls,
      label: 'Facebook',
      placeholder: 'https://facebook.com/yourpage',
      icon: 'lucide:facebook'
    },
    {
      name: 'twitterUrl' as keyof SocialMediaUrls,
      label: 'Twitter/X',
      placeholder: 'https://twitter.com/youraccount',
      icon: 'lucide:twitter'
    },
    {
      name: 'instagramUrl' as keyof SocialMediaUrls,
      label: 'Instagram',
      placeholder: 'https://instagram.com/youraccount',
      icon: 'lucide:instagram'
    },
    {
      name: 'linkedinUrl' as keyof SocialMediaUrls,
      label: 'LinkedIn',
      placeholder: 'https://linkedin.com/company/yourcompany',
      icon: 'lucide:linkedin'
    },
    {
      name: 'youtubeUrl' as keyof SocialMediaUrls,
      label: 'YouTube',
      placeholder: 'https://youtube.com/channel/yourchannel',
      icon: 'lucide:youtube'
    },
    {
      name: 'githubUrl' as keyof SocialMediaUrls,
      label: 'GitHub',
      placeholder: 'https://github.com/yourusername',
      icon: 'lucide:github'
    }
  ];

  return (
    <Form {...form}>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        <div className="space-y-4">
          {socialPlatforms.map((platform) => (
            <div key={platform.name} className="flex items-center space-x-3">
              <div className="flex-shrink-0">
                <div className="w-10 h-10 bg-gray-100 dark:bg-gray-800 rounded-lg flex items-center justify-center">
                  <Icon icon={platform.icon} className="w-5 h-5 text-gray-600 dark:text-gray-400" />
                </div>
              </div>
              <div className="flex-1">
                <FormField
                  control={form.control}
                  name={platform.name}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>{platform.label}</FormLabel>
                      <FormControl>
                        <Input placeholder={platform.placeholder} {...field} />
                      </FormControl>
                      <FormDescription>
                        Your {platform.label} profile or page URL
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </div>
          ))}
        </div>

        <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-4">
          <div className="flex items-start space-x-3">
            <Icon icon="lucide:info" className="w-5 h-5 text-blue-600 dark:text-blue-400 mt-0.5" />
            <div className="text-sm">
              <p className="font-medium text-blue-800 dark:text-blue-200 mb-1">
                Social Media Integration Tips
              </p>
              <ul className="text-blue-700 dark:text-blue-300 space-y-1">
                <li>• Use complete URLs including https://</li>
                <li>• These links will appear in your site's footer and contact pages</li>
                <li>• Leave fields empty if you don't use that platform</li>
                <li>• Links will open in new tabs for better user experience</li>
              </ul>
            </div>
          </div>
        </div>

        <div className="flex justify-end pt-4 border-t border-gray-200 dark:border-gray-700">
          <Button
            type="submit"
            disabled={isSubmitting || !isDirty}
            className="min-w-[120px]"
          >
            {isSubmitting ? (
              <>
                <Icon icon="lucide:loader-2" className="w-4 h-4 mr-2 animate-spin" />
                Saving...
              </>
            ) : (
              <>
                <Icon icon="lucide:save" className="w-4 h-4 mr-2" />
                Save Changes
              </>
            )}
          </Button>
        </div>
      </form>
    </Form>
  );
}