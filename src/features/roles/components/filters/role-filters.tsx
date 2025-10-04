import React from "react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
// import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Icon } from "@iconify/react";
import type { RoleFilters as RoleFiltersType } from "../../types";

export interface RoleFiltersProps {
	filters: RoleFiltersType;
	onFiltersChange: (filters: RoleFiltersType) => void;
	onReset?: () => void;
	className?: string;
	isCollapsible?: boolean;
}

export const RoleFilters: React.FC<RoleFiltersProps> = ({
	filters,
	onFiltersChange,
	onReset,
	className,
	isCollapsible = false,
}) => {
	const [isExpanded, setIsExpanded] = React.useState(!isCollapsible);

	const handleFilterChange = (field: keyof RoleFiltersType, value: any) => {
		onFiltersChange({ ...filters, [field]: value });
	};

	const handleReset = () => {
		const resetFilters: RoleFiltersType = {
			search: "",
			isActive: undefined,
			isSystem: undefined,
			sortBy: "createdAt",
			sortOrder: "desc",
		};
		onFiltersChange(resetFilters);
		onReset?.();
	};

	const getActiveFiltersCount = () => {
		let count = 0;
		if (filters.search) count++;
		if (filters.isActive !== undefined) count++;
		if (filters.isSystem !== undefined) count++;
		if (filters.sortBy !== "createdAt" || filters.sortOrder !== "desc") count++;
		return count;
	};

	const activeFiltersCount = getActiveFiltersCount();

	return (
		<Card className={cn("w-full transition-all duration-200", className)}>
			<CardHeader className="pb-3">
				<div className="flex items-center justify-between">
					<div className="flex items-center gap-3">
						<div className="p-2 rounded-lg bg-gradient-to-br from-purple-50 to-pink-50 dark:from-purple-950/50 dark:to-pink-950/50">
							<Icon
								icon="lucide:filter"
								className="w-5 h-5 text-purple-600 dark:text-purple-400"
							/>
						</div>
						<div>
							<CardTitle className="flex items-center gap-2">
								Filters
								{activeFiltersCount > 0 && (
									<Badge variant="secondary" className="text-xs px-2 py-0.5">
										{activeFiltersCount} active
									</Badge>
								)}
							</CardTitle>
							<CardDescription>
								{isCollapsible
									? "Click to expand filter options"
									: "Customize your role search"}
							</CardDescription>
						</div>
					</div>
					<div className="flex items-center gap-2">
						{activeFiltersCount > 0 && (
							<Button
								variant="ghost"
								size="sm"
								onClick={handleReset}
								className="text-purple-600 hover:text-purple-700 hover:bg-purple-50 dark:text-purple-400 dark:hover:text-purple-300 dark:hover:bg-purple-950/50"
							>
								<Icon icon="lucide:x" className="w-4 h-4 mr-1" />
								Reset
							</Button>
						)}
						{isCollapsible && (
							<Button
								variant="ghost"
								size="sm"
								onClick={() => setIsExpanded(!isExpanded)}
								className="transition-transform duration-200"
							>
								<Icon
									icon="lucide:chevron-down"
									className={cn(
										"w-4 h-4 transition-transform duration-200",
										isExpanded && "rotate-180",
									)}
								/>
							</Button>
						)}
					</div>
				</div>
			</CardHeader>

			{isExpanded && (
				<CardContent className="space-y-6">
					{/* Search Section */}
					<div className="space-y-3">
						<div className="flex items-center gap-2">
							<Icon icon="lucide:search" className="w-4 h-4 text-gray-500" />
							<Label htmlFor="search" className="text-sm font-medium">
								Search Roles
							</Label>
						</div>
						<Input
							id="search"
							type="text"
							placeholder="Search by name, description..."
							value={filters.search || ""}
							onChange={(e) => handleFilterChange("search", e.target.value)}
							className="transition-all duration-200 focus:ring-2 focus:ring-purple-500/20"
						/>
					</div>

					<Separator />

					{/* Filter Options */}
					<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
						{/* Status Filter */}
						<div className="space-y-3">
							<div className="flex items-center gap-2">
								<Icon
									icon="lucide:activity"
									className="w-4 h-4 text-gray-500"
								/>
								<Label className="text-sm font-medium">Status</Label>
							</div>
							<Select
								value={
									filters.isActive === undefined
										? "all"
										: filters.isActive.toString()
								}
								onValueChange={(value) => {
									handleFilterChange(
										"isActive",
										value === "all" ? undefined : value === "true",
									);
								}}
							>
								<SelectTrigger className="transition-all duration-200 focus:ring-2 focus:ring-purple-500/20">
									<SelectValue placeholder="Select status" />
								</SelectTrigger>
								<SelectContent>
									<SelectItem value="all">
										<div className="flex items-center gap-2">
											<Icon icon="lucide:list" className="w-4 h-4" />
											All Statuses
										</div>
									</SelectItem>
									<SelectItem value="true">
										<div className="flex items-center gap-2">
											<Icon
												icon="lucide:check-circle"
												className="w-4 h-4 text-green-500"
											/>
											Active
										</div>
									</SelectItem>
									<SelectItem value="false">
										<div className="flex items-center gap-2">
											<Icon
												icon="lucide:x-circle"
												className="w-4 h-4 text-red-500"
											/>
											Inactive
										</div>
									</SelectItem>
								</SelectContent>
							</Select>
						</div>

						{/* Type Filter */}
						<div className="space-y-3">
							<div className="flex items-center gap-2">
								<Icon icon="lucide:shield" className="w-4 h-4 text-gray-500" />
								<Label className="text-sm font-medium">Type</Label>
							</div>
							<Select
								value={
									filters.isSystem === undefined
										? "all"
										: filters.isSystem.toString()
								}
								onValueChange={(value) => {
									handleFilterChange(
										"isSystem",
										value === "all" ? undefined : value === "true",
									);
								}}
							>
								<SelectTrigger className="transition-all duration-200 focus:ring-2 focus:ring-purple-500/20">
									<SelectValue placeholder="Select type" />
								</SelectTrigger>
								<SelectContent>
									<SelectItem value="all">
										<div className="flex items-center gap-2">
											<Icon icon="lucide:layers" className="w-4 h-4" />
											All Types
										</div>
									</SelectItem>
									<SelectItem value="false">
										<div className="flex items-center gap-2">
											<Icon
												icon="lucide:user"
												className="w-4 h-4 text-blue-500"
											/>
											Custom Roles
										</div>
									</SelectItem>
									<SelectItem value="true">
										<div className="flex items-center gap-2">
											<Icon
												icon="lucide:shield-check"
												className="w-4 h-4 text-orange-500"
											/>
											System Roles
										</div>
									</SelectItem>
								</SelectContent>
							</Select>
						</div>

						{/* Sort By Filter */}
						<div className="space-y-3">
							<div className="flex items-center gap-2">
								<Icon
									icon="lucide:arrow-up-down"
									className="w-4 h-4 text-gray-500"
								/>
								<Label className="text-sm font-medium">Sort By</Label>
							</div>
							<Select
								value={filters.sortBy || "createdAt"}
								onValueChange={(value) => handleFilterChange("sortBy", value)}
							>
								<SelectTrigger className="transition-all duration-200 focus:ring-2 focus:ring-purple-500/20">
									<SelectValue placeholder="Select sort field" />
								</SelectTrigger>
								<SelectContent>
									<SelectItem value="name">
										<div className="flex items-center gap-2">
											<Icon icon="lucide:type" className="w-4 h-4" />
											Name
										</div>
									</SelectItem>
									<SelectItem value="createdAt">
										<div className="flex items-center gap-2">
											<Icon icon="lucide:calendar-plus" className="w-4 h-4" />
											Created Date
										</div>
									</SelectItem>
									<SelectItem value="updatedAt">
										<div className="flex items-center gap-2">
											<Icon icon="lucide:calendar-clock" className="w-4 h-4" />
											Updated Date
										</div>
									</SelectItem>
								</SelectContent>
							</Select>
						</div>
					</div>

					<Separator />

					{/* Sort Order */}
					<div className="space-y-3">
						<div className="flex items-center gap-2">
							<Icon icon="lucide:sort-asc" className="w-4 h-4 text-gray-500" />
							<Label className="text-sm font-medium">Sort Order</Label>
						</div>
						<div className="flex items-center gap-6">
							<div className="flex items-center space-x-2">
								<input
									type="radio"
									id="asc"
									name="sortOrder"
									value="asc"
									checked={filters.sortOrder === "asc"}
									onChange={(e) =>
										handleFilterChange("sortOrder", e.target.value)
									}
									className="h-4 w-4 text-purple-600 focus:ring-purple-500 border-gray-300"
								/>
								<Label
									htmlFor="asc"
									className="flex items-center gap-2 cursor-pointer"
								>
									<Icon icon="lucide:arrow-up" className="w-4 h-4" />
									Ascending
								</Label>
							</div>
							<div className="flex items-center space-x-2">
								<input
									type="radio"
									id="desc"
									name="sortOrder"
									value="desc"
									checked={filters.sortOrder === "desc"}
									onChange={(e) =>
										handleFilterChange("sortOrder", e.target.value)
									}
									className="h-4 w-4 text-purple-600 focus:ring-purple-500 border-gray-300"
								/>
								<Label
									htmlFor="desc"
									className="flex items-center gap-2 cursor-pointer"
								>
									<Icon icon="lucide:arrow-down" className="w-4 h-4" />
									Descending
								</Label>
							</div>
						</div>
					</div>

					{/* Active Filters Summary */}
					{activeFiltersCount > 0 && (
						<>
							<Separator />
							<div className="space-y-3">
								<div className="flex items-center gap-2">
									<Icon
										icon="lucide:filter-check"
										className="w-4 h-4 text-purple-500"
									/>
									<Label className="text-sm font-medium text-purple-700 dark:text-purple-300">
										Active Filters ({activeFiltersCount})
									</Label>
								</div>
								<div className="flex flex-wrap gap-2">
									{filters.search && (
										<Badge variant="secondary" className="text-xs">
											<Icon icon="lucide:search" className="w-3 h-3 mr-1" />
											Search: "{filters.search}"
										</Badge>
									)}
									{filters.isActive !== undefined && (
										<Badge variant="secondary" className="text-xs">
											<Icon icon="lucide:activity" className="w-3 h-3 mr-1" />
											Status: {filters.isActive ? "Active" : "Inactive"}
										</Badge>
									)}
									{filters.isSystem !== undefined && (
										<Badge variant="secondary" className="text-xs">
											<Icon icon="lucide:shield" className="w-3 h-3 mr-1" />
											Type: {filters.isSystem ? "System" : "Custom"}
										</Badge>
									)}
									{(filters.sortBy !== "createdAt" ||
										filters.sortOrder !== "desc") && (
										<Badge variant="secondary" className="text-xs">
											<Icon
												icon="lucide:arrow-up-down"
												className="w-3 h-3 mr-1"
											/>
											Sort: {filters.sortBy} ({filters.sortOrder})
										</Badge>
									)}
								</div>
							</div>
						</>
					)}
				</CardContent>
			)}
		</Card>
	);
};
