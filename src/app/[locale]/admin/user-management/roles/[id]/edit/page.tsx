import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { RoleEditView } from "@/features/roles/views";

interface RoleEditPageProps {
	params: Promise<{ id: string }>;
}

export async function generateMetadata({
	params,
}: RoleEditPageProps): Promise<Metadata> {
	const { id } = await params;

	return {
		title: `Edit Role | CorePilot Admin`,
		description: `Edit role ${id} properties and permissions`,
	};
}

export default async function RoleEditPage({ params }: RoleEditPageProps) {
	const { id } = await params;

	if (!id) {
		notFound();
	}

	return (
		<div className="container mx-auto p-6">
			<RoleEditView roleId={id} />
		</div>
	);
}
