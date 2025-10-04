/**
 * Standard API Response interface for all services
 */
export interface APIResponse<T = unknown> {
	status: number;
	success: boolean;
	message: string;
	data?: T;
	error?: string;
}

/**
 * Pagination metadata for list responses
 */
export interface PaginationMeta {
	total: number;
	page: number;
	limit: number;
	totalPages: number;
	hasNext: boolean;
	hasPrev: boolean;
}

/**
 * Paginated API Response interface
 */
export interface PaginatedAPIResponse<T = unknown> extends APIResponse<T[]> {
	meta: PaginationMeta;
}

/**
 * Standard Service Response type for internal service operations
 * Used for consistent error handling across all service layers
 */
export type ServiceResponse<T = void> = 
	| { success: true; data: T }
	| { 
		success: false; 
		error: {
			code: string;
			message: string;
			severity: string;
			timestamp: string;
			statusCode: number;
			context?: Record<string, unknown>;
		}
	};
