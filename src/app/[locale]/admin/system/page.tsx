import { PageHeader } from "@/components/ui/page-header";
import { getPageGradient } from "@/lib/page-utils";
import Link from "next/link";

const System = () => {
	return (
		<div className="p-6">
			<PageHeader
				title="System"
				description="Configure system settings, integrations, and monitor application performance."
				gradient={getPageGradient("/admin/system")}
			/>
			<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
				<div className="bg-white dark:bg-slate-800 rounded-lg border border-slate-200 dark:border-slate-700 p-6">
					<h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
						Site Settings
					</h3>
					<p className="text-gray-600 dark:text-gray-300 mb-4">
						Configure global site settings and branding
					</p>
					<Link
						href="/admin/system/settings/site"
						className="text-blue-600 hover:text-blue-700 font-medium"
					>
						Site Settings →
					</Link>
				</div>
				<div className="bg-white dark:bg-slate-800 rounded-lg border border-slate-200 dark:border-slate-700 p-6">
					<h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
						Theme Settings
					</h3>
					<p className="text-gray-600 dark:text-gray-300 mb-4">
						Customize appearance and visual settings
					</p>
					<Link
						href="/admin/system/settings/theme"
						className="text-blue-600 hover:text-blue-700 font-medium"
					>
						Theme Settings →
					</Link>
				</div>
				<div className="bg-white dark:bg-slate-800 rounded-lg border border-slate-200 dark:border-slate-700 p-6">
					<h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
						SEO Settings
					</h3>
					<p className="text-gray-600 dark:text-gray-300 mb-4">
						Optimize search engine visibility
					</p>
					<Link
						href="/admin/system/settings/seo"
						className="text-blue-600 hover:text-blue-700 font-medium"
					>
						SEO Settings →
					</Link>
				</div>
				<div className="bg-white dark:bg-slate-800 rounded-lg border border-slate-200 dark:border-slate-700 p-6">
					<h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
						Notifications
					</h3>
					<p className="text-gray-600 dark:text-gray-300 mb-4">
						Manage system notifications and alerts
					</p>
					<Link
						href="/admin/system/notifications"
						className="text-blue-600 hover:text-blue-700 font-medium"
					>
						Notifications →
					</Link>
				</div>
				<div className="bg-white dark:bg-slate-800 rounded-lg border border-slate-200 dark:border-slate-700 p-6">
					<h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
						Integrations
					</h3>
					<p className="text-gray-600 dark:text-gray-300 mb-4">
						Connect with external services and APIs
					</p>
					<Link
						href="/admin/system/integrations"
						className="text-blue-600 hover:text-blue-700 font-medium"
					>
						Manage Integrations →
					</Link>
				</div>
				<div className="bg-white dark:bg-slate-800 rounded-lg border border-slate-200 dark:border-slate-700 p-6">
					<h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
						System Logs
					</h3>
					<p className="text-gray-600 dark:text-gray-300 mb-4">
						Monitor application logs and debugging
					</p>
					<Link
						href="/admin/system/logs"
						className="text-blue-600 hover:text-blue-700 font-medium"
					>
						View Logs →
					</Link>
				</div>
				<div className="bg-white dark:bg-slate-800 rounded-lg border border-slate-200 dark:border-slate-700 p-6">
					<h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
						Support
					</h3>
					<p className="text-gray-600 dark:text-gray-300 mb-4">
						Get help and access documentation
					</p>
					<Link
						href="/admin/system/support"
						className="text-blue-600 hover:text-blue-700 font-medium"
					>
						Get Support →
					</Link>
				</div>
			</div>
		</div>
	);
};

export default System;
