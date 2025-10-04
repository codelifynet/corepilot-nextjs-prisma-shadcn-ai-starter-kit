// API Request Types
export interface LoginRequest {
	email: string;
	password: string;
}

export interface SignupRequest {
	name: string;
	email: string;
	password: string;
}

export interface ForgotPasswordApiRequest {
	email: string;
	redirectTo?: string;
}

export interface ResetPasswordApiRequest {
	token: string;
	newPassword: string;
}

export interface SocialAuthRequest {
	provider: "google" | "github";
	callbackURL?: string;
}

// API Response Types
export interface AuthApiResponse<T = any> {
	success: boolean;
	data?: T;
	error?: string;
	message?: string;
}

export interface LoginResponse {
	user: {
		id: string;
		email: string;
		name?: string;
		avatar?: string;
		emailVerified: boolean;
	};
	token: string;
	expiresAt: string;
}

export interface SignupResponse {
	user: {
		id: string;
		email: string;
		name?: string;
	};
	message: string;
	requiresVerification: boolean;
}

export interface SessionResponse {
	user: {
		id: string;
		email: string;
		name?: string;
		avatar?: string;
		emailVerified: boolean;
	};
	session: {
		id: string;
		expiresAt: string;
	};
}

export interface ForgotPasswordResponse {
	message: string;
	email: string;
}

export interface ResetPasswordResponse {
	message: string;
	success: boolean;
}

export interface VerificationResponse {
	success: boolean;
	message: string;
	user?: {
		id: string;
		email: string;
		emailVerified: boolean;
	};
}
