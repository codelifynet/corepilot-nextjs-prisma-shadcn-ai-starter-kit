import { NextResponse, type NextRequest } from "next/server";
import { authenticateRequest } from "@/lib/api-auth";
import { exportUsers } from "@/features/users/services";
import { checkAdminPermission } from "@/lib/auth";
import { handleApiError } from "@/utils/error-handler";

// GET /api/admin/users/export - Export users data
export async function GET(request: NextRequest) {
	try {
		// Authenticate request
		const authResult = await authenticateRequest();
		if (!authResult.success) {
			return authResult.response;
		}

		// Check admin permission
		const hasPermission = await checkAdminPermission(
			authResult.user.id,
			"users.export",
		);
		if (!hasPermission) {
			return NextResponse.json({ error: "Forbidden" }, { status: 403 });
		}

		const { searchParams } = new URL(request.url);
		const format = searchParams.get("format") || "csv";

		const result = await exportUsers({ format: format as "csv" | "json" });

		// Set appropriate headers for file download
		const headers: Record<string, string> = {
			"Content-Disposition": `attachment; filename="users_export.${format}"`,
		};

		if (format === "csv") {
			headers["Content-Type"] = "text/csv";
		} else {
			headers["Content-Type"] = "application/json";
		}

		return new NextResponse(result, { headers });
	} catch (error) {
		return handleApiError(error, request);
	}
}
