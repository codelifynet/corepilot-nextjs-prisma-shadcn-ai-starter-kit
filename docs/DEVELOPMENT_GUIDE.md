# Features Development Guide

This documentation provides a guide for new developers about how to expand and maintain the Roles and Users Features.

## Table of Contents

1. [Development Environment Setup](#development-environment-setup)
2. [Feature Architecture](#feature-architecture)
3. [Adding New Features](#adding-new-features)
4. [Testing Strategy](#testing-strategy)
5. [Performance Optimization](#performance-optimization)
6. [Security Best Practices](#security-best-practices)
7. [Deployment Guide](#deployment-guide)
8. [Troubleshooting](#troubleshooting)

## Development Environment Setup

### Prerequisites

```bash
# Node.js 20+
node --version  # v20.0.0+

# pnpm package manager
npm install -g pnpm

# PostgreSQL 14+
psql --version  # PostgreSQL 14.0+
```

### Local Setup

```bash
# 1. Clone repository
git clone https://github.com/your-org/corepilot.git
cd corepilot

# 2. Install dependencies
pnpm install

# 3. Setup environment variables
cp .env.example .env.local
# Edit .env.local with your database credentials

# 4. Setup database
pnpm db:setup
pnpm db:migrate
pnpm db:seed

# 5. Start development server
pnpm dev
```

### Environment Variables

```env
# Database
DATABASE_URL="postgresql://user:password@localhost:5432/corepilot"

# Authentication
NEXTAUTH_SECRET="your-secret-here"
NEXTAUTH_URL="http://localhost:3000"

# Features
FEATURES_ROLES_ENABLED=true
FEATURES_USERS_ENABLED=true
FEATURES_DEBUG=true
```

## Feature Architecture

### Directory Structure Standards

```
src/features/{feature-name}/
├── components/           # React components
│   ├── {feature}-list.tsx
│   ├── {feature}-form.tsx
│   ├── {feature}-detail.tsx
│   └── index.ts
├── hooks/               # Custom hooks
│   ├── use-{feature}.ts
│   ├── use-{feature}-api.ts
│   └── index.ts
├── services/           # API services
│   ├── {operation}.service.ts
│   └── index.ts
├── store/              # State management
│   ├── {feature}.store.ts
│   └── index.ts
├── types/              # TypeScript definitions
│   ├── {feature}.types.ts
│   ├── api.types.ts
│   └── index.ts
├── schemas/            # Validation schemas
│   ├── {feature}.schemas.ts
│   └── index.ts
├── utils/              # Utility functions
│   ├── {feature}.utils.ts
│   └── index.ts
├── constants/          # Constants and enums
│   ├── index.ts
│   └── {feature}.constants.ts
├── views/              # Page components
│   ├── {feature}-view.tsx
│   └── index.ts
├── docs/               # Documentation
│   ├── README.md
│   ├── API.md
│   └── EXAMPLES.md
└── index.ts            # Main export file
```

### Naming Conventions

#### Files and Directories
```typescript
// Pascal case for components
UserList.tsx
RoleDetailView.tsx

// Kebab case for files
user-list.tsx
role-detail-view.tsx

// Camel case for functions and variables
getUserById
createUserRole

// UPPER_SNAKE_CASE for constants
USER_ROLES
DEFAULT_PERMISSIONS
```

#### TypeScript Interfaces

```typescript
// Data models (no suffix)
interface User {
  id: string;
  name: string;
}

// API request/response types
interface CreateUserRequest {
  name: string;
  email: string;
}

interface GetUsersResponse {
  data: User[];
  meta: PaginationMeta;
}

// Component props
interface UserListProps {
  users: User[];
  onUserSelect: (user: User) => void;
}

// Hook return types
interface UseUsersReturn {
  users: User[];
  loading: boolean;
  createUser: (data: CreateUserRequest) => Promise<User>;
}
```

## Adding New Features

### 1. Create New Feature Structure

```bash
# Use the feature generator script
pnpm generate:feature notifications

# Or manually create structure
mkdir -p src/features/notifications/{components,hooks,services,store,types,schemas,utils,constants,views,docs}
```

### 2. Define Types First

```typescript
// src/features/notifications/types/notification.types.ts
export interface Notification {
  id: string;
  title: string;
  message: string;
  type: NotificationType;
  status: NotificationStatus;
  recipientId: string;
  senderId?: string;
  readAt?: Date;
  createdAt: Date;
  updatedAt: Date;
}

export type NotificationType = 'info' | 'warning' | 'error' | 'success';
export type NotificationStatus = 'sent' | 'delivered' | 'read' | 'failed';

export interface CreateNotificationRequest {
  title: string;
  message: string;
  type: NotificationType;
  recipientIds: string[];
  scheduledAt?: Date;
}
```

### 3. Create Validation Schemas

```typescript
// src/features/notifications/schemas/notification.schemas.ts
import { z } from 'zod';

export const createNotificationSchema = z.object({
  title: z.string().min(1, 'Title is required').max(100),
  message: z.string().min(1, 'Message is required').max(1000),
  type: z.enum(['info', 'warning', 'error', 'success']),
  recipientIds: z.array(z.string()).min(1, 'At least one recipient required'),
  scheduledAt: z.date().optional(),
});

export const updateNotificationSchema = createNotificationSchema.partial();

export type CreateNotificationInput = z.infer<typeof createNotificationSchema>;
export type UpdateNotificationInput = z.infer<typeof updateNotificationSchema>;
```

### 4. Implement Services

```typescript
// src/features/notifications/services/notification.service.ts
import { prisma } from '@/lib/prisma';
import type { 
  Notification, 
  CreateNotificationRequest,
  UpdateNotificationRequest 
} from '../types';

export class NotificationService {
  static async create(data: CreateNotificationRequest): Promise<Notification> {
    // Validate recipients exist
    const recipients = await prisma.user.findMany({
      where: { id: { in: data.recipientIds } }
    });

    if (recipients.length !== data.recipientIds.length) {
      throw new Error('Some recipients not found');
    }

    // Create notification
    const notification = await prisma.notification.create({
      data: {
        title: data.title,
        message: data.message,
        type: data.type,
        scheduledAt: data.scheduledAt,
        recipients: {
          create: data.recipientIds.map(recipientId => ({
            userId: recipientId,
            status: 'sent',
          })),
        },
      },
      include: {
        recipients: {
          include: { user: true },
        },
      },
    });

    return this.transformNotification(notification);
  }

  static async findMany(filters: NotificationFilters): Promise<Notification[]> {
    const where = this.buildWhereClause(filters);
    
    const notifications = await prisma.notification.findMany({
      where,
      include: {
        recipients: {
          include: { user: true },
        },
      },
      orderBy: { createdAt: 'desc' },
    });

    return notifications.map(this.transformNotification);
  }

  private static transformNotification(notification: any): Notification {
    return {
      id: notification.id,
      title: notification.title,
      message: notification.message,
      type: notification.type,
      status: notification.status,
      recipientId: notification.recipients[0]?.userId,
      readAt: notification.recipients[0]?.readAt,
      createdAt: notification.createdAt,
      updatedAt: notification.updatedAt,
    };
  }

  private static buildWhereClause(filters: NotificationFilters) {
    const where: any = {};

    if (filters.type) {
      where.type = filters.type;
    }

    if (filters.status) {
      where.recipients = {
        some: { status: filters.status }
      };
    }

    if (filters.recipientId) {
      where.recipients = {
        some: { userId: filters.recipientId }
      };
    }

    return where;
  }
}
```

### 5. Create Custom Hooks

```typescript
// src/features/notifications/hooks/use-notifications.ts
import { useState, useEffect, useCallback } from 'react';
import { NotificationService } from '../services';
import type { Notification, CreateNotificationRequest } from '../types';

export const useNotifications = () => {
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchNotifications = useCallback(async (filters = {}) => {
    setLoading(true);
    setError(null);

    try {
      const data = await NotificationService.findMany(filters);
      setNotifications(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setLoading(false);
    }
  }, []);

  const createNotification = useCallback(async (data: CreateNotificationRequest) => {
    try {
      const notification = await NotificationService.create(data);
      setNotifications(prev => [notification, ...prev]);
      return { success: true, data: notification };
    } catch (err) {
      const error = err instanceof Error ? err.message : 'Failed to create notification';
      setError(error);
      return { success: false, error };
    }
  }, []);

  const markAsRead = useCallback(async (notificationId: string) => {
    try {
      await NotificationService.markAsRead(notificationId);
      setNotifications(prev => 
        prev.map(n => 
          n.id === notificationId 
            ? { ...n, readAt: new Date() }
            : n
        )
      );
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to mark as read');
    }
  }, []);

  useEffect(() => {
    fetchNotifications();
  }, [fetchNotifications]);

  return {
    notifications,
    loading,
    error,
    fetchNotifications,
    createNotification,
    markAsRead,
  };
};
```

### 6. Create Components

```typescript
// src/features/notifications/components/notification-list.tsx
import { useNotifications } from '../hooks';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';

interface NotificationListProps {
  userId?: string;
  limit?: number;
}

export const NotificationList = ({ userId, limit }: NotificationListProps) => {
  const { notifications, loading, markAsRead } = useNotifications();

  const filteredNotifications = notifications.filter(n => 
    !userId || n.recipientId === userId
  ).slice(0, limit);

  if (loading) {
    return <div>Loading notifications...</div>;
  }

  return (
    <div className="space-y-4">
      {filteredNotifications.map((notification) => (
        <Card key={notification.id} className={`
          ${notification.readAt ? 'opacity-60' : 'border-l-4 border-l-blue-500'}
        `}>
          <CardHeader className="pb-2">
            <div className="flex items-center justify-between">
              <CardTitle className="text-lg">{notification.title}</CardTitle>
              <div className="flex items-center gap-2">
                <Badge variant={getBadgeVariant(notification.type)}>
                  {notification.type}
                </Badge>
                {!notification.readAt && (
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => markAsRead(notification.id)}
                  >
                    Mark as Read
                  </Button>
                )}
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground">
              {notification.message}
            </p>
            <div className="text-xs text-muted-foreground mt-2">
              {formatDate(notification.createdAt)}
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

function getBadgeVariant(type: string) {
  switch (type) {
    case 'error': return 'destructive';
    case 'warning': return 'secondary';
    case 'success': return 'default';
    default: return 'outline';
  }
}
```

## Testing Strategy

### Unit Tests

```typescript
// src/features/notifications/__tests__/notification.service.test.ts
import { describe, it, expect, beforeEach, vi } from 'vitest';
import { NotificationService } from '../services/notification.service';
import { prisma } from '@/lib/prisma';

vi.mock('@/lib/prisma', () => ({
  prisma: {
    notification: {
      create: vi.fn(),
      findMany: vi.fn(),
    },
    user: {
      findMany: vi.fn(),
    },
  },
}));

describe('NotificationService', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe('create', () => {
    it('should create notification with valid data', async () => {
      const mockUsers = [
        { id: 'user_1', name: 'John' },
        { id: 'user_2', name: 'Jane' },
      ];

      const mockNotification = {
        id: 'notif_1',
        title: 'Test Notification',
        message: 'Test message',
        type: 'info',
        recipients: [
          { userId: 'user_1', status: 'sent' },
          { userId: 'user_2', status: 'sent' },
        ],
        createdAt: new Date(),
        updatedAt: new Date(),
      };

      vi.mocked(prisma.user.findMany).mockResolvedValue(mockUsers);
      vi.mocked(prisma.notification.create).mockResolvedValue(mockNotification);

      const result = await NotificationService.create({
        title: 'Test Notification',
        message: 'Test message',
        type: 'info',
        recipientIds: ['user_1', 'user_2'],
      });

      expect(result.title).toBe('Test Notification');
      expect(prisma.user.findMany).toHaveBeenCalledWith({
        where: { id: { in: ['user_1', 'user_2'] } }
      });
    });

    it('should throw error for invalid recipients', async () => {
      vi.mocked(prisma.user.findMany).mockResolvedValue([]);

      await expect(NotificationService.create({
        title: 'Test',
        message: 'Test',
        type: 'info',
        recipientIds: ['invalid_user'],
      })).rejects.toThrow('Some recipients not found');
    });
  });
});
```

### Integration Tests

```typescript
// src/features/notifications/__tests__/notifications.integration.test.ts
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { NotificationList } from '../components/notification-list';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: { retry: false },
    mutations: { retry: false },
  },
});

const Wrapper = ({ children }: { children: React.ReactNode }) => (
  <QueryClientProvider client={queryClient}>
    {children}
  </QueryClientProvider>
);

describe('NotificationList Integration', () => {
  it('should display notifications and allow marking as read', async () => {
    // Mock API response
    global.fetch = vi.fn().mockResolvedValue({
      ok: true,
      json: () => Promise.resolve({
        success: true,
        data: [
          {
            id: 'notif_1',
            title: 'Test Notification',
            message: 'Test message',
            type: 'info',
            readAt: null,
            createdAt: new Date().toISOString(),
          },
        ],
      }),
    });

    render(<NotificationList />, { wrapper: Wrapper });

    // Wait for notifications to load
    await waitFor(() => {
      expect(screen.getByText('Test Notification')).toBeInTheDocument();
    });

    // Test mark as read functionality
    const markReadButton = screen.getByText('Mark as Read');
    fireEvent.click(markReadButton);

    await waitFor(() => {
      expect(markReadButton).not.toBeInTheDocument();
    });
  });
});
```

### E2E Tests

```typescript
// cypress/e2e/notifications.cy.ts
describe('Notifications Feature', () => {
  beforeEach(() => {
    cy.login('admin@example.com');
    cy.visit('/admin/notifications');
  });

  it('should create and manage notifications', () => {
    // Create new notification
    cy.get('[data-testid=create-notification-btn]').click();
    cy.get('[data-testid=notification-title]').type('System Maintenance');
    cy.get('[data-testid=notification-message]').type('System will be down for maintenance');
    cy.get('[data-testid=notification-type]').select('warning');
    cy.get('[data-testid=recipient-select]').select(['user_1', 'user_2']);
    cy.get('[data-testid=submit-btn]').click();

    // Verify notification appears in list
    cy.get('[data-testid=notification-list]')
      .should('contain', 'System Maintenance');

    // Test marking as read
    cy.get('[data-testid=mark-read-btn]').first().click();
    cy.get('[data-testid=notification-item]').first()
      .should('have.class', 'opacity-60');
  });
});
```

## Performance Optimization

### Database Optimization

```typescript
// src/features/notifications/services/optimized-notification.service.ts
export class OptimizedNotificationService {
  // Use database indexes
  static async getNotificationsForUser(
    userId: string, 
    options: PaginationOptions
  ): Promise<PaginatedResult<Notification>> {
    const where = {
      recipients: {
        some: { userId }
      }
    };

    // Use cursor-based pagination for better performance
    const notifications = await prisma.notification.findMany({
      where,
      take: options.limit + 1, // Take one extra to check if there's a next page
      cursor: options.cursor ? { id: options.cursor } : undefined,
      orderBy: { createdAt: 'desc' },
      select: {
        id: true,
        title: true,
        message: true,
        type: true,
        createdAt: true,
        recipients: {
          where: { userId },
          select: {
            status: true,
            readAt: true,
          }
        }
      }
    });

    const hasNextPage = notifications.length > options.limit;
    const items = hasNextPage ? notifications.slice(0, -1) : notifications;

    return {
      items,
      hasNextPage,
      nextCursor: hasNextPage ? items[items.length - 1].id : null,
    };
  }

  // Batch operations for better performance
  static async markMultipleAsRead(
    notificationIds: string[], 
    userId: string
  ): Promise<void> {
    await prisma.notificationRecipient.updateMany({
      where: {
        notificationId: { in: notificationIds },
        userId,
        readAt: null,
      },
      data: {
        readAt: new Date(),
        status: 'read',
      },
    });
  }
}
```

### React Performance

```typescript
// src/features/notifications/components/optimized-notification-list.tsx
import { memo, useMemo, useCallback } from 'react';
import { FixedSizeList as List } from 'react-window';

interface VirtualizedNotificationListProps {
  notifications: Notification[];
  onMarkAsRead: (id: string) => void;
}

export const VirtualizedNotificationList = memo(({ 
  notifications, 
  onMarkAsRead 
}: VirtualizedNotificationListProps) => {
  const itemData = useMemo(() => ({
    notifications,
    onMarkAsRead,
  }), [notifications, onMarkAsRead]);

  const Row = useCallback(({ index, style, data }: any) => {
    const notification = data.notifications[index];
    
    return (
      <div style={style}>
        <NotificationItem
          notification={notification}
          onMarkAsRead={data.onMarkAsRead}
        />
      </div>
    );
  }, []);

  return (
    <List
      height={600}
      itemCount={notifications.length}
      itemSize={120}
      itemData={itemData}
    >
      {Row}
    </List>
  );
});

// Memoized notification item
const NotificationItem = memo(({ notification, onMarkAsRead }: {
  notification: Notification;
  onMarkAsRead: (id: string) => void;
}) => {
  const handleMarkAsRead = useCallback(() => {
    onMarkAsRead(notification.id);
  }, [notification.id, onMarkAsRead]);

  return (
    <Card className="mb-2">
      <CardContent className="p-4">
        <div className="flex justify-between items-start">
          <div>
            <h4 className="font-medium">{notification.title}</h4>
            <p className="text-sm text-muted-foreground">
              {notification.message}
            </p>
          </div>
          {!notification.readAt && (
            <Button size="sm" onClick={handleMarkAsRead}>
              Mark as Read
            </Button>
          )}
        </div>
      </CardContent>
    </Card>
  );
});
```

### Caching Strategy

```typescript
// src/features/notifications/hooks/use-cached-notifications.ts
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { NotificationService } from '../services';

export const useCachedNotifications = (userId?: string) => {
  const queryClient = useQueryClient();

  const {
    data: notifications = [],
    isLoading,
    error,
  } = useQuery({
    queryKey: ['notifications', userId],
    queryFn: () => NotificationService.findMany({ recipientId: userId }),
    staleTime: 5 * 60 * 1000, // 5 minutes
    gcTime: 10 * 60 * 1000, // 10 minutes
  });

  const markAsRead = useMutation({
    mutationFn: NotificationService.markAsRead,
    onSuccess: (data, notificationId) => {
      // Optimistic update
      queryClient.setQueryData(['notifications', userId], (old: Notification[] = []) =>
        old.map(n => 
          n.id === notificationId 
            ? { ...n, readAt: new Date() }
            : n
        )
      );
    },
  });

  const invalidateNotifications = useCallback(() => {
    queryClient.invalidateQueries({ queryKey: ['notifications'] });
  }, [queryClient]);

  return {
    notifications,
    loading: isLoading,
    error,
    markAsRead: markAsRead.mutate,
    invalidateNotifications,
  };
};
```

## Security Best Practices

### Input Validation

```typescript
// src/features/notifications/middleware/validation.middleware.ts
import { z } from 'zod';
import { NextRequest, NextResponse } from 'next/server';

export const validateNotificationInput = (schema: z.ZodSchema) => {
  return async (req: NextRequest) => {
    try {
      const body = await req.json();
      const validatedData = schema.parse(body);
      
      // Add validated data to request
      (req as any).validatedData = validatedData;
      
      return NextResponse.next();
    } catch (error) {
      if (error instanceof z.ZodError) {
        return NextResponse.json(
          { 
            success: false, 
            error: {
              code: 'VALIDATION_ERROR',
              message: 'Invalid input data',
              details: error.errors,
            }
          },
          { status: 400 }
        );
      }
      
      return NextResponse.json(
        { success: false, error: { code: 'INVALID_REQUEST', message: 'Invalid request' } },
        { status: 400 }
      );
    }
  };
};
```

### Permission Checks

```typescript
// src/features/notifications/middleware/auth.middleware.ts
export const requireNotificationPermission = (permission: string) => {
  return async (req: NextRequest) => {
    const session = await getServerSession(req);
    
    if (!session?.user) {
      return NextResponse.json(
        { success: false, error: { code: 'AUTH_REQUIRED', message: 'Authentication required' } },
        { status: 401 }
      );
    }

    const hasPermission = await checkUserPermission(session.user.id, permission);
    
    if (!hasPermission) {
      return NextResponse.json(
        { success: false, error: { code: 'PERMISSION_DENIED', message: 'Insufficient permissions' } },
        { status: 403 }
      );
    }

    return NextResponse.next();
  };
};
```

### SQL Injection Prevention

```typescript
// Always use Prisma's type-safe queries
// ❌ BAD - Never do this
const notifications = await prisma.$queryRaw`
  SELECT * FROM notifications WHERE user_id = ${userId}
`;

// ✅ GOOD - Use Prisma's type-safe methods
const notifications = await prisma.notification.findMany({
  where: {
    recipients: {
      some: { userId }
    }
  }
});

// ✅ GOOD - If raw SQL is necessary, use parameterized queries
const notifications = await prisma.$queryRaw`
  SELECT * FROM notifications WHERE user_id = ${Prisma.sql`${userId}`}
`;
```

## Deployment Guide

### Database Migrations

```bash
# Generate migration
pnpm db:generate "add_notifications_table"

# Apply migrations
pnpm db:migrate

# Seed data
pnpm db:seed:notifications
```

### Environment Configuration

```yaml
# docker-compose.yml
version: '3.8'
services:
  app:
    build: .
    environment:
      - NODE_ENV=production
      - FEATURES_NOTIFICATIONS_ENABLED=true
      - NOTIFICATIONS_BATCH_SIZE=100
      - NOTIFICATIONS_QUEUE_ENABLED=true
    ports:
      - "3000:3000"
    depends_on:
      - postgres
      - redis

  postgres:
    image: postgres:14
    environment:
      POSTGRES_DB: corepilot
      POSTGRES_USER: postgres
      POSTGRES_PASSWORD: password
    volumes:
      - postgres_data:/var/lib/postgresql/data

  redis:
    image: redis:7
    ports:
      - "6379:6379"
```

### Feature Flags

```typescript
// src/lib/feature-flags.ts
export const featureFlags = {
  notifications: {
    enabled: process.env.FEATURES_NOTIFICATIONS_ENABLED === 'true',
    realTime: process.env.NOTIFICATIONS_REALTIME_ENABLED === 'true',
    batchSize: parseInt(process.env.NOTIFICATIONS_BATCH_SIZE || '50'),
  },
};

// Usage in components
import { featureFlags } from '@/lib/feature-flags';

export const NotificationButton = () => {
  if (!featureFlags.notifications.enabled) {
    return null;
  }

  return <Button>Create Notification</Button>;
};
```

## Troubleshooting

### Common Issues

#### 1. Performance Issues

```typescript
// Debug slow queries
export const debugNotificationQueries = async () => {
  const startTime = Date.now();
  
  const notifications = await prisma.notification.findMany({
    where: { /* your conditions */ },
    // Add query logging
  });
  
  const queryTime = Date.now() - startTime;
  
  if (queryTime > 1000) {
    console.warn(`Slow notification query: ${queryTime}ms`);
  }
  
  return notifications;
};

// Add database indexes
// migrations/add_notification_indexes.sql
CREATE INDEX CONCURRENTLY idx_notifications_recipient_status 
ON notification_recipients (user_id, status);

CREATE INDEX CONCURRENTLY idx_notifications_created_at 
ON notifications (created_at DESC);
```

#### 2. Memory Leaks

```typescript
// Clean up subscriptions
export const useNotificationSubscription = (userId: string) => {
  useEffect(() => {
    const eventSource = new EventSource(`/api/notifications/stream?userId=${userId}`);
    
    eventSource.onmessage = (event) => {
      const notification = JSON.parse(event.data);
      // Handle notification
    };
    
    eventSource.onerror = (error) => {
      console.error('Notification stream error:', error);
    };
    
    // Cleanup on unmount
    return () => {
      eventSource.close();
    };
  }, [userId]);
};
```

#### 3. State Sync Issues

```typescript
// Ensure proper state synchronization
export const useNotificationSync = () => {
  const queryClient = useQueryClient();
  
  useEffect(() => {
    const handleVisibilityChange = () => {
      if (document.visibilityState === 'visible') {
        // Refetch when tab becomes visible
        queryClient.invalidateQueries({ queryKey: ['notifications'] });
      }
    };
    
    document.addEventListener('visibilitychange', handleVisibilityChange);
    
    return () => {
      document.removeEventListener('visibilitychange', handleVisibilityChange);
    };
  }, [queryClient]);
};
```

### Debug Tools

```typescript
// src/features/notifications/debug/notification-debugger.tsx
export const NotificationDebugger = () => {
  const [debugMode, setDebugMode] = useState(false);
  const { notifications } = useNotifications();
  
  if (!debugMode || process.env.NODE_ENV === 'production') {
    return null;
  }
  
  return (
    <div className="fixed bottom-4 right-4 bg-black text-white p-4 rounded">
      <h4>Notification Debug</h4>
      <p>Total: {notifications.length}</p>
      <p>Unread: {notifications.filter(n => !n.readAt).length}</p>
      <pre className="text-xs mt-2">
        {JSON.stringify(notifications.slice(0, 3), null, 2)}
      </pre>
    </div>
  );
};
```

Bu development guide, feature'ları genişletmek ve maintain etmek için gerekli tüm bilgileri sağlar ve best practices'leri takip eder.
