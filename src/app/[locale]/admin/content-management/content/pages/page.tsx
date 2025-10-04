import type { Metadata } from "next";

export const metadata: Metadata = {
	title: "Static Pages | CorePilot Admin",
	description: "Manage static pages and content",
};

export default function ContentPagesPage() {
	return (
		<div className="container mx-auto p-6">
			<div className="mb-6">
				<h1 className="text-3xl font-bold text-gray-900 dark:text-white">
					Static Pages
				</h1>
				<p className="text-gray-600 dark:text-gray-400">
					Create and manage static pages like About, Contact, Terms of Service
				</p>
			</div>

			<div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700">
				<h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
					Page Management
				</h2>
				<p className="text-gray-600 dark:text-gray-400">
					Static page management functionality will be implemented here. This
					will include page creation, content editing, SEO settings, and page
					visibility controls.
				</p>
			</div>
		</div>
	);
}
