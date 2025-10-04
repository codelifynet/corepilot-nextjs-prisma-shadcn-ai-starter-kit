import { NextResponse } from "next/server";
import { getMemoryInfo } from "@/features/overview/dashboard/services";

/**
 * GET /api/dashboard/memory
 * Get detailed memory information
 */
export async function GET() {
	try {
		const memoryInfo = await getMemoryInfo();

		return NextResponse.json({
			success: true,
			data: memoryInfo,
			timestamp: new Date(),
		});
	} catch (error) {
		console.error("Memory info API error:", error);
		return NextResponse.json(
			{
				success: false,
				error:
					error instanceof Error
						? error.message
						: "Failed to get memory information",
			},
			{ status: 500 },
		);
	}
}
