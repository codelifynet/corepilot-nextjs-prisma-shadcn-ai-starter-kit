import type React from "react";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { Icon } from "@iconify/react";
import { ChevronRight } from "lucide-react";

export interface BreadcrumbItem {
	label: string;
	href?: string;
	icon?: string;
}

export interface BreadcrumbNavProps {
	items: BreadcrumbItem[];
	className?: string;
	showHome?: boolean;
	homeHref?: string;
	separator?: React.ReactNode;
}

export const BreadcrumbNav: React.FC<BreadcrumbNavProps> = ({
	items,
	className,
	showHome = true,
	homeHref = "/",
	separator,
}) => {
	const allItems = showHome
		? [{ label: "Home", href: homeHref, icon: "lucide:home" }, ...items]
		: items;

	return (
		<nav
			className={cn("flex items-center space-x-1 text-sm", className)}
			aria-label="Breadcrumb"
		>
			<ol className="flex items-center space-x-1">
				{allItems.map((item, index) => (
					<li key={index} className="flex items-center">
						{index > 0 && (
							<span className="mx-2 text-gray-400 dark:text-gray-500">
								{separator || <ChevronRight className="w-4 h-4" />}
							</span>
						)}
						{item.href ? (
							<Link
								href={item.href}
								className="flex items-center gap-1.5 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200 transition-colors font-medium px-2 py-1 rounded-md hover:bg-gray-100 dark:hover:bg-gray-800"
							>
								{item.icon && <Icon icon={item.icon} className="w-4 h-4" />}
								{item.label}
							</Link>
						) : (
							<span className="flex items-center gap-1.5 text-gray-900 dark:text-gray-100 font-semibold px-2 py-1">
								{item.icon && <Icon icon={item.icon} className="w-4 h-4" />}
								{item.label}
							</span>
						)}
					</li>
				))}
			</ol>
		</nav>
	);
};

export default BreadcrumbNav;
