"use client";

import Image from "next/image";
import Link from "next/link";
import { useTranslations } from "next-intl";
import { poppins } from "@/lib/fonts";
import { cn } from "@/lib/utils";

interface LogoProps {
	/**
	 * Whether to show the brand name text
	 */
	showBrand?: boolean;
	/**
	 * Whether to show the subtitle text
	 */
	showSubtitle?: boolean;
	/**
	 * Whether the logo should be a clickable link to home
	 */
	asLink?: boolean;
	/**
	 * Custom href for the link (only used when asLink is true)
	 */
	href?: string;
	/**
	 * Size variant for the logo
	 */
	size?: "sm" | "md" | "lg";
	/**
	 * Additional CSS classes
	 */
	className?: string;
	/**
	 * Whether to show hover effects
	 */
	showHoverEffects?: boolean;
}

const sizeVariants = {
	sm: {
		image: "w-8 h-8 md:w-10 md:h-10",
		brand: "text-sm sm:text-base font-bold",
		subtitle: "text-xs",
		spacing: "space-x-1 sm:space-x-2"
	},
	md: {
		image: "w-12 h-12 md:w-16 md:h-16",
		brand: "text-base sm:text-lg lg:text-xl font-bold",
		subtitle: "text-xs",
		spacing: "space-x-2 sm:space-x-3"
	},
	lg: {
		image: "w-16 h-16 md:w-20 md:h-20",
		brand: "text-lg sm:text-xl lg:text-2xl font-bold",
		subtitle: "text-sm",
		spacing: "space-x-3 sm:space-x-4"
	}
};

export function Logo({
	showBrand = true,
	showSubtitle = true,
	asLink = true,
	href = "/",
	size = "md",
	className,
	showHoverEffects = true
}: LogoProps) {
	const t = useTranslations("navbar");
	const sizeConfig = sizeVariants[size];

	const logoContent = (
		<div className={cn(
			"flex items-center",
			sizeConfig.spacing,
			showHoverEffects && "group hover:scale-105 transition-all duration-300",
			className
		)}>
			<Image
				src="/logo.svg"
				className={sizeConfig.image}
				alt="CorePilot"
				width={size === "sm" ? 32 : size === "md" ? 48 : 64}
				height={size === "sm" ? 32 : size === "md" ? 48 : 64}
				priority
			/>

			{(showBrand || showSubtitle) && (
				<div className={cn("flex flex-col", poppins.className)}>
					{showBrand && (
						<span className={cn(
							sizeConfig.brand,
							"text-gray-900 dark:text-white tracking-tight leading-tight transition-colors duration-300"
						)}>
							{t("brand")}
						</span>
					)}
					{showSubtitle && (
						<span className={cn(
							sizeConfig.subtitle,
							"bg-gradient-to-r from-[#a000ff] to-[#ff006f] text-transparent bg-clip-text font-medium tracking-wider"
						)}>
							{t("subtitle")}
						</span>
					)}
				</div>
			)}
		</div>
	);

	if (asLink) {
		return (
			<Link href={href} className="inline-block">
				{logoContent}
			</Link>
		);
	}

	return logoContent;
}

export default Logo;