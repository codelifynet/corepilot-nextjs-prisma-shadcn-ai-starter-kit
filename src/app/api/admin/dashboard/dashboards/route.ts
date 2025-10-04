import { NextResponse, type NextRequest } from "next/server";
import { getDashboards, createDashboard } from "@/features/overview/dashboard/services";
import { z } from "zod";

const createDashboardSchema = z.object({
	title: z.string().min(1, "Title is required"),
	description: z.string().optional(),
	slug: z.string().min(1, "Slug is required"),
	layout: z.record(z.string(), z.unknown()).optional(),
	isDefault: z.boolean().optional(),
	isPublic: z.boolean().optional(),
	userId: z.string().optional(),
	refreshInterval: z.number().min(5).max(3600).optional(),
	theme: z.enum(["light", "dark", "auto"]).optional(),
});

/**
 * GET /api/dashboard/dashboards
 * Get all dashboards
 */
export async function GET(request: NextRequest) {
	try {
		const { searchParams } = new URL(request.url);
		const userId = searchParams.get("userId") || undefined;

		const dashboards = await getDashboards(userId);

		return NextResponse.json({
			success: true,
			data: dashboards,
			timestamp: new Date(),
		});
	} catch (error) {
		console.error("Get dashboards API error:", error);
		return NextResponse.json(
			{
				success: false,
				error:
					error instanceof Error ? error.message : "Failed to get dashboards",
			},
			{ status: 500 },
		);
	}
}

/**
 * POST /api/dashboard/dashboards
 * Create new dashboard
 */
export async function POST(request: NextRequest) {
	try {
		const body = await request.json();
		const validatedData = createDashboardSchema.parse(body);

		const dashboard = await createDashboard(validatedData);

		return NextResponse.json(
			{
				success: true,
				data: dashboard,
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

		console.error("Create dashboard API error:", error);
		return NextResponse.json(
			{
				success: false,
				error:
					error instanceof Error ? error.message : "Failed to create dashboard",
			},
			{ status: 500 },
		);
	}
}
