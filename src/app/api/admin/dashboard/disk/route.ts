import { NextResponse } from "next/server";
import { getDiskInfo } from "@/features/overview/dashboard/services";

/**
 * GET /api/dashboard/disk
 * Get disk usage information
 */
export async function GET() {
	try {
		const diskStats = await getDiskInfo();

		return NextResponse.json({
			success: true,
			data: diskStats,
			timestamp: new Date(),
		});
	} catch (error) {
		console.error("Disk stats API error:", error);
		return NextResponse.json(
			{
				success: false,
				error:
					error instanceof Error
						? error.message
						: "Failed to get disk statistics",
			},
			{ status: 500 },
		);
	}
}
