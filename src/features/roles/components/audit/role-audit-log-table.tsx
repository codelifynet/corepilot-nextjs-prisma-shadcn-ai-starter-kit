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
import type { RoleAuditLogWithRelations } from "../../types";

export interface RoleAuditLogTableProps {
	auditLogs: RoleAuditLogWithRelations[];
	onView?: (auditLog: RoleAuditLogWithRelations) => void;
	onExport?: () => void;
	showRole?: boolean;
	showUser?: boolean;
	isLoading?: boolean;
	className?: string;
}

// Helper functions
const getActionIcon = (action: string): string => {
	switch (action.toLowerCase()) {
		case "create":
			return "heroicons:plus-circle";
		case "update":
			return "heroicons:pencil-square";
		case "delete":
			return "heroicons:trash";
		case "assign":
			return "heroicons:user-plus";
		case "revoke":
			return "heroicons:user-minus";
		default:
			return "heroicons:clipboard-document-list";
	}
};

const getActionVariant = (
	action: string,
): "default" | "secondary" | "destructive" | "outline" => {
	switch (action.toLowerCase()) {
		case "create":
			return "default";
		case "update":
			return "outline";
		case "delete":
			return "destructive";
		case "assign":
			return "secondary";
		case "revoke":
			return "outline";
		default:
			return "secondary";
	}
};

// Loading skeleton component
const AuditLogTableSkeleton = () => (
	<div className="space-y-3">
		{Array.from({ length: 5 }).map((_, i) => (
			<div key={i} className="flex items-center space-x-4 p-4">
				<Skeleton className="h-6 w-16 rounded-full" />
				<Skeleton className="h-4 w-24" />
				<Skeleton className="h-4 w-32" />
				<Skeleton className="h-4 w-20" />
				<Skeleton className="h-4 w-16" />
				<Skeleton className="h-4 w-40" />
				<Skeleton className="h-8 w-8 rounded" />
			</div>
		))}
	</div>
);

// Empty state component
const EmptyAuditLogs = () => (
	<div className="flex flex-col items-center justify-center py-12 text-center">
		<Icon
			icon="heroicons:clipboard-document-list"
			className="h-12 w-12 text-muted-foreground mb-4"
		/>
		<h3 className="text-lg font-semibold mb-2">No audit logs found</h3>
		<p className="text-muted-foreground max-w-sm">
			There are no audit logs to display. Activity logs will appear here once
			actions are performed.
		</p>
	</div>
);

export const RoleAuditLogTable: React.FC<RoleAuditLogTableProps> = ({
	auditLogs,
	onView,
	onExport,
	showRole = true,
	showUser = true,
	isLoading = false,
	className,
}) => {
	if (isLoading) {
		return (
			<Card className={cn("w-full", className)}>
				<CardHeader>
					<CardTitle className="flex items-center gap-2">
						<Icon
							icon="heroicons:clipboard-document-list"
							className="h-5 w-5"
						/>
						Audit Logs
					</CardTitle>
				</CardHeader>
				<CardContent>
					<AuditLogTableSkeleton />
				</CardContent>
			</Card>
		);
	}

	if (!auditLogs || auditLogs.length === 0) {
		return (
			<Card className={cn("w-full", className)}>
				<CardHeader>
					<div className="flex items-center justify-between">
						<CardTitle className="flex items-center gap-2">
							<Icon
								icon="heroicons:clipboard-document-list"
								className="h-5 w-5"
							/>
							Audit Logs
						</CardTitle>
						{onExport && (
							<Button variant="outline" size="sm" onClick={onExport}>
								<Icon
									icon="heroicons:arrow-down-tray"
									className="h-4 w-4 mr-2"
								/>
								Export
							</Button>
						)}
					</div>
				</CardHeader>
				<CardContent>
					<EmptyAuditLogs />
				</CardContent>
			</Card>
		);
	}

	return (
		<Card className={cn("w-full", className)}>
			<CardHeader>
				<div className="flex items-center justify-between">
					<CardTitle className="flex items-center gap-2">
						<Icon
							icon="heroicons:clipboard-document-list"
							className="h-5 w-5"
						/>
						Audit Logs
						<Badge variant="secondary" className="ml-2">
							{auditLogs.length}
						</Badge>
					</CardTitle>
					{onExport && (
						<Button variant="outline" size="sm" onClick={onExport}>
							<Icon icon="heroicons:arrow-down-tray" className="h-4 w-4 mr-2" />
							Export
						</Button>
					)}
				</div>
			</CardHeader>
			<CardContent>
				<div className="rounded-md border">
					<Table>
						<TableHeader>
							<TableRow>
								<TableHead>Action</TableHead>
								{showRole && <TableHead>Role</TableHead>}
								{showUser && <TableHead>User</TableHead>}
								<TableHead>Date</TableHead>
								<TableHead>IP Address</TableHead>
								<TableHead>Details</TableHead>
								<TableHead className="w-[70px]">Actions</TableHead>
							</TableRow>
						</TableHeader>
						<TableBody>
							{auditLogs.map((auditLog) => (
								<TableRow key={auditLog.id}>
									<TableCell>
										<Badge
											variant={getActionVariant(auditLog.action)}
											className="flex items-center gap-1 w-fit"
										>
											<Icon
												icon={getActionIcon(auditLog.action)}
												className="h-3 w-3"
											/>
											{auditLog.action}
										</Badge>
									</TableCell>
									{showRole && (
										<TableCell className="font-medium">
											{auditLog.role?.name || (
												<span className="text-muted-foreground">
													Unknown Role
												</span>
											)}
										</TableCell>
									)}
									{showUser && (
										<TableCell>
											<div className="flex items-center gap-2">
												<Icon
													icon="heroicons:user-circle"
													className="h-4 w-4 text-muted-foreground"
												/>
												<span className="text-sm">
													{auditLog.user?.email || auditLog.user?.name || (
														<span className="text-muted-foreground">
															System
														</span>
													)}
												</span>
											</div>
										</TableCell>
									)}
									<TableCell>
										<div className="space-y-1">
											<div className="text-sm font-medium">
												{new Date(auditLog.timestamp).toLocaleDateString()}
											</div>
											<div className="text-xs text-muted-foreground">
												{new Date(auditLog.timestamp).toLocaleTimeString()}
											</div>
										</div>
									</TableCell>
									<TableCell>
										<div className="flex items-center gap-2">
											<Icon
												icon="heroicons:globe-alt"
												className="h-4 w-4 text-muted-foreground"
											/>
											<span className="text-sm font-mono">
												{auditLog.ipAddress || (
													<span className="text-muted-foreground">-</span>
												)}
											</span>
										</div>
									</TableCell>
									<TableCell>
										<div
											className="max-w-xs truncate text-sm"
											title={auditLog.details || ""}
										>
											{auditLog.details || (
												<span className="text-muted-foreground">-</span>
											)}
										</div>
									</TableCell>
									<TableCell>
										{onView && (
											<DropdownMenu>
												<DropdownMenuTrigger asChild>
													<Button variant="ghost" size="sm">
														<Icon
															icon="heroicons:ellipsis-horizontal"
															className="h-4 w-4"
														/>
													</Button>
												</DropdownMenuTrigger>
												<DropdownMenuContent align="end">
													<DropdownMenuItem onClick={() => onView(auditLog)}>
														<Icon
															icon="heroicons:eye"
															className="h-4 w-4 mr-2"
														/>
														View Details
													</DropdownMenuItem>
												</DropdownMenuContent>
											</DropdownMenu>
										)}
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
