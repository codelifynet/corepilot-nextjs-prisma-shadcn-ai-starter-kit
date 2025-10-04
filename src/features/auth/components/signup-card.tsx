"use client";

import { useState } from "react";
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
import { Separator } from "@/components/ui/separator";
import { Checkbox } from "@/components/ui/checkbox";
import { toast } from "sonner";
import { Icon } from "@iconify/react";
import Link from "next/link";

interface PasswordStrength {
	score: number;
	feedback: string[];
	color: string;
}

export function SignupCard() {
	const [name, setName] = useState("");
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [confirmPassword, setConfirmPassword] = useState("");
	const [isLoading, setIsLoading] = useState(false);
	const [showPassword, setShowPassword] = useState(false);
	const [showConfirmPassword, setShowConfirmPassword] = useState(false);
	const [agreeTerms, setAgreeTerms] = useState(false);

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

		if (!agreeTerms) {
			toast.error("Kullanım koşullarını kabul etmelisiniz");
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
			await authClient.signUp.email({
				email,
				password,
				name,
			});

			toast.success("Hesap başarıyla oluşturuldu!", {
				description: "Giriş yapabilirsiniz.",
			});

			// Redirect to login
			window.location.href = "/auth/login";
		} catch (error) {
			console.error("Signup error:", error);
			toast.error("Hesap oluşturulamadı", {
				description: "Bir hata oluştu. Lütfen tekrar deneyin.",
			});
		} finally {
			setIsLoading(false);
		}
	};

	const handleGoogleSignUp = async () => {
		try {
			await authClient.signIn.social({
				provider: "google",
				callbackURL: "/admin/overview",
			});
		} catch (error) {
			console.error("Google sign up error:", error);
			toast.error("Google ile kayıt olunamadı");
		}
	};

	const handleGithubSignUp = async () => {
		try {
			await authClient.signIn.social({
				provider: "github",
				callbackURL: "/admin/overview",
			});
		} catch (error) {
			console.error("GitHub sign up error:", error);
			toast.error("GitHub ile kayıt olunamadı");
		}
	};

	return (
		<motion.div
			initial={{ opacity: 0, y: 20, scale: 0.95 }}
			animate={{ opacity: 1, y: 0, scale: 1 }}
			transition={{ duration: 0.5, ease: "easeOut" }}
		>
			<Card className="border-0 shadow-2xl bg-white/80 dark:bg-gray-900/80 backdrop-blur-xl">
				<CardHeader className="space-y-4 text-center pb-2">
					<motion.div
						initial={{ opacity: 0, y: -20 }}
						animate={{ opacity: 1, y: 0 }}
						transition={{ delay: 0.2, duration: 0.5 }}
					>
						<CardTitle className="text-3xl font-bold bg-gradient-to-r from-gray-900 to-gray-600 dark:from-white dark:to-gray-300 bg-clip-text text-transparent">
							Hesap Oluşturun
						</CardTitle>
						<CardDescription className="text-lg text-gray-600 dark:text-gray-400 mt-2">
							CorePilot ailesine katılın
						</CardDescription>
					</motion.div>

					{/* Social Login Buttons */}
					<motion.div
						initial={{ opacity: 0, y: 20 }}
						animate={{ opacity: 1, y: 0 }}
						transition={{ delay: 0.3, duration: 0.5 }}
						className="flex flex-col space-y-3 pt-4"
					>
						<Button
							variant="outline"
							onClick={handleGoogleSignUp}
							className="w-full h-12 text-sm font-medium border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-800 transition-all duration-300"
						>
							<Icon icon="logos:google-icon" className="w-5 h-5 mr-3" />
							Google ile devam et
						</Button>
						<Button
							variant="outline"
							onClick={handleGithubSignUp}
							className="w-full h-12 text-sm font-medium border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-800 transition-all duration-300"
						>
							<Icon icon="logos:github-icon" className="w-5 h-5 mr-3" />
							GitHub ile devam et
						</Button>
					</motion.div>

					<motion.div
						initial={{ opacity: 0 }}
						animate={{ opacity: 1 }}
						transition={{ delay: 0.4, duration: 0.5 }}
						className="relative"
					>
						<Separator className="my-6" />
						<div className="absolute inset-0 flex items-center justify-center">
							<span className="bg-white dark:bg-gray-900 px-3 text-sm text-gray-500 dark:text-gray-400">
								veya e-posta ile
							</span>
						</div>
					</motion.div>
				</CardHeader>

				<CardContent className="space-y-6 pt-6">
					<motion.form
						onSubmit={handleSubmit}
						className="space-y-5"
						initial={{ opacity: 0, y: 20 }}
						animate={{ opacity: 1, y: 0 }}
						transition={{ delay: 0.5, duration: 0.5 }}
					>
						<div className="space-y-2">
							<Label
								htmlFor="name"
								className="text-sm font-medium text-gray-700 dark:text-gray-300"
							>
								Ad Soyad
							</Label>
							<div className="relative">
								<Icon
									icon="lucide:user"
									className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400"
								/>
								<Input
									id="name"
									type="text"
									placeholder="Adınız ve soyadınız"
									value={name}
									onChange={(e) => setName(e.target.value)}
									required
									disabled={isLoading}
									className="pl-10 h-12 border-gray-200 dark:border-gray-700 focus:border-blue-500 focus:ring-blue-500"
								/>
							</div>
						</div>

						<div className="space-y-2">
							<Label
								htmlFor="email"
								className="text-sm font-medium text-gray-700 dark:text-gray-300"
							>
								E-posta Adresi
							</Label>
							<div className="relative">
								<Icon
									icon="lucide:mail"
									className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400"
								/>
								<Input
									id="email"
									type="email"
									placeholder="ornek@email.com"
									value={email}
									onChange={(e) => setEmail(e.target.value)}
									required
									disabled={isLoading}
									className="pl-10 h-12 border-gray-200 dark:border-gray-700 focus:border-blue-500 focus:ring-blue-500"
								/>
							</div>
						</div>

						<div className="space-y-2">
							<Label
								htmlFor="password"
								className="text-sm font-medium text-gray-700 dark:text-gray-300"
							>
								Şifre
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

						<div className="flex items-center space-x-2 pt-2">
							<Checkbox
								id="terms"
								checked={agreeTerms}
								onCheckedChange={(checked) => setAgreeTerms(checked as boolean)}
							/>
							<Label
								htmlFor="terms"
								className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed"
							>
								<Link
									href="/legal/terms"
									className="text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300"
								>
									Kullanım Koşulları
								</Link>{" "}
								ve{" "}
								<Link
									href="/legal/privacy"
									className="text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300"
								>
									Gizlilik Politikası
								</Link>
								'nı kabul ediyorum
							</Label>
						</div>

						<motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
							<Button
								type="submit"
								className="w-full h-12 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-medium shadow-lg hover:shadow-xl transition-all duration-300"
								disabled={isLoading || !agreeTerms}
							>
								{isLoading ? (
									<>
										<Icon
											icon="lucide:loader-2"
											className="mr-2 h-5 w-5 animate-spin"
										/>
										Hesap oluşturuluyor...
									</>
								) : (
									<>
										<Icon icon="lucide:user-plus" className="mr-2 h-5 w-5" />
										Hesap Oluştur
									</>
								)}
							</Button>
						</motion.div>
					</motion.form>

					<motion.div
						initial={{ opacity: 0 }}
						animate={{ opacity: 1 }}
						transition={{ delay: 0.6, duration: 0.5 }}
						className="text-center pt-4"
					>
						<p className="text-sm text-gray-600 dark:text-gray-400">
							Zaten hesabınız var mı?{" "}
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
