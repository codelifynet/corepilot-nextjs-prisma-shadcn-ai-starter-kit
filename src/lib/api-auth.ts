import { NextResponse } from "next/server";
import { headers } from "next/headers";
import { auth } from "@/lib/auth";
import { getUserPermissionContext, authorizeApiAccess } from "@/lib/rbac-auth";
import {
	ENTITIES,
	ACTIONS,
	type EntityType,
	type ActionType,
} from "@/constants/permissions";

export interface AuthenticatedUser {
	id: string;
	email: string;
	name: string;
	role?: string;
	image?: string;
	permissions?: string[];
}

export interface AuthResult {
	success: true;
	user: AuthenticatedUser;
}

export interface AuthError {
	success: false;
	response: NextResponse;
}

/**
 * API route'larında authentication kontrolü yapar
 * @returns AuthResult | AuthError
 */
export async function authenticateRequest(): Promise<AuthResult | AuthError> {
	try {
		const session = await auth.api.getSession({
			headers: await headers(),
		});

		console.log("session", session);

		if (!session?.user?.id) {
			return {
				success: false,
				response: NextResponse.json(
					{ error: "Unauthorized", message: "Authentication required" },
					{ status: 401 },
				),
			};
		}

		return {
			success: true,
			user: {
				id: session.user.id,
				email: session.user.email,
				name: session.user.name,
				// Role field from Better Auth session
				role: (session.user as { role?: string }).role || "USER",
				image: session.user.image || undefined,
			},
		};
	} catch (error) {
		console.error("Authentication error:", error);
		return {
			success: false,
			response: NextResponse.json(
				{
					error: "Authentication failed",
					message: "Internal authentication error",
				},
				{ status: 500 },
			),
		};
	}
}

/**
 * RBAC permission kontrolü yapar
 * @param userId - User ID
 * @param entity - Entity type
 * @param action - Action type
 * @returns NextResponse | null
 */
export async function checkPermission(
	userId: string,
	entity: EntityType,
	action: ActionType,
): Promise<NextResponse | null> {
	try {
		const permissionContext = await getUserPermissionContext(userId);
		const hasAccess = await authorizeApiAccess(
			permissionContext,
			entity,
			action,
		);

		if (!hasAccess) {
			return NextResponse.json(
				{ error: "Forbidden", message: "Insufficient permissions" },
				{ status: 403 },
			);
		}
		return null;
	} catch (error) {
		console.error("Permission check error:", error);
		return NextResponse.json(
			{ error: "Permission check failed" },
			{ status: 500 },
		);
	}
}

/**
 * Admin yetkisi kontrol eder (RBAC ile)
 * @param userId - User ID
 * @returns NextResponse | null
 */
export async function requireAdmin(
	userId: string,
): Promise<NextResponse | null> {
	return await checkPermission(userId, ENTITIES.SYSTEM, ACTIONS.MANAGE);
}

/**
 * API route'u için complete auth wrapper (RBAC ile)
 * @param handler - Authenticated handler function
 * @param options - Auth options
 */
export function withAuth(
	handler: (
		user: AuthenticatedUser,
		...args: unknown[]
	) => Promise<NextResponse>,
	options?: {
		requireAdmin?: boolean;
		entity?: EntityType;
		action?: ActionType;
	},
) {
	return async (...args: unknown[]) => {
		const authResult = await authenticateRequest();

		if (!authResult.success) {
			return authResult.response;
		}

		// RBAC permission kontrolü
		if (options?.requireAdmin) {
			const adminCheck = await requireAdmin(authResult.user.id);
			if (adminCheck) return adminCheck;
		}

		if (options?.entity && options?.action) {
			const permissionCheck = await checkPermission(
				authResult.user.id,
				options.entity,
				options.action,
			);
			if (permissionCheck) return permissionCheck;
		}

		try {
			return await handler(authResult.user, ...args);
		} catch (error) {
			console.error("Handler error:", error);
			return NextResponse.json(
				{ error: "Internal server error" },
				{ status: 500 },
			);
		}
	};
}
