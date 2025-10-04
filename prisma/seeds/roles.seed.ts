import { PrismaClient } from "@/generated/prisma";
import {
	ACTIONS,
	DEFAULT_ROLE_PERMISSIONS,
	type PermissionDefinition,
} from "@/constants/permissions";

const prisma = new PrismaClient();

/**
 * Role definitions with their permissions
 */
const ROLE_DEFINITIONS = {
	SUPERADMIN: {
		name: "SUPERADMIN",
		description: "Full access to all system areas - highest authority level",
		isSystem: true,
		isActive: true,
		permissions: DEFAULT_ROLE_PERMISSIONS.SUPER_ADMIN.permissions,
	},
	ADMIN: {
		name: "ADMIN",
		description:
			"Has most system management permissions - limited access to finance area",
		isSystem: false,
		isActive: true,
		permissions: DEFAULT_ROLE_PERMISSIONS.ADMIN.permissions,
	},
	USER: {
		name: "USER",
		description: "Basic user access - limited permissions",
		isSystem: false,
		isActive: true,
		permissions: DEFAULT_ROLE_PERMISSIONS.USER.permissions,
	},
};

/**
 * Create display information for permissions
 */
function createPermissionDisplayInfo(permission: PermissionDefinition) {
	const entityDisplayNames: Record<string, string> = {
		user: "User",
		role: "Role",
		permission: "Permission",
		blog: "Blog",
		category: "Category",
		tag: "Tag",
		content: "Content",
		product: "Product",
		order: "Order",
		customer: "Customer",
		campaign: "Campaign",
		finance: "Finance",
		analytics: "Analytics",
		notification: "Notification",
		support: "Support",
		system: "System",
		ai_tools: "AI Tools",
	};

	const actionDisplayNames = {
		[ACTIONS.CREATE]: "Create",
		[ACTIONS.READ]: "Read",
		[ACTIONS.UPDATE]: "Update",
		[ACTIONS.DELETE]: "Delete",
		[ACTIONS.LIST]: "List",
		[ACTIONS.EXPORT]: "Export",
		[ACTIONS.IMPORT]: "Import",
		[ACTIONS.APPROVE]: "Approve",
		[ACTIONS.REJECT]: "Reject",
		[ACTIONS.PUBLISH]: "Publish",
		[ACTIONS.ARCHIVE]: "Archive",
		[ACTIONS.MANAGE]: "Manage",
	};

	return {
		displayName: `${actionDisplayNames[permission.action as keyof typeof actionDisplayNames] ?? permission.action} ${entityDisplayNames[permission.entity] ?? permission.entity}`,
		description: `Permission to ${permission.action.toLowerCase()} ${permission.entity.toLowerCase()} ${permission.field !== "*" ? `(${permission.field})` : ""}`,
	};
}

/**
 * Seed all roles and their permissions into the database
 */
export async function seedRoles() {
	console.log("🎭 Starting roles seeding...");

	try {
		// Clear existing data in development mode
		if (process.env.NODE_ENV === "development") {
			console.log("🧹 Clearing existing roles data...");
			await prisma.permission.deleteMany({});
			await prisma.user.deleteMany({});
			await prisma.role.deleteMany({});
		}

		// Create roles first without permissions
		const createdRoles = [];
		for (const roleData of Object.values(ROLE_DEFINITIONS)) {
			console.log(`📝 Creating role: ${roleData.name}`);

			// Use upsert to handle existing roles
			const role = await prisma.role.upsert({
				where: { name: roleData.name },
				update: {
					description: roleData.description,
					isSystem: roleData.isSystem,
					isActive: roleData.isActive,
				},
				create: {
					name: roleData.name,
					description: roleData.description,
					isSystem: roleData.isSystem,
					isActive: roleData.isActive,
				},
			});

			createdRoles.push({ role, permissions: roleData.permissions });
			console.log(`✅ Created role: ${role.name} (ID: ${role.id})`);
		}

		console.log(`✅ Created ${createdRoles.length} roles successfully`);

		// Now create permissions for each role
		console.log("📋 Creating permissions for roles...");

		for (const { role, permissions } of createdRoles) {
			console.log(`🔐 Creating permissions for role: ${role.name}`);
			let assignedCount = 0;

			for (const permission of permissions) {
				try {
					// Create permission directly for this role
					const enrichedPermission = createPermissionDisplayInfo(permission);

					await prisma.permission.create({
						data: {
							entity: permission.entity,
							field: permission.field,
							action: permission.action,
							maskType: permission.maskType,
							displayName: enrichedPermission.displayName,
							description: enrichedPermission.description,
							roleId: role.id,
						},
					});

					assignedCount++;
				} catch (error) {
					console.error(
						`❌ Error creating permission for role ${role.name}:`,
						error,
					);
				}
			}

			console.log(`✅ Created ${assignedCount} permissions for ${role.name}`);
		}

		console.log("✅ All roles and permissions seeded successfully");
	} catch (error) {
		console.error("❌ Error seeding roles:", error);
		throw error;
	}
}

// Allow running this seed file directly
if (require.main === module) {
	seedRoles()
		.catch((e) => {
			console.error(e);
			process.exit(1);
		})
		.finally(async () => {
			await prisma.$disconnect();
		});
}
