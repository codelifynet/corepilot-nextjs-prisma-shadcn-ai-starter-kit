import { z } from "zod";

// RBAC Role names
const ROLE_NAMES = ["superadmin", "admin", "user"] as const;

// Base user schema (RBAC version)
export const userSchema = z.object({
	id: z.string().uuid(),
	name: z
		.string()
		.min(1, "Name is required")
		.max(100, "Name must be less than 100 characters"),
	email: z.string().email("Invalid email address"),
	emailVerified: z.boolean().default(false),
	image: z.string().url().optional(),
	banned: z.boolean().optional(),
	banReason: z.string().optional(),
	banExpires: z.date().optional(),
	createdAt: z.date(),
	updatedAt: z.date(),
	userRoles: z
		.array(
			z.object({
				id: z.string().uuid(),
				roleId: z.string().uuid(),
				userId: z.string().uuid(),
				role: z.object({
					id: z.string().uuid(),
					name: z.enum(ROLE_NAMES),
					displayName: z.string().optional(),
					description: z.string(),
					type: z.enum(["SUPERADMIN", "ADMIN", "USER"]),
					status: z.enum(["ACTIVE", "INACTIVE", "PENDING"]),
				}),
			}),
		)
		.optional(),
});

// Create user schema (RBAC version)
export const createUserSchema = z.object({
	name: z
		.string()
		.min(1, "Name is required")
		.max(100, "Name must be less than 100 characters"),
	email: z.string().email("Invalid email address"),
	password: z
		.string()
		.min(8, "Password must be at least 8 characters")
		.max(128, "Password must be less than 128 characters"),
	roleIds: z.array(z.string().uuid()).default([]), // Array of role IDs to assign
	emailVerified: z.boolean().default(false),
});

// Update user schema (RBAC version)
export const updateUserSchema = z.object({
	name: z
		.string()
		.min(1, "Name is required")
		.max(100, "Name must be less than 100 characters")
		.optional(),
	email: z.string().email("Invalid email address").optional(),
	roleIds: z.array(z.string().uuid()).optional(), // Array of role IDs to assign
	emailVerified: z.boolean().optional(),
	image: z.string().url().optional(),
});

// User filters schema (RBAC version)
export const userFiltersSchema = z.object({
	search: z.string().optional(),
	role: z.string().optional(), // Role name string instead of enum
	banned: z.boolean().optional(),
	emailVerified: z.boolean().optional(),
	createdFrom: z.date().optional(),
	createdTo: z.date().optional(),
});

// Ban user schema
export const banUserSchema = z.object({
	userId: z.string().uuid("Invalid user ID"),
	reason: z
		.string()
		.min(1, "Ban reason is required")
		.max(500, "Ban reason must be less than 500 characters"),
	expiresIn: z.number().positive("Expiry time must be positive").optional(),
});

// Unban user schema
export const unbanUserSchema = z.object({
	userId: z.string().uuid("Invalid user ID"),
});

// Assign role schema (RBAC version)
export const assignRoleSchema = z.object({
	userId: z.string().uuid("Invalid user ID"),
	roleId: z.string().uuid("Invalid role ID"),
});

// Remove role schema (RBAC version)
export const removeRoleSchema = z.object({
	userId: z.string().uuid("Invalid user ID"),
	roleId: z.string().uuid("Invalid role ID"),
});

// Set user password schema
export const setUserPasswordSchema = z.object({
	userId: z.string().uuid("Invalid user ID"),
	newPassword: z
		.string()
		.min(8, "Password must be at least 8 characters")
		.max(128, "Password must be less than 128 characters"),
});

// List users params schema
export const listUsersParamsSchema = z.object({
	page: z.number().int().positive().default(1),
	limit: z.number().int().min(1).max(100).default(10),
	sort: z
		.enum(["name", "email", "role", "createdAt", "updatedAt"])
		.default("createdAt"),
	order: z.enum(["asc", "desc"]).default("desc"),
	filters: userFiltersSchema.optional(),
});

// Remove user schema
export const removeUserSchema = z.object({
	userId: z.string().uuid("Invalid user ID"),
});

// Impersonate user schema
export const impersonateUserSchema = z.object({
	userId: z.string().uuid("Invalid user ID"),
});

// Revoke user session schema
export const revokeUserSessionSchema = z.object({
	sessionToken: z.string().min(1, "Session token is required"),
});

// Revoke user sessions schema
export const revokeUserSessionsSchema = z.object({
	userId: z.string().uuid("Invalid user ID"),
});

// Permission check schema
export const permissionCheckSchema = z.object({
	permissions: z.record(z.string(), z.array(z.string())),
});

// Role permission check schema
export const rolePermissionCheckSchema = z.object({
	role: z.string().min(1, "Role is required"),
	permissions: z.record(z.string(), z.array(z.string())),
});

// Export types (RBAC version)
export type CreateUserInput = z.infer<typeof createUserSchema>;
export type UpdateUserInput = z.infer<typeof updateUserSchema>;
export type UserFilters = z.infer<typeof userFiltersSchema>;
export type BanUserInput = z.infer<typeof banUserSchema>;
export type UnbanUserInput = z.infer<typeof unbanUserSchema>;
export type AssignRoleInput = z.infer<typeof assignRoleSchema>;
export type RemoveRoleInput = z.infer<typeof removeRoleSchema>;
export type SetUserPasswordInput = z.infer<typeof setUserPasswordSchema>;
export type ListUsersParams = z.infer<typeof listUsersParamsSchema>;
export type RemoveUserInput = z.infer<typeof removeUserSchema>;
export type ImpersonateUserInput = z.infer<typeof impersonateUserSchema>;
export type RevokeUserSessionInput = z.infer<typeof revokeUserSessionSchema>;
export type RevokeUserSessionsInput = z.infer<typeof revokeUserSessionsSchema>;
export type PermissionCheckInput = z.infer<typeof permissionCheckSchema>;
export type RolePermissionCheckInput = z.infer<
	typeof rolePermissionCheckSchema
>;
