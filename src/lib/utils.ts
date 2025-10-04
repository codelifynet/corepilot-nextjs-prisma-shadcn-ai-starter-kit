import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

// Re-export slug generation utilities
export {
	generateSlug,
	generateSlugWithFallback,
	generateUniqueSlug,
	generateTitleSlug,
	generateFileSlug,
	isValidSlug,
	cleanSlug,
	generateBreadcrumbSlugs,
} from "@/utils/slug-generator";

export function cn(...inputs: ClassValue[]) {
	return twMerge(clsx(inputs));
}

/**
 * Format date to a readable string
 */
export function formatDate(date: Date | string | null | undefined): string {
	if (!date) return "N/A";

	const dateObj = typeof date === "string" ? new Date(date) : date;

	if (Number.isNaN(dateObj.getTime())) return "Invalid Date";

	return new Intl.DateTimeFormat("en-US", {
		year: "numeric",
		month: "short",
		day: "numeric",
		hour: "2-digit",
		minute: "2-digit",
	}).format(dateObj);
}

/**
 * Format date to a short string (date only)
 */
export function formatDateShort(
	date: Date | string | null | undefined,
): string {
	if (!date) return "N/A";

	const dateObj = typeof date === "string" ? new Date(date) : date;

	if (Number.isNaN(dateObj.getTime())) return "Invalid Date";

	return new Intl.DateTimeFormat("en-US", {
		year: "numeric",
		month: "short",
		day: "numeric",
	}).format(dateObj);
}
