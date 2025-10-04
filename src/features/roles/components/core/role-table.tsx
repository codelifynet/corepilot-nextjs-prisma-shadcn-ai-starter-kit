import type React from "react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
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
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Icon } from "@iconify/react";
import type { Role } from "../../types";

export interface RoleTableProps {
	roles: Role[];
	onEdit?: (role: Role) => void;
	onDelete?: (roleId: string) => void;
	onView?: (role: Role) => void;
	isLoading?: boolean;
	className?: string;
}

export const RoleTable: React.FC<RoleTableProps> = ({
	roles,
	onEdit,
	onDelete,
	onView,
	isLoading = false,
	className,
}) => {
	const getRoleIcon = (role: Role) => {
		if (role.isSystem) return "lucide:shield-check";
		if (role.name.toLowerCase().includes("admin")) return "lucide:crown";
		if (role.name.toLowerCase().includes("editor")) return "lucide:edit";
		if (role.name.toLowerCase().includes("viewer")) return "lucide:eye";
		return "lucide:user";
	};

	const getRoleBadgeVariant = (
		role: Role,
	): "default" | "secondary" | "destructive" | "outline" => {
		if (!role.isActive) return "destructive";
		if (role.isSystem) return "default";
		return "secondary";
	};

	if (isLoading) {
		return (
			<Card className={cn("w-full", className)}>
				<CardHeader>
					<div className="flex items-center gap-3">
						<div className="p-2 rounded-lg bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-950/50 dark:to-indigo-950/50">
							<Icon
								icon="lucide:users"
								className="w-5 h-5 text-blue-600 dark:text-blue-400"
							/>
						</div>
						<div>
							<CardTitle>Roles</CardTitle>
							<CardDescription>Loading roles...</CardDescription>
						</div>
					</div>
				</CardHeader>
				<CardContent>
					<div className="space-y-3">
						{[...Array(3)].map((_, i) => (
							<div
								key={i}
								className="flex items-center space-x-4 p-4 border rounded-lg"
							>
								<div className="w-8 h-8 bg-gray-200 dark:bg-gray-700 rounded-full animate-pulse" />
								<div className="flex-1 space-y-2">
									<div className="h-4 bg-gray-200 dark:bg-gray-700 rounded animate-pulse" />
									<div className="h-3 bg-gray-200 dark:bg-gray-700 rounded w-2/3 animate-pulse" />
								</div>
								<div className="w-16 h-6 bg-gray-200 dark:bg-gray-700 rounded animate-pulse" />
							</div>
						))}
					</div>
				</CardContent>
			</Card>
		);
	}

	if (roles.length === 0) {
		return (
			<Card className={cn("w-full", className)}>
				<CardContent className="flex flex-col items-center justify-center py-12">
					<div className="p-4 rounded-full bg-gray-100 dark:bg-gray-800 mb-4">
						<Icon icon="lucide:users" className="w-8 h-8 text-gray-400" />
					</div>
					<h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-2">
						No roles found
					</h3>
					<p className="text-sm text-gray-500 dark:text-gray-400 text-center max-w-sm">
						There are no roles to display. Create your first role to get
						started.
					</p>
				</CardContent>
			</Card>
		);
	}

	return (
		<Card className={cn("w-full", className)}>
			<CardHeader>
				<div className="flex items-center justify-between">
					<div className="flex items-center gap-3">
						<div className="p-2 rounded-lg bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-950/50 dark:to-indigo-950/50">
							<Icon
								icon="lucide:users"
								className="w-5 h-5 text-blue-600 dark:text-blue-400"
							/>
						</div>
						<div>
							<CardTitle>Roles</CardTitle>
							<CardDescription>
								{roles.length} {roles.length === 1 ? "role" : "roles"} found
							</CardDescription>
						</div>
					</div>
				</div>
			</CardHeader>

			<CardContent className="p-0">
				<div className="overflow-x-auto">
					<Table>
						<TableHeader>
							<TableRow className="hover:bg-transparent border-b">
								<TableHead className="font-semibold text-gray-900 dark:text-gray-100">
									<div className="flex items-center gap-2">
										<Icon icon="lucide:tag" className="w-4 h-4" />
										Role
									</div>
								</TableHead>
								<TableHead className="font-semibold text-gray-900 dark:text-gray-100">
									<div className="flex items-center gap-2">
										<Icon icon="lucide:file-text" className="w-4 h-4" />
										Description
									</div>
								</TableHead>
								<TableHead className="font-semibold text-gray-900 dark:text-gray-100">
									<div className="flex items-center gap-2">
										<Icon icon="lucide:activity" className="w-4 h-4" />
										Status
									</div>
								</TableHead>
								<TableHead className="font-semibold text-gray-900 dark:text-gray-100 text-right">
									<div className="flex items-center justify-end gap-2">
										<Icon icon="lucide:settings" className="w-4 h-4" />
										Actions
									</div>
								</TableHead>
							</TableRow>
						</TableHeader>
						<TableBody>
							{roles.map((role, index) => (
								<TableRow
									key={role.id}
									className={cn(
										"transition-all duration-200 hover:bg-gray-50/50 dark:hover:bg-gray-800/50",
										"group cursor-pointer",
										index % 2 === 0 && "bg-gray-25/50 dark:bg-gray-900/25",
									)}
									onClick={() => onView?.(role)}
								>
									<TableCell className="py-4">
										<div className="flex items-center gap-3">
											<div
												className={cn(
													"p-2 rounded-lg transition-all duration-200",
													"bg-gradient-to-br from-gray-50 to-gray-100",
													"dark:from-gray-800 dark:to-gray-700",
													"group-hover:from-blue-50 group-hover:to-indigo-50",
													"dark:group-hover:from-blue-950/50 dark:group-hover:to-indigo-950/50",
												)}
											>
												<Icon
													icon={getRoleIcon(role)}
													className={cn(
														"w-4 h-4 transition-colors duration-200",
														"text-gray-600 dark:text-gray-400",
														"group-hover:text-blue-600 dark:group-hover:text-blue-400",
													)}
												/>
											</div>
											<div>
												<div className="font-medium text-gray-900 dark:text-gray-100 flex items-center gap-2">
													{role.name}
													{role.isSystem && (
														<Badge
															variant="outline"
															className="text-xs px-1.5 py-0.5"
														>
															<Icon
																icon="lucide:shield"
																className="w-3 h-3 mr-1"
															/>
															System
														</Badge>
													)}
												</div>
												<div className="text-xs text-gray-500 dark:text-gray-400">
													ID: {role.id.slice(0, 8)}...
												</div>
											</div>
										</div>
									</TableCell>
									<TableCell className="py-4">
										<div className="max-w-xs">
											<p className="text-sm text-gray-600 dark:text-gray-300 line-clamp-2">
												{role.description || (
													<span className="italic text-gray-400 dark:text-gray-500">
														No description provided
													</span>
												)}
											</p>
										</div>
									</TableCell>
									<TableCell className="py-4">
										<Badge
											variant={getRoleBadgeVariant(role)}
											className={cn(
												"transition-all duration-200",
												role.isActive
													? "bg-green-100 text-green-800 hover:bg-green-200 dark:bg-green-900/30 dark:text-green-400"
													: "bg-red-100 text-red-800 hover:bg-red-200 dark:bg-red-900/30 dark:text-red-400",
											)}
										>
											<Icon
												icon={
													role.isActive
														? "lucide:check-circle"
														: "lucide:x-circle"
												}
												className="w-3 h-3 mr-1"
											/>
											{role.isActive ? "Active" : "Inactive"}
										</Badge>
									</TableCell>
									<TableCell className="py-4 text-right">
										<DropdownMenu>
											<DropdownMenuTrigger asChild>
												<Button
													variant="ghost"
													size="sm"
													className={cn(
														"h-8 w-8 p-0 transition-all duration-200",
														"opacity-0 group-hover:opacity-100",
														"hover:bg-gray-100 dark:hover:bg-gray-700",
													)}
													onClick={(e) => e.stopPropagation()}
												>
													<Icon
														icon="lucide:more-horizontal"
														className="w-4 h-4"
													/>
													<span className="sr-only">Open menu</span>
												</Button>
											</DropdownMenuTrigger>
											<DropdownMenuContent align="end" className="w-48">
												{onView && (
													<DropdownMenuItem onClick={() => onView(role)}>
														<Icon icon="lucide:eye" className="w-4 h-4 mr-2" />
														View Details
													</DropdownMenuItem>
												)}
												{onEdit && (
													<DropdownMenuItem onClick={() => onEdit(role)}>
														<Icon icon="lucide:edit" className="w-4 h-4 mr-2" />
														Edit Role
													</DropdownMenuItem>
												)}
												{onDelete && !role.isSystem && (
													<>
														<DropdownMenuSeparator />
														<DropdownMenuItem
															onClick={() => onDelete(role.id)}
															className="text-red-600 dark:text-red-400 focus:text-red-600 dark:focus:text-red-400"
														>
															<Icon
																icon="lucide:trash-2"
																className="w-4 h-4 mr-2"
															/>
															Delete Role
														</DropdownMenuItem>
													</>
												)}
											</DropdownMenuContent>
										</DropdownMenu>
									</TableCell>
								</TableRow>
							))}
						</TableBody>
					</Table>
				</div>
			</CardContent>
		</Card>
	);
};
