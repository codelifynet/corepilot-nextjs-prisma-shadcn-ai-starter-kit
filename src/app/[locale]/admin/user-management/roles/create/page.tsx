import type { Metadata } from "next";
import { RoleCreateView } from "@/features/roles/views";

export const metadata: Metadata = {
	title: "Create Role | CorePilot Admin",
	description: "Create a new user role with specific permissions",
};

export default function CreateRolePage() {
	return (
		<div className="container mx-auto p-6">
			<RoleCreateView />
		</div>
	);
}
