"use client";

import { useState, useId } from "react";
import { Icon } from "@iconify/react";
import { motion } from "framer-motion";
import { Badge } from "@/components/ui/badge";
import {
	containerVariants,
	cardVariants,
	headerVariants,
	featureVariants
} from "@/utils/variants";

const plans = [
	{
		name: "AI Starter",
		price: "$15",
		originalPrice: "$49",
		period: "one-time",
		description: "Perfect for individual developers exploring AI-powered development",
		features: [
			"Up to 3 AI-enhanced projects",
			"5GB smart storage",
			"Basic AI support",
			"AI community access",
			"Standard AI templates",
			"Code generation (100 requests/month)"
		],
		popular: false,
		buttonText: "Start with AI",
		gradient: "from-pink-500 to-orange-500",
		icon: "lucide:sparkles"
	},
	{
		name: "AI Pro",
		price: "$30",
		originalPrice: "$99",
		period: "one-time",
		description: "Best for growing businesses leveraging AI automation",
		features: [
			"Unlimited AI projects",
			"50GB intelligent storage",
			"Priority AI support",
			"Advanced AI analytics",
			"Premium AI templates",
			"Team AI collaboration",
			"Full API access",
			"Code generation (1000 requests/month)",
			"AI-powered debugging"
		],
		popular: true,
		buttonText: "Start AI Trial",
		gradient: "from-pink-600 to-orange-400",
		icon: "lucide:brain"
	},
	{
		name: "AI Enterprise",
		price: "$60",
		originalPrice: "$199",
		period: "one-time",
		description: "For large teams building complex AI-driven applications",
		features: [
			"Everything in AI Pro",
			"500GB AI-optimized storage",
			"24/7 dedicated AI support",
			"Custom AI integrations",
			"Advanced AI security",
			"SLA guarantee",
			"Custom AI templates",
			"White-label AI options",
			"Unlimited code generation",
			"AI model fine-tuning"
		],
		popular: false,
		buttonText: "Contact AI Sales",
		gradient: "from-orange-500 to-pink-600",
		icon: "lucide:zap"
	}
];

export function PricingSection() {
	const [isYearly, setIsYearly] = useState(false);
	const gridPatternId = useId();

	const getButtonClasses = (gradient: string) => {
		const baseClasses = "w-full px-6 py-3 rounded-lg font-semibold text-sm sm:text-base transition-all duration-300 transform hover:scale-105 text-white shadow-lg hover:shadow-xl relative overflow-hidden";

		return `${baseClasses} bg-gradient-to-r ${gradient}`;
	};

	const getCardClasses = (popular: boolean) => {
		if (popular) {
			return `bg-white/95 dark:bg-gray-900/95 backdrop-blur-sm rounded-2xl p-8 shadow-2xl border-2 !border-pink-500 relative transform scale-105 flex flex-col`;
		}
		return "bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-2xl p-8 shadow-lg border border-gray-200/50 dark:border-gray-700/50 hover:shadow-xl hover:border-pink-300/50 dark:hover:border-pink-600/50 flex flex-col transition-all duration-300";
	};

	return (
		<section className="py-16 sm:py-20 lg:py-24 relative overflow-hidden">
			{/* Background Effects */}
			<div className="absolute inset-0 bg-gradient-to-br from-white via-pink-50/30 to-orange-50/30 dark:from-gray-900 dark:via-pink-950/10 dark:to-orange-950/10" />

			{/* Animated Background Orbs */}
			<motion.div
				className="absolute top-20 left-10 w-32 h-32 bg-gradient-to-r from-pink-500/20 to-orange-500/20 rounded-full blur-xl"
				animate={{
					x: [0, 50, 0],
					y: [0, -30, 0],
					scale: [1, 1.2, 1],
				}}
				transition={{
					duration: 12,
					repeat: Infinity,
					ease: "easeInOut"
				}}
			/>
			<motion.div
				className="absolute bottom-20 right-10 w-40 h-40 bg-gradient-to-r from-orange-500/20 to-pink-500/20 rounded-full blur-xl"
				animate={{
					x: [0, -40, 0],
					y: [0, 25, 0],
					scale: [1, 0.8, 1],
				}}
				transition={{
					duration: 15,
					repeat: Infinity,
					ease: "easeInOut"
				}}
			/>

			{/* Subtle Grid Pattern Background */}
			<div className="absolute inset-0 opacity-5 dark:opacity-10">
				<svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
					<title>Background grid pattern</title>
					<defs>
						<pattern id={gridPatternId} width="40" height="40" patternUnits="userSpaceOnUse">
							<path d="M 40 0 L 0 0 0 40" fill="none" stroke="currentColor" strokeWidth="1" />
						</pattern>
					</defs>
					<rect width="100%" height="100%" fill={`url(#${gridPatternId})`} />
				</svg>
			</div>

			<div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
				{/* Header */}
				<motion.div
					className="text-center mb-12 sm:mb-16"
					variants={headerVariants}
					initial="hidden"
					whileInView="visible"
					viewport={{ once: true, margin: "-100px" }}
				>
					<motion.div
						className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-pink-500/10 to-orange-500/10 border border-pink-500/20 mb-6"
						initial={{ opacity: 0, scale: 0.8 }}
						whileInView={{ opacity: 1, scale: 1 }}
						viewport={{ once: true }}
						transition={{ duration: 0.5 }}
					>
						<Icon icon="lucide:brain" className="w-4 h-4 text-pink-600 dark:text-pink-400" />
						<span className="text-sm font-medium bg-gradient-to-r from-pink-600 to-orange-600 bg-clip-text text-transparent">
							AI-Powered Pricing
						</span>
					</motion.div>
					<h2 className="text-2xl sm:text-3xl lg:text-4xl xl:text-5xl font-bold text-gray-900 dark:text-white mb-4">
						Simple, transparent{" "}
						<span className="bg-gradient-to-r from-pink-600 to-orange-600 bg-clip-text text-transparent">
							AI pricing
						</span>
					</h2>
					<p className="text-base sm:text-lg lg:text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto mb-6 sm:mb-8 px-4 sm:px-0">
						Choose the perfect AI-powered plan for your needs. All plans include our intelligent core features with no hidden fees.
					</p>

					{/* Pricing Toggle */}
					<motion.div
						className="flex items-center justify-center gap-3 sm:gap-4 mb-6 sm:mb-8 px-4"
						initial={{ opacity: 0, scale: 0.9 }}
						whileInView={{ opacity: 1, scale: 1 }}
						viewport={{ once: true }}
						transition={{ delay: 0.3, duration: 0.5 }}
					>
						<span className={`text-sm sm:text-base transition-colors duration-300 ${!isYearly ? 'text-gray-900 dark:text-white font-semibold' : 'text-gray-600 dark:text-gray-400'}`}>Monthly</span>
						<motion.div
							className="relative"
							whileHover={{ scale: 1.05 }}
							transition={{ duration: 0.2 }}
						>
							<input
								type="checkbox"
								className="sr-only"
								checked={isYearly}
								onChange={(e) => setIsYearly(e.target.checked)}
								aria-label="Toggle between monthly and yearly pricing"
							/>
							<button
								type="button"
								className="w-12 h-7 sm:w-14 sm:h-8 bg-gradient-to-r from-pink-200 to-orange-200 dark:from-pink-800 dark:to-orange-800 rounded-full shadow-inner cursor-pointer focus:outline-none focus:ring-2 focus:ring-pink-500 focus:ring-offset-2"
								onClick={() => setIsYearly(!isYearly)}
								onKeyDown={(e) => {
									if (e.key === 'Enter' || e.key === ' ') {
										e.preventDefault();
										setIsYearly(!isYearly);
									}
								}}
								aria-label={`Switch to ${isYearly ? 'monthly' : 'yearly'} pricing`}
							>
								<div className={`w-5 h-5 sm:w-6 sm:h-6 bg-white rounded-full shadow-md transform transition-transform duration-300 ${isYearly ? 'translate-x-6 sm:translate-x-7' : 'translate-x-1'}`}></div>
							</button>
						</motion.div>
						<span className={`text-sm sm:text-base transition-colors duration-300 flex items-center flex-wrap ${isYearly ? 'text-gray-900 dark:text-white font-semibold' : 'text-gray-600 dark:text-gray-400'}`}>
							Yearly
							<span className="ml-1 sm:ml-2 px-2 py-1 bg-gradient-to-r from-green-100 to-emerald-100 dark:from-green-900/30 dark:to-emerald-900/30 text-green-600 dark:text-green-400 text-xs rounded-full whitespace-nowrap">
								Save 20%
							</span>
						</span>
					</motion.div>
				</motion.div>

				{/* Pricing Cards */}
				<motion.div
					className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8"
					variants={containerVariants}
					initial="hidden"
					whileInView="visible"
					viewport={{ once: true, margin: "-50px" }}
				>
					{plans.map((plan, index) => (
						<motion.div
							key={index}
							className={`${getCardClasses(plan.popular)} transition-all duration-300 group w-full flex flex-col h-full relative overflow-hidden`}
							variants={cardVariants}
							whileHover={{
								y: plan.popular ? 0 : -10,
								transition: { duration: 0.3 }
							}}
						>
							{/* Background Gradient Effect */}
							{!plan.popular && (
								<motion.div
									className={`absolute inset-0 bg-gradient-to-br ${plan.gradient} opacity-0 group-hover:opacity-5 transition-opacity duration-300`}
									initial={{ opacity: 0 }}
									whileHover={{ opacity: 0.05 }}
								/>
							)}

							{/* Popular Badge */}
							{plan.popular && (
								<motion.div
									className="absolute -top-3 sm:-top-4 left-1/2 transform -translate-x-1/2 z-10"
									initial={{ opacity: 0, y: -10 }}
									whileInView={{ opacity: 1, y: 0 }}
									viewport={{ once: true }}
									transition={{ delay: index * 0.2 + 0.5 }}
								>
									<span className={`bg-gradient-to-r ${plan.gradient} text-white px-3 py-1.5 sm:px-4 sm:py-2 rounded-full text-xs sm:text-sm font-semibold shadow-lg`}>
										Most Popular
									</span>
								</motion.div>
							)}

							{/* Plan Header */}
							<motion.div
								className="text-center mb-6 sm:mb-8 relative z-10"
								initial={{ opacity: 0, y: 20 }}
								whileInView={{ opacity: 1, y: 0 }}
								viewport={{ once: true }}
								transition={{ delay: index * 0.2 + 0.2 }}
							>
								{/* AI Icon */}
								<motion.div
									className={`w-12 h-12 mx-auto mb-4 rounded-lg bg-gradient-to-r ${plan.gradient} flex items-center justify-center shadow-lg`}
									whileHover={{
										scale: 1.1,
										rotate: 5,
										transition: { duration: 0.2 }
									}}
								>
									<Icon icon={plan.icon} className="w-6 h-6 text-white" />
								</motion.div>

								<h3 className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-white mb-2">
									{plan.name}
								</h3>
								<div className="mb-4">
									<div className="flex items-center justify-center gap-2">
										{plan.originalPrice && (
											<span className="text-lg text-gray-500 dark:text-gray-400 line-through">
												{plan.originalPrice}
											</span>
										)}
										<span className={`text-4xl font-bold bg-gradient-to-r ${plan.gradient} bg-clip-text text-transparent`}>
											{plan.price}
										</span>
									</div>
									<span className="text-gray-600 dark:text-gray-400 ml-2">
										{plan.period}
									</span>
									{plan.originalPrice && (
										<div className="mt-1">
											<Badge className="bg-gradient-to-r from-red-100 to-pink-100 text-red-800 dark:from-red-900 dark:to-pink-900 dark:text-red-200 border-0">
												%70 AI Discount
											</Badge>
										</div>
									)}
								</div>
								<p className="text-gray-600 dark:text-gray-300">
									{plan.description}
								</p>
							</motion.div>

							{/* Features */}
							<motion.div
								className="mb-6 sm:mb-8 flex-grow relative z-10"
								initial={{ opacity: 0 }}
								whileInView={{ opacity: 1 }}
								viewport={{ once: true }}
								transition={{ delay: index * 0.2 + 0.6 }}
							>
								<ul className="space-y-3 sm:space-y-4">
									{plan.features.map((feature, featureIndex) => (
										<motion.li
											key={featureIndex}
											className="flex items-start gap-3"
											variants={featureVariants}
											initial="hidden"
											whileInView="visible"
											viewport={{ once: true }}
											transition={{ delay: index * 0.2 + featureIndex * 0.1 + 0.8 }}
										>
											<motion.div
												className="flex-shrink-0 mt-0.5"
												whileHover={{ scale: 1.2, rotate: 360 }}
												transition={{ duration: 0.3 }}
											>
												<div className={`w-5 h-5 rounded-full bg-gradient-to-r ${plan.gradient} flex items-center justify-center`}>
													<Icon
														icon="lucide:check"
														className="w-3 h-3 text-white"
													/>
												</div>
											</motion.div>
											<span className="text-sm sm:text-base text-gray-700 dark:text-gray-300 leading-relaxed">
												{feature}
											</span>
										</motion.li>
									))}
								</ul>
							</motion.div>

							{/* CTA Button */}
							<motion.div
								className="mt-auto relative z-10"
								initial={{ opacity: 0, y: 20 }}
								whileInView={{ opacity: 1, y: 0 }}
								viewport={{ once: true }}
								transition={{ delay: index * 0.2 + 0.8 }}
							>
								<motion.button
									className={getButtonClasses(plan.gradient)}
									type="button"
									whileHover={{
										scale: 1.02,
										transition: { duration: 0.2 }
									}}
									whileTap={{ scale: 0.98 }}
								>
									{/* Button Glow Effect */}
									<motion.div
										className={`absolute inset-0 rounded-lg bg-gradient-to-r ${plan.gradient} blur-md opacity-0 group-hover:opacity-30 transition-opacity duration-300`}
										initial={{ opacity: 0 }}
										whileHover={{ opacity: 0.3 }}
									/>
									<span className="relative z-10 flex items-center justify-center gap-2">
										<Icon icon="lucide:sparkles" className="w-4 h-4" />
										{plan.buttonText}
									</span>
								</motion.button>
							</motion.div>

							{/* Floating AI Elements */}
							<motion.div
								className="absolute top-4 right-4 opacity-0 group-hover:opacity-60 transition-opacity duration-300"
								animate={{
									y: [0, -5, 0],
									rotate: [0, 10, 0],
								}}
								transition={{
									duration: 3,
									repeat: Infinity,
									ease: "easeInOut"
								}}
							>
								<Icon icon="lucide:sparkles" className={`w-4 h-4 text-pink-500`} />
							</motion.div>
						</motion.div>
					))}
				</motion.div>

				{/* AI FAQ Section */}
				<motion.div
					className="mt-16 sm:mt-20 text-center px-4"
					initial={{ opacity: 0, y: 40 }}
					whileInView={{ opacity: 1, y: 0 }}
					viewport={{ once: true, margin: "-100px" }}
					transition={{
						duration: 0.8,
						delay: 0.5,
						ease: [0.25, 0.46, 0.45, 0.94]
					}}
				>
					<motion.div
						className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-pink-500/10 to-orange-500/10 border border-pink-500/20 mb-4"
						initial={{ opacity: 0, scale: 0.8 }}
						whileInView={{ opacity: 1, scale: 1 }}
						viewport={{ once: true }}
						transition={{ duration: 0.5, delay: 0.6 }}
					>
						<Icon icon="lucide:help-circle" className="w-4 h-4 text-pink-600 dark:text-pink-400" />
						<span className="text-sm font-medium bg-gradient-to-r from-pink-600 to-orange-600 bg-clip-text text-transparent">
							AI Support
						</span>
					</motion.div>
					<h3 className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-white mb-4">
						Frequently Asked Questions about{" "}
						<span className="bg-gradient-to-r from-pink-600 to-orange-600 bg-clip-text text-transparent">
							AI Features
						</span>
					</h3>
					<p className="text-sm sm:text-base text-gray-600 dark:text-gray-300 mb-6 sm:mb-8 max-w-2xl mx-auto">
						Have questions about our AI-powered development tools? We're here to help.
					</p>
					<motion.button
						className="bg-gradient-to-r from-pink-500 to-orange-500 hover:from-pink-600 hover:to-orange-600 text-white px-6 sm:px-8 py-2.5 sm:py-3 rounded-lg font-semibold text-sm sm:text-base transition-all duration-300 shadow-lg hover:shadow-xl"
						whileHover={{
							scale: 1.05,
							transition: { duration: 0.2 }
						}}
						whileTap={{ scale: 0.95 }}
					>
						<span className="flex items-center gap-2">
							<Icon icon="lucide:brain" className="w-4 h-4" />
							View AI FAQ
						</span>
					</motion.button>
				</motion.div>

				{/* AI Money Back Guarantee */}
				<motion.div
					className="mt-12 sm:mt-16 text-center px-4"
					initial={{ opacity: 0, scale: 0.9 }}
					whileInView={{ opacity: 1, scale: 1 }}
					viewport={{ once: true, margin: "-100px" }}
					transition={{
						duration: 0.6,
						delay: 0.7,
						ease: [0.25, 0.46, 0.45, 0.94]
					}}
				>
					<div className="bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20 border border-green-200/50 dark:border-green-800/50 rounded-xl p-4 sm:p-6 max-w-sm sm:max-w-md mx-auto backdrop-blur-sm">
						<motion.div
							className="w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-r from-green-500 to-emerald-500 rounded-full flex items-center justify-center mx-auto mb-3 sm:mb-4 shadow-lg"
							whileHover={{
								scale: 1.1,
								rotate: 5,
								transition: { duration: 0.2 }
							}}
							animate={{
								boxShadow: [
									"0 0 0 0 rgba(34, 197, 94, 0.4)",
									"0 0 0 10px rgba(34, 197, 94, 0)",
									"0 0 0 0 rgba(34, 197, 94, 0)"
								],
							}}
							transition={{
								duration: 2,
								repeat: Infinity,
								ease: "easeInOut"
							}}
						>
							<Icon icon="lucide:shield-check" className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
						</motion.div>
						<h4 className="font-semibold text-sm sm:text-base text-gray-900 dark:text-white mb-2">
							30-Day AI Money Back Guarantee
						</h4>
						<p className="text-xs sm:text-sm text-gray-600 dark:text-gray-300 leading-relaxed">
							Try our AI-powered development tools risk-free. If you're not satisfied, get a full refund within 30 days.
						</p>
					</div>
				</motion.div>
			</div>
		</section>
	);
}

export default PricingSection;
