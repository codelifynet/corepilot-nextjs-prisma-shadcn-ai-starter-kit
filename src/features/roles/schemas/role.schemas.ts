import { z } from "zod";

// Permission validation schema - updated to match the new structure
export const permissionSchema = z.object({
	entity: z.string().min(1, "Entity is required"),
	field: z.string().min(1, "Field is required"),
	action: z.string().min(1, "Action is required"),
	maskType: z.string().optional().default("none"),
});

// Base role schema for validation
export const roleSchema = z.object({
	name: z
		.string()
		.min(1, "Role name is required")
		.min(2, "Role name must be at least 2 characters")
		.max(50, "Role name must not exceed 50 characters")
		.regex(
			/^[a-zA-Z0-9\s\-_]+$/,
			"Role name can only contain letters, numbers, spaces, hyphens, and underscores",
		),

	description: z
		.string()
		.max(500, "Description must not exceed 500 characters")
		.optional()
		.or(z.literal("")),

	isActive: z.boolean().default(true),

	isSystem: z.boolean().default(false),

	permissions: z
		.array(permissionSchema)
		.max(100, "Cannot assign more than 100 permissions to a role")
		.default([]),
});

// Create role schema (all fields required except description)
export const createRoleSchema = z.object({
	name: z
		.string()
		.min(1, "Role name is required")
		.min(2, "Role name must be at least 2 characters")
		.max(50, "Role name must not exceed 50 characters")
		.regex(
			/^[a-zA-Z0-9\s\-_]+$/,
			"Role name can only contain letters, numbers, spaces, hyphens, and underscores",
		),

	description: z
		.string()
		.max(500, "Description must not exceed 500 characters")
		.optional()
		.or(z.literal("")),

	isActive: z.boolean().default(true),

	isSystem: z.boolean().default(false),

	permissions: z
		.array(permissionSchema)
		.max(100, "Cannot assign more than 100 permissions to a role")
		.default([]),
});

// Update role schema (all fields optional)
export const updateRoleSchema = z.object({
	name: z
		.string()
		.min(1, "Role name is required")
		.min(2, "Role name must be at least 2 characters")
		.max(50, "Role name must not exceed 50 characters")
		.regex(
			/^[a-zA-Z0-9\s\-_]+$/,
			"Role name can only contain letters, numbers, spaces, hyphens, and underscores",
		)
		.optional(),

	description: z
		.string()
		.max(500, "Description must not exceed 500 characters")
		.optional()
		.or(z.literal("")),

	isActive: z.boolean().optional(),

	isSystem: z.boolean().optional(),

	permissions: z
		.array(permissionSchema)
		.max(100, "Cannot assign more than 100 permissions to a role")
		.optional(),
});

// Form data type inference
export type RoleFormData = z.infer<typeof roleSchema>;
export type CreateRoleFormData = z.infer<typeof createRoleSchema>;
export type UpdateRoleFormData = z.infer<typeof updateRoleSchema>;

// Validation helper functions
export const validateRoleForm = (data: unknown) => {
	return roleSchema.safeParse(data);
};

export const validateCreateRole = (data: unknown) => {
	return createRoleSchema.safeParse(data);
};

export const validateUpdateRole = (data: unknown) => {
	return updateRoleSchema.safeParse(data);
};
