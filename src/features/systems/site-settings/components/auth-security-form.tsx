'use client';

import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Switch } from '@/components/ui/switch';
import { Slider } from '@/components/ui/slider';
import { Button } from '@/components/ui/button';
import { Icon } from '@iconify/react';
import { toast } from 'sonner';

import { authSecuritySettingsSchema, type AuthSecuritySettingsFormData } from '../schemas';
import { type AuthSecurityFormProps } from '../types';


export function AuthSecurityForm({ initialData, onChange }: AuthSecurityFormProps) {
  const form = useForm<AuthSecuritySettingsFormData>({
    resolver: zodResolver(authSecuritySettingsSchema),
    defaultValues: {
      allowRegistration: initialData?.allowRegistration ?? true,
      requireEmailVerification: initialData?.requireEmailVerification ?? false,
      sessionTimeout: initialData?.sessionTimeout ?? 24,
      passwordMinLength: initialData?.passwordMinLength ?? 8,
      enableTwoFactor: initialData?.enableTwoFactor ?? false,
    },
  });

  const { handleSubmit, formState: { isSubmitting, isDirty } } = form;

  const onSubmit = async (data: AuthSecuritySettingsFormData) => {
    try {
      // TODO: Implement API call to update auth security settings
      console.log('Updating auth security settings:', data);
      await new Promise(resolve => setTimeout(resolve, 1000)); // Simulate API call
      
      toast.success('Authentication & security settings updated successfully');
      onChange?.();
    } catch (error) {
      toast.error('Failed to update authentication & security settings');
      console.error('Update error:', error);
    }
  };

  // Watch for form changes
  React.useEffect(() => {
    if (isDirty) {
      onChange?.();
    }
  }, [isDirty, onChange]);

  return (
    <Form {...form}>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
        {/* User Registration */}
        <div className="space-y-4">
          <h4 className="text-sm font-medium text-gray-900 dark:text-gray-100 flex items-center">
            <Icon icon="lucide:user-plus" className="w-4 h-4 mr-2" />
            User Registration
          </h4>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <FormField
              control={form.control}
              name="allowRegistration"
              render={({ field }) => (
                <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                  <div className="space-y-0.5">
                    <FormLabel className="text-base">Allow User Registration</FormLabel>
                    <FormDescription>Allow new users to register accounts</FormDescription>
                  </div>
                  <FormControl>
                    <Switch checked={field.value} onCheckedChange={field.onChange} />
                  </FormControl>
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="requireEmailVerification"
              render={({ field }) => (
                <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                  <div className="space-y-0.5">
                    <FormLabel className="text-base">Require Email Verification</FormLabel>
                    <FormDescription>Users must verify their email before accessing the account</FormDescription>
                  </div>
                  <FormControl>
                    <Switch checked={field.value} onCheckedChange={field.onChange} />
                  </FormControl>
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="enableTwoFactor"
              render={({ field }) => (
                <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                  <div className="space-y-0.5">
                    <FormLabel className="text-base">Enable Two-Factor Authentication</FormLabel>
                    <FormDescription>Allow users to enable 2FA for additional security</FormDescription>
                  </div>
                  <FormControl>
                    <Switch checked={field.value} onCheckedChange={field.onChange} />
                  </FormControl>
                </FormItem>
              )}
            />
          </div>
        </div>

        {/* Password Requirements */}
        <div className="space-y-4">
          <h4 className="text-sm font-medium text-gray-900 dark:text-gray-100 flex items-center">
            <Icon icon="lucide:key" className="w-4 h-4 mr-2" />
            Password Requirements
          </h4>

          <FormField
            control={form.control}
            name="passwordMinLength"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Minimum Password Length</FormLabel>
                <FormControl>
                  <div className="px-3">
                    <Slider
                      min={6}
                      max={32}
                      step={1}
                      value={[field.value]}
                      onValueChange={(value) => field.onChange(value[0])}
                      className="w-full"
                    />
                  </div>
                </FormControl>
                <FormDescription>
                  Passwords must be at least {field.value} characters long
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        {/* Session Management */}
        <div className="space-y-4">
          <h4 className="text-sm font-medium text-gray-900 dark:text-gray-100 flex items-center">
            <Icon icon="lucide:clock" className="w-4 h-4 mr-2" />
            Session Management
          </h4>

          <FormField
            control={form.control}
            name="sessionTimeout"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Session Timeout (hours)</FormLabel>
                <FormControl>
                  <div className="px-3">
                    <Slider
                      min={1}
                      max={168}
                      step={1}
                      value={[field.value]}
                      onValueChange={(value) => field.onChange(value[0])}
                      className="w-full"
                    />
                  </div>
                </FormControl>
                <FormDescription>
                  User sessions will expire after {field.value} hours of inactivity
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        {/* Security Recommendations */}
        <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-4">
          <div className="flex items-start space-x-3">
            <Icon icon="lucide:shield-check" className="w-5 h-5 text-blue-600 dark:text-blue-400 mt-0.5" />
            <div className="text-sm">
              <p className="font-medium text-blue-800 dark:text-blue-200 mb-2">
                Security Recommendations
              </p>
              <ul className="text-blue-700 dark:text-blue-300 space-y-1">
                <li>• Enable email verification to prevent fake accounts</li>
                <li>• Use strong password requirements for better security</li>
                <li>• Consider enabling 2FA for admin accounts</li>
                <li>• Set reasonable session timeouts to balance security and usability</li>
                <li>• Monitor failed login attempts for suspicious activity</li>
                <li>• Regularly review and update security settings</li>
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