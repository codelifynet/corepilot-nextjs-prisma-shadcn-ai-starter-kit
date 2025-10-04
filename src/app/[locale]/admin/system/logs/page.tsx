import { PageHeader } from "@/components/ui/page-header";
import { getPageGradient } from "@/lib/page-utils";

const Logs = () => {
	return (
		<div className="p-6">
			<PageHeader
				title="Logs"
				description="Monitor system logs, error reports, and application activity for debugging and analysis."
				gradient={getPageGradient("/admin/system/logs")}
			/>
			<div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">
				<div className="bg-blue-50 dark:bg-blue-900/20 rounded-lg border border-blue-200 dark:border-blue-800 p-4">
					<h3 className="text-sm font-medium text-blue-800 dark:text-blue-200">
						Info
					</h3>
					<p className="text-2xl font-bold text-blue-900 dark:text-blue-100">
						45,678
					</p>
				</div>
				<div className="bg-yellow-50 dark:bg-yellow-900/20 rounded-lg border border-yellow-200 dark:border-yellow-800 p-4">
					<h3 className="text-sm font-medium text-yellow-800 dark:text-yellow-200">
						Warnings
					</h3>
					<p className="text-2xl font-bold text-yellow-900 dark:text-yellow-100">
						1,234
					</p>
				</div>
				<div className="bg-red-50 dark:bg-red-900/20 rounded-lg border border-red-200 dark:border-red-800 p-4">
					<h3 className="text-sm font-medium text-red-800 dark:text-red-200">
						Errors
					</h3>
					<p className="text-2xl font-bold text-red-900 dark:text-red-100">
						89
					</p>
				</div>
				<div className="bg-green-50 dark:bg-green-900/20 rounded-lg border border-green-200 dark:border-green-800 p-4">
					<h3 className="text-sm font-medium text-green-800 dark:text-green-200">
						Debug
					</h3>
					<p className="text-2xl font-bold text-green-900 dark:text-green-100">
						12,456
					</p>
				</div>
			</div>
			<div className="bg-white dark:bg-slate-800 rounded-lg border border-slate-200 dark:border-slate-700 p-6">
				<p className="text-gray-600 dark:text-gray-300">
					Comprehensive logging system with real-time log streaming, filtering
					by severity level, search functionality, and log retention management.
				</p>
			</div>
		</div>
	);
};

export default Logs;
