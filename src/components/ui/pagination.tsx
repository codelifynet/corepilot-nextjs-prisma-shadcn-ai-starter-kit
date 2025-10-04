import { ChevronLeft, ChevronRight, MoreHorizontal } from "lucide-react";
import { Button } from "./button";
import { cn } from "@/lib/utils";

interface PaginationProps {
	currentPage: number;
	totalPages: number;
	onPageChange: (page: number) => void;
	className?: string;
}

export function Pagination({
	currentPage,
	totalPages,
	onPageChange,
	className,
}: PaginationProps) {
	const getVisiblePages = () => {
		const delta = 2;
		const range = [];
		const rangeWithDots = [];

		for (
			let i = Math.max(2, currentPage - delta);
			i <= Math.min(totalPages - 1, currentPage + delta);
			i++
		) {
			range.push(i);
		}

		if (currentPage - delta > 2) {
			rangeWithDots.push(1, "...");
		} else {
			rangeWithDots.push(1);
		}

		rangeWithDots.push(...range);

		if (currentPage + delta < totalPages - 1) {
			rangeWithDots.push("...", totalPages);
		} else {
			rangeWithDots.push(totalPages);
		}

		return rangeWithDots;
	};

	if (totalPages <= 1) return null;

	const visiblePages = getVisiblePages();

	return (
		<div className={cn("flex items-center space-x-2", className)}>
			<Button
				variant="outline"
				size="sm"
				onClick={() => onPageChange(currentPage - 1)}
				disabled={currentPage <= 1}
			>
				<ChevronLeft className="h-4 w-4" />
				Previous
			</Button>

			<div className="flex items-center space-x-1">
				{visiblePages.map((page, index) => {
					if (page === "...") {
						return (
							<div key={`dots-${index}`} className="px-2">
								<MoreHorizontal className="h-4 w-4" />
							</div>
						);
					}

					const pageNumber = page as number;
					return (
						<Button
							key={pageNumber}
							variant={currentPage === pageNumber ? "default" : "outline"}
							size="sm"
							onClick={() => onPageChange(pageNumber)}
							className="min-w-[40px]"
						>
							{pageNumber}
						</Button>
					);
				})}
			</div>

			<Button
				variant="outline"
				size="sm"
				onClick={() => onPageChange(currentPage + 1)}
				disabled={currentPage >= totalPages}
			>
				Next
				<ChevronRight className="h-4 w-4" />
			</Button>
		</div>
	);
}
