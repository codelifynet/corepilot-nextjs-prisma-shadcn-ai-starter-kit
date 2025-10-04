import { PrismaClient } from "@/generated/prisma";
import { seedMasterRBAC } from "./seeds/master-rbac.seed";

const prisma = new PrismaClient();

async function main() {
	console.log("🌱 Starting database seeding...");

	// Execute complete RBAC seeding (permissions → roles → users)
	await seedMasterRBAC();

	// Seed sample categories (if Category model exists)
	console.log("📂 Checking for Category model...");
	
	// Skip category seeding as Category model doesn't exist in current schema
	console.log("⚠️  Category model not found in schema, skipping category seeding");

	console.log("✅ Sample categories created");

	// Create notification templates
	const notificationTemplates = [
		{
			name: "welcome_user",
			title: "Hoş Geldiniz!",
			content:
				"Merhaba {{userName}}, CorePilot'a hoş geldiniz! Hesabınız başarıyla oluşturuldu.",
			type: "SUCCESS" as const,
			category: "USER" as const,
			variables: ["userName"],
			isActive: true,
			isSystem: true,
		},
		{
			name: "password_changed",
			title: "Şifre Değiştirildi",
			content:
				"Güvenlik nedeniyle bilgilendiriyoruz: Hesabınızın şifresi {{changeDate}} tarihinde değiştirilmiştir.",
			type: "INFO" as const,
			category: "SECURITY" as const,
			variables: ["changeDate"],
			isActive: true,
			isSystem: true,
		},
		{
			name: "order_confirmed",
			title: "Sipariş Onaylandı",
			content:
				"{{orderNumber}} numaralı siparişiniz onaylandı. Toplam: {{totalAmount}} {{currency}}. Tahmini teslimat: {{deliveryTime}}.",
			type: "SUCCESS" as const,
			category: "ORDER" as const,
			variables: ["orderNumber", "totalAmount", "currency", "deliveryTime"],
			isActive: true,
			isSystem: true,
		},
		{
			name: "payment_failed",
			title: "Ödeme Hatası",
			content:
				"{{orderNumber}} numaralı siparişiniz için ödeme işlemi başarısız oldu. Lütfen ödeme bilgilerinizi kontrol edin.",
			type: "ERROR" as const,
			category: "PAYMENT" as const,
			variables: ["orderNumber"],
			isActive: true,
			isSystem: true,
		},
	];

	for (const templateData of notificationTemplates) {
		await prisma.notificationTemplate.upsert({
			where: { name: templateData.name },
			update: templateData,
			create: templateData,
		});
	}

	console.log("✅ Notification templates created");

	// Create default site settings
	await prisma.siteSettings.upsert({
		where: { id: "default" },
		update: {},
		create: {
			id: "default",
			siteName: "CorePilot",
			siteDescription:
				"Modern Next.js starter template with Feature Driven Development",
			siteUrl: "http://localhost:3000",
			adminEmail: "admin@corepilot.com",
			timezone: "Europe/Istanbul",
			language: "TR",
			currency: "TRY",
			maintenanceMode: false,
			allowRegistration: true,
			requireEmailVerification: true,
		},
	});

	console.log("✅ Site settings created");

	// Get the first admin user for SEO settings
	const adminUser = await prisma.user.findFirst({
		where: {
			role: {
				name: "SUPERADMIN",
			},
		},
	});

	if (adminUser) {
		// Create default SEO settings for admin user
		await prisma.seoSettings.upsert({
			where: { userId: adminUser.id },
			update: {},
			create: {
				userId: adminUser.id,
				metaTitle: "CorePilot - Modern Next.js Starter Template",
				metaDescription:
					"Feature-driven Next.js 15 starter template with authentication, Prisma ORM, TailwindCSS v4, and modern UI components. Built for scalable web applications.",
				metaKeywords: [
					"nextjs",
					"react",
					"typescript",
					"prisma",
					"tailwindcss",
					"shadcn",
					"starter template",
					"web development",
				],
				ogTitle: "CorePilot - Modern Next.js Starter Template",
				ogDescription:
					"Build scalable web applications with our feature-driven Next.js starter template",
				twitterSite: "@corepilot",
				enableSitemap: true,
				enableRobotsTxt: true,
				enableStructuredData: true,
			},
		});

		console.log("✅ SEO settings created for admin user");
	} else {
		console.log("⚠️ No admin user found, skipping SEO settings creation");
	}
}

main()
	.catch((e) => {
		console.error("❌ Error during seeding:", e);
		process.exit(1);
	})
	.finally(async () => {
		await prisma.$disconnect();
	});
