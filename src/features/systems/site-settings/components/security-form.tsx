'use client';

import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Switch } from '@/components/ui/switch';
import { Slider } from '@/components/ui/slider';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Icon } from '@iconify/react';
import { toast } from 'sonner';

import { securitySettingsSchema, type SecuritySettingsFormData } from '../schemas';
import { type SecurityFormProps } from '../types';

export function SecurityForm({ initialData, onChange }: SecurityFormProps) {
	const form = useForm<SecuritySettingsFormData>({
		resolver: zodResolver(securitySettingsSchema),
		defaultValues: {
			enableRateLimit: initialData?.enableRateLimit ?? true,
			rateLimitRequests: initialData?.rateLimitRequests || 100,
			rateLimitWindow: initialData?.rateLimitWindow || 15,
			enableCors: initialData?.enableCors ?? true,
			corsOrigins: initialData?.corsOrigins || '',
			enableCsp: initialData?.enableCsp ?? false,
			cspDirectives: initialData?.cspDirectives || '',
			enableHsts: initialData?.enableHsts ?? true,
		},
	});

	const { handleSubmit, formState: { isSubmitting, isDirty }, watch } = form;

	const onSubmit = async (data: SecuritySettingsFormData) => {
		try {
			// TODO: Implement API call to update security settings
			console.log('Updating security settings:', data);
			await new Promise(resolve => setTimeout(resolve, 1000)); // Simulate API call

			toast.success('Security settings updated successfully');
			onChange?.();
		} catch (error) {
			toast.error('Failed to update security settings');
			console.error('Update error:', error);
		}
	};

	// Watch for form changes
	React.useEffect(() => {
		if (isDirty) {
			onChange?.();
		}
	}, [isDirty, onChange]);

	const rateLimitRequests = watch('rateLimitRequests');
	const rateLimitWindow = watch('rateLimitWindow');

	return (
		<Form {...form}>
			<form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
				{/* SSL & HTTPS */}
				<div className="space-y-4">
					<h4 className="text-sm font-medium text-gray-900 dark:text-gray-100 flex items-center">
						<Icon icon="lucide:shield-check" className="w-4 h-4 mr-2" />
						SSL & HTTPS Settings
					</h4>

					<FormField
						control={form.control}
						name="enableHsts"
						render={({ field }) => (
							<FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
								<div className="space-y-0.5">
									<FormLabel className="text-base">Enable HSTS (HTTP Strict Transport Security)</FormLabel>
									<FormDescription>Force browsers to use HTTPS connections only</FormDescription>
								</div>
								<FormControl>
									<Switch checked={field.value} onCheckedChange={field.onChange} />
								</FormControl>
							</FormItem>
						)}
					/>
				</div>

				{/* CORS Settings */}
				<div className="space-y-4">
					<h4 className="text-sm font-medium text-gray-900 dark:text-gray-100 flex items-center">
						<Icon icon="lucide:globe" className="w-4 h-4 mr-2" />
						CORS (Cross-Origin Resource Sharing)
					</h4>

					<FormField
						control={form.control}
						name="enableCors"
						render={({ field }) => (
							<FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
								<div className="space-y-0.5">
									<FormLabel className="text-base">Enable CORS</FormLabel>
									<FormDescription>Allow cross-origin requests from specified domains</FormDescription>
								</div>
								<FormControl>
									<Switch checked={field.value} onCheckedChange={field.onChange} />
								</FormControl>
							</FormItem>
						)}
					/>

					{watch('enableCors') && (
						<FormField
							control={form.control}
							name="corsOrigins"
							render={({ field }) => (
								<FormItem>
									<FormLabel>Allowed Origins</FormLabel>
									<FormControl>
										<Textarea
											placeholder="https://example.com&#10;https://app.example.com&#10;*"
											{...field}
										/>
									</FormControl>
									<FormDescription>
										Enter allowed origins (one per line). Use * for all origins (not recommended for production)
									</FormDescription>
									<FormMessage />
								</FormItem>
							)}
						/>
					)}
				</div>

				{/* Content Security Policy */}
				<div className="space-y-4">
					<h4 className="text-sm font-medium text-gray-900 dark:text-gray-100 flex items-center">
						<Icon icon="lucide:shield" className="w-4 h-4 mr-2" />
						Content Security Policy (CSP)
					</h4>

					<FormField
						control={form.control}
						name="enableCsp"
						render={({ field }) => (
							<FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
								<div className="space-y-0.5">
									<FormLabel className="text-base">Enable Content Security Policy</FormLabel>
									<FormDescription>Prevent XSS attacks by controlling resource loading</FormDescription>
								</div>
								<FormControl>
									<Switch checked={field.value} onCheckedChange={field.onChange} />
								</FormControl>
							</FormItem>
						)}
					/>

					{watch('enableCsp') && (
						<FormField
							control={form.control}
							name="cspDirectives"
							render={({ field }) => (
								<FormItem>
									<FormLabel>CSP Directives</FormLabel>
									<FormControl>
										<Textarea
											placeholder="default-src 'self'; script-src 'self' 'unsafe-inline'; style-src 'self' 'unsafe-inline'"
											{...field}
										/>
									</FormControl>
									<FormDescription>
										Enter CSP directives to control resource loading policies
									</FormDescription>
									<FormMessage />
								</FormItem>
							)}
						/>
					)}
				</div>

				{/* Rate Limiting */}
				<div className="space-y-4">
					<h4 className="text-sm font-medium text-gray-900 dark:text-gray-100 flex items-center">
						<Icon icon="lucide:timer" className="w-4 h-4 mr-2" />
						Rate Limiting
					</h4>

					<FormField
						control={form.control}
						name="enableRateLimit"
						render={({ field }) => (
							<FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
								<div className="space-y-0.5">
									<FormLabel className="text-base">Enable Rate Limiting</FormLabel>
									<FormDescription>Limit the number of requests per IP address to prevent abuse</FormDescription>
								</div>
								<FormControl>
									<Switch checked={field.value} onCheckedChange={field.onChange} />
								</FormControl>
							</FormItem>
						)}
					/>

					{watch('enableRateLimit') && (
						<div className="space-y-4">
							<FormField
								control={form.control}
								name="rateLimitRequests"
								render={({ field }) => (
									<FormItem>
										<FormLabel>Max Requests</FormLabel>
										<FormControl>
											<div className="px-3">
												<Slider
													min={10}
													max={1000}
													step={10}
													value={[field.value]}
													onValueChange={(value) => field.onChange(value[0])}
													className="w-full"
												/>
											</div>
										</FormControl>
										<FormDescription>
											Allow up to {rateLimitRequests} requests per time window
										</FormDescription>
										<FormMessage />
									</FormItem>
								)}
							/>

							<FormField
								control={form.control}
								name="rateLimitWindow"
								render={({ field }) => (
									<FormItem>
										<FormLabel>Time Window (minutes)</FormLabel>
										<FormControl>
											<div className="px-3">
												<Slider
													min={1}
													max={60}
													step={1}
													value={[field.value]}
													onValueChange={(value) => field.onChange(value[0])}
													className="w-full"
												/>
											</div>
										</FormControl>
										<FormDescription>
											Reset the request count every {rateLimitWindow} minutes
										</FormDescription>
										<FormMessage />
									</FormItem>
								)}
							/>
						</div>
					)}
				</div>

				{/* Security Status Overview */}
				<div className="bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg p-4">
					<h4 className="text-sm font-medium text-gray-900 dark:text-gray-100 mb-3 flex items-center">
						<Icon icon="lucide:shield-check" className="w-4 h-4 mr-2" />
						Security Status Overview
					</h4>
					<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 text-sm">
						<div className="text-center">
							<div className={`text-lg font-semibold ${watch('enableHsts') ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'}`}>
								{watch('enableHsts') ? 'Secure' : 'Vulnerable'}
							</div>
							<div className="text-gray-600 dark:text-gray-400">HTTPS/SSL</div>
						</div>
						<div className="text-center">
							<div className={`text-lg font-semibold ${watch('enableCors') ? 'text-green-600 dark:text-green-400' : 'text-orange-600 dark:text-orange-400'}`}>
								{watch('enableCors') ? 'Configured' : 'Open'}
							</div>
							<div className="text-gray-600 dark:text-gray-400">CORS Policy</div>
						</div>
						<div className="text-center">
							<div className={`text-lg font-semibold ${watch('enableCsp') ? 'text-green-600 dark:text-green-400' : 'text-orange-600 dark:text-orange-400'}`}>
								{watch('enableCsp') ? 'Protected' : 'Basic'}
							</div>
							<div className="text-gray-600 dark:text-gray-400">XSS Protection</div>
						</div>
						<div className="text-center">
							<div className={`text-lg font-semibold ${watch('enableRateLimit') ? 'text-green-600 dark:text-green-400' : 'text-orange-600 dark:text-orange-400'}`}>
								{watch('enableRateLimit') ? 'Protected' : 'Exposed'}
							</div>
							<div className="text-gray-600 dark:text-gray-400">Rate Limiting</div>
						</div>
					</div>
				</div>

				{/* Security Recommendations */}
				<div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-4">
					<div className="flex items-start space-x-3">
						<Icon icon="lucide:info" className="w-5 h-5 text-blue-600 dark:text-blue-400 mt-0.5" />
						<div className="text-sm">
							<p className="font-medium text-blue-800 dark:text-blue-200 mb-2">
								Security Best Practices
							</p>
							<ul className="text-blue-700 dark:text-blue-300 space-y-1">
								<li>• <strong>Always enable HSTS</strong> to enforce HTTPS connections</li>
								<li>• <strong>Use rate limiting</strong> to prevent brute force attacks and API abuse</li>
								<li>• <strong>Configure CORS carefully</strong> to avoid blocking legitimate requests</li>
								<li>• <strong>Enable CSP</strong> to protect against XSS and injection attacks</li>
								<li>• <strong>Monitor security logs</strong> regularly for suspicious activity</li>
								<li>• <strong>Test security settings</strong> thoroughly before deploying to production</li>
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