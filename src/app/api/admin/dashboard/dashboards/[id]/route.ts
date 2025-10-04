import { NextResponse, type NextRequest } from "next/server";
import { getDashboardById, updateDashboard, deleteDashboard } from "@/features/overview/dashboard/services";
import { z } from "zod";

const updateDashboardSchema = z.object({
	title: z.string().min(1, "Title is required").optional(),
	description: z.string().optional(),
	slug: z.string().min(1, "Slug is required").optional(),
	layout: z.record(z.string(), z.unknown()).optional(),
	isDefault: z.boolean().optional(),
	isPublic: z.boolean().optional(),
	refreshInterval: z.number().min(5).max(3600).optional(),
	theme: z.enum(["light", "dark", "auto"]).optional(),
});

interface RouteParams {
	params: Promise<{ id: string }>;
}

/**
 * GET /api/dashboard/dashboards/[id]
 * Get dashboard by ID
 */
export async function GET(_request: NextRequest, { params }: RouteParams) {
	try {
		const { id } = await params;

		if (!id) {
			return NextResponse.json(
				{ success: false, error: "Dashboard ID is required" },
				{ status: 400 },
			);
		}

		const dashboard = await getDashboardById(id);

		return NextResponse.json({
			success: true,
			data: dashboard,
			timestamp: new Date(),
		});
	} catch (error) {
		console.error("Get dashboard API error:", error);
		return NextResponse.json(
			{
				success: false,
				error:
					error instanceof Error ? error.message : "Failed to get dashboard",
			},
			{ status: 500 },
		);
	}
}

/**
 * PUT /api/dashboard/dashboards/[id]
 * Update dashboard by ID
 */
export async function PUT(request: NextRequest, { params }: RouteParams) {
	try {
		const { id } = await params;

		if (!id) {
			return NextResponse.json(
				{ success: false, error: "Dashboard ID is required" },
				{ status: 400 },
			);
		}

		const body = await request.json();
		const validatedData = updateDashboardSchema.parse(body);

		const dashboard = await updateDashboard(id, validatedData);

		return NextResponse.json({
			success: true,
			data: dashboard,
			timestamp: new Date(),
		});
	} catch (error) {
		if (error instanceof z.ZodError) {
			return NextResponse.json(
				{
					success: false,
					error: "Validation error",
					details: error.issues,
				},
				{ status: 400 },
			);
		}

		console.error("Update dashboard API error:", error);
		return NextResponse.json(
			{
				success: false,
				error:
					error instanceof Error ? error.message : "Failed to update dashboard",
			},
			{ status: 500 },
		);
	}
}

/**
 * DELETE /api/dashboard/dashboards/[id]
 * Delete dashboard by ID
 */
export async function DELETE(_request: NextRequest, { params }: RouteParams) {
	try {
		const { id } = await params;

		if (!id) {
			return NextResponse.json(
				{ success: false, error: "Dashboard ID is required" },
				{ status: 400 },
			);
		}

		await deleteDashboard(id);

		return NextResponse.json({
			success: true,
			message: "Dashboard deleted successfully",
			timestamp: new Date(),
		});
	} catch (error) {
		console.error("Delete dashboard API error:", error);
		return NextResponse.json(
			{
				success: false,
				error:
					error instanceof Error ? error.message : "Failed to delete dashboard",
			},
			{ status: 500 },
		);
	}
}
