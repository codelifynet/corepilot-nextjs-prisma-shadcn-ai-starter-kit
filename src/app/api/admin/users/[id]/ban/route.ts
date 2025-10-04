import { NextResponse, type NextRequest } from "next/server";
import { z } from "zod";
import { authenticateRequest } from "@/lib/api-auth";
import { banUser } from "@/features/users/services";
import { checkAdminPermission } from "@/lib/auth";

// POST /api/admin/users/[id]/ban - Ban user
export async function POST(
	request: NextRequest,
	{ params }: { params: Promise<{ id: string }> },
) {
	try {
		// Authenticate request
		const authResult = await authenticateRequest();
		if (!authResult.success) {
			return authResult.response;
		}

		// Check admin permission
		const hasPermission = await checkAdminPermission(
			authResult.user.id,
			"users.ban",
		);
		if (!hasPermission) {
			return NextResponse.json({ error: "Forbidden" }, { status: 403 });
		}

		const body = await request.json();
		const { reason } = z
			.object({
				reason: z.string().optional(),
			})
			.parse(body);

		const { id } = await params;

		const result = await banUser({
			userId: id,
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

		console.error("Error banning user:", error);
		return NextResponse.json(
			{ error: "Internal server error" },
			{ status: 500 },
		);
	}
}
