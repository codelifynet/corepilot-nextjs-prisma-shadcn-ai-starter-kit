'use client';

import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Switch } from '@/components/ui/switch';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import { Icon } from '@iconify/react';
import { toast } from 'sonner';
import { Alert, AlertDescription } from '@/components/ui/alert';

import { maintenanceSettingsSchema, type MaintenanceSettingsFormData } from '../schemas';
import { type MaintenanceFormProps, MAINTENANCE_TYPE_OPTIONS, MaintenanceType } from '../types';


export function MaintenanceForm({ initialData, onChange }: MaintenanceFormProps) {
	const form = useForm<MaintenanceSettingsFormData>({
		resolver: zodResolver(maintenanceSettingsSchema),
		defaultValues: {
			maintenanceMode: initialData?.maintenanceMode || false,
			maintenanceMessage: initialData?.maintenanceMessage || '',
			maintenanceEndAt: initialData?.maintenanceEndAt || null,
			maintenanceStartAt: initialData?.maintenanceStartAt || null,
			maintenanceType: initialData?.maintenanceType || MaintenanceType.SCHEDULED,
		},
	});

	const { handleSubmit, formState: { isSubmitting, isDirty }, watch } = form;
	const maintenanceMode = watch('maintenanceMode');

	const onSubmit = async (data: MaintenanceSettingsFormData) => {
		try {
			// TODO: Implement API call to update maintenance settings
			console.log('Updating maintenance settings:', data);
			await new Promise(resolve => setTimeout(resolve, 1000)); // Simulate API call

			toast.success('Maintenance settings updated successfully');
			onChange?.();
		} catch (error) {
			toast.error('Failed to update maintenance settings');
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
				{/* Maintenance Mode Toggle */}
				<div className="space-y-4">
					<FormField
						control={form.control}
						name="maintenanceMode"
						render={({ field }) => (
							<FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
								<div className="space-y-0.5">
									<FormLabel className="text-base">Enable Maintenance Mode</FormLabel>
									<FormDescription>
										When enabled, visitors will see a maintenance page instead of your site
									</FormDescription>
								</div>
								<FormControl>
									<Switch
										checked={field.value}
										onCheckedChange={field.onChange}
									/>
								</FormControl>
							</FormItem>
						)}
					/>

					{maintenanceMode && (
						<Alert className="border-amber-200 bg-amber-50 dark:border-amber-800 dark:bg-amber-900/20">
							<Icon icon="lucide:alert-triangle" className="h-4 w-4 text-amber-600 dark:text-amber-400" />
							<AlertDescription className="text-amber-800 dark:text-amber-200">
								<strong>Warning:</strong> Maintenance mode is currently enabled.
								Regular visitors will not be able to access your site.
							</AlertDescription>
						</Alert>
					)}
				</div>

				{/* Maintenance Settings */}
				{maintenanceMode && (
					<div className="space-y-6 border-t border-gray-200 dark:border-gray-700 pt-6">
						<FormField
							control={form.control}
							name="maintenanceType"
							render={({ field }) => (
								<FormItem>
									<FormLabel>Maintenance Type</FormLabel>
									<Select onValueChange={field.onChange} defaultValue={field.value}>
										<FormControl>
											<SelectTrigger>
												<SelectValue placeholder="Select maintenance type" />
											</SelectTrigger>
										</FormControl>
										<SelectContent>
											{MAINTENANCE_TYPE_OPTIONS.map((option) => (
												<SelectItem key={option.value} value={option.value}>
													{option.label}
												</SelectItem>
											))}
										</SelectContent>
									</Select>
									<FormDescription>
										Type of maintenance being performed
									</FormDescription>
									<FormMessage />
								</FormItem>
							)}
						/>

						<FormField
							control={form.control}
							name="maintenanceMessage"
							render={({ field }) => (
								<FormItem>
									<FormLabel>Maintenance Message</FormLabel>
									<FormControl>
										<Textarea
											placeholder="We're currently performing scheduled maintenance. Please check back soon!"
											className="min-h-[80px]"
											{...field}
										/>
									</FormControl>
									<FormDescription>
										Message displayed to visitors during maintenance
									</FormDescription>
									<FormMessage />
								</FormItem>
							)}
						/>

						<div className="grid grid-cols-1 md:grid-cols-2 gap-6">
							<FormField
								control={form.control}
								name="maintenanceStartAt"
								render={({ field }) => (
									<FormItem>
										<FormLabel>Start Time</FormLabel>
										<FormControl>
											<Input
												type="datetime-local"
												value={field.value ? new Date(field.value).toISOString().slice(0, 16) : ''}
												onChange={(e) => field.onChange(e.target.value ? new Date(e.target.value) : null)}
											/>
										</FormControl>
										<FormDescription>
											When maintenance started (optional)
										</FormDescription>
										<FormMessage />
									</FormItem>
								)}
							/>

							<FormField
								control={form.control}
								name="maintenanceEndAt"
								render={({ field }) => (
									<FormItem>
										<FormLabel>Expected End Time</FormLabel>
										<FormControl>
											<Input
												type="datetime-local"
												value={field.value ? new Date(field.value).toISOString().slice(0, 16) : ''}
												onChange={(e) => field.onChange(e.target.value ? new Date(e.target.value) : null)}
											/>
										</FormControl>
										<FormDescription>
											Expected maintenance completion time (optional)
										</FormDescription>
										<FormMessage />
									</FormItem>
								)}
							/>
						</div>

					</div>
				)}

				{/* Maintenance Page Preview */}
				{maintenanceMode && (
					<div className="bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg p-6">
						<h4 className="text-sm font-medium text-gray-900 dark:text-gray-100 mb-4 flex items-center">
							<Icon icon="lucide:eye" className="w-4 h-4 mr-2" />
							Maintenance Page Preview
						</h4>

						<div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-lg p-8 text-center">
							<div className="mb-6">
								<Icon icon="lucide:wrench" className="w-16 h-16 text-gray-400 mx-auto mb-4" />
								<h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-2">
									Site Under Maintenance
								</h2>
								<p className="text-gray-600 dark:text-gray-400 max-w-md mx-auto">
									{form.watch('maintenanceMessage') || 'We\'re currently performing scheduled maintenance. Please check back soon!'}
								</p>
							</div>

							{(form.watch('maintenanceStartAt') || form.watch('maintenanceEndAt')) && (
								<div className="text-sm text-gray-500 dark:text-gray-400 space-y-1">
									{form.watch('maintenanceStartAt') && (
										<p>Started: {new Date(form.watch('maintenanceStartAt')!).toLocaleString()}</p>
									)}
									{form.watch('maintenanceEndAt') && (
										<p>Expected completion: {new Date(form.watch('maintenanceEndAt')!).toLocaleString()}</p>
									)}
								</div>
							)}
						</div>
					</div>
				)}

				{/* Best Practices */}
				<div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-4">
					<div className="flex items-start space-x-3">
						<Icon icon="lucide:info" className="w-5 h-5 text-blue-600 dark:text-blue-400 mt-0.5" />
						<div className="text-sm">
							<p className="font-medium text-blue-800 dark:text-blue-200 mb-2">
								Maintenance Mode Best Practices
							</p>
							<ul className="text-blue-700 dark:text-blue-300 space-y-1">
								<li>• Notify users in advance about scheduled maintenance</li>
								<li>• Keep maintenance messages clear and informative</li>
								<li>• Add your IP address to allowed IPs to test the site</li>
								<li>• Set realistic completion times to manage expectations</li>
								<li>• Consider using a 503 status code for SEO purposes</li>
								<li>• Test the maintenance page before enabling it</li>
							</ul>
						</div>
					</div>
				</div>

				<div className="flex justify-end pt-4 border-t border-gray-200 dark:border-gray-700">
					<Button
						type="submit"
						disabled={isSubmitting || !isDirty}
						className="min-w-[120px]"
						variant={maintenanceMode ? "destructive" : "default"}
					>
						{isSubmitting ? (
							<>
								<Icon icon="lucide:loader-2" className="w-4 h-4 mr-2 animate-spin" />
								Saving...
							</>
						) : (
							<>
								<Icon icon="lucide:save" className="w-4 h-4 mr-2" />
								{maintenanceMode ? 'Enable Maintenance' : 'Save Changes'}
							</>
						)}
					</Button>
				</div>
			</form>
		</Form>
	);
}