import { PageHeader } from "@/components/ui/page-header";
import Link from "next/link";

const UserManagement = () => {
	return (
		<div className="p-6">
			<PageHeader
				title="User Management"
				description="Manage users, customers, roles, and permissions across your platform."
			/>
			<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
				<div className="bg-white dark:bg-slate-800 rounded-lg border border-slate-200 dark:border-slate-700 p-6">
					<h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
						Customers
					</h3>
					<p className="text-gray-600 dark:text-gray-300 mb-4">
						View and manage customer profiles and accounts
					</p>
					<Link
						href="/admin/user-management/customers"
						className="text-blue-600 hover:text-blue-700 font-medium"
					>
						View Customers →
					</Link>
				</div>
				<div className="bg-white dark:bg-slate-800 rounded-lg border border-slate-200 dark:border-slate-700 p-6">
					<h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
						Users
					</h3>
					<p className="text-gray-600 dark:text-gray-300 mb-4">
						Manage admin users and their access levels
					</p>
					<Link
						href="/admin/user-management/users"
						className="text-blue-600 hover:text-blue-700 font-medium"
					>
						Manage Users →
					</Link>
				</div>
				<div className="bg-white dark:bg-slate-800 rounded-lg border border-slate-200 dark:border-slate-700 p-6">
					<h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
						Roles & Permissions
					</h3>
					<p className="text-gray-600 dark:text-gray-300 mb-4">
						Configure user roles and access permissions
					</p>
					<Link
						href="/admin/user-management/roles"
						className="text-blue-600 hover:text-blue-700 font-medium"
					>
						Manage Roles →
					</Link>
				</div>
			</div>
		</div>
	);
};

export default UserManagement;
