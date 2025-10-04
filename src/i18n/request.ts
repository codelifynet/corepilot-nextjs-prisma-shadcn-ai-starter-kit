import { getRequestConfig } from "next-intl/server";
import { routing, type Locale } from "./routing";
import { promises as fs } from "node:fs";
import path from "node:path";


async function loadLocaleMessages(locale: Locale) {
	const messagesDir = path.join(process.cwd(), "src", "i18n", "messages", locale);

	try {
		const files = await fs.readdir(messagesDir);
		const jsonFiles = files.filter(file => file.endsWith(".json"));

		const messages: Record<string, any> = {};

		for (const file of jsonFiles) {
			const fileName = file.replace(".json", "");
			try {
				const filePath = path.join(messagesDir, file);
				const fileContent = await fs.readFile(filePath, "utf-8");
				const fileMessages = JSON.parse(fileContent);
				messages[fileName] = fileMessages;
			} catch (error) {
				console.warn(`Locale messages not found: ${locale}/${file}`, error);
			}
		}

		return messages;
	} catch (error) {
		console.warn(`Locale messages not found: ${locale}`, error);
		return (await import(`./messages/${locale}.json`)).default;
	}
}

export default getRequestConfig(async ({ requestLocale }) => {
	let locale = await requestLocale;

	if (!locale || !routing.locales.includes(locale as Locale)) {
		locale = routing.defaultLocale;
	}

	const messages = await loadLocaleMessages(locale as Locale);

	return {
		locale,
		messages,
		timeZone: "Europe/Istanbul",
	};
});
