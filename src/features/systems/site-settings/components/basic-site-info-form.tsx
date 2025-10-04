'use client';

import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import { Icon } from '@iconify/react';
import { toast } from 'sonner';

import { basicSiteInfoSchema } from '../schemas';
import { type BasicSiteInfo, LANGUAGE_OPTIONS, CURRENCY_OPTIONS, DATE_FORMAT_OPTIONS, TIME_FORMAT_OPTIONS, SiteLanguage, SiteCurrency, DateFormat, TimeFormat, type BasicSiteInfoFormProps } from '../types';

export function BasicSiteInfoForm({ initialData, onChange }: BasicSiteInfoFormProps) {
	const form = useForm<BasicSiteInfo>({
		resolver: zodResolver(basicSiteInfoSchema),
		defaultValues: {
			siteName: initialData?.siteName || '',
			siteDescription: initialData?.siteDescription || '',
			siteUrl: initialData?.siteUrl || '',
			adminEmail: initialData?.adminEmail || '',
			timezone: initialData?.timezone || 'UTC',
			language: initialData?.language || SiteLanguage.EN,
			currency: initialData?.currency || SiteCurrency.USD,
			dateFormat: initialData?.dateFormat || DateFormat.MM_DD_YYYY,
			timeFormat: initialData?.timeFormat || TimeFormat.TWELVE_HOUR,
		},
	});

	const { handleSubmit, formState: { isSubmitting, isDirty } } = form;

	const onSubmit = async (data: BasicSiteInfo) => {
		try {
			// TODO: Implement API call to update basic site info
			console.log('Updating basic site info:', data);
			await new Promise(resolve => setTimeout(resolve, 1000)); // Simulate API call

			toast.success('Basic site information updated successfully');
			onChange?.();
		} catch (error) {
			toast.error('Failed to update basic site information');
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
						name="siteName"
						render={({ field }) => (
							<FormItem>
								<FormLabel>Site Name *</FormLabel>
								<FormControl>
									<Input placeholder="Enter your site name" {...field} />
								</FormControl>
								<FormDescription>
									The name of your website or application
								</FormDescription>
								<FormMessage />
							</FormItem>
						)}
					/>

					<FormField
						control={form.control}
						name="adminEmail"
						render={({ field }) => (
							<FormItem>
								<FormLabel>Admin Email *</FormLabel>
								<FormControl>
									<Input placeholder="admin@example.com" {...field} />
								</FormControl>
								<FormDescription>
									Primary administrator email address
								</FormDescription>
								<FormMessage />
							</FormItem>
						)}
					/>
				</div>

				<FormField
					control={form.control}
					name="siteDescription"
					render={({ field }) => (
						<FormItem>
							<FormLabel>Site Description</FormLabel>
							<FormControl>
								<Textarea
									placeholder="Enter a brief description of your site"
									className="min-h-[100px]"
									{...field}
								/>
							</FormControl>
							<FormDescription>
								A brief description of your website (used in meta tags)
							</FormDescription>
							<FormMessage />
						</FormItem>
					)}
				/>

				<FormField
					control={form.control}
					name="siteUrl"
					render={({ field }) => (
						<FormItem>
							<FormLabel>Site URL *</FormLabel>
							<FormControl>
								<Input placeholder="https://example.com" {...field} />
							</FormControl>
							<FormDescription>
								The primary URL of your website
							</FormDescription>
							<FormMessage />
						</FormItem>
					)}
				/>

				<div className="grid grid-cols-1 md:grid-cols-2 gap-6">
					<FormField
						control={form.control}
						name="language"
						render={({ field }) => (
							<FormItem>
								<FormLabel>Default Language *</FormLabel>
								<Select onValueChange={field.onChange} defaultValue={field.value}>
									<FormControl>
										<SelectTrigger>
											<SelectValue placeholder="Select language" />
										</SelectTrigger>
									</FormControl>
									<SelectContent>
										{LANGUAGE_OPTIONS.map((option) => (
											<SelectItem key={option.value} value={option.value}>
												{option.label}
											</SelectItem>
										))}
									</SelectContent>
								</Select>
								<FormDescription>
									Default language for your site
								</FormDescription>
								<FormMessage />
							</FormItem>
						)}
					/>

					<FormField
						control={form.control}
						name="currency"
						render={({ field }) => (
							<FormItem>
								<FormLabel>Default Currency *</FormLabel>
								<Select onValueChange={field.onChange} defaultValue={field.value}>
									<FormControl>
										<SelectTrigger>
											<SelectValue placeholder="Select currency" />
										</SelectTrigger>
									</FormControl>
									<SelectContent>
										{CURRENCY_OPTIONS.map((option) => (
											<SelectItem key={option.value} value={option.value}>
												{option.label}
											</SelectItem>
										))}
									</SelectContent>
								</Select>
								<FormDescription>
									Default currency for transactions
								</FormDescription>
								<FormMessage />
							</FormItem>
						)}
					/>
				</div>

				<FormField
					control={form.control}
					name="timezone"
					render={({ field }) => (
						<FormItem>
							<FormLabel>Timezone *</FormLabel>
							<FormControl>
								<Input placeholder="UTC" {...field} />
							</FormControl>
							<FormDescription>
								Server timezone (e.g., UTC, America/New_York)
							</FormDescription>
							<FormMessage />
						</FormItem>
					)}
				/>

				<div className="grid grid-cols-1 md:grid-cols-2 gap-6">
					<FormField
						control={form.control}
						name="dateFormat"
						render={({ field }) => (
							<FormItem>
								<FormLabel>Date Format *</FormLabel>
								<Select onValueChange={field.onChange} defaultValue={field.value}>
									<FormControl>
										<SelectTrigger>
											<SelectValue placeholder="Select date format" />
										</SelectTrigger>
									</FormControl>
									<SelectContent>
										{DATE_FORMAT_OPTIONS.map((option) => (
											<SelectItem key={option.value} value={option.value}>
												{option.label}
											</SelectItem>
										))}
									</SelectContent>
								</Select>
								<FormDescription>
									How dates should be displayed
								</FormDescription>
								<FormMessage />
							</FormItem>
						)}
					/>

					<FormField
						control={form.control}
						name="timeFormat"
						render={({ field }) => (
							<FormItem>
								<FormLabel>Time Format *</FormLabel>
								<Select onValueChange={field.onChange} defaultValue={field.value}>
									<FormControl>
										<SelectTrigger>
											<SelectValue placeholder="Select time format" />
										</SelectTrigger>
									</FormControl>
									<SelectContent>
										{TIME_FORMAT_OPTIONS.map((option) => (
											<SelectItem key={option.value} value={option.value}>
												{option.label}
											</SelectItem>
										))}
									</SelectContent>
								</Select>
								<FormDescription>
									12-hour or 24-hour time format
								</FormDescription>
								<FormMessage />
							</FormItem>
						)}
					/>
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