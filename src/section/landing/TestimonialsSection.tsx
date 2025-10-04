"use client";

import { Icon } from "@iconify/react";
import { motion } from "framer-motion";
import { 
	containerVariantsFast, 
	testimonialCardVariants, 
	headerVariants, 
	statsVariants 
} from "@/utils/variants";

const testimonials = [
	{
		content: "CorePilot's AI-powered code generation has revolutionized our development workflow. We're shipping features 3x faster!",
		author: "Sarah Johnson",
		role: "AI Engineering Lead",
		avatar: "/placeholder-avatar-1.jpg",
		rating: 5,
		company: "TechCorp AI",
		aiFeature: "AI Code Generation"
	},
	{
		content: "The intelligent debugging and auto-optimization features are game-changing. Best AI development platform I've used.",
		author: "Michael Chen",
		role: "Senior AI Developer",
		avatar: "/placeholder-avatar-2.jpg",
		rating: 5,
		company: "StartupXYZ",
		aiFeature: "Smart Debugging"
	},
	{
		content: "AI-powered documentation and smart UI components saved us weeks of development time. Incredible AI integration!",
		author: "Emily Rodriguez",
		role: "AI Product Manager",
		avatar: "/placeholder-avatar-3.jpg",
		rating: 5,
		company: "InnovateLab AI",
		aiFeature: "Smart UI Components"
	},
	{
		content: "The AI analytics and performance optimization are exactly what we needed for our enterprise AI applications.",
		author: "David Kim",
		role: "AI Solutions Architect",
		avatar: "/placeholder-avatar-4.jpg",
		rating: 5,
		company: "Enterprise AI Solutions",
		aiFeature: "AI Analytics"
	},
	{
		content: "Incredible AI-powered value. The intelligent code suggestions and auto-deployment saved us months of work.",
		author: "Lisa Thompson",
		role: "AI Startup Founder",
		avatar: "/placeholder-avatar-5.jpg",
		rating: 5,
		company: "GrowthCo AI",
		aiFeature: "Auto Deployment"
	},
	{
		content: "The AI-enhanced design system and intelligent UX patterns are top-notch. Our AI team loves these tools.",
		author: "Alex Martinez",
		role: "AI/UX Designer",
		avatar: "/placeholder-avatar-6.jpg",
		rating: 5,
		company: "DesignStudio AI",
		aiFeature: "AI Design System"
	}
];

export function TestimonialsSection() {
	const renderStars = (rating: number) => {
		return Array.from({ length: 5 }, (_, i) => (
			<motion.div
				key={i}
				initial={{ opacity: 0, scale: 0 }}
				animate={{ opacity: 1, scale: 1 }}
				transition={{ delay: i * 0.1, duration: 0.3 }}
			>
				<Icon
					icon="lucide:star"
					className={`w-4 h-4 ${i < rating ? 'text-orange-400 fill-current' : 'text-gray-300 dark:text-gray-600'}`}
				/>
			</motion.div>
		));
	};

	return (
		<section className="py-24 relative overflow-hidden">
			{/* Background Effects */}
			<div className="absolute inset-0 bg-gradient-to-br from-white via-pink-50/20 to-orange-50/20 dark:from-gray-900 dark:via-pink-950/5 dark:to-orange-950/5" />
			
			{/* Animated Background Orbs */}
			<motion.div
				className="absolute top-32 left-16 w-24 h-24 bg-gradient-to-r from-pink-500/15 to-orange-500/15 rounded-full blur-xl"
				animate={{
					x: [0, 30, 0],
					y: [0, -20, 0],
					scale: [1, 1.3, 1],
				}}
				transition={{
					duration: 10,
					repeat: Infinity,
					ease: "easeInOut"
				}}
			/>
			<motion.div
				className="absolute bottom-32 right-16 w-32 h-32 bg-gradient-to-r from-orange-500/15 to-pink-500/15 rounded-full blur-xl"
				animate={{
					x: [0, -25, 0],
					y: [0, 15, 0],
					scale: [1, 0.9, 1],
				}}
				transition={{
					duration: 13,
					repeat: Infinity,
					ease: "easeInOut"
				}}
			/>

			<div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
				{/* Header */}
				<motion.div
					className="text-center mb-16"
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
						<Icon icon="lucide:users" className="w-4 h-4 text-pink-600 dark:text-pink-400" />
						<span className="text-sm font-medium bg-gradient-to-r from-pink-600 to-orange-600 bg-clip-text text-transparent">
							AI Developer Community
						</span>
					</motion.div>
					<h2 className="text-3xl font-bold text-gray-900 dark:text-white sm:text-4xl mb-4">
						Trusted by thousands of{" "}
						<span className="bg-gradient-to-r from-pink-600 to-orange-600 bg-clip-text text-transparent">
							AI developers
						</span>
					</h2>
					<p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto mb-8">
						See what our AI-powered development community has to say about building intelligent applications with CorePilot.
					</p>

					{/* AI Stats */}
					<motion.div
						className="flex flex-wrap justify-center gap-8 mb-8"
						variants={statsVariants}
						initial="hidden"
						whileInView="visible"
						viewport={{ once: true, margin: "-100px" }}
					>
						<motion.div
							className="text-center group"
							whileHover={{ scale: 1.05 }}
							transition={{ duration: 0.2 }}
						>
							<motion.div
								className="text-3xl font-bold bg-gradient-to-r from-pink-600 to-orange-600 bg-clip-text text-transparent mb-1"
								animate={{
									backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
								}}
								transition={{
									duration: 3,
									repeat: Infinity,
									ease: "easeInOut"
								}}
							>
								10,000+
							</motion.div>
							<div className="text-sm text-gray-600 dark:text-gray-400 group-hover:text-pink-600 dark:group-hover:text-pink-400 transition-colors duration-300">
								AI Developers
							</div>
						</motion.div>
						<motion.div
							className="text-center group"
							whileHover={{ scale: 1.05 }}
							transition={{ duration: 0.2 }}
						>
							<motion.div
								className="text-3xl font-bold bg-gradient-to-r from-pink-600 to-orange-600 bg-clip-text text-transparent mb-1"
								animate={{
									backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
								}}
								transition={{
									duration: 3,
									repeat: Infinity,
									ease: "easeInOut",
									delay: 0.5
								}}
							>
								4.9/5
							</motion.div>
							<div className="text-sm text-gray-600 dark:text-gray-400 group-hover:text-orange-600 dark:group-hover:text-orange-400 transition-colors duration-300">
								AI Rating
							</div>
						</motion.div>
						<motion.div
							className="text-center group"
							whileHover={{ scale: 1.05 }}
							transition={{ duration: 0.2 }}
						>
							<motion.div
								className="text-3xl font-bold bg-gradient-to-r from-pink-600 to-orange-600 bg-clip-text text-transparent mb-1"
								animate={{
									backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
								}}
								transition={{
									duration: 3,
									repeat: Infinity,
									ease: "easeInOut",
									delay: 1
								}}
							>
								50M+
							</motion.div>
							<div className="text-sm text-gray-600 dark:text-gray-400 group-hover:text-pink-600 dark:group-hover:text-pink-400 transition-colors duration-300">
								AI API Requests
							</div>
						</motion.div>
					</motion.div>
				</motion.div>

				{/* AI Testimonials Grid */}
				<motion.div
					className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
					variants={containerVariantsFast}
					initial="hidden"
					whileInView="visible"
					viewport={{ once: true, margin: "-50px" }}
				>
					{testimonials.map((testimonial, index) => (
						<motion.div
							key={index}
							className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-xl p-6 shadow-lg border border-gray-200/50 dark:border-gray-700/50 hover:shadow-xl hover:border-pink-300/50 dark:hover:border-pink-600/50 transition-all duration-300 group relative overflow-hidden"
							variants={testimonialCardVariants}
							whileHover={{
								y: -8,
								transition: { duration: 0.3 }
							}}
						>
							{/* Background Gradient Effect */}
							<motion.div
								className="absolute inset-0 bg-gradient-to-br from-pink-500/5 to-orange-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
								initial={{ opacity: 0 }}
								whileHover={{ opacity: 1 }}
							/>

							{/* AI Feature Badge */}
							<motion.div
								className="absolute top-4 right-4 px-2 py-1 bg-gradient-to-r from-pink-500/10 to-orange-500/10 border border-pink-500/20 rounded-full"
								initial={{ opacity: 0, scale: 0.8 }}
								whileInView={{ opacity: 1, scale: 1 }}
								viewport={{ once: true }}
								transition={{ delay: index * 0.1 + 0.2 }}
							>
								<span className="text-xs font-medium bg-gradient-to-r from-pink-600 to-orange-600 bg-clip-text text-transparent">
									{testimonial.aiFeature}
								</span>
							</motion.div>

							{/* Rating */}
							<motion.div
								className="flex items-center gap-1 mb-4 relative z-10"
								initial={{ opacity: 0 }}
								whileInView={{ opacity: 1 }}
								viewport={{ once: true }}
								transition={{ delay: index * 0.1 + 0.5 }}
							>
								{renderStars(testimonial.rating)}
							</motion.div>

							{/* Content */}
							<motion.p
								className="text-gray-700 dark:text-gray-300 mb-6 leading-relaxed relative z-10"
								initial={{ opacity: 0 }}
								whileInView={{ opacity: 1 }}
								viewport={{ once: true }}
								transition={{ delay: index * 0.1 + 0.3 }}
							>
								"{testimonial.content}"
							</motion.p>

							{/* Author */}
							<motion.div
								className="flex items-center gap-4 relative z-10"
								initial={{ opacity: 0, x: -20 }}
								whileInView={{ opacity: 1, x: 0 }}
								viewport={{ once: true }}
								transition={{ delay: index * 0.1 + 0.7 }}
							>
								<motion.div
									className="w-12 h-12 bg-gradient-to-r from-pink-500 to-orange-500 rounded-full flex items-center justify-center shadow-lg"
									whileHover={{
										scale: 1.1,
										rotate: 5,
										transition: { duration: 0.2 }
									}}
								>
									<Icon icon="lucide:brain" className="w-6 h-6 text-white" />
								</motion.div>
								<div>
									<div className="font-semibold text-gray-900 dark:text-white group-hover:text-pink-600 dark:group-hover:text-pink-400 transition-colors duration-300">
										{testimonial.author}
									</div>
									<div className="text-sm text-gray-600 dark:text-gray-400">
										{testimonial.role}
									</div>
									<div className="text-xs text-gray-500 dark:text-gray-500">
										{testimonial.company}
									</div>
								</div>
							</motion.div>

							{/* Floating AI Elements */}
							<motion.div
								className="absolute bottom-4 right-4 opacity-0 group-hover:opacity-40 transition-opacity duration-300"
								animate={{
									y: [0, -3, 0],
									rotate: [0, 5, 0],
								}}
								transition={{
									duration: 2,
									repeat: Infinity,
									ease: "easeInOut",
									delay: index * 0.2
								}}
							>
								<Icon icon="lucide:sparkles" className="w-3 h-3 text-pink-500" />
							</motion.div>
						</motion.div>
					))}
				</motion.div>

				{/* AI Call to Action */}
				<motion.div
					className="text-center mt-16"
					initial={{ opacity: 0, y: 30 }}
					whileInView={{ opacity: 1, y: 0 }}
					viewport={{ once: true, margin: "-100px" }}
					transition={{
						duration: 0.8,
						delay: 0.4,
						ease: [0.25, 0.46, 0.45, 0.94]
					}}
				>
					<motion.div
						className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-pink-500/10 to-orange-500/10 border border-pink-500/20 mb-4"
						initial={{ opacity: 0, scale: 0.8 }}
						whileInView={{ opacity: 1, scale: 1 }}
						viewport={{ once: true }}
						transition={{ duration: 0.5, delay: 0.5 }}
					>
						<Icon icon="lucide:rocket" className="w-4 h-4 text-pink-600 dark:text-pink-400" />
						<span className="text-sm font-medium bg-gradient-to-r from-pink-600 to-orange-600 bg-clip-text text-transparent">
							Join AI Community
						</span>
					</motion.div>
					<p className="text-lg text-gray-600 dark:text-gray-300 mb-6">
						Join thousands of AI developers who trust{" "}
						<span className="bg-gradient-to-r from-pink-600 to-orange-600 bg-clip-text text-transparent font-semibold">
							CorePilot's AI platform
						</span>
					</p>
					<motion.button
						className="bg-gradient-to-r from-pink-500 to-orange-500 hover:from-pink-600 hover:to-orange-600 text-white px-8 py-3 rounded-lg font-semibold transition-all duration-300 shadow-lg hover:shadow-xl relative overflow-hidden"
						whileHover={{
							scale: 1.05,
							transition: { duration: 0.2 }
						}}
						whileTap={{ scale: 0.95 }}
					>
						{/* Button Glow Effect */}
						<motion.div
							className="absolute inset-0 rounded-lg bg-gradient-to-r from-pink-500 to-orange-500 blur-md opacity-0 group-hover:opacity-30 transition-opacity duration-300"
							initial={{ opacity: 0 }}
							whileHover={{ opacity: 0.3 }}
						/>
						<span className="relative z-10 flex items-center gap-2">
							<Icon icon="lucide:brain" className="w-4 h-4" />
							Start Building with AI
						</span>
					</motion.button>
				</motion.div>
			</div>
		</section>
	);
}

export default TestimonialsSection;
