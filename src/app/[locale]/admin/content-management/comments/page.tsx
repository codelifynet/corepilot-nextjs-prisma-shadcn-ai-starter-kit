import type { Metadata } from "next";
import { PageHeader } from "@/components/ui/page-header";
import { getPageGradient } from "@/lib/page-utils";

export const metadata: Metadata = {
	title: "Comments | CorePilot Admin",
	description: "Moderate and manage user comments",
};

export default function CommentsPage() {
	return (
		<div className="container mx-auto p-6">
			<PageHeader
				title="Comments"
				description="Moderate and manage user comments and feedback"
				gradient={getPageGradient("/admin/content-management/comments")}
			/>

			<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
				<div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700">
					<h3 className="text-sm font-medium text-gray-500 dark:text-gray-400">
						Total Comments
					</h3>
					<p className="text-2xl font-bold text-gray-900 dark:text-white">
						1,847
					</p>
					<p className="text-xs text-green-500">+23 today</p>
				</div>
				<div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700">
					<h3 className="text-sm font-medium text-gray-500 dark:text-gray-400">
						Approved
					</h3>
					<p className="text-2xl font-bold text-gray-900 dark:text-white">
						1,654
					</p>
					<p className="text-xs text-green-500">89% approval rate</p>
				</div>
				<div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700">
					<h3 className="text-sm font-medium text-gray-500 dark:text-gray-400">
						Pending
					</h3>
					<p className="text-2xl font-bold text-gray-900 dark:text-white">
						156
					</p>
					<p className="text-xs text-yellow-500">Needs moderation</p>
				</div>
				<div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700">
					<h3 className="text-sm font-medium text-gray-500 dark:text-gray-400">
						Spam
					</h3>
					<p className="text-2xl font-bold text-gray-900 dark:text-white">37</p>
					<p className="text-xs text-red-500">Auto-filtered</p>
				</div>
			</div>

			<div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
				<div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700">
					<div className="flex items-center justify-between mb-4">
						<h2 className="text-xl font-bold text-gray-900 dark:text-white">
							Recent Comments
						</h2>
						<div className="flex space-x-2">
							<button className="px-3 py-1 bg-green-600 text-white rounded text-sm hover:bg-green-700">
								Approve All
							</button>
							<button className="px-3 py-1 bg-red-600 text-white rounded text-sm hover:bg-red-700">
								Mark Spam
							</button>
						</div>
					</div>
					<div className="space-y-4">
						<div className="p-4 border border-gray-100 dark:border-gray-700 rounded-lg">
							<div className="flex items-start space-x-3">
								<div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center text-white text-sm font-bold">
									JD
								</div>
								<div className="flex-1">
									<div className="flex items-center justify-between">
										<h3 className="font-medium text-gray-900 dark:text-white">
											John Doe
										</h3>
										<span className="px-2 py-1 bg-yellow-100 dark:bg-yellow-900 text-yellow-800 dark:text-yellow-200 text-xs rounded">
											Pending
										</span>
									</div>
									<p className="text-sm text-gray-600 dark:text-gray-300 mt-1">
										This is a great article! Thanks for sharing such detailed
										information.
									</p>
									<div className="flex items-center justify-between mt-2">
										<p className="text-xs text-gray-500 dark:text-gray-400">
											On "Getting Started with Next.js" • 2 hours ago
										</p>
										<div className="flex space-x-2">
											<button className="text-green-600 hover:text-green-800 text-xs">
												Approve
											</button>
											<button className="text-red-600 hover:text-red-800 text-xs">
												Reject
											</button>
											<button className="text-gray-600 hover:text-gray-800 text-xs">
												Reply
											</button>
										</div>
									</div>
								</div>
							</div>
						</div>
						<div className="p-4 border border-gray-100 dark:border-gray-700 rounded-lg">
							<div className="flex items-start space-x-3">
								<div className="w-8 h-8 bg-purple-500 rounded-full flex items-center justify-center text-white text-sm font-bold">
									JS
								</div>
								<div className="flex-1">
									<div className="flex items-center justify-between">
										<h3 className="font-medium text-gray-900 dark:text-white">
											Jane Smith
										</h3>
										<span className="px-2 py-1 bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200 text-xs rounded">
											Approved
										</span>
									</div>
									<p className="text-sm text-gray-600 dark:text-gray-300 mt-1">
										Very helpful tutorial. Could you add more examples about
										TypeScript integration?
									</p>
									<div className="flex items-center justify-between mt-2">
										<p className="text-xs text-gray-500 dark:text-gray-400">
											On "TypeScript Best Practices" • 1 day ago
										</p>
										<div className="flex space-x-2">
											<button className="text-blue-600 hover:text-blue-800 text-xs">
												Reply
											</button>
											<button className="text-gray-600 hover:text-gray-800 text-xs">
												Edit
											</button>
										</div>
									</div>
								</div>
							</div>
						</div>
						<div className="p-4 border border-gray-100 dark:border-gray-700 rounded-lg">
							<div className="flex items-start space-x-3">
								<div className="w-8 h-8 bg-red-500 rounded-full flex items-center justify-center text-white text-sm font-bold">
									SP
								</div>
								<div className="flex-1">
									<div className="flex items-center justify-between">
										<h3 className="font-medium text-gray-900 dark:text-white">
											Spam User
										</h3>
										<span className="px-2 py-1 bg-red-100 dark:bg-red-900 text-red-800 dark:text-red-200 text-xs rounded">
											Spam
										</span>
									</div>
									<p className="text-sm text-gray-600 dark:text-gray-300 mt-1">
										[Spam content detected] Buy our product now for best
										prices...
									</p>
									<div className="flex items-center justify-between mt-2">
										<p className="text-xs text-gray-500 dark:text-gray-400">
											Auto-filtered • 2 days ago
										</p>
										<div className="flex space-x-2">
											<button className="text-green-600 hover:text-green-800 text-xs">
												Not Spam
											</button>
											<button className="text-red-600 hover:text-red-800 text-xs">
												Delete
											</button>
										</div>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>

				<div className="space-y-6">
					<div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700">
						<h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
							Moderation Tools
						</h3>
						<div className="space-y-3">
							<button className="w-full p-3 text-left bg-blue-50 dark:bg-blue-900/20 rounded-lg hover:bg-blue-100 dark:hover:bg-blue-900/30 transition-colors">
								<h4 className="font-medium text-blue-900 dark:text-blue-100">
									Bulk Actions
								</h4>
								<p className="text-sm text-blue-700 dark:text-blue-300">
									Moderate multiple comments
								</p>
							</button>
							<button className="w-full p-3 text-left bg-green-50 dark:bg-green-900/20 rounded-lg hover:bg-green-100 dark:hover:bg-green-900/30 transition-colors">
								<h4 className="font-medium text-green-900 dark:text-green-100">
									Spam Filters
								</h4>
								<p className="text-sm text-green-700 dark:text-green-300">
									Configure auto-moderation
								</p>
							</button>
							<button className="w-full p-3 text-left bg-purple-50 dark:bg-purple-900/20 rounded-lg hover:bg-purple-100 dark:hover:bg-purple-900/30 transition-colors">
								<h4 className="font-medium text-purple-900 dark:text-purple-100">
									Blacklist
								</h4>
								<p className="text-sm text-purple-700 dark:text-purple-300">
									Manage blocked users/words
								</p>
							</button>
						</div>
					</div>

					<div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700">
						<h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
							Comment Settings
						</h3>
						<div className="space-y-4">
							<div className="flex items-center justify-between">
								<div>
									<h4 className="font-medium text-gray-900 dark:text-white">
										Auto-approve
									</h4>
									<p className="text-sm text-gray-500 dark:text-gray-400">
										From trusted users
									</p>
								</div>
								<button className="w-12 h-6 bg-blue-600 rounded-full relative">
									<span className="absolute right-1 top-1 w-4 h-4 bg-white rounded-full"></span>
								</button>
							</div>
							<div className="flex items-center justify-between">
								<div>
									<h4 className="font-medium text-gray-900 dark:text-white">
										Email notifications
									</h4>
									<p className="text-sm text-gray-500 dark:text-gray-400">
										For new comments
									</p>
								</div>
								<button className="w-12 h-6 bg-gray-300 rounded-full relative">
									<span className="absolute left-1 top-1 w-4 h-4 bg-white rounded-full"></span>
								</button>
							</div>
							<div className="flex items-center justify-between">
								<div>
									<h4 className="font-medium text-gray-900 dark:text-white">
										Threaded comments
									</h4>
									<p className="text-sm text-gray-500 dark:text-gray-400">
										Enable reply chains
									</p>
								</div>
								<button className="w-12 h-6 bg-blue-600 rounded-full relative">
									<span className="absolute right-1 top-1 w-4 h-4 bg-white rounded-full"></span>
								</button>
							</div>
						</div>
					</div>
				</div>
			</div>

			<div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700">
				<h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
					Comment Analytics
				</h2>
				<p className="text-gray-600 dark:text-gray-400">
					Detailed comment analytics will be implemented here. This will include
					engagement metrics, comment trends, most active users, and moderation
					statistics.
				</p>
			</div>
		</div>
	);
}
