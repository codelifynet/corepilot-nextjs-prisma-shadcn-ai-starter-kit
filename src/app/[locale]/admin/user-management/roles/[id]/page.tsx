import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { RoleDetailView } from "@/features/roles/views";

interface RoleDetailPageProps {
	params: Promise<{ id: string }>;
}

export async function generateMetadata({
	params,
}: RoleDetailPageProps): Promise<Metadata> {
	const { id } = await params;

	return {
		title: `Role Details | CorePilot Admin`,
		description: `View details for role ${id}`,
	};
}

export default async function RoleDetailPage({ params }: RoleDetailPageProps) {
	const { id } = await params;

	if (!id) {
		notFound();
	}

	return (
		<div className="container mx-auto p-6">
			<RoleDetailView roleId={id} />
		</div>
	);
}
