"use client";

import { useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";
import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from "@/components/ui/table";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Checkbox } from "@/components/ui/checkbox";
import {
	Search,
	MoreHorizontal,
	UserPlus,
	Eye,
	Edit,
	Ban,
	Shield,
	Trash2,
	RefreshCw,
} from "lucide-react";
import { useUsers } from "../hooks/use-users";
import { useUserStore } from "../store/user-store";
import {
	getUserRoleLabel,
	getUserRoleColor,
	getUserStatus,
	getUserStatusColor,
	getUserInitials,
	getUserDisplayName,
	canPerformAction,
} from "../utils/user.utils";
import type { User } from "../types";

interface UserListProps {
	onCreateUser?: () => void;
	onEditUser?: (user: User) => void;
	onViewUser?: (user: User) => void;
	onBanUser?: (user: User) => void;
	onDeleteUser?: (user: User) => void;
	currentUser: User;
}

export function UserList({
	onCreateUser,
	onEditUser,
	onViewUser,
	onBanUser,
	onDeleteUser,
	currentUser,
}: UserListProps) {
	const [searchQuery, setSearchQuery] = useState("");

	const {
		filters,
		sortField,
		sortOrder,
		page,
		limit,
		selectedUsers,
		setFilters,
		setSorting,
		setPage,
		setLimit,
		toggleUserSelection,
		clearSelection,
	} = useUserStore();

	const { data, isLoading, refetch } = useUsers({
		page,
		limit,
		sort: sortField,
		order: sortOrder,
		filters: {
			...filters,
			search: searchQuery || undefined,
		},
	});

	console.log("User data:", data);
	console.log("Loading state:", isLoading);
	console.log("Filters:", filters);
	console.log("Sorting:", sortField, sortOrder);
	console.log("Pagination:", page, limit);

	const handleSearch = (value: string) => {
		setSearchQuery(value);
		setPage(1);
	};

	const handleRoleFilter = (role: string) => {
		if (role === "all") {
			setFilters({ role: undefined });
		} else {
			setFilters({ role: role });
		}
	};

	const handleStatusFilter = (status: string) => {
		if (status === "all") {
			setFilters({ banned: undefined, emailVerified: undefined });
		} else if (status === "active") {
			setFilters({ banned: false, emailVerified: true });
		} else if (status === "banned") {
			setFilters({ banned: true });
		} else if (status === "unverified") {
			setFilters({ emailVerified: false });
		}
	};

	const handleSort = (field: string) => {
		const newOrder =
			sortField === field && sortOrder === "asc" ? "desc" : "asc";
		setSorting(field as any, newOrder);
	};

	const handleSelectAll = (checked: boolean) => {
		if (checked && data?.users) {
			// const userIds = data.users.map((user) => user.id);
			// setSelectedUsers(userIds);
		} else {
			clearSelection();
		}
	};

	if (isLoading) {
		return (
			<Card>
				<CardContent className="p-6">
					<div className="flex items-center justify-center">
						<RefreshCw className="h-6 w-6 animate-spin" />
					</div>
				</CardContent>
			</Card>
		);
	}

	return (
		<div className="space-y-4">
			{/* Header */}
			<div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
				<div>
					<h2 className="text-2xl font-bold tracking-tight">Users</h2>
					<p className="text-muted-foreground">
						Manage users and their permissions
					</p>
				</div>
				<div className="flex gap-2">
					<Button onClick={() => refetch()} variant="outline" size="sm">
						<RefreshCw className="h-4 w-4" />
					</Button>
					{onCreateUser && (
						<Button onClick={onCreateUser} size="sm">
							<UserPlus className="h-4 w-4 mr-2" />
							Add User
						</Button>
					)}
				</div>
			</div>

			{/* Filters */}
			<Card>
				<CardContent className="p-4">
					<div className="flex flex-col gap-4 sm:flex-row sm:items-center">
						<div className="flex-1">
							<div className="relative">
								<Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
								<Input
									placeholder="Search users..."
									value={searchQuery}
									onChange={(e) => handleSearch(e.target.value)}
									className="pl-10"
								/>
							</div>
						</div>

						<div className="flex gap-2">
							<Select onValueChange={handleRoleFilter}>
								<SelectTrigger className="w-[140px]">
									<SelectValue placeholder="All Roles" />
								</SelectTrigger>
								<SelectContent>
									<SelectItem value="all">All Roles</SelectItem>
									<SelectItem value="user">User</SelectItem>
									<SelectItem value="admin">Admin</SelectItem>
									<SelectItem value="superadmin">Super Admin</SelectItem>
								</SelectContent>
							</Select>

							<Select onValueChange={handleStatusFilter}>
								<SelectTrigger className="w-[140px]">
									<SelectValue placeholder="All Status" />
								</SelectTrigger>
								<SelectContent>
									<SelectItem value="all">All Status</SelectItem>
									<SelectItem value="active">Active</SelectItem>
									<SelectItem value="banned">Banned</SelectItem>
									<SelectItem value="unverified">Unverified</SelectItem>
								</SelectContent>
							</Select>
						</div>
					</div>
				</CardContent>
			</Card>

			{/* Users Table */}
			<Card>
				<CardContent className="p-0">
					<Table>
						<TableHeader>
							<TableRow>
								<TableHead className="w-12">
									<Checkbox
										checked={selectedUsers.length > 0}
										onCheckedChange={handleSelectAll}
									/>
								</TableHead>
								<TableHead
									className="cursor-pointer"
									onClick={() => handleSort("name")}
								>
									User
								</TableHead>
								<TableHead
									className="cursor-pointer"
									onClick={() => handleSort("role")}
								>
									Role
								</TableHead>
								<TableHead>Status</TableHead>
								<TableHead
									className="cursor-pointer"
									onClick={() => handleSort("createdAt")}
								>
									Joined
								</TableHead>
								<TableHead className="w-12"></TableHead>
							</TableRow>
						</TableHeader>
						<TableBody>
							{data?.users.map((user) => {
								const status = getUserStatus(user);
								const statusColor = getUserStatusColor(status);
								const roleColor = getUserRoleColor(user);

								return (
									<TableRow key={user.id}>
										<TableCell>
											<Checkbox
												checked={selectedUsers.includes(user.id)}
												onCheckedChange={() => toggleUserSelection(user.id)}
											/>
										</TableCell>
										<TableCell>
											<div className="flex items-center gap-3">
												<Avatar className="h-8 w-8">
													<AvatarImage src={user.image} />
													<AvatarFallback className="text-xs">
														{getUserInitials(user)}
													</AvatarFallback>
												</Avatar>
												<div>
													<div className="font-medium">
														{getUserDisplayName(user)}
													</div>
													<div className="text-sm text-muted-foreground">
														{user.email}
													</div>
												</div>
											</div>
										</TableCell>
										<TableCell>
											<Badge className={roleColor}>
												{getUserRoleLabel(user)}
											</Badge>
										</TableCell>
										<TableCell>
											<Badge variant="outline" className={statusColor}>
												{status}
											</Badge>
										</TableCell>
										<TableCell className="text-sm text-muted-foreground">
											{new Date(user.createdAt).toLocaleDateString()}
										</TableCell>
										<TableCell>
											<DropdownMenu>
												<DropdownMenuTrigger asChild>
													<Button variant="ghost" size="sm">
														<MoreHorizontal className="h-4 w-4" />
													</Button>
												</DropdownMenuTrigger>
												<DropdownMenuContent align="end">
													<DropdownMenuLabel>Actions</DropdownMenuLabel>
													<DropdownMenuSeparator />

													{canPerformAction(currentUser, user, "view") && (
														<DropdownMenuItem
															onClick={() => onViewUser?.(user)}
														>
															<Eye className="h-4 w-4 mr-2" />
															View Details
														</DropdownMenuItem>
													)}

													{canPerformAction(currentUser, user, "edit") && (
														<DropdownMenuItem
															onClick={() => onEditUser?.(user)}
														>
															<Edit className="h-4 w-4 mr-2" />
															Edit User
														</DropdownMenuItem>
													)}

													{canPerformAction(currentUser, user, "ban") &&
														!user.banned && (
															<DropdownMenuItem
																onClick={() => onBanUser?.(user)}
															>
																<Ban className="h-4 w-4 mr-2" />
																Ban User
															</DropdownMenuItem>
														)}

													{canPerformAction(
														currentUser,
														user,
														"change-role",
													) && (
														<DropdownMenuItem>
															<Shield className="h-4 w-4 mr-2" />
															Change Role
														</DropdownMenuItem>
													)}

													{canPerformAction(currentUser, user, "delete") && (
														<DropdownMenuItem
															onClick={() => onDeleteUser?.(user)}
															className="text-destructive"
														>
															<Trash2 className="h-4 w-4 mr-2" />
															Delete User
														</DropdownMenuItem>
													)}
												</DropdownMenuContent>
											</DropdownMenu>
										</TableCell>
									</TableRow>
								);
							})}
						</TableBody>
					</Table>
				</CardContent>
			</Card>

			{/* Pagination */}
			{data?.pagination && (
				<div className="flex items-center justify-between">
					<div className="text-sm text-muted-foreground">
						Showing {data.users.length} of {data.pagination.totalCount} users
					</div>
					<div className="flex items-center gap-2">
						<Select
							value={limit.toString()}
							onValueChange={(value) => setLimit(Number(value))}
						>
							<SelectTrigger className="w-[70px]">
								<SelectValue />
							</SelectTrigger>
							<SelectContent>
								<SelectItem value="10">10</SelectItem>
								<SelectItem value="25">25</SelectItem>
								<SelectItem value="50">50</SelectItem>
								<SelectItem value="100">100</SelectItem>
							</SelectContent>
						</Select>

						<div className="flex gap-1">
							<Button
								variant="outline"
								size="sm"
								onClick={() => setPage(page - 1)}
								disabled={page <= 1}
							>
								Previous
							</Button>
							<Button
								variant="outline"
								size="sm"
								onClick={() => setPage(page + 1)}
								disabled={page >= data.pagination.totalPages}
							>
								Next
							</Button>
						</div>
					</div>
				</div>
			)}
		</div>
	);
}
