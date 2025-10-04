# ServiceResponse Type Documentation

## Overview

The `ServiceResponse<T>` type is a standardized response format for all internal service operations in the CorePilot application. It provides consistent error handling and success responses across all service layers.

## Location

**File:** `src/types/api.ts`

## Type Definition

```typescript
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
```

## Usage

### Import

```typescript
import type { ServiceResponse } from "@/types/api";
```

### Success Response

```typescript
export const getUserById = async (id: string): Promise<ServiceResponse<User>> => {
	try {
		const user = await prisma.user.findUnique({ where: { id } });
		
		if (!user) {
			return await errorResponse.notFound(undefined, { id }, { resource: "User" });
		}
		
		return { success: true, data: user };
	} catch (error) {
		return await errorResponse.internal(undefined, { id, error: String(error) });
	}
};
```

### Error Response

Error responses are automatically generated using the `errorResponse` utility from `@/utils/error-handler`:

```typescript
// Not found error
return await errorResponse.notFound(undefined, { id }, { resource: "User" });

// Internal server error
return await errorResponse.internal(undefined, { error: String(error) });

// Bad request error
return await errorResponse.badRequest(undefined, { validation: "Invalid input" });
```

## Response Structure

### Success Response

```typescript
{
	success: true,
	data: T // The actual data returned by the service
}
```

### Error Response

```typescript
{
	success: false,
	error: {
		code: string,           // Error code (e.g., "NOT_FOUND", "INTERNAL_ERROR")
		message: string,        // Localized error message
		severity: string,       // Error severity level
		timestamp: string,      // ISO timestamp when error occurred
		statusCode: number,     // HTTP status code
		context?: Record<string, unknown> // Additional context information
	}
}
```

## Benefits

1. **Consistency**: All services return the same response format
2. **Type Safety**: TypeScript ensures proper typing of success and error cases
3. **Error Handling**: Standardized error structure with localization support
4. **Debugging**: Consistent error context and timestamps
5. **API Integration**: Easy conversion to API responses

## Examples

### Basic CRUD Operations

```typescript
// Create operation
export const createUser = async (userData: CreateUserData): Promise<ServiceResponse<User>> => {
	try {
		const user = await prisma.user.create({ data: userData });
		return { success: true, data: user };
	} catch (error) {
		return await errorResponse.internal(undefined, { userData, error: String(error) });
	}
};

// Read operation
export const getUsers = async (): Promise<ServiceResponse<User[]>> => {
	try {
		const users = await prisma.user.findMany();
		return { success: true, data: users };
	} catch (error) {
		return await errorResponse.internal(undefined, { error: String(error) });
	}
};

// Update operation
export const updateUser = async (id: string, data: UpdateUserData): Promise<ServiceResponse<User>> => {
	try {
		const user = await prisma.user.update({ where: { id }, data });
		return { success: true, data: user };
	} catch (error) {
		return await errorResponse.internal(undefined, { id, data, error: String(error) });
	}
};

// Delete operation
export const deleteUser = async (id: string): Promise<ServiceResponse> => {
	try {
		await prisma.user.delete({ where: { id } });
		return { success: true, data: undefined };
	} catch (error) {
		return await errorResponse.internal(undefined, { id, error: String(error) });
	}
};
```

### Handling Responses in Components

```typescript
const handleDeleteUser = async (userId: string) => {
	const result = await deleteUser(userId);
	
	if (result.success) {
		toast.success("User deleted successfully");
		// Handle success case
	} else {
		toast.error(result.error.message);
		console.error("Delete failed:", result.error);
		// Handle error case
	}
};
```

## Migration Guide

### From Throwing Exceptions

**Before:**
```typescript
export const getUser = async (id: string): Promise<User> => {
	const user = await prisma.user.findUnique({ where: { id } });
	if (!user) {
		throw new Error("User not found");
	}
	return user;
};
```

**After:**
```typescript
export const getUser = async (id: string): Promise<ServiceResponse<User>> => {
	try {
		const user = await prisma.user.findUnique({ where: { id } });
		if (!user) {
			return await errorResponse.notFound(undefined, { id }, { resource: "User" });
		}
		return { success: true, data: user };
	} catch (error) {
		return await errorResponse.internal(undefined, { id, error: String(error) });
	}
};
```

## Best Practices

1. **Always use try-catch blocks** in service functions
2. **Provide meaningful context** in error responses
3. **Use appropriate error types** (notFound, badRequest, internal, etc.)
4. **Include relevant data** in error context for debugging
5. **Handle both success and error cases** in consuming code
6. **Use type parameters** to specify the data type for success responses

## Related Files

- `src/utils/error-handler.ts` - Error handling utilities
- `src/types/api.ts` - API type definitions
- `src/features/*/services/*.service.ts` - Service implementations

## See Also

- [Error Handler System Documentation](./ERROR_HANDLER_SYSTEM.md)
- [API Response Types Documentation](./API_RESPONSE_TYPES.md)