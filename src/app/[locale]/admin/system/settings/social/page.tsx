import { Metadata } from "next";
import { SocialSettingsView } from "@/features/systems/social-settings";

export const metadata: Metadata = {
	title: "Social Settings",
	description: "Configure your social media links and social sharing settings",
};

export default function SocialSettingsPage() {
	return <SocialSettingsView />;
}