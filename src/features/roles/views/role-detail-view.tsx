"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { PageHeader } from "@/components/ui/page-header";
import {
	ArrowLeft,
	Edit,
	Trash2,
	AlertCircle,
	ShieldOff,
	Shield,
	Users,
	Calendar,
} from "lucide-react";
import type { Role } from "../types";
import { BREADCRUMBS, ROUTES } from "../constants";
import { getPageGradient } from "@/lib/page-utils";

interface RoleDetailViewProps {
	roleId: string;
	className?: string;
}

export function RoleDetailView({ roleId, className }: RoleDetailViewProps) {
	const router = useRouter();
	const [role, setRole] = useState<Role | null>(null);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState<string | null>(null);

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

		if (roleId) {
			fetchRole();
		}
	}, [roleId]);

	const handleBack = () => {
		router.push(ROUTES.ROLES);
	};

	const handleEdit = () => {
		router.push(ROUTES.ROLE_EDIT(roleId));
	};

	const handleDelete = () => {
		// TODO: Implement delete functionality
		console.log("Delete role:", roleId);
		// Show confirmation dialog and handle deletion
	};

	if (loading) {
		return (
			<div className={cn("space-y-6", className)}>
				{/* Header Skeleton */}
				<div className="space-y-2">
					<Skeleton className="h-8 w-48" />
					<Skeleton className="h-4 w-64" />
				</div>

				{/* Content Skeleton */}
				<div className="grid gap-6 md:grid-cols-2">
					<div className="space-y-4">
						<Skeleton className="h-6 w-32" />
						<Skeleton className="h-4 w-full" />
						<Skeleton className="h-4 w-3/4" />
					</div>
					<div className="space-y-4">
						<Skeleton className="h-6 w-32" />
						<div className="flex flex-wrap gap-2">
							<Skeleton className="h-6 w-20" />
							<Skeleton className="h-6 w-24" />
							<Skeleton className="h-6 w-18" />
						</div>
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
			<div className="flex flex-col items-center justify-center py-12 space-y-4">
				<ShieldOff className="h-12 w-12 text-muted-foreground" />
				<p className="text-lg font-medium">Role not found</p>
				<Button variant="outline" onClick={handleBack}>
					<ArrowLeft className="h-4 w-4 mr-2" />
					Back to Roles
				</Button>
			</div>
		);
	}

	return (
		<div className={cn("space-y-6", className)}>
			{/* Modern Page Header */}
			<PageHeader
				title={role.name}
				description={role.description || "Role details and permissions"}
				gradient={getPageGradient("/admin/user-management/roles")}
				breadcrumbs={[
					BREADCRUMBS.ADMIN,
					BREADCRUMBS.USER_MANAGEMENT,
					BREADCRUMBS.ROLES,
					BREADCRUMBS.ROLE_DETAIL(role.name),
				]}
			>
				<div className="flex gap-2">
					<Button variant="outline" onClick={handleBack} className="gap-2">
						<ArrowLeft className="h-4 w-4" />
						Back to Roles
					</Button>
					<Button variant="outline" onClick={handleEdit} className="gap-2">
						<Edit className="h-4 w-4" />
						Edit Role
					</Button>
					<Button
						variant="destructive"
						onClick={handleDelete}
						className="gap-2"
					>
						<Trash2 className="h-4 w-4" />
						Delete Role
					</Button>
				</div>
			</PageHeader>

			{/* Role Information Cards */}
			<div className="grid gap-6 md:grid-cols-2">
				{/* Role Details Card */}
				<div className="bg-white dark:bg-slate-800/90 rounded-2xl shadow-lg/10 shadow-slate-200/30 dark:shadow-slate-900/20 border border-slate-200/60 dark:border-slate-700/60 p-6 backdrop-blur-sm">
					<div className="flex items-center gap-3 mb-6">
						<div className="p-2 bg-gradient-to-br from-purple-100 to-indigo-100 dark:from-purple-900/30 dark:to-indigo-900/30 rounded-xl">
							<Shield className="h-5 w-5 text-purple-600 dark:text-purple-400" />
						</div>
						<h3 className="text-lg font-semibold text-gray-900 dark:text-white flex items-center gap-2">
							<div className="w-2 h-2 bg-purple-500 rounded-full"></div>
							Role Information
						</h3>
					</div>
					<div className="space-y-4">
						<div className="flex items-center justify-between p-3 bg-slate-50 dark:bg-slate-700/50 rounded-xl">
							<div className="text-sm font-medium text-muted-foreground flex items-center gap-2">
								<div className="w-2 h-2 bg-blue-500 rounded-full"></div>
								Name
							</div>
							<p className="text-sm font-semibold text-gray-900 dark:text-white">
								{role.name}
							</p>
						</div>
						{role.description && (
							<div className="p-3 bg-slate-50 dark:bg-slate-700/50 rounded-xl">
								<div className="text-sm font-medium text-muted-foreground mb-2 flex items-center gap-2">
									<div className="w-2 h-2 bg-green-500 rounded-full"></div>
									Description
								</div>
								<p className="text-sm text-gray-700 dark:text-gray-300">
									{role.description}
								</p>
							</div>
						)}
						<div className="flex items-center justify-between p-3 bg-slate-50 dark:bg-slate-700/50 rounded-xl">
							<div className="text-sm font-medium text-muted-foreground flex items-center gap-2">
								<div className="w-2 h-2 bg-purple-500 rounded-full"></div>
								Status
							</div>
							<Badge
								variant={role.isActive ? "default" : "secondary"}
								className="font-medium"
							>
								{role.isActive ? "Active" : "Inactive"}
							</Badge>
						</div>
						<div className="grid grid-cols-2 gap-3">
							<div className="p-3 bg-slate-50 dark:bg-slate-700/50 rounded-xl">
								<div className="text-sm font-medium text-muted-foreground flex items-center gap-2 mb-1">
									<div className="w-2 h-2 bg-orange-500 rounded-full"></div>
									<Calendar className="h-3 w-3" />
									Created
								</div>
								<p className="text-sm font-medium text-gray-900 dark:text-white">
									{role.createdAt.toLocaleDateString()}
								</p>
							</div>
							<div className="p-3 bg-slate-50 dark:bg-slate-700/50 rounded-xl">
								<div className="text-sm font-medium text-muted-foreground flex items-center gap-2 mb-1">
									<div className="w-2 h-2 bg-red-500 rounded-full"></div>
									<Calendar className="h-3 w-3" />
									Updated
								</div>
								<p className="text-sm font-medium text-gray-900 dark:text-white">
									{role.updatedAt.toLocaleDateString()}
								</p>
							</div>
						</div>
						{role.userCount !== undefined && (
							<div className="flex items-center justify-between p-3 bg-slate-50 dark:bg-slate-700/50 rounded-xl">
								<div className="text-sm font-medium text-muted-foreground flex items-center gap-2">
									<div className="w-2 h-2 bg-indigo-500 rounded-full"></div>
									<Users className="h-3 w-3" />
									Assigned Users
								</div>
								<p className="text-sm font-semibold text-gray-900 dark:text-white">
									{role.userCount} users
								</p>
							</div>
						)}
					</div>
				</div>

				{/* Permissions Card */}
				<div className="bg-white dark:bg-slate-800/90 rounded-2xl shadow-lg/10 shadow-slate-200/30 dark:shadow-slate-900/20 border border-slate-200/60 dark:border-slate-700/60 p-6 backdrop-blur-sm">
					<div className="flex items-center gap-3 mb-6">
						<div className="p-2 bg-gradient-to-br from-emerald-100 to-teal-100 dark:from-emerald-900/30 dark:to-teal-900/30 rounded-xl">
							<Shield className="h-5 w-5 text-emerald-600 dark:text-emerald-400" />
						</div>
						<h3 className="text-lg font-semibold text-gray-900 dark:text-white flex items-center gap-2">
							<div className="w-2 h-2 bg-emerald-500 rounded-full"></div>
							Permissions
						</h3>
					</div>
					<div className="space-y-3">
						{role.permissions && role.permissions.length > 0 ? (
							<div className="flex flex-wrap gap-2">
								{role.permissions.map((permission, index) => (
									<Badge
										key={`${permission.entity}-${permission.field}-${permission.action}-${index}`}
										variant="outline"
										className="bg-emerald-50 dark:bg-emerald-900/20 border-emerald-200 dark:border-emerald-700 text-emerald-700 dark:text-emerald-300 font-medium"
									>
										{`${permission.entity}.${permission.field}:${permission.action}`}
									</Badge>
								))}
							</div>
						) : (
							<div className="flex items-center justify-center p-8 bg-slate-50 dark:bg-slate-700/50 rounded-xl">
								<div className="text-center">
									<Shield className="h-8 w-8 text-muted-foreground mx-auto mb-2" />
									<p className="text-sm text-muted-foreground font-medium">
										No permissions assigned
									</p>
								</div>
							</div>
						)}
					</div>
				</div>
			</div>
		</div>
	);
}
