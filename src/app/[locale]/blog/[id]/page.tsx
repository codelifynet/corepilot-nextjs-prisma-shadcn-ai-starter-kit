"use client";

import { Header } from "@/components/layout/Header";
import Footer  from "@/section/landing/Footer";
import { Icon } from "@iconify/react";
import { motion } from "framer-motion";
import Link from "next/link";
import { useState } from "react";
import { blogPost, relatedPosts, initialComments } from "@/constants/blog.constants";


export default function BlogDetailPage() {
	const [comments, setComments] = useState(initialComments);
	const [newComment, setNewComment] = useState("");
	const [newReply, setNewReply] = useState("");
	const [replyingTo, setReplyingTo] = useState<number | null>(null);
	const [authorName, setAuthorName] = useState("");
	const [replyAuthorName, setReplyAuthorName] = useState("");

	const handleAddComment = () => {
		if (newComment.trim() && authorName.trim()) {
			const comment = {
				id: Date.now(),
				author: authorName,
				content: newComment,
				date: new Date().toISOString().split("T")[0],
				avatar: "lucide:user",
				replies: [],
			};
			setComments([...comments, comment]);
			setNewComment("");
			setAuthorName("");
		}
	};

	const handleAddReply = (commentId: number) => {
		if (newReply.trim() && replyAuthorName.trim()) {
			const updatedComments = comments.map((comment) => {
				if (comment.id === commentId) {
					const reply = {
						id: Date.now(),
						author: replyAuthorName,
						content: newReply,
						date: new Date().toISOString().split("T")[0],
						avatar: "lucide:user",
					};
					return {
						...comment,
						replies: [...comment.replies, reply],
					};
				}
				return comment;
			});
			setComments(updatedComments);
			setNewReply("");
			setReplyAuthorName("");
			setReplyingTo(null);
		}
	};

	return (
		<div className="min-h-screen">
			<Header />

			<div className="pt-32 pb-20">
				<div className="container mx-auto px-4">
					<div className="grid grid-cols-1 lg:grid-cols-4 gap-12">
						{/* Main Content */}
						<div className="lg:col-span-3">
							{/* Article Header */}
							<motion.div
								initial={{ opacity: 0, y: 30 }}
								animate={{ opacity: 1, y: 0 }}
								transition={{ duration: 0.8 }}
								className="mb-8"
							>
								<div className="mb-6">
									<Link
										href="/blog"
										className="inline-flex items-center text-[#a000ff] hover:text-[#ff006f] font-medium transition-colors duration-300 mb-4"
									>
										<Icon icon="lucide:arrow-left" className="w-4 h-4 mr-2" />
										Back to Blog
									</Link>

									<div className="flex flex-wrap items-center gap-4 text-sm text-gray-500 dark:text-gray-400 mb-4">
										<span className="px-3 py-1 bg-[#a000ff]/10 text-[#a000ff] rounded-full font-medium">
											{blogPost.category}
										</span>
										<div className="flex items-center">
											<Icon icon="lucide:calendar" className="w-4 h-4 mr-2" />
											<span>
												{new Date(blogPost.date).toLocaleDateString()}
											</span>
										</div>
										<div className="flex items-center">
											<Icon icon="lucide:clock" className="w-4 h-4 mr-2" />
											<span>{blogPost.readTime}</span>
										</div>
									</div>
								</div>

								<h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 dark:text-white mb-6">
									{blogPost.title}
								</h1>

								<div className="flex items-center mb-8">
									<div className="w-12 h-12 bg-gradient-to-br from-[#a000ff] to-[#ff006f] rounded-full flex items-center justify-center mr-4">
										<Icon icon="lucide:user" className="w-6 h-6 text-white" />
									</div>
									<div>
										<p className="font-semibold text-gray-900 dark:text-white">
											{blogPost.author}
										</p>
										<p className="text-sm text-gray-500 dark:text-gray-400">
											Author
										</p>
									</div>
								</div>

								<div className="flex flex-wrap gap-2 mb-8">
									{blogPost.tags.map((tag) => (
										<span
											key={tag}
											className="px-3 py-1 bg-gray-100 dark:bg-gray-800 text-sm font-medium text-gray-600 dark:text-gray-300 rounded-lg"
										>
											{tag}
										</span>
									))}
								</div>
							</motion.div>

							{/* Article Image */}
							<motion.div
								initial={{ opacity: 0, y: 30 }}
								animate={{ opacity: 1, y: 0 }}
								transition={{ duration: 0.8, delay: 0.1 }}
								className="mb-12"
							>
								<div className="relative h-64 sm:h-80 bg-gradient-to-br from-[#a000ff]/10 to-[#ff006f]/10 rounded-3xl flex items-center justify-center">
									<div className="w-24 h-24 bg-gradient-to-br from-[#a000ff] to-[#ff006f] rounded-3xl flex items-center justify-center">
										<Icon
											icon={blogPost.image}
											className="w-12 h-12 text-white"
										/>
									</div>
								</div>
							</motion.div>

							{/* Article Content */}
							<motion.div
								initial={{ opacity: 0, y: 30 }}
								animate={{ opacity: 1, y: 0 }}
								transition={{ duration: 0.8, delay: 0.2 }}
								className="prose prose-lg dark:prose-invert max-w-none mb-12"
							>
								<h2>Introduction</h2>
								<p>
									Next.js 14 brings exciting new features and improvements that
									make building modern web applications even more enjoyable. In
									this comprehensive guide, we'll explore how to set up a new
									project with TypeScript and take advantage of the latest
									features.
								</p>

								<h2>Setting Up Your Project</h2>
								<p>
									To get started with Next.js 14 and TypeScript, you'll need to
									create a new project. The easiest way is to use the
									create-next-app command:
								</p>

								<pre>
									<code>
										npx create-next-app@latest my-app --typescript --tailwind
										--eslint
									</code>
								</pre>

								<p>
									This command will create a new Next.js project with
									TypeScript, Tailwind CSS, and ESLint pre-configured.
								</p>

								<h2>Key Features in Next.js 14</h2>
								<p>Next.js 14 introduces several powerful features:</p>

								<ul>
									<li>
										<strong>Server Actions:</strong> Simplified server-side form
										handling
									</li>
									<li>
										<strong>Partial Prerendering:</strong> Improved performance
										with selective rendering
									</li>
									<li>
										<strong>Enhanced App Router:</strong> Better routing
										capabilities
									</li>
									<li>
										<strong>Improved Developer Experience:</strong> Faster
										builds and better error messages
									</li>
								</ul>

								<h2>TypeScript Integration</h2>
								<p>
									TypeScript integration in Next.js 14 is seamless. The
									framework automatically detects TypeScript files and provides
									excellent type safety out of the box.
								</p>

								<h2>Conclusion</h2>
								<p>
									Next.js 14 with TypeScript provides an excellent foundation
									for building modern web applications. The combination of
									powerful features and type safety makes it an ideal choice for
									developers.
								</p>
							</motion.div>

							{/* Comments Section */}
							<motion.div
								initial={{ opacity: 0, y: 30 }}
								animate={{ opacity: 1, y: 0 }}
								transition={{ duration: 0.8, delay: 0.3 }}
								className="border-t border-gray-200 dark:border-gray-700 pt-12"
							>
								<h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-8">
									Comments ({comments.length})
								</h3>

								{/* Add Comment Form */}
								<div className="bg-gray-50 dark:bg-gray-800/50 rounded-2xl p-6 mb-8">
									<h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
										Add a Comment
									</h4>
									<div className="space-y-4">
										<input
											type="text"
											placeholder="Your name"
											value={authorName}
											onChange={(e) => setAuthorName(e.target.value)}
											className="w-full px-4 py-3 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-xl text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#a000ff]/50 focus:border-[#a000ff]/50 transition-all duration-300"
										/>
										<textarea
											placeholder="Write your comment..."
											value={newComment}
											onChange={(e) => setNewComment(e.target.value)}
											rows={4}
											className="w-full px-4 py-3 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-xl text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#a000ff]/50 focus:border-[#a000ff]/50 transition-all duration-300 resize-none"
										/>
										<button
											onClick={handleAddComment}
											className="px-6 py-3 bg-gradient-to-r from-[#a000ff] to-[#ff006f] text-white font-medium rounded-xl hover:shadow-lg hover:shadow-[#a000ff]/25 transition-all duration-300"
										>
											Post Comment
										</button>
									</div>
								</div>

								{/* Comments List */}
								<div className="space-y-6">
									{comments.map((comment) => (
										<div
											key={comment.id}
											className="bg-white dark:bg-gray-800/50 rounded-2xl p-6"
										>
											<div className="flex items-start space-x-4">
												<div className="w-10 h-10 bg-gradient-to-br from-[#a000ff] to-[#ff006f] rounded-full flex items-center justify-center flex-shrink-0">
													<Icon
														icon={comment.avatar}
														className="w-5 h-5 text-white"
													/>
												</div>
												<div className="flex-1">
													<div className="flex items-center space-x-2 mb-2">
														<h5 className="font-semibold text-gray-900 dark:text-white">
															{comment.author}
														</h5>
														<span className="text-sm text-gray-500 dark:text-gray-400">
															{new Date(comment.date).toLocaleDateString()}
														</span>
													</div>
													<p className="text-gray-700 dark:text-gray-300 mb-3">
														{comment.content}
													</p>
													<button
														onClick={() =>
															setReplyingTo(
																replyingTo === comment.id ? null : comment.id,
															)
														}
														className="text-[#a000ff] hover:text-[#ff006f] font-medium text-sm transition-colors duration-300"
													>
														Reply
													</button>

													{/* Reply Form */}
													{replyingTo === comment.id && (
														<div className="mt-4 bg-gray-50 dark:bg-gray-700/50 rounded-xl p-4">
															<div className="space-y-3">
																<input
																	type="text"
																	placeholder="Your name"
																	value={replyAuthorName}
																	onChange={(e) =>
																		setReplyAuthorName(e.target.value)
																	}
																	className="w-full px-3 py-2 bg-white dark:bg-gray-600 border border-gray-300 dark:border-gray-500 rounded-lg text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#a000ff]/50 focus:border-[#a000ff]/50 transition-all duration-300"
																/>
																<textarea
																	placeholder="Write your reply..."
																	value={newReply}
																	onChange={(e) => setNewReply(e.target.value)}
																	rows={3}
																	className="w-full px-3 py-2 bg-white dark:bg-gray-600 border border-gray-300 dark:border-gray-500 rounded-lg text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#a000ff]/50 focus:border-[#a000ff]/50 transition-all duration-300 resize-none"
																/>
																<div className="flex space-x-2">
																	<button
																		onClick={() => handleAddReply(comment.id)}
																		className="px-4 py-2 bg-gradient-to-r from-[#a000ff] to-[#ff006f] text-white font-medium rounded-lg hover:shadow-lg hover:shadow-[#a000ff]/25 transition-all duration-300 text-sm"
																	>
																		Post Reply
																	</button>
																	<button
																		onClick={() => setReplyingTo(null)}
																		className="px-4 py-2 bg-gray-200 dark:bg-gray-600 text-gray-700 dark:text-gray-300 font-medium rounded-lg hover:bg-gray-300 dark:hover:bg-gray-500 transition-all duration-300 text-sm"
																	>
																		Cancel
																	</button>
																</div>
															</div>
														</div>
													)}

													{/* Replies */}
													{comment.replies.length > 0 && (
														<div className="mt-4 space-y-4">
															{comment.replies.map((reply) => (
																<div
																	key={reply.id}
																	className="flex items-start space-x-3 ml-6 bg-gray-50 dark:bg-gray-700/50 rounded-xl p-4"
																>
																	<div className="w-8 h-8 bg-gradient-to-br from-[#ff006f] to-[#a000ff] rounded-full flex items-center justify-center flex-shrink-0">
																		<Icon
																			icon={reply.avatar}
																			className="w-4 h-4 text-white"
																		/>
																	</div>
																	<div className="flex-1">
																		<div className="flex items-center space-x-2 mb-1">
																			<h6 className="font-medium text-gray-900 dark:text-white text-sm">
																				{reply.author}
																			</h6>
																			<span className="text-xs text-gray-500 dark:text-gray-400">
																				{new Date(
																					reply.date,
																				).toLocaleDateString()}
																			</span>
																		</div>
																		<p className="text-gray-700 dark:text-gray-300 text-sm">
																			{reply.content}
																		</p>
																	</div>
																</div>
															))}
														</div>
													)}
												</div>
											</div>
										</div>
									))}
								</div>
							</motion.div>
						</div>

						{/* Sidebar */}
						<div className="lg:col-span-1">
							<div className="sticky top-32 space-y-8">
								{/* Table of Contents */}
								<motion.div
									initial={{ opacity: 0, x: 30 }}
									animate={{ opacity: 1, x: 0 }}
									transition={{ duration: 0.8, delay: 0.4 }}
									className="bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm border border-gray-200/50 dark:border-gray-700/50 rounded-2xl p-6"
								>
									<h4 className="font-bold text-gray-900 dark:text-white mb-4 flex items-center">
										<Icon
											icon="lucide:list"
											className="w-5 h-5 mr-2 text-[#a000ff]"
										/>
										Table of Contents
									</h4>
									<nav className="space-y-2">
										{[
											"Introduction",
											"Setting Up Your Project",
											"Key Features in Next.js 14",
											"TypeScript Integration",
											"Conclusion",
										].map((item) => (
											<a
												key={item}
												href={`#${item.toLowerCase().replace(/\s+/g, "-")}`}
												className="block text-sm text-gray-600 dark:text-gray-300 hover:text-[#a000ff] transition-colors duration-300 py-1"
											>
												{item}
											</a>
										))}
									</nav>
								</motion.div>

								{/* Related Posts */}
								<motion.div
									initial={{ opacity: 0, x: 30 }}
									animate={{ opacity: 1, x: 0 }}
									transition={{ duration: 0.8, delay: 0.5 }}
									className="bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm border border-gray-200/50 dark:border-gray-700/50 rounded-2xl p-6"
								>
									<h4 className="font-bold text-gray-900 dark:text-white mb-4 flex items-center">
										<Icon
											icon="lucide:bookmark"
											className="w-5 h-5 mr-2 text-[#ff006f]"
										/>
										Related Posts
									</h4>
									<div className="space-y-4">
										{relatedPosts.map((post) => (
											<Link
												key={post.id}
												href={`/blog/${post.id}`}
												className="block group"
											>
												<div className="flex items-start space-x-3 p-3 rounded-xl hover:bg-gray-100/50 dark:hover:bg-gray-700/50 transition-all duration-300">
													<div className="w-10 h-10 bg-gradient-to-br from-[#a000ff] to-[#ff006f] rounded-lg flex items-center justify-center flex-shrink-0">
														<Icon
															icon={post.image}
															className="w-5 h-5 text-white"
														/>
													</div>
													<div className="flex-1">
														<h5 className="font-medium text-gray-900 dark:text-white text-sm group-hover:text-[#a000ff] transition-colors duration-300 line-clamp-2">
															{post.title}
														</h5>
														<p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
															{post.readTime}
														</p>
													</div>
												</div>
											</Link>
										))}
									</div>
								</motion.div>

								{/* Share */}
								<motion.div
									initial={{ opacity: 0, x: 30 }}
									animate={{ opacity: 1, x: 0 }}
									transition={{ duration: 0.8, delay: 0.6 }}
									className="bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm border border-gray-200/50 dark:border-gray-700/50 rounded-2xl p-6"
								>
									<h4 className="font-bold text-gray-900 dark:text-white mb-4 flex items-center">
										<Icon
											icon="lucide:share-2"
											className="w-5 h-5 mr-2 text-cyan-400"
										/>
										Share Article
									</h4>
									<div className="flex space-x-3">
										<button className="p-3 bg-[#1DA1F2]/10 text-[#1DA1F2] rounded-xl hover:bg-[#1DA1F2]/20 transition-all duration-300">
											<Icon icon="lucide:twitter" className="w-5 h-5" />
										</button>
										<button className="p-3 bg-[#0077B5]/10 text-[#0077B5] rounded-xl hover:bg-[#0077B5]/20 transition-all duration-300">
											<Icon icon="lucide:linkedin" className="w-5 h-5" />
										</button>
										<button className="p-3 bg-gray-500/10 text-gray-500 rounded-xl hover:bg-gray-500/20 transition-all duration-300">
											<Icon icon="lucide:link" className="w-5 h-5" />
										</button>
									</div>
								</motion.div>
							</div>
						</div>
					</div>
				</div>
			</div>

			<Footer />
		</div>
	);
}
