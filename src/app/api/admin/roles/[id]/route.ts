import { type NextRequest, NextResponse } from "next/server";
import { withAuth } from "@/lib/api-auth";
import { ENTITIES, ACTIONS } from "@/constants/permissions";
import {
	getRoleById,
	updateRole,
	deleteRoles,
	canDeleteRole,
} from "@/features/roles/services";
import { updateRoleSchema } from "@/features/roles/schemas";

interface RouteParams {
	params: Promise<{ id: string }>;
}

// GET /api/roles/[id]
export const GET = withAuth(
	async (_user, ...args: unknown[]) => {
		const { params } = args[1] as { params: RouteParams["params"] };
		const { id } = await params;
		const role = await getRoleById(id);
		if (!role) {
			return NextResponse.json({ error: "Role not found" }, { status: 404 });
		}
		return NextResponse.json({ role });
	},
	{ entity: ENTITIES.ROLE, action: ACTIONS.READ },
);

// PUT /api/roles/[id]
export const PUT = withAuth(
	async (_user, ...args: unknown[]) => {
		const request = args[0] as NextRequest;
		const { params } = args[1] as { params: RouteParams["params"] };
		const { id } = await params;
		const body = await request.json();
		const validated = updateRoleSchema.parse(body);
		const role = await updateRole(id, validated);
		return NextResponse.json({ role });
	},
	{ entity: ENTITIES.ROLE, action: ACTIONS.UPDATE },
);

// DELETE /api/roles/[id]
export const DELETE = withAuth(
	async (_user, ...args: unknown[]) => {
		const { params } = args[1] as { params: RouteParams["params"] };
		const { id } = await params;
		const { canDelete, reason } = await canDeleteRole(id);
		if (!canDelete) {
			return NextResponse.json(
				{ error: reason || "Role cannot be deleted" },
				{ status: 400 },
			);
		}
		const result = await deleteRoles([id], true);
		return NextResponse.json({ result });
	},
	{ entity: ENTITIES.ROLE, action: ACTIONS.DELETE },
);
