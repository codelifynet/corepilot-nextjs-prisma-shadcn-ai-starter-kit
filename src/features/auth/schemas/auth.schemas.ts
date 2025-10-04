import { z } from "zod";

// Login Schema
export const loginSchema = z.object({
	email: z
		.string()
		.min(1, "E-posta adresi gereklidir")
		.email("Geçerli bir e-posta adresi girin"),
	password: z
		.string()
		.min(1, "Şifre gereklidir")
		.min(8, "Şifre en az 8 karakter olmalıdır"),
	rememberMe: z.boolean().optional(),
});

// Signup Schema
export const signupSchema = z
	.object({
		name: z
			.string()
			.min(1, "Ad soyad gereklidir")
			.min(2, "Ad soyad en az 2 karakter olmalıdır")
			.max(50, "Ad soyad en fazla 50 karakter olabilir"),
		email: z
			.string()
			.min(1, "E-posta adresi gereklidir")
			.email("Geçerli bir e-posta adresi girin"),
		password: z
			.string()
			.min(1, "Şifre gereklidir")
			.min(8, "Şifre en az 8 karakter olmalıdır")
			.regex(/[a-z]/, "Şifre en az bir küçük harf içermelidir")
			.regex(/[A-Z]/, "Şifre en az bir büyük harf içermelidir")
			.regex(/[0-9]/, "Şifre en az bir rakam içermelidir")
			.regex(/[^A-Za-z0-9]/, "Şifre en az bir özel karakter içermelidir"),
		confirmPassword: z.string().min(1, "Şifre tekrarı gereklidir"),
		agreeTerms: z
			.boolean()
			.optional()
			.refine((val) => val === true, "Kullanım koşullarını kabul etmelisiniz"),
	})
	.refine((data) => data.password === data.confirmPassword, {
		message: "Şifreler eşleşmiyor",
		path: ["confirmPassword"],
	});

// Forgot Password Schema
export const forgotPasswordSchema = z.object({
	email: z
		.string()
		.min(1, "E-posta adresi gereklidir")
		.email("Geçerli bir e-posta adresi girin"),
});

// Reset Password Schema
export const resetPasswordSchema = z
	.object({
		password: z
			.string()
			.min(1, "Şifre gereklidir")
			.min(8, "Şifre en az 8 karakter olmalıdır")
			.regex(/[a-z]/, "Şifre en az bir küçük harf içermelidir")
			.regex(/[A-Z]/, "Şifre en az bir büyük harf içermelidir")
			.regex(/[0-9]/, "Şifre en az bir rakam içermelidir")
			.regex(/[^A-Za-z0-9]/, "Şifre en az bir özel karakter içermelidir"),
		confirmPassword: z.string().min(1, "Şifre tekrarı gereklidir"),
		token: z.string().min(1, "Geçersiz sıfırlama bağlantısı"),
	})
	.refine((data) => data.password === data.confirmPassword, {
		message: "Şifreler eşleşmiyor",
		path: ["confirmPassword"],
	});

// Email Verification Schema
export const emailVerificationSchema = z.object({
	token: z.string().min(1, "Doğrulama token'ı gereklidir"),
});

// Social Auth Schema
export const socialAuthSchema = z.object({
	provider: z.enum(["google", "github"], {
		message: "Geçersiz sosyal medya sağlayıcısı",
	}),
	callbackURL: z.string().url("Geçersiz callback URL").optional(),
});

// User Profile Update Schema
export const userProfileSchema = z.object({
	name: z
		.string()
		.min(2, "Ad soyad en az 2 karakter olmalıdır")
		.max(50, "Ad soyad en fazla 50 karakter olabilir")
		.optional(),
	avatar: z.string().url("Geçersiz avatar URL").optional(),
});

// Change Password Schema
export const changePasswordSchema = z
	.object({
		currentPassword: z.string().min(1, "Mevcut şifre gereklidir"),
		newPassword: z
			.string()
			.min(8, "Yeni şifre en az 8 karakter olmalıdır")
			.regex(/[a-z]/, "Şifre en az bir küçük harf içermelidir")
			.regex(/[A-Z]/, "Şifre en az bir büyük harf içermelidir")
			.regex(/[0-9]/, "Şifre en az bir rakam içermelidir")
			.regex(/[^A-Za-z0-9]/, "Şifre en az bir özel karakter içermelidir"),
		confirmNewPassword: z.string().min(1, "Yeni şifre tekrarı gereklidir"),
	})
	.refine((data) => data.newPassword === data.confirmNewPassword, {
		message: "Yeni şifreler eşleşmiyor",
		path: ["confirmNewPassword"],
	})
	.refine((data) => data.currentPassword !== data.newPassword, {
		message: "Yeni şifre mevcut şifreden farklı olmalıdır",
		path: ["newPassword"],
	});

// Type exports
export type LoginFormData = z.infer<typeof loginSchema>;
export type SignupFormData = z.infer<typeof signupSchema>;
export type ForgotPasswordFormData = z.infer<typeof forgotPasswordSchema>;
export type ResetPasswordFormData = z.infer<typeof resetPasswordSchema>;
export type EmailVerificationData = z.infer<typeof emailVerificationSchema>;
export type SocialAuthData = z.infer<typeof socialAuthSchema>;
export type UserProfileData = z.infer<typeof userProfileSchema>;
export type ChangePasswordData = z.infer<typeof changePasswordSchema>;
