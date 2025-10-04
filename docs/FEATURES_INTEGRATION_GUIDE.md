# Features Integration Guide

This documentation explains how to use and integrate the Roles and Users features together.

## Table of Contents

1. [General Integration Approach](#general-integration-approach)
2. [Role-Based Access Control (RBAC) Implementation](#role-based-access-control-rbac-implementation)
3. [Cross-Feature Data Flow](#cross-feature-data-flow)
4. [Shared Components and Hooks](#shared-components-and-hooks)
5. [API Integration](#api-integration)
6. [State Management Integration](#state-management-integration)
7. [Practical Examples](#practical-examples)

## General Integration Approach

The Roles and Users features are two tightly coupled modules. The Users feature uses the role and permission system provided by the Roles feature.

### Dependency Management

```typescript
// users feature depends on roles feature
import { RoleData, useRolesApi } from '@/features/roles';
import { User, useUsers } from '@/features/users';

// Roles feature can work independently
// Users feature cannot work without roles
```

### Data Flow

```
Roles Feature (Independent)
    ↓
    ↓ (Role definitions, permissions)
    ↓
Users Feature (Dependent)
    ↓
    ↓ (User assignments, access control)
    ↓
Application Components
```

## Role-Based Access Control (RBAC) Implementation

### 1. Permission Hierarchy

```typescript
// src/lib/auth-permissions.ts
export const PERMISSION_HIERARCHY = {
  system: ['system.admin', 'system.config'],
  user: ['user.view', 'user.create', 'user.edit', 'user.delete'],
  role: ['role.view', 'role.create', 'role.edit', 'role.delete'],
  content: ['content.view', 'content.create', 'content.edit', 'content.delete'],
  analytics: ['analytics.view', 'analytics.export'],
  billing: ['billing.view', 'billing.manage'],
} as const;

export type PermissionCategory = keyof typeof PERMISSION_HIERARCHY;
export type Permission = typeof PERMISSION_HIERARCHY[PermissionCategory][number];
```

### 2. Combined Permission Hook

```typescript
// src/hooks/use-auth-permissions.ts
import { useAuth } from '@/hooks/use-auth';
import { useRolesApi } from '@/features/roles';
import { useMemo } from 'react';

export const useAuthPermissions = () => {
  const { user } = useAuth();
  const { getRolePermissions } = useRolesApi();

  const permissions = useMemo(() => {
    if (!user) return [];
    
    // Collect all permissions from user's roles
    return user.roles.flatMap(role => role.permissions);
  }, [user]);

  const hasPermission = (permission: Permission): boolean => {
    if (!user) return false;
    
    // Super admin can do everything
    if (user.role === 'ADMIN' && permissions.includes('system.admin')) {
      return true;
    }
    
    return permissions.includes(permission);
  };

  const hasAnyPermission = (permissions: Permission[]): boolean => {
    return permissions.some(permission => hasPermission(permission));
  };

  const hasAllPermissions = (permissions: Permission[]): boolean => {
    return permissions.every(permission => hasPermission(permission));
  };

  const getPermissionsByCategory = (category: PermissionCategory) => {
    return permissions.filter(permission => 
      permission.startsWith(`${category}.`)
    );
  };

  return {
    permissions,
    hasPermission,
    hasAnyPermission,
    hasAllPermissions,
    getPermissionsByCategory,
  };
};
```

### 3. Protected Route Component

```typescript
// src/components/auth/protected-route.tsx
import { useAuthPermissions } from '@/hooks/use-auth-permissions';
import { Permission } from '@/lib/auth-permissions';

interface ProtectedRouteProps {
  children: React.ReactNode;
  requiredPermissions?: Permission[];
  requireAll?: boolean; // true: all permissions, false: any permission
  fallback?: React.ReactNode;
}

export const ProtectedRoute = ({
  children,
  requiredPermissions = [],
  requireAll = false,
  fallback = <div>You do not have access to this page.</div>,
}: ProtectedRouteProps) => {
  const { hasPermission, hasAnyPermission, hasAllPermissions } = useAuthPermissions();

  if (requiredPermissions.length === 0) {
    return <>{children}</>;
  }

  const hasAccess = requireAll 
    ? hasAllPermissions(requiredPermissions)
    : hasAnyPermission(requiredPermissions);

  return hasAccess ? <>{children}</> : <>{fallback}</>;
};
```

## Cross-Feature Data Flow

### 1. User-Role Assignment Component

```typescript
// src/components/user-role-assignment.tsx
import { useUsers } from '@/features/users';
import { useRolesApi } from '@/features/roles';
import { useAuthPermissions } from '@/hooks/use-auth-permissions';

interface UserRoleAssignmentProps {
  userId: string;
  onAssignmentChange?: () => void;
}

export const UserRoleAssignment = ({ 
  userId, 
  onAssignmentChange 
}: UserRoleAssignmentProps) => {
  const { getUser, updateUser } = useUsers();
  const { roles, getRoles } = useRolesApi();
  const { hasPermission } = useAuthPermissions();
  
  const [user, setUser] = useState<User | null>(null);
  const [selectedRoles, setSelectedRoles] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      const [userData, rolesData] = await Promise.all([
        getUser(userId),
        getRoles({ status: 'active' })
      ]);
      
      setUser(userData);
      setSelectedRoles(userData?.roles.map(r => r.id) || []);
    };

    fetchData();
  }, [userId, getUser, getRoles]);

  const handleRoleAssignment = async () => {
    if (!user) return;

    setLoading(true);
    try {
      await updateUser(userId, {
        roleIds: selectedRoles,
      });
      
      toast.success('Roles updated successfully');
      onAssignmentChange?.();
    } catch (error) {
      toast.error('Role assignment failed');
    } finally {
      setLoading(false);
    }
  };

  const availableRoles = roles.filter(role => 
    !role.isSystem || hasPermission('system.admin')
  );

  return (
    <Card className="p-6">
      <CardHeader>
        <CardTitle>Role Assignment</CardTitle>
        <CardDescription>
          Assign roles to {user?.name}
        </CardDescription>
      </CardHeader>
      
      <CardContent>
        <div className="space-y-4">
          {availableRoles.map((role) => (
            <div key={role.id} className="flex items-center space-x-2">
              <Checkbox
                id={role.id}
                checked={selectedRoles.includes(role.id)}
                onCheckedChange={(checked) => {
                  if (checked) {
                    setSelectedRoles([...selectedRoles, role.id]);
                  } else {
                    setSelectedRoles(selectedRoles.filter(id => id !== role.id));
                  }
                }}
              />
              <Label htmlFor={role.id} className="flex-1">
                <div>
                  <div className="font-medium">{role.name}</div>
                  <div className="text-sm text-muted-foreground">
                    {role.description}
                  </div>
                  <div className="text-xs text-muted-foreground mt-1">
                    {role.permissions.length} permissions
                  </div>
                </div>
              </Label>
              {role.isSystem && (
                <Badge variant="secondary">System</Badge>
              )}
            </div>
          ))}
        </div>
      </CardContent>
      
      <CardFooter>
        <Button 
          onClick={handleRoleAssignment}
          disabled={loading}
          className="w-full"
        >
          {loading ? 'Updating...' : 'Update Roles'}
        </Button>
      </CardFooter>
    </Card>
  );
};
```

### 2. Role Usage Statistics

```typescript
// src/components/role-usage-stats.tsx
import { useRolesApi } from '@/features/roles';
import { useUsers } from '@/features/users';

export const RoleUsageStats = () => {
  const { roles } = useRolesApi();
  const { getUserStats } = useUsers();
  
  const [stats, setStats] = useState(null);

  useEffect(() => {
    const fetchStats = async () => {
      const userStats = await getUserStats();
      
      const roleUsage = roles.map(role => ({
        role,
        userCount: userStats.roleDistribution[role.type] || 0,
        percentage: (userStats.roleDistribution[role.type] / userStats.totalUsers) * 100,
      }));

      setStats(roleUsage);
    };

    fetchStats();
  }, [roles, getUserStats]);

  return (
    <Card>
      <CardHeader>
        <CardTitle>Role Usage Statistics</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {stats?.map(({ role, userCount, percentage }) => (
            <div key={role.id} className="flex items-center justify-between">
              <div>
                <div className="font-medium">{role.name}</div>
                <div className="text-sm text-muted-foreground">
                  {role.description}
                </div>
              </div>
              <div className="text-right">
                <div className="font-medium">{userCount} users</div>
                <div className="text-sm text-muted-foreground">
                  {percentage.toFixed(1)}%
                </div>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};
```

## Shared Components and Hooks

### 1. Universal Permission Checker

```typescript
// src/hooks/use-permission-checker.ts
export const usePermissionChecker = () => {
  const { hasPermission } = useAuthPermissions();

  const checkUserAccess = (targetUser: User, action: Permission): boolean => {
    // Anyone can edit their own profile
    if (action === 'user.edit' && targetUser.id === user?.id) {
      return true;
    }

    // Admin users can only be managed by system administrators
    if (targetUser.role === 'ADMIN' && !hasPermission('system.admin')) {
      return false;
    }

    return hasPermission(action);
  };

  const checkRoleAccess = (targetRole: RoleData, action: Permission): boolean => {
    // System roles can only be managed by system administrators
    if (targetRole.isSystem && !hasPermission('system.admin')) {
      return false;
    }

    return hasPermission(action);
  };

  return {
    checkUserAccess,
    checkRoleAccess,
  };
};
```

### 2. Combined Data Hook

```typescript
// src/hooks/use-users-with-roles.ts
export const useUsersWithRoles = () => {
  const { users, ...userMethods } = useUsers();
  const { roles } = useRolesApi();

  const usersWithFullRoleData = useMemo(() => {
    return users.map(user => ({
      ...user,
      roles: user.roles.map(userRole => {
        const fullRole = roles.find(r => r.id === userRole.id);
        return {
          ...userRole,
          ...fullRole,
        };
      }),
    }));
  }, [users, roles]);

  const getUsersByRole = (roleId: string) => {
    return usersWithFullRoleData.filter(user => 
      user.roles.some(role => role.id === roleId)
    );
  };

  const getRolesByUser = (userId: string) => {
    const user = usersWithFullRoleData.find(u => u.id === userId);
    return user?.roles || [];
  };

  return {
    users: usersWithFullRoleData,
    getUsersByRole,
    getRolesByUser,
    ...userMethods,
  };
};
```

## API Integration

### 1. Combined API Routes

```typescript
// app/api/admin/users-roles/route.ts
import { listUsers } from '@/features/users/services';
import { getRoles } from '@/features/roles/services';

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const includeRoles = searchParams.get('includeRoles') === 'true';

    const [users, roles] = await Promise.all([
      listUsers({
        page: 1,
        limit: 100,
      }),
      includeRoles ? getRoles({ status: 'active' }) : Promise.resolve([]),
    ]);

    // Add full role information to users
    const usersWithRoles = users.data.map(user => ({
      ...user,
      roles: user.roles.map(userRole => {
        const fullRole = roles.find(r => r.id === userRole.id);
        return {
          ...userRole,
          permissions: fullRole?.permissions || [],
          isSystem: fullRole?.isSystem || false,
        };
      }),
    }));

    return NextResponse.json({
      users: usersWithRoles,
      roles,
      meta: users.meta,
    });
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to fetch data' },
      { status: 500 }
    );
  }
}
```

### 2. Role Assignment API

```typescript
// app/api/users/[id]/roles/route.ts
import { updateUser } from '@/features/users/services';
import { getRoles } from '@/features/roles/services';

export async function PUT(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const { roleIds } = await request.json();
    const userId = params.id;

    // Check if roles exist
    const roles = await getRoles();
    const validRoleIds = roleIds.filter((id: string) => 
      roles.some(role => role.id === id)
    );

    if (validRoleIds.length !== roleIds.length) {
      return NextResponse.json(
        { error: 'Invalid role ID' },
        { status: 400 }
      );
    }

    // Update user roles
    const updatedUser = await updateUser(userId, {
      roleIds: validRoleIds,
    });

    return NextResponse.json({ data: updatedUser });
  } catch (error) {
    return NextResponse.json(
      { error: 'Role assignment failed' },
      { status: 500 }
    );
  }
}
```

## State Management Integration

### 1. Combined Store

```typescript
// src/store/admin-store.ts
import { create } from 'zustand';
import { subscribeWithSelector } from 'zustand/middleware';

interface AdminStore {
  // Users
  users: User[];
  selectedUser: User | null;
  
  // Roles
  roles: RoleData[];
  selectedRole: RoleData | null;
  
  // UI State
  activeTab: 'users' | 'roles';
  sidebarOpen: boolean;
  
  // Actions
  setUsers: (users: User[]) => void;
  setRoles: (roles: RoleData[]) => void;
  setSelectedUser: (user: User | null) => void;
  setSelectedRole: (role: RoleData | null) => void;
  setActiveTab: (tab: 'users' | 'roles') => void;
  setSidebarOpen: (open: boolean) => void;
  
  // Cross-feature actions
  assignRoleToUser: (userId: string, roleId: string) => void;
  removeRoleFromUser: (userId: string, roleId: string) => void;
  updateUserRoles: (userId: string, roleIds: string[]) => void;
}

export const useAdminStore = create<AdminStore>()(
  subscribeWithSelector((set, get) => ({
    // Initial state
    users: [],
    roles: [],
    selectedUser: null,
    selectedRole: null,
    activeTab: 'users',
    sidebarOpen: true,
    
    // Actions
    setUsers: (users) => set({ users }),
    setRoles: (roles) => set({ roles }),
    setSelectedUser: (user) => set({ selectedUser: user }),
    setSelectedRole: (role) => set({ selectedRole: role }),
    setActiveTab: (tab) => set({ activeTab: tab }),
    setSidebarOpen: (open) => set({ sidebarOpen: open }),
    
    // Cross-feature actions
    assignRoleToUser: (userId, roleId) => set((state) => ({
      users: state.users.map(user => 
        user.id === userId 
          ? {
              ...user,
              roles: [...user.roles, { id: roleId }]
            }
          : user
      )
    })),
    
    removeRoleFromUser: (userId, roleId) => set((state) => ({
      users: state.users.map(user =>
        user.id === userId
          ? {
              ...user,
              roles: user.roles.filter(role => role.id !== roleId)
            }
          : user
      )
    })),
    
    updateUserRoles: (userId, roleIds) => set((state) => ({
      users: state.users.map(user =>
        user.id === userId
          ? {
              ...user,
              roles: roleIds.map(id => ({ id }))
            }
          : user
      )
    })),
  }))
);

// Store subscribers for cross-feature sync
useAdminStore.subscribe(
  (state) => state.selectedUser,
  (selectedUser) => {
    if (selectedUser) {
      // Load roles when user is selected
      console.log('User selected, loading roles...');
    }
  }
);
```

## Practical Examples

### 1. Admin Dashboard with Both Features

```typescript
// src/app/admin/page.tsx
import { useAdminStore } from '@/store/admin-store';
import { useUsersWithRoles } from '@/hooks/use-users-with-roles';
import { ProtectedRoute } from '@/components/auth/protected-route';

export default function AdminDashboard() {
  const { activeTab, setActiveTab } = useAdminStore();
  const { users, roles } = useUsersWithRoles();

  return (
    <ProtectedRoute requiredPermissions={['user.view', 'role.view']}>
      <div className="flex h-screen">
        <AdminSidebar />
        
        <main className="flex-1 p-6">
          <Tabs value={activeTab} onValueChange={setActiveTab}>
            <TabsList>
              <TabsTrigger value="users">
                Users ({users.length})
              </TabsTrigger>
              <TabsTrigger value="roles">
                Roles ({roles.length})
              </TabsTrigger>
            </TabsList>
            
            <TabsContent value="users">
              <UsersView />
            </TabsContent>
            
            <TabsContent value="roles">
              <RolesView />
            </TabsContent>
          </Tabs>
        </main>
        
        <AdminDetailPanel />
      </div>
    </ProtectedRoute>
  );
}
```

### 2. User Profile with Role Management

```typescript
// src/components/user-profile-with-roles.tsx
export const UserProfileWithRoles = ({ userId }: { userId: string }) => {
  const { getUser } = useUsers();
  const { roles } = useRolesApi();
  const { hasPermission } = useAuthPermissions();
  
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    getUser(userId).then(setUser);
  }, [userId, getUser]);

  if (!user) return <div>Loading...</div>;

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      <div className="lg:col-span-2">
        <UserForm 
          user={user}
          onSubmit={handleUserUpdate}
          mode="edit"
        />
      </div>
      
      <div>
        <UserRoleAssignment 
          userId={userId}
          onAssignmentChange={() => getUser(userId).then(setUser)}
        />
        
        {hasPermission('analytics.view') && (
          <Card className="mt-6">
            <CardHeader>
              <CardTitle>User Activity</CardTitle>
            </CardHeader>
            <CardContent>
              <UserActivityChart userId={userId} />
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
};
```

### 3. Dynamic Navigation Based on Permissions

```typescript
// src/components/admin-navigation.tsx
export const AdminNavigation = () => {
  const { hasPermission } = useAuthPermissions();

  const navItems = [
    {
      label: 'Dashboard',
      href: '/admin',
      icon: LayoutDashboard,
      permission: null,
    },
    {
      label: 'Users',
      href: '/admin/users',
      icon: Users,
      permission: 'user.view',
    },
    {
      label: 'Roles',
      href: '/admin/roles',
      icon: Shield,
      permission: 'role.view',
    },
    {
      label: 'Permissions',
      href: '/admin/permissions',
      icon: Key,
      permission: 'permission.view',
    },
    {
      label: 'System',
      href: '/admin/system',
      icon: Settings,
      permission: 'system.admin',
    },
  ].filter(item => !item.permission || hasPermission(item.permission));

  return (
    <nav className="space-y-2">
      {navItems.map((item) => (
        <NavItem key={item.href} {...item} />
      ))}
    </nav>
  );
};
```
