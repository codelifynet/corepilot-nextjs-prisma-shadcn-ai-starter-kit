import { NextResponse, type NextRequest } from "next/server";
import { authenticateRequest } from "@/lib/api-auth";
import { impersonateUser } from "@/features/users/services";
import { checkAdminPermission, type SessionUser } from "@/lib/auth";

// POST /api/admin/users/[id]/impersonate - Impersonate user
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
			"users.impersonate",
		);
		if (!hasPermission) {
			return NextResponse.json({ error: "Forbidden" }, { status: 403 });
		}

		const { id } = await params;

		const result = await impersonateUser((authResult.user as SessionUser).id, id);

		return NextResponse.json(result);
	} catch (error) {
		console.error("Error impersonating user:", error);
		return NextResponse.json(
			{ error: "Internal server error" },
			{ status: 500 },
		);
	}
}
