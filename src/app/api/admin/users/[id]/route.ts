import { NextResponse, type NextRequest } from "next/server";
import { authenticateRequest, requireAdmin } from "@/lib/api-auth";
import {
	getUserById,
	updateUser,
	removeUser,
} from "@/features/users/services";
import { updateUserSchema } from "@/features/users/schemas";
import { handleApiError } from "@/utils/error-handler";

// GET /api/admin/users/[id] - Get user by ID
export async function GET(
	request: NextRequest,
	{ params }: { params: Promise<{ id: string }> },
) {
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

		const { id } = await params;

		const user = await getUserById(id);

		if (!user) {
			return NextResponse.json({ error: "User not found" }, { status: 404 });
		}

		return NextResponse.json(user);
	} catch (error) {
		return handleApiError(error, request);
	}
}

// PUT /api/admin/users/[id] - Update user
export async function PUT(
	request: NextRequest,
	{ params }: { params: Promise<{ id: string }> },
) {
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
		const data = updateUserSchema.parse(body);

		const { id } = await params;

		const user = await updateUser(id, data);

		return NextResponse.json(user);
	} catch (error) {
		return handleApiError(error, request);
	}
}

// DELETE /api/admin/users/[id] - Delete user
export async function DELETE(
	request: NextRequest,
	{ params }: { params: Promise<{ id: string }> },
) {
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

		const { id } = await params;

		await removeUser(id);
		return NextResponse.json({ success: true });
	} catch (error) {
		return handleApiError(error, request);
	}
}
