import { NextResponse, type NextRequest } from "next/server";
import { createDashboardWidget, getDashboardWidgets } from "@/features/overview/dashboard/services";
import { z } from "zod";

const createWidgetSchema = z.object({
	dashboardId: z.string().min(1, "Dashboard ID is required"),
	title: z.string().min(1, "Title is required"),
	description: z.string().optional(),
	type: z.string().min(1, "Type is required"),
	size: z.string().min(1, "Size is required"),
	position: z.object({
		x: z.number(),
		y: z.number(),
		w: z.number(),
		h: z.number(),
	}),
	dataSource: z.string().min(1, "Data source is required"),
	config: z.record(z.string(), z.unknown()),
	isActive: z.boolean().optional(),
});

/**
 * GET /api/dashboard/widgets
 * Get widgets for a dashboard
 */
export async function GET(request: NextRequest) {
	try {
		const { searchParams } = new URL(request.url);
		const dashboardId = searchParams.get("dashboardId");

		if (!dashboardId) {
			return NextResponse.json(
				{ success: false, error: "Dashboard ID is required" },
				{ status: 400 },
			);
		}

		const widgets = await getDashboardWidgets(dashboardId);

		return NextResponse.json({
			success: true,
			data: widgets,
			timestamp: new Date(),
		});
	} catch (error) {
		console.error("Get widgets API error:", error);
		return NextResponse.json(
			{
				success: false,
				error: error instanceof Error ? error.message : "Failed to get widgets",
			},
			{ status: 500 },
		);
	}
}

/**
 * POST /api/dashboard/widgets
 * Create new widget
 */
export async function POST(request: NextRequest) {
	try {
		const body = await request.json();
		const validatedData = createWidgetSchema.parse(body);

		const widget = await createDashboardWidget(validatedData);

		return NextResponse.json(
			{
				success: true,
				data: widget,
				timestamp: new Date(),
			},
			{ status: 201 },
		);
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

		console.error("Create widget API error:", error);
		return NextResponse.json(
			{
				success: false,
				error:
					error instanceof Error ? error.message : "Failed to create widget",
			},
			{ status: 500 },
		);
	}
}
