import React, { useState, useMemo } from "react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import {
	Collapsible,
	CollapsibleContent,
	CollapsibleTrigger,
} from "@/components/ui/collapsible";
import {
	Search,
	ChevronDown,
	ChevronRight,
	Shield,
	Users,
	Settings,
	BarChart3,
	Package,
	ShoppingCart,
	Tag,
	FileText,
	Database,
	Key,
	Bell,
	Upload,
	Sparkles,
	HelpCircle,
	Activity,
} from "lucide-react";

// Import hooks for API data
import { usePermissions, useEntityInfo } from "../../hooks/use-permissions-api";

// Entity icons mapping
const ENTITY_ICONS: Record<string, React.ReactNode> = {
	user: <Users className="h-4 w-4" />,
	role: <Shield className="h-4 w-4" />,
	product: <Package className="h-4 w-4" />,
	order: <ShoppingCart className="h-4 w-4" />,
	customer: <Users className="h-4 w-4" />,
	content: <FileText className="h-4 w-4" />,
	analytics: <BarChart3 className="h-4 w-4" />,
	settings: <Settings className="h-4 w-4" />,
	support: <HelpCircle className="h-4 w-4" />,
	finance: <Activity className="h-4 w-4" />,
	dashboard: <BarChart3 className="h-4 w-4" />,
	ai_features: <Sparkles className="h-4 w-4" />,
	notification: <Bell className="h-4 w-4" />,
	upload: <Upload className="h-4 w-4" />,
	category: <Tag className="h-4 w-4" />,
	database: <Database className="h-4 w-4" />,
	permission: <Key className="h-4 w-4" />,
};

// Permission structure based on the API data
export interface Permission {
	entity: string;
	field: string;
	action: string;
	maskType: string | null;
	displayName: string | null;
	description: string | null;
}

export interface PermissionGroup {
	entity: string;
	displayName: string;
	description: string;
	icon: React.ReactNode;
	permissions: Permission[];
}

export interface PermissionSelectorProps {
	selectedPermissions: {
		entity: string;
		field: string;
		action: string;
		maskType?: string;
	}[];
	onPermissionsChange: (
		permissions: {
			entity: string;
			field: string;
			action: string;
			maskType?: string;
		}[],
	) => void;
	disabled?: boolean;
	className?: string;
}

export const PermissionSelector: React.FC<PermissionSelectorProps> = ({
	selectedPermissions,
	onPermissionsChange,
	disabled = false,
	className,
}) => {
	const [searchTerm, setSearchTerm] = useState("");
	const [expandedGroups, setExpandedGroups] = useState<Set<string>>(new Set());

	// Fetch permissions from API
	const { data: permissions = [], isLoading, error } = usePermissions();

	// Get entity info from API data
	const entityInfo = useEntityInfo(permissions);

	// Group permissions by entity
	const permissionGroups = useMemo(() => {
		if (!permissions.length) return [];

		const groups: PermissionGroup[] = [];
		const entityMap = new Map<string, Permission[]>();

		// Group permissions by entity
		permissions.forEach((permission) => {
			if (!entityMap.has(permission.entity)) {
				entityMap.set(permission.entity, []);
			}
			entityMap.get(permission.entity)!.push(permission);
		});

		// Create permission groups
		entityMap.forEach((permissionList, entity) => {
			const info = entityInfo[entity] || {
				displayName: entity,
				description: `Manage ${entity} operations`,
			};
			groups.push({
				entity,
				displayName: info.displayName,
				description: info.description,
				icon: ENTITY_ICONS[entity] || <Shield className="h-4 w-4" />,
				permissions: permissionList
					// Remove the filter that was excluding all permissions
					// .filter((p) => p.displayName && p.description) // Filter out null values
					.sort((a, b) =>
						(a.displayName || a.action).localeCompare(b.displayName || b.action),
					),
			});
		});

		return groups.sort((a, b) => a.displayName.localeCompare(b.displayName));
	}, [permissions, entityInfo]);

	// Filter permissions based on search term
	const filteredGroups = useMemo(() => {
		if (!searchTerm) return permissionGroups;

		return permissionGroups
			.map((group) => ({
				...group,
				permissions: group.permissions.filter(
					(permission) =>
						permission.displayName
							?.toLowerCase()
							.includes(searchTerm.toLowerCase()) ||
						false ||
						permission.description
							?.toLowerCase()
							.includes(searchTerm.toLowerCase()) ||
						false ||
						permission.action
							.toLowerCase()
							.includes(searchTerm.toLowerCase()) ||
						permission.entity.toLowerCase().includes(searchTerm.toLowerCase()),
				),
			}))
			.filter((group) => group.permissions.length > 0);
	}, [permissionGroups, searchTerm]);

	const toggleGroup = (entity: string) => {
		const newExpanded = new Set(expandedGroups);
		if (newExpanded.has(entity)) {
			newExpanded.delete(entity);
		} else {
			newExpanded.add(entity);
		}
		setExpandedGroups(newExpanded);
	};

	const togglePermission = (permission: Permission) => {
		if (disabled) return;

		const isSelected = selectedPermissions.some(
			(p) =>
				p.entity === permission.entity &&
				p.field === permission.field &&
				p.action === permission.action,
		);

		let newPermissions: {
			entity: string;
			field: string;
			action: string;
			maskType?: string;
		}[];

		if (isSelected) {
			newPermissions = selectedPermissions.filter(
				(p) =>
					!(
						p.entity === permission.entity &&
						p.field === permission.field &&
						p.action === permission.action
					),
			);
		} else {
			newPermissions = [
				...selectedPermissions,
				{
					entity: permission.entity,
					field: permission.field,
					action: permission.action,
					maskType: "none",
				},
			];
		}

		onPermissionsChange(newPermissions);
	};

	const toggleAllInGroup = (group: PermissionGroup) => {
		if (disabled) return;

		const groupPermissions = group.permissions.map((p) => ({
			entity: p.entity,
			field: p.field,
			action: p.action,
			maskType: "none" as const,
		}));

		const allSelected = groupPermissions.every((gp) =>
			selectedPermissions.some(
				(sp) =>
					sp.entity === gp.entity &&
					sp.field === gp.field &&
					sp.action === gp.action,
			),
		);

		let newPermissions: {
			entity: string;
			field: string;
			action: string;
			maskType?: string;
		}[];

		if (allSelected) {
			// Remove all permissions from this group
			newPermissions = selectedPermissions.filter(
				(sp) =>
					!groupPermissions.some(
						(gp) =>
							gp.entity === sp.entity &&
							gp.field === sp.field &&
							gp.action === sp.action,
					),
			);
		} else {
			// Add all permissions from this group
			const toAdd = groupPermissions.filter(
				(gp) =>
					!selectedPermissions.some(
						(sp) =>
							sp.entity === gp.entity &&
							sp.field === gp.field &&
							sp.action === gp.action,
					),
			);
			newPermissions = [...selectedPermissions, ...toAdd];
		}

		onPermissionsChange(newPermissions);
	};

	const selectAll = () => {
		if (disabled) return;
		const allPermissions = permissions.map((p) => ({
			entity: p.entity,
			field: p.field,
			action: p.action,
			maskType: p.maskType || "none",
		}));
		onPermissionsChange(allPermissions);
	};

	const clearAll = () => {
		if (disabled) return;
		onPermissionsChange([]);
	};

	return (
		<div className={cn("space-y-4", className)}>
			{/* Header */}
			<div className="flex items-center justify-between">
				<div>
					<h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100">
						Permissions
					</h3>
					<p className="text-sm text-gray-500 dark:text-gray-400">
						Select the permissions for this role ({selectedPermissions.length}{" "}
						selected)
					</p>
				</div>
				<div className="flex gap-2">
					<Button
						type="button"
						variant="outline"
						size="sm"
						onClick={selectAll}
						disabled={disabled || isLoading}
					>
						Select All
					</Button>
					<Button
						type="button"
						variant="outline"
						size="sm"
						onClick={clearAll}
						disabled={disabled || isLoading}
					>
						Clear All
					</Button>
				</div>
			</div>

			{/* Search */}
			<div className="relative">
				<Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
				<Input
					placeholder="Search permissions..."
					value={searchTerm}
					onChange={(e) => setSearchTerm(e.target.value)}
					className="pl-10"
					disabled={disabled || isLoading}
				/>
			</div>

			{/* Loading State */}
			{isLoading && (
				<div className="flex items-center justify-center py-8">
					<div className="text-sm text-gray-500 dark:text-gray-400">
						Loading permissions...
					</div>
				</div>
			)}

			{/* Error State */}
			{error && (
				<div className="flex items-center justify-center py-8">
					<div className="text-sm text-red-500 dark:text-red-400">
						Error: {error}
					</div>
				</div>
			)}

			{/* Permission Groups */}
			{!isLoading && !error && (
				<ScrollArea className="h-[400px] w-full rounded-md border">
					<div className="p-4 space-y-4">
						{filteredGroups.length === 0 ? (
							<div className="flex items-center justify-center py-8">
								<div className="text-sm text-gray-500 dark:text-gray-400">
									{searchTerm ? "No permissions found matching your search." : "No permissions available."}
								</div>
							</div>
						) : (
							filteredGroups.map((group) => {
								const isExpanded = expandedGroups.has(group.entity);
								const groupPermissions = group.permissions;
								const selectedInGroup = groupPermissions.filter((gp) =>
									selectedPermissions.some(
										(sp) =>
											sp.entity === gp.entity &&
											sp.field === gp.field &&
											sp.action === gp.action,
									),
								);
								const allSelected =
									selectedInGroup.length === groupPermissions.length;
								const someSelected =
							selectedInGroup.length > 0 &&
							selectedInGroup.length < groupPermissions.length;

						return (
							<Card
								key={group.entity}
								className="border-gray-200 dark:border-gray-700"
							>
								<Collapsible
									open={isExpanded}
									onOpenChange={() => toggleGroup(group.entity)}
								>
									<CollapsibleTrigger asChild>
										<CardHeader className="cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors">
											<div className="flex items-center justify-between">
												<div className="flex items-center gap-3">
													<div className="p-2 rounded-lg bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-800 dark:to-gray-700">
														{group.icon}
													</div>
													<div className="text-left">
														<CardTitle className="text-base font-semibold">
															{group.displayName}
														</CardTitle>
														<CardDescription className="text-sm">
															{group.description}
														</CardDescription>
													</div>
												</div>
												<div className="flex items-center gap-2">
													<Badge
														variant={
															allSelected
																? "default"
																: someSelected
																	? "secondary"
																	: "outline"
														}
													>
														{selectedInGroup.length}/{groupPermissions.length}
													</Badge>
													{isExpanded ? (
														<ChevronDown className="h-4 w-4" />
													) : (
														<ChevronRight className="h-4 w-4" />
													)}
												</div>
											</div>
										</CardHeader>
									</CollapsibleTrigger>
									<CollapsibleContent>
										<CardContent className="pt-0">
											<div className="space-y-3">
												{/* Group Actions */}
												<div className="flex items-center justify-between pb-2 border-b border-gray-200 dark:border-gray-700">
													<span className="text-sm font-medium text-gray-700 dark:text-gray-300">
														Group Actions
													</span>
													<Button
														type="button"
														variant="ghost"
														size="sm"
														onClick={() => toggleAllInGroup(group)}
														disabled={disabled}
														className="h-8 px-2 text-xs"
													>
														{allSelected ? "Deselect All" : "Select All"}
													</Button>
												</div>

												{/* Individual Permissions */}
												<div className="grid gap-2">
													{group.permissions.map((permission) => {
														const isSelected = selectedPermissions.some(
															(p) =>
																p.entity === permission.entity &&
																p.field === permission.field &&
																p.action === permission.action,
														);
														const permissionKey = `${permission.entity}.${permission.field}.${permission.action}`;

														return (
															<div
																key={permissionKey}
																className={cn(
																	"flex items-start gap-3 p-3 rounded-lg border transition-colors",
																	isSelected
																		? "border-blue-200 bg-blue-50/50 dark:border-blue-800 dark:bg-blue-900/20"
																		: "border-gray-200 hover:border-gray-300 dark:border-gray-700 dark:hover:border-gray-600",
																	disabled && "opacity-50 cursor-not-allowed",
																)}
															>
																<Checkbox
																	id={permissionKey}
																	checked={isSelected}
																	onCheckedChange={() =>
																		togglePermission(permission)
																	}
																	disabled={disabled}
																	className="mt-0.5"
																/>
																<div className="flex-1 min-w-0">
																	<label
																		htmlFor={permissionKey}
																		className={cn(
																			"block text-sm font-medium cursor-pointer",
																			isSelected
																				? "text-blue-900 dark:text-blue-100"
																				: "text-gray-900 dark:text-gray-100",
																			disabled && "cursor-not-allowed",
																		)}
																	>
																		{permission.displayName || `${permission.entity} ${permission.action}`}
																	</label>
																	<p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
																		{permission.description || `Allow ${permission.action} operations on ${permission.entity} ${permission.field === '*' ? 'resources' : permission.field}`}
																	</p>
																	<Badge
																		variant="outline"
																		className="mt-2 text-xs"
																	>
																		{permission.entity}.{permission.field}.
																		{permission.action}
																	</Badge>
																</div>
															</div>
														);
													})}
												</div>
											</div>
										</CardContent>
									</CollapsibleContent>
								</Collapsible>
							</Card>
							);
						})
						)}
					</div>
				</ScrollArea>
			)}

			{/* Selected Permissions Summary */}
			{selectedPermissions.length > 0 && (
				<Card className="border-blue-200 bg-blue-50/50 dark:border-blue-800 dark:bg-blue-900/20">
					<CardHeader className="pb-3">
						<CardTitle className="text-sm font-semibold text-blue-900 dark:text-blue-100">
							Selected Permissions ({selectedPermissions.length})
						</CardTitle>
					</CardHeader>
					<CardContent className="pt-0">
						<div className="flex flex-wrap gap-1">
							{selectedPermissions.slice(0, 10).map((permission, index) => (
								<Badge
									key={`${permission.entity}.${permission.field}.${permission.action}-${index}`}
									variant="secondary"
									className="text-xs bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200"
								>
									{permission.entity}.{permission.field}.{permission.action}
								</Badge>
							))}
							{selectedPermissions.length > 10 && (
								<Badge variant="outline" className="text-xs">
									+{selectedPermissions.length - 10} more
								</Badge>
							)}
						</div>
					</CardContent>
				</Card>
			)}
		</div>
	);
};
