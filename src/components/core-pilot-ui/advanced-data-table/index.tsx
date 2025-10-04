"use client";

import {
	type ReactNode,
	useState,
	useMemo,
	useEffect,
	useCallback,
} from "react";
import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
	AlertDialog,
	AlertDialogAction,
	AlertDialogCancel,
	AlertDialogContent,
	AlertDialogDescription,
	AlertDialogFooter,
	AlertDialogHeader,
	AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import {
	MoreHorizontal,
	Search,
	ChevronUp,
	ChevronDown,
	ChevronsUpDown,
	ChevronLeft,
	ChevronRight,
	ChevronsLeft,
	ChevronsRight,
	Eye,
	SearchX,
	RefreshCw,
} from "lucide-react";

export interface TableColumn<T> {
	key: string;
	label: string;
	width?: string;
	render?: (item: T) => ReactNode;
	sortable?: boolean;
	filterable?: boolean;
	filterType?: "text" | "select";
	filterOptions?: { label: string; value: string }[];
}

export interface TableAction<T> {
	label: string | ((item: T) => string);
	onClick: (item: T) => void;
	variant?: "default" | "destructive";
	separator?: boolean;
	icon?: ReactNode;
	requiresConfirmation?: boolean;
	confirmationTitle?: string;
	confirmationDescription?: string;
}

export interface FilterState {
	[key: string]: string;
}

export interface SortState {
	key: string;
	direction: "asc" | "desc";
}

export interface AdvancedDataTableProps<T> {
	data: T[];
	columns: TableColumn<T>[];
	actions?: TableAction<T>[];
	isLoading?: boolean;
	emptyMessage?: string;
	emptySearchMessage?: string;
	loadingRows?: number;
	onRowClick?: (item: T) => void;
	searchable?: boolean;
	searchPlaceholder?: string;
	pagination?: boolean;
	pageSize?: number;
	showViewAction?: boolean;
	onViewDetails?: (item: T) => void;
}

export function AdvancedDataTable<T extends Record<string, any>>({
	data,
	columns,
	actions,
	isLoading = false,
	emptyMessage = "No data available",
	emptySearchMessage = "No results found for your search",
	loadingRows = 5,
	searchable = true,
	searchPlaceholder = "Search...",
	pagination = true,
	pageSize = 10,

	showViewAction = true,
	onViewDetails,
}: AdvancedDataTableProps<T>) {
	const [searchTerm, setSearchTerm] = useState("");
	const [columnSearchTerm, setColumnSearchTerm] = useState("");
	const [visibleColumns, setVisibleColumns] = useState<string[]>(
		columns.map((col) => col.key),
	);
	const [sortState, setSortState] = useState<SortState | null>(null);
	const [currentPage, setCurrentPage] = useState(1);
	const [pendingAction, setPendingAction] = useState<{
		action: TableAction<T>;
		item: T;
	} | null>(null);

	// Filter data based on search term
	const filteredData = useMemo(() => {
		let result = [...data];

		// Apply search filter
		if (searchTerm) {
			result = result.filter((item) =>
				columns.some((column) => {
					const value = item[column.key];
					return value
						? String(value).toLowerCase().includes(searchTerm.toLowerCase())
						: false;
				}),
			);
		}

		// Apply sorting
		if (sortState) {
			result.sort((a, b) => {
				const aValue = a[sortState.key];
				const bValue = b[sortState.key];

				if (aValue === null || aValue === undefined) return 1;
				if (bValue === null || bValue === undefined) return -1;

				const comparison = String(aValue).localeCompare(
					String(bValue),
					undefined,
					{
						numeric: true,
						caseFirst: "upper",
					},
				);

				return sortState.direction === "asc" ? comparison : -comparison;
			});
		}

		return result;
	}, [data, searchTerm, sortState, columns]);

	// Pagination
	const totalPages = Math.ceil(filteredData.length / pageSize);
	const paginatedData = useMemo(() => {
		if (!pagination) return filteredData;
		const startIndex = (currentPage - 1) * pageSize;
		return filteredData.slice(startIndex, startIndex + pageSize);
	}, [filteredData, currentPage, pageSize, pagination]);

	// Reset to first page when filters change
	useEffect(() => {
		setCurrentPage(1);
	}, []);

	const handleSort = useCallback((key: string) => {
		setSortState((prev) => {
			if (prev?.key === key) {
				return prev.direction === "asc" ? { key, direction: "desc" } : null;
			}
			return { key, direction: "asc" };
		});
	}, []);

	const handleColumnVisibilityChange = useCallback((columnKey: string) => {
		setVisibleColumns((prev) =>
			prev.includes(columnKey)
				? prev.filter((key) => key !== columnKey)
				: [...prev, columnKey],
		);
	}, []);

	const handleActionClick = useCallback((action: TableAction<T>, item: T) => {
		if (action.requiresConfirmation) {
			setPendingAction({ action, item });
		} else {
			action.onClick(item);
		}
	}, []);

	const confirmAction = useCallback(() => {
		if (pendingAction) {
			pendingAction.action.onClick(pendingAction.item);
			setPendingAction(null);
		}
	}, [pendingAction]);

	const getSortIcon = (key: string) => {
		if (sortState?.key !== key) {
			return <ChevronsUpDown className="ml-2 h-4 w-4" />;
		}
		return sortState.direction === "asc" ? (
			<ChevronUp className="ml-2 h-4 w-4" />
		) : (
			<ChevronDown className="ml-2 h-4 w-4" />
		);
	};

	const renderEmptyState = () => {
		const hasSearchTerm = searchTerm.trim().length > 0;

		if (hasSearchTerm) {
			// Filtered results empty state
			return (
				<div className="flex flex-col items-center justify-center py-16 px-4">
					{/* Icon Section with gradient background */}
					<div className="relative mb-6">
						<div className="absolute inset-0 bg-gradient-to-br from-blue-100 to-purple-100 dark:from-blue-900/20 dark:to-purple-900/20 rounded-full blur-xl" />
						<div className="relative bg-gradient-to-br from-blue-50 to-purple-50 dark:from-blue-900/10 dark:to-purple-900/10 p-6 rounded-full border border-blue-200/50 dark:border-blue-800/50">
							<SearchX className="h-12 w-12 text-blue-500 dark:text-blue-400" />
							{/* Decorative elements */}
							<div className="absolute -top-1 -right-1 w-3 h-3 bg-purple-400 rounded-full animate-pulse" />
							<div className="absolute -bottom-2 -left-2 w-2 h-2 bg-blue-400 rounded-full animate-pulse delay-300" />
						</div>
					</div>

					{/* Content */}
					<div className="text-center space-y-3 max-w-md">
						<h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100">
							No results found
						</h3>
						<p className="text-sm text-gray-500 dark:text-gray-400 leading-relaxed">
							{emptySearchMessage}
						</p>
					</div>

					{/* Action Button */}
					<div className="flex gap-3 mt-6">
						<Button
							variant="outline"
							onClick={() => setSearchTerm("")}
							className="flex items-center gap-2 hover:bg-blue-50 dark:hover:bg-blue-900/20 border-blue-200 dark:border-blue-800"
						>
							<RefreshCw className="h-4 w-4" />
							Clear Search
						</Button>
					</div>
				</div>
			);
		}

		// No data at all empty state
		return (
			<div className="flex flex-col items-center justify-center py-16 px-4">
				{/* Main illustration */}
				<div className="relative mb-6">
					<div className="w-24 h-24 mx-auto mb-4 rounded-full bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-blue-900/20 dark:to-indigo-900/20 flex items-center justify-center">
						<svg
							className="w-12 h-12 text-blue-500 dark:text-blue-400"
							fill="none"
							stroke="currentColor"
							viewBox="0 0 24 24"
							xmlns="http://www.w3.org/2000/svg"
							aria-label="Document icon"
						>
							<title>Document icon</title>
							<path
								strokeLinecap="round"
								strokeLinejoin="round"
								strokeWidth={1.5}
								d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
							/>
						</svg>
					</div>
					{/* Floating elements for visual interest */}
					<div className="absolute -top-2 -right-2 w-3 h-3 bg-blue-200 dark:bg-blue-800 rounded-full animate-pulse"></div>
					<div className="absolute -bottom-1 -left-1 w-2 h-2 bg-indigo-200 dark:bg-indigo-800 rounded-full animate-pulse delay-300"></div>
				</div>

				{/* Text content */}
				<div className="text-center max-w-sm">
					<h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-2">
						No data found
					</h3>
					<p className="text-sm text-gray-500 dark:text-gray-400 mb-6 leading-relaxed">
						{emptyMessage}
					</p>
				</div>

				{/* Subtle background pattern */}
				<div className="absolute inset-0 opacity-5 dark:opacity-10">
					<div
						className="absolute inset-0"
						style={{
							backgroundImage: `radial-gradient(circle at 25% 25%, #3b82f6 1px, transparent 1px),
													 radial-gradient(circle at 75% 75%, #6366f1 1px, transparent 1px)`,
							backgroundSize: "24px 24px",
						}}
					></div>
				</div>
			</div>
		);
	};

	if (isLoading) {
		return (
			<div className="space-y-4">
				{/* Loading skeleton for search and filters */}
				{searchable && (
					<div className="flex items-center space-x-2">
						<div className="relative flex-1">
							<div className="h-10 bg-gray-200 dark:bg-gray-700 rounded-md animate-pulse" />
						</div>
					</div>
				)}

				{/* Loading skeleton for table */}
				<div className="rounded-md border">
					<Table>
						<TableHeader>
							<TableRow>
								{columns.map((column) => (
									<TableHead key={column.key} style={{ width: column.width }}>
										<div className="h-4 bg-gray-200 dark:bg-gray-700 rounded animate-pulse" />
									</TableHead>
								))}
								{((actions && actions.length > 0) || showViewAction) && (
									<TableHead className="w-[50px]">
										<div className="h-4 bg-gray-200 dark:bg-gray-700 rounded animate-pulse" />
									</TableHead>
								)}
							</TableRow>
						</TableHeader>
						<TableBody>
							{Array.from({ length: loadingRows }).map((_, index) => (
								<TableRow key={index}>
									{columns.map((column) => (
										<TableCell key={column.key}>
											<div className="h-4 bg-gray-200 dark:bg-gray-700 rounded animate-pulse" />
										</TableCell>
									))}
									{((actions && actions.length > 0) || showViewAction) && (
										<TableCell>
											<div className="h-8 w-8 bg-gray-200 dark:bg-gray-700 rounded animate-pulse" />
										</TableCell>
									)}
								</TableRow>
							))}
						</TableBody>
					</Table>
				</div>
			</div>
		);
	}

	return (
		<div className="space-y-4">
			{/* Search and View Controls - Single Line Layout */}
			<div className="flex items-center justify-between mb-4">
				{/* Search Bar - Left Aligned */}
				{searchable && (
					<div className="relative max-w-sm">
						<Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
						<Input
							placeholder={searchPlaceholder}
							value={searchTerm}
							onChange={(e) => setSearchTerm(e.target.value)}
							className="pl-9"
						/>
					</div>
				)}
				
				{/* View Controls - Right Aligned */}
				<div className="flex items-center space-x-2">
					<DropdownMenu>
						<DropdownMenuTrigger asChild>
							<Button variant="outline" className="flex items-center space-x-2">
								<svg
									className="w-4 h-4"
									fill="none"
									stroke="currentColor"
									viewBox="0 0 24 24"
									aria-label="View options"
								>
									<title>View options</title>
									<path
										strokeLinecap="round"
										strokeLinejoin="round"
										strokeWidth={2}
										d="M4 6h16M4 10h16M4 14h16M4 18h16"
									/>
								</svg>
								<span>View</span>
								<svg
									className="w-4 h-4"
									fill="none"
									stroke="currentColor"
									viewBox="0 0 24 24"
									aria-label="Dropdown arrow"
								>
									<title>Dropdown arrow</title>
									<path
										strokeLinecap="round"
										strokeLinejoin="round"
										strokeWidth={2}
										d="M19 9l-7 7-7-7"
									/>
								</svg>
							</Button>
						</DropdownMenuTrigger>
						<DropdownMenuContent align="end" className="w-64">
							<div className="p-2">
								<Input
									placeholder="Search columns..."
									value={columnSearchTerm}
									onChange={(e) => setColumnSearchTerm(e.target.value)}
									className="mb-2"
								/>
								{columns
									.filter((column) =>
										column.label
											.toLowerCase()
											.includes(columnSearchTerm.toLowerCase()),
									)
									.map((column) => (
										<DropdownMenuItem
											key={column.key}
											onClick={() => handleColumnVisibilityChange(column.key)}
											className="flex items-center justify-between cursor-pointer py-2"
										>
											<span>{column.label}</span>
											{visibleColumns.includes(column.key) && (
												<svg
													className="w-4 h-4 text-blue-500"
													fill="currentColor"
													viewBox="0 0 20 20"
													aria-label="Selected"
												>
													<title>Column selected</title>
													<path
														fillRule="evenodd"
														d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
														clipRule="evenodd"
													/>
												</svg>
											)}
										</DropdownMenuItem>
									))}
							</div>
						</DropdownMenuContent>
					</DropdownMenu>
				</div>
			</div>

			{/* Table */}
			<div className="rounded-md border">
				<Table>
					<TableHeader>
						<TableRow>
							{columns
								.filter((column) => visibleColumns.includes(column.key))
								.map((column) => (
									<TableHead
										key={column.key}
										style={{ width: column.width }}
										className={
											column.sortable ? "cursor-pointer select-none" : ""
										}
										onClick={
											column.sortable ? () => handleSort(column.key) : undefined
										}
									>
										<div className="flex items-center">
											{column.label}
											{column.sortable && getSortIcon(column.key)}
										</div>
									</TableHead>
								))}
							{((actions && actions.length > 0) || showViewAction) && (
								<TableHead className="w-[50px]" />
							)}
						</TableRow>
					</TableHeader>
					<TableBody>
						{paginatedData.length === 0 ? (
							<TableRow>
								<TableCell
									colSpan={
										visibleColumns.length +
										((actions && actions.length > 0) || showViewAction ? 1 : 0)
									}
									className="h-24 text-center"
								>
									{renderEmptyState()}
								</TableCell>
							</TableRow>
						) : (
							paginatedData.map((item, index) => (
								<TableRow
									key={item.id || index}
									className={
										"hover:bg-zinc-200/50 dark:hover:bg-slate-700 transition-colors"
									}
								>
									{columns
										.filter((column) => visibleColumns.includes(column.key))
										.map((column) => (
											<TableCell key={column.key}>
												{column.render ? column.render(item) : item[column.key]}
											</TableCell>
										))}
									{((actions && actions.length > 0) || showViewAction) && (
										<TableCell>
											<div className="flex items-center justify-end">
												{showViewAction && onViewDetails && (
													<Button
														variant="ghost"
														size="sm"
														onClick={() => onViewDetails(item)}
														className="h-8 w-8 p-0"
													>
														<Eye className="h-4 w-4" />
													</Button>
												)}
												{actions && actions.length > 0 && (
													<DropdownMenu>
														<DropdownMenuTrigger asChild>
															<Button
																variant="ghost"
																size="sm"
																className="h-8 w-8 p-0"
															>
																<MoreHorizontal className="h-4 w-4" />
															</Button>
														</DropdownMenuTrigger>
														<DropdownMenuContent align="end">
															{actions.map((action, actionIndex) => (
																<div key={actionIndex}>
																	<DropdownMenuItem
																		onClick={() =>
																			handleActionClick(action, item)
																		}
																		className={
																			action.variant === "destructive"
																				? "text-red-600 focus:text-red-600"
																				: ""
																		}
																	>
																		{action.icon && (
																			<span className="mr-2">
																				{action.icon}
																			</span>
																		)}
																		{typeof action.label === "function"
																			? action.label(item)
																			: action.label}
																	</DropdownMenuItem>
																	{action.separator && (
																		<DropdownMenuSeparator />
																	)}
																</div>
															))}
														</DropdownMenuContent>
													</DropdownMenu>
												)}
											</div>
										</TableCell>
									)}
								</TableRow>
							))
						)}
					</TableBody>
				</Table>
			</div>

			{/* Pagination */}
			{pagination && totalPages > 1 && (
				<div className="flex items-center justify-between px-2">
					<div className="text-sm text-muted-foreground">
						Showing {(currentPage - 1) * pageSize + 1} to{" "}
						{Math.min(currentPage * pageSize, filteredData.length)} of{" "}
						{filteredData.length} results
					</div>
					<div className="flex items-center space-x-6 lg:space-x-8">
						<div className="flex items-center space-x-2">
							<p className="text-sm font-medium">Page</p>
							<p className="text-sm font-medium">
								{currentPage} of {totalPages}
							</p>
						</div>
						<div className="flex items-center space-x-2">
							<Button
								variant="outline"
								size="sm"
								onClick={() => setCurrentPage(1)}
								disabled={currentPage === 1}
								className="h-8 w-8 p-0"
							>
								<ChevronsLeft className="h-4 w-4" />
							</Button>
							<Button
								variant="outline"
								size="sm"
								onClick={() => setCurrentPage(currentPage - 1)}
								disabled={currentPage === 1}
								className="h-8 w-8 p-0"
							>
								<ChevronLeft className="h-4 w-4" />
							</Button>
							<Button
								variant="outline"
								size="sm"
								onClick={() => setCurrentPage(currentPage + 1)}
								disabled={currentPage === totalPages}
								className="h-8 w-8 p-0"
							>
								<ChevronRight className="h-4 w-4" />
							</Button>
							<Button
								variant="outline"
								size="sm"
								onClick={() => setCurrentPage(totalPages)}
								disabled={currentPage === totalPages}
								className="h-8 w-8 p-0"
							>
								<ChevronsRight className="h-4 w-4" />
							</Button>
						</div>
					</div>
				</div>
			)}

			{/* Confirmation Dialog */}
			<AlertDialog
				open={!!pendingAction}
				onOpenChange={() => setPendingAction(null)}
			>
				<AlertDialogContent>
					<AlertDialogHeader>
						<AlertDialogTitle>
							{pendingAction?.action.confirmationTitle || "Confirm Action"}
						</AlertDialogTitle>
						<AlertDialogDescription>
							{pendingAction?.action.confirmationDescription ||
								"Are you sure you want to perform this action?"}
						</AlertDialogDescription>
					</AlertDialogHeader>
					<AlertDialogFooter>
						<AlertDialogCancel>Cancel</AlertDialogCancel>
						<AlertDialogAction onClick={confirmAction}>
							Confirm
						</AlertDialogAction>
					</AlertDialogFooter>
				</AlertDialogContent>
			</AlertDialog>
		</div>
	);
}
