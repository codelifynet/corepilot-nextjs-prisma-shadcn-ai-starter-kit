# Auth Feature - CorePilot

## 🔐 Authentication System

Modern authentication system built with Better Auth, featuring social login, email verification, and password reset functionality.

## 📁 Feature Structure

```
auth/
├── views/                          # Page Components
│   ├── login-view.tsx             # Login page view
│   ├── signup-view.tsx            # Registration page view
│   ├── forgot-password-view.tsx   # Password reset request view
│   ├── reset-password-view.tsx    # New password creation view
│   ├── verification-view.tsx      # Email verification view
│   └── index.ts                   # Barrel exports
├── components/                     # Feature Components
│   ├── auth-layout-provider.tsx   # Main auth layout
│   ├── login-card.tsx             # Login form card
│   ├── signup-card.tsx            # Registration form card
│   ├── forgot-password-card.tsx   # Password reset card
│   ├── reset-password-card.tsx    # New password card
│   ├── verification-card.tsx      # Email verification card
│   └── index.ts                   # Barrel exports
├── hooks/                          # Auth Hooks
│   ├── use-auth.ts                # Authentication hook
│   ├── use-auth-form.ts           # Form handling hook
│   ├── use-password-strength.ts   # Password validation hook
│   └── index.ts                   # Barrel exports
├── services/                       # Business Logic
│   ├── auth.service.ts            # Authentication operations
│   ├── validation.service.ts      # Form validation
│   ├── social-auth.service.ts     # Social authentication
│   └── index.ts                   # Barrel exports
├── types/                          # TypeScript Definitions
│   ├── auth.types.ts              # Authentication types
│   ├── api.types.ts               # API request/response types
│   └── index.ts                   # Barrel exports
├── schemas/                        # Zod Validation Schemas
│   ├── auth.schemas.ts            # Authentication schemas
│   └── index.ts                   # Barrel exports
├── constants/                      # Auth Constants
│   ├── auth.constants.ts          # Authentication constants
│   └── index.ts                   # Barrel exports
└── docs/                          # Documentation
    └── README.md                  # Feature documentation
```

## 🎯 Features

### Authentication Methods
- **Email/Password**: Traditional email and password authentication
- **Social Login**: Google and GitHub OAuth integration
- **Magic Links**: Passwordless authentication (optional)

### Security Features
- **Password Strength**: Real-time password validation
- **Email Verification**: Required email verification for new accounts
- **Password Reset**: Secure password reset flow
- **Session Management**: Better Auth session handling

### User Experience
- **Modern Design**: Glassmorphism effects with smooth animations
- **Responsive**: Mobile-first responsive design
- **Dark Mode**: Full theme support
- **Loading States**: Smooth loading animations
- **Error Handling**: User-friendly error messages

## 🔗 Page Routes

| Page | Route | Component | Description |
|------|-------|-----------|-------------|
| Login | `/auth/login` | `LoginView` | User login page |
| Signup | `/auth/signup` | `SignupView` | User registration |
| Forgot Password | `/auth/forgot-password` | `ForgotPasswordView` | Password reset request |
| Reset Password | `/auth/reset-password` | `ResetPasswordView` | New password creation |
| Email Verification | `/auth/verify` | `VerificationView` | Email verification |

## 🛠️ Technical Stack

- **Better Auth**: Authentication framework
- **Prisma**: Database ORM
- **Zod**: Schema validation
- **Framer Motion**: Animations
- **React Hook Form**: Form handling
- **Tailwind CSS**: Styling
- **TypeScript**: Type safety

## 🚀 Usage Examples

### Using Auth Hook
```tsx
import { useAuth } from '@/features/auth/hooks';

export function UserProfile() {
  const { user, isLoading, signOut } = useAuth();

  if (isLoading) return <div>Loading...</div>;
  if (!user) return <div>Please login</div>;

  return (
    <div>
      <h1>Welcome, {user.name}</h1>
      <button onClick={signOut}>Sign Out</button>
    </div>
  );
}
```

### Using Auth Service
```tsx
import { authService } from '@/features/auth/services';

const handleLogin = async (email: string, password: string) => {
  try {
    const result = await authService.signIn({ email, password });
    if (result.success) {
      // Redirect to dashboard
    }
  } catch (error) {
    // Handle error
  }
};
```

## 📋 API Integration

### Authentication Endpoints
- `POST /api/auth/signin` - User login
- `POST /api/auth/signup` - User registration
- `POST /api/auth/signout` - User logout
- `POST /api/auth/forgot-password` - Password reset request
- `POST /api/auth/reset-password` - Password reset
- `GET /api/auth/verify-email` - Email verification

### Session Management
- `GET /api/auth/session` - Get current session
- `POST /api/auth/refresh` - Refresh session

## 🔧 Configuration

### Environment Variables
```bash
BETTER_AUTH_SECRET="your-secret-key"
BETTER_AUTH_URL="http://localhost:3000"
GOOGLE_CLIENT_ID="your-google-client-id"
GOOGLE_CLIENT_SECRET="your-google-client-secret"
GITHUB_CLIENT_ID="your-github-client-id"
GITHUB_CLIENT_SECRET="your-github-client-secret"
```

### Better Auth Setup
```typescript
export const auth = betterAuth({
  database: prismaAdapter(prisma),
  emailAndPassword: {
    enabled: true,
    requireEmailVerification: true,
  },
  socialProviders: {
    google: {
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    },
    github: {
      clientId: process.env.GITHUB_CLIENT_ID!,
      clientSecret: process.env.GITHUB_CLIENT_SECRET!,
    },
  },
});
```

## 🎨 Design System

### Color Scheme
- **Primary**: Blue gradient (from-blue-600 to-blue-700)
- **Background**: Gradient from slate-50 to blue-50
- **Cards**: Semi-transparent with backdrop blur
- **Text**: Gradient text for headings

### Animation Patterns
- **Page Enter**: opacity 0→1, y 20→0, scale 0.95→1
- **Card Hover**: scale 1.02
- **Button Press**: scale 0.98
- **Background**: Dynamic pattern changes every 5 seconds

## 📱 Responsive Breakpoints

- **Mobile**: 320px - 767px (single column)
- **Tablet**: 768px - 1023px (centered layout)
- **Desktop**: 1024px+ (max-width constraints)

## 🧪 Testing

### Unit Tests
- Authentication service functions
- Form validation logic
- Password strength calculator
- Social auth handlers

### Integration Tests
- Login/logout flow
- Registration process
- Password reset flow
- Email verification

## 🔄 Migration Guide

### From Old Auth System
1. Update route imports from `/login` to `/auth/login`
2. Replace old auth components with new feature components
3. Update authentication service calls
4. Migrate user session handling

### Breaking Changes
- Route structure changed from `/login` to `/auth/login`
- Component imports updated to feature-based structure
- Service interfaces standardized

---

*This documentation covers the Auth feature implementation in CorePilot v1.0*
