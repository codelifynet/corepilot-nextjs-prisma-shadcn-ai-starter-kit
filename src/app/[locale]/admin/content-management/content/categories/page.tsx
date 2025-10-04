import type { Metadata } from "next";

export const metadata: Metadata = {
	title: "Content Categories | CorePilot Admin",
	description: "Manage content categories and taxonomy",
};

export default function ContentCategoriesPage() {
	return (
		<div className="container mx-auto p-6">
			<div className="mb-6">
				<h1 className="text-3xl font-bold text-gray-900 dark:text-white">
					Content Categories
				</h1>
				<p className="text-gray-600 dark:text-gray-400">
					Organize content with categories and hierarchical taxonomy
				</p>
			</div>

			<div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700">
				<h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
					Category Management
				</h2>
				<p className="text-gray-600 dark:text-gray-400">
					Content category management functionality will be implemented here.
					This will include creating categories, managing hierarchical
					structures, and organizing content taxonomy.
				</p>
			</div>
		</div>
	);
}
