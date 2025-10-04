// Auth Routes
export const AUTH_ROUTES = {
	LOGIN: "/auth/login",
	SIGNUP: "/auth/signup",
	FORGOT_PASSWORD: "/auth/forgot-password",
	RESET_PASSWORD: "/auth/reset-password",
	VERIFY_EMAIL: "/auth/verify",
	LOGOUT: "/auth/logout",
} as const;

// API Endpoints
export const AUTH_API_ENDPOINTS = {
	SIGNIN: "/api/auth/signin",
	SIGNUP: "/api/auth/signup",
	SIGNOUT: "/api/auth/signout",
	SESSION: "/api/auth/session",
	FORGOT_PASSWORD: "/api/auth/forgot-password",
	RESET_PASSWORD: "/api/auth/reset-password",
	VERIFY_EMAIL: "/api/auth/verify-email",
	REFRESH: "/api/auth/refresh",
	SOCIAL: "/api/auth/social",
} as const;

// Social Providers
export const SOCIAL_PROVIDERS = {
	GOOGLE: "google",
	GITHUB: "github",
} as const;

// Password Requirements
export const PASSWORD_REQUIREMENTS = {
	MIN_LENGTH: 8,
	MAX_LENGTH: 128,
	REQUIRE_LOWERCASE: true,
	REQUIRE_UPPERCASE: true,
	REQUIRE_NUMBERS: true,
	REQUIRE_SPECIAL_CHARS: true,
} as const;

// Password Strength Levels
export const PASSWORD_STRENGTH = {
	WEAK: {
		score: 1,
		label: "Zayıf",
		color: "bg-red-500",
		textColor: "text-red-600",
	},
	FAIR: {
		score: 2,
		label: "Orta",
		color: "bg-orange-500",
		textColor: "text-orange-600",
	},
	GOOD: {
		score: 3,
		label: "İyi",
		color: "bg-yellow-500",
		textColor: "text-yellow-600",
	},
	STRONG: {
		score: 4,
		label: "Güçlü",
		color: "bg-green-500",
		textColor: "text-green-600",
	},
	VERY_STRONG: {
		score: 5,
		label: "Çok Güçlü",
		color: "bg-green-600",
		textColor: "text-green-700",
	},
} as const;

// Session Configuration
export const SESSION_CONFIG = {
	EXPIRES_IN: 7 * 24 * 60 * 60 * 1000, // 7 days in milliseconds
	REFRESH_THRESHOLD: 24 * 60 * 60 * 1000, // 24 hours in milliseconds
	COOKIE_NAME: "session-token",
	COOKIE_OPTIONS: {
		httpOnly: true,
		secure: process.env.NODE_ENV === "production",
		sameSite: "lax" as const,
		path: "/",
	},
} as const;

// Form Field Names
export const FORM_FIELDS = {
	EMAIL: "email",
	PASSWORD: "password",
	CONFIRM_PASSWORD: "confirmPassword",
	NAME: "name",
	REMEMBER_ME: "rememberMe",
	AGREE_TERMS: "agreeTerms",
	TOKEN: "token",
} as const;

// Error Messages
export const AUTH_ERRORS = {
	INVALID_CREDENTIALS: "Geçersiz e-posta veya şifre",
	USER_NOT_FOUND: "Kullanıcı bulunamadı",
	EMAIL_ALREADY_EXISTS: "Bu e-posta adresi zaten kullanımda",
	INVALID_TOKEN: "Geçersiz veya süresi dolmuş token",
	EMAIL_NOT_VERIFIED: "E-posta adresi doğrulanmamış",
	PASSWORD_MISMATCH: "Şifreler eşleşmiyor",
	WEAK_PASSWORD: "Şifre yeterince güçlü değil",
	ACCOUNT_LOCKED: "Hesap geçici olarak kilitlenmiş",
	TOO_MANY_ATTEMPTS: "Çok fazla deneme. Lütfen daha sonra tekrar deneyin",
	SESSION_EXPIRED: "Oturum süresi dolmuş",
	UNAUTHORIZED: "Bu işlem için yetkiniz bulunmuyor",
	INTERNAL_ERROR: "Sunucu hatası. Lütfen daha sonra tekrar deneyin",
} as const;

// Success Messages
export const AUTH_SUCCESS = {
	LOGIN_SUCCESS: "Başarıyla giriş yapıldı",
	SIGNUP_SUCCESS: "Hesap başarıyla oluşturuldu",
	LOGOUT_SUCCESS: "Başarıyla çıkış yapıldı",
	PASSWORD_RESET_SENT: "Şifre sıfırlama e-postası gönderildi",
	PASSWORD_RESET_SUCCESS: "Şifre başarıyla sıfırlandı",
	EMAIL_VERIFIED: "E-posta adresi doğrulandı",
	PROFILE_UPDATED: "Profil başarıyla güncellendi",
} as const;

// Redirect URLs
export const REDIRECT_URLS = {
	AFTER_LOGIN: "/admin/overview",
	AFTER_LOGOUT: "/auth/login",
	AFTER_SIGNUP: "/auth/verify",
	AFTER_VERIFICATION: "/auth/login",
	UNAUTHORIZED: "/auth/login",
} as const;

// Feature Flags
export const FEATURE_FLAGS = {
	SOCIAL_LOGIN: true,
	EMAIL_VERIFICATION: true,
	PASSWORD_RESET: true,
	REMEMBER_ME: true,
	ACCOUNT_LOCKOUT: false,
	TWO_FACTOR_AUTH: false,
} as const;

// Validation Patterns
export const VALIDATION_PATTERNS = {
	EMAIL: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
	PASSWORD_LOWERCASE: /[a-z]/,
	PASSWORD_UPPERCASE: /[A-Z]/,
	PASSWORD_NUMBERS: /[0-9]/,
	PASSWORD_SPECIAL_CHARS: /[^A-Za-z0-9]/,
	NAME: /^[a-zA-ZçÇğĞıİöÖşŞüÜ\s]+$/,
} as const;

// Rate Limiting
export const RATE_LIMITS = {
	LOGIN_ATTEMPTS: {
		max: 5,
		windowMs: 15 * 60 * 1000, // 15 minutes
	},
	SIGNUP_ATTEMPTS: {
		max: 3,
		windowMs: 60 * 60 * 1000, // 1 hour
	},
	PASSWORD_RESET: {
		max: 3,
		windowMs: 60 * 60 * 1000, // 1 hour
	},
	EMAIL_VERIFICATION: {
		max: 5,
		windowMs: 60 * 60 * 1000, // 1 hour
	},
} as const;
