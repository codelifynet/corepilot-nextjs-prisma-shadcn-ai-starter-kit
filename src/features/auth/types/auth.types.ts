export interface User {
	id: string;
	email: string;
	name?: string;
	avatar?: string;
	emailVerified?: boolean;
	createdAt: Date;
	updatedAt: Date;
}

export interface AuthSession {
	user: User;
	token: string;
	expiresAt: Date;
}

export interface LoginCredentials {
	email: string;
	password: string;
	rememberMe?: boolean;
}

export interface SignupCredentials {
	name: string;
	email: string;
	password: string;
	confirmPassword: string;
	agreeTerms?: boolean;
}

export interface ForgotPasswordRequest {
	email: string;
}

export interface ResetPasswordRequest {
	token: string;
	password: string;
	confirmPassword: string;
}

export interface SocialAuthProvider {
	provider: "google" | "github";
	callbackURL?: string;
}

export interface AuthResult {
	success: boolean;
	user?: User;
	token?: string;
	error?: string;
	message?: string;
}

export interface PasswordStrength {
	score: number;
	feedback: string[];
	color: string;
	isValid: boolean;
}

export interface AuthFormErrors {
	email?: string;
	password?: string;
	confirmPassword?: string;
	name?: string;
	general?: string;
}

export interface AuthFormState {
	isLoading: boolean;
	errors: AuthFormErrors;
	isValid: boolean;
}
