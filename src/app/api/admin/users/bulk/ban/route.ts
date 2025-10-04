import { NextResponse, type NextRequest } from "next/server";
import { z } from "zod";
import { auth, checkAdminPermission } from "@/lib/auth";
import { bulkBanUsers } from "@/features/users/services";

// POST /api/admin/users/bulk/ban - Bulk ban users
export async function POST(request: NextRequest) {
	try {
		const session = await auth.api.getSession({
			headers: request.headers,
		});

		if (!session) {
			return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
		}

		// Check admin permission
		const hasPermission = await checkAdminPermission(
			session.user.id,
			"users.ban",
		);
		if (!hasPermission) {
			return NextResponse.json({ error: "Forbidden" }, { status: 403 });
		}

		const body = await request.json();
		const { userIds, reason } = z
			.object({
				userIds: z.array(z.string()),
				reason: z.string().optional(),
			})
			.parse(body);

		const result = await bulkBanUsers({
			userIds,
			reason: reason || "Banned by administrator",
		});

		return NextResponse.json(result);
	} catch (error) {
		if (error instanceof z.ZodError) {
			return NextResponse.json(
				{ error: "Validation failed", details: error.issues },
				{ status: 400 },
			);
		}

		console.error("Error bulk banning users:", error);
		return NextResponse.json(
			{ error: "Internal server error" },
			{ status: 500 },
		);
	}
}
