import type React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import {
	Form,
	FormControl,
	FormDescription,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "@/components/ui/form";

import { Icon } from "@iconify/react";
import type { Role, CreateRoleInput, UpdateRoleInput } from "../../types";
import { createRoleSchema, updateRoleSchema } from "../../schemas";
import { PermissionSelector } from "../permissions/permission-selector";

export interface RoleFormProps {
	role?: Role;
	onSubmit: (data: CreateRoleInput | UpdateRoleInput) => Promise<void> | void;
	onCancel?: () => void;
	isLoading?: boolean;
}

export const RoleForm: React.FC<RoleFormProps> = ({
	role,
	onSubmit,
	onCancel,
	isLoading = false,
}) => {
	// Initialize form with React Hook Form and Zod validation
	const form = useForm({
		resolver: zodResolver(role ? updateRoleSchema : createRoleSchema),
		defaultValues: {
			name: role?.name || "",
			description: role?.description || "",
			isActive: role?.isActive ?? true,
			isSystem: role?.isSystem ?? false,
			permissions: role?.permissions || [],
		},
		mode: "onChange",
	});

	const handleFormSubmit = async (data: any) => {
		try {
			// Prepare data based on whether we're creating or updating
			const submitData = role
				? (data as UpdateRoleInput) // For updates, all fields are optional
				: ({
						name: data.name,
						description: data.description || undefined,
						isActive: data.isActive,
						isSystem: data.isSystem,
						permissions: data.permissions || [],
					} as CreateRoleInput);

			await onSubmit(submitData);
		} catch (error) {
			console.error("Form submission error:", error);
		}
	};

	return (
		<div className="w-full max-w-none">
			<Form {...form}>
				<form
					onSubmit={form.handleSubmit(handleFormSubmit)}
					className="space-y-8"
				>
					{/* Role Name */}
					<FormField
						control={form.control}
						name="name"
						render={({ field }) => (
							<FormItem>
								<FormLabel className="text-sm font-semibold text-gray-700 dark:text-gray-300">
									Role Name
								</FormLabel>
								<FormControl>
									<Input
										{...field}
										type="text"
										placeholder="Enter role name (e.g., Admin, Editor, Viewer)"
										disabled={isLoading}
										className="w-full"
									/>
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>

					{/* Description */}
					<FormField
						control={form.control}
						name="description"
						render={({ field }) => (
							<FormItem>
								<FormLabel className="text-sm font-semibold text-gray-700 dark:text-gray-300">
									Description
								</FormLabel>
								<FormControl>
									<Textarea
										{...field}
										placeholder="Describe the role's purpose and responsibilities..."
										disabled={isLoading}
										className="w-full min-h-[80px] resize-none"
									/>
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>

					{/* Active Status */}
					<FormField
						control={form.control}
						name="isActive"
						render={({ field }) => (
							<FormItem>
								<div className="flex items-center justify-between p-4 rounded-lg border border-gray-200 dark:border-gray-700 bg-gray-50/50 dark:bg-gray-800/50">
									<div className="space-y-1">
										<FormLabel className="text-sm font-semibold text-gray-700 dark:text-gray-300 cursor-pointer">
											Active Status
										</FormLabel>
										<FormDescription className="text-xs text-gray-500 dark:text-gray-400">
											Enable or disable this role for users
										</FormDescription>
									</div>
									<FormControl>
										<Switch
											checked={field.value}
											onCheckedChange={field.onChange}
											disabled={isLoading}
										/>
									</FormControl>
								</div>
								<FormMessage />
							</FormItem>
						)}
					/>

					{/* System Role */}
					<FormField
						control={form.control}
						name="isSystem"
						render={({ field }) => (
							<FormItem>
								<div className="flex items-center justify-between p-4 rounded-lg border border-gray-200 dark:border-gray-700 bg-gray-50/50 dark:bg-gray-800/50">
									<div className="space-y-1">
										<FormLabel className="text-sm font-semibold text-gray-700 dark:text-gray-300 cursor-pointer">
											System Role
										</FormLabel>
										<FormDescription className="text-xs text-gray-500 dark:text-gray-400">
											Mark as system role (cannot be deleted)
										</FormDescription>
									</div>
									<FormControl>
										<Switch
											checked={field.value}
											onCheckedChange={field.onChange}
											disabled={isLoading}
										/>
									</FormControl>
								</div>
								<FormMessage />
							</FormItem>
						)}
					/>

					{/* Permissions */}
					<FormField
						control={form.control}
						name="permissions"
						render={({ field }) => (
							<FormItem>
								<FormLabel className="text-sm font-semibold text-gray-700 dark:text-gray-300">
									Permissions
								</FormLabel>
								<FormDescription className="text-xs text-gray-500 dark:text-gray-400 mb-4">
									Select the permissions this role should have
								</FormDescription>
								<FormControl>
									<PermissionSelector
										selectedPermissions={field.value || []}
										onPermissionsChange={field.onChange}
										disabled={isLoading}
									/>
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>

					{/* Action Buttons */}
					<div className="flex flex-col-reverse sm:flex-row sm:justify-end gap-3">
						{onCancel && (
							<Button
								type="button"
								variant="outline"
								onClick={onCancel}
								disabled={isLoading}
								className="w-full sm:w-auto transition-all duration-200 hover:bg-gray-50 dark:hover:bg-gray-800"
							>
								<Icon icon="lucide:x" className="w-4 h-4 mr-2" />
								Cancel
							</Button>
						)}
						<Button
							type="submit"
							disabled={isLoading || !form.formState.isValid}
							className={cn(
								"w-full sm:w-auto transition-all duration-200",
								"bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700",
								"shadow-lg hover:shadow-xl transform hover:scale-[1.02] active:scale-[0.98]",
								"disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none",
							)}
						>
							{isLoading ? (
								<>
									<Icon
										icon="lucide:loader-2"
										className="w-4 h-4 mr-2 animate-spin"
									/>
									Saving...
								</>
							) : (
								<>
									<Icon
										icon={role ? "lucide:save" : "lucide:plus"}
										className="w-4 h-4 mr-2"
									/>
									{role ? "Update Role" : "Create Role"}
								</>
							)}
						</Button>
					</div>
				</form>
			</Form>
		</div>
	);
};
