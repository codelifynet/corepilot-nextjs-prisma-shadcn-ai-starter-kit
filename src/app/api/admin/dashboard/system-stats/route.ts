import { NextResponse } from "next/server";
import { getSystemStats, saveSystemStats } from "@/features/overview/dashboard/services";


/**
 * GET /api/dashboard/system-stats
 * Get current system statistics
 */
export async function GET() {
	try {
		const systemStats = await getSystemStats();

		return NextResponse.json({
			success: true,
			data: systemStats,
			timestamp: new Date(),
		});
	} catch (error) {
		console.error("System stats API error:", error);
		return NextResponse.json(
			{
				success: false,
				error:
					error instanceof Error
						? error.message
						: "Failed to get system statistics",
			},
			{ status: 500 },
		);
	}
}

/**
 * POST /api/dashboard/system-stats
 * Save current system metrics to database
 */
export async function POST() {
	try {
		const systemStats = await getSystemStats();
		const result = await saveSystemStats(systemStats);

		return NextResponse.json({
			success: true,
			data: result,
			timestamp: new Date(),
		});
	} catch (error) {
		console.error("Save system stats API error:", error);
		return NextResponse.json(
			{
				success: false,
				error:
					error instanceof Error
						? error.message
						: "Failed to save system metrics",
			},
			{ status: 500 },
		);
	}
}
