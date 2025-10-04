import { prisma } from "@/lib/prisma";
import type { ServiceResponse } from "@/types/api";
import { errorResponse, safeAsync } from "@/utils/error-handler";

/**
 * Soft delete a role (mark as inactive)
 */
export const softDeleteRole = async (id: string): Promise<ServiceResponse<any>> => {
	return safeAsync(async () => {
		// Check if role exists
		const role = await prisma.role.findUnique({
			where: { id },
			include: {
				_count: {
					select: {
						userRoles: true,
					},
				},
			},
		});

		if (!role) {
			const error = await errorResponse.notFound(
				"Role not found",
				{ roleId: id }
			);
			throw error.error;
		}

		// Prevent deletion of system roles
		if (role.isSystem) {
			const error = await errorResponse.forbidden(
				"Cannot delete system roles",
				{ roleId: id, isSystem: true }
			);
			throw error.error;
		}

		// Check if role has users assigned
		const userRoleCount = await prisma.userRole.count({
			where: {
				roleId: id,
			},
		});

		if (userRoleCount > 0) {
			const error = await errorResponse.conflict(
				`Cannot delete role. ${userRoleCount} users are currently assigned to this role.`,
				{ roleId: id, userCount: userRoleCount }
			);
			throw error.error;
		}

		// Soft delete by marking as inactive
		const deletedRole = await prisma.role.update({
			where: { id },
			data: {
				isActive: false,
			},
			include: {
				permissions: true,
				_count: {
					select: {
						userRoles: true,
						permissions: true,
					},
				},
			},
		});

		return deletedRole;
	});
};

/**
 * Hard delete a role (permanent deletion)
 */
export const hardDeleteRole = async (id: string): Promise<ServiceResponse<any>> => {
	try {
		// Check if role exists
		const role = await prisma.role.findUnique({
			where: { id },
		});

		if (!role) {
			const error = await errorResponse.notFound(
				"Role not found",
				{ roleId: id }
			);
			throw error.error;
		}

		// Prevent deletion of system roles
		if (role.isSystem) {
			const error = await errorResponse.forbidden(
				"Cannot delete system roles",
				{ roleId: id, isSystem: true }
			);
			throw error.error;
		}

		// Check if role has any user assignments (active or inactive)
		const userRoleCount = await prisma.userRole.count({
			where: { roleId: id },
		});

		if (userRoleCount > 0) {
			const error = await errorResponse.conflict(
				`Cannot permanently delete role. ${userRoleCount} user role assignments exist.`,
				{ roleId: id, userRoleCount }
			);
			throw error.error;
		}

		// Delete the role (permissions will be automatically disconnected)
		const deletedRole = await prisma.role.delete({
			where: { id },
		});

		return { success: true, data: deletedRole };
	} catch (error) {
		console.error("Error hard deleting role:", error);
		return errorResponse.internal("An error occurred while permanently deleting the role", { error: String(error) });
	}
};

/**
 * Delete multiple roles
 */
export const deleteRoles = async (ids: string[], permanent = false) => {
	const results = [];

	for (const id of ids) {
		try {
			const deletedRole = permanent
				? await hardDeleteRole(id)
				: await softDeleteRole(id);
			results.push({ success: true, id, role: deletedRole });
		} catch (error) {
			results.push({
				success: false,
				id,
				error: error instanceof Error ? error.message : "Unknown error",
			});
		}
	}

	return results;
};

/**
 * Check if role can be deleted
 */
export const canDeleteRole = async (id: string) => {
	const role = await prisma.role.findUnique({
		where: { id },
		include: {
			_count: {
				select: {
					userRoles: true,
				},
			},
		},
	});

	if (!role) {
		return { canDelete: false, reason: "Role not found" };
	}

	if (role.isSystem) {
		return { canDelete: false, reason: "Cannot delete system roles" };
	}

	const userRoleCount = await prisma.userRole.count({
		where: {
			roleId: id,
		},
	});

	if (userRoleCount > 0) {
		return {
			canDelete: false,
			reason: `Role has ${userRoleCount} user assignments`,
		};
	}

	return { canDelete: true };
};

/**
 * Get deletable roles (non-system roles without active users)
 */
export const getDeletableRoles = async () => {
	return await prisma.role.findMany({
		where: {
			isSystem: false,
			userRoles: {
				none: {},
			},
		},
		include: {
			permissions: true,
			_count: {
				select: {
					userRoles: true,
					permissions: true,
				},
			},
		},
		orderBy: { createdAt: "desc" },
	});
};

/**
 * Force delete role (removes all user assignments first)
 */
export const forceDeleteRole = async (id: string): Promise<ServiceResponse<any>> => {
	return safeAsync(async () => {
		// Check if role exists
		const role = await prisma.role.findUnique({
			where: { id },
		});

		if (!role) {
			const error = await errorResponse.notFound("Role not found", { roleId: id });
			throw error.error;
		}

		// Prevent deletion of system roles
		if (role.isSystem) {
			const error = await errorResponse.forbidden("Cannot delete system roles", { roleId: id, isSystem: true });
			throw error.error;
		}

		// Use transaction to ensure data consistency
		const result = await prisma.$transaction(async (tx) => {
			// First, delete all user role assignments
			await tx.userRole.deleteMany({
				where: { roleId: id },
			});

			// Then delete the role
			const deletedRole = await tx.role.delete({
				where: { id },
			});

			return deletedRole;
		});

		return result;
	});
};

/**
 * Cleanup inactive roles (permanently delete soft-deleted roles)
 */
export const cleanupInactiveRoles = async (olderThanDays = 30) => {
	const cutoffDate = new Date();
	cutoffDate.setDate(cutoffDate.getDate() - olderThanDays);

	// Find inactive roles older than cutoff date
	const inactiveRoles = await prisma.role.findMany({
		where: {
			isActive: false,
			isSystem: false,
			updatedAt: {
				lt: cutoffDate,
			},
			userRoles: {
				none: {}, // No user assignments
			},
		},
		select: { id: true, name: true },
	});

	const results = [];

	for (const role of inactiveRoles) {
		try {
			await prisma.role.delete({
				where: { id: role.id },
			});
			results.push({ success: true, id: role.id, name: role.name });
		} catch (error) {
			results.push({
				success: false,
				id: role.id,
				name: role.name,
				error: error instanceof Error ? error.message : "Unknown error",
			});
		}
	}

	return {
		cleanedCount: results.filter((r) => r.success).length,
		failedCount: results.filter((r) => !r.success).length,
		results,
	};
};

/**
 * Restore soft-deleted role
 */
export const restoreRole = async (id: string): Promise<ServiceResponse<any>> => {
	return safeAsync(async () => {
		// Check if role exists and is soft-deleted
		const role = await prisma.role.findUnique({
			where: { id },
		});

		if (!role) {
			const error = await errorResponse.notFound("Role not found", { roleId: id });
			throw error.error;
		}

		if (role.isActive) {
			const error = await errorResponse.conflict("Role is already active", { roleId: id, isActive: true });
			throw error.error;
		}

		// Restore the role
		const restoredRole = await prisma.role.update({
			where: { id },
			data: {
				isActive: true,
			},
			include: {
				permissions: true,
				_count: {
					select: {
						userRoles: true,
						permissions: true,
					},
				},
			},
		});

		return restoredRole;
	});
};
