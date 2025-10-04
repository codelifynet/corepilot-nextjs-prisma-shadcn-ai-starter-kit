import { NextResponse, type NextRequest } from "next/server";
import { createSystemAlert, getSystemAlerts } from "@/features/overview/dashboard/services";
import { z } from "zod";

const createAlertSchema = z.object({
	title: z.string().min(1, "Title is required"),
	type: z.enum(["CPU", "MEMORY", "DISK", "NETWORK", "SYSTEM"]),
	message: z.string().min(1, "Message is required"),
	level: z.enum(["INFO", "WARNING", "CRITICAL"]),
	threshold: z.number().optional(),
	value: z.number().optional(),
	metadata: z.record(z.string(), z.unknown()).optional(),
});

/**
 * GET /api/dashboard/alerts
 * Get all alerts
 */
export async function GET(request: NextRequest) {
	try {
		const { searchParams } = new URL(request.url);
		const status = searchParams.get("status") as
			| "ACTIVE"
			| "RESOLVED"
			| "ACKNOWLEDGED"
			| null;
		const level = searchParams.get("level") as
			| "INFO"
			| "WARNING"
			| "CRITICAL"
			| null;

		const alertsResult = await getSystemAlerts({
			...(status && { status }),
			...(level && { level }),
		});

		return NextResponse.json({
			success: true,
			data: alertsResult.alerts, // Sadece alerts array'ini döndürüyoruz
			total: alertsResult.total,
			page: alertsResult.page,
			totalPages: alertsResult.totalPages,
			timestamp: new Date(),
		});
	} catch (error) {
		console.error("Get alerts API error:", error);
		return NextResponse.json(
			{
				success: false,
				error: error instanceof Error ? error.message : "Failed to get alerts",
			},
			{ status: 500 },
		);
	}
}

/**
 * POST /api/dashboard/alerts
 * Create new alert
 */
export async function POST(request: NextRequest) {
	try {
		const body = await request.json();
		const validatedData = createAlertSchema.parse(body);

		const alert = await createSystemAlert(validatedData);

		return NextResponse.json(
			{
				success: true,
				data: alert,
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

		console.error("Create alert API error:", error);
		return NextResponse.json(
			{
				success: false,
				error:
					error instanceof Error ? error.message : "Failed to create alert",
			},
			{ status: 500 },
		);
	}
}
