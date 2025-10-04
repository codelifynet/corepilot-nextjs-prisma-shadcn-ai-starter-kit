import { NextResponse } from "next/server";
import { ZodError } from "zod";
import { getTranslations } from "next-intl/server";

// Error types
export type ErrorCode =
	| "BAD_REQUEST"
	| "UNAUTHORIZED"
	| "FORBIDDEN"
	| "NOT_FOUND"
	| "CONFLICT"
	| "VALIDATION_ERROR"
	| "INTERNAL_ERROR"
	| "DATABASE_ERROR"
	| "NETWORK_ERROR"
	| "RATE_LIMIT"
	| "TIMEOUT";

export type ErrorSeverity = "low" | "medium" | "high" | "critical";

export interface IAppError {
	readonly code: ErrorCode;
	readonly message: string;
	readonly statusCode: number;
	readonly severity: ErrorSeverity;
	readonly context?: Record<string, unknown>;
	readonly timestamp: string;
	readonly isOperational: boolean;
}

export interface PrismaError {
	code: string;
	message: string;
	meta?: {
		target?: string[];
		field_name?: string;
		table?: string;
		column?: string;
	};
}

// Error configuration
const ERROR_CONFIG: Record<
	ErrorCode,
	{ statusCode: number; severity: ErrorSeverity; isOperational: boolean }
> = {
	BAD_REQUEST: { statusCode: 400, severity: "low", isOperational: true },
	UNAUTHORIZED: { statusCode: 401, severity: "medium", isOperational: true },
	FORBIDDEN: { statusCode: 403, severity: "medium", isOperational: true },
	NOT_FOUND: { statusCode: 404, severity: "low", isOperational: true },
	CONFLICT: { statusCode: 409, severity: "medium", isOperational: true },
	VALIDATION_ERROR: { statusCode: 422, severity: "low", isOperational: true },
	RATE_LIMIT: { statusCode: 429, severity: "medium", isOperational: true },
	INTERNAL_ERROR: { statusCode: 500, severity: "high", isOperational: false },
	DATABASE_ERROR: { statusCode: 500, severity: "high", isOperational: false },
	NETWORK_ERROR: { statusCode: 503, severity: "medium", isOperational: false },
	TIMEOUT: { statusCode: 408, severity: "medium", isOperational: true },
} as const;

// Error factory function
function createAppError(
	code: ErrorCode,
	message: string,
	context?: Record<string, unknown>,
): IAppError {
	const config = ERROR_CONFIG[code];

	return {
		code,
		message,
		statusCode: config.statusCode,
		severity: config.severity,
		isOperational: config.isOperational,
		context,
		timestamp: new Date().toISOString(),
	};
}

// Error creators - simple functions
export const error = {
	badRequest: (message = "Bad request", context?: Record<string, unknown>) =>
		createAppError("BAD_REQUEST", message, context),

	unauthorized: (
		message = "Authorization required",
		context?: Record<string, unknown>,
	) => createAppError("UNAUTHORIZED", message, context),

	forbidden: (message = "Access denied", context?: Record<string, unknown>) =>
		createAppError("FORBIDDEN", message, context),

	notFound: (
		message = "Resource not found",
		context?: Record<string, unknown>,
	) => createAppError("NOT_FOUND", message, context),

	conflict: (message = "Data conflict", context?: Record<string, unknown>) =>
		createAppError("CONFLICT", message, context),

	validation: (
		message = "Validation error",
		context?: Record<string, unknown>,
	) => createAppError("VALIDATION_ERROR", message, context),

	rateLimit: (
		message = "Too many requests",
		context?: Record<string, unknown>,
	) => createAppError("RATE_LIMIT", message, context),

	internal: (
		message = "Internal server error",
		context?: Record<string, unknown>,
	) => createAppError("INTERNAL_ERROR", message, context),

	database: (message = "Database error", context?: Record<string, unknown>) =>
		createAppError("DATABASE_ERROR", message, context),

	network: (message = "Network error", context?: Record<string, unknown>) =>
		createAppError("NETWORK_ERROR", message, context),

	timeout: (message = "Request timeout", context?: Record<string, unknown>) =>
		createAppError("TIMEOUT", message, context),
};

// Prisma error mapper
const PRISMA_ERROR_MAP: Record<string, { code: ErrorCode; message: string }> = {
	P2002: { code: "CONFLICT", message: "Unique constraint violation" },
	P2025: { code: "NOT_FOUND", message: "Record not found" },
	P2003: { code: "BAD_REQUEST", message: "Foreign key constraint failed" },
	P2014: { code: "BAD_REQUEST", message: "Invalid ID provided" },
	P2016: { code: "BAD_REQUEST", message: "Query interpretation error" },
	P2021: { code: "NOT_FOUND", message: "Table not found" },
	P2022: { code: "NOT_FOUND", message: "Column not found" },
};

// Error parsers
export function parsePrismaError(prismaError: PrismaError): IAppError {
	const mapping = PRISMA_ERROR_MAP[prismaError.code];

	if (mapping) {
		const context = {
			prismaCode: prismaError.code,
			meta: prismaError.meta,
		};

		// Special handling for unique constraint
		if (prismaError.code === "P2002") {
			const field = prismaError.meta?.target?.join(", ") || "field";
			return createAppError(
				mapping.code,
				`Unique constraint failed on ${field}`,
				context,
			);
		}

		return createAppError(mapping.code, mapping.message, context);
	}

	return createAppError(
		"DATABASE_ERROR",
		prismaError.message || "Unknown database error",
		{
			prismaCode: prismaError.code,
			meta: prismaError.meta,
		},
	);
}

export function parseZodError(zodError: ZodError): IAppError {
	const errors = zodError.issues.map((issue) => ({
		field: issue.path.join("."),
		message: issue.message,
		code: issue.code,
	}));

	const message = errors
		.map((err) => `${err.field}: ${err.message}`)
		.join(", ");

	return createAppError("VALIDATION_ERROR", `Validation failed: ${message}`, {
		validationErrors: errors,
	});
}

// Error type guards
export function isAppError(value: unknown): value is IAppError {
	return (
		typeof value === "object" &&
		value !== null &&
		"code" in value &&
		"message" in value &&
		"statusCode" in value
	);
}

export function isPrismaError(value: unknown): value is PrismaError {
	return (
		typeof value === "object" &&
		value !== null &&
		"code" in value &&
		typeof (value as any).code === "string" &&
		(value as any).code.startsWith("P")
	);
}

// Localization helper
export async function getLocalizedMessage(
	errorCode: ErrorCode,
	params?: Record<string, string | number | Date>,
): Promise<string> {
	try {
		const t = await getTranslations("errors");
		return t(errorCode.toLowerCase(), params);
	} catch {
		// Fallback messages in English
		const fallbackMessages: Record<ErrorCode, string> = {
			BAD_REQUEST: "Bad request",
			UNAUTHORIZED: "Authorization required",
			FORBIDDEN: "Access denied",
			NOT_FOUND: "Not found",
			CONFLICT: "Conflict",
			VALIDATION_ERROR: "Validation error",
			RATE_LIMIT: "Too many requests",
			INTERNAL_ERROR: "Internal server error",
			DATABASE_ERROR: "Database error",
			NETWORK_ERROR: "Network error",
			TIMEOUT: "Request timeout",
		};

		return fallbackMessages[errorCode] || "Unknown error";
	}
}

// Main error handler
export async function handleError(
	rawError: unknown,
	request?: Request,
): Promise<NextResponse> {
	let appError: IAppError;

	// Parse different error types
	if (isAppError(rawError)) {
		appError = rawError;
	} else if (rawError instanceof ZodError) {
		appError = parseZodError(rawError);
	} else if (isPrismaError(rawError)) {
		appError = parsePrismaError(rawError);
	} else if (rawError instanceof Error) {
		appError = createAppError("INTERNAL_ERROR", rawError.message, {
			stack: rawError.stack,
			name: rawError.name,
		});
	} else {
		appError = createAppError("INTERNAL_ERROR", "Unknown error", {
			originalError: String(rawError),
		});
	}

	// Get localized message
	const localizedMessage = await getLocalizedMessage(appError.code);

	// Create response data
	const responseData = {
		success: false,
		error: {
			code: appError.code,
			message: localizedMessage,
			severity: appError.severity,
			timestamp: appError.timestamp,
			...(appError.context && { context: appError.context }),
			...(request && { path: new URL(request.url).pathname }),
		},
	};

	// Log critical errors
	if (appError.severity === "critical" || appError.severity === "high") {
		console.error("Critical Error:", {
			...appError,
			url: request?.url,
			method: request?.method,
		});
	}

	return NextResponse.json(responseData, {
		status: appError.statusCode,
		headers: {
			"Content-Type": "application/json",
		},
	});
}

// Utility functions for common patterns
export function throwIf(condition: boolean, errorFn: () => AppError): void {
	if (condition) {
		throw errorFn();
	}
}

export function assertExists<T>(
	value: T | null | undefined,
	errorFn: () => AppError,
): asserts value is T {
	if (value == null) {
		throw errorFn();
	}
}

// Result type for error handling without exceptions
export type Result<T, E = IAppError> =
	| { success: true; data: T }
	| { success: false; error: E };

export function ok<T>(data: T): Result<T> {
	return { success: true, data };
}

export function err<E = IAppError>(error: E): Result<never, E> {
	return { success: false, error };
}

// Async result wrapper
export async function safeAsync<T>(fn: () => Promise<T>): Promise<Result<T>> {
	try {
		const data = await fn();
		return ok(data);
	} catch (rawError) {
		let appError: IAppError;

		if (isAppError(rawError)) {
			appError = rawError;
		} else if (rawError instanceof ZodError) {
			appError = parseZodError(rawError);
		} else if (isPrismaError(rawError)) {
			appError = parsePrismaError(rawError);
		} else if (rawError instanceof Error) {
			appError = createAppError("INTERNAL_ERROR", rawError.message);
		} else {
			appError = createAppError("INTERNAL_ERROR", "Unknown error");
		}

		return err(appError);
	}
}

// Unified error response creator - returns standardized error response object
export async function createErrorResponse(
	errorCode: ErrorCode,
	customMessage?: string,
	context?: Record<string, unknown>,
	params?: Record<string, string | number | Date>
) {
	const appError = createAppError(errorCode, customMessage || "", context);
	const localizedMessage = await getLocalizedMessage(errorCode, params);

	// Log critical errors
	if (appError.severity === "critical" || appError.severity === "high") {
		console.error("Critical Error:", appError);
	}

	return {
		success: false as const,
		error: {
			code: appError.code,
			message: localizedMessage,
			severity: appError.severity,
			timestamp: appError.timestamp,
			statusCode: appError.statusCode,
			...(appError.context && { context: appError.context }),
		},
	};
}

// Simplified error response creators that return response objects instead of throwing
export const errorResponse = {
	badRequest: async (
		customMessage?: string,
		context?: Record<string, unknown>,
		params?: Record<string, string | number | Date>
	) => createErrorResponse("BAD_REQUEST", customMessage, context, params),

	unauthorized: async (
		customMessage?: string,
		context?: Record<string, unknown>,
		params?: Record<string, string | number | Date>
	) => createErrorResponse("UNAUTHORIZED", customMessage, context, params),

	forbidden: async (
		customMessage?: string,
		context?: Record<string, unknown>,
		params?: Record<string, string | number | Date>
	) => createErrorResponse("FORBIDDEN", customMessage, context, params),

	notFound: async (
		customMessage?: string,
		context?: Record<string, unknown>,
		params?: Record<string, string | number | Date>
	) => createErrorResponse("NOT_FOUND", customMessage, context, params),

	conflict: async (
		customMessage?: string,
		context?: Record<string, unknown>,
		params?: Record<string, string | number | Date>
	) => createErrorResponse("CONFLICT", customMessage, context, params),

	validation: async (
		customMessage?: string,
		context?: Record<string, unknown>,
		params?: Record<string, string | number | Date>
	) => createErrorResponse("VALIDATION_ERROR", customMessage, context, params),

	rateLimit: async (
		customMessage?: string,
		context?: Record<string, unknown>,
		params?: Record<string, string | number | Date>
	) => createErrorResponse("RATE_LIMIT", customMessage, context, params),

	internal: async (
		customMessage?: string,
		context?: Record<string, unknown>,
		params?: Record<string, string | number | Date>
	) => createErrorResponse("INTERNAL_ERROR", customMessage, context, params),

	database: async (
		customMessage?: string,
		context?: Record<string, unknown>,
		params?: Record<string, string | number | Date>
	) => createErrorResponse("DATABASE_ERROR", customMessage, context, params),

	network: async (
		customMessage?: string,
		context?: Record<string, unknown>,
		params?: Record<string, string | number | Date>
	) => createErrorResponse("NETWORK_ERROR", customMessage, context, params),

	timeout: async (
		customMessage?: string,
		context?: Record<string, unknown>,
		params?: Record<string, string | number | Date>
	) => createErrorResponse("TIMEOUT", customMessage, context, params),
};

// API Error Handler - for backward compatibility
export async function handleApiError(
	rawError: unknown,
	request?: Request,
): Promise<NextResponse> {
	return handleError(rawError, request);
}

// Export AppError class for backward compatibility
export class AppError extends Error {
	public readonly code: ErrorCode;
	public readonly statusCode: number;
	public readonly severity: ErrorSeverity;
	public readonly context?: Record<string, unknown>;
	public readonly timestamp: string;
	public readonly isOperational: boolean;

	constructor(
		code: ErrorCode,
		message: string,
		context?: Record<string, unknown>
	) {
		super(message);
		const config = ERROR_CONFIG[code];

		this.code = code;
		this.statusCode = config.statusCode;
		this.severity = config.severity;
		this.isOperational = config.isOperational;
		this.context = context;
		this.timestamp = new Date().toISOString();

		// Set the prototype explicitly for instanceof checks
		Object.setPrototypeOf(this, AppError.prototype);
	}
}
