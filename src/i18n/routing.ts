import { defineRouting } from "next-intl/routing";

export const routing = defineRouting({
	locales: ["tr", "en", "de"],
	defaultLocale: "tr",
	localePrefix: "never",
	localeCookie: {
		name: "corePilotLocale",
		maxAge: 60 * 60 * 24 * 30,
		secure: process.env.NODE_ENV === "production",
	},

	pathnames: {
		"/": "/",
		"/dashboard": {
			tr: "/panel",
			en: "/dashboard",
			de: "/dashboard",
		},
		"/admin": {
			tr: "/yonetim",
			en: "/admin",
			de: "/admin",
		},
		"/profile": {
			tr: "/profil",
			en: "/profile",
			de: "/profil",
		},
		"/settings": {
			tr: "/ayarlar",
			en: "/settings",
			de: "/einstellungen",
		},
	},
});

export type Pathnames = keyof typeof routing.pathnames;
export type Locale = (typeof routing.locales)[number];
