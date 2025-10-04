import type { Metadata } from "next";
import { SiteSettingsView } from "@/features/systems/site-settings/views";

export const metadata: Metadata = {
	title: "Site Settings | CorePilot Admin",
	description: "Configure comprehensive site settings including basic information, SEO, security, and performance options",
};

export default function SiteSettingsPage() {
	return <SiteSettingsView />;
}