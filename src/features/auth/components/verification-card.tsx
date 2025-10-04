"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
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

export function VerificationCard() {
	const [isLoading, setIsLoading] = useState(false);
	const [isVerified, setIsVerified] = useState(false);
	const [verificationError, setVerificationError] = useState<string | null>(
		null,
	);
	const searchParams = useSearchParams();
	const token = searchParams.get("token");

	useEffect(() => {
		const verifyToken = async () => {
			if (!token) return;

			setIsLoading(true);
			try {
				// Simulate verification - replace with actual API call
				await new Promise((resolve) => setTimeout(resolve, 2000));

				setIsVerified(true);
				toast.success("E-posta başarıyla doğrulandı!", {
					description: "Artık hesabınızı tam olarak kullanabilirsiniz.",
				});
			} catch (error) {
				console.error("Email verification error:", error);
				setVerificationError(
					"E-posta doğrulama bağlantısı geçersiz veya süresi dolmuş.",
				);
				toast.error("E-posta doğrulanamadı");
			} finally {
				setIsLoading(false);
			}
		};

		verifyToken();
	}, [token]);

	if (isLoading && token) {
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
							<Icon
								icon="lucide:loader-2"
								className="w-8 h-8 text-white animate-spin"
							/>
						</motion.div>
						<motion.div
							initial={{ opacity: 0, y: -20 }}
							animate={{ opacity: 1, y: 0 }}
							transition={{ delay: 0.3, duration: 0.5 }}
						>
							<CardTitle className="text-2xl font-bold text-gray-900 dark:text-white">
								E-posta Doğrulanıyor
							</CardTitle>
							<CardDescription className="text-gray-600 dark:text-gray-400 mt-4">
								Lütfen bekleyin, e-posta adresiniz doğrulanıyor...
							</CardDescription>
						</motion.div>
					</CardHeader>
				</Card>
			</motion.div>
		);
	}

	if (isVerified) {
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
								E-posta Doğrulandı
							</CardTitle>
							<CardDescription className="text-gray-600 dark:text-gray-400 mt-4">
								Tebrikler! E-posta adresiniz başarıyla doğrulandı. Artık
								hesabınızı tam olarak kullanabilirsiniz.
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

	if (verificationError) {
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
								Doğrulama Başarısız
							</CardTitle>
							<CardDescription className="text-gray-600 dark:text-gray-400 mt-4">
								{verificationError}
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
								<Link href="/auth/signup">
									<Icon icon="lucide:user-plus" className="mr-2 h-4 w-4" />
									Yeni Hesap Oluştur
								</Link>
							</Button>

							<Button variant="outline" asChild className="w-full h-12">
								<Link href="/auth/login">
									<Icon icon="lucide:log-in" className="mr-2 h-4 w-4" />
									Giriş Yap
								</Link>
							</Button>
						</motion.div>
					</CardContent>
				</Card>
			</motion.div>
		);
	}

	// Default state - manual verification request
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
						<Icon icon="lucide:mail" className="w-8 h-8 text-white" />
					</motion.div>
					<motion.div
						initial={{ opacity: 0, y: -20 }}
						animate={{ opacity: 1, y: 0 }}
						transition={{ delay: 0.3, duration: 0.5 }}
					>
						<CardTitle className="text-3xl font-bold bg-gradient-to-r from-gray-900 to-gray-600 dark:from-white dark:to-gray-300 bg-clip-text text-transparent">
							E-posta Doğrulama
						</CardTitle>
						<CardDescription className="text-lg text-gray-600 dark:text-gray-400 mt-2">
							E-posta adresinizi doğrulamak için doğrulama bağlantısına
							ihtiyacınız var
						</CardDescription>
					</motion.div>
				</CardHeader>

				<CardContent className="space-y-6">
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
								<p className="font-medium mb-1">E-posta doğrulama gerekli</p>
								<p className="text-blue-700 dark:text-blue-300">
									Hesabınızı aktifleştirmek için e-posta adresinizi doğrulamanız
									gerekiyor. Eğer doğrulama e-postasını almadıysanız, yeni bir
									tane gönderebilirsiniz.
								</p>
							</div>
						</div>
					</motion.div>

					<motion.div
						initial={{ opacity: 0, y: 20 }}
						animate={{ opacity: 1, y: 0 }}
						transition={{ delay: 0.5, duration: 0.5 }}
						className="flex flex-col space-y-3"
					>
						<Button variant="outline" asChild className="w-full h-12">
							<Link href="/auth/login">
								<Icon icon="lucide:log-in" className="mr-2 h-4 w-4" />
								Giriş Sayfasına Dön
							</Link>
						</Button>

						<Button variant="ghost" asChild className="w-full h-12">
							<Link href="/auth/signup">
								<Icon icon="lucide:user-plus" className="mr-2 h-4 w-4" />
								Yeni Hesap Oluştur
							</Link>
						</Button>
					</motion.div>
				</CardContent>
			</Card>
		</motion.div>
	);
}
