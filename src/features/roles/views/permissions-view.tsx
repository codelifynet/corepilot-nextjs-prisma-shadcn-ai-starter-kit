"use client";

import React, { useState } from "react";
import type { PermissionWithRole, PermissionFilters } from "../types";
import { PermissionTable } from "../components";

interface PermissionsViewProps {
	initialPermissions?: PermissionWithRole[];
	onFiltersChange?: (filters: PermissionFilters) => void;
	onViewPermission?: (permission: PermissionWithRole) => void;
	isLoading?: boolean;
	showRole?: boolean;
}

export const PermissionsView: React.FC<PermissionsViewProps> = ({
	initialPermissions = [],
	onFiltersChange,
	onViewPermission,
	isLoading = false,
	showRole = true,
}) => {
	const [permissions] = useState<PermissionWithRole[]>(initialPermissions);
	const [filters, setFilters] = useState<PermissionFilters>({
		entity: "",
		search: "",
	});
	const [selectedPermission, setSelectedPermission] =
		useState<PermissionWithRole | null>(null);

	const handleFiltersChange = (newFilters: PermissionFilters) => {
		setFilters(newFilters);
		onFiltersChange?.(newFilters);
	};

	const handleViewPermission = (permission: PermissionWithRole) => {
		setSelectedPermission(permission);
		onViewPermission?.(permission);
	};

	const handleFilterChange = (field: keyof PermissionFilters, value: any) => {
		const newFilters = { ...filters, [field]: value };
		handleFiltersChange(newFilters);
	};

	const handleResetFilters = () => {
		const resetFilters: PermissionFilters = {
			entity: "",
			action: "",
			roleId: "",
		};
		handleFiltersChange(resetFilters);
	};

	// Get unique entities and actions for filter dropdowns
	const uniqueEntities = [...new Set(permissions.map((p) => p.entity))].filter(
		Boolean,
	);
	const uniqueActions = [...new Set(permissions.map((p) => p.action))].filter(
		Boolean,
	);

	return (
		<div className="space-y-6">
			{/* Header */}
			<div className="flex justify-between items-center">
				<div>
					<h1 className="text-2xl font-bold text-gray-900">Permissions</h1>
					<p className="text-gray-600">View and manage system permissions</p>
				</div>
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

				<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
					<div>
						<label
							htmlFor="entity"
							className="block text-sm font-medium text-gray-700"
						>
							Entity
						</label>
						<select
							id="entity"
							value={filters.entity || ""}
							onChange={(e) =>
								handleFilterChange("entity", e.target.value || undefined)
							}
							className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
						>
							<option value="">All Entities</option>
							{uniqueEntities.map((entity) => (
								<option key={entity} value={entity}>
									{entity}
								</option>
							))}
						</select>
					</div>

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

			{/* Permission Details Modal */}
			{selectedPermission && (
				<div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50">
					<div className="relative top-20 mx-auto p-5 border w-96 shadow-lg rounded-md bg-white">
						<div className="mt-3">
							<h3 className="text-lg font-medium text-gray-900 mb-4">
								Permission Details
							</h3>
							<div className="space-y-3">
								<div>
									<span className="block text-sm font-medium text-gray-700">
										Entity
									</span>
									<p className="text-sm text-gray-900">
										{selectedPermission.entity}
									</p>
								</div>
								<div>
									<span className="block text-sm font-medium text-gray-700">
										Field
									</span>
									<p className="text-sm text-gray-900">
										{selectedPermission.field || "-"}
									</p>
								</div>
								<div>
									<span className="block text-sm font-medium text-gray-700">
										Action
									</span>
									<p className="text-sm text-gray-900">
										{selectedPermission.action}
									</p>
								</div>
								{showRole && (
									<div>
										<span className="block text-sm font-medium text-gray-700">
											Role
										</span>
										<p className="text-sm text-gray-900">
											{selectedPermission.role?.name || "-"}
										</p>
									</div>
								)}
								<div>
									<span className="block text-sm font-medium text-gray-700">
										Created
									</span>
									<p className="text-sm text-gray-900">
										{new Date(selectedPermission.createdAt).toLocaleString()}
									</p>
								</div>
							</div>
							<div className="mt-6 flex justify-end">
								<button
									onClick={() => setSelectedPermission(null)}
									className="px-4 py-2 bg-gray-300 text-gray-700 rounded-md hover:bg-gray-400 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
								>
									Close
								</button>
							</div>
						</div>
					</div>
				</div>
			)}

			{/* Permissions Table */}
			<div className="bg-white shadow rounded-lg">
				<div className="px-6 py-4 border-b border-gray-200">
					<h2 className="text-lg font-medium text-gray-900">
						Permissions ({permissions.length})
					</h2>
				</div>
				<PermissionTable
					permissions={permissions}
					onView={handleViewPermission}
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
