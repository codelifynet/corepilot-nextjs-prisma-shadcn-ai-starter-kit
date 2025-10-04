"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { formatDate } from "@/utils/date-formatter";
import { cn } from "@/lib/utils";
import type { Role } from "../types";
import { ROUTES } from "../constants";
import { useRoles, useRoleStats, useDeleteRole } from "../hooks/use-roles";
import {
	Plus,
	Shield,
	Users,
	Settings,
	Activity,
	Eye,
	Edit,
	Trash2,
	ShieldCheck,
} from "lucide-react";
import { StatsCard, PageHeader } from "@/components/core-pilot-ui";
import {
	AdvancedDataTable,
	type TableColumn,
	type TableAction,
} from "@/components/core-pilot-ui/advanced-data-table";
import { getPageGradient } from "@/lib/page-utils";

interface RolesViewProps {
	className?: string;
}

export const RolesView: React.FC<RolesViewProps> = ({ className }) => {
	const router = useRouter();
	const [filters] = useState({});

	// API hooks
	const { data: rolesData, isLoading } = useRoles(filters);
	const { data: statsData } = useRoleStats();
	const deleteRoleMutation = useDeleteRole();

	const roles = rolesData?.roles || [];
	const stats = statsData || {
		totalRoles: 0,
		activeRoles: 0,
		systemRoles: 0,
		customRoles: 0,
	};

	const handleCreate = () => {
		router.push(ROUTES.ROLE_CREATE);
	};

	const handleViewDetails = (role: Role) => {
		router.push(ROUTES.ROLE_DETAIL(role.id));
	};

	const handleView = (role: Role) => {
		router.push(ROUTES.ROLE_DETAIL(role.id));
	};

	const handleEdit = (role: Role) => {
		router.push(ROUTES.ROLE_EDIT(role.id));
	};

	const handleDelete = async (role: Role) => {
		if (role.isSystem) {
			// Prevent deletion of system roles
			console.warn("Cannot delete system role:", role.name);
			return;
		}

		try {
			await deleteRoleMutation.mutateAsync(role.id);
			console.log("Role deleted successfully:", role.name);
		} catch (error) {
			console.error("Failed to delete role:", error);
			// You might want to show a toast notification here
		}
	};

	const columns: TableColumn<Role>[] = [
		{
			key: "name",
			label: "Role Name",
			sortable: true,
			filterable: true,
			width: "w-1/3",
			render: (role) => (
				<div className="flex items-center gap-3">
					<div>
						<div className="font-medium text-gray-900 dark:text-gray-100 flex items-center gap-2">
							{role.name}
							{role.isSystem && (
								<Badge variant="outline" className="text-xs px-1.5 py-0.5">
									<Shield className="w-3 h-3 mr-1" />
									System
								</Badge>
							)}
						</div>
						<div className="text-xs text-gray-500 dark:text-gray-400">
							ID: {role.id.slice(0, 8)}...
						</div>
					</div>
				</div>
			),
		},
		{
			key: "description",
			label: "Description",
			filterable: true,
			width: "w-1/3",
			render: (role) => (
				<div className="max-w-xs">
					<p className="text-sm text-gray-600 dark:text-gray-300 line-clamp-2">
						{role.description || (
							<span className="italic text-gray-400 dark:text-gray-500">
								No description provided
							</span>
						)}
					</p>
				</div>
			),
		},
		{
			key: "isActive",
			label: "Status",
			sortable: true,
			filterable: true,
			filterType: "select",
			filterOptions: [
				{ label: "Active", value: "true" },
				{ label: "Inactive", value: "false" },
			],
			width: "w-32",
			render: (role) => (
				<Badge
					variant={role.isActive ? "default" : "secondary"}
					className={cn(
						"flex items-center gap-1 w-fit",
						role.isActive
							? "bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400"
							: "bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-400",
					)}
				>
					<div
						className={cn(
							"w-2 h-2 rounded-full",
							role.isActive ? "bg-green-500" : "bg-gray-400",
						)}
					/>
					{role.isActive ? "Active" : "Inactive"}
				</Badge>
			),
		},
		{
			key: "createdAt",
			label: "Created",
			sortable: true,
			width: "w-32",
			render: (role) => (
				<div className="text-sm text-gray-600 dark:text-gray-300">
					{formatDate(role.createdAt)}
				</div>
			),
		},
		{
			key: "_count",
			label: "Usage",
			width: "w-40",
			render: (role) => (
				<div className="space-y-1">
					<div className="flex items-center gap-2 text-xs">
						<Users className="h-3 w-3 text-blue-500" />
						<span className="text-gray-600 dark:text-gray-300">
							{role._count?.userRoles || 0} users
						</span>
					</div>
					<div className="flex items-center gap-2 text-xs">
						<ShieldCheck className="h-3 w-3 text-green-500" />
						<span className="text-gray-600 dark:text-gray-300">
							{role._count?.permissions || 0} permissions
						</span>
					</div>
				</div>
			),
		},
	];

	const actions: TableAction<Role>[] = [
		{
			label: "View Details",
			onClick: handleViewDetails,
			variant: "default",
			icon: <Eye className="h-4 w-4" />,
		},
		{
			label: "Edit Role",
			onClick: handleEdit,
			variant: "default",
			icon: <Edit className="h-4 w-4" />,
		},
		{
			label: (role: Role) =>
				role.isSystem ? "Cannot Delete System Role" : "Delete Role",
			onClick: handleDelete,
			variant: "destructive",
			separator: true,
			icon: <Trash2 className="h-4 w-4" />,
			requiresConfirmation: true,
			confirmationTitle: "Delete Role",
			confirmationDescription:
				"Are you sure you want to delete this role? This action cannot be undone and will affect all users assigned to this role.",
		},
	];

	return (
		<div className={cn("space-y-6", className)}>
			{/* Page Header */}
			<PageHeader
				title="Role Management"
				description="Manage user roles and permissions across your application"
				gradient={getPageGradient("/admin/user-management/roles")}
			>
				<Button onClick={handleCreate} className="gap-2">
					<Plus className="h-4 w-4" />
					Create Role
				</Button>
			</PageHeader>

			{/* Stats Cards */}
			<div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
				<StatsCard
					title="Total Roles"
					value={isLoading ? "..." : stats.totalRoles}
					description="Roles in system"
					icon={<Shield className="h-4 w-4 text-white" />}
					gradient="from-blue-500 to-blue-600"
				/>

				<StatsCard
					title="Active Roles"
					value={isLoading ? "..." : stats.activeRoles}
					description="Currently active roles"
					icon={<Users className="h-4 w-4 text-white" />}
					gradient="from-green-500 to-green-600"
				/>

				<StatsCard
					title="System Roles"
					value={isLoading ? "..." : stats.systemRoles}
					description="Protected system roles"
					icon={<Settings className="h-4 w-4 text-white" />}
					gradient="from-purple-500 to-purple-600"
				/>

				<StatsCard
					title="Custom Roles"
					value={isLoading ? "..." : stats.customRoles}
					description="User-created roles"
					icon={<Activity className="h-4 w-4 text-white" />}
					gradient="from-orange-500 to-orange-600"
				/>
			</div>

			{/* Advanced Data Table */}
			<AdvancedDataTable
				data={roles}
				columns={columns}
				actions={actions}
				isLoading={isLoading}
				loadingRows={6}
				showViewAction={true}
				onViewDetails={handleViewDetails}
				searchable={true}
				searchPlaceholder="Search roles by name, description..."
				pagination={true}
				pageSize={10}
				onRowClick={handleView}
				emptyMessage="No roles have been created yet. Create your first role to get started with role management."
				emptySearchMessage="No roles match your search criteria. Try adjusting your search terms or filters."
			/>
		</div>
	);
};
