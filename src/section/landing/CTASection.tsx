"use client";

import { Icon } from "@iconify/react";
import { motion } from "framer-motion";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { 
	fadeInVariants, 
	scaleVariants, 
	ctaButtonVariants 
} from "@/utils/variants";

const aiTrustIndicators = [
	{ name: "OpenAI", icon: "lucide:brain" },
	{ name: "Vercel AI", icon: "lucide:triangle" },
	{ name: "AWS AI", icon: "lucide:cloud" },
	{ name: "AI Docker", icon: "lucide:container" },
	{ name: "AI Stripe", icon: "lucide:credit-card" }
];

const aiFeatures = [
	{ icon: "lucide:brain", text: "AI Code Generation" },
	{ icon: "lucide:sparkles", text: "Smart UI Components" },
	{ icon: "lucide:zap", text: "Auto Deployment" },
	{ icon: "lucide:cpu", text: "AI Analytics" }
];

export function CTASection() {
	return (
		<section className="relative py-20 overflow-hidden">
			{/* Background Effects */}
			<div className="absolute inset-0 bg-gradient-to-br from-white via-pink-50/30 to-orange-50/30 dark:from-gray-900 dark:via-pink-950/10 dark:to-orange-950/10" />
			
			{/* Animated Background Orbs */}
			<motion.div
				className="absolute top-20 left-20 w-32 h-32 bg-gradient-to-r from-pink-500/20 to-orange-500/20 rounded-full blur-xl"
				animate={{
					x: [0, 40, 0],
					y: [0, -30, 0],
					scale: [1, 1.4, 1],
				}}
				transition={{
					duration: 12,
					repeat: Infinity,
					ease: "easeInOut"
				}}
			/>
			<motion.div
				className="absolute bottom-20 right-20 w-40 h-40 bg-gradient-to-r from-orange-500/20 to-pink-500/20 rounded-full blur-xl"
				animate={{
					x: [0, -35, 0],
					y: [0, 25, 0],
					scale: [1, 0.8, 1],
				}}
				transition={{
					duration: 15,
					repeat: Infinity,
					ease: "easeInOut"
				}}
			/>

			{/* Floating AI Elements */}
			<motion.div
				className="absolute top-32 right-32 opacity-20"
				animate={{
					y: [0, -10, 0],
					rotate: [0, 10, 0],
				}}
				transition={{
					duration: 4,
					repeat: Infinity,
					ease: "easeInOut"
				}}
			>
				<Icon icon="lucide:brain" className="w-8 h-8 text-pink-500" />
			</motion.div>
			<motion.div
				className="absolute bottom-40 left-32 opacity-20"
				animate={{
					y: [0, 8, 0],
					rotate: [0, -8, 0],
				}}
				transition={{
					duration: 5,
					repeat: Infinity,
					ease: "easeInOut",
					delay: 1
				}}
			>
				<Icon icon="lucide:sparkles" className="w-6 h-6 text-orange-500" />
			</motion.div>
			<motion.div
				className="absolute top-48 left-48 opacity-20"
				animate={{
					y: [0, -6, 0],
					x: [0, 4, 0],
				}}
				transition={{
					duration: 6,
					repeat: Infinity,
					ease: "easeInOut",
					delay: 2
				}}
			>
				<Icon icon="lucide:zap" className="w-7 h-7 text-pink-500" />
			</motion.div>

			<div className="container mx-auto px-4 relative z-10">
				{/* Main CTA */}
				<div className="text-center mb-16">
					{/* AI Badge */}
					<motion.div
						className="inline-flex items-center gap-2 mb-6"
						initial={{ opacity: 0, scale: 0.8 }}
						whileInView={{ opacity: 1, scale: 1 }}
						viewport={{ once: true }}
						transition={{ duration: 0.5 }}
					>
						<Badge className="bg-gradient-to-r from-pink-500 to-orange-500 text-white px-4 py-2 text-sm font-medium rounded-full border-0 shadow-lg">
							<Icon icon="lucide:brain" className="w-4 h-4 mr-2" />
							🚀 AI-Powered Launch - 70% Off
						</Badge>
					</motion.div>

					{/* Main Heading */}
					<motion.h2
						className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 dark:text-white mb-6 leading-tight"
						initial={{ opacity: 0, y: 30 }}
						whileInView={{ opacity: 1, y: 0 }}
						viewport={{ once: true }}
						transition={{ duration: 0.8, delay: 0.2 }}
					>
						Start Building with
						<br />
						<span className="bg-gradient-to-r from-pink-600 to-orange-600 bg-clip-text text-transparent">
							AI Intelligence!
						</span>
					</motion.h2>

					{/* Description */}
					<motion.p
						className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto mb-8 leading-relaxed"
						initial={{ opacity: 0, y: 20 }}
						whileInView={{ opacity: 1, y: 0 }}
						viewport={{ once: true }}
						transition={{ duration: 0.8, delay: 0.4 }}
					>
						Thousands of AI developers are building smarter with{" "}
						<span className="bg-gradient-to-r from-pink-600 to-orange-600 bg-clip-text text-transparent font-semibold">
							CorePilot's AI platform
						</span>
						. Get your AI-powered Next.js application ready in minutes.
						Limited time 70% AI discount!
					</motion.p>

					{/* AI Features */}
					<motion.div
						className="flex flex-wrap justify-center gap-6 mb-12"
						initial={{ opacity: 0, y: 20 }}
						whileInView={{ opacity: 1, y: 0 }}
						viewport={{ once: true }}
						transition={{ duration: 0.8, delay: 0.6 }}
					>
						{aiFeatures.map((feature, index) => (
							<motion.div
								key={index}
								className="inline-flex items-center gap-2 px-4 py-2 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-full border border-pink-200/50 dark:border-pink-700/50 text-gray-700 dark:text-gray-300 text-sm font-medium hover:border-pink-300 dark:hover:border-pink-600 transition-all duration-300 group"
								whileHover={{
									scale: 1.05,
									y: -2,
									transition: { duration: 0.2 }
								}}
								initial={{ opacity: 0, scale: 0.8 }}
								whileInView={{ opacity: 1, scale: 1 }}
								viewport={{ once: true }}
								transition={{ delay: index * 0.1 + 0.7 }}
							>
								<Icon
									icon={feature.icon}
									className="w-4 h-4 text-pink-600 dark:text-pink-400 group-hover:text-orange-600 dark:group-hover:text-orange-400 transition-colors duration-300"
								/>
								<span className="group-hover:text-pink-600 dark:group-hover:text-pink-400 transition-colors duration-300">
									{feature.text}
								</span>
							</motion.div>
						))}
					</motion.div>

					{/* AI CTA Buttons */}
					<motion.div
						className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-8"
						initial={{ opacity: 0, y: 30 }}
						whileInView={{ opacity: 1, y: 0 }}
						viewport={{ once: true }}
						transition={{ duration: 0.8, delay: 0.8 }}
					>
						<motion.div
							className="relative"
							whileHover={{ scale: 1.05 }}
							whileTap={{ scale: 0.95 }}
						>
							{/* Button Glow Effect */}
							<motion.div
								className="absolute inset-0 rounded-xl bg-gradient-to-r from-pink-500 to-orange-500 blur-lg opacity-0 group-hover:opacity-30 transition-opacity duration-300"
								initial={{ opacity: 0 }}
								whileHover={{ opacity: 0.3 }}
							/>
							<Button
								size="lg"
								className="px-8 py-4 text-lg font-semibold bg-gradient-to-r from-pink-500 to-orange-500 hover:from-pink-600 hover:to-orange-600 text-white border-0 rounded-xl shadow-lg relative z-10 group"
							>
								<Icon icon="lucide:brain" className="w-5 h-5 mr-2 group-hover:animate-pulse" />
								<span>🚀 Get AI-Powered Discount</span>
							</Button>
						</motion.div>
						<motion.div
							whileHover={{ scale: 1.05 }}
							whileTap={{ scale: 0.95 }}
						>
							<Button
								variant="outline"
								size="lg"
								className="px-8 py-4 text-lg font-semibold rounded-xl border-2 border-pink-300 dark:border-pink-600 hover:bg-gradient-to-r hover:from-pink-500 hover:to-orange-500 hover:text-white hover:border-transparent transition-all duration-300 group"
							>
								<motion.div
									className="flex items-center gap-2"
									whileHover={{
										x: 2,
										transition: { duration: 0.2 }
									}}
								>
									<Icon icon="lucide:play-circle" className="w-5 h-5 group-hover:text-white transition-colors duration-300" />
									<span>Watch AI Demo</span>
								</motion.div>
							</Button>
						</motion.div>
					</motion.div>

					{/* AI Trust Indicators */}
					<motion.div
						className="mb-8 sm:mb-12 px-4 sm:px-0"
						variants={fadeInVariants}
						initial="hidden"
						whileInView="visible"
						viewport={{ once: true }}
					>
						<p className="text-xs sm:text-sm text-gray-500 dark:text-gray-400 mb-4 sm:mb-6">
							Trusted by AI developers at leading companies
						</p>
						<motion.div
							className="flex flex-wrap items-center justify-center gap-4 sm:gap-6 lg:gap-8 opacity-60 hover:opacity-80 transition-opacity duration-300"
							whileHover={{ opacity: 0.9 }}
						>
							{aiTrustIndicators.map((company, index) => (
								<motion.div
									key={index}
									className="flex items-center gap-2 text-gray-400 dark:text-gray-500 hover:text-pink-500 dark:hover:text-pink-400 transition-colors duration-300 group"
									variants={ctaButtonVariants}
									whileHover="hover"
									initial={{ opacity: 0, y: 10 }}
									whileInView={{ opacity: 1, y: 0 }}
									viewport={{ once: true }}
									transition={{ delay: index * 0.1 + 1 }}
								>
									<Icon icon={company.icon} className="w-5 h-5 sm:w-6 sm:h-6 group-hover:text-orange-500 transition-colors duration-300" />
									<span className="text-xs sm:text-sm font-medium">{company.name}</span>
								</motion.div>
							))}
						</motion.div>
					</motion.div>

					{/* AI Security Badge */}
					<motion.div
						className="inline-flex items-center gap-2 sm:gap-3 bg-gradient-to-r from-emerald-50 to-green-50 dark:from-emerald-900/20 dark:to-green-900/20 border border-emerald-200 dark:border-emerald-800 rounded-full px-4 sm:px-6 py-2 sm:py-3 text-emerald-700 dark:text-emerald-300 shadow-lg"
						variants={scaleVariants}
						initial="hidden"
						whileInView="visible"
						viewport={{ once: true }}
						whileHover="hover"
					>
						<motion.div
							whileHover={{ 
								rotate: 360,
								scale: 1.1,
								transition: { duration: 0.5 }
							}}
							className="relative"
						>
							<Icon icon="lucide:shield-check" className="w-4 h-4 sm:w-5 sm:h-5" />
							{/* Pulsing Ring */}
							<motion.div
								className="absolute inset-0 rounded-full border-2 border-emerald-400/30"
								animate={{
									scale: [1, 1.5, 1],
									opacity: [0.5, 0, 0.5],
								}}
								transition={{
									duration: 2,
									repeat: Infinity,
									ease: "easeInOut"
								}}
							/>
						</motion.div>
						<span className="text-xs sm:text-sm font-semibold">
							AI-Enhanced Security & 99.9% AI Uptime
						</span>
					</motion.div>
				</div>
			</div>
		</section>
	);
}

export default CTASection;
