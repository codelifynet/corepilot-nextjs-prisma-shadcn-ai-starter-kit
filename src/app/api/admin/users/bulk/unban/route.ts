import { NextResponse, type NextRequest } from "next/server";
import { z } from "zod";
import { authenticateRequest } from "@/lib/api-auth";
import { bulkUnbanUsers } from "@/features/users/services";
import { checkAdminPermission } from "@/lib/auth";

// POST /api/admin/users/bulk/unban - Bulk unban users
export async function POST(request: NextRequest) {
	try {
		// Authenticate request
		const authResult = await authenticateRequest();
		if (!authResult.success) {
			return authResult.response;
		}

		// Check admin permission
		const hasPermission = await checkAdminPermission(
			authResult.user.id,
			"users.bulk_unban",
		);
		if (!hasPermission) {
			return NextResponse.json({ error: "Forbidden" }, { status: 403 });
		}

		const body = await request.json();
		const { userIds } = z
			.object({
				userIds: z.array(z.string()),
			})
			.parse(body);

		const result = await bulkUnbanUsers(userIds);
		return NextResponse.json(result);
	} catch (error) {
		if (error instanceof z.ZodError) {
			return NextResponse.json(
				{ error: "Validation failed", details: error.issues },
				{ status: 400 },
			);
		}

		console.error("Error bulk unbanning users:", error);
		return NextResponse.json(
			{ error: "Internal server error" },
			{ status: 500 },
		);
	}
}
