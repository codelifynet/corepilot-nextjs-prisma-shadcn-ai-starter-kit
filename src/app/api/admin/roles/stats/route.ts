import { NextResponse } from "next/server";
import { withAuth } from "@/lib/api-auth";
import { ENTITIES, ACTIONS } from "@/constants/permissions";
import { getRoleStats } from "@/features/roles/services";

// GET /api/roles/stats - role statistics
export const GET = withAuth(
	async () => {
		const stats = await getRoleStats();
		return NextResponse.json(stats);
	},
	{ entity: ENTITIES.ROLE, action: ACTIONS.READ },
);
