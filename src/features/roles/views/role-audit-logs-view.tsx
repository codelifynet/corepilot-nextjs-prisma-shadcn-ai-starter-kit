"use client";

import React, { useState } from "react";
import type { RoleAuditLogWithRelations, RoleAuditLogFilters } from "../types";
import { RoleAuditLogTable } from "../components";

interface RoleAuditLogsViewProps {
	initialAuditLogs?: RoleAuditLogWithRelations[];
	onFiltersChange?: (filters: RoleAuditLogFilters) => void;
	onViewAuditLog?: (auditLog: RoleAuditLogWithRelations) => void;
	isLoading?: boolean;
	showRole?: boolean;
	showUser?: boolean;
}

export const RoleAuditLogsView: React.FC<RoleAuditLogsViewProps> = ({
	initialAuditLogs = [],
	onFiltersChange,
	onViewAuditLog,
	isLoading = false,
	showRole = true,
	showUser = true,
}) => {
	const [auditLogs] = useState<RoleAuditLogWithRelations[]>(initialAuditLogs);
	const [filters, setFilters] = useState<RoleAuditLogFilters>({
		roleId: "",
		userId: "",
		action: undefined,
		dateFrom: undefined,
		dateTo: undefined,
	});
	const [selectedAuditLog, setSelectedAuditLog] =
		useState<RoleAuditLogWithRelations | null>(null);
	const [isModalOpen, setIsModalOpen] = useState(false);

	const handleFiltersChange = (newFilters: RoleAuditLogFilters) => {
		setFilters(newFilters);
		onFiltersChange?.(newFilters);
	};

	const handleViewAuditLog = (auditLog: RoleAuditLogWithRelations) => {
		setSelectedAuditLog(auditLog);
		setIsModalOpen(true);
		onViewAuditLog?.(auditLog);
	};

	const handleFilterChange = (field: keyof RoleAuditLogFilters, value: any) => {
		const newFilters = { ...filters, [field]: value };
		handleFiltersChange(newFilters);
	};

	const handleResetFilters = () => {
		const resetFilters: RoleAuditLogFilters = {
			roleId: "",
			userId: "",
			action: undefined,
			dateFrom: undefined,
			dateTo: undefined,
		};
		handleFiltersChange(resetFilters);
	};

	// Get unique values for filter dropdowns
	const uniqueRoles = [
		...new Set(auditLogs.map((log) => log.role?.name).filter(Boolean)),
	];
	const uniqueUsers = [
		...new Set(
			auditLogs.map((log) => log.user?.email || log.user?.name).filter(Boolean),
		),
	];
	const uniqueActions = [
		...new Set(auditLogs.map((log) => log.action).filter(Boolean)),
	];

	return (
		<div className="space-y-6">
			{/* Header */}
			<div className="flex justify-between items-center">
				<div>
					<h1 className="text-2xl font-bold text-gray-900">Role Audit Logs</h1>
					<p className="text-gray-600">
						Track role-related activities and changes
					</p>
				</div>
				<div className="flex space-x-2">
					<button
						className="px-4 py-2 bg-gray-600 text-white rounded-md hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
						disabled={isLoading}
					>
						Export
					</button>
					<button
						onClick={handleResetFilters}
						className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
					>
						Clear Filters
					</button>
				</div>
			</div>

			{/* Filters */}
			<div className="bg-white p-4 rounded-lg shadow space-y-4">
				<div className="flex items-center justify-between">
					<h3 className="text-lg font-medium text-gray-900">Filters</h3>
					<span className="text-sm text-gray-500">
						{auditLogs.length} logs found
					</span>
				</div>

				<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
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

					{showUser && (
						<div>
							<label
								htmlFor="user"
								className="block text-sm font-medium text-gray-700"
							>
								User
							</label>
							<select
								id="user"
								value={filters.userId || ""}
								onChange={(e) =>
									handleFilterChange("userId", e.target.value || undefined)
								}
								className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
							>
								<option value="">All Users</option>
								{uniqueUsers.map((user) => (
									<option key={user} value={user}>
										{user}
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

				<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
					<div>
						<label
							htmlFor="dateFrom"
							className="block text-sm font-medium text-gray-700"
						>
							From Date
						</label>
						<input
							type="date"
							id="dateFrom"
							value={
								filters.dateFrom
									? new Date(filters.dateFrom).toISOString().split("T")[0]
									: ""
							}
							onChange={(e) =>
								handleFilterChange(
									"dateFrom",
									e.target.value ? new Date(e.target.value) : undefined,
								)
							}
							className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
						/>
					</div>

					<div>
						<label
							htmlFor="dateTo"
							className="block text-sm font-medium text-gray-700"
						>
							To Date
						</label>
						<input
							type="date"
							id="dateTo"
							value={
								filters.dateTo
									? new Date(filters.dateTo).toISOString().split("T")[0]
									: ""
							}
							onChange={(e) =>
								handleFilterChange(
									"dateTo",
									e.target.value ? new Date(e.target.value) : undefined,
								)
							}
							className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
						/>
					</div>
				</div>
			</div>

			{/* Audit Logs Table */}
			<div className="bg-white shadow rounded-lg">
				<div className="px-6 py-4 border-b border-gray-200">
					<h2 className="text-lg font-medium text-gray-900">
						Audit Logs ({auditLogs.length})
					</h2>
				</div>
				<RoleAuditLogTable
					auditLogs={auditLogs}
					onView={handleViewAuditLog}
					showRole={showRole}
					showUser={showUser}
				/>
			</div>

			{/* Audit Log Detail Modal */}
			{isModalOpen && selectedAuditLog && (
				<div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50">
					<div className="relative top-20 mx-auto p-5 border w-11/12 md:w-3/4 lg:w-1/2 shadow-lg rounded-md bg-white">
						<div className="flex items-center justify-between mb-4">
							<h3 className="text-lg font-medium text-gray-900">
								Audit Log Details
							</h3>
							<button
								onClick={() => setIsModalOpen(false)}
								className="text-gray-400 hover:text-gray-600"
							>
								<span className="sr-only">Close</span>
								<svg
									className="h-6 w-6"
									fill="none"
									viewBox="0 0 24 24"
									stroke="currentColor"
								>
									<title>Close modal</title>
									<path
										strokeLinecap="round"
										strokeLinejoin="round"
										strokeWidth={2}
										d="M6 18L18 6M6 6l12 12"
									/>
								</svg>
							</button>
						</div>

						<div className="space-y-4">
							<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
								<div>
									<span className="block text-sm font-medium text-gray-700">
										Action
									</span>
									<p className="text-sm text-gray-900">
										{selectedAuditLog.action}
									</p>
								</div>
								<div>
									<span className="block text-sm font-medium text-gray-700">
										Timestamp
									</span>
									<p className="text-sm text-gray-900">
										{new Date(selectedAuditLog.timestamp).toLocaleString()}
									</p>
								</div>
								{showRole && selectedAuditLog.role && (
									<div>
										<span className="block text-sm font-medium text-gray-700">
											Role
										</span>
										<p className="text-sm text-gray-900">
											{selectedAuditLog.role.name}
										</p>
									</div>
								)}
								{showUser && selectedAuditLog.user && (
									<div>
										<span className="block text-sm font-medium text-gray-700">
											User
										</span>
										<p className="text-sm text-gray-900">
											{selectedAuditLog.user.email ||
												selectedAuditLog.user.name}
										</p>
									</div>
								)}
							</div>

							{selectedAuditLog.details && (
								<div>
									<span className="block text-sm font-medium text-gray-700 mb-2">
										Details
									</span>
									<pre className="text-sm text-gray-900 bg-gray-50 p-3 rounded border overflow-x-auto">
										{JSON.stringify(selectedAuditLog.details, null, 2)}
									</pre>
								</div>
							)}
						</div>

						<div className="flex justify-end mt-6">
							<button
								onClick={() => setIsModalOpen(false)}
								className="px-4 py-2 bg-gray-300 text-gray-700 rounded-md hover:bg-gray-400 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
							>
								Close
							</button>
						</div>
					</div>
				</div>
			)}

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
