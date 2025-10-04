'use client';

import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { toast } from 'sonner';
import { Button } from '@/components/ui/button';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Icon } from '@iconify/react';
import { analyticsSettingsSchema, type AnalyticsSettingsFormData } from '../schemas';
import { type AnalyticsFormProps } from '../types';

const defaultValues: AnalyticsSettingsFormData = {
  analyticsId: '',
  gtmId: '',
};

export function AnalyticsForm({ initialData, onChange }: AnalyticsFormProps) {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting, isDirty },
  } = useForm<AnalyticsSettingsFormData>({
    resolver: zodResolver(analyticsSettingsSchema),
    defaultValues: {
      ...defaultValues,
      ...initialData,
    },
  });

  React.useEffect(() => {
    onChange?.();
  }, [isDirty, onChange]);

  const onSubmit = async (data: AnalyticsSettingsFormData) => {
    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000));
      
      console.log('Analytics settings:', data);
      toast.success('Analytics settings saved successfully!');
    } catch (error) {
      console.error('Error saving analytics settings:', error);
      toast.error('Failed to save analytics settings. Please try again.');
    }
  };

  const analyticsServices = [
    {
      name: 'analyticsId' as const,
      label: 'Google Analytics ID',
      placeholder: 'G-XXXXXXXXXX or UA-XXXXXXXXX-X',
      description: 'Your Google Analytics measurement ID or tracking ID',
      icon: 'logos:google-analytics',
    },
    {
      name: 'gtmId' as const,
      label: 'Google Tag Manager ID',
      placeholder: 'GTM-XXXXXXX',
      description: 'Your Google Tag Manager container ID',
      icon: 'logos:google-tag-manager',
    },
  ];

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <div className="space-y-6">
        {analyticsServices.map((service) => (
          <div key={service.name} className="flex items-start space-x-3">
            <div className="flex-shrink-0 mt-1">
              <div className="w-10 h-10 bg-gray-100 dark:bg-gray-800 rounded-lg flex items-center justify-center">
                <Icon icon={service.icon} className="w-5 h-5 text-gray-600 dark:text-gray-400" />
              </div>
            </div>
            <div className="flex-1 space-y-2">
              <Label htmlFor={service.name}>{service.label}</Label>
              <Input
                id={service.name}
                placeholder={service.placeholder}
                {...register(service.name)}
                className={errors[service.name] ? 'border-red-500' : ''}
              />
              {errors[service.name] && (
                <p className="text-sm text-red-500">{errors[service.name]?.message}</p>
              )}
              <p className="text-sm text-muted-foreground">{service.description}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Analytics Setup Guide */}
      <Alert>
        <Icon icon="lucide:info" className="h-4 w-4" />
        <AlertDescription>
          <div className="space-y-2">
            <p className="font-medium">Analytics Setup Tips:</p>
            <ul className="text-sm space-y-1 ml-4 list-disc">
              <li>Google Analytics 4 (GA4) uses measurement IDs starting with "G-"</li>
              <li>Universal Analytics uses tracking IDs starting with "UA-"</li>
              <li>Google Tag Manager helps manage multiple tracking codes</li>
              <li>Test your tracking implementation before going live</li>
            </ul>
          </div>
        </AlertDescription>
      </Alert>

      {/* Privacy Compliance Notice */}
      <Alert>
        <Icon icon="lucide:shield-check" className="h-4 w-4" />
        <AlertDescription>
          <div className="space-y-2">
            <p className="font-medium">Privacy Compliance:</p>
            <p className="text-sm">
              Ensure you have proper privacy policies and cookie consent mechanisms in place 
              when using analytics tracking. Consider GDPR, CCPA, and other privacy regulations.
            </p>
          </div>
        </AlertDescription>
      </Alert>

      <div className="flex justify-end">
        <Button type="submit" disabled={isSubmitting || !isDirty}>
          {isSubmitting ? 'Saving...' : 'Save Analytics Settings'}
        </Button>
      </div>
    </form>
  );
}