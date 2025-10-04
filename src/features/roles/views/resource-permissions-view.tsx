"use client";

import React, { useState } from "react";
import type { ResourcePermission, ResourcePermissionFilters } from "../types";
import { ResourcePermissionTable } from "../components";

interface ResourcePermissionsViewProps {
	initialResourcePermissions?: ResourcePermission[];
	onFiltersChange?: (filters: ResourcePermissionFilters) => void;
	onEditResourcePermission?: (resourcePermission: ResourcePermission) => void;
	onDeleteResourcePermission?: (resourcePermissionId: string) => Promise<void>;
	isLoading?: boolean;
	showResource?: boolean;
	showRole?: boolean;
}

export const ResourcePermissionsView: React.FC<
	ResourcePermissionsViewProps
> = ({
	initialResourcePermissions = [],
	onFiltersChange,
	onEditResourcePermission,
	onDeleteResourcePermission,
	isLoading = false,
	showResource = true,
	showRole = true,
}) => {
	const [resourcePermissions] = useState<ResourcePermission[]>(
		initialResourcePermissions,
	);
	const [filters, setFilters] = useState<ResourcePermissionFilters>({
		resourceType: "",
		resourceId: "",
		roleId: "",
		action: "",
	});

	const handleFiltersChange = (newFilters: ResourcePermissionFilters) => {
		setFilters(newFilters);
		onFiltersChange?.(newFilters);
	};

	const handleEditResourcePermission = (
		resourcePermission: ResourcePermission,
	) => {
		onEditResourcePermission?.(resourcePermission);
	};

	const handleDeleteResourcePermission = async (
		resourcePermissionId: string,
	) => {
		if (
			onDeleteResourcePermission &&
			confirm("Are you sure you want to delete this resource permission?")
		) {
			await onDeleteResourcePermission(resourcePermissionId);
		}
	};

	const handleFilterChange = (
		field: keyof ResourcePermissionFilters,
		value: any,
	) => {
		const newFilters = { ...filters, [field]: value };
		handleFiltersChange(newFilters);
	};

	const handleResetFilters = () => {
		const resetFilters: ResourcePermissionFilters = {
			resourceType: "",
			resourceId: "",
			roleId: "",
			action: "",
		};
		handleFiltersChange(resetFilters);
	};

	// Get unique values for filter dropdowns
	const uniqueResourceTypes = [
		...new Set(
			resourcePermissions.map((rp) => rp.resourceType).filter(Boolean),
		),
	];
	const uniqueRoles = [
		...new Set(resourcePermissions.map((rp) => rp.role?.name).filter(Boolean)),
	];
	const uniqueActions = [
		...new Set(resourcePermissions.map((rp) => rp.action).filter(Boolean)),
	];

	return (
		<div className="space-y-6">
			{/* Header */}
			<div className="flex justify-between items-center">
				<div>
					<h1 className="text-2xl font-bold text-gray-900">
						Resource Permissions
					</h1>
					<p className="text-gray-600">Manage resource-specific permissions</p>
				</div>
				<button
					className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
					disabled={isLoading}
				>
					Add Permission
				</button>
			</div>

			{/* Filters */}
			<div className="bg-white p-4 rounded-lg shadow space-y-4">
				<div className="flex items-center justify-between">
					<h3 className="text-lg font-medium text-gray-900">Filters</h3>
					<button
						onClick={handleResetFilters}
						className="text-sm text-indigo-600 hover:text-indigo-500"
					>
						Reset
					</button>
				</div>

				<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
					{showResource && (
						<>
							<div>
								<label
									htmlFor="resourceType"
									className="block text-sm font-medium text-gray-700"
								>
									Resource Type
								</label>
								<select
									id="resourceType"
									value={filters.resourceType || ""}
									onChange={(e) =>
										handleFilterChange(
											"resourceType",
											e.target.value || undefined,
										)
									}
									className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
								>
									<option value="">All Types</option>
									{uniqueResourceTypes.map((type) => (
										<option key={type} value={type}>
											{type}
										</option>
									))}
								</select>
							</div>

							<div>
								<label
									htmlFor="resourceId"
									className="block text-sm font-medium text-gray-700"
								>
									Resource ID
								</label>
								<input
									type="text"
									id="resourceId"
									value={filters.resourceId || ""}
									onChange={(e) =>
										handleFilterChange(
											"resourceId",
											e.target.value || undefined,
										)
									}
									placeholder="Enter resource ID"
									className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
								/>
							</div>
						</>
					)}

					{showRole && (
						<div>
							<label
								htmlFor="role"
								className="block text-sm font-medium text-gray-700"
							>
								Role
							</label>
							<select
								id="role"
								value={filters.roleId || ""}
								onChange={(e) =>
									handleFilterChange("roleId", e.target.value || undefined)
								}
								className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
							>
								<option value="">All Roles</option>
								{uniqueRoles.map((role) => (
									<option key={role} value={role}>
										{role}
									</option>
								))}
							</select>
						</div>
					)}

					<div>
						<label
							htmlFor="action"
							className="block text-sm font-medium text-gray-700"
						>
							Action
						</label>
						<select
							id="action"
							value={filters.action || ""}
							onChange={(e) =>
								handleFilterChange("action", e.target.value || undefined)
							}
							className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
						>
							<option value="">All Actions</option>
							{uniqueActions.map((action) => (
								<option key={action} value={action}>
									{action}
								</option>
							))}
						</select>
					</div>
				</div>
			</div>

			{/* Resource Permissions Table */}
			<div className="bg-white shadow rounded-lg">
				<div className="px-6 py-4 border-b border-gray-200">
					<h2 className="text-lg font-medium text-gray-900">
						Resource Permissions ({resourcePermissions.length})
					</h2>
				</div>
				<ResourcePermissionTable
					resourcePermissions={resourcePermissions}
					onEdit={handleEditResourcePermission}
					onDelete={handleDeleteResourcePermission}
					showResource={showResource}
					showRole={showRole}
				/>
			</div>

			{/* Loading State */}
			{isLoading && (
				<div className="flex justify-center items-center py-8">
					<div className="animate-spin rounded-full h-8 w-8 border-b-2 border-indigo-600"></div>
					<span className="ml-2 text-gray-600">Loading...</span>
				</div>
			)}
		</div>
	);
};
