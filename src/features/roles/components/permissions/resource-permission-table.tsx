import type React from "react";
import type { ResourcePermission } from "../../types";

export interface ResourcePermissionTableProps {
	resourcePermissions: ResourcePermission[];
	onEdit?: (resourcePermission: ResourcePermission) => void;
	onDelete?: (resourcePermissionId: string) => void;
	showResource?: boolean;
	showRole?: boolean;
}

export const ResourcePermissionTable: React.FC<
	ResourcePermissionTableProps
> = ({
	resourcePermissions,
	onEdit,
	onDelete,
	showResource = true,
	showRole = true,
}) => {
	return (
		<div className="overflow-x-auto">
			<table className="min-w-full divide-y divide-gray-200">
				<thead className="bg-gray-50">
					<tr>
						{showResource && (
							<th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
								Resource
							</th>
						)}
						{showRole && (
							<th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
								Role
							</th>
						)}
						<th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
							Actions
						</th>
						<th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
							Granted Date
						</th>
						<th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
							Granted By
						</th>
						<th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
							Actions
						</th>
					</tr>
				</thead>
				<tbody className="bg-white divide-y divide-gray-200">
					{resourcePermissions.map((resourcePermission) => (
						<tr key={resourcePermission.id}>
							{showResource && (
								<td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
									<div>
										<div className="font-medium">
											{resourcePermission.resourceType}
										</div>
										<div className="text-xs text-gray-500">
											{resourcePermission.resourceId}
										</div>
									</div>
								</td>
							)}
							{showRole && (
								<td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
									<span className="inline-flex px-2 py-1 text-xs font-semibold rounded-full bg-purple-100 text-purple-800">
										{resourcePermission.role?.name || "Unknown Role"}
									</span>
								</td>
							)}
							<td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
								<div className="flex flex-wrap gap-1">
									{resourcePermission.actions.map((action, index) => (
										<span
											key={index}
											className="inline-flex px-2 py-1 text-xs font-semibold rounded-full bg-blue-100 text-blue-800"
										>
											{action}
										</span>
									))}
								</div>
							</td>
							<td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
								{new Date(resourcePermission.grantedAt).toLocaleDateString()}
							</td>
							<td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
								{resourcePermission.grantedBy?.email ||
									resourcePermission.grantedBy?.name ||
									"System"}
							</td>
							<td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
								<div className="flex space-x-2">
									{onEdit && (
										<button
											onClick={() => onEdit(resourcePermission)}
											className="text-indigo-600 hover:text-indigo-900"
										>
											Edit
										</button>
									)}
									{onDelete && (
										<button
											onClick={() => onDelete(resourcePermission.id)}
											className="text-red-600 hover:text-red-900"
										>
											Revoke
										</button>
									)}
								</div>
							</td>
						</tr>
					))}
				</tbody>
			</table>
		</div>
	);
};
