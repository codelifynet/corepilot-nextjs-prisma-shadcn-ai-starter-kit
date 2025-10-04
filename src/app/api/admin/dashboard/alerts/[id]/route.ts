import { NextResponse, type NextRequest } from "next/server";
import { acknowledgeAlert, deleteSystemAlert, getSystemAlertById } from "@/features/overview/dashboard/services";

interface RouteParams {
	params: Promise<{ id: string }>;
}

/**
 * GET /api/dashboard/alerts/[id]
 * Get alert by ID
 */
export async function GET(_request: NextRequest, { params }: RouteParams) {
	try {
		const { id } = await params;

		if (!id) {
			return NextResponse.json(
				{ success: false, error: "Alert ID is required" },
				{ status: 400 },
			);
		}

		const alert = await getSystemAlertById(id);

		if (!alert) {
			return NextResponse.json(
				{ success: false, error: "Alert not found" },
				{ status: 404 },
			);
		}

		return NextResponse.json({
			success: true,
			data: alert,
			timestamp: new Date(),
		});
	} catch (error) {
		console.error("Get alert API error:", error);
		return NextResponse.json(
			{
				success: false,
				error: error instanceof Error ? error.message : "Failed to get alert",
			},
			{ status: 500 },
		);
	}
}

/**
 * PATCH /api/dashboard/alerts/[id]/acknowledge
 * Acknowledge alert
 */
export async function PATCH(request: NextRequest, { params }: RouteParams) {
	try {
		const { id } = await params;

		if (!id) {
			return NextResponse.json(
				{ success: false, error: "Alert ID is required" },
				{ status: 400 },
			);
		}

		const body = await request.json();
		const { acknowledgedBy } = body;

		if (!acknowledgedBy) {
			return NextResponse.json(
				{ success: false, error: "acknowledgedBy is required" },
				{ status: 400 },
			);
		}

		const alert = await acknowledgeAlert(id, acknowledgedBy);

		return NextResponse.json({
			success: true,
			data: alert,
			message: "Alert acknowledged successfully",
			timestamp: new Date(),
		});
	} catch (error) {
		console.error("Acknowledge alert API error:", error);
		return NextResponse.json(
			{
				success: false,
				error:
					error instanceof Error
						? error.message
						: "Failed to acknowledge alert",
			},
			{ status: 500 },
		);
	}
}

/**
 * DELETE /api/dashboard/alerts/[id]
 * Delete alert by ID
 */
export async function DELETE(_request: NextRequest, { params }: RouteParams) {
	try {
		const { id } = await params;

		if (!id) {
			return NextResponse.json(
				{ success: false, error: "Alert ID is required" },
				{ status: 400 },
			);
		}

		await deleteSystemAlert(id);

		return NextResponse.json({
			success: true,
			message: "Alert deleted successfully",
			timestamp: new Date(),
		});
	} catch (error) {
		console.error("Delete alert API error:", error);
		return NextResponse.json(
			{
				success: false,
				error:
					error instanceof Error ? error.message : "Failed to delete alert",
			},
			{ status: 500 },
		);
	}
}
