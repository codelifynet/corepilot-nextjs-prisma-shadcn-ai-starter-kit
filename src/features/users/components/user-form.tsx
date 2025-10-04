"use client";

import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
// Select components removed - will be re-added when role selection is implemented
import {
	Form,
	FormControl,
	FormDescription,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "@/components/ui/form";
import { Switch } from "@/components/ui/switch";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Eye, EyeOff, RefreshCw, Upload } from "lucide-react";
import { createUserSchema, updateUserSchema } from "../schemas";
import {
	getUserInitials,
	generatePassword,
	validatePassword,
} from "../utils/user.utils";
import {
	getUserPrimaryRole,
	type User,
	type CreateUserInput,
	type UpdateUserInput,
} from "../types";

interface UserFormProps {
	user?: User;
	onSubmit: (data: CreateUserInput | UpdateUserInput) => void;
	currentUser: User;
	formId?: string;
	onCancel?: () => void;
	isLoading?: boolean;
}

export function UserForm({
	user,
	onSubmit,
	currentUser,
	formId,
	onCancel,
	isLoading,
}: UserFormProps) {
	const [showPassword, setShowPassword] = useState(false);
	const [generatedPassword, setGeneratedPassword] = useState("");

	const isEditing = !!user;
	const schema = isEditing ? updateUserSchema : createUserSchema;

	const form = useForm({
		resolver: zodResolver(schema),
		defaultValues: isEditing
			? {
				name: user.name,
				email: user.email,
				roleIds: user.userRoles?.map((ur) => ur.roleId) || [],
				emailVerified: user.emailVerified,
			}
			: {
				name: "",
				email: "",
				password: "",
				roleIds: [],
				emailVerified: false,
			},
	});

	const handleGeneratePassword = () => {
		const password = generatePassword(12);
		setGeneratedPassword(password);
		form.setValue("password", password);
	};

	const handleSubmit = (data: any) => {
		onSubmit(data);
	};

	const currentUserPrimaryRole = getUserPrimaryRole(currentUser);
	const canChangeRole = currentUserPrimaryRole?.name === "superadmin";
	const passwordValidation = form.watch("password")
		? validatePassword(form.watch("password"))
		: { isValid: true, errors: [] };

	return (

		<Form {...form}>
			<form
				id={formId}
				onSubmit={form.handleSubmit(handleSubmit)}
				className="space-y-6"
			>
				{/* Profile Picture Section */}
				{isEditing && (
					<div className="flex items-center gap-4">
						<Avatar className="h-16 w-16">
							<AvatarImage src={user.image} />
							<AvatarFallback className="text-lg">
								{getUserInitials(user)}
							</AvatarFallback>
						</Avatar>
						<div>
							<Button type="button" variant="outline" size="sm">
								<Upload className="h-4 w-4 mr-2" />
								Change Photo
							</Button>
							<p className="text-sm text-muted-foreground mt-1">
								JPG, PNG or GIF. Max 2MB.
							</p>
						</div>
					</div>
				)}

				{/* Basic Information */}
				<div className="grid gap-4 md:grid-cols-2">
					<FormField
						control={form.control}
						name="name"
						render={({ field }) => (
							<FormItem>
								<FormLabel>Full Name</FormLabel>
								<FormControl>
									<Input placeholder="Enter full name" {...field} />
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>

					<FormField
						control={form.control}
						name="email"
						render={({ field }) => (
							<FormItem>
								<FormLabel>Email Address</FormLabel>
								<FormControl>
									<Input
										type="email"
										placeholder="Enter email address"
										{...field}
									/>
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>
				</div>

				{/* Password Section (only for new users) */}
				{!isEditing && (
					<div className="space-y-4">
						<FormField
							control={form.control}
							name="password"
							render={({ field }) => (
								<FormItem>
									<FormLabel>Password</FormLabel>
									<FormControl>
										<div className="relative">
											<Input
												type={showPassword ? "text" : "password"}
												placeholder="Enter password"
												{...field}
											/>
											<Button
												type="button"
												variant="ghost"
												size="sm"
												className="absolute right-0 top-0 h-full px-3"
												onClick={() => setShowPassword(!showPassword)}
											>
												{showPassword ? (
													<EyeOff className="h-4 w-4" />
												) : (
													<Eye className="h-4 w-4" />
												)}
											</Button>
										</div>
									</FormControl>
									<FormDescription>
										<span className="space-y-1 block">
											<span className="flex items-center gap-2">
												<Button
													type="button"
													variant="outline"
													size="sm"
													onClick={handleGeneratePassword}
												>
													<RefreshCw className="h-4 w-4 mr-2" />
													Generate
												</Button>
												{generatedPassword && (
													<span className="text-sm text-muted-foreground">
														Generated password: {generatedPassword}
													</span>
												)}
											</span>
											{!passwordValidation.isValid && (
												<span className="text-sm text-destructive block">
													<ul className="list-disc list-inside">
														{passwordValidation.errors.map(
															(error, index) => (
																<li key={index}>{error}</li>
															),
														)}
													</ul>
												</span>
											)}
										</span>
									</FormDescription>
									<FormMessage />
								</FormItem>
							)}
						/>
					</div>
				)}

				{/* Role and Permissions */}
				<div className="space-y-4">
					<FormField
						control={form.control}
						name="roleIds"
						render={({ field }) => (
							<FormItem>
								<FormLabel>Role</FormLabel>
								<input
									type="hidden"
									{...field}
									value={field.value?.join(",") || ""}
								/>
								<FormDescription>
									Note: Role management will be implemented with the new
									RBAC system. For now, users will be assigned default
									roles.
								</FormDescription>
								{!canChangeRole && (
									<FormDescription>
										Only super administrators can change user roles.
									</FormDescription>
								)}
								<FormMessage />
							</FormItem>
						)}
					/>

					<FormField
						control={form.control}
						name="emailVerified"
						render={({ field }) => (
							<FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
								<div className="space-y-0.5">
									<FormLabel className="text-base">
										Email Verified
									</FormLabel>
									<FormDescription>
										Mark this user's email as verified. Verified users can
										access all features immediately.
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
		</div>

		{/* Form Actions */}
		<div className="flex justify-end gap-3 pt-6 border-t">
			{onCancel && (
				<Button
					type="button"
					variant="outline"
					onClick={onCancel}
					disabled={isLoading}
				>
					Cancel
				</Button>
			)}
			<Button
				type="submit"
				disabled={isLoading}
				className="min-w-[100px]"
			>
				{isLoading ? (
					<RefreshCw className="h-4 w-4 animate-spin" />
				) : (
					isEditing ? "Update User" : "Create User"
				)}
			</Button>
		</div>

		</form>
	</Form>

	);
}
