import { NextResponse } from "next/server";
import {
	getDashboards,
	getAlertStats,
	getSystemStats,
} from "@/features/overview/dashboard/services";
import { withAuth } from "@/lib/api-auth";
import { ENTITIES, ACTIONS } from "@/constants/permissions";

/**
 * GET /api/dashboard/stats
 * Get dashboard overview statistics
 */
export const GET = withAuth(
	async () => {
		const [dashboards, alertStats, systemStats] = await Promise.all([
			getDashboards(),
			getAlertStats(),
			getSystemStats(),
		]);

		const stats = {
			dashboards: {
				total: dashboards.length,
				public: dashboards.filter((d) => d.isPublic).length,
				private: dashboards.filter((d) => !d.isPublic).length,
			},
			alerts: alertStats,
			system: {
				cpu: systemStats.cpu,
				memory: systemStats.memory,
				uptime: systemStats.system.uptime,
			},
			lastUpdated: new Date(),
		};

		return NextResponse.json({
			success: true,
			data: stats,
			timestamp: new Date(),
		});
	},
	{ entity: ENTITIES.DASHBOARD, action: ACTIONS.READ },
); // Dashboard stats için read permission gerekli
