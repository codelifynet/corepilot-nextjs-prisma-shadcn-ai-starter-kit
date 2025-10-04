# Roles Feature Documentation

## Feature Definition

### Purpose
The Roles feature provides comprehensive Role-Based Access Control (RBAC) functionality for the CorePilot application. This feature enables administrators to create, manage, and assign roles with specific permissions to control user access to different parts of the application.

### Business Problem / User Need
**Problems Solved:**
- Manual user access control management
- Security vulnerabilities
- Complex permission management
- Non-scalable authorization system

**User Needs:**
- Different access levels for different user groups
- Secure and controlled system access
- Easy role and permission management
- Audit and monitoring capabilities

**Value Provided:**
- Centralized role management
- Secure access control
- Scalable authorization system
- Easy user management

## User Stories / Acceptance Criteria

### User Stories

**US-1: Role Creation**
```
As a system administrator
I want to create new roles with specific permissions
So that I can control user access to different system features
```

**US-2: Role Editing**
```
As a system administrator
I want to edit existing roles and their permissions
So that I can adapt access control to changing business needs
```

**US-3: Role Viewing**
```
As a system administrator
I want to view role details and assigned permissions
So that I can understand current access control configuration
```

**US-4: Role Management**
```
As a system administrator
I want to activate/deactivate roles and manage user assignments
So that I can maintain proper access control
```

### Acceptance Criteria

**AC-1: Role Creation**
- ✅ Admin can create roles with name and description
- ✅ Role names must be unique and follow validation rules
- ✅ Roles can be marked as active/inactive
- ✅ System roles are protected from deletion
- ✅ Form validation provides real-time feedback

**AC-2: Permission Management**
- ✅ Admin can assign field-level permissions to roles
- ✅ Permissions support CRUD operations (Create, Read, Update, Delete)
- ✅ Field masking options (none, partial, hidden, encrypted, redacted)
- ✅ Resource-specific permissions can be configured

**AC-3: Role Listing and Search**
- ✅ Paginated role listing with sorting and filtering
- ✅ Search by role name and description
- ✅ Filter by active/inactive and system/custom roles
- ✅ Role statistics and user count display

## UI/UX Details

### Key UI Components
- **AdvancedDataTable**: Sortable, filterable, paginated role listing
- **PageHeader**: Consistent page headers with breadcrumbs
- **RoleForm**: Comprehensive form with validation
- **StatsCard**: Role statistics display
- **Badge**: Status indicators for active/inactive roles

### User Experience
- **Navigation**: Breadcrumb navigation for context
- **Feedback**: Toast notifications for actions
- **Loading States**: Skeleton loaders during data fetching
- **Error Handling**: User-friendly error messages
- **Responsive**: Mobile-optimized interface

## API/Backend Details

### Database Schema
```prisma
model Role {
  id          String   @id @default(cuid())
  name        String   @unique
  description String?
  isActive    Boolean  @default(true)
  isSystem    Boolean  @default(false)
  createdAt   DateTime @default(now())
  updatedAt   DateTime @updatedAt
  
  // Relations
  permissions         Permission[]
  userRoles          UserRole[]
  resourcePermissions ResourcePermission[]
}
```

### API Endpoints
- `GET /api/roles` - List roles with filtering
- `POST /api/roles` - Create new role
- `GET /api/roles/[id]` - Get role details
- `PUT /api/roles/[id]` - Update role
- `DELETE /api/roles/[id]` - Delete role
- `GET /api/roles/stats` - Get role statistics

### Services Layer

#### Get Service (`get.service.ts`)
- `getRoles(filters?)` - Fetch roles with optional filtering
- `getRoleById(id)` - Get single role with relations
- `getRoleByName(name)` - Find role by name
- `roleExists(name, excludeId?)` - Check role existence
- `getActiveRoles()` - Get only active roles
- `getSystemRoles()` - Get system roles
- `getRoleStats()` - Get role statistics
- `validateRolePermissions(roleId, permissions)` - Validate permissions
- `checkRoleAccess(roleId, resource, action)` - Check access rights

#### Create Service (`create.service.ts`)
- `createRole(data)` - Create new role with validation
- `createRoleWithPermissions(roleData, permissions)` - Create role with permissions

#### Update Service (`update.service.ts`)
- `updateRole(id, data)` - Update role information
- `updateRolePermissions(roleId, permissions)` - Update role permissions
- `toggleRoleStatus(id)` - Activate/deactivate role

#### Delete Service (`delete.service.ts`)
- `deleteRole(id)` - Delete role (with protection for system roles)
- `bulkDeleteRoles(ids)` - Delete multiple roles

## Front-end Details

### Constants (`constants/roles.constants.ts`)

#### Configuration Constants
```typescript
// Role configuration limits and validation rules
export const ROLE_CONFIG = {
  NAME_MIN_LENGTH: 2,
  NAME_MAX_LENGTH: 50,
  DESCRIPTION_MAX_LENGTH: 500,
  MAX_ROLES_PER_USER: 10,
  SYSTEM_ROLES: {
    SUPER_ADMIN: 'super_admin',
    ADMIN: 'admin',
    USER: 'user',
    GUEST: 'guest'
  }
} as const;
```

#### API Endpoints
```typescript
export const API_ENDPOINTS = {
  ROLES: '/api/roles',
  PERMISSIONS: '/api/permissions',
  USER_ROLES: '/api/user-roles',
  RESOURCE_PERMISSIONS: '/api/resource-permissions',
  AUDIT_LOGS: '/api/audit-logs'
} as const;
```

#### Routes and Navigation
```typescript
export const ROUTES = {
  ROLES: '/admin/user-management/roles',
  ROLE_CREATE: '/admin/user-management/roles/create',
  ROLE_DETAIL: (id: string) => `/admin/user-management/roles/${id}`,
  ROLE_EDIT: (id: string) => `/admin/user-management/roles/${id}/edit`
} as const;
```

### Types (`types/`)

#### Core Role Types (`role.types.ts`)
```typescript
export interface Role {
  id: string;
  name: string;
  description?: string | null;
  isActive: boolean;
  isSystem: boolean;
  createdAt: Date;
  updatedAt: Date;
  userCount?: number;
  permissions?: string[];
}

export interface CreateRoleInput {
  name: string;
  description?: string;
  isActive?: boolean;
  isSystem?: boolean;
}

export interface UpdateRoleInput {
  name?: string;
  description?: string;
  isActive?: boolean;
  isSystem?: boolean;
}

export interface RoleFilters {
  search?: string;
  isActive?: boolean;
  isSystem?: boolean;
  createdAfter?: Date;
  sortBy?: keyof Role;
  sortOrder?: "asc" | "desc";
  createdBefore?: Date;
}
```

#### Permission Types (`permission.types.ts`)
```typescript
export interface Permission {
  id: string;
  entity: string; // e.g., "user", "product", "order"
  field: string; // e.g., "email", "name", "*" for all fields
  action: string; // e.g., "create", "read", "update", "delete"
  maskType?: string | null; // "none", "partial", "hidden", "encrypted", "redacted"
  createdAt: Date;
  updatedAt: Date;
  roleId: string;
}

export enum PermissionAction {
  CREATE = 'create',
  READ = 'read',
  UPDATE = 'update',
  DELETE = 'delete',
  ADMIN = 'admin'
}

export enum MaskType {
  NONE = 'none',
  PARTIAL = 'partial',
  HIDDEN = 'hidden',
  ENCRYPTED = 'encrypted',
  REDACTED = 'redacted'
}
```

### Schemas (`schemas/role.schemas.ts`)

#### Validation Schemas
```typescript
import { z } from 'zod';

// Base role schema for validation
export const roleSchema = z.object({
  name: z
    .string()
    .min(1, 'Role name is required')
    .min(2, 'Role name must be at least 2 characters')
    .max(50, 'Role name must not exceed 50 characters')
    .regex(/^[a-zA-Z0-9\s\-_]+$/, 'Role name can only contain letters, numbers, spaces, hyphens, and underscores'),
  
  description: z
    .string()
    .max(500, 'Description must not exceed 500 characters')
    .optional()
    .or(z.literal('')),
  
  isActive: z.boolean().default(true),
  isSystem: z.boolean().default(false),
});

// Create and update schemas
export const createRoleSchema = roleSchema;
export const updateRoleSchema = roleSchema.partial();

// Type inference
export type RoleFormData = z.infer<typeof roleSchema>;
export type CreateRoleFormData = z.infer<typeof createRoleSchema>;
export type UpdateRoleFormData = z.infer<typeof updateRoleSchema>;
```

### Components

#### Core Components (`components/core/`)

**RoleForm (`role-form.tsx`)**
- **Purpose**: Reusable form component for role creation and editing
- **Technology**: React Hook Form + Zod validation
- **Features**:
  - Real-time form validation
  - Support for create/edit modes
  - Loading states and error handling
  - Accessible form controls
- **Props**:
  ```typescript
  interface RoleFormProps {
    role?: Role;
    onSubmit: (data: CreateRoleInput | UpdateRoleInput) => Promise<void> | void;
    onCancel?: () => void;
    isLoading?: boolean;
  }
  ```

**RoleTable (`role-table.tsx`)**
- **Purpose**: Advanced data table for role listing
- **Features**: Sorting, filtering, pagination, row actions
- **Integration**: Uses AdvancedDataTable component

#### Filter Components (`components/filters/`)

**RoleFilters (`role-filters.tsx`)**
- **Purpose**: Advanced filtering interface for roles
- **Features**: Search, status filters, date range filters
- **State Management**: Local state with debounced search

#### Permission Components (`components/permissions/`)

**PermissionTable (`permission-table.tsx`)**
- **Purpose**: Display and manage field-level permissions
- **Features**: CRUD operations, mask type selection

**ResourcePermissionTable (`resource-permission-table.tsx`)**
- **Purpose**: Manage resource-specific permissions
- **Features**: Resource type filtering, action management

**UserRoleTable (`user-role-table.tsx`)**
- **Purpose**: Display users assigned to roles
- **Features**: User search, role assignment/removal

### Views (Page Components)

#### Main Views (`views/`)

**RolesView (`roles-view.tsx`)**
- **Purpose**: Main roles listing page
- **Features**:
  - Role statistics cards
  - Advanced data table with actions
  - Create, edit, delete, view operations
  - Search and filtering
- **Components Used**: `AdvancedDataTable`, `StatsCard`, `PageHeader`
- **Navigation**: Handles routing to detail, edit, and create pages

**RoleDetailView (`role-detail-view.tsx`)**
- **Purpose**: Detailed view of a single role
- **Features**:
  - Role information display
  - Permission assignments
  - User assignments
  - Edit and delete actions
- **Props**: `{ roleId: string; className?: string }`
- **State Management**: Local state for role data and loading

**RoleCreateView (`role-create-view.tsx`)**
- **Purpose**: Create new role page
- **Features**:
  - Role creation form
  - Validation and error handling
  - Success navigation
- **Components Used**: `RoleForm`, `PageHeader`

**RoleEditView (`role-edit-view.tsx`)**
- **Purpose**: Edit existing role page
- **Features**:
  - Pre-populated form with existing data
  - Update validation
  - Success/error handling
- **Props**: `{ roleId: string; className?: string }`

#### Specialized Views

**PermissionsView (`permissions-view.tsx`)**
- **Purpose**: Manage field-level permissions
- **Features**: Permission CRUD operations, bulk actions

**ResourcePermissionsView (`resource-permissions-view.tsx`)**
- **Purpose**: Manage resource-specific permissions
- **Features**: Resource type management, action configuration

**UserRolesView (`user-roles-view.tsx`)**
- **Purpose**: Manage user role assignments
- **Features**: User search, role assignment, bulk operations

**RoleAuditLogsView (`role-audit-logs-view.tsx`)**
- **Purpose**: View role-related audit logs
- **Features**: Log filtering, export functionality

### Hook Documentation

#### Custom Hooks (Future Implementation)

**useRolesApi**
- **Purpose**: Centralized API operations for roles
- **Features**: CRUD operations, caching, error handling
- **Returns**: Query functions, mutation functions, loading states

**useRoleFilters**
- **Purpose**: Manage role filtering state
- **Features**: Filter state management, URL synchronization
- **Returns**: Filter values, setter functions, reset function

**useRoleForm**
- **Purpose**: Enhanced form state management
- **Features**: Validation, submission handling, reset functionality
- **Returns**: Form methods, validation state, submission handlers

## Dependencies

### Feature-Specific Dependencies
- **Zod**: Schema validation for role forms
- **React Hook Form**: Form management for role creation/editing
- **@hookform/resolvers**: Form validation integration

## Known Issues

### Current Limitations
1. **Mock Data**: Currently using mock data instead of real API calls
2. **Permission UI**: Permission assignment interface needs enhancement
3. **Bulk Operations**: Bulk role operations not fully implemented
4. **Real-time Updates**: No WebSocket integration for live updates

### Performance Considerations
1. **Large Role Lists**: Pagination helps but could benefit from virtualization
2. **Permission Queries**: Complex permission queries may need optimization
3. **Caching**: No Redis caching implemented yet

### Security Notes
1. **System Role Protection**: System roles are protected from deletion
2. **Permission Validation**: Server-side validation required for all operations
3. **Audit Logging**: All role changes should be logged for compliance

## Change Log

### [1.0.0] - 2024-01-15
#### Added
- Initial roles feature implementation
- CRUD operations for roles
- Field-level permission system
- Resource-specific permissions
- Role-based access control
- Modern UI with ShadcnUI components
- Comprehensive validation with Zod
- Responsive design with dark mode support
- Advanced data table with sorting and filtering
- Role statistics and analytics
- Audit logging system
- User role assignment management

#### Technical Implementation
- Role and permission database models
- API endpoints for CRUD operations
- TypeScript interfaces for type safety
- Form validation with Zod schemas
- Service layer for business logic
- Reusable UI components
- Feature-specific constants and configuration

---