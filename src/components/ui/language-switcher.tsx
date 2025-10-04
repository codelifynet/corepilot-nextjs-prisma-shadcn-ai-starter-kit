"use client";

import { useLocale } from "next-intl";
import { useRouter, usePathname } from "next/navigation";
import { Button } from "@/components/ui/button";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Icon } from "@iconify/react";
import { routing } from "@/i18n/routing";

const languages = {
	tr: { name: "Türkçe", flag: "flag:tr-4x3" },
	en: { name: "English", flag: "flag:us-4x3" },
	de: { name: "Deutsch", flag: "flag:de-4x3" },
};

export function LanguageSwitcher() {
	const locale = useLocale();
	const router = useRouter();
	const pathname = usePathname();

	const handleLanguageChange = (newLocale: string) => {
		// Remove current locale from pathname
		const pathWithoutLocale = pathname.replace(`/${locale}`, "") || "/";
		// Navigate to new locale
		router.push(`/${newLocale}${pathWithoutLocale}`);
	};

	const currentLanguage = languages[locale as keyof typeof languages];

	return (
		<DropdownMenu>
			<DropdownMenuTrigger asChild>
				<Button variant="ghost" size="sm" className="p-2">
					<Icon icon={currentLanguage?.flag} className="h-5 w-5" />
				</Button>
			</DropdownMenuTrigger>
			<DropdownMenuContent align="end" className="z-[200]">
				{routing.locales.map((lang) => {
					const language = languages[lang as keyof typeof languages];
					return (
						<DropdownMenuItem
							key={lang}
							onClick={() => handleLanguageChange(lang)}
							className={`cursor-pointer flex items-center gap-2 ${
								lang === locale ? "bg-accent" : ""
							}`}
						>
							<Icon icon={language.flag} className="h-4 w-4" />
							{language.name}
						</DropdownMenuItem>
					);
				})}
			</DropdownMenuContent>
		</DropdownMenu>
	);
}
