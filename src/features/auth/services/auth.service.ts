import { authClient, verifyEmail } from "@/lib/auth-client";
import type {
	LoginCredentials,
	SignupCredentials,
	ForgotPasswordRequest,
	ResetPasswordRequest,
	SocialAuthProvider,
	AuthResult,
} from "../types";
import { AUTH_ERRORS, AUTH_SUCCESS, REDIRECT_URLS } from "../constants";

/**
 * Authentication Service
 * Handles all authentication-related operations
 */
export class AuthService {
	/**
	 * Sign in with email and password
	 */
	async signIn(credentials: LoginCredentials): Promise<AuthResult> {
		try {
			const result = await authClient.signIn.email({
				email: credentials.email.trim().toLowerCase(),
				password: credentials.password,
			});

			if (result.data) {
				return {
					success: true,
					user: result.data.user,
					token: result.data.token,
					message: AUTH_SUCCESS.LOGIN_SUCCESS,
				};
			}

			return {
				success: false,
				error: AUTH_ERRORS.INVALID_CREDENTIALS,
			};
		} catch (error) {
			console.error("SignIn error:", error);
			return {
				success: false,
				error: AUTH_ERRORS.INVALID_CREDENTIALS,
			};
		}
	}

	/**
	 * Sign up with email and password
	 */
	async signUp(credentials: SignupCredentials): Promise<AuthResult> {
		try {
			const result = await authClient.signUp.email({
				email: credentials.email.trim().toLowerCase(),
				password: credentials.password,
				name: credentials.name.trim(),
			});

			if (result.data) {
				return {
					success: true,
					user: result.data.user,
					message: AUTH_SUCCESS.SIGNUP_SUCCESS,
				};
			}

			return {
				success: false,
				error: "Hesap oluşturulamadı",
			};
		} catch (error) {
			console.error("SignUp error:", error);

			// Check for specific error types
			if (error instanceof Error) {
				if (
					error.message.includes("already exists") ||
					error.message.includes("unique")
				) {
					return {
						success: false,
						error: AUTH_ERRORS.EMAIL_ALREADY_EXISTS,
					};
				}
			}

			return {
				success: false,
				error: "Hesap oluşturulamadı",
			};
		}
	}

	/**
	 * Sign out current user
	 */
	async signOut(): Promise<AuthResult> {
		try {
			await authClient.signOut();

			return {
				success: true,
				message: AUTH_SUCCESS.LOGOUT_SUCCESS,
			};
		} catch (error) {
			console.error("SignOut error:", error);
			return {
				success: false,
				error: "Çıkış yapılamadı",
			};
		}
	}

	/**
	 * Get current session
	 */
	async getSession() {
		try {
			const session = await authClient.getSession();
			return session;
		} catch (error) {
			console.error("GetSession error:", error);
			return null;
		}
	}

	/**
	 * Request password reset
	 */
	async forgotPassword(request: ForgotPasswordRequest): Promise<AuthResult> {
		try {
			await authClient.forgetPassword({
				email: request.email.trim().toLowerCase(),
				redirectTo: REDIRECT_URLS.AFTER_LOGIN,
			});

			return {
				success: true,
				message: AUTH_SUCCESS.PASSWORD_RESET_SENT,
			};
		} catch (error) {
			console.error("ForgotPassword error:", error);
			return {
				success: false,
				error: "Şifre sıfırlama e-postası gönderilemedi",
			};
		}
	}

	/**
	 * Reset password with token
	 */
	async resetPassword(request: ResetPasswordRequest): Promise<AuthResult> {
		try {
			await authClient.resetPassword({
				newPassword: request.password,
			});

			return {
				success: true,
				message: AUTH_SUCCESS.PASSWORD_RESET_SUCCESS,
			};
		} catch (error) {
			console.error("ResetPassword error:", error);
			return {
				success: false,
				error: AUTH_ERRORS.INVALID_TOKEN,
			};
		}
	}

	/**
	 * Social authentication
	 */
	async socialAuth(provider: SocialAuthProvider): Promise<AuthResult> {
		try {
			await authClient.signIn.social({
				provider: provider.provider,
				callbackURL: provider.callbackURL || REDIRECT_URLS.AFTER_LOGIN,
			});

			return {
				success: true,
				message: AUTH_SUCCESS.LOGIN_SUCCESS,
			};
		} catch (error) {
			console.error("SocialAuth error:", error);
			return {
				success: false,
				error: `${provider.provider} ile giriş yapılamadı`,
			};
		}
	}

	/**
	 * Verify email with token
	 */
	async verifyEmail(token: string): Promise<AuthResult> {
		try {
			// Use Better Auth's verifyEmail method
			const result = await verifyEmail({
				query: { token },
			});

			if (result.error) {
				return {
					success: false,
					error: result.error.message || AUTH_ERRORS.INVALID_TOKEN,
				};
			}

			return {
				success: true,
				message: AUTH_SUCCESS.EMAIL_VERIFIED,
			};
		} catch (error) {
			console.error("VerifyEmail error:", error);
			return {
				success: false,
				error: AUTH_ERRORS.INVALID_TOKEN,
			};
		}
	}

	/**
	 * Check if user is authenticated
	 */
	async isAuthenticated(): Promise<boolean> {
		try {
			const session = await this.getSession();
			return !!session?.data?.user;
		} catch {
			return false;
		}
	}

	/**
	 * Refresh session
	 */
	async refreshSession(): Promise<AuthResult> {
		try {
			// Implementation depends on Better Auth refresh mechanism
			const session = await this.getSession();

			if (!session?.data) {
				return {
					success: false,
					error: AUTH_ERRORS.SESSION_EXPIRED,
				};
			}

			return {
				success: true,
				user: session.data.user,
			};
		} catch (error) {
			console.error("RefreshSession error:", error);
			return {
				success: false,
				error: AUTH_ERRORS.SESSION_EXPIRED,
			};
		}
	}
}

// Export singleton instance
export const authService = new AuthService();
