import { prisma } from "@/lib/prisma";
import bcrypt from "bcryptjs";
import type {
	User,
	UpdateUserInput,
	BanUserInput,
	RemoveRoleInput,
} from "../types";

/**
 * User Update Service - Update operations for user management
 */

/**
 * Update user data
 */
export async function updateUser(
	id: string,
	data: UpdateUserInput,
): Promise<User> {
	const { roleIds, ...updateData } = data;

	// Start transaction
	const result = await prisma.$transaction(async (tx) => {
		// Update user basic info
		const updatedUser = await tx.user.update({
			where: { id },
			data: updateData,
			include: {
				userRoles: {
					include: {
						role: true,
					},
				},
			},
		});

		// Update roles if provided
		if (roleIds !== undefined) {
			// Remove existing roles
			await tx.userRole.deleteMany({
				where: { userId: id },
			});

			// Add new roles
			if (roleIds.length > 0) {
				await tx.userRole.createMany({
					data: roleIds.map((roleId) => ({
						userId: id,
						roleId,
					})),
				});
			}

			// Fetch updated user with new roles
			const userWithRoles = await tx.user.findUnique({
				where: { id },
				include: {
					userRoles: {
						include: {
							role: true,
						},
					},
				},
			});

			return userWithRoles!;
		}

		return updatedUser;
	});

	// Transform to match User interface
	return {
		id: result.id,
		name: result.name,
		email: result.email,
		emailVerified: result.emailVerified,
		image: result.image || undefined,
		banned: result.banned || undefined,
		banReason: result.banReason || undefined,
		banExpires: result.banExpires || undefined,
		createdAt: result.createdAt,
		updatedAt: result.updatedAt,
		userRoles: result.userRoles.map((ur) => ({
			id: ur.id,
			roleId: ur.roleId,
			userId: ur.userId,
			role: {
				id: ur.role.id,
				name: ur.role.name,
				displayName: ur.role.name,
				description: ur.role.description || "",
				type: "USER" as const,
				status: ur.role.isActive ? ("ACTIVE" as const) : ("INACTIVE" as const),
				createdAt: ur.role.createdAt,
				updatedAt: ur.role.updatedAt,
			},
		})),
	};
}

/**
 * Update user role (replaces existing roles)
 */
export async function updateUserRole(
	userId: string,
	roleId: string,
): Promise<void> {
	await prisma.$transaction(async (tx) => {
		// Remove existing roles
		await tx.userRole.deleteMany({
			where: { userId },
		});

		// Assign new role
		await tx.userRole.create({
			data: {
				userId,
				roleId,
			},
		});
	});
}

/**
 * Remove role from user
 */
export async function removeRole(data: RemoveRoleInput): Promise<void> {
	const { userId, roleId } = data;

	await prisma.userRole.delete({
		where: {
			userId_roleId: {
				userId,
				roleId,
			},
		},
	});
}

/**
 * Set user password
 */
export async function setUserPassword(
	userId: string,
	newPassword: string,
): Promise<void> {
	const hashedPassword = await bcrypt.hash(newPassword, 12);

	await prisma.account.upsert({
		where: {
			userId_providerId: {
				userId,
				providerId: "credential",
			},
		},
		update: {
			password: hashedPassword,
		},
		create: {
			userId,
			providerId: "credential",
			accountId: userId, // Use userId as accountId for credential provider
			password: hashedPassword,
		},
	});
}

/**
 * Ban user
 */
export async function banUser(data: BanUserInput): Promise<void> {
	const { userId, reason } = data;

	await prisma.user.update({
		where: { id: userId },
		data: {
			banned: true,
			banReason: reason,
			banExpires: data.expiresIn
				? new Date(Date.now() + data.expiresIn * 1000)
				: null,
		},
	});
}

/**
 * Unban user
 */
export async function unbanUser(userId: string): Promise<void> {
	await prisma.user.update({
		where: { id: userId },
		data: {
			banned: false,
			banReason: null,
			banExpires: null,
		},
	});
}

/**
 * Bulk ban users
 */
export async function bulkBanUsers(data: {
	userIds: string[];
	reason?: string;
}): Promise<{ success: number; failed: number }> {
	const { userIds, reason } = data;
	let success = 0;
	let failed = 0;

	for (const userId of userIds) {
		try {
			await banUser({ userId, reason: reason || "Bulk ban operation" });
			success++;
		} catch {
			failed++;
		}
	}

	return { success, failed };
}

/**
 * Bulk unban users
 */
export async function bulkUnbanUsers(
	userIds: string[],
): Promise<{ success: number; failed: number }> {
	let success = 0;
	let failed = 0;

	for (const userId of userIds) {
		try {
			await unbanUser(userId);
			success++;
		} catch {
			failed++;
		}
	}

	return { success, failed };
}

/**
 * Revoke user session
 */
export async function revokeUserSession(sessionToken: string): Promise<void> {
	await prisma.session.delete({
		where: { token: sessionToken },
	});
}

/**
 * Revoke all user sessions
 */
export async function revokeUserSessions(userId: string): Promise<void> {
	await prisma.session.deleteMany({
		where: { userId },
	});
}