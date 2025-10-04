# Users Feature - Kapsamlı Dokümantasyon

## İçindekiler

1. [Genel Bakış](#genel-bakış)
2. [Mimari ve Yapı](#mimari-ve-yapı)
3. [API Referansı](#api-referansı)
4. [Components](#components)
5. [Hooks](#hooks)
6. [Services](#services)
7. [Store Management](#store-management)
8. [Types ve Schemas](#types-ve-schemas)
9. [Kurulum ve Kullanım](#kurulum-ve-kullanım)
10. [İyi Uygulama Örnekleri](#iyi-uygulama-örnekleri)

## Genel Bakış

Users feature, CorePilot uygulaması için kapsamlı kullanıcı yönetimi işlevselliği sağlar. Modern React ve Next.js best practices'lerini takip ederek, kullanıcı CRUD operasyonları, rol yönetimi, ban sistemi ve kullanıcı aktivite takibi gibi özellikleri içerir.

### Özellikler

- **Kullanıcı Yönetimi**: Kullanıcıları oluşturma, okuma, güncelleme ve silme
- **Rol Atama**: Kullanıcılara dinamik rol atama ve izin yönetimi
- **Ban Sistemi**: Kullanıcıları geçici veya kalıcı olarak banlama
- **Aktivite Takibi**: Kullanıcı oturum ve aktivite geçmişi
- **Gelişmiş Filtreleme**: Rol, durum, ban durumu ve tarih bazlı filtreleme
- **İstatistikler**: Kullanıcı dağılımı ve aktivite analitiği
- **Email Doğrulama**: Email verification sistemi
- **Profil Yönetimi**: Kullanıcı profil bilgileri ve avatar yönetimi

## Mimari ve Yapı

### Feature Yapısı

```
src/features/users/
├── components/              # UI Bileşenleri
│   ├── user-detail-view.tsx    # Kullanıcı detay görünümü
│   ├── user-form.tsx           # Kullanıcı form bileşeni
│   ├── user-list.tsx           # Kullanıcı liste bileşeni
│   └── index.ts               # Component exportları
├── hooks/                   # Custom Hooks
│   ├── use-users.ts          # Ana kullanıcı hook'u
│   └── index.ts             # Hook exportları
├── services/               # API Servisleri
│   ├── user.service.ts      # Kullanıcı API servisleri
│   └── index.ts            # Servis exportları
├── store/                  # State Management
│   ├── user-store.ts       # Zustand store
│   └── index.ts           # Store exportları
├── types/                  # TypeScript Definitions
│   ├── index.ts           # Ana tip tanımlamaları
│   └── index.ts          # Tip exportları
├── utils/                  # Yardımcı Fonksiyonlar
│   ├── user.utils.ts      # Kullanıcı utility fonksiyonları
│   └── index.ts          # Util exportları
├── schemas/               # Validation Schemas
│   ├── index.ts          # Zod şemaları
│   └── index.ts         # Şema exportları
├── constants/            # Sabitler
│   ├── index.ts         # Kullanıcı sabitleri
│   └── index.ts        # Sabit exportları
├── views/               # Page Views
│   ├── users-view.tsx  # Ana kullanıcı sayfası
│   └── index.ts       # View exportları
└── index.ts            # Feature ana export dosyası
```

## API Referansı

### REST Endpoints

#### Kullanıcılar

##### GET /api/users
Kullanıcıları filtreleme ve sayfalama ile listeler.

**Query Parameters:**
```typescript
interface ListUsersParams {
  page?: number;         // Sayfa numarası (default: 1)
  limit?: number;        // Sayfa başına kayıt (default: 10)
  sort?: 'name' | 'email' | 'createdAt' | 'lastLogin'; // Sıralama
  order?: 'asc' | 'desc'; // Sıralama yönü
  filters?: {
    search?: string;     // Ad veya email'de arama
    role?: UserRole;     // Rol filtresi
    banned?: boolean;    // Ban durumu filtresi
    emailVerified?: boolean; // Email doğrulama filtresi
    dateRange?: {
      start: Date;
      end: Date;
    };
  };
}
```

**Response:**
```typescript
interface ListUsersResponse {
  data: User[];
  meta: {
    total: number;
    page: number;
    limit: number;
    totalPages: number;
  };
}
```

##### POST /api/users
Yeni kullanıcı oluşturur.

**Request Body:**
```typescript
interface CreateUserInput {
  name: string;
  email: string;
  role?: UserRole;
  emailVerified?: boolean;
  image?: string;
}
```

##### GET /api/users/[id]
Belirli bir kullanıcıyı getirir.

**Response:**
```typescript
interface GetUserResponse {
  data: UserWithPermissions;
}
```

##### PUT /api/users/[id]
Kullanıcıyı günceller.

**Request Body:**
```typescript
interface UpdateUserInput {
  name?: string;
  email?: string;
  role?: UserRole;
  emailVerified?: boolean;
  image?: string;
}
```

##### DELETE /api/users/[id]
Kullanıcıyı siler.

#### Ban Sistemi

##### POST /api/users/[id]/ban
Kullanıcıyı banlar.

**Request Body:**
```typescript
interface BanUserInput {
  reason: string;
  expiresAt?: Date; // Null ise kalıcı ban
  notifyUser?: boolean;
}
```

##### DELETE /api/users/[id]/ban
Kullanıcının banını kaldırır.

#### İstatistikler

##### GET /api/users/stats
Kullanıcı istatistiklerini getirir.

**Response:**
```typescript
interface UserStats {
  totalUsers: number;
  activeUsers: number;
  bannedUsers: number;
  unverifiedUsers: number;
  newUsersThisMonth: number;
  userGrowthRate: number;
  roleDistribution: {
    [key in UserRole]: number;
  };
  activityStats: {
    dailyActiveUsers: number;
    weeklyActiveUsers: number;
    monthlyActiveUsers: number;
  };
}
```

#### Aktivite

##### GET /api/users/[id]/activity
Kullanıcı aktivite geçmişini getirir.

**Response:**
```typescript
interface UserActivity {
  sessions: UserSession[];
  loginHistory: LoginAttempt[];
  activityTimeline: ActivityEvent[];
}
```

## Components

### UserList

Ana kullanıcı liste bileşeni.

```typescript
interface UserListProps {
  users: User[];
  loading?: boolean;
  onEdit?: (user: User) => void;
  onDelete?: (user: User) => void;
  onBan?: (user: User) => void;
  onUnban?: (user: User) => void;
  onView?: (user: User) => void;
  selectable?: boolean;
  selectedUsers?: string[];
  onSelectionChange?: (userIds: string[]) => void;
}

// Kullanım
<UserList
  users={users}
  loading={loading}
  onEdit={handleEdit}
  onDelete={handleDelete}
  onBan={handleBan}
  onUnban={handleUnban}
  onView={handleView}
  selectable={true}
  selectedUsers={selectedUsers}
  onSelectionChange={setSelectedUsers}
/>
```

**Özellikler:**
- Responsive tablo tasarımı
- Sıralama (ad, email, rol, kayıt tarihi, son giriş)
- Toplu seçim
- Aksiyon butonları (görüntüle, düzenle, banla, sil)
- Rol rozet görünümü
- Ban durumu göstergesi
- Avatar ve kullanıcı bilgileri

### UserForm

Kullanıcı oluşturma ve düzenleme formu.

```typescript
interface UserFormProps {
  user?: User;           // Düzenleme için mevcut kullanıcı
  onSubmit: (data: CreateUserInput | UpdateUserInput) => Promise<void>;
  onCancel?: () => void;
  loading?: boolean;
  mode?: 'create' | 'edit';
}

// Kullanım
<UserForm
  user={selectedUser}
  onSubmit={handleSubmit}
  onCancel={handleCancel}
  loading={submitting}
  mode="edit"
/>
```

**Form Alanları:**
- Ad (zorunlu)
- Email (zorunlu, unique validation)
- Rol seçimi
- Avatar upload
- Email doğrulama durumu
- Aktif/Pasif durumu

### UserDetailView

Kullanıcı detay görünümü.

```typescript
interface UserDetailViewProps {
  userId: string;
  onEdit?: () => void;
  onBack?: () => void;
}

// Kullanım
<UserDetailView
  userId={userId}
  onEdit={handleEdit}
  onBack={handleBack}
/>
```

**Detay Sekmeleri:**
- Genel Bilgiler
- Roller ve İzinler
- Aktivite Geçmişi
- Oturum Bilgileri
- Ban Geçmişi

## Hooks

### useUsers

Ana kullanıcı yönetimi hook'u.

```typescript
const {
  // Data
  users,
  user,
  stats,
  loading,
  error,
  
  // Pagination
  currentPage,
  totalPages,
  hasNextPage,
  hasPrevPage,
  
  // Operations
  getUsers,
  getUser,
  createUser,
  updateUser,
  deleteUser,
  
  // Ban operations
  banUser,
  unbanUser,
  
  // Bulk operations
  bulkDelete,
  bulkUpdateRole,
  bulkBan,
  
  // Stats
  getUserStats,
  
  // Filters and search
  filters,
  setFilters,
  searchTerm,
  setSearchTerm,
  
  // Navigation
  goToPage,
  nextPage,
  prevPage,
} = useUsers();
```

**Kullanım Örnekleri:**

```typescript
// Kullanıcıları listeleme
const handleGetUsers = async () => {
  await getUsers({
    page: 1,
    limit: 20,
    filters: {
      role: 'user',
      banned: false,
    },
  });
};

// Kullanıcı oluşturma
const handleCreateUser = async (data: CreateUserInput) => {
  try {
    await createUser(data);
    toast.success('Kullanıcı başarıyla oluşturuldu');
  } catch (error) {
    toast.error('Kullanıcı oluşturulamadı');
  }
};

// Kullanıcı banlama
const handleBanUser = async (userId: string, banData: BanUserInput) => {
  try {
    await banUser(userId, banData);
    toast.success('Kullanıcı banlandı');
  } catch (error) {
    toast.error('Kullanıcı banlanamadı');
  }
};
```

## Services

### listUsers
Kullanıcıları filtreleme ve sayfalama ile getirir.

```typescript
export async function listUsers(
  params: ListUsersParams
): Promise<ListUsersResponse> {
  const {
    page = 1,
    limit = 10,
    sort = 'createdAt',
    order = 'desc',
    filters = {},
  } = params;

  const skip = (page - 1) * limit;
  const where: any = {};

  // Filter logic
  if (filters.search) {
    where.OR = [
      { name: { contains: filters.search, mode: 'insensitive' } },
      { email: { contains: filters.search, mode: 'insensitive' } },
    ];
  }

  if (filters.role) {
    where.role = filters.role;
  }

  if (filters.banned !== undefined) {
    where.banned = filters.banned;
  }

  if (filters.emailVerified !== undefined) {
    where.emailVerified = filters.emailVerified;
  }

  // Date range filter
  if (filters.dateRange) {
    where.createdAt = {
      gte: filters.dateRange.start,
      lte: filters.dateRange.end,
    };
  }

  const [users, total] = await Promise.all([
    prisma.user.findMany({
      where,
      skip,
      take: limit,
      orderBy: { [sort]: order },
      include: {
        userRoles: {
          include: {
            role: {
              include: {
                permissions: {
                  include: { permission: true },
                },
              },
            },
          },
        },
        sessions: {
          where: { expiresAt: { gt: new Date() } },
          orderBy: { createdAt: 'desc' },
          take: 1,
        },
      },
    }),
    prisma.user.count({ where }),
  ]);

  return {
    data: users.map(transformUser),
    meta: {
      total,
      page,
      limit,
      totalPages: Math.ceil(total / limit),
    },
  };
}
```

### createUser
Yeni kullanıcı oluşturur.

```typescript
export async function createUser(data: CreateUserInput): Promise<User> {
  // Email uniqueness check
  const existingUser = await prisma.user.findUnique({
    where: { email: data.email },
  });

  if (existingUser) {
    throw new Error('Bu email adresi zaten kullanımda');
  }

  // Create user with default role
  const user = await prisma.user.create({
    data: {
      ...data,
      role: data.role || UserRole.USER,
      emailVerified: data.emailVerified || false,
    },
    include: {
      userRoles: {
        include: {
          role: {
            include: {
              permissions: {
                include: { permission: true },
              },
            },
          },
        },
      },
    },
  });

  return transformUser(user);
}
```

### banUser
Kullanıcıyı banlar.

```typescript
export async function banUser(
  userId: string,
  banData: BanUserInput
): Promise<void> {
  const user = await prisma.user.findUnique({
    where: { id: userId },
  });

  if (!user) {
    throw new Error('Kullanıcı bulunamadı');
  }

  if (user.role === UserRole.ADMIN) {
    throw new Error('Admin kullanıcılar banlanamaz');
  }

  await prisma.user.update({
    where: { id: userId },
    data: {
      banned: true,
      banReason: banData.reason,
      banExpires: banData.expiresAt || null,
      updatedAt: new Date(),
    },
  });

  // Log ban action
  await prisma.auditLog.create({
    data: {
      action: 'USER_BANNED',
      resourceType: 'User',
      resourceId: userId,
      details: {
        reason: banData.reason,
        expiresAt: banData.expiresAt,
      },
    },
  });

  // Send notification if requested
  if (banData.notifyUser) {
    await sendBanNotification(user, banData);
  }
}
```

## Store Management

### Zustand Store

```typescript
interface UserStore {
  // State
  users: User[];
  selectedUser: User | null;
  filters: UserFilters;
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
  loading: boolean;
  error: string | null;
  stats: UserStats | null;
  
  // Actions
  setUsers: (users: User[]) => void;
  addUser: (user: User) => void;
  updateUser: (id: string, data: Partial<User>) => void;
  removeUser: (id: string) => void;
  setSelectedUser: (user: User | null) => void;
  
  // Filters
  setFilters: (filters: UserFilters) => void;
  resetFilters: () => void;
  
  // Pagination
  setPagination: (pagination: Partial<PaginationState>) => void;
  goToPage: (page: number) => void;
  
  // Loading and errors
  setLoading: (loading: boolean) => void;
  setError: (error: string | null) => void;
  
  // Stats
  setStats: (stats: UserStats) => void;
  
  // Bulk operations
  bulkUpdateUsers: (userIds: string[], updates: Partial<User>) => void;
  bulkRemoveUsers: (userIds: string[]) => void;
}

// Kullanım
const { 
  users, 
  addUser, 
  updateUser, 
  setFilters,
  pagination,
  goToPage 
} = useUserStore();
```

## Types ve Schemas

### Core Types

```typescript
// Kullanıcı rolleri
export enum UserRole {
  ADMIN = 'ADMIN',
  USER = 'USER',
  MODERATOR = 'MODERATOR',
  VIEWER = 'VIEWER',
}

// Ana kullanıcı interface
export interface User {
  id: string;
  name: string;
  email: string;
  emailVerified: boolean;
  image?: string;
  role: UserRole;
  banned?: boolean;
  banReason?: string;
  banExpires?: Date;
  createdAt: Date;
  updatedAt: Date;
}

// İzinlerle birlikte kullanıcı
export interface UserWithPermissions extends User {
  permissions: UserPermissions;
  roles: Role[];
}

// Kullanıcı izinleri
export interface UserPermissions {
  user: string[];
  role: string[];
  permission: string[];
  system: string[];
  content: string[];
  analytics: string[];
  billing: string[];
}

// Kullanıcı oturumu
export interface UserSession {
  id: string;
  userId: string;
  deviceInfo: string;
  ipAddress: string;
  userAgent: string;
  createdAt: Date;
  expiresAt: Date;
  isActive: boolean;
}

// Kullanıcı aktivitesi
export interface UserActivity {
  id: string;
  userId: string;
  action: string;
  resourceType: string;
  resourceId?: string;
  details?: any;
  ipAddress: string;
  userAgent: string;
  createdAt: Date;
}
```

### Validation Schemas

```typescript
// Kullanıcı oluşturma şeması
export const createUserSchema = z.object({
  name: z.string()
    .min(1, 'Ad zorunludur')
    .max(100, 'Ad çok uzun')
    .regex(/^[a-zA-ZğüşıöçĞÜŞİÖÇ\s]+$/, 'Ad sadece harf içerebilir'),
  
  email: z.string()
    .email('Geçerli bir email adresi giriniz')
    .toLowerCase(),
  
  role: z.nativeEnum(UserRole).optional(),
  
  emailVerified: z.boolean().optional(),
  
  image: z.string().url().optional(),
});

// Kullanıcı güncelleme şeması
export const updateUserSchema = createUserSchema.partial();

// Ban şeması
export const banUserSchema = z.object({
  reason: z.string()
    .min(10, 'Ban sebebi en az 10 karakter olmalıdır')
    .max(500, 'Ban sebebi çok uzun'),
  
  expiresAt: z.date().optional(),
  
  notifyUser: z.boolean().optional(),
});

// Filtreleme şeması
export const userFiltersSchema = z.object({
  search: z.string().optional(),
  role: z.nativeEnum(UserRole).optional(),
  banned: z.boolean().optional(),
  emailVerified: z.boolean().optional(),
  dateRange: z.object({
    start: z.date(),
    end: z.date(),
  }).optional(),
});
```

## Kurulum ve Kullanım

### 1. Feature'ı Import Etme

```typescript
// Ana index dosyasından tüm exports
import {
  // Components
  UsersView,
  UserList,
  UserForm,
  UserDetailView,
  
  // Hooks
  useUsers,
  
  // Store
  useUserStore,
  
  // Types
  type User,
  type UserWithPermissions,
  type CreateUserInput,
  type UpdateUserInput,
  type UserFilters,
  
  // Services
  listUsers,
  createUser,
  updateUser,
  deleteUser,
  banUser,
  unbanUser,
} from '@/features/users';
```

### 2. Temel Kullanım

```typescript
// Sayfa component'i
import { UsersView } from '@/features/users';

export default function UsersPage() {
  return <UsersView />;
}
```

### 3. Özelleştirilmiş Kullanım

```typescript
import { useUsers, UserList } from '@/features/users';

export default function CustomUsersPage() {
  const { 
    users, 
    loading, 
    getUsers, 
    filters, 
    setFilters,
    pagination,
    goToPage 
  } = useUsers();

  useEffect(() => {
    getUsers({
      page: pagination.page,
      limit: pagination.limit,
      filters,
    });
  }, [filters, pagination.page]);

  const handleFilterChange = (newFilters: UserFilters) => {
    setFilters(newFilters);
    goToPage(1); // Reset to first page
  };

  return (
    <div className="space-y-6">
      <UserFilters 
        filters={filters}
        onFiltersChange={handleFilterChange}
      />
      
      <UserList 
        users={users}
        loading={loading}
        onEdit={handleEdit}
        onDelete={handleDelete}
        onBan={handleBan}
        onUnban={handleUnban}
      />
      
      <Pagination
        currentPage={pagination.page}
        totalPages={pagination.totalPages}
        onPageChange={goToPage}
      />
    </div>
  );
}
```

### 4. API Route Örneği

```typescript
// app/api/users/route.ts
import { listUsers } from '@/features/users/services';
import { userFiltersSchema } from '@/features/users/schemas';

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    
    const filters = userFiltersSchema.parse({
      search: searchParams.get('search') || undefined,
      role: searchParams.get('role') || undefined,
      banned: searchParams.get('banned') === 'true' ? true : 
               searchParams.get('banned') === 'false' ? false : undefined,
      emailVerified: searchParams.get('emailVerified') === 'true' ? true :
                     searchParams.get('emailVerified') === 'false' ? false : undefined,
    });

    const page = Number(searchParams.get('page')) || 1;
    const limit = Number(searchParams.get('limit')) || 10;
    const sort = searchParams.get('sort') || 'createdAt';
    const order = searchParams.get('order') || 'desc';

    const result = await listUsers({
      page,
      limit,
      sort: sort as any,
      order: order as any,
      filters,
    });
    
    return NextResponse.json(result);
  } catch (error) {
    console.error('Users API Error:', error);
    return NextResponse.json(
      { error: 'Kullanıcılar getirilemedi' },
      { status: 500 }
    );
  }
}
```

## İyi Uygulama Örnekleri

### 1. Advanced Error Handling

```typescript
const { createUser } = useUsers();

const handleCreateUser = async (data: CreateUserInput) => {
  try {
    await createUser(data);
    
    toast.success('Kullanıcı başarıyla oluşturuldu', {
      description: `${data.name} kullanıcısı sisteme eklendi`,
    });
    
    router.push('/admin/users');
  } catch (error) {
    if (error instanceof Error) {
      if (error.message.includes('email')) {
        toast.error('Email Hatası', {
          description: 'Bu email adresi zaten kullanımda',
        });
      } else {
        toast.error('Kullanıcı Oluşturulamadı', {
          description: error.message,
        });
      }
    } else {
      toast.error('Beklenmeyen Hata', {
        description: 'Lütfen tekrar deneyiniz',
      });
    }
    
    console.error('User creation error:', error);
  }
};
```

### 2. Real-time User Status

```typescript
import { useEffect } from 'react';
import { useUserStore } from '@/features/users';

const UserStatusIndicator = ({ userId }: { userId: string }) => {
  const { updateUser } = useUserStore();
  const [isOnline, setIsOnline] = useState(false);

  useEffect(() => {
    // WebSocket connection for real-time status
    const ws = new WebSocket(`${process.env.NEXT_PUBLIC_WS_URL}/users/${userId}/status`);
    
    ws.onmessage = (event) => {
      const { type, data } = JSON.parse(event.data);
      
      if (type === 'status_change') {
        setIsOnline(data.isOnline);
        updateUser(userId, { 
          lastSeenAt: new Date(data.lastSeenAt),
        });
      }
    };

    return () => ws.close();
  }, [userId, updateUser]);

  return (
    <div className="flex items-center gap-2">
      <div 
        className={`w-2 h-2 rounded-full ${
          isOnline ? 'bg-green-500' : 'bg-gray-300'
        }`} 
      />
      <span className="text-xs text-muted-foreground">
        {isOnline ? 'Çevrimiçi' : 'Çevrimdışı'}
      </span>
    </div>
  );
};
```

### 3. Bulk Operations

```typescript
const UserManagement = () => {
  const { users, bulkUpdateRole, bulkBan, bulkDelete } = useUsers();
  const [selectedUsers, setSelectedUsers] = useState<string[]>([]);

  const handleBulkRoleUpdate = async (newRole: UserRole) => {
    try {
      await bulkUpdateRole(selectedUsers, newRole);
      toast.success(`${selectedUsers.length} kullanıcının rolü güncellendi`);
      setSelectedUsers([]);
    } catch (error) {
      toast.error('Toplu rol güncellemesi başarısız');
    }
  };

  const handleBulkBan = async () => {
    const result = await confirmDialog({
      title: 'Toplu Ban',
      description: `${selectedUsers.length} kullanıcıyı banlamak istediğinize emin misiniz?`,
    });

    if (result) {
      try {
        await bulkBan(selectedUsers, {
          reason: 'Toplu ban işlemi',
          expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000), // 7 gün
        });
        toast.success(`${selectedUsers.length} kullanıcı banlandı`);
        setSelectedUsers([]);
      } catch (error) {
        toast.error('Toplu ban işlemi başarısız');
      }
    }
  };

  return (
    <div>
      {selectedUsers.length > 0 && (
        <div className="mb-4 p-4 bg-muted rounded-lg">
          <div className="flex items-center justify-between">
            <span>{selectedUsers.length} kullanıcı seçildi</span>
            <div className="flex gap-2">
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline" size="sm">
                    Rol Değiştir
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                  {Object.values(UserRole).map((role) => (
                    <DropdownMenuItem
                      key={role}
                      onClick={() => handleBulkRoleUpdate(role)}
                    >
                      {role}
                    </DropdownMenuItem>
                  ))}
                </DropdownMenuContent>
              </DropdownMenu>
              
              <Button 
                variant="destructive" 
                size="sm"
                onClick={handleBulkBan}
              >
                Banla
              </Button>
            </div>
          </div>
        </div>
      )}
      
      <UserList
        users={users}
        selectable={true}
        selectedUsers={selectedUsers}
        onSelectionChange={setSelectedUsers}
      />
    </div>
  );
};
```

### 4. Permission-based UI

```typescript
import { useAuth } from '@/hooks/use-auth';

const UserActions = ({ user }: { user: User }) => {
  const { hasPermission } = useAuth();
  
  const canEditUser = hasPermission('user.edit') && 
                      (user.role !== UserRole.ADMIN || hasPermission('admin.manage'));
  
  const canBanUser = hasPermission('user.ban') && 
                     user.role !== UserRole.ADMIN;
  
  const canDeleteUser = hasPermission('user.delete') && 
                        user.role !== UserRole.ADMIN;

  return (
    <div className="flex gap-2">
      <Button variant="outline" size="sm">
        Görüntüle
      </Button>
      
      {canEditUser && (
        <Button variant="outline" size="sm">
          Düzenle
        </Button>
      )}
      
      {canBanUser && (
        <Button 
          variant={user.banned ? "default" : "destructive"} 
          size="sm"
        >
          {user.banned ? 'Ban Kaldır' : 'Banla'}
        </Button>
      )}
      
      {canDeleteUser && (
        <Button variant="destructive" size="sm">
          Sil
        </Button>
      )}
    </div>
  );
};
```

### 5. Advanced Filtering

```typescript
const UserFilters = ({ filters, onFiltersChange }: UserFiltersProps) => {
  const [dateRange, setDateRange] = useState<DateRange>({
    from: filters.dateRange?.start,
    to: filters.dateRange?.end,
  });

  const handleDateRangeChange = (range: DateRange) => {
    setDateRange(range);
    
    if (range.from && range.to) {
      onFiltersChange({
        ...filters,
        dateRange: {
          start: range.from,
          end: range.to,
        },
      });
    } else {
      const { dateRange, ...restFilters } = filters;
      onFiltersChange(restFilters);
    }
  };

  return (
    <Card className="p-4">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div>
          <Label htmlFor="search">Arama</Label>
          <Input
            id="search"
            placeholder="Ad veya email..."
            value={filters.search || ''}
            onChange={(e) => onFiltersChange({
              ...filters,
              search: e.target.value || undefined,
            })}
          />
        </div>
        
        <div>
          <Label htmlFor="role">Rol</Label>
          <Select
            value={filters.role || ''}
            onValueChange={(value) => onFiltersChange({
              ...filters,
              role: value as UserRole || undefined,
            })}
          >
            <SelectTrigger>
              <SelectValue placeholder="Rol seçin" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="">Tümü</SelectItem>
              {Object.values(UserRole).map((role) => (
                <SelectItem key={role} value={role}>
                  {role}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        
        <div>
          <Label htmlFor="status">Durum</Label>
          <Select
            value={
              filters.banned === true ? 'banned' : 
              filters.banned === false ? 'active' : ''
            }
            onValueChange={(value) => {
              const banned = value === 'banned' ? true : 
                            value === 'active' ? false : undefined;
              onFiltersChange({
                ...filters,
                banned,
              });
            }}
          >
            <SelectTrigger>
              <SelectValue placeholder="Durum seçin" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="">Tümü</SelectItem>
              <SelectItem value="active">Aktif</SelectItem>
              <SelectItem value="banned">Banlı</SelectItem>
            </SelectContent>
          </Select>
        </div>
        
        <div>
          <Label>Kayıt Tarihi</Label>
          <DateRangePicker
            date={dateRange}
            onDateChange={handleDateRangeChange}
          />
        </div>
      </div>
      
      <div className="flex justify-end mt-4">
        <Button 
          variant="outline" 
          onClick={() => {
            onFiltersChange({});
            setDateRange({});
          }}
        >
          Filtreleri Temizle
        </Button>
      </div>
    </Card>
  );
};
```

Bu dokümantasyon, Users feature'ının tüm yönlerini kapsamlı bir şekilde açıklar ve geliştiricilerin feature'ı etkili bir şekilde kullanmalarını sağlar. Hem temel kullanım hem de gelişmiş senaryolar için örnekler içerir.
