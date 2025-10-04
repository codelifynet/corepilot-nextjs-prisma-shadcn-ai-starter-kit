"use client";

import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import type {
	LoginCredentials,
	SignupCredentials,
	ForgotPasswordRequest,
	ResetPasswordRequest,
} from "../types";
import {
	loginSchema,
	signupSchema,
	forgotPasswordSchema,
	resetPasswordSchema,
} from "../schemas";
import { authService } from "../services/index";

/**
 * Hook for login form
 */
export const useLoginForm = () => {
	const [isLoading, setIsLoading] = useState(false);
	const [error, setError] = useState<string | null>(null);

	const form = useForm<LoginCredentials>({
		resolver: zodResolver(loginSchema),
		defaultValues: {
			email: "",
			password: "",
			rememberMe: false,
		},
	});

	const onSubmit = async (data: LoginCredentials) => {
		try {
			setIsLoading(true);
			setError(null);

			const result = await authService.signIn(data);

			if (!result.success) {
				setError(result.error || "İşlem başarısız oldu");
				return;
			}

			// Redirect will be handled by the auth service
		} catch {
			setError("Beklenmeyen bir hata oluştu");
		} finally {
			setIsLoading(false);
		}
	};

	return {
		form,
		onSubmit: form.handleSubmit(onSubmit),
		isLoading,
		error,
		setError,
	};
};

/**
 * Hook for signup form
 */
export const useSignupForm = () => {
	const [isLoading, setIsLoading] = useState(false);
	const [error, setError] = useState<string | null>(null);

	const form = useForm<SignupCredentials>({
		resolver: zodResolver(signupSchema),
		defaultValues: {
			name: "",
			email: "",
			password: "",
			confirmPassword: "",
			agreeTerms: false,
		},
	});

	const onSubmit = async (data: SignupCredentials) => {
		try {
			setIsLoading(true);
			setError(null);

			const result = await authService.signUp(data);

			if (!result.success) {
				setError(result.error || "İşlem başarısız oldu");
				return;
			}

			// Success message or redirect will be handled by the component
		} catch {
			setError("Beklenmeyen bir hata oluştu");
		} finally {
			setIsLoading(false);
		}
	};

	return {
		form,
		onSubmit: form.handleSubmit(onSubmit),
		isLoading,
		error,
		setError,
	};
};

/**
 * Hook for forgot password form
 */
export const useForgotPasswordForm = () => {
	const [isLoading, setIsLoading] = useState(false);
	const [error, setError] = useState<string | null>(null);
	const [success, setSuccess] = useState(false);

	const form = useForm<ForgotPasswordRequest>({
		resolver: zodResolver(forgotPasswordSchema),
		defaultValues: {
			email: "",
		},
	});

	const onSubmit = async (data: ForgotPasswordRequest) => {
		try {
			setIsLoading(true);
			setError(null);
			setSuccess(false);

			const result = await authService.forgotPassword(data);

			if (!result.success) {
				setError(result.error || "İşlem başarısız oldu");
				return;
			}

			setSuccess(true);
		} catch {
			setError("Beklenmeyen bir hata oluştu");
		} finally {
			setIsLoading(false);
		}
	};

	return {
		form,
		onSubmit: form.handleSubmit(onSubmit),
		isLoading,
		error,
		success,
		setError,
	};
};

/**
 * Hook for reset password form
 */
export const useResetPasswordForm = () => {
	const [isLoading, setIsLoading] = useState(false);
	const [error, setError] = useState<string | null>(null);
	const [success, setSuccess] = useState(false);

	const form = useForm<ResetPasswordRequest>({
		resolver: zodResolver(resetPasswordSchema),
		defaultValues: {
			token: "",
			password: "",
			confirmPassword: "",
		},
	});

	const onSubmit = async (data: ResetPasswordRequest) => {
		try {
			setIsLoading(true);
			setError(null);
			setSuccess(false);

			const result = await authService.resetPassword(data);

			if (!result.success) {
				setError(result.error || "İşlem başarısız oldu");
				return;
			}

			setSuccess(true);
		} catch {
			setError("Beklenmeyen bir hata oluştu");
		} finally {
			setIsLoading(false);
		}
	};

	return {
		form,
		onSubmit: form.handleSubmit(onSubmit),
		isLoading,
		error,
		success,
		setError,
	};
};
