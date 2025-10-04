import { prisma } from "@/lib/prisma";
import bcrypt from "bcryptjs";
import type {
	User,
	CreateUserInput,
	AssignRoleInput,
} from "../types";

/**
 * User Create Service - Create operations for user management
 */

/**
 * Create a new user with hashed password
 */
export async function createUser(data: CreateUserInput): Promise<User> {
	const { password, roleIds, ...userData } = data;

	// Hash password if provided
	let hashedPassword: string | undefined;
	if (password) {
		hashedPassword = await bcrypt.hash(password, 12);
	}

	// Create user with transaction to ensure data consistency
	const user = await prisma.$transaction(async (tx) => {
		// Create the user
		const newUser = await tx.user.create({
			data: userData,
		});

		// Create account with password if provided
		if (hashedPassword) {
			await tx.account.create({
				data: {
					userId: newUser.id,
					providerId: "credential",
					accountId: newUser.email,
					password: hashedPassword,
				},
			});
		}

		// Assign roles if provided
		if (roleIds && roleIds.length > 0) {
			await tx.userRole.createMany({
				data: roleIds.map((roleId) => ({
					userId: newUser.id,
					roleId,
				})),
			});
		}

		// Return user with roles
		return await tx.user.findUnique({
			where: { id: newUser.id },
			include: {
				userRoles: {
					include: {
						role: true,
					},
				},
			},
		});
	});

	if (!user) {
		throw new Error("Failed to create user");
	}

	return user as unknown as User;
}

/**
 * Assign role to user
 */
export async function assignRole(data: AssignRoleInput): Promise<void> {
	const { userId, roleId } = data;

	await prisma.userRole.create({
		data: {
			userId,
			roleId,
		},
	});
}

/**
 * Set user role (replaces existing roles)
 */
export async function setUserRole(
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
 * Impersonate user (create impersonation session)
 */
export async function impersonateUser(
	adminId: string,
	targetUserId: string,
): Promise<User | null> {
	// Verify admin has permission to impersonate
	const admin = await prisma.user.findUnique({
		where: { id: adminId },
		include: {
			userRoles: {
				include: {
					role: true,
				},
			},
		},
	});

	if (!admin) {
		throw new Error("Admin user not found");
	}

	const hasAdminRole = admin.userRoles.some(
		(ur) => ur.role.name === "admin" || ur.role.name === "super_admin",
	);

	if (!hasAdminRole) {
		throw new Error("Insufficient permissions to impersonate users");
	}

	// Get target user
	const targetUser = await prisma.user.findUnique({
		where: { id: targetUserId },
		include: {
			userRoles: {
				include: {
					role: true,
				},
			},
		},
	});

	if (!targetUser) {
		return null;
	}


	return targetUser as unknown as User;
}