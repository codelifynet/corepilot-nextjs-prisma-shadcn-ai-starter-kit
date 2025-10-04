import { NextResponse, type NextRequest } from "next/server";
import { authenticateRequest } from "@/lib/api-auth";
import { unbanUser } from "@/features/users/services";
import { checkAdminPermission } from "@/lib/auth";

// POST /api/admin/users/[id]/unban - Unban user
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
			"users.unban",
		);
		if (!hasPermission) {
			return NextResponse.json({ error: "Forbidden" }, { status: 403 });
		}

		const { id } = await params;

		const result = await unbanUser(id);
		return NextResponse.json(result);
	} catch (error) {
		console.error("Error unbanning user:", error);
		return NextResponse.json(
			{ error: "Internal server error" },
			{ status: 500 },
		);
	}
}
