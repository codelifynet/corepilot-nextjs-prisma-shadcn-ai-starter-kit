import type React from "react";
import { Icon } from "@iconify/react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
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
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Skeleton } from "@/components/ui/skeleton";
import { cn } from "@/lib/utils";
import type { Permission, PermissionWithRole } from "../../types";

export interface PermissionTableProps {
	permissions: Array<Permission | PermissionWithRole>;
	onView?: (permission: Permission | PermissionWithRole) => void;
	onEdit?: (permission: Permission | PermissionWithRole) => void;
	onDelete?: (permission: Permission | PermissionWithRole) => void;
	showRole?: boolean;
	isLoading?: boolean;
	className?: string;
}

// Helper functions
const getPermissionIcon = (action: string): string => {
	switch (action.toLowerCase()) {
		case "create":
			return "heroicons:plus-circle";
		case "read":
			return "heroicons:eye";
		case "update":
			return "heroicons:pencil-square";
		case "delete":
			return "heroicons:trash";
		default:
			return "heroicons:key";
	}
};

const getActionVariant = (
	action: string,
): "default" | "secondary" | "destructive" | "outline" => {
	switch (action.toLowerCase()) {
		case "create":
			return "default";
		case "read":
			return "secondary";
		case "update":
			return "outline";
		case "delete":
			return "destructive";
		default:
			return "secondary";
	}
};

// Loading skeleton component
const PermissionTableSkeleton = () => (
	<div className="space-y-3">
		{Array.from({ length: 5 }).map((_, i) => (
			<div key={i} className="flex items-center space-x-4 p-4">
				<Skeleton className="h-4 w-20" />
				<Skeleton className="h-4 w-16" />
				<Skeleton className="h-6 w-16 rounded-full" />
				<Skeleton className="h-4 w-24" />
				<Skeleton className="h-4 w-20" />
				<Skeleton className="h-8 w-8 rounded" />
			</div>
		))}
	</div>
);

// Empty state component
const EmptyPermissions = () => (
	<div className="flex flex-col items-center justify-center py-12 text-center">
		<Icon
			icon="heroicons:key"
			className="h-12 w-12 text-muted-foreground mb-4"
		/>
		<h3 className="text-lg font-semibold mb-2">No permissions found</h3>
		<p className="text-muted-foreground max-w-sm">
			There are no permissions to display. Permissions will appear here once
			they are created.
		</p>
	</div>
);

export const PermissionTable: React.FC<PermissionTableProps> = ({
	permissions,
	onView,
	onEdit,
	onDelete,
	showRole = true,
	isLoading = false,
	className,
}) => {
	if (isLoading) {
		return (
			<Card className={cn("w-full", className)}>
				<CardHeader>
					<CardTitle className="flex items-center gap-2">
						<Icon icon="heroicons:key" className="h-5 w-5" />
						Permissions
					</CardTitle>
				</CardHeader>
				<CardContent>
					<PermissionTableSkeleton />
				</CardContent>
			</Card>
		);
	}

	if (!permissions || permissions.length === 0) {
		return (
			<Card className={cn("w-full", className)}>
				<CardHeader>
					<CardTitle className="flex items-center gap-2">
						<Icon icon="heroicons:key" className="h-5 w-5" />
						Permissions
					</CardTitle>
				</CardHeader>
				<CardContent>
					<EmptyPermissions />
				</CardContent>
			</Card>
		);
	}

	return (
		<Card className={cn("w-full", className)}>
			<CardHeader>
				<CardTitle className="flex items-center gap-2">
					<Icon icon="heroicons:key" className="h-5 w-5" />
					Permissions
					<Badge variant="secondary" className="ml-auto">
						{permissions.length}
					</Badge>
				</CardTitle>
			</CardHeader>
			<CardContent>
				<div className="rounded-md border">
					<Table>
						<TableHeader>
							<TableRow>
								<TableHead className="w-[120px]">Entity</TableHead>
								<TableHead className="w-[100px]">Field</TableHead>
								<TableHead className="w-[120px]">Action</TableHead>
								{showRole && <TableHead className="w-[120px]">Role</TableHead>}
								<TableHead className="w-[120px]">Created</TableHead>
								<TableHead className="w-[80px] text-right">Actions</TableHead>
							</TableRow>
						</TableHeader>
						<TableBody>
							{permissions.map((permission) => (
								<TableRow key={permission.id} className="hover:bg-muted/50">
									<TableCell className="font-medium">
										<div className="flex items-center gap-2">
											<Icon
												icon="heroicons:cube"
												className="h-4 w-4 text-muted-foreground"
											/>
											{permission.entity}
										</div>
									</TableCell>
									<TableCell className="text-muted-foreground">
										{permission.field || (
											<span className="italic text-muted-foreground/60">
												All fields
											</span>
										)}
									</TableCell>
									<TableCell>
										<Badge
											variant={getActionVariant(permission.action)}
											className="flex items-center gap-1 w-fit"
										>
											<Icon
												icon={getPermissionIcon(permission.action)}
												className="h-3 w-3"
											/>
											{permission.action}
										</Badge>
									</TableCell>
									{showRole && (
										<TableCell>
											{(permission as PermissionWithRole).role?.name ? (
												<Badge
													variant="outline"
													className="flex items-center gap-1 w-fit"
												>
													<Icon
														icon="heroicons:user-group"
														className="h-3 w-3"
													/>
													{(permission as PermissionWithRole).role?.name}
												</Badge>
											) : (
												<span className="text-muted-foreground italic">
													No role
												</span>
											)}
										</TableCell>
									)}
									<TableCell className="text-muted-foreground">
										<div className="flex items-center gap-1">
											<Icon
												icon="heroicons:calendar-days"
												className="h-3 w-3"
											/>
											{new Date(permission.createdAt).toLocaleDateString()}
										</div>
									</TableCell>
									<TableCell className="text-right">
										<DropdownMenu>
											<DropdownMenuTrigger asChild>
												<Button
													variant="ghost"
													size="sm"
													className="h-8 w-8 p-0"
												>
													<Icon
														icon="heroicons:ellipsis-horizontal"
														className="h-4 w-4"
													/>
													<span className="sr-only">Open menu</span>
												</Button>
											</DropdownMenuTrigger>
											<DropdownMenuContent align="end" className="w-48">
												{onView && (
													<DropdownMenuItem onClick={() => onView(permission)}>
														<Icon
															icon="heroicons:eye"
															className="mr-2 h-4 w-4"
														/>
														View Details
													</DropdownMenuItem>
												)}
												{onEdit && (
													<DropdownMenuItem onClick={() => onEdit(permission)}>
														<Icon
															icon="heroicons:pencil-square"
															className="mr-2 h-4 w-4"
														/>
														Edit Permission
													</DropdownMenuItem>
												)}
												{onDelete && (
													<DropdownMenuItem
														onClick={() => onDelete(permission)}
														className="text-destructive focus:text-destructive"
													>
														<Icon
															icon="heroicons:trash"
															className="mr-2 h-4 w-4"
														/>
														Delete Permission
													</DropdownMenuItem>
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
