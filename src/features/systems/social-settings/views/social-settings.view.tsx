"use client";

import React from "react";
import { SocialSettingsForm } from "../components";
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import { PageHeader } from "@/components/ui/page-header";
import { Icon } from "@iconify/react";

export function SocialSettingsView() {
	return (
		<div className="container mx-auto py-6 space-y-6">
			<PageHeader
				title="Social Settings"
				description="Configure your social media links and social sharing settings"
				icon="lucide:share-2"
			/>

			{/* Social Media Links Card */}
			<Card>
				<CardHeader>
					<CardTitle className="flex items-center gap-2">
						<Icon icon="lucide:link" className="h-5 w-5" />
						Social Media Links
					</CardTitle>
					<CardDescription>
						Add your social media profile links to display across your website
					</CardDescription>
				</CardHeader>
				<CardContent>
					<SocialSettingsForm />
				</CardContent>
			</Card>

			{/* Social Sharing Settings Card */}
			<Card>
				<CardHeader>
					<CardTitle className="flex items-center gap-2">
						<Icon icon="lucide:share" className="h-5 w-5" />
						Social Sharing
					</CardTitle>
					<CardDescription>
						Configure social sharing options for your content
					</CardDescription>
				</CardHeader>
				<CardContent>
					<div className="space-y-4">
						<div className="flex items-center justify-between p-4 border rounded-lg">
							<div className="space-y-1">
								<h4 className="text-sm font-medium">Enable Social Sharing</h4>
								<p className="text-xs text-muted-foreground">
									Allow visitors to share your content on social media
								</p>
							</div>
							<div className="text-sm text-muted-foreground">
								Coming Soon
							</div>
						</div>
						
						<div className="flex items-center justify-between p-4 border rounded-lg">
							<div className="space-y-1">
								<h4 className="text-sm font-medium">Social Login</h4>
								<p className="text-xs text-muted-foreground">
									Allow users to login with their social media accounts
								</p>
							</div>
							<div className="text-sm text-muted-foreground">
								Coming Soon
							</div>
						</div>
					</div>
				</CardContent>
			</Card>
		</div>
	);
}