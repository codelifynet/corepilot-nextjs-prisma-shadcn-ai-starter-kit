import { NextResponse, type NextRequest } from "next/server";
import { authenticateRequest, requireAdmin } from "@/lib/api-auth";
import { getUserStats } from "@/features/users/services";
import { handleApiError } from "@/utils/error-handler";

// GET /api/admin/users/stats - Get user statistics
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

		const stats = await getUserStats();
		return NextResponse.json(stats);
	} catch (error) {
		return handleApiError(error, request);
	}
}
