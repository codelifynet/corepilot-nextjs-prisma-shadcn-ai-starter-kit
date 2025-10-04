import { prisma } from "@/lib/prisma";

/**
 * User Delete Service - Delete operations for user management
 */

/**
 * Remove user (soft delete or hard delete based on business logic)
 */
export async function removeUser(userId: string): Promise<void> {
	await prisma.user.delete({
		where: { id: userId },
	});
}

/**
 * Bulk delete users
 */
export async function bulkDeleteUsers(
	userIds: string[],
): Promise<{ success: number; failed: number }> {
	let success = 0;
	let failed = 0;

	for (const userId of userIds) {
		try {
			await removeUser(userId);
			success++;
		} catch {
			failed++;
		}
	}

	return { success, failed };
}