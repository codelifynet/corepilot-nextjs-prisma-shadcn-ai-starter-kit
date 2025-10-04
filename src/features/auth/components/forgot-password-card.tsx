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
import { toast } from "sonner";
import { Icon } from "@iconify/react";
import Link from "next/link";

export function ForgotPasswordCard() {
	const [email, setEmail] = useState("");
	const [isLoading, setIsLoading] = useState(false);
	const [emailSent, setEmailSent] = useState(false);

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		setIsLoading(true);

		try {
			await authClient.forgetPassword({
				email,
				redirectTo: "/auth/reset-password",
			});

			setEmailSent(true);
			toast.success("Şifre sıfırlama e-postası gönderildi!", {
				description: "E-posta kutunuzu kontrol edin.",
			});
		} catch (error) {
			console.error("Forgot password error:", error);
			toast.error("E-posta gönderilemedi", {
				description: "Bir hata oluştu. Lütfen tekrar deneyin.",
			});
		} finally {
			setIsLoading(false);
		}
	};

	if (emailSent) {
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
								E-posta Gönderildi
							</CardTitle>
							<CardDescription className="text-gray-600 dark:text-gray-400 mt-4 leading-relaxed">
								<strong>{email}</strong> adresine şifre sıfırlama e-postası
								gönderdik.
								<br />
								E-posta kutunuzu kontrol edin ve talimatları takip edin.
							</CardDescription>
						</motion.div>
					</CardHeader>

					<CardContent className="space-y-4">
						<motion.div
							initial={{ opacity: 0, y: 20 }}
							animate={{ opacity: 1, y: 0 }}
							transition={{ delay: 0.4, duration: 0.5 }}
							className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-4"
						>
							<div className="flex items-start space-x-3">
								<Icon
									icon="lucide:info"
									className="w-5 h-5 text-blue-600 dark:text-blue-400 mt-0.5"
								/>
								<div className="text-sm text-blue-800 dark:text-blue-200">
									<p className="font-medium mb-1">E-postayı göremiyorsanız:</p>
									<ul className="space-y-1 text-blue-700 dark:text-blue-300">
										<li>• Spam/istenmeyen e-posta klasörünü kontrol edin</li>
										<li>• E-posta adresinizi doğru yazdığınızdan emin olun</li>
										<li>• Birkaç dakika bekleyin, e-posta gecikebilir</li>
									</ul>
								</div>
							</div>
						</motion.div>

						<motion.div
							initial={{ opacity: 0, y: 20 }}
							animate={{ opacity: 1, y: 0 }}
							transition={{ delay: 0.5, duration: 0.5 }}
							className="flex flex-col space-y-3"
						>
							<Button
								variant="outline"
								onClick={() => {
									setEmailSent(false);
									setEmail("");
								}}
								className="w-full h-12"
							>
								<Icon icon="lucide:arrow-left" className="mr-2 h-4 w-4" />
								Farklı e-posta adresi dene
							</Button>

							<Button variant="ghost" asChild className="w-full h-12">
								<Link href="/auth/login">
									<Icon icon="lucide:log-in" className="mr-2 h-4 w-4" />
									Giriş sayfasına dön
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
						<Icon icon="lucide:key" className="w-8 h-8 text-white" />
					</motion.div>
					<motion.div
						initial={{ opacity: 0, y: -20 }}
						animate={{ opacity: 1, y: 0 }}
						transition={{ delay: 0.3, duration: 0.5 }}
					>
						<CardTitle className="text-3xl font-bold bg-gradient-to-r from-gray-900 to-gray-600 dark:from-white dark:to-gray-300 bg-clip-text text-transparent">
							Şifremi Unuttum
						</CardTitle>
						<CardDescription className="text-lg text-gray-600 dark:text-gray-400 mt-2">
							E-posta adresinizi girin, size şifre sıfırlama bağlantısı
							gönderelim
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
										Gönderiliyor...
									</>
								) : (
									<>
										<Icon icon="lucide:send" className="mr-2 h-5 w-5" />
										Şifre Sıfırlama E-postası Gönder
									</>
								)}
							</Button>
						</motion.div>
					</motion.form>

					<motion.div
						initial={{ opacity: 0 }}
						animate={{ opacity: 1 }}
						transition={{ delay: 0.5, duration: 0.5 }}
						className="text-center pt-4 space-y-3"
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
