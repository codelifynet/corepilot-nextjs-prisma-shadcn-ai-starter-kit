import { NextResponse, type NextRequest } from "next/server";
import { z } from "zod";
import { authenticateRequest } from "@/lib/api-auth";
import { updateUser } from "@/features/users/services";
import { checkAdminPermission } from "@/lib/auth";

// PUT /api/admin/users/[id]/role - Set user role
export async function PUT(
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
			"users.role",
		);
		if (!hasPermission) {
			return NextResponse.json({ error: "Forbidden" }, { status: 403 });
		}

		const body = await request.json();
		const { roleIds } = z
			.object({
				roleIds: z.array(z.string()),
			})
			.parse(body);

		const { id } = await params;

		await updateUser(id, { roleIds });
		const result = { success: true };

		return NextResponse.json(result);
	} catch (error) {
		if (error instanceof z.ZodError) {
			return NextResponse.json(
				{ error: "Validation failed", details: error.issues },
				{ status: 400 },
			);
		}

		console.error("Error setting user role:", error);
		return NextResponse.json(
			{ error: "Internal server error" },
			{ status: 500 },
		);
	}
}
