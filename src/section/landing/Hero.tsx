"use client";

import { Play, Star, Check, Sparkles, Zap, Brain, Cpu } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Icon } from "@iconify/react";
import { motion } from "framer-motion";
import { SIMPLE_HERO_TECHNOLOGIES } from "@/constants/landing.constants";
import { useEffect, useState } from "react";
import {
	heroContentVariants,
	heroImageVariants,
	heroBadgeVariants,
	heroTitleVariants,
	heroDescriptionVariants,
	heroTechStackVariants,
	heroButtonsVariants,
	heroStatsVariants,
	heroDemoCardVariants,
	heroFloatingVariants
} from "@/utils/variants";

export function Hero() {
	const [isVisible, setIsVisible] = useState(false);

	useEffect(() => {
		// Trigger animations immediately when component mounts
		setIsVisible(true);
	}, []);

	return (
		<div className="relative py-20 lg:pb-32 lg:pt-12 bg-gradient-to-br from-white/80 to-gray-50/80 dark:from-gray-800/80 dark:to-gray-900/80 backdrop-blur-xl rounded-2xl overflow-hidden shadow-2xl border border-pink-200/50 dark:border-pink-800/50">
			{/* Enhanced Background Effects */}
			<div className="absolute inset-0">
				{/* Main gradient orbs */}
				<motion.div
					className="absolute top-0 left-0 w-96 h-96 bg-gradient-to-br from-pink-500/20 to-orange-500/20 rounded-full blur-3xl"
					animate={{
						scale: [1, 1.2, 1],
						opacity: [0.3, 0.5, 0.3],
					}}
					transition={{
						duration: 8,
						repeat: Infinity,
						ease: "easeInOut"
					}}
				/>
				<motion.div
					className="absolute bottom-0 right-0 w-96 h-96 bg-gradient-to-br from-orange-500/20 to-pink-500/20 rounded-full blur-3xl"
					animate={{
						scale: [1.2, 1, 1.2],
						opacity: [0.5, 0.3, 0.5],
					}}
					transition={{
						duration: 8,
						repeat: Infinity,
						ease: "easeInOut",
						delay: 4
					}}
				/>
				{/* Additional floating orbs */}
				<motion.div
					className="absolute top-1/3 right-1/4 w-64 h-64 bg-gradient-to-br from-pink-400/15 to-orange-400/15 rounded-full blur-2xl"
					animate={{
						x: [0, 50, 0],
						y: [0, -30, 0],
						scale: [1, 1.1, 1],
					}}
					transition={{
						duration: 12,
						repeat: Infinity,
						ease: "easeInOut"
					}}
				/>
				<motion.div
					className="absolute bottom-1/3 left-1/4 w-48 h-48 bg-gradient-to-br from-orange-400/15 to-pink-400/15 rounded-full blur-2xl"
					animate={{
						x: [0, -40, 0],
						y: [0, 40, 0],
						scale: [1.1, 1, 1.1],
					}}
					transition={{
						duration: 10,
						repeat: Infinity,
						ease: "easeInOut",
						delay: 2
					}}
				/>
				{/* Grid pattern */}
				<div className="absolute inset-0 bg-grid-gray-900/5 dark:bg-grid-gray-100/5 [mask-image:linear-gradient(0deg,transparent,rgba(0,0,0,0.1))]" />
			</div>

			<div className="container mx-auto px-4 relative">
				<div className="grid lg:grid-cols-2 gap-12 items-center">
					{/* Left Content */}
					<motion.div
						variants={heroContentVariants}
						initial="hidden"
						animate={isVisible ? "visible" : "hidden"}
						className="space-y-8"
					>
						<div>
							<motion.div
								variants={heroBadgeVariants}
								initial="hidden"
								animate={isVisible ? "visible" : "hidden"}
							>
								<Badge variant="outline" className="mb-6 border-pink-200 dark:border-pink-800 bg-gradient-to-r from-pink-50 to-orange-50 dark:from-pink-950/20 dark:to-orange-950/20 text-pink-700 dark:text-pink-300">
									<Sparkles className="w-4 h-4 mr-2" />
									AI-Powered Development
								</Badge>
							</motion.div>
							<motion.h1
								variants={heroTitleVariants}
								initial="hidden"
								animate={isVisible ? "visible" : "hidden"}
								className="text-4xl lg:text-6xl font-bold text-gray-900 dark:text-white leading-tight"
							>
								Build Your <br />
								<span className="bg-gradient-to-r from-pink-600 to-orange-600 bg-clip-text text-transparent"> AI-Powered SaaS</span>
								<br />
								in Minutes
							</motion.h1>
						</div>

						<motion.p
							variants={heroDescriptionVariants}
							initial="hidden"
							animate={isVisible ? "visible" : "hidden"}
							className="text-xl text-gray-600 dark:text-gray-300 leading-relaxed max-w-lg"
						>
							Launch your projects faster with CorePilot's AI-driven development tools. Save time with modern technologies, intelligent code generation, and ready-made components.
						</motion.p>

						{/* AI Features Highlight */}
						<motion.div
							variants={heroTechStackVariants}
							initial="hidden"
							animate={isVisible ? "visible" : "hidden"}
							className="space-y-4"
						>
							<p className="text-sm font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wide">
								AI-Enhanced Development Stack
							</p>
							<div className="grid grid-cols-2 gap-3">
								<motion.div
									initial={{ opacity: 0, x: -20 }}
									animate={isVisible ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }}
									transition={{ duration: 0.5, delay: 0.6 }}
									className="flex items-center gap-2 p-3 bg-gradient-to-r from-pink-50 to-orange-50 dark:from-pink-950/20 dark:to-orange-950/20 rounded-lg border border-pink-200/50 dark:border-pink-800/50"
								>
									<Brain className="w-5 h-5 text-pink-600 dark:text-pink-400" />
									<span className="text-sm font-medium text-gray-700 dark:text-gray-300">Smart Code Gen</span>
								</motion.div>
								<motion.div
									initial={{ opacity: 0, x: 20 }}
									animate={isVisible ? { opacity: 1, x: 0 } : { opacity: 0, x: 20 }}
									transition={{ duration: 0.5, delay: 0.7 }}
									className="flex items-center gap-2 p-3 bg-gradient-to-r from-orange-50 to-pink-50 dark:from-orange-950/20 dark:to-pink-950/20 rounded-lg border border-orange-200/50 dark:border-orange-800/50"
								>
									<Zap className="w-5 h-5 text-orange-600 dark:text-orange-400" />
									<span className="text-sm font-medium text-gray-700 dark:text-gray-300">Auto Deploy</span>
								</motion.div>
								<motion.div
									initial={{ opacity: 0, x: -20 }}
									animate={isVisible ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }}
									transition={{ duration: 0.5, delay: 0.8 }}
									className="flex items-center gap-2 p-3 bg-gradient-to-r from-pink-50 to-orange-50 dark:from-pink-950/20 dark:to-orange-950/20 rounded-lg border border-pink-200/50 dark:border-pink-800/50"
								>
									<Cpu className="w-5 h-5 text-pink-600 dark:text-pink-400" />
									<span className="text-sm font-medium text-gray-700 dark:text-gray-300">AI Analytics</span>
								</motion.div>
								<motion.div
									initial={{ opacity: 0, x: 20 }}
									animate={isVisible ? { opacity: 1, x: 0 } : { opacity: 0, x: 20 }}
									transition={{ duration: 0.5, delay: 0.9 }}
									className="flex items-center gap-2 p-3 bg-gradient-to-r from-orange-50 to-pink-50 dark:from-orange-950/20 dark:to-pink-950/20 rounded-lg border border-orange-200/50 dark:border-orange-800/50"
								>
									<Sparkles className="w-5 h-5 text-orange-600 dark:text-orange-400" />
									<span className="text-sm font-medium text-gray-700 dark:text-gray-300">Smart UI</span>
								</motion.div>
							</div>
						</motion.div>

						{/* Technology Stack */}
						<motion.div
							variants={heroTechStackVariants}
							initial="hidden"
							animate={isVisible ? "visible" : "hidden"}
							className="space-y-4"
						>
							<p className="text-sm font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wide">
								Built with modern technologies
							</p>
							<div className="flex flex-wrap gap-3">
								{SIMPLE_HERO_TECHNOLOGIES.map((tech, index) => (
									<motion.div
										key={tech.name}
										initial={{ opacity: 0, scale: 0.8 }}
										animate={isVisible ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.8 }}
										transition={{
											duration: 0.4,
											delay: 1.0 + (index * 0.05),
											ease: "easeOut"
										}}
										whileHover={{
											scale: 1.05,
											transition: { duration: 0.2 }
										}}
										className="group relative"
									>
										<div className="flex items-center gap-2 px-3 py-2 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-lg border border-gray-200/50 dark:border-gray-700/50 shadow-sm hover:shadow-md transition-all duration-200 hover:border-pink-300 dark:hover:border-pink-600 hover:bg-gradient-to-r hover:from-pink-50/50 hover:to-orange-50/50 dark:hover:from-pink-950/10 dark:hover:to-orange-950/10">
											<Icon
												icon={tech.icon}
												className={`w-5 h-5 ${tech.color} group-hover:scale-110 transition-transform duration-200`}
											/>
											<span className="text-sm font-medium text-gray-700 dark:text-gray-300">
												{tech.name}
											</span>
										</div>

										{/* Tooltip */}
										<div className="absolute -top-10 left-1/2 transform -translate-x-1/2 px-2 py-1 bg-gray-900 dark:bg-gray-700 text-white text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none whitespace-nowrap">
											{tech.description}
										</div>
									</motion.div>
								))}
							</div>
						</motion.div>

						<motion.div
							variants={heroButtonsVariants}
							initial="hidden"
							animate={isVisible ? "visible" : "hidden"}
							className="flex flex-col sm:flex-row gap-4"
						>
							<Button size="lg" className="bg-gradient-to-r from-pink-600 to-orange-600 hover:from-pink-700 hover:to-orange-700 text-white shadow-lg hover:shadow-xl hover:shadow-pink-500/25 transition-all duration-300 border-0">
								<Sparkles className="w-4 h-4 mr-2" />
								Start Building with AI
							</Button>
							<Button variant="outline" size="lg" className="group border-pink-300 dark:border-pink-600 hover:border-pink-400 dark:hover:border-pink-500 hover:bg-gradient-to-r hover:from-pink-50 hover:to-orange-50 dark:hover:from-pink-950/20 dark:hover:to-orange-950/20 transition-all duration-300">
								<Play className="w-4 h-4 mr-2 group-hover:scale-110 transition-transform" />
								Watch AI Demo
							</Button>
						</motion.div>

						{/* Social Proof */}
						<motion.div
							variants={heroStatsVariants}
							initial="hidden"
							animate={isVisible ? "visible" : "hidden"}
							className="flex items-center gap-6 pt-4"
						>
							<div className="flex items-center gap-2">
								<div className="flex">
									{[...Array(5)].map((_, i) => (
										<motion.div
											key={i}
											initial={{ opacity: 0, scale: 0 }}
											animate={isVisible ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0 }}
											transition={{ duration: 0.3, delay: 1.3 + (i * 0.05) }}
										>
											<Star className="w-5 h-5 text-yellow-400 fill-current" />
										</motion.div>
									))}
								</div>
								<span className="text-sm text-gray-600 dark:text-gray-400">5.0 (200+ reviews)</span>
							</div>
							<div className="text-sm text-gray-500 dark:text-gray-400">
								Join 10,000+ AI developers
							</div>
						</motion.div>
					</motion.div>

					{/* Right Content - Interactive AI Demo */}
					<motion.div
						variants={heroImageVariants}
						initial="hidden"
						animate={isVisible ? "visible" : "hidden"}
						className="relative"
					>
						{/* Main Demo Container */}
						<div className="relative bg-gradient-to-br from-white/80 to-gray-50/80 dark:from-gray-800/80 dark:to-gray-900/80 backdrop-blur-xl rounded-2xl overflow-hidden shadow-2xl border border-pink-200/50 dark:border-pink-800/50">
							<div className="aspect-video bg-gradient-to-br from-pink-50/50 to-orange-100/50 dark:from-pink-900/20 dark:to-orange-900/20 flex items-center justify-center relative overflow-hidden">
								{/* Animated Background Pattern */}
								<div className="absolute inset-0 opacity-10">
									<motion.div
										className="absolute inset-0"
										style={{
											backgroundImage: `
												linear-gradient(45deg, rgba(236, 0, 140, 0.1) 25%, transparent 25%),
												linear-gradient(-45deg, rgba(236, 0, 140, 0.1) 25%, transparent 25%),
												linear-gradient(45deg, transparent 75%, rgba(236, 0, 140, 0.1) 75%),
												linear-gradient(-45deg, transparent 75%, rgba(236, 0, 140, 0.1) 75%)
											`,
											backgroundSize: '20px 20px',
											backgroundPosition: '0 0, 0 10px, 10px -10px, -10px 0px'
										}}
										animate={{
											backgroundPosition: ['0 0, 0 10px, 10px -10px, -10px 0px', '20px 20px, 20px 30px, 30px 10px, 10px 20px']
										}}
										transition={{
											duration: 20,
											repeat: Infinity,
											ease: "linear"
										}}
									/>
								</div>

								{/* Floating AI Elements */}
								<motion.div
									className="absolute top-4 left-4 w-8 h-8 bg-gradient-to-r from-pink-500 to-orange-500 rounded-full flex items-center justify-center"
									animate={{
										y: [0, -10, 0],
										rotate: [0, 180, 360]
									}}
									transition={{
										duration: 4,
										repeat: Infinity,
										ease: "easeInOut"
									}}
								>
									<Brain className="w-4 h-4 text-white" />
								</motion.div>

								<motion.div
									className="absolute top-4 right-4 w-6 h-6 bg-gradient-to-r from-orange-500 to-pink-500 rounded-full flex items-center justify-center"
									animate={{
										y: [0, 10, 0],
										rotate: [360, 180, 0]
									}}
									transition={{
										duration: 3,
										repeat: Infinity,
										ease: "easeInOut",
										delay: 1
									}}
								>
									<Sparkles className="w-3 h-3 text-white" />
								</motion.div>

								<motion.div
									className="absolute bottom-4 left-4 w-7 h-7 bg-gradient-to-r from-pink-500 to-orange-500 rounded-full flex items-center justify-center"
									animate={{
										x: [0, 10, 0],
										scale: [1, 1.2, 1]
									}}
									transition={{
										duration: 5,
										repeat: Infinity,
										ease: "easeInOut",
										delay: 2
									}}
								>
									<Zap className="w-3 h-3 text-white" />
								</motion.div>

								<div className="text-center space-y-4 relative z-10">
									<motion.div
										variants={heroDemoCardVariants}
										initial="hidden"
										animate={isVisible ? "visible" : "hidden"}
										className="w-20 h-20 bg-gradient-to-r from-pink-600 to-orange-600 rounded-full flex items-center justify-center mx-auto shadow-lg relative"
									>
										<Play className="w-8 h-8 text-white ml-1" />
										{/* Pulsing ring */}
										<motion.div
											className="absolute inset-0 rounded-full border-2 border-pink-400"
											animate={{
												scale: [1, 1.5, 1],
												opacity: [1, 0, 1]
											}}
											transition={{
												duration: 2,
												repeat: Infinity,
												ease: "easeInOut"
											}}
										/>
									</motion.div>
									<motion.div
										variants={heroDescriptionVariants}
										initial="hidden"
										animate={isVisible ? "visible" : "hidden"}
										className="space-y-2"
									>
										<p className="text-lg font-semibold text-gray-900 dark:text-white">
											AI-Powered Demo
										</p>
										<p className="text-sm text-gray-600 dark:text-gray-400">
											See CorePilot's AI in action
										</p>
									</motion.div>
								</div>
							</div>
						</div>

						{/* Enhanced Floating Elements */}
						<motion.div
							variants={heroFloatingVariants}
							initial="hidden"
							animate={isVisible ? "visible" : "hidden"}
							className="absolute -top-4 -left-4 bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm rounded-xl shadow-lg p-4 border border-pink-200/50 dark:border-pink-700/50"
						>
							<div className="flex items-center gap-3">
								<div className="w-8 h-8 bg-gradient-to-r from-green-400 to-emerald-500 rounded-full flex items-center justify-center">
									<Check className="w-4 h-4 text-white" />
								</div>
								<div>
									<p className="text-sm font-medium text-gray-900 dark:text-white">AI Setup Complete</p>
									<p className="text-xs text-gray-500 dark:text-gray-400">Ready in 30 seconds</p>
								</div>
							</div>
						</motion.div>

						<motion.div
							variants={heroFloatingVariants}
							initial="hidden"
							animate={isVisible ? "visible" : "hidden"}
							className="absolute -bottom-4 -right-4 bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm rounded-xl shadow-lg p-4 border border-orange-200/50 dark:border-orange-700/50"
						>
							<div className="flex items-center gap-3">
								<div className="w-8 h-8 bg-gradient-to-r from-pink-500 to-orange-500 rounded-full flex items-center justify-center">
									<Brain className="w-4 h-4 text-white" />
								</div>
								<div>
									<p className="text-sm font-medium text-gray-900 dark:text-white">10,000+ AI Developers</p>
									<p className="text-xs text-gray-500 dark:text-gray-400">Building with CorePilot</p>
								</div>
							</div>
						</motion.div>

						{/* Background Decoration with gradient */}
						<div className="absolute -z-10 top-8 left-8 w-full h-full bg-gradient-to-br from-pink-200/30 to-orange-200/30 dark:from-pink-800/20 dark:to-orange-800/20 rounded-2xl"></div>
					</motion.div>
				</div>
			</div>
		</div>
	);
}

export default Hero;
