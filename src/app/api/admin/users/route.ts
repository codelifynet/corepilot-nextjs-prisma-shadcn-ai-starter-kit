import { NextResponse, type NextRequest } from "next/server";
import { z } from "zod";
import { authenticateRequest, requireAdmin } from "@/lib/api-auth";
import {
	listUsers,
	createUser,
	bulkDeleteUsers,
} from "@/features/users/services";
import { createUserSchema } from "@/features/users/schemas";
import { handleApiError } from "@/utils/error-handler";

// GET /api/admin/users - List users with filtering and pagination
export async function GET(request: NextRequest) {
	try {
		// Authenticate and check admin permission
		const authResult = await authenticateRequest();
		if (!authResult.success) {
			return authResult.response;
		}

		const adminError = await requireAdmin(authResult.user.id);
		if (adminError) {
			return adminError;
		}

		const { searchParams } = new URL(request.url);

		console.log("API request search params:", searchParams);

		const options = {
			page: parseInt(searchParams.get("page") || "1"),
			limit: parseInt(searchParams.get("limit") || "10"),
			sort: (searchParams.get("sortBy") || "createdAt") as any,
			order: (searchParams.get("sortOrder") as "asc" | "desc") || "desc",
			filters: {
				search: searchParams.get("search") || undefined,
				role: (searchParams.get("role") as any) || undefined,
				banned:
					searchParams.get("status") === "banned"
						? true
						: searchParams.get("status") === "active"
							? false
							: undefined,
			},
		};

		console.log("API options:", options);

		const result = await listUsers(options);

		console.log("User list:", result);

		return NextResponse.json(result);
	} catch (error) {
		return handleApiError(error, request);
	}
}

// POST /api/admin/users - Create a new user
export async function POST(request: NextRequest) {
	try {
		// Authenticate and check admin permission
		const authResult = await authenticateRequest();
		if (!authResult.success) {
			return authResult.response;
		}

		const adminError = await requireAdmin(authResult.user.id);
		if (adminError) {
			return adminError;
		}

		const body = await request.json();
		const validatedData = createUserSchema.parse(body);

		const user = await createUser(validatedData);
		return NextResponse.json(user, { status: 201 });
	} catch (error) {
		return handleApiError(error, request);
	}
}

// DELETE /api/admin/users - Bulk delete users
export async function DELETE(request: NextRequest) {
	try {
		// Authenticate and check admin permission
		const authResult = await authenticateRequest();
		if (!authResult.success) {
			return authResult.response;
		}

		const adminError = await requireAdmin(authResult.user.id);
		if (adminError) {
			return adminError;
		}

		const body = await request.json();
		const { userIds } = z
			.object({
				userIds: z.array(z.string()),
			})
			.parse(body);

		const result = await bulkDeleteUsers(userIds);
		return NextResponse.json(result);
	} catch (error) {
		return handleApiError(error, request);
	}
}
