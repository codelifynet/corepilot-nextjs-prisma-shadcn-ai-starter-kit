'use client';

import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Icon } from '@iconify/react';
import { toast } from 'sonner';

import { contactInfoSchema } from '../schemas';
import { type ContactInfo, type ContactInfoFormProps } from '../types';


export function ContactInfoForm({ initialData, onChange }: ContactInfoFormProps) {
  const form = useForm<ContactInfo>({
    resolver: zodResolver(contactInfoSchema),
    defaultValues: {
      contactEmail: initialData?.contactEmail || '',
      contactPhone: initialData?.contactPhone || '',
      contactAddress: initialData?.contactAddress || '',
      businessHours: initialData?.businessHours || '',
      supportEmail: initialData?.supportEmail || '',
    },
  });

  const { handleSubmit, formState: { isSubmitting, isDirty } } = form;

  const onSubmit = async (data: ContactInfo) => {
    try {
      // TODO: Implement API call to update contact info
      console.log('Updating contact info:', data);
      await new Promise(resolve => setTimeout(resolve, 1000)); // Simulate API call
      
      toast.success('Contact information updated successfully');
      onChange?.();
    } catch (error) {
      toast.error('Failed to update contact information');
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
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <FormField
            control={form.control}
            name="contactEmail"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Contact Email</FormLabel>
                <FormControl>
                  <Input placeholder="contact@example.com" {...field} />
                </FormControl>
                <FormDescription>
                  Primary contact email for general inquiries
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="supportEmail"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Support Email</FormLabel>
                <FormControl>
                  <Input placeholder="support@example.com" {...field} />
                </FormControl>
                <FormDescription>
                  Email address for customer support
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <FormField
          control={form.control}
          name="contactPhone"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Contact Phone</FormLabel>
              <FormControl>
                <Input placeholder="+1 (555) 123-4567" {...field} />
              </FormControl>
              <FormDescription>
                Primary phone number for contact
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="contactAddress"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Contact Address</FormLabel>
              <FormControl>
                <Textarea 
                  placeholder="Enter your business address"
                  className="min-h-[100px]"
                  {...field} 
                />
              </FormControl>
              <FormDescription>
                Physical address of your business
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="businessHours"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Business Hours</FormLabel>
              <FormControl>
                <Textarea 
                  placeholder="Monday - Friday: 9:00 AM - 5:00 PM"
                  className="min-h-[80px]"
                  {...field} 
                />
              </FormControl>
              <FormDescription>
                Your business operating hours
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

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