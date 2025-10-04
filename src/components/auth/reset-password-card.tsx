"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { authClient } from "@/lib/auth-client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import { toast } from "sonner";
import { Icon } from "@iconify/react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";

interface PasswordStrength {
	score: number;
	feedback: string[];
	color: string;
}

export function ResetPasswordCard() {
	const [password, setPassword] = useState("");
	const [confirmPassword, setConfirmPassword] = useState("");
	const [isLoading, setIsLoading] = useState(false);
	const [showPassword, setShowPassword] = useState(false);
	const [showConfirmPassword, setShowConfirmPassword] = useState(false);
	const [resetComplete, setResetComplete] = useState(false);
	const searchParams = useSearchParams();
	const token = searchParams.get("token");

	useEffect(() => {
		if (!token) {
			toast.error("Geçersiz sıfırlama bağlantısı", {
				description: "Lütfen e-postanızdaki bağlantıya tıklayın.",
			});
		}
	}, [token]);

	const checkPasswordStrength = (password: string): PasswordStrength => {
		let score = 0;
		const feedback: string[] = [];

		if (password.length >= 8) score += 1;
		else feedback.push("En az 8 karakter");

		if (/[a-z]/.test(password)) score += 1;
		else feedback.push("Küçük harf");

		if (/[A-Z]/.test(password)) score += 1;
		else feedback.push("Büyük harf");

		if (/[0-9]/.test(password)) score += 1;
		else feedback.push("Rakam");

		if (/[^A-Za-z0-9]/.test(password)) score += 1;
		else feedback.push("Özel karakter");

		let color = "bg-red-500";
		if (score >= 3) color = "bg-yellow-500";
		if (score >= 4) color = "bg-green-500";

		return { score, feedback, color };
	};

	const passwordStrength = checkPasswordStrength(password);

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();

		if (!token) {
			toast.error("Geçersiz sıfırlama bağlantısı");
			return;
		}

		if (password !== confirmPassword) {
			toast.error("Şifreler eşleşmiyor");
			return;
		}

		if (passwordStrength.score < 3) {
			toast.error("Lütfen daha güçlü bir şifre seçin");
			return;
		}

		setIsLoading(true);

		try {
			await authClient.resetPassword({
				newPassword: password,
			});

			setResetComplete(true);
			toast.success("Şifre başarıyla sıfırlandı!", {
				description: "Yeni şifrenizle giriş yapabilirsiniz.",
			});
		} catch (error) {
			console.error("Reset password error:", error);
			toast.error("Şifre sıfırlanamadı", {
				description: "Bir hata oluştu. Lütfen tekrar deneyin.",
			});
		} finally {
			setIsLoading(false);
		}
	};

	if (resetComplete) {
		return (
			<motion.div
				initial={{ opacity: 0, y: 20, scale: 0.95 }}
				animate={{ opacity: 1, y: 0, scale: 1 }}
				transition={{ duration: 0.5, ease: "easeOut" }}
			>
				<Card className="border-0 shadow-2xl bg-white/80 dark:bg-gray-900/80 backdrop-blur-xl">
					<CardHeader className="space-y-4 text-center">
						<motion.div
							initial={{ opacity: 0, scale: 0.8 }}
							animate={{ opacity: 1, scale: 1 }}
							transition={{ delay: 0.2, duration: 0.5 }}
							className="mx-auto w-16 h-16 bg-gradient-to-r from-green-500 to-green-600 rounded-full flex items-center justify-center"
						>
							<Icon icon="lucide:check" className="w-8 h-8 text-white" />
						</motion.div>
						<motion.div
							initial={{ opacity: 0, y: -20 }}
							animate={{ opacity: 1, y: 0 }}
							transition={{ delay: 0.3, duration: 0.5 }}
						>
							<CardTitle className="text-2xl font-bold text-gray-900 dark:text-white">
								Şifre Sıfırlandı
							</CardTitle>
							<CardDescription className="text-gray-600 dark:text-gray-400 mt-4">
								Şifreniz başarıyla değiştirildi. Artık yeni şifrenizle giriş
								yapabilirsiniz.
							</CardDescription>
						</motion.div>
					</CardHeader>

					<CardContent>
						<motion.div
							initial={{ opacity: 0, y: 20 }}
							animate={{ opacity: 1, y: 0 }}
							transition={{ delay: 0.4, duration: 0.5 }}
						>
							<Button
								asChild
								className="w-full h-12 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-medium shadow-lg hover:shadow-xl transition-all duration-300"
							>
								<Link href="/auth/login">
									<Icon icon="lucide:log-in" className="mr-2 h-5 w-5" />
									Giriş Yap
								</Link>
							</Button>
						</motion.div>
					</CardContent>
				</Card>
			</motion.div>
		);
	}

	if (!token) {
		return (
			<motion.div
				initial={{ opacity: 0, y: 20, scale: 0.95 }}
				animate={{ opacity: 1, y: 0, scale: 1 }}
				transition={{ duration: 0.5, ease: "easeOut" }}
			>
				<Card className="border-0 shadow-2xl bg-white/80 dark:bg-gray-900/80 backdrop-blur-xl">
					<CardHeader className="space-y-4 text-center">
						<motion.div
							initial={{ opacity: 0, scale: 0.8 }}
							animate={{ opacity: 1, scale: 1 }}
							transition={{ delay: 0.2, duration: 0.5 }}
							className="mx-auto w-16 h-16 bg-gradient-to-r from-red-500 to-red-600 rounded-full flex items-center justify-center"
						>
							<Icon icon="lucide:x" className="w-8 h-8 text-white" />
						</motion.div>
						<motion.div
							initial={{ opacity: 0, y: -20 }}
							animate={{ opacity: 1, y: 0 }}
							transition={{ delay: 0.3, duration: 0.5 }}
						>
							<CardTitle className="text-2xl font-bold text-gray-900 dark:text-white">
								Geçersiz Bağlantı
							</CardTitle>
							<CardDescription className="text-gray-600 dark:text-gray-400 mt-4">
								Bu şifre sıfırlama bağlantısı geçersiz veya süresi dolmuş.
								Lütfen yeni bir şifre sıfırlama isteği gönderin.
							</CardDescription>
						</motion.div>
					</CardHeader>

					<CardContent className="space-y-4">
						<motion.div
							initial={{ opacity: 0, y: 20 }}
							animate={{ opacity: 1, y: 0 }}
							transition={{ delay: 0.4, duration: 0.5 }}
							className="flex flex-col space-y-3"
						>
							<Button
								asChild
								className="w-full h-12 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-medium"
							>
								<Link href="/auth/forgot-password">
									<Icon icon="lucide:key" className="mr-2 h-4 w-4" />
									Yeni Şifre Sıfırlama İsteği
								</Link>
							</Button>

							<Button variant="outline" asChild className="w-full h-12">
								<Link href="/auth/login">
									<Icon icon="lucide:log-in" className="mr-2 h-4 w-4" />
									Giriş Sayfasına Dön
								</Link>
							</Button>
						</motion.div>
					</CardContent>
				</Card>
			</motion.div>
		);
	}

	return (
		<motion.div
			initial={{ opacity: 0, y: 20, scale: 0.95 }}
			animate={{ opacity: 1, y: 0, scale: 1 }}
			transition={{ duration: 0.5, ease: "easeOut" }}
		>
			<Card className="border-0 shadow-2xl bg-white/80 dark:bg-gray-900/80 backdrop-blur-xl">
				<CardHeader className="space-y-4 text-center">
					<motion.div
						initial={{ opacity: 0, scale: 0.8 }}
						animate={{ opacity: 1, scale: 1 }}
						transition={{ delay: 0.2, duration: 0.5 }}
						className="mx-auto w-16 h-16 bg-gradient-to-r from-blue-500 to-blue-600 rounded-full flex items-center justify-center"
					>
						<Icon icon="lucide:shield" className="w-8 h-8 text-white" />
					</motion.div>
					<motion.div
						initial={{ opacity: 0, y: -20 }}
						animate={{ opacity: 1, y: 0 }}
						transition={{ delay: 0.3, duration: 0.5 }}
					>
						<CardTitle className="text-3xl font-bold bg-gradient-to-r from-gray-900 to-gray-600 dark:from-white dark:to-gray-300 bg-clip-text text-transparent">
							Yeni Şifre Oluştur
						</CardTitle>
						<CardDescription className="text-lg text-gray-600 dark:text-gray-400 mt-2">
							Hesabınız için yeni ve güçlü bir şifre oluşturun
						</CardDescription>
					</motion.div>
				</CardHeader>

				<CardContent className="space-y-6">
					<motion.form
						onSubmit={handleSubmit}
						className="space-y-5"
						initial={{ opacity: 0, y: 20 }}
						animate={{ opacity: 1, y: 0 }}
						transition={{ delay: 0.4, duration: 0.5 }}
					>
						<div className="space-y-2">
							<Label
								htmlFor="password"
								className="text-sm font-medium text-gray-700 dark:text-gray-300"
							>
								Yeni Şifre
							</Label>
							<div className="relative">
								<Icon
									icon="lucide:lock"
									className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400"
								/>
								<Input
									id="password"
									type={showPassword ? "text" : "password"}
									placeholder="Güçlü bir şifre oluşturun"
									value={password}
									onChange={(e) => setPassword(e.target.value)}
									required
									disabled={isLoading}
									className="pl-10 pr-10 h-12 border-gray-200 dark:border-gray-700 focus:border-blue-500 focus:ring-blue-500"
								/>
								<Button
									type="button"
									variant="ghost"
									size="sm"
									onClick={() => setShowPassword(!showPassword)}
									className="absolute right-1 top-1/2 transform -translate-y-1/2 h-8 w-8 p-0 hover:bg-gray-100 dark:hover:bg-gray-800"
								>
									<Icon
										icon={showPassword ? "lucide:eye-off" : "lucide:eye"}
										className="w-4 h-4 text-gray-400"
									/>
								</Button>
							</div>

							{/* Password Strength Indicator */}
							{password && (
								<div className="space-y-2">
									<div className="flex space-x-1">
										{[1, 2, 3, 4, 5].map((level) => (
											<div
												key={level}
												className={`h-1 flex-1 rounded ${
													level <= passwordStrength.score
														? passwordStrength.color
														: "bg-gray-200 dark:bg-gray-700"
												}`}
											/>
										))}
									</div>
									{passwordStrength.feedback.length > 0 && (
										<p className="text-xs text-gray-500 dark:text-gray-400">
											Eksik: {passwordStrength.feedback.join(", ")}
										</p>
									)}
								</div>
							)}
						</div>

						<div className="space-y-2">
							<Label
								htmlFor="confirmPassword"
								className="text-sm font-medium text-gray-700 dark:text-gray-300"
							>
								Şifre Tekrar
							</Label>
							<div className="relative">
								<Icon
									icon="lucide:lock"
									className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400"
								/>
								<Input
									id="confirmPassword"
									type={showConfirmPassword ? "text" : "password"}
									placeholder="Şifrenizi tekrar girin"
									value={confirmPassword}
									onChange={(e) => setConfirmPassword(e.target.value)}
									required
									disabled={isLoading}
									className="pl-10 pr-10 h-12 border-gray-200 dark:border-gray-700 focus:border-blue-500 focus:ring-blue-500"
								/>
								<Button
									type="button"
									variant="ghost"
									size="sm"
									onClick={() => setShowConfirmPassword(!showConfirmPassword)}
									className="absolute right-1 top-1/2 transform -translate-y-1/2 h-8 w-8 p-0 hover:bg-gray-100 dark:hover:bg-gray-800"
								>
									<Icon
										icon={showConfirmPassword ? "lucide:eye-off" : "lucide:eye"}
										className="w-4 h-4 text-gray-400"
									/>
								</Button>
							</div>
							{confirmPassword && password !== confirmPassword && (
								<p className="text-xs text-red-500">Şifreler eşleşmiyor</p>
							)}
						</div>

						<motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
							<Button
								type="submit"
								className="w-full h-12 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-medium shadow-lg hover:shadow-xl transition-all duration-300"
								disabled={
									isLoading ||
									passwordStrength.score < 3 ||
									password !== confirmPassword
								}
							>
								{isLoading ? (
									<>
										<Icon
											icon="lucide:loader-2"
											className="mr-2 h-5 w-5 animate-spin"
										/>
										Şifre sıfırlanıyor...
									</>
								) : (
									<>
										<Icon icon="lucide:shield-check" className="mr-2 h-5 w-5" />
										Şifreyi Sıfırla
									</>
								)}
							</Button>
						</motion.div>
					</motion.form>

					<motion.div
						initial={{ opacity: 0 }}
						animate={{ opacity: 1 }}
						transition={{ delay: 0.5, duration: 0.5 }}
						className="text-center pt-4"
					>
						<p className="text-sm text-gray-600 dark:text-gray-400">
							Şifrenizi hatırladınız mı?{" "}
							<Link
								href="/auth/login"
								className="text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300 font-medium transition-colors"
							>
								Giriş yapın
							</Link>
						</p>
					</motion.div>
				</CardContent>
			</Card>
		</motion.div>
	);
}
