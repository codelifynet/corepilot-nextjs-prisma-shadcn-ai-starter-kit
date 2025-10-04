"use client";

import React, { useState } from "react";
import type { UserRoleWithRelations, UserRoleFilters } from "../types";
import { UserRoleTable } from "../components";
import { Icon } from "@iconify/react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";

interface UserRolesViewProps {
	initialUserRoles?: UserRoleWithRelations[];
	onFiltersChange?: (filters: UserRoleFilters) => void;
	onEditUserRole?: (userRole: UserRoleWithRelations) => void;
	onDeleteUserRole?: (userRoleId: string) => Promise<void>;
	isLoading?: boolean;
	showUser?: boolean;
	showRole?: boolean;
	className?: string;
}

export const UserRolesView: React.FC<UserRolesViewProps> = ({
	initialUserRoles = [],
	onFiltersChange,
	onEditUserRole,
	onDeleteUserRole,
	isLoading = false,
	showUser = true,
	showRole = true,
	className,
}) => {
	const [userRoles] = useState<UserRoleWithRelations[]>(initialUserRoles);
	const [filters, setFilters] = useState<UserRoleFilters>({
		userId: "",
		roleId: "",
	});

	const handleFiltersChange = (newFilters: UserRoleFilters) => {
		setFilters(newFilters);
		onFiltersChange?.(newFilters);
	};

	const handleEditUserRole = (userRole: UserRoleWithRelations) => {
		onEditUserRole?.(userRole);
	};

	const handleDeleteUserRole = async (userRoleId: string) => {
		if (
			onDeleteUserRole &&
			confirm("Are you sure you want to remove this role assignment?")
		) {
			await onDeleteUserRole(userRoleId);
		}
	};

	const handleFilterChange = (field: keyof UserRoleFilters, value: any) => {
		const newFilters = { ...filters, [field]: value };
		handleFiltersChange(newFilters);
	};

	const handleResetFilters = () => {
		const resetFilters: UserRoleFilters = {
			userId: "",
			roleId: "",
		};
		handleFiltersChange(resetFilters);
	};

	// Get unique users and roles for filter dropdowns
	const uniqueUsers = [
		...new Set(
			userRoles.map((ur) => ur.user?.email || ur.user?.name).filter(Boolean),
		),
	];
	const uniqueRoles = [
		...new Set(userRoles.map((ur) => ur.role?.name).filter(Boolean)),
	];

	return (
		<div className={cn("space-y-6", className)}>
			{/* Header */}
			<Card>
				<CardHeader>
					<div className="flex justify-between items-start">
						<div className="space-y-1">
							<CardTitle className="flex items-center gap-2">
								<Icon icon="mdi:account-group" className="h-6 w-6" />
								User Role Assignments
							</CardTitle>
							<p className="text-sm text-muted-foreground">
								Manage user role assignments
							</p>
						</div>
						<Button disabled={isLoading} className="flex items-center gap-2">
							<Icon icon="mdi:plus" className="h-4 w-4" />
							Assign Role
						</Button>
					</div>
				</CardHeader>
			</Card>

			{/* Filters */}
			<Card>
				<CardHeader>
					<div className="flex items-center justify-between">
						<CardTitle className="flex items-center gap-2">
							<Icon icon="mdi:filter" className="h-5 w-5" />
							Filters
						</CardTitle>
						<Button
							variant="ghost"
							size="sm"
							onClick={handleResetFilters}
							className="flex items-center gap-2"
						>
							<Icon icon="mdi:refresh" className="h-4 w-4" />
							Reset
						</Button>
					</div>
				</CardHeader>
				<CardContent>
					<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
						{showUser && (
							<div className="space-y-2">
								<Label htmlFor="user">User</Label>
								<Select
									value={filters.userId || ""}
									onValueChange={(value) =>
										handleFilterChange("userId", value || undefined)
									}
								>
									<SelectTrigger>
										<SelectValue placeholder="All Users" />
									</SelectTrigger>
									<SelectContent>
										<SelectItem value="">All Users</SelectItem>
										{uniqueUsers.map((user) => (
											<SelectItem key={user} value={user || ""}>
												{user}
											</SelectItem>
										))}
									</SelectContent>
								</Select>
							</div>
						)}

						{showRole && (
							<div className="space-y-2">
								<Label htmlFor="role">Role</Label>
								<Select
									value={filters.roleId || ""}
									onValueChange={(value) =>
										handleFilterChange("roleId", value || undefined)
									}
								>
									<SelectTrigger>
										<SelectValue placeholder="All Roles" />
									</SelectTrigger>
									<SelectContent>
										<SelectItem value="">All Roles</SelectItem>
										{uniqueRoles.map((role) => (
											<SelectItem key={role} value={role || ""}>
												{role}
											</SelectItem>
										))}
									</SelectContent>
								</Select>
							</div>
						)}
					</div>
				</CardContent>
			</Card>

			{/* User Roles Table */}
			<Card>
				<CardHeader>
					<CardTitle className="flex items-center gap-2">
						<Icon icon="mdi:table" className="h-5 w-5" />
						User Role Assignments ({userRoles.length})
					</CardTitle>
				</CardHeader>
				<CardContent className="p-0">
					<UserRoleTable
						userRoles={userRoles}
						onEdit={handleEditUserRole}
						onDelete={handleDeleteUserRole}
						showUser={showUser}
						showRole={showRole}
					/>
				</CardContent>
			</Card>

			{/* Loading State */}
			{isLoading && (
				<Card>
					<CardContent className="flex justify-center items-center py-8">
						<Icon icon="mdi:loading" className="h-6 w-6 animate-spin mr-2" />
						<span className="text-muted-foreground">Loading...</span>
					</CardContent>
				</Card>
			)}
		</div>
	);
};
