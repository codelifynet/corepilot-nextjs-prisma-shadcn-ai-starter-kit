# Error Handler System Documentation

## Overview

CorePilot's error handler system is a comprehensive solution that centrally manages all error handling in the application. This system provides consistent error processing, localization support, and type safety.

## 📁 File Location
```
src/utils/error-handler.ts
```

## 🏗️ System Architecture

### Main Components

1. **Error Types & Interfaces**: Error types and interfaces
2. **Error Factory**: Error creation functions
3. **Error Parsers**: Functions that parse different error types
4. **Error Handlers**: Main error handling functions
5. **Utility Functions**: Helper functions
6. **Result Types**: Exception-free error management

## 📋 Error Types (ErrorCode)

```typescript
export type ErrorCode =
  | "BAD_REQUEST"      // 400 - Invalid request
  | "UNAUTHORIZED"     // 401 - Authorization required
  | "FORBIDDEN"        // 403 - Access denied
  | "NOT_FOUND"        // 404 - Resource not found
  | "CONFLICT"         // 409 - Data conflict
  | "VALIDATION_ERROR" // 422 - Validation error
  | "INTERNAL_ERROR"   // 500 - Server error
  | "DATABASE_ERROR"   // 500 - Database error
  | "NETWORK_ERROR"    // 503 - Network error
  | "RATE_LIMIT"       // 429 - Too many requests
  | "TIMEOUT";         // 408 - Timeout
```

### Error Severity Levels (ErrorSeverity)

```typescript
export type ErrorSeverity = "low" | "medium" | "high" | "critical";
```

## 🔧 Main Error Object

### `error` Factory Object

The most important component, the `error` object, contains factory functions for all error types:

```typescript
export const error = {
  badRequest: (message?, context?) => AppError,
  unauthorized: (message?, context?) => AppError,
  forbidden: (message?, context?) => AppError,
  notFound: (message?, context?) => AppError,
  conflict: (message?, context?) => AppError,
  validation: (message?, context?) => AppError,
  rateLimit: (message?, context?) => AppError,
  internal: (message?, context?) => AppError,
  database: (message?, context?) => AppError,
  network: (message?, context?) => AppError,
  timeout: (message?, context?) => AppError,
};
```

## 📖 Usage Examples

### 1. Basic Error Creation

```typescript
import { error } from '@/utils/error-handler';

// Simple error
throw error.notFound();

// With custom message
throw error.badRequest("Invalid user ID");

// With context information
throw error.validation("Invalid email format", {
  field: "email",
  value: "invalid-email",
  userId: "123"
});
```

### 2. Usage in API Routes

```typescript
import { handleError, error } from '@/utils/error-handler';

export async function GET(request: Request) {
  try {
    const user = await getUserById(id);
    
    if (!user) {
      throw error.notFound("User not found", { userId: id });
    }
    
    return NextResponse.json({ user });
  } catch (err) {
    return handleError(err, request);
  }
}
```

### 3. Usage with Validation

```typescript
import { throwIf, error } from '@/utils/error-handler';

function validateUser(userData: any) {
  throwIf(!userData.email, () => 
    error.validation("Email field is required")
  );
  
  throwIf(userData.age < 18, () => 
    error.badRequest("Age cannot be less than 18", { age: userData.age })
  );
}
```

### 4. Assert Pattern Usage

```typescript
import { assertExists, error } from '@/utils/error-handler';

async function updateUser(id: string, data: any) {
  const user = await getUserById(id);
  
  // Null check and error throwing
  assertExists(user, () => 
    error.notFound("User not found", { userId: id })
  );
  
  // At this point user is definitely not null
  return await updateUserData(user, data);
}
```

### 5. Result Pattern (Exception-free)

```typescript
import { safeAsync, ok, err, error } from '@/utils/error-handler';

async function getUserSafely(id: string): Promise<Result<User>> {
  return safeAsync(async () => {
    const user = await getUserById(id);
    if (!user) {
      throw error.notFound("User not found");
    }
    return user;
  });
}

// Usage
const result = await getUserSafely("123");
if (result.success) {
  console.log("User:", result.data);
} else {
  console.error("Error:", result.error);
}
```

## 🔍 Error Type Checking

### Type Guards

```typescript
import { isAppError, isPrismaError } from '@/utils/error-handler';

try {
  // Some operation
} catch (err) {
  if (isAppError(err)) {
    console.log("App Error:", err.code, err.message);
  } else if (isPrismaError(err)) {
    console.log("Prisma Error:", err.code);
  }
}
```

## 🌐 Localization Support

The error handler system works integrated with `next-intl` to provide multilingual error messages:

```typescript
// i18n/messages/tr.json
{
  "errors": {
    "bad_request": "Invalid request",
    "unauthorized": "Authorization required",
    "not_found": "Not found"
  }
}

// i18n/messages/en.json
{
  "errors": {
    "bad_request": "Bad request",
    "unauthorized": "Authorization required", 
    "not_found": "Not found"
  }
}
```

## 🗃️ Prisma Error Management

The system automatically parses Prisma ORM errors:

```typescript
// Prisma errors are automatically converted
const PRISMA_ERROR_MAP = {
  P2002: { code: "CONFLICT", message: "Unique constraint violation" },
  P2025: { code: "NOT_FOUND", message: "Record not found" },
  P2003: { code: "BAD_REQUEST", message: "Foreign key constraint failed" },
  // ...
};
```

## 📊 Error Structure (AppError Interface)

```typescript
export interface AppError {
  readonly code: ErrorCode;           // Error code
  readonly message: string;           // Error message
  readonly statusCode: number;        // HTTP status code
  readonly severity: ErrorSeverity;   // Severity level
  readonly context?: Record<string, unknown>; // Additional information
  readonly timestamp: string;         // Timestamp
  readonly isOperational: boolean;    // Is it an operational error?
}
```

## 🔧 Configuration

### Error Configuration

```typescript
const ERROR_CONFIG: Record<ErrorCode, {
  statusCode: number;
  severity: ErrorSeverity;
  isOperational: boolean;
}> = {
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
};
```

## 📝 API Response Format

All errors are returned in a consistent JSON format:

```json
{
  "success": false,
  "error": {
    "code": "NOT_FOUND",
    "message": "User not found",
    "severity": "low",
    "timestamp": "2024-01-15T10:30:00.000Z",
    "context": {
      "userId": "123",
      "field": "email"
    },
    "path": "/api/users/123"
  }
}
```

## 🚀 Best Practices

### 1. Error Creation

```typescript
// ✅ Good
throw error.notFound("User not found", { userId });

// ❌ Bad
throw new Error("User not found");
```

### 2. Adding Context Information

```typescript
// ✅ Good - Useful information for debugging
throw error.validation("Invalid email format", {
  field: "email",
  value: email,
  userId: user.id,
  attemptCount: 3
});

// ❌ Bad - Insufficient information
throw error.validation("Invalid email");
```

### 3. Async Operations

```typescript
// ✅ Good - Using Result pattern
const result = await safeAsync(() => riskyOperation());
if (!result.success) {
  return handleError(result.error);
}

// ✅ Good - With try-catch
try {
  await riskyOperation();
} catch (err) {
  return handleError(err, request);
}
```

### 4. Using Type Guards

```typescript
// ✅ Good
if (isAppError(error)) {
  console.log(`App Error [${error.code}]: ${error.message}`);
}

// ❌ Bad
if (error.code) { // No type safety
  console.log(error.code);
}
```

## 🔍 Debugging and Logging

### Critical Error Logging

The system automatically logs high-severity errors:

```typescript
// High and Critical level errors are automatically logged
if (appError.severity === "critical" || appError.severity === "high") {
  console.error("Critical Error:", {
    ...appError,
    url: request?.url,
    method: request?.method,
  });
}
```

### Development vs Production

```typescript
// More detailed information in development environment
const responseData = {
  success: false,
  error: {
    code: appError.code,
    message: localizedMessage,
    severity: appError.severity,
    timestamp: appError.timestamp,
    ...(appError.context && { context: appError.context }),
    ...(process.env.NODE_ENV === 'development' && { 
      stack: appError.stack 
    }),
  },
};
```

## 🧪 Test Examples

```typescript
import { error, isAppError, handleError } from '@/utils/error-handler';

describe('Error Handler', () => {
  test('should create proper error structure', () => {
    const err = error.notFound("Test message", { id: "123" });
    
    expect(err.code).toBe("NOT_FOUND");
    expect(err.statusCode).toBe(404);
    expect(err.message).toBe("Test message");
    expect(err.context).toEqual({ id: "123" });
    expect(err.isOperational).toBe(true);
  });

  test('should handle unknown errors', async () => {
    const unknownError = new Error("Unknown");
    const response = await handleError(unknownError);
    
    expect(response.status).toBe(500);
  });
});
```

## 🔗 Related Files

- `src/lib/auth.ts` - Authentication errors
- `src/middleware.ts` - Middleware error management
- `i18n/messages/` - Multilingual error messages
- `src/types/api.ts` - API type definitions

## 📚 Additional Resources

- [Next.js Error Handling](https://nextjs.org/docs/app/building-your-application/routing/error-handling)
- [Prisma Error Reference](https://www.prisma.io/docs/reference/api-reference/error-reference)
- [Zod Validation](https://zod.dev/)
- [next-intl Documentation](https://next-intl-docs.vercel.app/)

---

This documentation is a comprehensive usage guide for the CorePilot error handler system. The system is designed according to SOLID principles and developed to ensure type safety.