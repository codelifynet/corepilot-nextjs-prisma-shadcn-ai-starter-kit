'use client';

import { useTranslations } from 'next-intl';
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Icon } from "@iconify/react";
import Navbar from "@/components/navbar";
import { Footer } from '@/components/layout/Footer';

export default function NotFound() {
	const t = useTranslations('NotFoundPage');

	return (
		<div className="min-h-screen flex flex-col">
			<Navbar />

			<main className="flex-1 relative overflow-hidden pt-[140px]">
				<div className="container mx-auto px-4 py-16 relative z-10">
					<div className="text-center space-y-12 max-w-4xl mx-auto">
						{/* Enhanced 404 with modern typography */}
						<div className="space-y-8">
							<div className="relative">
								<h1 className="text-[12rem] md:text-[16rem] font-black bg-gradient-to-r from-[#a000ff] via-[#ff006f] to-[#a000ff] dark:from-[#c44eff] dark:via-[#ff006f] dark:to-[#a000ff] bg-clip-text text-transparent tracking-tighter leading-none select-none">
									404
								</h1>
								<div className="absolute inset-0 text-[12rem] md:text-[16rem] font-black text-gray-200/20 dark:text-gray-800/20 -z-10 blur-sm">
									404
								</div>
							</div>

							<div className="space-y-4">
								<h2 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white">
									{t('title')}
								</h2>
								<p className="text-xl md:text-2xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto leading-relaxed">
									{t('subtitle')}
								</p>
							</div>
						</div>

						{/* Modern feature cards with glassmorphism */}
						<div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-3xl mx-auto">
							<Card className="bg-white/60 dark:bg-gray-800/60 backdrop-blur-xl border-white/20 dark:border-gray-700/50 hover:bg-white/80 dark:hover:bg-gray-800/80 transition-all duration-300 group">
								<CardContent className="p-6 text-center">
									<div className="w-12 h-12 mx-auto mb-4 rounded-full bg-gradient-to-br from-[#a000ff] to-[#ff006f] flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
										<Icon icon="tabler:home" className="h-6 w-6 text-white" />
									</div>
									<h3 className="font-semibold text-lg mb-2 text-gray-900 dark:text-white">
										{t('goHome')}
									</h3>
									<p className="text-sm text-gray-600 dark:text-gray-400">
										{t('goHomeDescription')}
									</p>
								</CardContent>
							</Card>

							<Card className="bg-white/60 dark:bg-gray-800/60 backdrop-blur-xl border-white/20 dark:border-gray-700/50 hover:bg-white/80 dark:hover:bg-gray-800/80 transition-all duration-300 group">
								<CardContent className="p-6 text-center">
									<div className="w-12 h-12 mx-auto mb-4 rounded-full bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
										<Icon icon="tabler:search" className="h-6 w-6 text-white" />
									</div>
									<h3 className="font-semibold text-lg mb-2 text-gray-900 dark:text-white">
										{t('search')}
									</h3>
									<p className="text-sm text-gray-600 dark:text-gray-400">
										{t('searchDescription')}
									</p>
								</CardContent>
							</Card>

							<Card className="bg-white/60 dark:bg-gray-800/60 backdrop-blur-xl border-white/20 dark:border-gray-700/50 hover:bg-white/80 dark:hover:bg-gray-800/80 transition-all duration-300 group">
								<CardContent className="p-6 text-center">
									<div className="w-12 h-12 mx-auto mb-4 rounded-full bg-gradient-to-br from-emerald-500 to-teal-500 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
										<Icon
											icon="tabler:life-buoy"
											className="h-6 w-6 text-white"
										/>
									</div>
									<h3 className="font-semibold text-lg mb-2 text-gray-900 dark:text-white">
										{t('support')}
									</h3>
									<p className="text-sm text-gray-600 dark:text-gray-400">
										{t('supportDescription')}
									</p>
								</CardContent>
							</Card>
						</div>

						{/* Enhanced Action Buttons */}
						<div className="flex flex-col sm:flex-row gap-4 justify-center items-center pt-8">
							<Button
								asChild
								size="lg"
								className="bg-gradient-to-r from-[#a000ff] to-[#ff006f] hover:from-[#8f00e6] hover:to-[#e6005c] text-white transition-all duration-300 hover:scale-105 px-8 py-6 text-lg font-semibold shadow-xl hover:shadow-2xl rounded-xl group"
							>
								<Link href="/" className="flex items-center space-x-3">
									<Icon
										icon="tabler:home"
										className="h-5 w-5 group-hover:animate-bounce"
									/>
									<span>{t('backToHome')}</span>
								</Link>
							</Button>

							<Button
								variant="outline"
								asChild
								size="lg"
								className="border-2 border-gray-300 dark:border-gray-600 hover:border-[#a000ff]/50 hover:bg-[#a000ff]/5 dark:hover:bg-gray-800/50 backdrop-blur-sm transition-all duration-300 hover:scale-105 px-8 py-6 text-lg font-semibold rounded-xl group"
							>
								<Link href="/pricing" className="flex items-center space-x-3">
									<Icon
										icon="tabler:tag"
										className="h-5 w-5 group-hover:rotate-180 transition-transform duration-500"
									/>
									<span>{t('viewPricing')}</span>
								</Link>
							</Button>
						</div>

						{/* Status badges and quick links */}
						<div className="pt-8 space-y-6">
							<div className="flex justify-center gap-3 flex-wrap">
								<Badge
									variant="secondary"
									className="px-4 py-2 text-sm bg-green-100 dark:bg-green-900/20 text-green-800 dark:text-green-300"
								>
									<Icon icon="tabler:wifi" className="h-4 w-4 mr-2" />
									{t('online')}
								</Badge>
								<Badge
									variant="outline"
									className="px-4 py-2 text-sm border-[#a000ff]/30 text-[#a000ff] dark:text-[#ff006f]"
								>
									<Icon icon="tabler:shield-check" className="h-4 w-4 mr-2" />
									{t('secure')}
								</Badge>
								<Badge
									variant="secondary"
									className="px-4 py-2 text-sm bg-blue-100 dark:bg-blue-900/20 text-blue-800 dark:text-blue-300"
								>
									<Icon icon="tabler:rocket" className="h-4 w-4 mr-2" />
									{t('fast')}
								</Badge>
							</div>

							<div className="flex justify-center gap-8 flex-wrap">
								<Link
									href="/legal/terms"
									className="text-gray-600 dark:text-gray-400 hover:text-[#a000ff] dark:hover:text-[#ff006f] hover:underline transition-colors font-medium inline-flex items-center gap-2"
								>
									<Icon icon="tabler:file-text" className="h-4 w-4" />
									{t('termsOfService')}
								</Link>
								<Link
									href="/legal/privacy"
									className="text-gray-600 dark:text-gray-400 hover:text-[#a000ff] dark:hover:text-[#ff006f] hover:underline transition-colors font-medium inline-flex items-center gap-2"
								>
									<Icon icon="tabler:shield" className="h-4 w-4" />
									{t('privacyPolicy')}
								</Link>
								<Link
									href="mailto:hi@example.net"
									className="text-gray-600 dark:text-gray-400 hover:text-[#a000ff] dark:hover:text-[#ff006f] hover:underline transition-colors font-medium inline-flex items-center gap-2"
								>
									<Icon icon="tabler:mail" className="h-4 w-4" />
									{t('contactSupport')}
								</Link>
							</div>
						</div>
					</div>
				</div>
			</main>

			<Footer />
		</div>
	);
}
