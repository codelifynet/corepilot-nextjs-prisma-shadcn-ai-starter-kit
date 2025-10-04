import type { Metadata } from "next";
import { PageHeader } from "@/components/ui/page-header";
import { getPageGradient } from "@/lib/page-utils";

export const metadata: Metadata = {
	title: "Blog Posts | CorePilot Admin",
	description: "Create and manage blog posts",
};

export default function BlogPostsPage() {
	return (
		<div className="container mx-auto p-6">
			<PageHeader
				title="Blog Posts"
				description="Create, edit, and manage your blog content"
				gradient={getPageGradient(
					"/admin/content-management/content/blog-posts",
				)}
			/>

			<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
				<div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700">
					<h3 className="text-sm font-medium text-gray-500 dark:text-gray-400">
						Total Posts
					</h3>
					<p className="text-2xl font-bold text-gray-900 dark:text-white">
						245
					</p>
					<p className="text-xs text-green-500">+12 this month</p>
				</div>
				<div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700">
					<h3 className="text-sm font-medium text-gray-500 dark:text-gray-400">
						Published
					</h3>
					<p className="text-2xl font-bold text-gray-900 dark:text-white">
						198
					</p>
					<p className="text-xs text-blue-500">81% of total</p>
				</div>
				<div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700">
					<h3 className="text-sm font-medium text-gray-500 dark:text-gray-400">
						Drafts
					</h3>
					<p className="text-2xl font-bold text-gray-900 dark:text-white">34</p>
					<p className="text-xs text-yellow-500">14% of total</p>
				</div>
				<div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700">
					<h3 className="text-sm font-medium text-gray-500 dark:text-gray-400">
						Scheduled
					</h3>
					<p className="text-2xl font-bold text-gray-900 dark:text-white">13</p>
					<p className="text-xs text-purple-500">5% of total</p>
				</div>
			</div>

			<div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
				<div className="lg:col-span-2 bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700">
					<div className="flex items-center justify-between mb-4">
						<h2 className="text-xl font-bold text-gray-900 dark:text-white">
							Recent Posts
						</h2>
						<button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
							+ New Post
						</button>
					</div>
					<div className="space-y-4">
						<div className="flex items-center justify-between p-4 border border-gray-100 dark:border-gray-700 rounded-lg">
							<div className="flex items-start space-x-4">
								<div className="w-16 h-16 bg-gray-200 dark:bg-gray-700 rounded-lg"></div>
								<div>
									<h3 className="font-semibold text-gray-900 dark:text-white">
										Getting Started with Next.js 14
									</h3>
									<p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
										A comprehensive guide to the latest features...
									</p>
									<div className="flex items-center space-x-2 mt-2">
										<span className="px-2 py-1 bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200 text-xs rounded">
											Published
										</span>
										<span className="text-xs text-gray-500 dark:text-gray-400">
											March 15, 2024
										</span>
									</div>
								</div>
							</div>
							<div className="flex items-center space-x-2">
								<button className="px-3 py-1 text-blue-600 hover:text-blue-800 text-sm">
									Edit
								</button>
								<button className="px-3 py-1 text-red-600 hover:text-red-800 text-sm">
									Delete
								</button>
							</div>
						</div>
						<div className="flex items-center justify-between p-4 border border-gray-100 dark:border-gray-700 rounded-lg">
							<div className="flex items-start space-x-4">
								<div className="w-16 h-16 bg-gray-200 dark:bg-gray-700 rounded-lg"></div>
								<div>
									<h3 className="font-semibold text-gray-900 dark:text-white">
										TypeScript Best Practices 2024
									</h3>
									<p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
										Learn the best practices for TypeScript development...
									</p>
									<div className="flex items-center space-x-2 mt-2">
										<span className="px-2 py-1 bg-yellow-100 dark:bg-yellow-900 text-yellow-800 dark:text-yellow-200 text-xs rounded">
											Draft
										</span>
										<span className="text-xs text-gray-500 dark:text-gray-400">
											March 12, 2024
										</span>
									</div>
								</div>
							</div>
							<div className="flex items-center space-x-2">
								<button className="px-3 py-1 text-blue-600 hover:text-blue-800 text-sm">
									Edit
								</button>
								<button className="px-3 py-1 text-red-600 hover:text-red-800 text-sm">
									Delete
								</button>
							</div>
						</div>
						<div className="flex items-center justify-between p-4 border border-gray-100 dark:border-gray-700 rounded-lg">
							<div className="flex items-start space-x-4">
								<div className="w-16 h-16 bg-gray-200 dark:bg-gray-700 rounded-lg"></div>
								<div>
									<h3 className="font-semibold text-gray-900 dark:text-white">
										Building Scalable React Applications
									</h3>
									<p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
										Architecture patterns for large-scale React apps...
									</p>
									<div className="flex items-center space-x-2 mt-2">
										<span className="px-2 py-1 bg-purple-100 dark:bg-purple-900 text-purple-800 dark:text-purple-200 text-xs rounded">
											Scheduled
										</span>
										<span className="text-xs text-gray-500 dark:text-gray-400">
											March 20, 2024
										</span>
									</div>
								</div>
							</div>
							<div className="flex items-center space-x-2">
								<button className="px-3 py-1 text-blue-600 hover:text-blue-800 text-sm">
									Edit
								</button>
								<button className="px-3 py-1 text-red-600 hover:text-red-800 text-sm">
									Delete
								</button>
							</div>
						</div>
					</div>
				</div>

				<div className="space-y-6">
					<div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700">
						<h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
							Quick Actions
						</h3>
						<div className="space-y-2">
							<button className="w-full p-3 text-left bg-blue-50 dark:bg-blue-900/20 rounded-lg hover:bg-blue-100 dark:hover:bg-blue-900/30 transition-colors">
								<h4 className="font-medium text-blue-900 dark:text-blue-100">
									Create New Post
								</h4>
								<p className="text-sm text-blue-700 dark:text-blue-300">
									Start writing a new blog post
								</p>
							</button>
							<button className="w-full p-3 text-left bg-green-50 dark:bg-green-900/20 rounded-lg hover:bg-green-100 dark:hover:bg-green-900/30 transition-colors">
								<h4 className="font-medium text-green-900 dark:text-green-100">
									Import Posts
								</h4>
								<p className="text-sm text-green-700 dark:text-green-300">
									Import from external sources
								</p>
							</button>
							<button className="w-full p-3 text-left bg-purple-50 dark:bg-purple-900/20 rounded-lg hover:bg-purple-100 dark:hover:bg-purple-900/30 transition-colors">
								<h4 className="font-medium text-purple-900 dark:text-purple-100">
									Bulk Actions
								</h4>
								<p className="text-sm text-purple-700 dark:text-purple-300">
									Manage multiple posts
								</p>
							</button>
						</div>
					</div>

					<div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700">
						<h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
							Popular Categories
						</h3>
						<div className="space-y-3">
							<div className="flex items-center justify-between">
								<span className="text-gray-900 dark:text-white">
									Technology
								</span>
								<span className="px-2 py-1 bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 text-sm rounded">
									45
								</span>
							</div>
							<div className="flex items-center justify-between">
								<span className="text-gray-900 dark:text-white">Tutorials</span>
								<span className="px-2 py-1 bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 text-sm rounded">
									38
								</span>
							</div>
							<div className="flex items-center justify-between">
								<span className="text-gray-900 dark:text-white">News</span>
								<span className="px-2 py-1 bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 text-sm rounded">
									22
								</span>
							</div>
							<div className="flex items-center justify-between">
								<span className="text-gray-900 dark:text-white">Reviews</span>
								<span className="px-2 py-1 bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 text-sm rounded">
									15
								</span>
							</div>
						</div>
					</div>
				</div>
			</div>

			<div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700">
				<h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
					Blog Analytics
				</h2>
				<p className="text-gray-600 dark:text-gray-400">
					Detailed blog analytics will be implemented here. This will include
					post performance metrics, reader engagement, popular content analysis,
					and SEO insights.
				</p>
			</div>
		</div>
	);
}
