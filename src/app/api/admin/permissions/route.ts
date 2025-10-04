// API Routes for Permission Management
// GET /api/permissions - List permissions with pagination and filtering
// POST /api/permissions - Create new permission

import { type NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { authenticateRequest, checkPermission } from "@/lib/api-auth";
import { ENTITIES, ACTIONS } from "@/constants/permissions";
import { z } from "zod";
import { handleApiError } from "@/utils/error-handler";

// Validation schema for creating permissions
const createPermissionSchema = z.object({
	entity: z.string().min(1, "Entity is required"),
	field: z.string().min(1, "Field is required"),
	action: z.string().min(1, "Action is required"),
	maskType: z.string().nullable().optional(),
	roleId: z.string().min(1, "Role ID is required"),
});

// GET /api/permissions - List permissions with filtering and pagination
export async function GET(request: NextRequest) {
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

		// Parse query parameters
		const { searchParams } = new URL(request.url);
		const page = parseInt(searchParams.get("page") || "1", 10);
		const limit = Math.min(parseInt(searchParams.get("limit") || "10", 10), 100);
		const entity = searchParams.get("entity");
		const action = searchParams.get("action");
		const roleId = searchParams.get("roleId");
		const field = searchParams.get("field");
		const maskType = searchParams.get("maskType");

		// Build where clause
		const where: any = {};

		if (entity) {
			where.entity = entity;
		}

		if (action) {
			where.action = action;
		}

		if (roleId) {
			where.roleId = roleId;
		}

		if (field) {
			where.field = { contains: field, mode: "insensitive" };
		}

		if (maskType) {
			where.maskType = maskType;
		}

		// Get permissions with role information
		const [permissions, total] = await Promise.all([
			prisma.permission.findMany({
				where,
				skip: (page - 1) * limit,
				take: limit,
				orderBy: [{ entity: "asc" }, { action: "asc" }, { field: "asc" }],
				include: {
					role: {
						select: {
							id: true,
							name: true,
							description: true,
						},
					},
				},
			}),
			prisma.permission.count({ where }),
		]);

		return NextResponse.json({
			permissions,
			pagination: {
				page,
				limit,
				total,
				totalPages: Math.ceil(total / limit),
			},
		});
	} catch (error) {
		return handleApiError(error, request);
	}
}

// POST /api/permissions - Create new permission
export async function POST(request: NextRequest) {
	try {
		// Authenticate and authorize
		const authResult = await authenticateRequest();
		if (!authResult.success) {
			return authResult.response;
		}

		const permissionError = await checkPermission(
			authResult.user.id,
			ENTITIES.PERMISSION,
			ACTIONS.CREATE,
		);
		if (permissionError) {
			return permissionError;
		}

		// Parse and validate request body
		const body = await request.json();
		const validatedData = createPermissionSchema.parse(body);

		// Check if role exists
		const role = await prisma.role.findUnique({
			where: { id: validatedData.roleId },
		});

		if (!role) {
			return NextResponse.json({ error: "Role not found" }, { status: 404 });
		}

		// Check if permission already exists for this role/entity/field/action combination
		const existingPermission = await prisma.permission.findFirst({
			where: {
				roleId: validatedData.roleId,
				entity: validatedData.entity,
				field: validatedData.field,
				action: validatedData.action,
			},
		});

		if (existingPermission) {
			return NextResponse.json(
				{ error: "Permission already exists for this combination" },
				{ status: 409 },
			);
		}

		// Create permission
		const permission = await prisma.permission.create({
			data: validatedData,
			include: {
				role: {
					select: {
						id: true,
						name: true,
						description: true,
					},
				},
			},
		});

		return NextResponse.json(permission, { status: 201 });
	} catch (error) {
		return handleApiError(error, request);
	}
}
