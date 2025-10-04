import type React from "react";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { Icon } from "@iconify/react";

interface BreadcrumbItem {
	label: string;
	href?: string;
}

export interface PageHeaderProps {
	title: string;
	description?: string;
	children?: React.ReactNode;
	className?: string;
	gradient?: string;
	breadcrumbs?: BreadcrumbItem[];
}

export const PageHeader: React.FC<PageHeaderProps> = ({
	title,
	description,
	children,
	className,
	gradient = "from-blue-400 to-indigo-600",
	breadcrumbs,
}) => {
	return (
		<div
			className={cn(
				"relative bg-white dark:bg-slate-800/90 rounded-3xl shadow-lg/10 shadow-slate-200/30 dark:shadow-slate-900/20 border border-slate-200/60 dark:border-slate-700/60 p-8 mb-8 overflow-hidden backdrop-blur-sm",
				className,
			)}
		>
			{/* Background Pattern */}
			<div className="absolute inset-0 bg-gradient-to-br from-slate-50/80 to-transparent dark:from-slate-700/20 dark:to-transparent"></div>
			<div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-bl from-blue-100/30 to-transparent dark:from-blue-900/20 dark:to-transparent rounded-full blur-3xl"></div>
			<div className="absolute bottom-0 left-0 w-24 h-24 bg-gradient-to-tr from-indigo-100/30 to-transparent dark:from-indigo-900/20 dark:to-transparent rounded-full blur-2xl"></div>

			<div className="relative z-10">
				{/* Breadcrumbs */}
				{breadcrumbs && breadcrumbs.length > 0 && (
					<nav className="mb-6" aria-label="Breadcrumb">
						<ol className="flex items-center space-x-2 text-sm">
							{breadcrumbs.map((item, index) => (
								<li key={index} className="flex items-center">
									{index > 0 && (
										<Icon
											icon="lucide:chevron-right"
											className="w-4 h-4 mx-2 text-gray-400 dark:text-gray-500"
										/>
									)}
									{item.href ? (
										<Link
											href={item.href}
											className="text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200 transition-colors font-medium"
										>
											{item.label}
										</Link>
									) : (
										<span className="text-gray-900 dark:text-gray-100 font-semibold">
											{item.label}
										</span>
									)}
								</li>
							))}
						</ol>
					</nav>
				)}

				<div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-6">
					<div className="flex items-center gap-6">
						<div className="relative">
							<div className="flex items-center gap-4">
								{/* Enhanced gradient accent */}
								<div className="relative">
									<div
										className={cn(
											"w-2 h-12 bg-gradient-to-b rounded-full shadow-lg",
											`bg-gradient-to-b ${gradient}`,
										)}
									></div>
									<div
										className={cn(
											"absolute inset-0 w-2 h-12 bg-gradient-to-b rounded-full opacity-60 blur-sm",
											`bg-gradient-to-b ${gradient}`,
										)}
									></div>
								</div>

								{/* Title with enhanced styling */}
								<div>
									<h1 className="text-3xl lg:text-4xl font-black text-gray-900 dark:text-white tracking-tight leading-tight">
										{title}
									</h1>
									{description && (
										<p className="text-gray-600 dark:text-gray-300 text-base mt-2 font-medium leading-relaxed max-w-2xl">
											{description}
										</p>
									)}
								</div>
							</div>
						</div>
					</div>

					{children && (
						<div className="flex items-center gap-3 relative z-10">
							{children}
						</div>
					)}
				</div>
			</div>
		</div>
	);
};

export default PageHeader;
