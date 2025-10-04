import { PrismaClient } from "@/generated/prisma";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

/**
 * Default user definitions for RBAC system
 * These users will be created with their respective roles
 */
const USER_DEFINITIONS = [
	{
		name: "Super Administrator",
		email: "superadmin@superadmin.com",
		password: "superadmin123",
		roleName: "SUPERADMIN",
		emailVerified: true,
		isActive: true,
		avatar: null,
		bio: "System super administrator - all permissions",
	},
	{
		name: "Administrator",
		email: "admin@admin.com",
		password: "admin123",
		roleName: "ADMIN",
		emailVerified: true,
		isActive: true,
		avatar: null,
		bio: "System administrator - most management permissions",
	},
	{
		name: "Standard User",
		email: "user@user.com",
		password: "user123",
		roleName: "USER",
		emailVerified: true,
		isActive: true,
		avatar: null,
		bio: "Standard user - basic permissions",
	},
];

/**
 * Seeds users with their roles and authentication accounts
 * Creates users for SUPERADMIN, ADMIN, and USER roles
 */
export async function seedUsers() {
	console.log("👤 Starting user seeding...");

	try {
		// Clear existing users in development
		if (process.env.NODE_ENV !== "production") {
			console.log("🧹 Clearing existing users and related data...");
			await clearExistingUsers();
			console.log("✅ Existing users cleared");
		}

		// Get available roles
		const roles = await prisma.role.findMany({
			where: {
				name: { in: ["SUPERADMIN", "ADMIN", "USER"] },
			},
		});

		if (roles.length === 0) {
			throw new Error("No roles found. Please run role seeding first.");
		}

		const roleMap = new Map(roles.map((role) => [role.name, role]));
		console.log(
			`📋 Found ${roles.length} roles: ${roles.map((r) => r.name).join(", ")}`,
		);

		console.log("👤 Creating users...");

		// Process each user definition
		for (const userData of USER_DEFINITIONS) {
			const role = roleMap.get(userData.roleName);
			if (!role) {
				console.warn(
					`⚠️ Role not found: ${userData.roleName}, skipping user: ${userData.email}`,
				);
				continue;
			}

			console.log(`📝 Creating ${userData.name} (${userData.roleName})...`);

			// Hash password with bcrypt
			const hashedPassword = await bcrypt.hash(userData.password, 12);

			// Create user
			const user = await prisma.user.create({
				data: {
					name: userData.name,
					email: userData.email,
					emailVerified: userData.emailVerified,
					isActive: userData.isActive,
					roleId: role.id, // Primary role assignment
					image: userData.avatar,
				},
			});

			console.log(`✅ User created: ${user.email} (ID: ${user.id})`);

			// Create authentication account for Better Auth
			await prisma.account.create({
				data: {
					userId: user.id,
					accountId: user.email, // Required for Better Auth credential provider
					providerId: "credential", // Credential provider for email/password auth
					password: hashedPassword,
				},
			});

			console.log(`🔐 Authentication account created for: ${user.email}`);

			// Create UserRole relationship (many-to-many)
			await prisma.userRole.create({
				data: {
					userId: user.id,
					roleId: role.id,
				},
			});

			console.log(
				`🔗 User-Role relationship created: ${user.email} <-> ${role.name}`,
			);
		}

		// Display summary of created users
		await displayUserSummary();

		console.log("🎉 User seeding completed successfully!");
	} catch (error) {
		console.error("❌ Error seeding users:", error);
		throw error;
	}
}

/**
 * Clears existing users and related data in development environment
 * Handles foreign key constraints by deleting in proper order
 */
async function clearExistingUsers() {
	// Delete authentication accounts
	await prisma.account.deleteMany();
	// Delete user-role relationships
	await prisma.userRole.deleteMany();
	// Delete users
	await prisma.user.deleteMany();
}

/**
 * Displays a summary of all created users with their details
 */
async function displayUserSummary() {
	const users = await prisma.user.findMany({
		include: {
			role: true,
			userRoles: {
				include: {
					role: true,
				},
			},
		},
	});

	console.log("\n👥 Created Users Summary:");
	console.log("=".repeat(60));

	for (const user of users) {
		const userDef = USER_DEFINITIONS.find((u) => u.email === user.email);
		console.log(`📧 ${user.email}`);
		console.log(`   👤 Name: ${user.name}`);
		console.log(`   🎭 Primary Role: ${user.role?.name || "None"}`);
		console.log(`   🔑 Password: ${userDef?.password || "Unknown"}`);
		console.log(`   ✅ Email Verified: ${user.emailVerified ? "Yes" : "No"}`);
		console.log(`   🟢 Active: ${user.isActive ? "Yes" : "No"}`);
		console.log(`   📅 Created: ${user.createdAt.toLocaleString("en-US")}`);
		console.log("");
	}

  // Assign Demo role to editor user
  if (demoRole) {
    await prisma.userRole.upsert({
      where: {
        userId_roleId: {
          userId: editorUser.id,
          roleId: demoRole.id,
        },
      },
      update: {},
      create: {
        userId: editorUser.id,
        roleId: demoRole.id,
      },
    });
    console.log("✅ Assigned Demo role to editor user");
  }

  // Assign Demo role to analyst user
  if (demoRole) {
    await prisma.userRole.upsert({
      where: {
        userId_roleId: {
          userId: analystUser.id,
          roleId: demoRole.id,
        },
      },
      update: {},
      create: {
        userId: analystUser.id,
        roleId: demoRole.id,
      },
    });
    console.log("✅ Assigned Demo role to analyst user");
  }

  // Assign Admin role to support user
  if (adminRole) {
    await prisma.userRole.upsert({
      where: {
        userId_roleId: {
          userId: supportUser.id,
          roleId: adminRole.id,
        },
      },
      update: {},
      create: {
        userId: supportUser.id,
        roleId: adminRole.id,
      },
    });
    console.log("✅ Assigned Admin role to support user");
  }

  // Assign Demo role to api user
  if (demoRole) {
    await prisma.userRole.upsert({
      where: {
        userId_roleId: {
          userId: apiUser.id,
          roleId: demoRole.id,
        },
      },
      update: {},
      create: {
        userId: apiUser.id,
        roleId: demoRole.id,
      },
    });
    console.log("✅ Assigned Demo role to api user");
  }

  // Assign Demo role to viewer user
  if (demoRole) {
    await prisma.userRole.upsert({
      where: {
        userId_roleId: {
          userId: viewerUser.id,
          roleId: demoRole.id,
        },
      },
      update: {},
      create: {
        userId: viewerUser.id,
        roleId: demoRole.id,
      },
    });
    console.log("✅ Assigned Demo role to viewer user");
  }

  // Assign Demo role to test user
  if (demoRole) {
    await prisma.userRole.upsert({
      where: {
        userId_roleId: {
          userId: testUser.id,
          roleId: demoRole.id,
        },
      },
      update: {},
      create: {
        userId: testUser.id,
        roleId: demoRole.id,
      },
    });
    console.log("✅ Assigned Demo role to test user");
  }

  console.log("\n🔑 Created test user accounts with RBAC roles:");
  console.log("├── admin@corepilot.com / admin123 (Super Administrator - Ultimate access)");
  console.log("├── manager@corepilot.com / manager123 (Admin Manager - Admin operations)");
  console.log("├── editor@corepilot.com / editor123 (Demo Editor - Demo content management)");
  console.log("├── analyst@corepilot.com / analyst123 (Demo Analyst - Demo analytics)");
  console.log("├── support@corepilot.com / support123 (Admin Support - Admin support)");
  console.log("├── api@corepilot.com / api123 (Demo API - Demo API access)");
  console.log("├── viewer@corepilot.com / viewer123 (Demo Viewer - Demo view only)");
  console.log("└── test@corepilot.com / test123 (Demo Test User - Demo basic access)");
}
