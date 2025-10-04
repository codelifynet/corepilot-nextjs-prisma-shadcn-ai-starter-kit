# Dashboard Feature Documentation

## Feature Overview

### Purpose and Scope

The Dashboard feature serves as the central monitoring and analytics hub for the CorePilot platform. It provides real-time system metrics, business intelligence, and performance indicators through an intuitive and visually appealing interface. This feature is designed for administrators, system operators, and business stakeholders who need comprehensive insights into platform health, user activity, and business performance.

**Key Responsibilities:**
- Real-time system resource monitoring (CPU, RAM, Storage, Network)
- Business metrics visualization and analytics
- Performance tracking and alerting
- System health status reporting
- Interactive data visualization with charts and graphs

**Target Users:**
- System Administrators
- DevOps Engineers
- Business Analysts
- Platform Managers

**Business Value:**
- Proactive system monitoring and issue detection
- Data-driven decision making through comprehensive analytics
- Improved operational efficiency through centralized monitoring
- Enhanced user experience through performance optimization insights

## Architecture Components

### Constants Documentation

**Purpose**: The constants module provides centralized configuration for dashboard data, styling, and behavior consistency across all dashboard components.

**Location**: `/src/features/overview/dashboard/constants/index.ts`

**Key Constants:**

#### MOCK_DASHBOARD_STATS
```typescript
export const MOCK_DASHBOARD_STATS = {
  totalUsers: 12543,
  totalOrders: 8924,
  revenue: 245678,
  growth: 12.5
}
```
- **Purpose**: Provides sample business metrics for development and testing
- **Usage**: Used in business metrics cards and analytics components

#### SYSTEM_DATA
```typescript
export const SYSTEM_DATA = {
  cpu: { usage: 45, cores: 8, temperature: 65 },
  ram: { used: 8.2, total: 16, percentage: 51 },
  storage: { used: 256, total: 512, percentage: 50 },
  network: { upload: 125, download: 890 }
}
```
- **Purpose**: System resource monitoring data structure
- **Usage**: Powers system resource cards and monitoring widgets

#### CHART_COLORS
```typescript
export const CHART_COLORS = {
  primary: "#3B82F6",
  success: "#10B981",
  warning: "#F59E0B",
  danger: "#EF4444",
  purple: "#8B5CF6",
  pink: "#EC4899"
}
```
- **Purpose**: Consistent color scheme for charts and visualizations
- **Usage**: Applied across all chart components for visual consistency

#### PERFORMANCE_DATA
- **Purpose**: Mock performance metrics for charts and analytics
- **Categories**: Revenue trends, user growth, system performance, network traffic
- **Usage**: Feeds various chart components with realistic data patterns

### Types Documentation

**Location**: `/src/features/overview/dashboard/types/dashboard.types.ts`

#### Core Types

**DashboardStats**
```typescript
export interface DashboardStats {
  totalUsers: number;
  totalOrders: number;
  revenue: number;
  growth: number;
}
```
- **Purpose**: Main business metrics structure
- **Usage**: Business metrics cards and KPI displays

**ChartData**
```typescript
export interface ChartData {
  name: string;
  value: number;
  fill?: string;
}
```
- **Purpose**: Standard data structure for chart components
- **Usage**: All chart visualizations (pie, area, radar, scatter)

**SystemStats**
```typescript
export interface SystemStats {
  cpu: SystemMetricData;
  ram: SystemMetricData;
  storage: SystemMetricData;
  network: NetworkData;
}
```
- **Purpose**: System resource monitoring data structure
- **Usage**: System resource cards and monitoring widgets

#### API Types

**CreateDashboardInput**
```typescript
export interface CreateDashboardInput {
  name: string;
  description?: string;
  isDefault?: boolean;
  widgets: CreateDashboardWidgetInput[];
}
```
- **Purpose**: Dashboard creation API request structure
- **Usage**: Dashboard management and configuration

**DashboardResponse**
```typescript
export interface DashboardResponse {
  id: string;
  name: string;
  description?: string;
  isDefault: boolean;
  widgets: DashboardWidgetData[];
  createdAt: Date;
  updatedAt: Date;
}
```
- **Purpose**: Dashboard API response structure
- **Usage**: Dashboard data fetching and display

#### Utility Types

**SystemMetricData**
```typescript
export interface SystemMetricData {
  used: number;
  total: number;
  percentage: number;
  status?: 'normal' | 'warning' | 'critical';
}
```
- **Purpose**: Standardized system metric structure
- **Usage**: System monitoring components

### Components Documentation

**Location**: `/src/features/overview/dashboard/components/`

#### Core Components

**SystemResourceCard**
- **Purpose**: Displays system resource metrics with visual indicators
- **Props**: `title`, `subtitle`, `percentage`, `data`, `icon`, `iconColor`, `details`
- **Features**: 
  - Pie chart visualization using Recharts
  - Gradient backgrounds with hover effects
  - Responsive design with glass morphism styling
  - Dark mode support
- **Usage**: CPU, RAM, Storage, and Network monitoring

**SystemInfoCard**
- **Purpose**: Shows system information and status indicators
- **Features**: Status badges, system details, uptime tracking
- **Styling**: Card-based layout with status color coding

**PerformanceChart**
- **Purpose**: Displays performance metrics in various chart formats
- **Chart Types**: Line charts, area charts, bar charts
- **Features**: Interactive tooltips, responsive containers, animation effects

**DashboardChart**
- **Purpose**: Generic chart component for data visualization
- **Supported Charts**: Pie, Doughnut, Line, Bar, Area
- **Features**: Customizable colors, legends, tooltips

**ActionCard**
- **Purpose**: Interactive cards for dashboard actions and quick access
- **Features**: Hover effects, icon integration, click handlers

**AlertCard**
- **Purpose**: System alerts and notification display
- **Features**: Alert severity levels, dismissible notifications, timestamp display

#### Skeleton Components

**Location**: `/src/features/overview/dashboard/components/skeletons.tsx`

All components have corresponding skeleton loaders:
- `StatsCardSkeleton`: Business metrics loading state
- `SystemResourceCardSkeleton`: System resource loading state
- `SystemInfoCardSkeleton`: System info loading state
- `PerformanceChartSkeleton`: Chart loading state
- `ActionCardSkeleton`: Action card loading state
- `AlertCardSkeleton`: Alert card loading state

**Features**:
- Gradient shimmer animations
- Consistent sizing with actual components
- Dark mode support
- Smooth loading transitions

### Views Documentation

**Location**: `/src/features/overview/dashboard/views/DashboardView.tsx`

#### DashboardView Component

**Purpose**: Main dashboard page component that orchestrates all dashboard sections and data flow.

**Structure**:
1. **Business Metrics Section**: KPI cards showing key business indicators
2. **System Resources Section**: Real-time system monitoring cards
3. **Performance Charts Section**: Various chart visualizations
4. **System Information Section**: Detailed system status and information
5. **Actions Section**: Quick action cards for common tasks
6. **Alerts Section**: System alerts and notifications

**State Management**:
- Loading states for each section
- Error handling for data fetching
- Responsive layout adjustments

**Data Flow**:
- Uses custom hooks for data fetching (`useBusinessMetrics`, `useSystemStats`)
- Implements skeleton loading states during data fetch
- Handles error states and retry mechanisms

**User Interactions**:
- Interactive charts with hover effects
- Clickable action cards
- Dismissible alerts
- Responsive navigation

### Hooks Documentation

**Location**: `/src/features/overview/dashboard/hooks/useDashboard.ts`

#### Custom Hooks

**useSystemStats**
```typescript
const useSystemStats = () => {
  return useQuery({
    queryKey: dashboardQueryKeys.systemStats(),
    queryFn: getSystemStats,
    refetchInterval: 30000, // 30 seconds
    staleTime: 15000 // 15 seconds
  });
};
```
- **Purpose**: Fetches real-time system resource data
- **Parameters**: None
- **Returns**: `{ data: SystemStats, isLoading: boolean, error: Error }`
- **Features**: Auto-refresh every 30 seconds, optimistic updates

**useBusinessMetrics**
```typescript
const useBusinessMetrics = () => {
  return useQuery({
    queryKey: dashboardQueryKeys.businessMetrics(),
    queryFn: getBusinessMetrics,
    staleTime: 300000 // 5 minutes
  });
};
```
- **Purpose**: Fetches business performance metrics
- **Returns**: `{ data: DashboardStats, isLoading: boolean, error: Error }`
- **Features**: Longer cache time for business data

**useDashboards**
- **Purpose**: Manages dashboard configurations and layouts
- **Features**: CRUD operations, caching, optimistic updates

**useAlerts**
- **Purpose**: Manages system alerts and notifications
- **Features**: Real-time updates, alert dismissal, severity filtering

#### Query Keys
```typescript
export const dashboardQueryKeys = {
  all: ['dashboard'] as const,
  systemStats: () => [...dashboardQueryKeys.all, 'systemStats'] as const,
  businessMetrics: () => [...dashboardQueryKeys.all, 'businessMetrics'] as const,
  dashboards: () => [...dashboardQueryKeys.all, 'dashboards'] as const,
  alerts: () => [...dashboardQueryKeys.all, 'alerts'] as const
};
```

## Services and API

### Service Layer

**Location**: `/src/features/overview/dashboard/services/dashboard.service.ts`

#### DashboardService Class

**Purpose**: Centralized business logic and data access layer for dashboard operations.

**Architecture**: Singleton pattern with dependency injection support.

#### CRUD Operations

**getDashboard**
```typescript
static async getDashboard(id: string): Promise<DashboardResponse>
```
- **Purpose**: Retrieves a specific dashboard by ID
- **Parameters**: `id: string` - Dashboard identifier
- **Returns**: Complete dashboard data with widgets
- **Error Handling**: Throws `NotFoundError` if dashboard doesn't exist

**getDashboards**
```typescript
static async getDashboards(filters?: DashboardFilters): Promise<DashboardResponse[]>
```
- **Purpose**: Lists all dashboards with optional filtering
- **Parameters**: `filters?: DashboardFilters` - Optional filtering criteria
- **Returns**: Array of dashboard summaries
- **Features**: Pagination, sorting, search capabilities

**createDashboard**
```typescript
static async createDashboard(data: CreateDashboardInput): Promise<DashboardResponse>
```
- **Purpose**: Creates a new dashboard configuration
- **Parameters**: `data: CreateDashboardInput` - Dashboard creation data
- **Returns**: Created dashboard with generated ID
- **Validation**: Validates input using Zod schemas

**updateDashboard**
```typescript
static async updateDashboard(id: string, data: UpdateDashboardInput): Promise<DashboardResponse>
```
- **Purpose**: Updates existing dashboard configuration
- **Parameters**: `id: string`, `data: UpdateDashboardInput`
- **Returns**: Updated dashboard data
- **Features**: Partial updates, optimistic locking

**deleteDashboard**
```typescript
static async deleteDashboard(id: string): Promise<void>
```
- **Purpose**: Removes a dashboard configuration
- **Parameters**: `id: string` - Dashboard identifier
- **Features**: Soft delete with audit trail

#### Business Logic

**getSystemStats**
- **Purpose**: Aggregates system resource data from multiple sources
- **Data Sources**: System APIs, monitoring services, cached metrics
- **Processing**: Calculates percentages, status indicators, trends

**getBusinessMetrics**
- **Purpose**: Compiles business performance indicators
- **Data Sources**: Analytics APIs, database aggregations, external services
- **Processing**: Revenue calculations, growth rates, comparative analysis

### API Endpoints

#### Standard REST API Structure

```typescript
// Dashboard Management
GET    /api/dashboard           // List dashboards with filters
POST   /api/dashboard           // Create new dashboard
GET    /api/dashboard/[id]      // Get specific dashboard
PUT    /api/dashboard/[id]      // Update dashboard
DELETE /api/dashboard/[id]      // Delete dashboard

// System Metrics
GET    /api/dashboard/system    // Get system resource data
GET    /api/dashboard/metrics   // Get business metrics
GET    /api/dashboard/alerts    // Get system alerts

// Statistics
GET    /api/dashboard/stats     // Get dashboard usage statistics
```

#### API Response Formats

**Success Response**
```typescript
{
  success: true,
  data: T,
  meta?: {
    total?: number,
    page?: number,
    limit?: number
  }
}
```

**Error Response**
```typescript
{
  success: false,
  error: {
    code: string,
    message: string,
    details?: any
  }
}
```

## Data Models and Schemas

### Prisma Models

**Dashboard Model**
```prisma
model Dashboard {
  id          String   @id @default(cuid())
  name        String
  description String?
  isDefault   Boolean  @default(false)
  widgets     DashboardWidget[]
  createdAt   DateTime @default(now())
  updatedAt   DateTime @updatedAt
  
  @@map("dashboards")
}
```

**DashboardWidget Model**
```prisma
model DashboardWidget {
  id           String    @id @default(cuid())
  dashboardId  String
  dashboard    Dashboard @relation(fields: [dashboardId], references: [id], onDelete: Cascade)
  type         String
  title        String
  config       Json
  position     Json
  createdAt    DateTime  @default(now())
  updatedAt    DateTime  @updatedAt
  
  @@map("dashboard_widgets")
}
```

### Zod Schemas

**Dashboard Validation**
```typescript
export const createDashboardSchema = z.object({
  name: z.string().min(1).max(100),
  description: z.string().max(500).optional(),
  isDefault: z.boolean().optional(),
  widgets: z.array(createDashboardWidgetSchema)
});
```

**Widget Validation**
```typescript
export const createDashboardWidgetSchema = z.object({
  type: z.enum(['chart', 'metric', 'table', 'alert']),
  title: z.string().min(1).max(100),
  config: z.record(z.any()),
  position: z.object({
    x: z.number().min(0),
    y: z.number().min(0),
    width: z.number().min(1),
    height: z.number().min(1)
  })
});
```

**System Stats Validation**
```typescript
export const systemStatsSchema = z.object({
  cpu: systemMetricSchema,
  ram: systemMetricSchema,
  storage: systemMetricSchema,
  network: networkDataSchema
});
```

## Dependencies and Integration

### Internal Dependencies

**Shared Components**
- `/src/components/ui/*` - ShadcnUI components (Card, Button, Badge)
- `/src/components/core-pilot-ui/*` - Custom reusable components
- `/src/components/layout/*` - Layout components

**Shared Utilities**
- `/src/lib/utils.ts` - General utility functions
- `/src/lib/prisma.ts` - Database client
- `/src/hooks/*` - Global custom hooks

**Authentication Integration**
- Requires authenticated user session
- Role-based access control for admin features
- Permission checks for sensitive metrics

### External Dependencies

**Core Libraries**
```json
{
  "recharts": "^2.8.0",           // Chart visualization
  "@tanstack/react-query": "^5.0.0", // Data fetching and caching
  "framer-motion": "^10.0.0",     // Animations
  "lucide-react": "^0.400.0",     // Icons
  "date-fns": "^2.30.0"           // Date utilities
}
```

**Chart Dependencies**
- **Recharts**: Primary charting library for all visualizations
- **Chart.js**: Alternative charting solution for specific use cases
- **D3.js**: Advanced data manipulation and custom visualizations

**UI Dependencies**
- **Radix UI**: Accessible component primitives
- **TailwindCSS**: Utility-first styling framework
- **next-themes**: Dark mode support

### Configuration Requirements

**Environment Variables**
```env
# Database
DATABASE_URL="postgresql://..."

# Monitoring APIs
SYSTEM_MONITOR_API_URL="https://..."
SYSTEM_MONITOR_API_KEY="..."

# Analytics
ANALYTICS_API_URL="https://..."
ANALYTICS_API_KEY="..."
```

## Usage Examples

### Implementation Examples

#### Basic Dashboard Usage
```tsx
import { DashboardView } from '@/features/overview/dashboard/views';

export default function DashboardPage() {
  return (
    <div className="container mx-auto p-6">
      <DashboardView />
    </div>
  );
}
```

#### Custom Dashboard Component
```tsx
import { 
  SystemResourceCard, 
  PerformanceChart,
  useSystemStats,
  useBusinessMetrics 
} from '@/features/overview/dashboard';

export function CustomDashboard() {
  const { data: systemStats, isLoading: systemLoading } = useSystemStats();
  const { data: businessMetrics, isLoading: businessLoading } = useBusinessMetrics();

  if (systemLoading || businessLoading) {
    return <DashboardSkeleton />;
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      <SystemResourceCard
        title="CPU Usage"
        subtitle="Processing Power"
        percentage={systemStats?.cpu.percentage || 0}
        data={systemStats?.cpu.chartData || []}
        icon={<Cpu className="w-6 h-6 text-white" />}
        iconColor="from-blue-500 to-blue-600"
        details={[
          { label: "Cores", value: `${systemStats?.cpu.cores || 0}` },
          { label: "Temperature", value: `${systemStats?.cpu.temperature || 0}°C` }
        ]}
      />
      
      <PerformanceChart
        title="Revenue Trend"
        data={businessMetrics?.revenueData || []}
        height={300}
      />
    </div>
  );
}
```

#### Hook Usage Examples
```tsx
// System monitoring
const { data: systemStats, isLoading, error, refetch } = useSystemStats();

// Business metrics with custom options
const { data: metrics } = useBusinessMetrics({
  refetchInterval: 60000, // 1 minute
  staleTime: 30000 // 30 seconds
});

// Dashboard management
const { 
  data: dashboards, 
  createDashboard, 
  updateDashboard, 
  deleteDashboard 
} = useDashboards();

// Create new dashboard
const handleCreateDashboard = async () => {
  try {
    await createDashboard({
      name: "Custom Dashboard",
      description: "My custom dashboard",
      widgets: [
        {
          type: "metric",
          title: "Total Users",
          config: { metric: "users" },
          position: { x: 0, y: 0, width: 4, height: 2 }
        }
      ]
    });
  } catch (error) {
    console.error("Failed to create dashboard:", error);
  }
};
```

#### Service Usage Examples
```tsx
import { DashboardService } from '@/features/overview/dashboard/services';

// Server-side data fetching
export async function getServerSideProps() {
  try {
    const dashboards = await DashboardService.getDashboards();
    const systemStats = await DashboardService.getSystemStats();
    
    return {
      props: {
        dashboards,
        systemStats
      }
    };
  } catch (error) {
    return {
      props: {
        dashboards: [],
        systemStats: null
      }
    };
  }
}

// API route implementation
export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const filters = {
      search: searchParams.get('search'),
      isDefault: searchParams.get('isDefault') === 'true'
    };
    
    const dashboards = await DashboardService.getDashboards(filters);
    
    return Response.json({
      success: true,
      data: dashboards
    });
  } catch (error) {
    return Response.json({
      success: false,
      error: {
        code: 'FETCH_ERROR',
        message: error.message
      }
    }, { status: 500 });
  }
}
```

## Development Notes

### Known Issues

1. **Chart Performance**: Large datasets (>1000 points) may cause rendering delays
   - **Workaround**: Implement data pagination or virtualization
   - **Status**: Planned for optimization in v2.0

2. **Real-time Updates**: WebSocket connections may drop during network issues
   - **Workaround**: Automatic reconnection with exponential backoff
   - **Status**: Monitoring implementation needed

3. **Mobile Responsiveness**: Complex charts may not display optimally on small screens
   - **Workaround**: Simplified mobile chart variants
   - **Status**: In progress

4. **Memory Usage**: Long-running dashboard sessions may accumulate memory
   - **Workaround**: Periodic component unmounting and remounting
   - **Status**: Investigating root cause

### Performance Considerations

1. **Data Caching**: Implement aggressive caching for system metrics
2. **Chart Optimization**: Use canvas rendering for large datasets
3. **Bundle Size**: Lazy load chart components to reduce initial bundle
4. **API Rate Limiting**: Implement request throttling for real-time updates

### Browser Compatibility

- **Chrome**: Full support (recommended)
- **Firefox**: Full support
- **Safari**: Full support with minor chart animation differences
- **Edge**: Full support
- **Mobile Browsers**: Responsive design with simplified interactions

### Future Enhancements

#### Planned Improvements (v2.0)
1. **Custom Widget Builder**: Drag-and-drop dashboard customization
2. **Advanced Filtering**: Complex query builder for data filtering
3. **Export Functionality**: PDF/Excel export for reports
4. **Real-time Collaboration**: Multi-user dashboard editing
5. **Advanced Analytics**: Machine learning insights and predictions

#### Technical Debt Items
1. **Type Safety**: Improve type coverage for chart configurations
2. **Error Boundaries**: Implement granular error handling
3. **Testing Coverage**: Increase unit and integration test coverage
4. **Documentation**: Add interactive component documentation
5. **Accessibility**: Enhance screen reader support for charts

#### Optimization Opportunities
1. **Code Splitting**: Implement route-based code splitting
2. **Image Optimization**: Optimize chart rendering performance
3. **Database Queries**: Optimize complex aggregation queries
4. **Caching Strategy**: Implement Redis caching for frequently accessed data
5. **CDN Integration**: Serve static assets from CDN

### Development Workflow

1. **Feature Development**: Follow FDD methodology for new features
2. **Testing**: Write unit tests for all new components and hooks
3. **Documentation**: Update documentation with any API changes
4. **Performance**: Profile components before and after changes
5. **Accessibility**: Test with screen readers and keyboard navigation

### Deployment Considerations

1. **Environment Configuration**: Ensure all environment variables are set
2. **Database Migrations**: Run Prisma migrations before deployment
3. **Monitoring**: Set up application performance monitoring
4. **Logging**: Configure structured logging for debugging
5. **Backup**: Implement regular database backups for dashboard configurations