import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { headers } from "next/headers";
import { auth } from "@/lib/auth";
import { PageHeader } from "@/components/ui/page-header";
import { getPageGradient } from "@/lib/page-utils";
import { UsersView } from "@/features/users";

export const metadata: Metadata = {
	title: "Users | CorePilot Admin",
	description: "Manage system users and administrators",
};

export default async function UsersPage() {
	const session = await auth.api.getSession({
		headers: await headers(),
	});
	if (!session) {
		redirect("/auth/login");
	}

	return (
		<div className="container mx-auto p-6">
			<PageHeader
				title="Users"
				description="Manage system users and administrators"
				gradient={getPageGradient("/admin/user-management/users")}
			/>

			<div className="mt-6">
				<UsersView currentUser={session.user as any} />
			</div>
		</div>
	);
}
