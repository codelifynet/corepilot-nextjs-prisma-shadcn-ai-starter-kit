'use client';

import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Switch } from '@/components/ui/switch';
import { Slider } from '@/components/ui/slider';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import { Icon } from '@iconify/react';
import { toast } from 'sonner';

import { performanceSettingsSchema, type PerformanceSettingsFormData } from '../schemas';
import { type PerformanceFormProps, LOG_LEVEL_OPTIONS, BACKUP_FREQUENCY_OPTIONS } from '../types';

export function PerformanceForm({ initialData, onChange }: PerformanceFormProps) {
  const form = useForm<PerformanceSettingsFormData>({
    resolver: zodResolver(performanceSettingsSchema),
    defaultValues: {
      cacheEnabled: initialData?.cacheEnabled ?? true,
      cacheTtl: initialData?.cacheTtl || 3600,
      maxFileSize: initialData?.maxFileSize || 10485760, // 10MB
      enableLogging: initialData?.enableLogging ?? true,
      logLevel: initialData?.logLevel || 'info',
      backupEnabled: initialData?.backupEnabled ?? true,
      backupFrequency: initialData?.backupFrequency || 'daily',
    },
  });

  const { handleSubmit, formState: { isSubmitting, isDirty }, watch } = form;

  const onSubmit = async (data: PerformanceSettingsFormData) => {
    try {
      // TODO: Implement API call to update performance settings
      console.log('Updating performance settings:', data);
      await new Promise(resolve => setTimeout(resolve, 1000)); // Simulate API call
      
      toast.success('Performance settings updated successfully');
      onChange?.();
    } catch (error) {
      toast.error('Failed to update performance settings');
      console.error('Update error:', error);
    }
  };

  // Watch for form changes
  React.useEffect(() => {
    if (isDirty) {
      onChange?.();
    }
  }, [isDirty, onChange]);

  const cacheTtl = watch('cacheTtl');
  const maxFileSize = watch('maxFileSize');

  return (
    <Form {...form}>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
        {/* Caching Settings */}
        <div className="space-y-4">
          <h4 className="text-sm font-medium text-gray-900 dark:text-gray-100 flex items-center">
            <Icon icon="lucide:database" className="w-4 h-4 mr-2" />
            Caching Settings
          </h4>

          <FormField
            control={form.control}
            name="cacheEnabled"
            render={({ field }) => (
              <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                <div className="space-y-0.5">
                  <FormLabel className="text-base">Enable Caching</FormLabel>
                  <FormDescription>Enable server-side caching to improve performance</FormDescription>
                </div>
                <FormControl>
                  <Switch checked={field.value} onCheckedChange={field.onChange} />
                </FormControl>
              </FormItem>
            )}
          />

          {watch('cacheEnabled') && (
            <FormField
              control={form.control}
              name="cacheTtl"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Cache TTL (seconds)</FormLabel>
                  <FormControl>
                    <div className="px-3">
                      <Slider
                        min={300}
                        max={86400}
                        step={300}
                        value={[field.value]}
                        onValueChange={(value) => field.onChange(value[0])}
                        className="w-full"
                      />
                    </div>
                  </FormControl>
                  <FormDescription>
                    Cache will expire after {Math.floor(cacheTtl / 60)} minutes
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
          )}

          <FormField
            control={form.control}
            name="maxFileSize"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Max File Size (bytes)</FormLabel>
                <FormControl>
                  <div className="px-3">
                    <Slider
                      min={1048576} // 1MB
                      max={104857600} // 100MB
                      step={1048576}
                      value={[field.value]}
                      onValueChange={(value) => field.onChange(value[0])}
                      className="w-full"
                    />
                  </div>
                </FormControl>
                <FormDescription>
                  Maximum file size: {Math.floor(maxFileSize / 1048576)} MB
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        {/* Logging Settings */}
        <div className="space-y-4">
          <h4 className="text-sm font-medium text-gray-900 dark:text-gray-100 flex items-center">
            <Icon icon="lucide:file-text" className="w-4 h-4 mr-2" />
            Logging Settings
          </h4>

          <FormField
            control={form.control}
            name="enableLogging"
            render={({ field }) => (
              <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                <div className="space-y-0.5">
                  <FormLabel className="text-base">Enable Logging</FormLabel>
                  <FormDescription>Enable system logging for debugging and monitoring</FormDescription>
                </div>
                <FormControl>
                  <Switch checked={field.value} onCheckedChange={field.onChange} />
                </FormControl>
              </FormItem>
            )}
          />

          {watch('enableLogging') && (
            <FormField
              control={form.control}
              name="logLevel"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Log Level</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select log level" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {LOG_LEVEL_OPTIONS.map((option) => (
                        <SelectItem key={option.value} value={option.value}>
                          {option.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormDescription>Choose what level of events to log</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
          )}
        </div>

        {/* Backup Settings */}
        <div className="space-y-4">
          <h4 className="text-sm font-medium text-gray-900 dark:text-gray-100 flex items-center">
            <Icon icon="lucide:hard-drive" className="w-4 h-4 mr-2" />
            Backup Settings
          </h4>

          <FormField
            control={form.control}
            name="backupEnabled"
            render={({ field }) => (
              <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                <div className="space-y-0.5">
                  <FormLabel className="text-base">Enable Automatic Backups</FormLabel>
                  <FormDescription>Automatically backup your database and files</FormDescription>
                </div>
                <FormControl>
                  <Switch checked={field.value} onCheckedChange={field.onChange} />
                </FormControl>
              </FormItem>
            )}
          />

          {watch('backupEnabled') && (
            <FormField
              control={form.control}
              name="backupFrequency"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Backup Frequency</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select backup frequency" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {BACKUP_FREQUENCY_OPTIONS.map((option) => (
                        <SelectItem key={option.value} value={option.value}>
                          {option.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormDescription>How often to create automatic backups</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
          )}
        </div>

        {/* Performance Impact */}
        <div className="bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg p-4">
          <h4 className="text-sm font-medium text-gray-900 dark:text-gray-100 mb-3 flex items-center">
            <Icon icon="lucide:activity" className="w-4 h-4 mr-2" />
            Current Configuration Impact
          </h4>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
            <div className="text-center">
              <div className={`text-lg font-semibold ${watch('cacheEnabled') ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'}`}>
                {watch('cacheEnabled') ? 'Fast' : 'Slow'}
              </div>
              <div className="text-gray-600 dark:text-gray-400">Page Load Speed</div>
            </div>
            <div className="text-center">
              <div className={`text-lg font-semibold ${watch('maxFileSize') > 52428800 ? 'text-orange-600 dark:text-orange-400' : 'text-green-600 dark:text-green-400'}`}>
                {watch('maxFileSize') > 52428800 ? 'High' : 'Optimized'}
              </div>
              <div className="text-gray-600 dark:text-gray-400">File Size Limit</div>
            </div>
            <div className="text-center">
              <div className={`text-lg font-semibold ${watch('backupEnabled') ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'}`}>
                {watch('backupEnabled') ? 'Protected' : 'At Risk'}
              </div>
              <div className="text-gray-600 dark:text-gray-400">Data Safety</div>
            </div>
          </div>
        </div>

        {/* Performance Tips */}
        <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-4">
          <div className="flex items-start space-x-3">
            <Icon icon="lucide:zap" className="w-5 h-5 text-blue-600 dark:text-blue-400 mt-0.5" />
            <div className="text-sm">
              <p className="font-medium text-blue-800 dark:text-blue-200 mb-2">
                Performance Optimization Tips
              </p>
              <ul className="text-blue-700 dark:text-blue-300 space-y-1">
                <li>• <strong>Caching:</strong> Dramatically improves page load times for repeat visitors</li>
                <li>• <strong>File Size:</strong> Keep file size limits reasonable to prevent server overload</li>
                <li>• <strong>Logging:</strong> Use 'info' level for production, 'debug' only for troubleshooting</li>
                <li>• <strong>Backups:</strong> Daily backups are recommended for most sites</li>
                <li>• <strong>Cache TTL:</strong> Longer TTL improves performance but may delay content updates</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Warning for Debug Mode */}
        {watch('logLevel') === 'debug' && (
          <div className="bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800 rounded-lg p-4">
            <div className="flex items-start space-x-3">
              <Icon icon="lucide:alert-triangle" className="w-5 h-5 text-amber-600 dark:text-amber-400 mt-0.5" />
              <div className="text-sm">
                <p className="font-medium text-amber-800 dark:text-amber-200 mb-1">
                  Debug Mode Warning
                </p>
                <p className="text-amber-700 dark:text-amber-300">
                  Debug logging can significantly impact performance and generate large log files. 
                  Only use this setting for troubleshooting and remember to change it back to 'info' level.
                </p>
              </div>
            </div>
          </div>
        )}

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