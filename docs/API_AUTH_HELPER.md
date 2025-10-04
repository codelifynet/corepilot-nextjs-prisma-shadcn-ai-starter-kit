# API Authentication Helper

This helper is created to simplify authentication and authorization operations in API routes.

## Usage Examples

### 1. Simple Authentication

```typescript
import { authenticateRequest } from "@/lib/api-auth";

export async function GET(request: NextRequest) {
  const authResult = await authenticateRequest();
  
  if (!authResult.success) {
    return authResult.response;
  }

  const { user } = authResult;
  // user.id, user.email, user.name, user.role can be used
  
  // API logic here...
}
```

### 2. Using withAuth Wrapper

#### Simple Usage
```typescript
import { withAuth, type AuthenticatedUser } from "@/lib/api-auth";

export const GET = withAuth(async (user: AuthenticatedUser, request: NextRequest) => {
  // user is automatically authenticated
  const data = await getSomeData(user.id);
  return NextResponse.json(data);
});
```

#### Admin Permission Required
```typescript
export const POST = withAuth(async (user: AuthenticatedUser, request: NextRequest) => {
  const body = await request.json();
  const result = await createSomething(body);
  return NextResponse.json(result);
}, { requireAdmin: true });
```

#### For Specific Roles
```typescript
export const PUT = withAuth(async (user: AuthenticatedUser, request: NextRequest) => {
  // Only ADMIN and MODERATOR roles can access
  const body = await request.json();
  const result = await updateSomething(body);
  return NextResponse.json(result);
}, { allowedRoles: ["ADMIN", "MODERATOR"] });
```

### 3. Manual Role Check

```typescript
import { authenticateRequest, requireAdmin, checkUserRole } from "@/lib/api-auth";

export async function DELETE(request: NextRequest) {
  const authResult = await authenticateRequest();
  
  if (!authResult.success) {
    return authResult.response;
  }

  // Admin check
  const adminCheck = requireAdmin(authResult.user);
  if (adminCheck) return adminCheck;

  // Or specific role check
  const roleCheck = checkUserRole(authResult.user, ["ADMIN", "SUPER_ADMIN"]);
  if (roleCheck) return roleCheck;

  // API logic...
}
```

## Advantages

1. **Prevents Code Repetition**: No need to write the same auth code in all API routes
2. **Consistent Error Handling**: All auth errors return in the same format
3. **Type Safety**: Full type safety with TypeScript
4. **Flexible**: Can be used according to different auth requirements
5. **Easy to Test**: Easy to test since auth logic is centralized

## Error Formats

### 401 Unauthorized
```json
{
  "error": "Unauthorized",
  "message": "Authentication required"
}
```

### 403 Forbidden
```json
{
  "error": "Forbidden", 
  "message": "Insufficient permissions"
}
```

### 500 Internal Server Error
```json
{
  "error": "Authentication failed",
  "message": "Internal authentication error"
}
```

## Currently Updated Files

- ✅ `/app/api/ai-tools/chat/route.ts` - authenticateRequest() usage
- ✅ `/app/api/support/tickets/route.ts` - authenticateRequest() usage  
- ✅ `/app/api/support/faqs/route.ts` - authenticateRequest() usage
- ✅ `/app/api/support/knowledge-base/route.ts` - authenticateRequest() usage
- ✅ `/app/api/support/stats/route.ts` - authenticateRequest() usage
- ✅ `/app/api/support/tickets/[id]/route.ts` - authenticateRequest() usage (GET, PUT, DELETE)
- ✅ `/app/api/customers/route.ts` - withAuth() wrapper usage
- ✅ `/app/api/dashboard/stats/route.ts` - withAuth() admin requirement

## Support API Changes

All support API routes have been updated to the new authentication helper structure:

### Changes:
1. **Import changes**: `authenticateRequest` imported instead of `auth`
2. **Schema names**: Changed from PascalCase to camelCase (e.g. `FAQFiltersSchema` → `faqFiltersSchema`)
3. **Error handling**: Using `error.issues` instead of `error.errors` (Zod standard)
4. **User reference**: Using `user.id` instead of `session.user.id`
5. **Service calls**: userId parameter passed separately

### Updated Endpoints:
- **GET/POST** `/api/support/faqs` - FAQ listing and creation
- **GET/POST** `/api/support/knowledge-base` - KB article listing and creation  
- **GET** `/api/support/stats` - Support statistics
- **GET/PUT/DELETE** `/api/support/tickets/[id]` - Individual ticket operations

## To Do

Other API routes should also be updated to use this helper:

- [ ] All other API routes...
