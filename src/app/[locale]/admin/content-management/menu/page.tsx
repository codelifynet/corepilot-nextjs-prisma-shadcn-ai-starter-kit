import { PageHeader } from "@/components/ui/page-header";
import { getPageGradient } from "@/lib/page-utils";

const MenuManagement = () => {
	return (
		<div className="p-6">
			<PageHeader
				title="Menu Management"
				description="Create and organize navigation menus for your website with drag-and-drop functionality."
				gradient={getPageGradient("/admin/content-management/menu")}
			/>
			<div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
				<div className="bg-white dark:bg-slate-800 rounded-lg border border-slate-200 dark:border-slate-700 p-4">
					<h3 className="text-sm font-medium text-gray-600 dark:text-gray-300">
						Active Menus
					</h3>
					<p className="text-2xl font-bold text-blue-600">4</p>
				</div>
				<div className="bg-white dark:bg-slate-800 rounded-lg border border-slate-200 dark:border-slate-700 p-4">
					<h3 className="text-sm font-medium text-gray-600 dark:text-gray-300">
						Menu Items
					</h3>
					<p className="text-2xl font-bold text-green-600">28</p>
				</div>
				<div className="bg-white dark:bg-slate-800 rounded-lg border border-slate-200 dark:border-slate-700 p-4">
					<h3 className="text-sm font-medium text-gray-600 dark:text-gray-300">
						Locations
					</h3>
					<p className="text-2xl font-bold text-purple-600">6</p>
				</div>
			</div>
			<div className="bg-white dark:bg-slate-800 rounded-lg border border-slate-200 dark:border-slate-700 p-6">
				<p className="text-gray-600 dark:text-gray-300">
					Intuitive menu builder with drag-and-drop interface, nested menu
					support, custom links, and multiple menu location management.
				</p>
			</div>
		</div>
	);
};

export default MenuManagement;
