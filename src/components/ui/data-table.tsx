"use client";

import type { ReactNode } from "react";
import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { MoreHorizontal } from "lucide-react";

export interface TableColumn<T> {
	key: string;
	label: string;
	width?: string;
	render?: (item: T) => ReactNode;
	sortable?: boolean;
}

export interface TableAction<T> {
	label: string | ((item: T) => string);
	onClick: (item: T) => void;
	variant?: "default" | "destructive";
	separator?: boolean;
}

export interface DataTableProps<T> {
	data: T[];
	columns: TableColumn<T>[];
	actions?: TableAction<T>[];
	isLoading?: boolean;
	emptyMessage?: string;
	loadingRows?: number;
	onRowClick?: (item: T) => void;
}

export function DataTable<T extends Record<string, any>>({
	data,
	columns,
	actions,
	isLoading = false,
	emptyMessage = "No data found",
	loadingRows = 5,
	onRowClick,
}: DataTableProps<T>) {
	const renderLoadingSkeleton = () => (
		<div className="rounded-md border">
			<Table>
				<TableHeader>
					<TableRow>
						{columns.map((column) => (
							<TableHead key={column.key} className={column.width}>
								{column.label}
							</TableHead>
						))}
						{actions && actions.length > 0 && (
							<TableHead className="w-[50px]"></TableHead>
						)}
					</TableRow>
				</TableHeader>
				<TableBody>
					{Array.from({ length: loadingRows }).map((_, index) => (
						<TableRow key={index}>
							{columns.map((column) => (
								<TableCell key={column.key}>
									<div className="h-4 bg-muted animate-pulse rounded" />
								</TableCell>
							))}
							{actions && actions.length > 0 && (
								<TableCell>
									<div className="h-8 bg-muted animate-pulse rounded w-8" />
								</TableCell>
							)}
						</TableRow>
					))}
				</TableBody>
			</Table>
		</div>
	);

	const renderEmptyState = () => (
		<div className="rounded-md border">
			<Table>
				<TableHeader>
					<TableRow>
						{columns.map((column) => (
							<TableHead key={column.key} className={column.width}>
								{column.label}
							</TableHead>
						))}
						{actions && actions.length > 0 && (
							<TableHead className="w-[50px]"></TableHead>
						)}
					</TableRow>
				</TableHeader>
				<TableBody>
					<TableRow>
						<TableCell
							colSpan={columns.length + (actions && actions.length > 0 ? 1 : 0)}
							className="text-center py-8 text-muted-foreground"
						>
							{emptyMessage}
						</TableCell>
					</TableRow>
				</TableBody>
			</Table>
		</div>
	);

	if (isLoading) {
		return renderLoadingSkeleton();
	}

	if (data.length === 0) {
		return renderEmptyState();
	}

	return (
		<div className="rounded-md border">
			<Table>
				<TableHeader>
					<TableRow>
						{columns.map((column) => (
							<TableHead key={column.key} className={column.width}>
								{column.label}
							</TableHead>
						))}
						{actions && actions.length > 0 && (
							<TableHead className="w-[50px]"></TableHead>
						)}
					</TableRow>
				</TableHeader>
				<TableBody>
					{data.map((item, index) => (
						<TableRow
							key={item.id || index}
							className={onRowClick ? "cursor-pointer hover:bg-muted/50" : ""}
							onClick={() => onRowClick?.(item)}
						>
							{columns.map((column) => (
								<TableCell key={column.key}>
									{column.render ? column.render(item) : item[column.key]}
								</TableCell>
							))}
							{actions && actions.length > 0 && (
								<TableCell>
									<DropdownMenu>
										<DropdownMenuTrigger asChild>
											<Button variant="ghost" className="h-8 w-8 p-0">
												<span className="sr-only">Open menu</span>
												<MoreHorizontal className="h-4 w-4" />
											</Button>
										</DropdownMenuTrigger>
										<DropdownMenuContent align="end">
											{actions.map((action, actionIndex) => (
												<div key={actionIndex}>
													{action.separator && actionIndex > 0 && (
														<DropdownMenuSeparator />
													)}
													<DropdownMenuItem
														onClick={(e) => {
															e.stopPropagation();
															action.onClick(item);
														}}
														className={
															action.variant === "destructive"
																? "text-destructive"
																: ""
														}
													>
														{typeof action.label === "function"
															? action.label(item)
															: action.label}
													</DropdownMenuItem>
												</div>
											))}
										</DropdownMenuContent>
									</DropdownMenu>
								</TableCell>
							)}
						</TableRow>
					))}
				</TableBody>
			</Table>
		</div>
	);
}
