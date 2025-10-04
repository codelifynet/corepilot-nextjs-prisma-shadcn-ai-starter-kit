import type { Metadata } from "next";
import { PageHeader } from "@/components/ui/page-header";
import { getPageGradient } from "@/lib/page-utils";

export const metadata: Metadata = {
	title: "Content Management",
	description: "Manage your website content",
};

export default function ContentManagementPage() {
	return (
		<div className="container mx-auto p-6 space-y-8">
			<PageHeader
				title="Content Management"
				description="Manage your website content, pages, and media"
				gradient={getPageGradient("/admin/content-management/content")}
			/>

			<div className="bg-white/80 dark:bg-slate-800/90 p-6 rounded-2xl border border-slate-200/50 dark:border-slate-700/50">
				<h2 className="text-xl font-semibold text-slate-900 dark:text-white mb-4">
					Content Management System
				</h2>
				<p className="text-slate-600 dark:text-slate-300">
					This page is under development. Content management features will be
					available soon.
				</p>
			</div>
		</div>
	);
}
