"use client";

import { Header } from "@/components/layout/Header";
import  Footer  from "@/section/landing/Footer";
import { Icon } from "@iconify/react";
import { motion } from "framer-motion";
import Link from "next/link";
import { useState } from "react";
import { blogPosts, categories } from "@/constants/blog.constants";


export default function BlogPage() {
	const [selectedCategory, setSelectedCategory] = useState("All");
	const [searchTerm, setSearchTerm] = useState("");

	const filteredPosts = blogPosts.filter((post) => {
		const matchesCategory =
			selectedCategory === "All" || post.category === selectedCategory;
		const matchesSearch =
			post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
			post.excerpt.toLowerCase().includes(searchTerm.toLowerCase()) ||
			post.tags.some((tag) =>
				tag.toLowerCase().includes(searchTerm.toLowerCase()),
			);
		return matchesCategory && matchesSearch;
	});

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
							Our
							<span className="bg-gradient-to-r from-[#a000ff] via-[#c44eff] to-[#ff006f] bg-clip-text text-transparent ml-3">
								Blog
							</span>
						</h1>
						<p className="text-xl text-gray-600 dark:text-gray-300 mb-8 max-w-3xl mx-auto leading-relaxed">
							Insights, tutorials, and updates from the CorePilot team. Stay
							up-to-date with the latest in web development.
						</p>
					</motion.div>
				</div>
			</section>

			{/* Search and Filter Section */}
			<section className="py-12 bg-gray-200/30 dark:bg-gray-800/30">
				<div className="container mx-auto px-4">
					<div className="max-w-4xl mx-auto">
						{/* Search Bar */}
						<motion.div
							initial={{ opacity: 0, y: 20 }}
							animate={{ opacity: 1, y: 0 }}
							transition={{ duration: 0.6 }}
							className="mb-8"
						>
							<div className="relative">
								<Icon
									icon="lucide:search"
									className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5"
								/>
								<input
									type="text"
									placeholder="Search articles..."
									value={searchTerm}
									onChange={(e) => setSearchTerm(e.target.value)}
									className="w-full pl-12 pr-4 py-4 bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm border border-gray-300 dark:border-gray-600 rounded-2xl text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#a000ff]/50 focus:border-[#a000ff]/50 transition-all duration-300"
								/>
							</div>
						</motion.div>

						{/* Category Filter */}
						<motion.div
							initial={{ opacity: 0, y: 20 }}
							animate={{ opacity: 1, y: 0 }}
							transition={{ duration: 0.6, delay: 0.1 }}
							className="flex flex-wrap gap-3 justify-center"
						>
							{categories.map((category) => (
								<button
									key={category}
									onClick={() => setSelectedCategory(category)}
									className={`px-6 py-3 rounded-full font-medium transition-all duration-300 ${
										selectedCategory === category
											? "bg-gradient-to-r from-[#a000ff] to-[#ff006f] text-white shadow-lg"
											: "bg-white/50 dark:bg-gray-800/50 text-gray-700 dark:text-gray-300 hover:bg-white/80 dark:hover:bg-gray-700/80 border border-gray-200 dark:border-gray-600"
									}`}
								>
									{category}
								</button>
							))}
						</motion.div>
					</div>
				</div>
			</section>

			{/* Blog Posts Grid */}
			<section className="py-20">
				<div className="container mx-auto px-4">
					<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
						{filteredPosts.map((post, index) => (
							<motion.article
								key={post.id}
								initial={{ opacity: 0, y: 30 }}
								whileInView={{ opacity: 1, y: 0 }}
								transition={{ duration: 0.8, delay: index * 0.1 }}
								viewport={{ once: true }}
								className="group bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm border border-gray-200/50 dark:border-gray-700/50 rounded-3xl overflow-hidden hover:shadow-xl hover:shadow-gray-200/50 dark:hover:shadow-gray-800/50 transition-all duration-300"
							>
								{/* Post Image */}
								<div className="relative h-48 bg-gradient-to-br from-[#a000ff]/10 to-[#ff006f]/10 flex items-center justify-center">
									<div className="w-16 h-16 bg-gradient-to-br from-[#a000ff] to-[#ff006f] rounded-2xl flex items-center justify-center">
										<Icon icon={post.image} className="w-8 h-8 text-white" />
									</div>
									<div className="absolute top-4 left-4">
										<span className="px-3 py-1 bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm text-sm font-medium text-[#a000ff] rounded-full">
											{post.category}
										</span>
									</div>
								</div>

								{/* Post Content */}
								<div className="p-6">
									<div className="flex items-center text-sm text-gray-500 dark:text-gray-400 mb-3">
										<Icon icon="lucide:calendar" className="w-4 h-4 mr-2" />
										<span>{new Date(post.date).toLocaleDateString()}</span>
										<span className="mx-2">•</span>
										<Icon icon="lucide:clock" className="w-4 h-4 mr-2" />
										<span>{post.readTime}</span>
									</div>

									<h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3 group-hover:text-[#a000ff] transition-colors duration-300">
										{post.title}
									</h3>

									<p className="text-gray-600 dark:text-gray-300 mb-4 line-clamp-3">
										{post.excerpt}
									</p>

									<div className="flex flex-wrap gap-2 mb-4">
										{post.tags.map((tag) => (
											<span
												key={tag}
												className="px-2 py-1 bg-gray-100 dark:bg-gray-700 text-xs font-medium text-gray-600 dark:text-gray-300 rounded-lg"
											>
												{tag}
											</span>
										))}
									</div>

									<div className="flex items-center justify-between">
										<div className="flex items-center">
											<div className="w-8 h-8 bg-gradient-to-br from-[#a000ff] to-[#ff006f] rounded-full flex items-center justify-center mr-3">
												<Icon
													icon="lucide:user"
													className="w-4 h-4 text-white"
												/>
											</div>
											<span className="text-sm font-medium text-gray-700 dark:text-gray-300">
												{post.author}
											</span>
										</div>

										<Link
											href={`/blog/${post.id}`}
											className="inline-flex items-center text-[#a000ff] hover:text-[#ff006f] font-medium transition-colors duration-300"
										>
											Read More
											<Icon
												icon="lucide:arrow-right"
												className="w-4 h-4 ml-2"
											/>
										</Link>
									</div>
								</div>
							</motion.article>
						))}
					</div>

					{/* No Results */}
					{filteredPosts.length === 0 && (
						<motion.div
							initial={{ opacity: 0, y: 30 }}
							animate={{ opacity: 1, y: 0 }}
							transition={{ duration: 0.8 }}
							className="text-center py-16"
						>
							<div className="w-24 h-24 bg-gray-100 dark:bg-gray-800 rounded-full flex items-center justify-center mx-auto mb-6">
								<Icon
									icon="lucide:search-x"
									className="w-12 h-12 text-gray-400"
								/>
							</div>
							<h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
								No articles found
							</h3>
							<p className="text-gray-600 dark:text-gray-300 mb-6">
								Try adjusting your search terms or category filter.
							</p>
							<button
								onClick={() => {
									setSearchTerm("");
									setSelectedCategory("All");
								}}
								className="px-6 py-3 bg-gradient-to-r from-[#a000ff] to-[#ff006f] text-white font-medium rounded-2xl hover:shadow-lg hover:shadow-[#a000ff]/25 transition-all duration-300"
							>
								Clear Filters
							</button>
						</motion.div>
					)}
				</div>
			</section>

			<Footer />
		</div>
	);
}
