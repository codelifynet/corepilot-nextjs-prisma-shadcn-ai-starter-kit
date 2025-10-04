import { betterAuth } from "better-auth";
import { prismaAdapter } from "better-auth/adapters/prisma";
import { multiSession, admin, customSession } from "better-auth/plugins";
import { NextResponse } from "next/server";
import { headers } from "next/headers";
import { prisma } from "@/lib/prisma";
import bcrypt from "bcryptjs";
import {
	ac,
	adminRole,
	userRole,
	moderatorRole,
	superadminRole,
} from "@/lib/auth-permissions";

export interface SessionUser {
	id: string;
	role: string; // Primary role name from database
	email: string;
	name: string;
	image?: string | null;
	banned?: boolean | null;
	banReason?: string | null;
	banExpires?: Date | null;
	[key: string]: any;
}

export const auth = betterAuth({
	database: prismaAdapter(prisma, {
		provider: "postgresql",
	}),
	plugins: [
		multiSession(),
		admin({
			ac,
			roles: {
				admin: adminRole,
				user: userRole,
				moderator: moderatorRole,
				superadmin: superadminRole,
			},
			adminRoles: ["ADMIN", "SUPERADMIN"],
			defaultRole: "USER",
		}),
		customSession(async ({ user, session }) => {
			let userRole = "USER"; // Default role

			try {
				const userWithRole = await prisma.user.findUnique({
					where: { id: user.id },
					include: {
						role: true, // Primary role
					},
				});

				if (userWithRole?.role) {
					userRole = userWithRole.role.name;
				}
			} catch (error) {
				console.error("Error fetching user role:", error);
			}

			return {
				user: {
					...user,
					role: userRole,
				},
				session,
			};
		}),
	],
	emailAndPassword: {
		enabled: true,
		requireEmailVerification: false,
		minPasswordLength: 8,
		maxPasswordLength: 128,
		autoSignIn: true,
		password: {
			hash: async (password: string) => {
				return await bcrypt.hash(password, 12);
			},
			verify: async ({
				hash,
				password,
			}: {
				hash: string;
				password: string;
			}) => {
				return await bcrypt.compare(password, hash);
			},
		},
	},
	session: {
		expiresIn: 60 * 60 * 24 * 7, // 7 days
		updateAge: 60 * 60 * 24, // 1 day
		cookieCache: {
			enabled: true,
			maxAge: 60 * 5, // 5 minutes
		},
	},
	advanced: {
		useSecureCookies: process.env.NODE_ENV === "production",
		defaultCookieAttributes: {
			httpOnly: true,
			sameSite: "lax",
			secure: process.env.NODE_ENV === "production",
			path: "/",
		},
	},
	logger: {
		level: "debug",
	},
	user: {
		additionalFields: {
			role: {
				type: "string",
				required: false,
				defaultValue: "USER",
			},
		},
	},
	secret: process.env.BETTER_AUTH_SECRET || "your-secret-key-here",
	baseURL: process.env.BETTER_AUTH_URL || "http://localhost:3007",
});

/**
 * Retrieves the current user session from the request.
 * This is a server-side helper that safely gets the session without throwing errors.
 * @param req - The incoming request object
 * @returns The user session object or null if not authenticated
 */
export async function getCurrentUser(req: Request) {
	try {
		const session = await auth.api.getSession({
			headers: req.headers,
		});

		return session?.user ?? null;
	} catch (error) {
		console.warn("Failed to get current user:", error);
		return null;
	}
}

/**
 * Retrieves the full session (including user data) from the request.
 * @param req - The incoming request object
 * @returns The full session object or null if not authenticated
 */
export async function getSession(req: Request) {
	try {
		const session = await auth.api.getSession({
			headers: req.headers,
		});

		return session ?? null;
	} catch (error) {
		console.warn("Failed to get session:", error);
		return null;
	}
}

/**
 * Higher-order function to protect API routes and require authentication.
 * @param handler - The API route handler to wrap
 * @returns A new handler that performs authentication check before execution
 */
export function withAuth(
	handler: (
		req: Request,
		context: { user: SessionUser; params: any },
	) => Promise<NextResponse>,
) {
	return async (req: Request, context: { params: any }) => {
		const user = await getCurrentUser(req);

		if (!user) {
			return new NextResponse(JSON.stringify({ error: "Unauthorized" }), {
				status: 401,
				headers: { "Content-Type": "application/json" },
			});
		}

		return handler(req, { ...context, user: user as SessionUser });
	};
}

// ============================================================================
// RBAC Utility Functions
// ============================================================================

/**
 * Check if a user has a specific permission
 * @param user - The session user
 * @param permission - Permission string in format "resource.action"
 * @returns boolean indicating if user has permission
 */
export function hasPermission(user: SessionUser, permission: string): boolean {
	// SUPERADMIN has all permissions
	if (user.role === "SUPERADMIN") {
		return true;
	}

	// Check if user has the specific permission
	return user.permissions?.includes(permission) || false;
}

/**
 * Check if a user has a specific role
 * @param user - The session user
 * @param role - Role name to check
 * @returns boolean indicating if user has the role
 */
export function hasRole(user: SessionUser, role: string): boolean {
	// Check primary role
	if (user.role === role) {
		return true;
	}

	// Check role hierarchy for inherited roles
	return user.roleHierarchy?.includes(role) || false;
}

/**
 * Check if a user has any of the specified roles
 * @param user - The session user
 * @param roles - Array of role names to check
 * @returns boolean indicating if user has any of the roles
 */
export function hasAnyRole(user: SessionUser, roles: string[]): boolean {
	return roles.some(role => hasRole(user, role));
}

/**
 * Check if a user has all of the specified permissions
 * @param user - The session user
 * @param permissions - Array of permission strings to check
 * @returns boolean indicating if user has all permissions
 */
export function hasAllPermissions(user: SessionUser, permissions: string[]): boolean {
	return permissions.every(permission => hasPermission(user, permission));
}

/**
 * Check if a user has any of the specified permissions
 * @param user - The session user
 * @param permissions - Array of permission strings to check
 * @returns boolean indicating if user has any of the permissions
 */
export function hasAnyPermission(user: SessionUser, permissions: string[]): boolean {
	return permissions.some(permission => hasPermission(user, permission));
}

/**
 * Higher-order function to protect API routes with specific permission requirements
 * @param permission - Permission string in format "resource.action"
 * @param handler - The API route handler to wrap
 * @returns A new handler that performs the permission check before execution
 */
export function withPermission(
	permission: string,
	handler: (
		req: Request,
		context: { user: SessionUser; params: any },
	) => Promise<NextResponse>,
) {
	return async (req: Request, context: { params: any }) => {
		const user = await getCurrentUser(req);

		if (!user) {
			return new NextResponse(JSON.stringify({ error: "Unauthorized" }), {
				status: 401,
				headers: { "Content-Type": "application/json" },
			});
		}

		if (!hasPermission(user as SessionUser, permission)) {
			return new NextResponse(
				JSON.stringify({ 
					error: "Forbidden - Insufficient permissions",
					required: permission 
				}),
				{
					status: 403,
					headers: { "Content-Type": "application/json" },
				},
			);
		}

		return handler(req, { ...context, user: user as SessionUser });
	};
}

/**
 * Higher-order function to protect API routes with specific role requirements
 * @param role - Role name required
 * @param handler - The API route handler to wrap
 * @returns A new handler that performs the role check before execution
 */
export function withRole(
	role: string,
	handler: (
		req: Request,
		context: { user: SessionUser; params: any },
	) => Promise<NextResponse>,
) {
	return async (req: Request, context: { params: any }) => {
		const user = await getCurrentUser(req);

		if (!user) {
			return new NextResponse(JSON.stringify({ error: "Unauthorized" }), {
				status: 401,
				headers: { "Content-Type": "application/json" },
			});
		}

		if (!hasRole(user as SessionUser, role)) {
			return new NextResponse(
				JSON.stringify({ 
					error: "Forbidden - Insufficient role",
					required: role 
				}),
				{
					status: 403,
					headers: { "Content-Type": "application/json" },
				},
			);
		}

		return handler(req, { ...context, user: user as SessionUser });
	};
}

/**
 * Server-side helper to get current user session from headers.
 * This function is designed for use in server actions and API routes.
 * Throws an error if the user is not authenticated.
 * @returns The authenticated user session
 * @throws Error if user is not authenticated
 */
export async function getCurrentUserSession() {
	try {
		// Get current user session from headers
		const headersList = await headers();
		const session = await auth.api.getSession({
			headers: headersList,
		});

		if (!session?.user) {
			throw new Error("Unauthorized: User session not found");
		}

		return session;
	} catch (error) {
		console.error("Failed to get current user session:", error);
		throw error;
	}
}

// ============================================================================
// Admin Permission Utilities (Migrated from auth-utils.ts)
// ============================================================================

/**
 * Check if user has admin permission for a specific action
 * @param userId - The user ID to check permissions for
 * @param permission - The permission to check (e.g., "users.read", "users.create")
 * @returns Promise<boolean> - Whether the user has the permission
 */
export async function checkAdminPermission(
	userId: string,
	permission: string,
): Promise<boolean> {
	try {
		const headersList = await headers();

		// Get user session first to check role
		const session = await auth.api.getSession({
			headers: headersList,
		});

		if (!session || session.user.id !== userId) {
			return false;
		}

		const user = session.user as SessionUser;

		// Use new RBAC system - SUPERADMIN has all permissions
		if (user.role === "SUPERADMIN") {
			return true;
		}

		// Use the new hasPermission function from RBAC system
		return hasPermission(user, permission);
	} catch (error) {
		console.error("Error checking admin permission:", error);
		return false;
	}
}

/**
 * Check if user has any of the specified admin permissions
 * @param userId - The user ID to check permissions for
 * @param permissions - Array of permissions to check
 * @returns Promise<boolean> - Whether the user has any of the permissions
 */
export async function checkAnyAdminPermission(
	userId: string,
	permissions: string[],
): Promise<boolean> {
	try {
		const headersList = await headers();

		// Get user session first
		const session = await auth.api.getSession({
			headers: headersList,
		});

		if (!session || session.user.id !== userId) {
			return false;
		}

		const user = session.user as SessionUser;

		// Use new RBAC system
		return hasAnyPermission(user, permissions);
	} catch (error) {
		console.error("Error checking any admin permission:", error);
		return false;
	}
}

/**
 * Check if user has all of the specified admin permissions
 * @param userId - The user ID to check permissions for
 * @param permissions - Array of permissions to check
 * @returns Promise<boolean> - Whether the user has all of the permissions
 */
export async function checkAllAdminPermissions(
	userId: string,
	permissions: string[],
): Promise<boolean> {
	try {
		const headersList = await headers();

		// Get user session first
		const session = await auth.api.getSession({
			headers: headersList,
		});

		if (!session || session.user.id !== userId) {
			return false;
		}

		const user = session.user as SessionUser;

		// Use new RBAC system
		return hasAllPermissions(user, permissions);
	} catch (error) {
		console.error("Error checking all admin permissions:", error);
		return false;
	}
}

/**
 * Check if user has a specific role
 * @param userId - The user ID to check
 * @param role - The role to check for
 * @returns Promise<boolean> - Whether the user has the role
 */
export async function checkUserRole(
	userId: string,
	role: string,
): Promise<boolean> {
	try {
		const headersList = await headers();

		const session = await auth.api.getSession({
			headers: headersList,
		});

		if (!session || session.user.id !== userId) {
			return false;
		}

		const user = session.user as SessionUser;

		// Use new RBAC system
		return hasRole(user, role);
	} catch (error) {
		console.error("Error checking user role:", error);
		return false;
	}
}

/**
 * Get user permissions
 * @param userId - The user ID to get permissions for
 * @returns Promise<string[]> - Array of permissions the user has
 */
export async function getUserPermissions(userId: string): Promise<string[]> {
	try {
		const headersList = await headers();

		const session = await auth.api.getSession({
			headers: headersList,
		});

		if (!session || session.user.id !== userId) {
			return [];
		}

		const user = session.user as SessionUser;

		// Return permissions from the user object (populated by RBAC system)
		return user.permissions || [];
	} catch (error) {
		console.error("Error getting user permissions:", error);
		return [];
	}
}

/**
 * Complete auth handler that checks session, permission and returns result
 * @param req - The request object
 * @param permission - The permission to check (e.g., "campaign.read")
 * @param options - Additional options for error messages
 * @returns Object with session and error (if any)
 */
export async function handleAuth(
	req: Request,
	permission?: string,
	options?: {
		unauthorizedMessage?: string;
		forbiddenMessage?: string;
	},
): Promise<{
	session: unknown | null;
	error: NextResponse | null;
}> {
	try {
		const session = await auth.api.getSession({ headers: req.headers });

		if (!session) {
			console.log("🔒 Auth failed: No session found");
			return {
				session: null,
				error: NextResponse.json(
					{ error: options?.unauthorizedMessage || "Unauthorized" },
					{ status: 401 },
				),
			};
		}

		console.log(
			`✅ Session found: ${session.user.email} (${session.user.role})`,
		);

		if (permission) {
			let hasPermission = false;

			// Super admin has all permissions
			if (session.user.role === "SUPERADMIN") {
				hasPermission = true;
				console.log(`🔑 Permission granted: SUPERADMIN has all permissions`);
			} else {
				// Parse permission and check
				const [statement, action] = permission.split(".");

				const result = await auth.api.userHasPermission({
					body: {
						userId: session.user.id,
						permissions: {
							[statement]: [action],
						},
					},
					headers: req.headers,
				});

				hasPermission = result.success;
				console.log(
					`🔑 Permission check for '${permission}': ${hasPermission ? "GRANTED" : "DENIED"}`,
				);
			}

			if (!hasPermission) {
				console.log(`❌ Access denied: User lacks '${permission}' permission`);
				return {
					session: null,
					error: NextResponse.json(
						{ error: options?.forbiddenMessage || "Forbidden" },
						{ status: 403 },
					),
				};
			}
		}

		console.log(`🎯 Auth successful: Proceeding with request`);
		return { session, error: null }; // Auth successful, return session
	} catch (error) {
		console.error("❌ Auth error:", error);
		return {
			session: null,
			error: NextResponse.json(
				{ error: "Internal Server Error" },
				{ status: 500 },
			),
		};
	}
}

/**
 * Simple helper to get session and check permission in one call
 * @param req - The request object
 * @param permission - The permission to check (e.g., "campaign.read")
 * @returns Object with session, user, and hasPermission status
 */
export async function getSessionWithPermission(
	req: Request,
	permission?: string,
) {
	try {
		const session = await auth.api.getSession({ headers: req.headers });

		if (!session) {
			return { session: null, user: null, hasPermission: false };
		}

		let hasPermission = true;

		if (permission) {
			// Super admin has all permissions
			if (session.user.role === "SUPERADMIN") {
				hasPermission = true;
			} else {
				// Parse permission and check
				const [statement, action] = permission.split(".");

				const result = await auth.api.userHasPermission({
					body: {
						userId: session.user.id,
						permissions: {
							[statement]: [action],
						},
					},
					headers: req.headers,
				});

				hasPermission = result.success;
			}
		}

		return {
			session,
			user: session.user,
			hasPermission,
		};
	} catch (error) {
		console.warn("Failed to get session with permission:", error);
		return { session: null, user: null, hasPermission: false };
	}
}

/**
 * Higher-order function to protect API routes and require an admin role.
 * @param handler - The API route handler to wrap
 * @returns A new handler that performs the admin check before execution
 */
export function withAdmin(
	handler: (
		req: Request,
		context: { user: SessionUser; params: any },
	) => Promise<NextResponse>,
) {
	return async (req: Request, context: { params: any }) => {
		const user = await getCurrentUser(req);

		if (!user) {
			return new NextResponse(JSON.stringify({ error: "Unauthorized" }), {
				status: 401,
				headers: { "Content-Type": "application/json" },
			});
		}

		// Note: Admin role checking will be updated with new RBAC system
		// For now, allowing ADMIN and SUPERADMIN roles
		if (user.role !== "ADMIN" && user.role !== "SUPERADMIN") {
			return new NextResponse(
				JSON.stringify({ error: "Forbidden - Admin access required" }),
				{
					status: 403,
					headers: { "Content-Type": "application/json" },
				},
			);
		}

		return handler(req, { ...context, user: user as unknown as SessionUser });
	};
}
