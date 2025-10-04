import { type NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { authenticateRequest, checkPermission } from "@/lib/api-auth";
import { ENTITIES, ACTIONS } from "@/constants/permissions";
import { z } from "zod";
import { handleApiError } from "@/utils/error-handler";

// Validation schema for updating permissions
const updatePermissionSchema = z.object({
	entity: z.string().min(1, "Entity is required").optional(),
	field: z.string().min(1, "Field is required").optional(),
	action: z.string().min(1, "Action is required").optional(),
	maskType: z.string().nullable().optional(),
	roleId: z.string().min(1, "Role ID is required").optional(),
});

interface RouteParams {
	params: Promise<{
		id: string;
	}>;
}

// GET /api/permissions/[id] - Get specific permission
export async function GET(request: NextRequest, { params }: RouteParams) {
	try {
		// Authenticate and authorize
		const authResult = await authenticateRequest();
		if (!authResult.success) {
			return authResult.response;
		}

		const permissionError = await checkPermission(
			authResult.user.id,
			ENTITIES.PERMISSION,
			ACTIONS.READ,
		);
		if (permissionError) {
			return permissionError;
		}

		// Await params
		const { id } = await params;

		// Get permission with role information
		const permission = await prisma.permission.findUnique({
			where: { id },
			include: {
				role: {
					select: {
						id: true,
						name: true,
						description: true,
						isActive: true,
					},
				},
			},
		});

		if (!permission) {
			return NextResponse.json(
				{ error: "Permission not found" },
				{ status: 404 },
			);
		}

		return NextResponse.json({ data: permission });
	} catch (error) {
		return handleApiError(error, request);
	}
}

// PUT /api/permissions/[id] - Update permission
export async function PUT(request: NextRequest, { params }: RouteParams) {
	try {
		// Authenticate and authorize
		const authResult = await authenticateRequest();
		if (!authResult.success) {
			return authResult.response;
		}

		const permissionError = await checkPermission(
			authResult.user.id,
			ENTITIES.PERMISSION,
			ACTIONS.UPDATE,
		);
		if (permissionError) {
			return permissionError;
		}

		// Await params
		const { id } = await params;

		// Check if permission exists
		const existingPermission = await prisma.permission.findUnique({
			where: { id },
		});

		if (!existingPermission) {
			return NextResponse.json(
				{ error: "Permission not found" },
				{ status: 404 },
			);
		}

		// Parse and validate request body
		const body = await request.json();
		const validatedData = updatePermissionSchema.parse(body);

		// Check if new role exists (if roleId is being updated)
		if (
			validatedData.roleId &&
			validatedData.roleId !== existingPermission.roleId
		) {
			const role = await prisma.role.findUnique({
				where: { id: validatedData.roleId },
			});

			if (!role) {
				return NextResponse.json({ error: "Role not found" }, { status: 404 });
			}
		}

		// Check for conflicts with existing permissions
		const conflictWhere = {
			id: { not: id },
			roleId: validatedData.roleId || existingPermission.roleId,
			entity: validatedData.entity || existingPermission.entity,
			field: validatedData.field || existingPermission.field,
			action: validatedData.action || existingPermission.action,
		};

		const conflictingPermission = await prisma.permission.findFirst({
			where: conflictWhere,
		});

		if (conflictingPermission) {
			return NextResponse.json(
				{ error: "Permission already exists for this combination" },
				{ status: 409 },
			);
		}

		// Update permission
		const updatedPermission = await prisma.permission.update({
			where: { id },
			data: validatedData,
			include: {
				role: {
					select: {
						id: true,
						name: true,
						description: true,
						isActive: true,
					},
				},
			},
		});

		return NextResponse.json({ data: updatedPermission });
	} catch (error) {
		return handleApiError(error, request);
	}
}

// DELETE /api/permissions/[id] - Delete permission
export async function DELETE(request: NextRequest, { params }: RouteParams) {
	try {
		// Authenticate and authorize
		const authResult = await authenticateRequest();
		if (!authResult.success) {
			return authResult.response;
		}

		const permissionError = await checkPermission(
			authResult.user.id,
			ENTITIES.PERMISSION,
			ACTIONS.DELETE,
		);
		if (permissionError) {
			return permissionError;
		}

		// Await params
		const { id } = await params;

		// Check if permission exists
		const existingPermission = await prisma.permission.findUnique({
			where: { id },
		});

		if (!existingPermission) {
			return NextResponse.json(
				{ error: "Permission not found" },
				{ status: 404 },
			);
		}

		// Delete permission
		await prisma.permission.delete({
			where: { id },
		});

		return NextResponse.json(
			{ message: "Permission deleted successfully" },
			{ status: 200 },
		);
	} catch (error) {
		return handleApiError(error, request);
	}
}
