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
import { toast } from "sonner";
import { Icon } from "@iconify/react";
import Link from "next/link";

export function LoginCard() {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [isLoading, setIsLoading] = useState(false);
	const [showPassword, setShowPassword] = useState(false);

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		setIsLoading(true);

		try {
			const result = await authClient.signIn.email({
				email,
				password,
			});

			if (result.data) {
				toast.success("Başarıyla giriş yapıldı!", {
					description: "Yönetim paneline yönlendiriliyorsunuz...",
				});
				// Force a page refresh to ensure cookies are properly set
				window.location.href = "/admin/overview";
			} else {
				toast.error("Geçersiz e-posta veya şifre", {
					description: "Lütfen bilgilerinizi kontrol edin ve tekrar deneyin.",
				});
			}
		} catch (error) {
			console.error("Login error:", error);
			toast.error("Giriş yapılamadı", {
				description: "Bir hata oluştu. Lütfen tekrar deneyin.",
			});
		} finally {
			setIsLoading(false);
		}
	};

	const handleGoogleSignIn = async () => {
		try {
			await authClient.signIn.social({
				provider: "google",
				callbackURL: "/admin/overview",
			});
		} catch (error) {
			console.error("Google sign in error:", error);
			toast.error("Google ile giriş yapılamadı");
		}
	};

	const handleGithubSignIn = async () => {
		try {
			await authClient.signIn.social({
				provider: "github",
				callbackURL: "/admin/overview",
			});
		} catch (error) {
			console.error("GitHub sign in error:", error);
			toast.error("GitHub ile giriş yapılamadı");
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
							Hoş Geldiniz
						</CardTitle>
						<CardDescription className="text-lg text-gray-600 dark:text-gray-400 mt-2">
							Hesabınıza giriş yapın
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
							onClick={handleGoogleSignIn}
							className="w-full h-12 text-sm font-medium border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-800 transition-all duration-300"
						>
							<Icon icon="logos:google-icon" className="w-5 h-5 mr-3" />
							Google ile devam et
						</Button>
						<Button
							variant="outline"
							onClick={handleGithubSignIn}
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
									placeholder="Şifrenizi girin"
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
						</div>

						<div className="flex items-center justify-between text-sm">
							<Link
								href="/auth/forgot-password"
								className="text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300 font-medium transition-colors"
							>
								Şifremi unuttum
							</Link>
						</div>

						<motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
							<Button
								type="submit"
								className="w-full h-12 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-medium shadow-lg hover:shadow-xl transition-all duration-300"
								disabled={isLoading}
							>
								{isLoading ? (
									<>
										<Icon
											icon="lucide:loader-2"
											className="mr-2 h-5 w-5 animate-spin"
										/>
										Giriş yapılıyor...
									</>
								) : (
									<>
										<Icon icon="lucide:log-in" className="mr-2 h-5 w-5" />
										Giriş Yap
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
							Hesabınız yok mu?{" "}
							<Link
								href="/auth/signup"
								className="text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300 font-medium transition-colors"
							>
								Ücretsiz hesap oluşturun
							</Link>
						</p>
					</motion.div>
				</CardContent>
			</Card>
		</motion.div>
	);
}
