"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { PageHeader } from "@/components/ui/page-header";
import { Skeleton } from "@/components/ui/skeleton";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { cn } from "@/lib/utils";
import type { Role, UpdateRoleInput } from "../types";
import { RoleForm } from "../components";
import { BREADCRUMBS, ROUTES } from "../constants";
import { ArrowLeft, AlertCircle, ShieldOff } from "lucide-react";
import { getPageGradient } from "@/lib/page-utils";

export interface RoleEditViewProps {
	roleId: string;
	className?: string;
}

export const RoleEditView: React.FC<RoleEditViewProps> = ({
	roleId,
	className,
}) => {
	const router = useRouter();
	const [role, setRole] = useState<Role | null>(null);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState<string | null>(null);
	const [isSubmitting, setIsSubmitting] = useState(false);

	const handleBack = () => {
		router.push(ROUTES.ROLES);
	};

	useEffect(() => {
		const fetchRole = async () => {
			try {
				setLoading(true);
				setError(null);

				// Fetch role data from API
				const response = await fetch(`/api/admin/roles/${roleId}`);

				if (!response.ok) {
					const errorData = await response.json();
					throw new Error(errorData.error || 'Failed to fetch role');
				}

				const roleData = await response.json();
				setRole(roleData);
			} catch (err) {
				console.error("Role fetch error:", err);
				setError(err instanceof Error ? err.message : "Failed to fetch role");
			} finally {
				setLoading(false);
			}
		};

		fetchRole();
	}, [roleId]);

	const handleSubmit = async (data: UpdateRoleInput) => {
		if (!role) return;

		try {
			setIsSubmitting(true);

			// Call the API endpoint to update the role
			const response = await fetch(`/api/admin/roles/${role.id}`, {
				method: 'PUT',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify(data),
			});

			if (!response.ok) {
				const errorData = await response.json();
				throw new Error(errorData.error || 'Failed to update role');
			}

			const result = await response.json();
			console.log("Role updated successfully:", result);

			// Redirect to role detail after successful update
			router.push(ROUTES.ROLE_DETAIL(role.id));
		} catch (err) {
			console.error("Role update error:", err);
			setError(err instanceof Error ? err.message : "Failed to update role");
		} finally {
			setIsSubmitting(false);
		}
	};

	if (loading) {
		return (
			<div className={cn("space-y-6", className)}>
				{/* Header Skeleton */}
				<div className="space-y-2">
					<Skeleton className="h-8 w-48" />
					<Skeleton className="h-4 w-64" />
				</div>

				{/* Form Skeleton */}
				<div className="space-y-4">
					<Skeleton className="h-10 w-full" />
					<Skeleton className="h-20 w-full" />
					<div className="flex gap-2">
						<Skeleton className="h-5 w-5" />
						<Skeleton className="h-4 w-16" />
					</div>
					<div className="flex gap-2">
						<Skeleton className="h-5 w-5" />
						<Skeleton className="h-4 w-20" />
					</div>
					<div className="flex gap-2 pt-4">
						<Skeleton className="h-10 w-20" />
						<Skeleton className="h-10 w-16" />
					</div>
				</div>
			</div>
		);
	}

	if (error) {
		return (
			<div className={cn("space-y-6", className)}>
				<Alert variant="destructive">
					<AlertCircle className="h-4 w-4" />
					<AlertDescription>{error}</AlertDescription>
				</Alert>
			</div>
		);
	}

	if (!role) {
		return (
			<div className={cn("space-y-6", className)}>
				<div className="flex flex-col items-center justify-center py-12">
					<ShieldOff className="h-12 w-12 text-muted-foreground mb-4" />
					<p className="text-muted-foreground text-center mb-4">
						Role not found
					</p>
					<Button
						variant="outline"
						onClick={handleBack}
						className="flex items-center gap-2"
					>
						<ArrowLeft className="h-4 w-4" />
						Back to Roles
					</Button>
				</div>
			</div>
		);
	}

	return (
		<div
			className={cn(
				"min-h-screen bg-gradient-to-br from-slate-50 via-blue-50/30 to-indigo-50/50 dark:from-slate-900 dark:via-slate-800/50 dark:to-slate-900",
				className,
			)}
		>
			{/* Modern Page Header */}
			<PageHeader
				title="Edit Role"
				description="Update role information and permissions"
				gradient={getPageGradient("/admin/user-management/roles")}
				breadcrumbs={[
					BREADCRUMBS.ADMIN,
					BREADCRUMBS.USER_MANAGEMENT,
					BREADCRUMBS.ROLES,
					BREADCRUMBS.ROLE_EDIT(role?.name),
				]}
			>
				<Button variant="outline" onClick={handleBack} className="gap-2">
					<ArrowLeft className="h-4 w-4" />
					Back to Roles
				</Button>
			</PageHeader>

			{/* Main Content Container */}
			<div className="max-w-4xl mx-auto">
				<div className="bg-zinc-100 dark:bg-slate-800/90 rounded-2xl shadow-lg/10 shadow-slate-200/30 dark:shadow-slate-900/20 backdrop-blur-sm">
					{/* Form Content */}
					<div className="p-6">
						<RoleForm
							role={role}
							onSubmit={handleSubmit}
							onCancel={handleBack}
							isLoading={isSubmitting}
						/>
					</div>
				</div>
			</div>
		</div>
	);
};
