import { PageHeader } from "@/components/ui/page-header";
import Link from "next/link";

const ContentManagement = () => {
	return (
		<div className="p-6">
			<PageHeader
				title="Content Management"
				description="Create, edit, and organize all your website content from blog posts to media files."
			/>
			<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
				<div className="bg-white dark:bg-slate-800 rounded-lg border border-slate-200 dark:border-slate-700 p-6">
					<h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
						Content
					</h3>
					<p className="text-gray-600 dark:text-gray-300 mb-4">
						Manage blog posts, articles, and content overview
					</p>
					<Link
						href="/admin/content-management/content"
						className="text-blue-600 hover:text-blue-700 font-medium"
					>
						View Content →
					</Link>
				</div>
				<div className="bg-white dark:bg-slate-800 rounded-lg border border-slate-200 dark:border-slate-700 p-6">
					<h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
						Pages
					</h3>
					<p className="text-gray-600 dark:text-gray-300 mb-4">
						Create and manage static pages and landing pages
					</p>
					<Link
						href="/admin/content-management/pages"
						className="text-blue-600 hover:text-blue-700 font-medium"
					>
						Manage Pages →
					</Link>
				</div>
				<div className="bg-white dark:bg-slate-800 rounded-lg border border-slate-200 dark:border-slate-700 p-6">
					<h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
						Media Library
					</h3>
					<p className="text-gray-600 dark:text-gray-300 mb-4">
						Upload and organize images, videos, and files
					</p>
					<Link
						href="/admin/content-management/media"
						className="text-blue-600 hover:text-blue-700 font-medium"
					>
						View Media →
					</Link>
				</div>
				<div className="bg-white dark:bg-slate-800 rounded-lg border border-slate-200 dark:border-slate-700 p-6">
					<h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
						Comments
					</h3>
					<p className="text-gray-600 dark:text-gray-300 mb-4">
						Moderate and manage user comments
					</p>
					<Link
						href="/admin/content-management/comments"
						className="text-blue-600 hover:text-blue-700 font-medium"
					>
						Manage Comments →
					</Link>
				</div>
				<div className="bg-white dark:bg-slate-800 rounded-lg border border-slate-200 dark:border-slate-700 p-6">
					<h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
						Menu Management
					</h3>
					<p className="text-gray-600 dark:text-gray-300 mb-4">
						Create and organize navigation menus
					</p>
					<Link
						href="/admin/content-management/menu"
						className="text-blue-600 hover:text-blue-700 font-medium"
					>
						Manage Menus → L
					</Link>
				</div>
			</div>
		</div>
	);
};

export default ContentManagement;
