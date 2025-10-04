"use client";

import Link from "next/link";
import { Icon } from "@iconify/react";
import { motion } from "framer-motion";
import { Logo } from "@/components/core-pilot-ui/logo";

const aiFooterLinks = {
	product: [
		{ name: "AI Features", href: "/features", icon: "lucide:brain" },
		{ name: "AI Pricing", href: "/pricing", icon: "lucide:zap" },
		{ name: "AI Templates", href: "/templates", icon: "lucide:sparkles" },
		{ name: "AI Integrations", href: "/integrations", icon: "lucide:puzzle" },
	],
	company: [
		{ name: "About AI", href: "/about", icon: "lucide:info" },
		{ name: "AI Blog", href: "/blog", icon: "lucide:book-open" },
		{ name: "AI Careers", href: "/careers", icon: "lucide:briefcase" },
		{ name: "Contact AI", href: "/contact", icon: "lucide:mail" },
	],
	resources: [
		{ name: "AI Documentation", href: "/docs", icon: "lucide:file-text" },
		{ name: "AI Help Center", href: "/help", icon: "lucide:help-circle" },
		{ name: "AI Community", href: "/community", icon: "lucide:users" },
		{ name: "AI Status", href: "/status", icon: "lucide:activity" },
	],
};

const aiSocialLinks = [
	{ name: "GitHub", href: "https://github.com", icon: "lucide:github" },
	{ name: "Twitter", href: "https://twitter.com", icon: "lucide:twitter" },
	{ name: "LinkedIn", href: "https://linkedin.com", icon: "lucide:linkedin" },
	{ name: "Discord", href: "https://discord.com", icon: "lucide:message-circle" },
];

export default function Footer() {
	return (
		<footer className="relative overflow-hidden">
			{/* Background Effects */}
			<div className="absolute inset-0 bg-gradient-to-br from-white via-pink-50/30 to-orange-50/30 dark:from-gray-900 dark:via-pink-950/10 dark:to-orange-950/10" />

			<div className="relative z-10 border-t border-pink-200/50 dark:border-pink-800/50">
				<div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
					<div className="grid grid-cols-1 md:grid-cols-4 gap-8">
						{/* Brand Section */}
						<motion.div
							className="md:col-span-1"
							initial={{ opacity: 0, y: 20 }}
							whileInView={{ opacity: 1, y: 0 }}
							viewport={{ once: true }}
							transition={{ duration: 0.6 }}
						>
							<div className="mb-4">
								<Logo size="md" showBrand={true} showHoverEffects={true} />
							</div>
							<p className="text-gray-600 dark:text-gray-300 mb-6 max-w-sm">
								The most comprehensive <span className="bg-gradient-to-r from-pink-600 to-orange-500 bg-clip-text text-transparent font-semibold">AI-powered</span> Next.js starter kit for building modern web applications.
							</p>

							{/* Social Links */}
							<div className="flex items-center gap-3">
								{aiSocialLinks.map((social, index) => (
									<motion.div
										key={social.name}
										initial={{ opacity: 0, scale: 0 }}
										whileInView={{ opacity: 1, scale: 1 }}
										viewport={{ once: true }}
										transition={{ duration: 0.3, delay: index * 0.1 }}
									>
										<Link
											href={social.href}
											target="_blank"
											rel="noopener noreferrer"
											className="group w-10 h-10 rounded-lg bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm border border-gray-200/50 dark:border-gray-600/50 flex items-center justify-center text-gray-600 dark:text-gray-300 hover:bg-gradient-to-r hover:from-pink-500 hover:to-orange-500 hover:text-white hover:border-transparent transition-all duration-300 hover:shadow-lg hover:shadow-pink-500/25"
											aria-label={social.name}
										>
											<Icon icon={social.icon} className="w-5 h-5 group-hover:scale-110 transition-transform duration-200" />
										</Link>
									</motion.div>
								))}
							</div>
						</motion.div>

						{/* Product Links */}
						<motion.div
							initial={{ opacity: 0, y: 20 }}
							whileInView={{ opacity: 1, y: 0 }}
							viewport={{ once: true }}
							transition={{ duration: 0.6, delay: 0.1 }}
						>
							<h3 className="text-sm font-semibold bg-gradient-to-r from-pink-600 to-orange-500 bg-clip-text text-transparent mb-4">AI Product</h3>
							<ul className="space-y-3">
								{aiFooterLinks.product.map((item, index) => (
									<motion.li
										key={item.name}
										initial={{ opacity: 0, x: -10 }}
										whileInView={{ opacity: 1, x: 0 }}
										viewport={{ once: true }}
										transition={{ duration: 0.3, delay: index * 0.05 }}
									>
										<Link
											href={item.href}
											className="group flex items-center gap-2 text-gray-600 dark:text-gray-300 hover:text-pink-600 dark:hover:text-pink-400 transition-colors text-sm"
										>
											<Icon icon={item.icon} className="w-3 h-3 group-hover:text-orange-500 transition-colors" />
											<span>{item.name}</span>
										</Link>
									</motion.li>
								))}
							</ul>
						</motion.div>

						{/* Company Links */}
						<motion.div
							initial={{ opacity: 0, y: 20 }}
							whileInView={{ opacity: 1, y: 0 }}
							viewport={{ once: true }}
							transition={{ duration: 0.6, delay: 0.2 }}
						>
							<h3 className="text-sm font-semibold bg-gradient-to-r from-pink-600 to-orange-500 bg-clip-text text-transparent mb-4">AI Company</h3>
							<ul className="space-y-3">
								{aiFooterLinks.company.map((item, index) => (
									<motion.li
										key={item.name}
										initial={{ opacity: 0, x: -10 }}
										whileInView={{ opacity: 1, x: 0 }}
										viewport={{ once: true }}
										transition={{ duration: 0.3, delay: index * 0.05 }}
									>
										<Link
											href={item.href}
											className="group flex items-center gap-2 text-gray-600 dark:text-gray-300 hover:text-pink-600 dark:hover:text-pink-400 transition-colors text-sm"
										>
											<Icon icon={item.icon} className="w-3 h-3 group-hover:text-orange-500 transition-colors" />
											<span>{item.name}</span>
										</Link>
									</motion.li>
								))}
							</ul>
						</motion.div>

						{/* Resources Links */}
						<motion.div
							initial={{ opacity: 0, y: 20 }}
							whileInView={{ opacity: 1, y: 0 }}
							viewport={{ once: true }}
							transition={{ duration: 0.6, delay: 0.3 }}
						>
							<h3 className="text-sm font-semibold bg-gradient-to-r from-pink-600 to-orange-500 bg-clip-text text-transparent mb-4">AI Resources</h3>
							<ul className="space-y-3">
								{aiFooterLinks.resources.map((item, index) => (
									<motion.li
										key={item.name}
										initial={{ opacity: 0, x: -10 }}
										whileInView={{ opacity: 1, x: 0 }}
										viewport={{ once: true }}
										transition={{ duration: 0.3, delay: index * 0.05 }}
									>
										<Link
											href={item.href}
											className="group flex items-center gap-2 text-gray-600 dark:text-gray-300 hover:text-pink-600 dark:hover:text-pink-400 transition-colors text-sm"
										>
											<Icon icon={item.icon} className="w-3 h-3 group-hover:text-orange-500 transition-colors" />
											<span>{item.name}</span>
										</Link>
									</motion.li>
								))}
							</ul>
						</motion.div>
					</div>

					{/* Bottom Section */}
					<motion.div
						className="border-t border-pink-200/50 dark:border-pink-800/50 mt-12 pt-8"
						initial={{ opacity: 0 }}
						whileInView={{ opacity: 1 }}
						viewport={{ once: true }}
						transition={{ duration: 0.6, delay: 0.4 }}
					>
						<div className="flex flex-col md:flex-row items-center justify-between gap-4">
							<div className="flex items-center gap-4 text-sm text-gray-600 dark:text-gray-300">
								<span>© 2024 CorePilot. All rights reserved.</span>
								<span className="hidden md:inline">•</span>
								<span className="bg-gradient-to-r from-pink-600 to-orange-500 bg-clip-text text-transparent font-medium">
									Powered by Codelify
								</span>
							</div>
							<div className="flex items-center gap-6 text-sm">
								<Link
									href="/privacy"
									className="text-gray-600 dark:text-gray-300 hover:text-pink-600 dark:hover:text-pink-400 transition-colors flex items-center gap-1"
								>
									<Icon icon="lucide:shield" className="w-3 h-3" />
									Privacy Policy
								</Link>
								<Link
									href="/terms"
									className="text-gray-600 dark:text-gray-300 hover:text-pink-600 dark:hover:text-pink-400 transition-colors flex items-center gap-1"
								>
									<Icon icon="lucide:file-text" className="w-3 h-3" />
									Terms of Service
								</Link>
							</div>
						</div>
					</motion.div>
				</div>
			</div>
		</footer>
	);
}
