import { NextResponse } from "next/server";
import { getNetworkInfo } from "@/features/overview/dashboard/services";

/**
 * GET /api/dashboard/network
 * Get network information
 */
export async function GET() {
	try {
		const networkStats = await getNetworkInfo();

		return NextResponse.json({
			success: true,
			data: networkStats,
			timestamp: new Date(),
		});
	} catch (error) {
		console.error("Network stats API error:", error);
		return NextResponse.json(
			{
				success: false,
				error:
					error instanceof Error
						? error.message
						: "Failed to get network statistics",
			},
			{ status: 500 },
		);
	}
}
