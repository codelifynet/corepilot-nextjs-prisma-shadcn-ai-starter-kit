# Features API Documentation

This documentation provides detailed explanations of all API endpoints for the Roles and Users features.

## Table of Contents

1. [General API Structure](#general-api-structure)
2. [Authentication & Authorization](#authentication--authorization)
3. [Roles API](#roles-api)
4. [Users API](#users-api)
5. [Cross-Feature Endpoints](#cross-feature-endpoints)
6. [Error Handling](#error-handling)
7. [Rate Limiting](#rate-limiting)
8. [API Examples](#api-examples)

## General API Structure

### Base URL
```
Production: https://api.corepilot.com
Development: http://localhost:3000/api
```

### Standard Response Format

#### Success Response
```typescript
interface ApiSuccessResponse<T> {
  success: true;
  data: T;
  meta?: {
    total?: number;
    page?: number;
    limit?: number;
    totalPages?: number;
  };
  message?: string;
}
```

#### Error Response
```typescript
interface ApiErrorResponse {
  success: false;
  error: {
    code: string;
    message: string;
    details?: any;
  };
  statusCode: number;
}
```

### Common Headers
```http
Content-Type: application/json
Authorization: Bearer <jwt_token>
X-API-Version: v1
```

## Authentication & Authorization

### Authentication Types

#### JWT Token Authentication
```http
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

#### API Key Authentication (for server-to-server)
```http
X-API-Key: your-api-key-here
```

### Permission Levels

| Level | Description |
|-------|-------------|
| `public` | Everyone can access |
| `authenticated` | Logged-in users |
| `admin` | Admin role required |
| `system` | System administrator permission |

## Roles API

### Base Endpoint: `/api/roles`

#### GET /api/roles
Lists and filters roles.

**Permission Required:** `role.view`

**Query Parameters:**
```typescript
{
  search?: string;           // Search in role name or description
  type?: 'admin' | 'user' | 'moderator' | 'viewer';
  status?: 'active' | 'inactive' | 'pending';
  hasPermission?: string;    // Roles with specific permission
  isSystem?: boolean;        // System roles filter
  page?: number;            // Page number (default: 1)
  limit?: number;           // Records per page (default: 10)
  sort?: 'name' | 'type' | 'createdAt' | 'updatedAt';
  order?: 'asc' | 'desc';   // default: 'desc'
}
```

**Example Request:**
```http
GET /api/roles?search=admin&status=active&page=1&limit=20
```

**Response:**
```typescript
{
  success: true,
  data: [
    {
      id: "role_123",
      name: "Admin",
      description: "Full system access",
      type: "admin",
      status: "active",
      permissions: [
        "user.view", "user.create", "user.edit", "user.delete",
        "role.view", "role.create", "role.edit", "role.delete"
      ],
      userCount: 5,
      isSystem: true,
      createdAt: "2024-01-01T00:00:00Z",
      updatedAt: "2024-01-01T00:00:00Z"
    }
  ],
  meta: {
    total: 1,
    page: 1,
    limit: 20,
    totalPages: 1
  }
}
```

#### POST /api/roles
Creates a new role.

**Permission Required:** `role.create`

**Request Body:**
```typescript
{
  name: string;              // Role name (unique)
  description: string;       // Role description
  type: 'admin' | 'user' | 'moderator' | 'viewer';
  permissions: string[];     // Permission list
  status?: 'active' | 'inactive' | 'pending'; // default: 'active'
}
```

**Example Request:**
```http
POST /api/roles
Content-Type: application/json

{
  "name": "Content Manager",
  "description": "Manage content and moderate users",
  "type": "moderator",
  "permissions": [
    "content.view",
    "content.create",
    "content.edit",
    "user.view"
  ],
  "status": "active"
}
```

**Response:**
```typescript
{
  success: true,
  data: {
    id: "role_456",
    name: "Content Manager",
    description: "Manage content and moderate users",
    type: "moderator",
    status: "active",
    permissions: ["content.view", "content.create", "content.edit", "user.view"],
    userCount: 0,
    isSystem: false,
    createdAt: "2024-01-01T00:00:00Z",
    updatedAt: "2024-01-01T00:00:00Z"
  },
  message: "Role created successfully"
}
```

#### GET /api/roles/{id}
Gets a specific role.

**Permission Required:** `role.view`

**Response:**
```typescript
{
  success: true,
  data: {
    id: "role_123",
    name: "Admin",
    description: "Full system access",
    type: "admin",
    status: "active",
    permissions: ["user.view", "user.create", "user.edit", "user.delete"],
    userCount: 5,
    isSystem: true,
    createdAt: "2024-01-01T00:00:00Z",
    updatedAt: "2024-01-01T00:00:00Z",
    users: [
      {
        id: "user_123",
        name: "John Doe",
        email: "john@example.com"
      }
    ]
  }
}
```

#### PUT /api/roles/{id}
Updates a role.

**Permission Required:** `role.edit` (for system roles: `system.admin`)

**Request Body:**
```typescript
{
  name?: string;
  description?: string;
  type?: 'admin' | 'user' | 'moderator' | 'viewer';
  permissions?: string[];
  status?: 'active' | 'inactive' | 'pending';
}
```

**Response:**
```typescript
{
  success: true,
  data: {
    // Updated role object
  },
  message: "Role updated successfully"
}
```

#### DELETE /api/roles/{id}
Deletes a role.

**Permission Required:** `role.delete` (for system roles: `system.admin`)

**Response:**
```typescript
{
  success: true,
  message: "Role deleted successfully"
}
```

#### GET /api/roles/stats
Gets role statistics.

**Permission Required:** `role.view`

**Response:**
```typescript
{
  success: true,
  data: {
    totalRoles: 10,
    activeRoles: 8,
    adminRoles: 1,
    userRoles: 6,
    roleDistribution: [
      { name: "Admin", value: 1 },
      { name: "User", value: 6 },
      { name: "Moderator", value: 2 },
      { name: "Viewer", value: 1 }
    ],
    permissionUsage: [
      { name: "user.view", count: 8 },
      { name: "content.view", count: 5 }
    ]
  }
}
```

#### POST /api/roles/bulk
Bulk role operations.

**Permission Required:** `role.edit`

**Request Body:**
```typescript
{
  action: 'delete' | 'updateStatus' | 'assignPermissions';
  roleIds: string[];
  data?: {
    status?: 'active' | 'inactive' | 'pending';
    permissions?: string[];
  };
}
```

**Example - Bulk Delete:**
```http
POST /api/roles/bulk
Content-Type: application/json

{
  "action": "delete",
  "roleIds": ["role_123", "role_456"]
}
```

**Example - Bulk Status Update:**
```http
POST /api/roles/bulk
Content-Type: application/json

{
  "action": "updateStatus",
  "roleIds": ["role_123", "role_456"],
  "data": {
    "status": "inactive"
  }
}
```

## Users API

### Base Endpoint: `/api/users`

#### GET /api/users
Lists and filters users.

**Permission Required:** `user.view`

**Query Parameters:**
```typescript
{
  search?: string;           // Search in name or email
  role?: 'ADMIN' | 'USER' | 'MODERATOR' | 'VIEWER';
  banned?: boolean;          // Ban status
  emailVerified?: boolean;   // Email verification status
  hasRole?: string;         // Users with specific role
  dateRange?: {             // Registration date range
    start: string;          // ISO date string
    end: string;            // ISO date string
  };
  page?: number;            // default: 1
  limit?: number;           // default: 10
  sort?: 'name' | 'email' | 'createdAt' | 'lastLogin';
  order?: 'asc' | 'desc';   // default: 'desc'
  include?: string;         // 'roles,permissions,sessions'
}
```

**Example Request:**
```http
GET /api/users?search=john&role=USER&banned=false&include=roles,permissions&page=1&limit=20
```

**Response:**
```typescript
{
  success: true,
  data: [
    {
      id: "user_123",
      name: "John Doe",
      email: "john@example.com",
      emailVerified: true,
      image: "https://example.com/avatar.jpg",
      role: "USER",
      banned: false,
      banReason: null,
      banExpires: null,
      lastLoginAt: "2024-01-01T12:00:00Z",
      createdAt: "2024-01-01T00:00:00Z",
      updatedAt: "2024-01-01T12:00:00Z",
      roles: [
        {
          id: "role_456",
          name: "Content Creator",
          permissions: ["content.create", "content.edit"]
        }
      ],
      permissions: ["content.create", "content.edit", "user.view"],
      sessionCount: 2
    }
  ],
  meta: {
    total: 1,
    page: 1,
    limit: 20,
    totalPages: 1
  }
}
```

#### POST /api/users
Creates a new user.

**Permission Required:** `user.create`

**Request Body:**
```typescript
{
  name: string;              // User name
  email: string;             // Email (unique)
  role?: 'ADMIN' | 'USER' | 'MODERATOR' | 'VIEWER'; // default: 'USER'
  emailVerified?: boolean;   // default: false
  image?: string;            // Avatar URL
  roleIds?: string[];        // Role IDs to assign
  sendWelcomeEmail?: boolean; // default: true
}
```

**Example Request:**
```http
POST /api/users
Content-Type: application/json

{
  "name": "Jane Smith",
  "email": "jane@example.com",
  "role": "USER",
  "emailVerified": false,
  "roleIds": ["role_456"],
  "sendWelcomeEmail": true
}
```

#### GET /api/users/{id}
Gets a specific user.

**Permission Required:** `user.view` (authentication sufficient for own profile)

**Query Parameters:**
```typescript
{
  include?: string; // 'roles,permissions,sessions,activity'
}
```

**Response:**
```typescript
{
  success: true,
  data: {
    id: "user_123",
    name: "John Doe",
    email: "john@example.com",
    emailVerified: true,
    image: "https://example.com/avatar.jpg",
    role: "USER",
    banned: false,
    banReason: null,
    banExpires: null,
    lastLoginAt: "2024-01-01T12:00:00Z",
    createdAt: "2024-01-01T00:00:00Z",
    updatedAt: "2024-01-01T12:00:00Z",
    roles: [...],
    permissions: [...],
    sessions: [...],
    activityStats: {
      totalLogins: 45,
      lastWeekLogins: 7,
      averageSessionDuration: 1800
    }
  }
}
```

#### PUT /api/users/{id}
Updates a user.

**Permission Required:** `user.edit` (authentication sufficient for own profile)

**Request Body:**
```typescript
{
  name?: string;
  email?: string;
  role?: 'ADMIN' | 'USER' | 'MODERATOR' | 'VIEWER';
  emailVerified?: boolean;
  image?: string;
  roleIds?: string[];        // Update roles
}
```

#### DELETE /api/users/{id}
Deletes a user.

**Permission Required:** `user.delete`

**Query Parameters:**
```typescript
{
  deleteData?: boolean;     // true: delete all data, false: just deactivate
  transferOwnership?: string; // User ID to transfer data to
}
```

#### POST /api/users/{id}/ban
Bans a user.

**Permission Required:** `user.ban`

**Request Body:**
```typescript
{
  reason: string;            // Ban reason
  expiresAt?: string;        // ISO date string, null for permanent
  notifyUser?: boolean;      // Send notification to user
  revokeTokens?: boolean;    // Revoke all tokens
}
```

**Response:**
```typescript
{
  success: true,
  message: "User banned successfully",
  data: {
    banId: "ban_123",
    expiresAt: "2024-01-08T00:00:00Z"
  }
}
```

#### DELETE /api/users/{id}/ban
Removes user ban.

**Permission Required:** `user.ban`

**Request Body:**
```typescript
{
  reason?: string;           // Unban reason
  notifyUser?: boolean;      // Send notification to user
}
```

#### GET /api/users/stats
Gets user statistics.

**Permission Required:** `analytics.view`

**Query Parameters:**
```typescript
{
  period?: 'day' | 'week' | 'month' | 'year'; // default: 'month'
  groupBy?: 'day' | 'week' | 'month';         // default: 'day'
}
```

**Response:**
```typescript
{
  success: true,
  data: {
    totalUsers: 1000,
    activeUsers: 850,
    bannedUsers: 5,
    unverifiedUsers: 145,
    newUsersThisMonth: 120,
    userGrowthRate: 15.5,
    roleDistribution: {
      ADMIN: 5,
      USER: 900,
      MODERATOR: 80,
      VIEWER: 15
    },
    activityStats: {
      dailyActiveUsers: 450,
      weeklyActiveUsers: 650,
      monthlyActiveUsers: 850
    },
    registrationTrend: [
      { date: "2024-01-01", count: 25 },
      { date: "2024-01-02", count: 30 }
    ]
  }
}
```

#### GET /api/users/{id}/activity
Gets user activity history.

**Permission Required:** `user.view` or own profile

**Query Parameters:**
```typescript
{
  type?: 'login' | 'action' | 'all';  // default: 'all'
  limit?: number;                     // default: 50
  page?: number;                      // default: 1
  dateRange?: {
    start: string;                    // ISO date string
    end: string;                      // ISO date string
  };
}
```

**Response:**
```typescript
{
  success: true,
  data: {
    sessions: [
      {
        id: "session_123",
        deviceInfo: "Chrome on Windows",
        ipAddress: "192.168.1.1",
        userAgent: "Mozilla/5.0...",
        createdAt: "2024-01-01T10:00:00Z",
        expiresAt: "2024-01-01T22:00:00Z",
        isActive: true
      }
    ],
    activities: [
      {
        id: "activity_123",
        action: "user.login",
        resourceType: "Authentication",
        ipAddress: "192.168.1.1",
        userAgent: "Mozilla/5.0...",
        createdAt: "2024-01-01T10:00:00Z"
      }
    ],
    meta: {
      totalSessions: 45,
      totalActivities: 234,
      page: 1,
      limit: 50
    }
  }
}
```

#### POST /api/users/bulk
Bulk user operations.

**Permission Required:** `user.edit`

**Request Body:**
```typescript
{
  action: 'delete' | 'ban' | 'unban' | 'updateRole' | 'verifyEmail';
  userIds: string[];
  data?: {
    role?: 'ADMIN' | 'USER' | 'MODERATOR' | 'VIEWER';
    banReason?: string;
    banExpiresAt?: string;
    roleIds?: string[];
  };
}
```

## Cross-Feature Endpoints

### User-Role Assignment

#### PUT /api/users/{userId}/roles
Updates user roles.

**Permission Required:** `user.edit` + `role.assign`

**Request Body:**
```typescript
{
  roleIds: string[];         // Role IDs to assign
  replace?: boolean;         // true: replace existing roles, false: add
}
```

#### POST /api/users/{userId}/roles/{roleId}
Assigns role to user.

**Permission Required:** `user.edit` + `role.assign`

#### DELETE /api/users/{userId}/roles/{roleId}
Removes role from user.

**Permission Required:** `user.edit` + `role.assign`

### Role-User Management

#### GET /api/roles/{roleId}/users
Lists users assigned to the role.

**Permission Required:** `role.view` + `user.view`

**Response:**
```typescript
{
  success: true,
  data: [
    {
      id: "user_123",
      name: "John Doe",
      email: "john@example.com",
      assignedAt: "2024-01-01T00:00:00Z",
      assignedBy: "user_admin"
    }
  ],
  meta: {
    total: 5,
    roleId: "role_123",
    roleName: "Content Manager"
  }
}
```

### Combined Analytics

#### GET /api/analytics/users-roles
User-role analytics.

**Permission Required:** `analytics.view`

**Response:**
```typescript
{
  success: true,
  data: {
    roleAssignmentTrend: [
      { date: "2024-01-01", roleId: "role_123", count: 5 }
    ],
    permissionUsage: [
      { permission: "user.view", userCount: 100 }
    ],
    userRoleMatrix: {
      "role_123": {
        name: "Admin",
        userCount: 5,
        permissions: ["user.view", "user.create"]
      }
    }
  }
}
```

## Error Handling

### Standard Error Codes

| Code | Description | HTTP Status |
|------|-------------|-------------|
| `AUTH_REQUIRED` | Authentication required | 401 |
| `AUTH_INVALID` | Invalid token/credentials | 401 |
| `PERMISSION_DENIED` | Insufficient permissions | 403 |
| `RESOURCE_NOT_FOUND` | Resource not found | 404 |
| `VALIDATION_ERROR` | Input validation failed | 400 |
| `DUPLICATE_RESOURCE` | Resource already exists | 409 |
| `RATE_LIMIT_EXCEEDED` | Too many requests | 429 |
| `INTERNAL_ERROR` | Server error | 500 |

### Error Response Examples

#### Validation Error
```typescript
{
  success: false,
  error: {
    code: "VALIDATION_ERROR",
    message: "Input validation failed",
    details: {
      field: "email",
      value: "invalid-email",
      constraint: "email format required"
    }
  },
  statusCode: 400
}
```

#### Permission Denied
```typescript
{
  success: false,
  error: {
    code: "PERMISSION_DENIED",
    message: "You do not have permission for this operation",
    details: {
      required: ["user.edit"],
      current: ["user.view"]
    }
  },
  statusCode: 403
}
```

## Rate Limiting

### Standard Limits

| Endpoint Type | Limit | Window |
|---------------|-------|--------|
| Authentication | 5 requests | 1 minute |
| Standard CRUD | 100 requests | 1 minute |
| Bulk Operations | 10 requests | 1 minute |
| Analytics | 50 requests | 1 minute |

### Rate Limit Headers

```http
X-RateLimit-Limit: 100
X-RateLimit-Remaining: 95
X-RateLimit-Reset: 1640995200
```

## API Examples

### Complete User Management Flow

```javascript
// 1. Get all roles
const rolesResponse = await fetch('/api/roles?status=active');
const { data: roles } = await rolesResponse.json();

// 2. Create new user
const newUser = await fetch('/api/users', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    name: 'John Doe',
    email: 'john@example.com',
    roleIds: [roles[0].id] // Assign first role
  })
});

// 3. Update user roles
const updateRoles = await fetch(`/api/users/${userId}/roles`, {
  method: 'PUT',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    roleIds: ['role_123', 'role_456'],
    replace: true
  })
});

// 4. Get user with full role data
const userWithRoles = await fetch(`/api/users/${userId}?include=roles,permissions`);
const { data: fullUser } = await userWithRoles.json();
```

### Bulk Operations Example

```javascript
// Bulk ban users
const bulkBan = await fetch('/api/users/bulk', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    action: 'ban',
    userIds: ['user_123', 'user_456'],
    data: {
      banReason: 'Spam violation',
      banExpiresAt: '2024-01-08T00:00:00Z'
    }
  })
});

// Bulk role update
const bulkRoleUpdate = await fetch('/api/users/bulk', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    action: 'updateRole',
    userIds: ['user_123', 'user_456'],
    data: {
      role: 'MODERATOR'
    }
  })
});
```

This API documentation shows detailed usage of all endpoints and enables developers to effectively integrate the API.
