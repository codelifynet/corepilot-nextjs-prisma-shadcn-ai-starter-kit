import type { Metadata } from "next";
import { RolesView } from "@/features/roles/views";

export const metadata: Metadata = {
	title: "Roles & Permissions | CorePilot Admin",
	description: "Manage user roles and permissions",
};

export default function RolesPage() {
	return (
		<div className="container mx-auto p-6">
			<RolesView />
		</div>
	);
}
