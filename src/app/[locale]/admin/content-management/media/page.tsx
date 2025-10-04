import { PageHeader } from "@/components/ui/page-header";
import { getPageGradient } from "@/lib/page-utils";

const MediaLibrary = () => {
	return (
		<div className="p-6">
			<PageHeader
				title="Media Library"
				description="Upload, organize, and manage all your images, videos, and documents in one place."
				gradient={getPageGradient("/admin/content-management/media")}
			/>
			<div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">
				<div className="bg-white dark:bg-slate-800 rounded-lg border border-slate-200 dark:border-slate-700 p-4">
					<h3 className="text-sm font-medium text-gray-600 dark:text-gray-300">
						Total Files
					</h3>
					<p className="text-2xl font-bold text-blue-600">1,847</p>
				</div>
				<div className="bg-white dark:bg-slate-800 rounded-lg border border-slate-200 dark:border-slate-700 p-4">
					<h3 className="text-sm font-medium text-gray-600 dark:text-gray-300">
						Images
					</h3>
					<p className="text-2xl font-bold text-green-600">1,234</p>
				</div>
				<div className="bg-white dark:bg-slate-800 rounded-lg border border-slate-200 dark:border-slate-700 p-4">
					<h3 className="text-sm font-medium text-gray-600 dark:text-gray-300">
						Videos
					</h3>
					<p className="text-2xl font-bold text-purple-600">45</p>
				</div>
				<div className="bg-white dark:bg-slate-800 rounded-lg border border-slate-200 dark:border-slate-700 p-4">
					<h3 className="text-sm font-medium text-gray-600 dark:text-gray-300">
						Documents
					</h3>
					<p className="text-2xl font-bold text-orange-600">568</p>
				</div>
			</div>
			<div className="bg-white dark:bg-slate-800 rounded-lg border border-slate-200 dark:border-slate-700 p-6">
				<p className="text-gray-600 dark:text-gray-300">
					Advanced media management with drag-and-drop upload, image
					optimization, folder organization, search, and CDN integration.
				</p>
			</div>
		</div>
	);
};

export default MediaLibrary;
