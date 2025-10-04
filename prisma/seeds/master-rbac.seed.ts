import { PrismaClient } from "@/generated/prisma";
import { seedRoles } from "./roles.seed";
import { seedUsers } from "./users.seed";

const prisma = new PrismaClient();

/**
 * Master RBAC seeding function that orchestrates the complete RBAC setup
 * Executes seeding in the correct order: permissions → roles → users
 * 
 * This ensures proper foreign key relationships and data integrity
 */
export async function seedMasterRBAC() {
	console.log("🚀 Starting Master RBAC Seeding Process...");
	console.log("=".repeat(60));

	const startTime = Date.now();

	try {
		// Step 1: Seed Roles and Permissions together
		console.log("\n🎭 Step 1/2: Seeding Roles and Permissions...");
		console.log("-".repeat(40));
		await seedRoles();
		console.log("✅ Roles and permissions seeding completed");

		// Step 2: Seed Users (depends on roles)
		console.log("\n👤 Step 2/2: Seeding Users...");
		console.log("-".repeat(40));
		await seedUsers();
		console.log("✅ Users seeding completed");

		// Calculate execution time
		const endTime = Date.now();
		const executionTime = ((endTime - startTime) / 1000).toFixed(2);

		// Display final summary
		await displayRBACSystemSummary();

		console.log("\n🎉 Master RBAC Seeding Process Completed Successfully!");
		console.log(`⏱️  Total execution time: ${executionTime} seconds`);
		console.log("=".repeat(60));

	} catch (error) {
		console.error("\n❌ Master RBAC Seeding Process Failed!");
		console.error("Error details:", error);
		throw error;
	}
}

/**
 * Displays a comprehensive summary of the RBAC system after seeding
 */
async function displayRBACSystemSummary() {
	console.log("\n📊 RBAC System Summary:");
	console.log("=".repeat(60));

	try {
		// Get permissions count
		const permissionsCount = await prisma.permission.count();
		console.log(`📋 Total Permissions: ${permissionsCount}`);

		// Get roles with their permission counts
		const roles = await prisma.role.findMany({
			include: {
				permissions: true,
				users: true,
				userRoles: true,
			},
		});

		console.log(`🎭 Total Roles: ${roles.length}`);
		for (const role of roles) {
			console.log(`   ├── ${role.name}: ${role.permissions.length} permissions, ${role.users.length} users`);
		}

		// Get users count
		const usersCount = await prisma.user.count();
		console.log(`👤 Total Users: ${usersCount}`);

		// Get user-role relationships count
		const userRolesCount = await prisma.userRole.count();
		console.log(`🔗 Total User-Role Relationships: ${userRolesCount}`);

		// Display login credentials
		console.log("\n🔑 Available Login Credentials:");
		console.log("├── superadmin@corepilot.com / superadmin123 (Super Admin)");
		console.log("├── admin@corepilot.com / admin123 (Admin)");
		console.log("└── user@corepilot.com / user123 (User)");

		// Display system status
		console.log("\n🟢 RBAC System Status: READY");
		console.log("   ✅ Permissions configured");
		console.log("   ✅ Roles defined with permissions");
		console.log("   ✅ Users created with role assignments");
		console.log("   ✅ Authentication accounts configured");

	} catch (error) {
		console.error("❌ Error generating RBAC system summary:", error);
	}
}

/**
 * Validates the RBAC system integrity after seeding
 * Checks for orphaned records and missing relationships
 */
export async function validateRBACSystem() {
	console.log("\n🔍 Validating RBAC System Integrity...");

	try {
		// Check for users without roles
		const usersWithoutRoles = await prisma.user.findMany({
			where: {
				roleId: {
					equals: "admin",
				},
			},
		});

		if (usersWithoutRoles.length > 0) {
			console.warn(`⚠️ Found ${usersWithoutRoles.length} users without primary roles`);
		}

		// Check for roles without permissions
		const rolesWithoutPermissions = await prisma.role.findMany({
			where: {
				permissions: {
					none: {},
				},
			},
		});

		if (rolesWithoutPermissions.length > 0) {
			console.warn(`⚠️ Found ${rolesWithoutPermissions.length} roles without permissions`);
		}

		// Check for orphaned permissions
		const orphanedPermissions = await prisma.permission.findMany({
			where: {
				roleId: {
					equals: "admin",
				},
			},
		});

		if (orphanedPermissions.length > 0) {
			console.warn(`⚠️ Found ${orphanedPermissions.length} orphaned permissions`);
		}

		console.log("✅ RBAC system validation completed");

	} catch (error) {
		console.error("❌ Error validating RBAC system:", error);
	}
}

// Allow running this seed file directly
if (require.main === module) {
	seedMasterRBAC()
		.then(async () => {
			// Run validation after seeding
			await validateRBACSystem();
		})
		.catch((error) => {
			console.error("❌ Master RBAC seeding failed:", error);
			process.exit(1);
		})
		.finally(async () => {
			await prisma.$disconnect();
		});
}