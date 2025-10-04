"use client";

import { Icon } from "@iconify/react";
import { motion } from "framer-motion";
import { 
	containerVariants, 
	itemVariants, 
	headerVariantsLight 
} from "@/utils/variants";

const features = [
	{
		title: "AI-Powered Code Generation",
		description: "Generate production-ready code with our advanced AI engine. Build faster with intelligent code suggestions and automated scaffolding.",
		icon: "lucide:brain",
		gradient: "from-pink-500 to-orange-500"
	},
	{
		title: "Smart UI Components",
		description: "Beautiful, responsive interfaces built with AI-enhanced Tailwind CSS and modern design principles that adapt to your brand.",
		icon: "lucide:sparkles",
		gradient: "from-pink-600 to-orange-400"
	},
	{
		title: "AI Security & Monitoring",
		description: "Enterprise-grade security with AI-powered threat detection and automated monitoring for your peace of mind.",
		icon: "lucide:shield-check",
		gradient: "from-pink-500 to-red-500"
	},
	{
		title: "Intelligent Integration",
		description: "Seamlessly connect with any service using our AI-powered API integration that learns and adapts to your workflow.",
		icon: "lucide:zap",
		gradient: "from-orange-500 to-pink-500"
	},
	{
		title: "Auto-Scaling Architecture",
		description: "Built to grow with AI optimization. Handle millions of users with our intelligent infrastructure that scales automatically.",
		icon: "lucide:trending-up",
		gradient: "from-pink-600 to-orange-600"
	},
	{
		title: "AI-Powered Support",
		description: "Get instant help with our AI assistant available 24/7, backed by expert developers when you need human support.",
		icon: "lucide:bot",
		gradient: "from-orange-500 to-pink-600"
	}
];

export function FeaturesSection() {
	return (
		<section className="py-24 relative overflow-hidden">
			{/* Background Effects */}
			<div className="absolute inset-0 bg-gradient-to-br from-white via-pink-50/30 to-orange-50/30 dark:from-gray-900 dark:via-pink-950/10 dark:to-orange-950/10" />
			
			{/* Animated Background Orbs */}
			<motion.div
				className="absolute top-20 left-10 w-32 h-32 bg-gradient-to-r from-pink-500/20 to-orange-500/20 rounded-full blur-xl"
				animate={{
					x: [0, 30, 0],
					y: [0, -20, 0],
					scale: [1, 1.1, 1],
				}}
				transition={{
					duration: 8,
					repeat: Infinity,
					ease: "easeInOut"
				}}
			/>
			<motion.div
				className="absolute bottom-20 right-10 w-40 h-40 bg-gradient-to-r from-orange-500/20 to-pink-500/20 rounded-full blur-xl"
				animate={{
					x: [0, -25, 0],
					y: [0, 15, 0],
					scale: [1, 0.9, 1],
				}}
				transition={{
					duration: 10,
					repeat: Infinity,
					ease: "easeInOut"
				}}
			/>

			<div className="container mx-auto px-4 sm:px-6 lg:px-8 relative">
				{/* Header */}
				<motion.div
					className="text-center mb-16"
					variants={headerVariantsLight}
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
						<Icon icon="lucide:sparkles" className="w-4 h-4 text-pink-600 dark:text-pink-400" />
						<span className="text-sm font-medium bg-gradient-to-r from-pink-600 to-orange-600 bg-clip-text text-transparent">
							AI-Enhanced Features
						</span>
					</motion.div>
					<h2 className="text-3xl font-bold text-gray-900 dark:text-white sm:text-4xl mb-4">
						Everything you need to build{" "}
						<span className="bg-gradient-to-r from-pink-600 to-orange-600 bg-clip-text text-transparent">
							AI-powered products
						</span>
					</h2>
					<p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
						Our comprehensive AI-driven platform provides all the intelligent tools and features you need to create, deploy, and scale your applications with artificial intelligence.
					</p>
				</motion.div>

				{/* Features Grid */}
				<motion.div
					className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
					variants={containerVariants}
					initial="hidden"
					whileInView="visible"
					viewport={{ once: true, margin: "-50px" }}
				>
					{features.map((feature, index) => (
						<motion.div
							key={index}
							className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-xl p-8 shadow-lg border border-gray-200/50 dark:border-gray-700/50 hover:shadow-xl hover:border-pink-300/50 dark:hover:border-pink-600/50 transition-all duration-300 group relative overflow-hidden"
							variants={itemVariants}
							whileHover={{
								y: -8,
								transition: { duration: 0.3 }
							}}
						>
							{/* Gradient Background on Hover */}
							<motion.div
								className={`absolute inset-0 bg-gradient-to-br ${feature.gradient} opacity-0 group-hover:opacity-5 transition-opacity duration-300`}
								initial={{ opacity: 0 }}
								whileHover={{ opacity: 0.05 }}
							/>
							
							<motion.div
								className={`w-12 h-12 rounded-lg flex items-center justify-center mb-6 bg-gradient-to-r ${feature.gradient} shadow-lg relative`}
								whileHover={{
									scale: 1.1,
									rotate: 5,
									transition: { duration: 0.2 }
								}}
							>
								<Icon icon={feature.icon} className="w-6 h-6 text-white" />
								
								{/* Glow Effect */}
								<motion.div
									className={`absolute inset-0 rounded-lg bg-gradient-to-r ${feature.gradient} blur-md opacity-0 group-hover:opacity-30 transition-opacity duration-300`}
									initial={{ opacity: 0 }}
									whileHover={{ opacity: 0.3 }}
								/>
							</motion.div>
							
							<h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3 group-hover:text-pink-600 dark:group-hover:text-pink-400 transition-colors duration-300">
								{feature.title}
							</h3>
							<p className="text-gray-600 dark:text-gray-300 leading-relaxed">
								{feature.description}
							</p>

							{/* Floating Sparkles */}
							<motion.div
								className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
								animate={{
									y: [0, -5, 0],
									rotate: [0, 10, 0],
								}}
								transition={{
									duration: 2,
									repeat: Infinity,
									ease: "easeInOut"
								}}
							>
								<Icon icon="lucide:sparkles" className="w-4 h-4 text-pink-500/60" />
							</motion.div>
						</motion.div>
					))}
				</motion.div>

				{/* AI Demo Section */}
				<motion.div
					className="mt-20"
					initial={{ opacity: 0, y: 40 }}
					whileInView={{ opacity: 1, y: 0 }}
					viewport={{ once: true, margin: "-100px" }}
					transition={{
						duration: 0.8,
						delay: 0.2,
						ease: [0.25, 0.46, 0.45, 0.94]
					}}
				>
					<div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-2xl shadow-xl border border-gray-200/50 dark:border-gray-700/50 p-8 relative overflow-hidden">
						{/* Background Pattern */}
						<motion.div
							className="absolute inset-0 opacity-5"
							style={{
								backgroundImage: `radial-gradient(circle at 25% 25%, #EC008C 0%, transparent 50%), radial-gradient(circle at 75% 75%, #FC6767 0%, transparent 50%)`
							}}
							animate={{
								backgroundPosition: ["0% 0%", "100% 100%", "0% 0%"],
							}}
							transition={{
								duration: 20,
								repeat: Infinity,
								ease: "linear"
							}}
						/>
						
						<div className="text-center mb-8 relative">
							<motion.div
								className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-pink-500/10 to-orange-500/10 border border-pink-500/20 mb-4"
								initial={{ opacity: 0, scale: 0.8 }}
								whileInView={{ opacity: 1, scale: 1 }}
								viewport={{ once: true }}
								transition={{ duration: 0.5, delay: 0.3 }}
							>
								<Icon icon="lucide:brain" className="w-4 h-4 text-pink-600 dark:text-pink-400" />
								<span className="text-sm font-medium bg-gradient-to-r from-pink-600 to-orange-600 bg-clip-text text-transparent">
									AI in Action
								</span>
							</motion.div>
							<h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
								See our AI-powered development in action
							</h3>
							<p className="text-gray-600 dark:text-gray-300">
								Watch how our intelligent platform transforms your development workflow with AI
							</p>
						</div>
						
						<motion.div
							className="aspect-video bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-700 dark:to-gray-800 rounded-xl flex items-center justify-center border border-gray-200/50 dark:border-gray-600/50 cursor-pointer relative overflow-hidden group"
							whileHover={{
								scale: 1.02,
								transition: { duration: 0.2 }
							}}
							whileTap={{ scale: 0.98 }}
						>
							{/* Floating AI Elements */}
							<motion.div
								className="absolute top-4 left-4 w-8 h-8 bg-gradient-to-r from-pink-500 to-orange-500 rounded-full flex items-center justify-center opacity-60"
								animate={{
									y: [0, -10, 0],
									rotate: [0, 180, 360],
								}}
								transition={{
									duration: 4,
									repeat: Infinity,
									ease: "easeInOut"
								}}
							>
								<Icon icon="lucide:brain" className="w-4 h-4 text-white" />
							</motion.div>
							
							<motion.div
								className="absolute top-4 right-4 w-6 h-6 bg-gradient-to-r from-orange-500 to-pink-500 rounded-full flex items-center justify-center opacity-60"
								animate={{
									y: [0, 8, 0],
									x: [0, -5, 0],
								}}
								transition={{
									duration: 3,
									repeat: Infinity,
									ease: "easeInOut",
									delay: 1
								}}
							>
								<Icon icon="lucide:sparkles" className="w-3 h-3 text-white" />
							</motion.div>
							
							<motion.div
								className="absolute bottom-4 left-1/4 w-7 h-7 bg-gradient-to-r from-pink-600 to-orange-400 rounded-full flex items-center justify-center opacity-60"
								animate={{
									x: [0, 15, 0],
									scale: [1, 1.1, 1],
								}}
								transition={{
									duration: 5,
									repeat: Infinity,
									ease: "easeInOut",
									delay: 2
								}}
							>
								<Icon icon="lucide:zap" className="w-4 h-4 text-white" />
							</motion.div>

							<div className="text-center relative z-10">
								<motion.div
									className="w-16 h-16 bg-gradient-to-r from-pink-500 to-orange-500 rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg relative"
									whileHover={{
										scale: 1.1,
										transition: { duration: 0.2 }
									}}
									animate={{
										boxShadow: [
											"0 0 0 0 rgba(236, 0, 140, 0.4)",
											"0 0 0 20px rgba(236, 0, 140, 0)",
											"0 0 0 0 rgba(236, 0, 140, 0)"
										],
									}}
									transition={{
										duration: 2,
										repeat: Infinity,
										ease: "easeInOut"
									}}
								>
									<Icon icon="lucide:play" className="w-8 h-8 text-white ml-1" />
								</motion.div>
								<p className="text-gray-700 dark:text-gray-300 font-medium">AI-Powered Demo</p>
								<p className="text-sm text-gray-500 dark:text-gray-400">See CorePilot's AI in action</p>
							</div>
						</motion.div>
					</div>
				</motion.div>
			</div>
		</section>
	);
}

export default FeaturesSection;
