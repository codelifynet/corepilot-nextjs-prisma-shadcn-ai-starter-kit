"use client";

import { NextIntlClientProvider } from "next-intl";
import type { ReactNode } from "react";

export interface LocaleProviderProps {
	children: ReactNode;
	messages: Record<string, unknown>;
	locale: string;
	timeZone?: string;
}

export function LocaleProvider({
	children,
	messages,
	locale,
	timeZone = "Europe/Istanbul",
}: LocaleProviderProps) {
	return (
		<NextIntlClientProvider
			messages={messages}
			locale={locale}
			timeZone={timeZone}
		>
			{children}
		</NextIntlClientProvider>
	);
}

export default LocaleProvider;
