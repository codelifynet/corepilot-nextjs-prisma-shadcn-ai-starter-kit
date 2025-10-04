import type { Metadata } from "next";
import { Roboto } from "next/font/google";
import { Toaster } from "sonner";
import { ThemeProvider } from "next-themes";
import { QueryProvider, LocaleProvider } from "@/providers";
import NextTopLoader from "nextjs-toploader";
import { getMessages } from "next-intl/server";
import { notFound } from "next/navigation";
import { routing } from "@/i18n/routing";
import "../globals.css";
import "@/styles/faq-animations.css";

const roboto = Roboto({
	variable: "--font-roboto",
	subsets: ["latin"],
	weight: ["300", "400", "500", "600", "700"],
	display: "swap",
});

export const metadata: Metadata = {
	title: "CorePilot - Modern AI Next.js Starter Template with OpenRouter",
	description: "CorePilot is a powerful Next.js 15 starter template with authentication, Prisma ORM, TailwindCSS v4, and ShadcnUI components. Built for Feature Driven Development (FDD) with SOLID principles. Includes OpenRouter for AI models.",
	keywords: [
		"Next.js",
		"React",
		"TypeScript",
		"TailwindCSS",
		"Prisma",
		"Authentication",
		"Starter Template",
		"FDD",
		"SOLID Principles",
		"Modern Web Development",
		"OpenRouter",
		"AI Models",
	],
	icons: {
		icon: "/logo.svg",
	},
	authors: [{ name: "CorePilot Team" }],
	creator: "CorePilot",
	publisher: "CorePilot",
	metadataBase: new URL(process.env.NEXT_PUBLIC_APP_URL || "https://corepilot.codelify.net"),
	alternates: {
		canonical: "/",
		languages: {
			"en-US": "/en",
			"tr-TR": "/tr",
		},
	},
	openGraph: {
		title: "CorePilot - Modern AI Next.js Starter Template with OpenRouter",
		description: "CorePilot is a powerful Next.js 15 starter template with authentication, Prisma ORM, TailwindCSS v4, and ShadcnUI components. Built for Feature Driven Development (FDD) with SOLID principles. Includes OpenRouter for AI models.",
		url: "/",
		siteName: "CorePilot - Modern AI Next.js Starter Template with OpenRouter",
		images: [
			{
				url: "/logo.svg",
				width: 1200,
				height: 630,
				alt: "CorePilot - Modern Next.js Starter Template",
			},
		],
		locale: "en_US",
		type: "website",
	},
	twitter: {
		card: "summary_large_image",
		title: "CorePilot - Modern AI Next.js Starter Template with OpenRouter",
		description: "CorePilot is a powerful Next.js 15 starter template with authentication, Prisma ORM, TailwindCSS v4, and ShadcnUI components. Built for Feature Driven Development (FDD) with SOLID principles. Includes OpenRouter for AI models.",
		images: ["/logo.svg"],
		creator: "@corepilot",
	},

	robots: {
		index: true,
		follow: true,
		nocache: false,
		googleBot: {
			index: true,
			follow: true,
			noimageindex: false,
			"max-video-preview": -1,
			"max-image-preview": "large",
			"max-snippet": -1,
		},
	},

	verification: {
		google: process.env.GOOGLE_SITE_VERIFICATION,
		yandex: process.env.YANDEX_VERIFICATION,
		yahoo: process.env.YAHOO_VERIFICATION,
	},

	category: "software",
};

export default async function LocaleLayout({
	children,
	params,
}: {
	children: React.ReactNode;
	params: { locale: string };
}) {
	// Await params before using its properties
	const { locale } = await params;

	// Ensure that the incoming `locale` is valid
	if (!routing.locales.includes(locale as any)) {
		notFound();
	}

	// Providing all messages to the client
	// side is the easiest way to get started
	const messages = await getMessages();

	return (
		<html lang={locale} suppressHydrationWarning>
			<body
				className={`${roboto.className} font-roboto antialiased`}
				suppressHydrationWarning
			>
				<NextTopLoader
					color="#F01A88"
					crawlSpeed={200}
					height={3}
					easing="ease"
					speed={200}
					initialPosition={0.08}
					shadow="0 0 10px #F01A88, 0 0 5px #F01A88"
					zIndex={1600}
					showSpinner={true}
					crawl={true}
				/>
				<QueryProvider>
					<ThemeProvider
						attribute="class"
						defaultTheme="light"
						enableSystem
						disableTransitionOnChange
					>
						<LocaleProvider
							messages={messages}
							locale={locale}
							timeZone="Europe/Istanbul"
						>
							{children}
							<Toaster position="bottom-right" />
						</LocaleProvider>
					</ThemeProvider>
				</QueryProvider>
			</body>
		</html>
	);
}
