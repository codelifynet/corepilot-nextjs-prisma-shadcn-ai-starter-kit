import { NextResponse } from "next/server";
import { getCPUInfo } from "@/features/overview/dashboard/services";

/**
 * GET /api/dashboard/cpu
 * Get detailed CPU information
 */
export async function GET() {
	try {
		const cpuInfo = await getCPUInfo();

		return NextResponse.json({
			success: true,
			data: cpuInfo,
			timestamp: new Date(),
		});
	} catch (error) {
		console.error("CPU info API error:", error);
		return NextResponse.json(
			{
				success: false,
				error:
					error instanceof Error
						? error.message
						: "Failed to get CPU information",
			},
			{ status: 500 },
		);
	}
}
