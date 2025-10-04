// Role Services - Barrel Exports

// Get Services
export {
	getRoles,
	getRoleById,
	getRoleByName,
	roleExists,
	getActiveRoles,
	getSystemRoles,
	getRoleStats,
	validateRolePermissions,
	checkRoleAccess,
} from "./get.service";

// Permission Services
export {
	getPermissions,
	getPermissionById,
	getPermissionsByEntity,
	getPermissionsByAction,
	getPermissionsByRole,
	permissionExists,
	getUniqueEntities,
	getUniqueActions,
	getPermissionsGroupedByEntity,
	getPermissionsGroupedByRole,
	getPermissionStats,
	roleHasPermission,
} from "./permission.service";

// Create Services
export {
	createRole,
	createRoleWithPermissionNames,
	createRolesBatch,
	createRoleFromTemplate,
	createDefaultRoles,
} from "./create.service";

// Update Services
export {
	updateRole,
	updateRolePermissions,
	addPermissionsToRole,
	removePermissionsFromRole,
	activateRole,
	deactivateRole,
	bulkUpdateRoles,
	syncRolePermissionsByNames,
} from "./update.service";

// Delete Services
export {
	softDeleteRole,
	hardDeleteRole,
	deleteRoles,
	canDeleteRole,
	getDeletableRoles,
	forceDeleteRole,
	cleanupInactiveRoles,
	restoreRole,
} from "./delete.service";
