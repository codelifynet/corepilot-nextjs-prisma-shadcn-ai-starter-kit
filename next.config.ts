import type { NextConfig } from "next";
import createNextIntlPlugin from "next-intl/plugin";

const withNextIntl = createNextIntlPlugin("./src/i18n/request.ts");

const nextConfig: NextConfig = {
	images: {
		remotePatterns: [
			{
				protocol: "https",
				hostname: "**",
			},
			{
				protocol: "http",
				hostname: "**",
			},
		],
		formats: ["image/webp", "image/avif"],
		qualities: [25, 50, 75, 90], // Compression quality levels
		deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
		imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
		minimumCacheTTL: 31536000, // 1 year
		dangerouslyAllowSVG: true,
		contentDispositionType: "attachment",
		contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
	},
	experimental: {
		optimizePackageImports: ["framer-motion", "lucide-react", "@iconify/react"],
	},
	compiler: {
		removeConsole: process.env.NODE_ENV === "production",
	},

	webpack: (config) => {
		config.resolve.fallback = {
			...config.resolve.fallback,
			"osx-temperature-sensor": false,
		};
		return config;
	},
};

export default withNextIntl(nextConfig);
