/**
 * Slug Generation Utilities
 * Provides functions for generating URL-friendly slugs from text
 */

/**
 * Generate a URL-friendly slug from a string
 * @param text - The text to convert to a slug
 * @param options - Configuration options for slug generation
 * @returns A URL-friendly slug
 */
export const generateSlug = (
	text: string,
	options: {
		lowercase?: boolean;
		separator?: string;
		maxLength?: number;
		removeSpecialChars?: boolean;
	} = {},
): string => {
	const {
		lowercase = true,
		separator = "-",
		maxLength = 100,
		removeSpecialChars = true,
	} = options;

	if (!text || typeof text !== "string") {
		return "";
	}

	let slug = text.trim();

	// Convert to lowercase if specified
	if (lowercase) {
		slug = slug.toLowerCase();
	}

	// Remove or replace special characters
	if (removeSpecialChars) {
		// Replace accented characters with their base equivalents
		slug = slug.normalize("NFD").replace(/[\u0300-\u036f]/g, "");

		// Remove special characters except letters, numbers, spaces, and hyphens
		slug = slug.replace(/[^a-zA-Z0-9\s-]/g, "");
	}

	// Replace spaces and multiple separators with single separator
	slug = slug.replace(/\s+/g, separator).replace(/${separator}+/g, separator);

	// Remove leading and trailing separators
	slug = slug.replace(/^${separator}+|${separator}+$/g, "");

	// Truncate to max length if specified
	if (maxLength && slug.length > maxLength) {
		slug = slug.substring(0, maxLength);
		// Remove trailing separator if truncation created one
		slug = slug.replace(/${separator}+$/g, "");
	}

	return slug;
};

/**
 * Generate a slug with automatic fallback
 * @param text - Primary text to convert to slug
 * @param fallback - Fallback text if primary text is empty or invalid
 * @returns A URL-friendly slug
 */
export const generateSlugWithFallback = (
	text: string,
	fallback = "untitled",
) => {
	const slug = generateSlug(text);
	return slug || generateSlug(fallback);
};

/**
 * Generate a unique slug by appending a number if needed
 * @param baseSlug - The base slug to make unique
 * @param checkExists - Function to check if slug already exists
 * @param maxAttempts - Maximum number of attempts to find unique slug
 * @returns A unique slug
 */
export const generateUniqueSlug = async (
	baseSlug: string,
	checkExists: (slug: string) => Promise<boolean>,
	maxAttempts = 100,
) => {
	let slug = baseSlug;
	let counter = 1;
	let attempts = 0;

	while (attempts < maxAttempts) {
		const exists = await checkExists(slug);

		if (!exists) {
			return slug;
		}

		slug = `${baseSlug}-${counter}`;
		counter++;
		attempts++;
	}

	// If we couldn't find a unique slug, append timestamp
	return `${baseSlug}-${Date.now()}`;
};

/**
 * Generate slug from title with common transformations
 * @param title - The title to convert
 * @returns A URL-friendly slug
 */
export const generateTitleSlug = (title: string) => {
	return generateSlug(title, {
		lowercase: true,
		separator: "-",
		maxLength: 60,
		removeSpecialChars: true,
	});
};

/**
 * Generate slug for file names (preserves dots for extensions)
 * @param filename - The filename to convert
 * @returns A URL-friendly filename slug
 */
export const generateFileSlug = (filename: string) => {
	if (!filename) return "";

	const parts = filename.split(".");
	const extension = parts.length > 1 ? parts.pop() : "";
	const name = parts.join(".");

	const sluggedName = generateSlug(name, {
		lowercase: true,
		separator: "-",
		maxLength: 50,
		removeSpecialChars: true,
	});

	return extension ? `${sluggedName}.${extension}` : sluggedName;
};

/**
 * Validate if a string is a valid slug
 * @param slug - The slug to validate
 * @param options - Validation options
 * @returns True if valid slug, false otherwise
 */
export const isValidSlug = (
	slug: string,
	options: {
		minLength?: number;
		maxLength?: number;
		allowUppercase?: boolean;
		separator?: string;
	} = {},
): boolean => {
	const {
		minLength = 1,
		maxLength = 100,
		allowUppercase = false,
		separator = "-",
	} = options;

	if (!slug || typeof slug !== "string") {
		return false;
	}

	// Check length
	if (slug.length < minLength || slug.length > maxLength) {
		return false;
	}

	// Check for valid characters
	const pattern = allowUppercase
		? new RegExp(`^[a-zA-Z0-9\\${separator}]+$`)
		: new RegExp(`^[a-z0-9\\${separator}]+$`);

	if (!pattern.test(slug)) {
		return false;
	}

	// Check for leading/trailing separators
	if (slug.startsWith(separator) || slug.endsWith(separator)) {
		return false;
	}

	// Check for consecutive separators
	if (slug.includes(separator + separator)) {
		return false;
	}

	return true;
};

/**
 * Clean and normalize a slug
 * @param slug - The slug to clean
 * @returns A cleaned slug
 */
export const cleanSlug = (slug: string) => {
	if (!slug) return "";

	return slug
		.toLowerCase()
		.trim()
		.replace(/[^a-z0-9-]/g, "")
		.replace(/-+/g, "-")
		.replace(/^-|-$/g, "");
};

/**
 * Generate breadcrumb slugs from a path
 * @param path - The path to convert (e.g., "Category/Subcategory/Item")
 * @param separator - Path separator (default: "/")
 * @returns Array of slugs for breadcrumb navigation
 */
export const generateBreadcrumbSlugs = (path: string, separator = "/") => {
	if (!path) return [];

	return path
		.split(separator)
		.filter(Boolean)
		.map((segment) => generateSlug(segment.trim()));
};
