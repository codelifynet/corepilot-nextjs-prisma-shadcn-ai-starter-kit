import { PageHeader } from "@/components/ui/page-header";
import { getPageGradient } from "@/lib/page-utils";

const Pages = () => {
	return (
		<div className="p-6">
			<PageHeader
				title="Pages"
				description="Manage static pages, landing pages, and custom content pages for your website."
				gradient={getPageGradient("/admin/content-management/pages")}
			/>
			<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-6">
				<div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700">
					<h3 className="text-sm font-medium text-gray-500 dark:text-gray-400">
						Total Pages
					</h3>
					<p className="text-2xl font-bold text-gray-900 dark:text-white">24</p>
					<p className="text-xs text-green-500">+3 this month</p>
				</div>
				<div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700">
					<h3 className="text-sm font-medium text-gray-500 dark:text-gray-400">
						Published
					</h3>
					<p className="text-2xl font-bold text-gray-900 dark:text-white">18</p>
					<p className="text-xs text-blue-500">75% of total</p>
				</div>
				<div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700">
					<h3 className="text-sm font-medium text-gray-500 dark:text-gray-400">
						Drafts
					</h3>
					<p className="text-2xl font-bold text-gray-900 dark:text-white">6</p>
					<p className="text-xs text-yellow-500">25% of total</p>
				</div>
			</div>

			<div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
				<div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700">
					<div className="flex items-center justify-between mb-4">
						<h2 className="text-xl font-bold text-gray-900 dark:text-white">
							Recent Pages
						</h2>
						<button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
							+ New Page
						</button>
					</div>
					<div className="space-y-4">
						<div className="flex items-center justify-between p-4 border border-gray-100 dark:border-gray-700 rounded-lg">
							<div>
								<h3 className="font-semibold text-gray-900 dark:text-white">
									About Us
								</h3>
								<p className="text-sm text-gray-500 dark:text-gray-400">
									Company information and history
								</p>
								<div className="flex items-center space-x-2 mt-1">
									<span className="px-2 py-1 bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200 text-xs rounded">
										Published
									</span>
									<span className="text-xs text-gray-500 dark:text-gray-400">
										Updated 2 days ago
									</span>
								</div>
							</div>
							<div className="flex items-center space-x-2">
								<button className="px-3 py-1 text-blue-600 hover:text-blue-800 text-sm">
									Edit
								</button>
								<button className="px-3 py-1 text-gray-600 hover:text-gray-800 text-sm">
									View
								</button>
							</div>
						</div>
						<div className="flex items-center justify-between p-4 border border-gray-100 dark:border-gray-700 rounded-lg">
							<div>
								<h3 className="font-semibold text-gray-900 dark:text-white">
									Contact
								</h3>
								<p className="text-sm text-gray-500 dark:text-gray-400">
									Contact form and information
								</p>
								<div className="flex items-center space-x-2 mt-1">
									<span className="px-2 py-1 bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200 text-xs rounded">
										Published
									</span>
									<span className="text-xs text-gray-500 dark:text-gray-400">
										Updated 1 week ago
									</span>
								</div>
							</div>
							<div className="flex items-center space-x-2">
								<button className="px-3 py-1 text-blue-600 hover:text-blue-800 text-sm">
									Edit
								</button>
								<button className="px-3 py-1 text-gray-600 hover:text-gray-800 text-sm">
									View
								</button>
							</div>
						</div>
						<div className="flex items-center justify-between p-4 border border-gray-100 dark:border-gray-700 rounded-lg">
							<div>
								<h3 className="font-semibold text-gray-900 dark:text-white">
									Privacy Policy
								</h3>
								<p className="text-sm text-gray-500 dark:text-gray-400">
									Legal privacy information
								</p>
								<div className="flex items-center space-x-2 mt-1">
									<span className="px-2 py-1 bg-yellow-100 dark:bg-yellow-900 text-yellow-800 dark:text-yellow-200 text-xs rounded">
										Draft
									</span>
									<span className="text-xs text-gray-500 dark:text-gray-400">
										Created 3 days ago
									</span>
								</div>
							</div>
							<div className="flex items-center space-x-2">
								<button className="px-3 py-1 text-blue-600 hover:text-blue-800 text-sm">
									Edit
								</button>
								<button className="px-3 py-1 text-gray-600 hover:text-gray-800 text-sm">
									Preview
								</button>
							</div>
						</div>
					</div>
				</div>

				<div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700">
					<h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
						Page Templates
					</h2>
					<div className="grid grid-cols-2 gap-4">
						<div className="p-4 border-2 border-dashed border-gray-200 dark:border-gray-600 rounded-lg hover:border-blue-400 dark:hover:border-blue-500 cursor-pointer transition-colors">
							<div className="w-full h-20 bg-gray-100 dark:bg-gray-700 rounded mb-3"></div>
							<h3 className="font-medium text-gray-900 dark:text-white text-sm">
								Landing Page
							</h3>
							<p className="text-xs text-gray-500 dark:text-gray-400">
								Hero + features
							</p>
						</div>
						<div className="p-4 border-2 border-dashed border-gray-200 dark:border-gray-600 rounded-lg hover:border-blue-400 dark:hover:border-blue-500 cursor-pointer transition-colors">
							<div className="w-full h-20 bg-gray-100 dark:bg-gray-700 rounded mb-3"></div>
							<h3 className="font-medium text-gray-900 dark:text-white text-sm">
								About Page
							</h3>
							<p className="text-xs text-gray-500 dark:text-gray-400">
								Company info
							</p>
						</div>
						<div className="p-4 border-2 border-dashed border-gray-200 dark:border-gray-600 rounded-lg hover:border-blue-400 dark:hover:border-blue-500 cursor-pointer transition-colors">
							<div className="w-full h-20 bg-gray-100 dark:bg-gray-700 rounded mb-3"></div>
							<h3 className="font-medium text-gray-900 dark:text-white text-sm">
								Contact Page
							</h3>
							<p className="text-xs text-gray-500 dark:text-gray-400">
								Contact form
							</p>
						</div>
						<div className="p-4 border-2 border-dashed border-gray-200 dark:border-gray-600 rounded-lg hover:border-blue-400 dark:hover:border-blue-500 cursor-pointer transition-colors">
							<div className="w-full h-20 bg-gray-100 dark:bg-gray-700 rounded mb-3"></div>
							<h3 className="font-medium text-gray-900 dark:text-white text-sm">
								Custom
							</h3>
							<p className="text-xs text-gray-500 dark:text-gray-400">
								Blank template
							</p>
						</div>
					</div>
				</div>
			</div>

			<div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700">
				<h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
					Page Builder
				</h2>
				<p className="text-gray-600 dark:text-gray-400">
					Advanced page builder with drag-and-drop functionality will be
					implemented here. This will include custom templates, SEO settings,
					responsive design preview, and component library for building
					professional pages.
				</p>
			</div>
		</div>
	);
};

export default Pages;
