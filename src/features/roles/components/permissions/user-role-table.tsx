import type React from "react";
import type { UserRoleWithRelations } from "../../types";

export interface UserRoleTableProps {
	userRoles: UserRoleWithRelations[];
	onEdit?: (userRole: UserRoleWithRelations) => void;
	onDelete?: (userRoleId: string) => void;
	showUser?: boolean;
	showRole?: boolean;
}

export const UserRoleTable: React.FC<UserRoleTableProps> = ({
	userRoles,
	onEdit,
	onDelete,
	showUser = true,
	showRole = true,
}) => {
	return (
		<div className="overflow-x-auto">
			<table className="min-w-full divide-y divide-gray-200">
				<thead className="bg-gray-50">
					<tr>
						{showUser && (
							<th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
								User
							</th>
						)}
						{showRole && (
							<th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
								Role
							</th>
						)}
						<th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
							Assigned Date
						</th>
						<th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
							Assigned By
						</th>
						<th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
							Actions
						</th>
					</tr>
				</thead>
				<tbody className="bg-white divide-y divide-gray-200">
					{userRoles.map((userRole) => (
						<tr key={userRole.id}>
							{showUser && (
								<td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
									{userRole.user?.email ||
										userRole.user?.name ||
										"Unknown User"}
								</td>
							)}
							{showRole && (
								<td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
									<span className="inline-flex px-2 py-1 text-xs font-semibold rounded-full bg-green-100 text-green-800">
										{userRole.role?.name || "Unknown Role"}
									</span>
								</td>
							)}
							<td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
								{userRole.createdAt
									? new Date(userRole.createdAt).toLocaleDateString()
									: "N/A"}
							</td>
							<td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
								{"System"}
							</td>
							<td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
								<div className="flex space-x-2">
									{onEdit && (
										<button
											onClick={() => onEdit(userRole)}
											className="text-indigo-600 hover:text-indigo-900"
										>
											Edit
										</button>
									)}
									{onDelete && (
										<button
											onClick={() => onDelete(userRole.id)}
											className="text-red-600 hover:text-red-900"
										>
											Remove
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
