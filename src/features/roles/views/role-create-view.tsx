"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { PageHeader } from "@/components/core-pilot-ui";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { cn } from "@/lib/utils";
import type { CreateRoleInput, UpdateRoleInput } from "../types";
import { RoleForm } from "../components";
import { BREADCRUMBS, ROUTES } from "../constants";
import { ArrowLeft, AlertCircle } from "lucide-react";
import { getPageGradient } from "@/lib/page-utils";

export interface RoleCreateViewProps {
	className?: string;
}

export const RoleCreateView: React.FC<RoleCreateViewProps> = ({
	className,
}) => {
	const router = useRouter();
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState<string | null>(null);

	const handleBack = () => {
		router.push(ROUTES.ROLES);
	};

	const handleSubmit = async (data: CreateRoleInput | UpdateRoleInput) => {
		try {
			setLoading(true);
			setError(null);

			// Since this is a create view, cast to CreateRoleInput
			const createData = data as CreateRoleInput;

			// Call the API endpoint to create the role
			const response = await fetch('/api/admin/roles', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify(createData),
			});

			if (!response.ok) {
				const errorData = await response.json();
				throw new Error(errorData.error || 'Failed to create role');
			}

			const result = await response.json();
			console.log("Role created successfully:", result);

			// Redirect to roles list after successful creation
			router.push(ROUTES.ROLES);
		} catch (err) {
			console.error("Role creation error:", err);
			setError(err instanceof Error ? err.message : "Failed to create role");
		} finally {
			setLoading(false);
		}
	};

	return (
		<div className={cn("space-y-6", className)}>
			{/* Modern Page Header */}
			<PageHeader
				title="Create Role"
				description="Create a new role with specific permissions and access levels"
				gradient={getPageGradient("/admin/user-management/roles")}
				breadcrumbs={[
					BREADCRUMBS.ADMIN,
					BREADCRUMBS.USER_MANAGEMENT,
					BREADCRUMBS.ROLES,
					BREADCRUMBS.ROLE_CREATE,
				]}
			>
				<Button variant="outline" onClick={handleBack} className="gap-2">
					<ArrowLeft className="h-4 w-4" />
					Back to Roles
				</Button>
			</PageHeader>

			{/* Error Alert */}
			{error && (
				<Alert variant="destructive">
					<AlertCircle className="h-4 w-4" />
					<AlertDescription>{error}</AlertDescription>
				</Alert>
			)}

			{/* Main Content Container */}
			<div className="container mx-auto">
				<div className="bg-zinc-100 dark:bg-slate-800/90 rounded-2xl shadow-lg/10 shadow-slate-200/30 dark:shadow-slate-900/20  backdrop-blur-sm">
					{/* Form Content */}
					<div className="p-6">
						<RoleForm
							onSubmit={handleSubmit}
							onCancel={handleBack}
							isLoading={loading}
						/>
					</div>
				</div>
			</div>
		</div>
	);
};
