import { type NextRequest, NextResponse } from "next/server";
import { withAuth } from "@/lib/api-auth";
import { ENTITIES, ACTIONS } from "@/constants/permissions";
import { getRoles, createRole, getRoleStats } from "@/features/roles/services";
import { createRoleSchema } from "@/features/roles/schemas";
import { handleApiError } from "@/utils/error-handler";

// GET /api/roles - list roles with optional filtering
export const GET = withAuth(
	async (_user, ...args: unknown[]) => {
		const request = args[0] as NextRequest;
		try {
			const searchParams = new URL(request.url).searchParams;
			const search = searchParams.get("search") || undefined;
			const isActiveParam = searchParams.get("isActive");
			const isSystemParam = searchParams.get("isSystem");
			const page = parseInt(searchParams.get("page") || "1", 10);
			const limit = parseInt(searchParams.get("limit") || "10", 10);

			const rolesResponse = await getRoles({
				search,
				isActive:
					isActiveParam === null
						? undefined
						: isActiveParam === "true"
							? true
							: isActiveParam === "false"
								? false
								: undefined,
				isSystem:
					isSystemParam === null
						? undefined
						: isSystemParam === "true"
							? true
							: isSystemParam === "false"
								? false
								: undefined,
			});

			if (!rolesResponse.success) {
				return NextResponse.json(rolesResponse, { status: 500 });
			}

			const roles = rolesResponse.data;

			// Calculate pagination
			const total = roles.length;
			const totalPages = Math.ceil(total / limit);
			const startIndex = (page - 1) * limit;
			const endIndex = startIndex + limit;
			const paginatedRoles = roles.slice(startIndex, endIndex);

			const response = {
				data: paginatedRoles,
				pagination: {
					page,
					limit,
					total,
					totalPages,
					hasNext: page < totalPages,
					hasPrev: page > 1,
				},
			};

			return NextResponse.json(response);
		} catch (error) {
			return handleApiError(error, request);
		}
	},
	{ entity: ENTITIES.ROLE, action: ACTIONS.READ },
);

// POST /api/roles - create new role
export const POST = withAuth(
	async (_user, ...args: unknown[]) => {
		const request = args[0] as NextRequest;
		try {
			const body = await request.json();
			const validatedData = createRoleSchema.parse(body);
			const role = await createRole(validatedData);
			return NextResponse.json(role, { status: 201 });
		} catch (error) {
			return handleApiError(error, request);
		}
	},
	{ entity: ENTITIES.ROLE, action: ACTIONS.CREATE },
);

// HEAD /api/roles - check if roles are available
export const HEAD = withAuth(
	async () => {
		try {
			// Quick availability check: roles count via stats
			const stats = await getRoleStats();
			return new NextResponse(undefined, { status: stats ? 200 : 204 });
		} catch {
			return new NextResponse(undefined, { status: 500 });
		}
	},
	{ entity: ENTITIES.ROLE, action: ACTIONS.READ },
);
