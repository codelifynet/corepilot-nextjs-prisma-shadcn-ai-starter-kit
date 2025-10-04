import { useState, useEffect } from "react";
import { ADMIN_API } from "@/constants/api";

export interface Permission {
	entity: string;
	field: string;
	action: string;
	maskType: string | null;
	displayName: string | null;
	description: string | null;
}

export interface PermissionGroup {
	entity: string;
	displayName: string;
	description: string;
	permissions: Permission[];
}

export interface EntityInfo {
	[entity: string]: {
		displayName: string;
		description: string;
	};
}

export function usePermissions() {
	const [permissions, setPermissions] = useState<Permission[]>([]);
	const [isLoading, setIsLoading] = useState(true);
	const [error, setError] = useState<string | null>(null);

	useEffect(() => {
		const fetchPermissions = async () => {
			try {
				setIsLoading(true);
				setError(null);

				const response = await fetch(`${ADMIN_API.PERMISSIONS}?unique=true`, {
					credentials: 'include', // Include cookies for authentication
					headers: {
						'Content-Type': 'application/json',
					},
				});

				if (!response.ok) {
					throw new Error(
						`Failed to fetch permissions: ${response.statusText}`,
					);
				}

				const data = await response.json();
				setPermissions(data.permissions || []);
			} catch (err) {
				setError(
					err instanceof Error ? err.message : "Failed to fetch permissions",
				);
				console.error("Error fetching permissions:", err);
			} finally {
				setIsLoading(false);
			}
		};

		fetchPermissions();
	}, []);

	return { data: permissions, isLoading, error };
}

export function useEntityInfo(permissions: Permission[]): EntityInfo {
	const entityInfo: EntityInfo = {};

	permissions.forEach((permission) => {
		if (!entityInfo[permission.entity]) {
			entityInfo[permission.entity] = {
				displayName: permission.displayName || permission.entity,
				description:
					permission.description || `Manage ${permission.entity} permissions`,
			};
		}
	});

	return entityInfo;
}
