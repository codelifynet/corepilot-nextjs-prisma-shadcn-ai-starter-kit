import type { Metadata } from "next";
import { Toaster } from "sonner";
import { AdminLayoutClient } from "@/components/admin-layout-client";

export const metadata: Metadata = {
	title: "Admin Panel - CorePilot",
	description: "CorePilot Admin Panel",
};

export default function AdminLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<>
			<AdminLayoutClient>{children}</AdminLayoutClient>
			<Toaster position="bottom-right" />
		</>
	);
}
