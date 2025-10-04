import type { Metadata } from "next";
import { AuthLayoutProvider } from "@/features/auth";

export const metadata: Metadata = {
	title: "Authentication - CorePilot",
	description: "Sign in or create your CorePilot account",
};

export default function AuthLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return <AuthLayoutProvider>{children}</AuthLayoutProvider>;
}
