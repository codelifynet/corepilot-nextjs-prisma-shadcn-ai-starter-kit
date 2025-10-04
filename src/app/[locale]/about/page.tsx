"use client";

import { Header } from "@/components/layout/Header";
import Footer from "@/section/landing/Footer";
import { Icon } from "@iconify/react";
import { motion } from "framer-motion";

export default function AboutPage() {
	return (
		<div className="min-h-screen">
			<Header />

			{/* Hero Section */}
			<section className="relative pt-32 pb-20 bg-gradient-to-br from-white via-gray-50 to-blue-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 overflow-hidden">
				{/* Background Effects */}
				<div className="absolute inset-0">
					<div className="absolute top-0 left-0 w-96 h-96 bg-[#a000ff]/10 rounded-full blur-3xl" />
					<div className="absolute bottom-0 right-0 w-96 h-96 bg-[#ff006f]/10 rounded-full blur-3xl" />
					<div className="absolute inset-0 bg-grid-gray-900/5 [mask-image:linear-gradient(0deg,transparent,rgba(0,0,0,0.1))]" />
				</div>

				<div className="container mx-auto px-4 relative">
					<motion.div
						initial={{ opacity: 0, y: 30 }}
						animate={{ opacity: 1, y: 0 }}
						transition={{ duration: 0.8 }}
						className="max-w-4xl mx-auto text-center"
					>
						<h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-6">
							About
							<span className="bg-gradient-to-r from-[#a000ff] via-[#c44eff] to-[#ff006f] bg-clip-text text-transparent ml-3">
								CorePilot
							</span>
						</h1>
						<p className="text-xl text-gray-600 dark:text-gray-300 mb-8 max-w-3xl mx-auto leading-relaxed">
							We're building the future of web development with cutting-edge
							technology and innovative solutions. Our mission is to empower
							developers worldwide to create exceptional applications.
						</p>
					</motion.div>
				</div>
			</section>

			{/* Mission Section */}
			<section className="py-20 bg-gray-200/30 dark:bg-gray-800/30">
				<div className="container mx-auto px-4">
					<div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
						<motion.div
							initial={{ opacity: 0, x: -30 }}
							whileInView={{ opacity: 1, x: 0 }}
							transition={{ duration: 0.8 }}
							viewport={{ once: true }}
						>
							<h2 className="text-3xl sm:text-4xl font-bold mb-6">
								Our Mission
							</h2>
							<p className="text-gray-600 dark:text-gray-300 text-lg mb-6 leading-relaxed">
								At CorePilot, we believe that great software should be
								accessible to everyone. We're dedicated to creating tools and
								platforms that simplify complex development processes while
								maintaining the highest standards of quality and performance.
							</p>
							<p className="text-gray-600 dark:text-gray-300 text-lg leading-relaxed">
								Our team of passionate developers and designers work tirelessly
								to push the boundaries of what's possible in web development,
								always keeping the developer experience at the forefront of our
								innovations.
							</p>
						</motion.div>

						<motion.div
							initial={{ opacity: 0, x: 30 }}
							whileInView={{ opacity: 1, x: 0 }}
							transition={{ duration: 0.8 }}
							viewport={{ once: true }}
							className="relative"
						>
							<div className="bg-gradient-to-br from-[#a000ff]/10 to-[#ff006f]/10 rounded-3xl p-8 backdrop-blur-sm border border-gray-200/50 dark:border-gray-700/50">
								<div className="grid grid-cols-2 gap-6">
									<div className="text-center">
										<div className="w-16 h-16 bg-gradient-to-br from-[#a000ff] to-[#ff006f] rounded-2xl flex items-center justify-center mx-auto mb-4">
											<Icon
												icon="lucide:users"
												className="w-8 h-8 text-white"
											/>
										</div>
										<h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
											50K+
										</h3>
										<p className="text-gray-600 dark:text-gray-300">
											Developers
										</p>
									</div>
									<div className="text-center">
										<div className="w-16 h-16 bg-gradient-to-br from-[#ff006f] to-[#a000ff] rounded-2xl flex items-center justify-center mx-auto mb-4">
											<Icon
												icon="lucide:globe"
												className="w-8 h-8 text-white"
											/>
										</div>
										<h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
											120+
										</h3>
										<p className="text-gray-600 dark:text-gray-300">
											Countries
										</p>
									</div>
									<div className="text-center">
										<div className="w-16 h-16 bg-gradient-to-br from-cyan-400 to-blue-500 rounded-2xl flex items-center justify-center mx-auto mb-4">
											<Icon
												icon="lucide:rocket"
												className="w-8 h-8 text-white"
											/>
										</div>
										<h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
											1M+
										</h3>
										<p className="text-gray-600 dark:text-gray-300">Projects</p>
									</div>
									<div className="text-center">
										<div className="w-16 h-16 bg-gradient-to-br from-green-400 to-emerald-500 rounded-2xl flex items-center justify-center mx-auto mb-4">
											<Icon
												icon="lucide:award"
												className="w-8 h-8 text-white"
											/>
										</div>
										<h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
											99.9%
										</h3>
										<p className="text-gray-600 dark:text-gray-300">Uptime</p>
									</div>
								</div>
							</div>
						</motion.div>
					</div>
				</div>
			</section>

			{/* Team Section */}
			<section className="py-20">
				<div className="container mx-auto px-4">
					<motion.div
						initial={{ opacity: 0, y: 30 }}
						whileInView={{ opacity: 1, y: 0 }}
						transition={{ duration: 0.8 }}
						viewport={{ once: true }}
						className="text-center mb-16"
					>
						<h2 className="text-3xl sm:text-4xl font-bold mb-6">
							Meet Our Team
						</h2>
						<p className="text-gray-600 dark:text-gray-300 text-lg max-w-2xl mx-auto">
							The passionate individuals behind CorePilot who make innovation
							possible.
						</p>
					</motion.div>

					<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
						{[
							{
								name: "Alex Johnson",
								role: "CEO & Founder",
								image: "lucide:user",
								bio: "Visionary leader with 15+ years in tech innovation.",
							},
							{
								name: "Sarah Chen",
								role: "CTO",
								image: "lucide:user",
								bio: "Full-stack architect passionate about scalable solutions.",
							},
							{
								name: "Mike Rodriguez",
								role: "Lead Designer",
								image: "lucide:user",
								bio: "Creative mind focused on exceptional user experiences.",
							},
						].map((member, index) => (
							<motion.div
								key={member.name}
								initial={{ opacity: 0, y: 30 }}
								whileInView={{ opacity: 1, y: 0 }}
								transition={{ duration: 0.8, delay: index * 0.1 }}
								viewport={{ once: true }}
								className="bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm border border-gray-200/50 dark:border-gray-700/50 rounded-3xl p-8 text-center hover:shadow-lg hover:shadow-gray-200/50 dark:hover:shadow-gray-800/50 transition-all duration-300"
							>
								<div className="w-24 h-24 bg-gradient-to-br from-[#a000ff] to-[#ff006f] rounded-full flex items-center justify-center mx-auto mb-6">
									<Icon icon={member.image} className="w-12 h-12 text-white" />
								</div>
								<h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
									{member.name}
								</h3>
								<p className="text-[#a000ff] font-semibold mb-4">
									{member.role}
								</p>
								<p className="text-gray-600 dark:text-gray-300">{member.bio}</p>
							</motion.div>
						))}
					</div>
				</div>
			</section>

			{/* Values Section */}
			<section className="py-20 bg-gray-200/30 dark:bg-gray-800/30">
				<div className="container mx-auto px-4">
					<motion.div
						initial={{ opacity: 0, y: 30 }}
						whileInView={{ opacity: 1, y: 0 }}
						transition={{ duration: 0.8 }}
						viewport={{ once: true }}
						className="text-center mb-16"
					>
						<h2 className="text-3xl sm:text-4xl font-bold mb-6">Our Values</h2>
						<p className="text-gray-600 dark:text-gray-300 text-lg max-w-2xl mx-auto">
							The principles that guide everything we do at CorePilot.
						</p>
					</motion.div>

					<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
						{[
							{
								icon: "lucide:lightbulb",
								title: "Innovation",
								description:
									"Constantly pushing boundaries and exploring new possibilities.",
							},
							{
								icon: "lucide:heart",
								title: "Passion",
								description:
									"We love what we do and it shows in every product we create.",
							},
							{
								icon: "lucide:shield-check",
								title: "Quality",
								description:
									"Never compromising on excellence and attention to detail.",
							},
							{
								icon: "lucide:users",
								title: "Community",
								description:
									"Building together with our amazing developer community.",
							},
						].map((value, index) => (
							<motion.div
								key={value.title}
								initial={{ opacity: 0, y: 30 }}
								whileInView={{ opacity: 1, y: 0 }}
								transition={{ duration: 0.8, delay: index * 0.1 }}
								viewport={{ once: true }}
								className="text-center"
							>
								<div className="w-16 h-16 bg-gradient-to-br from-[#a000ff] to-[#ff006f] rounded-2xl flex items-center justify-center mx-auto mb-6">
									<Icon icon={value.icon} className="w-8 h-8 text-white" />
								</div>
								<h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
									{value.title}
								</h3>
								<p className="text-gray-600 dark:text-gray-300">
									{value.description}
								</p>
							</motion.div>
						))}
					</div>
				</div>
			</section>

			<Footer />
		</div>
	);
}
