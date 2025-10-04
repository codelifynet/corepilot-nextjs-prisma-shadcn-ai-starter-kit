"use client";

import type React from "react";
import { useState } from "react";
import { PageHeader } from "@/components/ui/page-header";
import {
	Card,
	CardContent,
} from "@/components/ui/card";
import {
	Accordion,
	AccordionContent,
	AccordionItem,
	AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { Icon } from "@iconify/react";
import { toast } from "sonner";

// Import form components
import {
	BasicSiteInfoForm,
	ContactInfoForm,
	AnalyticsForm,
	MaintenanceForm,
	AuthSecurityForm,
} from "../components";

// Types
import type { SiteSettings } from "../types";
import { getPageGradient } from "@/lib/page-utils";

interface SiteSettingsViewProps {
	initialData?: SiteSettings | null;
	isLoading?: boolean;
}

interface FormSection {
	id: string;
	title: string;
	description: string;
	icon: string;
	component: React.ComponentType<any>;
	gridCols?: string;
}

const formSections: FormSection[] = [
	{
		id: "basic-info",
		title: "Basic Site Information",
		description:
			"Configure your site's basic information and regional settings",
		icon: "lucide:settings",
		component: BasicSiteInfoForm,
		gridCols: "col-span-2",
	},
	{
		id: "contact-info",
		title: "Contact Information",
		description: "Set up contact details and business information",
		icon: "lucide:mail",
		component: ContactInfoForm,
	},
	{
		id: "analytics",
		title: "Analytics & Tracking",
		description: "Configure Google Analytics and other tracking tools",
		icon: "lucide:bar-chart-3",
		component: AnalyticsForm,
	},
	{
		id: "maintenance",
		title: "Maintenance Mode",
		description: "Configure site maintenance settings",
		icon: "lucide:wrench",
		component: MaintenanceForm,
	},
	{
		id: "auth-security",
		title: "Authentication & Security",
		description: "Configure user authentication and security settings",
		icon: "lucide:shield-check",
		component: AuthSecurityForm,
		gridCols: "col-span-2",
	},
];

export function SiteSettingsView({
	initialData,
	isLoading = false,
}: SiteSettingsViewProps) {
	const [isSaving, setIsSaving] = useState(false);
	const [hasUnsavedChanges, setHasUnsavedChanges] = useState(false);
	const [expandedSections, setExpandedSections] = useState<string[]>([
		"basic-info"
	]);

	const breadcrumbs = [
		{ label: "Admin", href: "/admin" },
		{ label: "System", href: "/admin/system" },
		{ label: "Site Settings" },
	];

	const expandAllSections = () => {
		setExpandedSections(formSections.map((section) => section.id));
	};

	const collapseAllSections = () => {
		setExpandedSections([]);
	};

	const handleSaveAll = async () => {
		setIsSaving(true);
		try {
			// TODO: Implement save all functionality
			await new Promise((resolve) => setTimeout(resolve, 1000)); // Simulate API call
			toast.success("Site settings saved successfully");
			setHasUnsavedChanges(false);
		} catch (error) {
			toast.error("Failed to save site settings");
			console.error("Save error:", error);
		} finally {
			setIsSaving(false);
		}
	};

	const handleFormChange = () => {
		setHasUnsavedChanges(true);
	};

	if (isLoading) {
		return (
			<div className="space-y-6">
				<PageHeader
					title="Site Settings"
					description="Configure your site's global settings and preferences"
					breadcrumbs={breadcrumbs}
				/>
				<div className="space-y-4">
					{Array.from({ length: 6 }).map((_, index) => (
						<Card key={index} className="animate-pulse">
							<div className="p-6">
								<div className="h-4 bg-gray-200 rounded w-3/4 mb-2"></div>
								<div className="h-3 bg-gray-200 rounded w-full mb-4"></div>
								<div className="space-y-3">
									<div className="h-3 bg-gray-200 rounded"></div>
									<div className="h-3 bg-gray-200 rounded w-5/6"></div>
								</div>
							</div>
						</Card>
					))}
				</div>
			</div>
		);
	}

	return (
		<div className="space-y-6">
			<PageHeader
				title="Site Settings"
				description="Configure your site's global settings and preferences"
				breadcrumbs={breadcrumbs}
				gradient={getPageGradient("site-settings")}
			>
				<div className="flex items-center gap-3">
					<Button
						variant="outline"
						size="sm"
						onClick={expandAllSections}
						className="hidden sm:flex"
					>
						<Icon icon="lucide:expand" className="w-4 h-4 mr-2" />
						Expand All
					</Button>
					<Button
						variant="outline"
						size="sm"
						onClick={collapseAllSections}
						className="hidden sm:flex"
					>
						<Icon icon="lucide:minimize-2" className="w-4 h-4 mr-2" />
						Collapse All
					</Button>
					<Button
						onClick={handleSaveAll}
						disabled={isSaving || !hasUnsavedChanges}
						className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700"
					>
						{isSaving ? (
							<>
								<Icon
									icon="lucide:loader-2"
									className="w-4 h-4 mr-2 animate-spin"
								/>
								Saving...
							</>
						) : (
							<>
								<Icon icon="lucide:save" className="w-4 h-4 mr-2" />
								Save All Changes
							</>
						)}
					</Button>
				</div>
			</PageHeader>

			{hasUnsavedChanges && (
				<div className="bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800 rounded-lg p-4">
					<div className="flex items-center">
						<Icon
							icon="lucide:alert-triangle"
							className="w-5 h-5 text-amber-600 dark:text-amber-400 mr-3"
						/>
						<div className="flex-1">
							<p className="text-sm font-medium text-amber-800 dark:text-amber-200">
								You have unsaved changes
							</p>
							<p className="text-sm text-amber-700 dark:text-amber-300">
								Don't forget to save your changes before leaving this page.
							</p>
						</div>
					</div>
				</div>
			)}

			<div className="container mx-auto">
				<Accordion
					type="multiple"
					value={expandedSections}
					onValueChange={setExpandedSections}
					className="space-y-4"
				>
					{formSections.map((section) => {
						const FormComponent = section.component;

						return (
							<AccordionItem
								key={section.id}
								value={section.id}
								className="border rounded-lg bg-card"
							>
								<AccordionTrigger className="px-6 py-4 hover:no-underline">
									<div className="flex items-center space-x-4 text-left">
										<div className="p-2 bg-blue-100 dark:bg-blue-900/30 rounded-lg">
											<Icon
												icon={section.icon}
												className="w-5 h-5 text-blue-600 dark:text-blue-400"
											/>
										</div>
										<div>
											<h3 className="text-lg font-semibold">{section.title}</h3>
											<p className="text-sm text-muted-foreground">
												{section.description}
											</p>
										</div>
									</div>
								</AccordionTrigger>
								<AccordionContent className="px-6 pb-6">
									<div className="border-t pt-6">
										<FormComponent
											initialData={initialData}
											onChange={handleFormChange}
										/>
									</div>
								</AccordionContent>
							</AccordionItem>
						);
					})}
				</Accordion>
			</div>

			{/* Quick Actions Footer */}
			<Card className="bg-gradient-to-r from-slate-50 to-blue-50 dark:from-slate-800 dark:to-blue-900/20 border-dashed max-w-4xl mx-auto">
				<CardContent className="pt-6">
					<div className="flex items-center justify-between">
						<div className="flex items-center space-x-3">
							<Icon
								icon="lucide:info"
								className="w-5 h-5 text-blue-600 dark:text-blue-400"
							/>
							<div>
								<p className="font-medium text-gray-900 dark:text-gray-100">
									Quick Actions
								</p>
								<p className="text-sm text-gray-600 dark:text-gray-400">
									Manage your site settings efficiently
								</p>
							</div>
						</div>
						<div className="flex items-center space-x-2">
							<Button variant="outline" size="sm">
								<Icon icon="lucide:download" className="w-4 h-4 mr-2" />
								Export Settings
							</Button>
							<Button variant="outline" size="sm">
								<Icon icon="lucide:upload" className="w-4 h-4 mr-2" />
								Import Settings
							</Button>
							<Button variant="outline" size="sm">
								<Icon icon="lucide:rotate-ccw" className="w-4 h-4 mr-2" />
								Reset to Defaults
							</Button>
						</div>
					</div>
				</CardContent>
			</Card>
		</div>
	);
}

export default SiteSettingsView;
