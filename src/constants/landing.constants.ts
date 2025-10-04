/**
 * Landing Page Constants
 *
 * This file contains all the data used across landing page sections.
 * Organized by section for easy maintenance and updates.
 */

// ============================================================================
// FEATURES SECTION
// ============================================================================

export const FEATURES_DATA = [
	{
		key: "lightningFast",
		icon: "tabler:rocket",
		title: "Lightning Fast Setup",
		description:
			"Get your project running in under 5 minutes with our pre-configured stack.",
		color: "from-blue-500 to-cyan-500",
		bgColor: "bg-blue-50",
		iconColor: "text-blue-600",
	},
	{
		key: "enterpriseSecurity",
		icon: "tabler:shield-check",
		title: "Enterprise Security",
		description:
			"Built-in authentication, authorization, and security best practices.",
		color: "from-green-500 to-emerald-500",
		bgColor: "bg-green-50",
		iconColor: "text-green-600",
	},
	{
		key: "modernDesign",
		icon: "tabler:palette",
		title: "Modern Design System",
		description:
			"Beautiful, responsive components with Tailwind CSS v4 and Shadcn UI.",
		color: "from-purple-500 to-pink-500",
		bgColor: "bg-purple-50",
		iconColor: "text-purple-600",
	},
	{
		key: "typeSafeDatabase",
		icon: "tabler:database",
		title: "Type-Safe Database",
		description:
			"Prisma ORM with TypeScript for reliable and scalable data management.",
		color: "from-orange-500 to-red-500",
		bgColor: "bg-orange-50",
		iconColor: "text-orange-600",
	},
	{
		key: "aiPowered",
		icon: "tabler:brain",
		title: "AI-Powered",
		description:
			"Integrated AI capabilities to supercharge your application development.",
		color: "from-indigo-500 to-purple-500",
		bgColor: "bg-indigo-50",
		iconColor: "text-indigo-600",
	},
	{
		key: "developerExperience",
		icon: "tabler:code",
		title: "Developer Experience",
		description:
			"Hot reload, TypeScript, ESLint, and Prettier configured out of the box.",
		color: "from-teal-500 to-cyan-500",
		bgColor: "bg-teal-50",
		iconColor: "text-teal-600",
	},
];

// ============================================================================
// HERO SECTION
// ============================================================================

export const HERO_INTEGRATIONS = [
	{
		name: "Prisma",
		desc: "ORM & Database Toolkit",
		icon: "logos:prisma",
		gradient: "from-indigo-500 to-blue-700",
		bgColor: "bg-indigo-500",
		textColor: "text-indigo-600",
	},
	{
		name: "PostgreSQL",
		desc: "Powerful Database",
		icon: "logos:postgresql",
		gradient: "from-blue-400 to-indigo-500",
		bgColor: "bg-blue-500",
		textColor: "text-blue-600",
	},
	{
		name: "Next.js",
		desc: "Built for Web Apps",
		icon: "logos:nextjs-icon",
		gradient: "from-black to-gray-800",
		bgColor: "bg-black",
		textColor: "text-gray-900",
	},
	{
		name: "Tailwind CSS",
		desc: "UI & Components",
		icon: "logos:tailwindcss-icon",
		gradient: "from-teal-400 to-blue-500",
		bgColor: "bg-teal-500",
		textColor: "text-teal-600",
	},
	{
		name: "Paddle",
		desc: "Subscription & Payments",
		icon: "logos:paddle",
		gradient: "from-blue-500 to-indigo-600",
		bgColor: "bg-blue-500",
		textColor: "text-blue-600",
	},
	{
		name: "Resend",
		desc: "Marketing Emails",
		icon: "resend-custom",
		gradient: "from-black to-black",
		bgColor: "bg-black",
		textColor: "text-white",
	},
];

// ============================================================================
// USE CASES SECTION
// ============================================================================

export const USE_CASES_DATA = [
	{
		icon: "tabler:building-store",
		title: "E-commerce Platforms",
		desc: "Build scalable online stores with payment integration and inventory management.",
		gradient: "from-blue-500 to-cyan-500",
		bgPattern: "bg-blue-50",
	},
	{
		icon: "tabler:chart-line",
		title: "SaaS Applications",
		desc: "Create subscription-based software with user management and analytics.",
		gradient: "from-purple-500 to-pink-500",
		bgPattern: "bg-purple-50",
	},
	{
		icon: "tabler:users",
		title: "Social Platforms",
		desc: "Develop community-driven apps with real-time features and user interactions.",
		gradient: "from-green-500 to-emerald-500",
		bgPattern: "bg-green-50",
	},
	{
		icon: "tabler:brain",
		title: "AI-Powered Apps",
		desc: "Integrate machine learning and AI capabilities into your applications.",
		gradient: "from-orange-500 to-red-500",
		bgPattern: "bg-orange-50",
	},
	{
		icon: "tabler:device-analytics",
		title: "Analytics Dashboards",
		desc: "Create data visualization tools with real-time monitoring and reporting.",
		gradient: "from-indigo-500 to-purple-500",
		bgPattern: "bg-indigo-50",
	},
	{
		icon: "tabler:api",
		title: "API Services",
		desc: "Build robust REST and GraphQL APIs with authentication and rate limiting.",
		gradient: "from-teal-500 to-cyan-500",
		bgPattern: "bg-teal-50",
	},
];

// ============================================================================
// HOW IT WORKS SECTION
// ============================================================================

export const HOW_IT_WORKS_STEPS = [
	{
		step: "01",
		title: "Clone & Install",
		description:
			"Clone the repository and install dependencies with a single command. Get started in seconds.",
		icon: "tabler:download",
		gradient: "from-blue-500 to-blue-600",
		bgColor: "bg-blue-50",
		iconColor: "text-blue-600",
	},
	{
		step: "02",
		title: "Configure",
		description:
			"Set up environment variables and connect your database with our guided setup wizard.",
		icon: "tabler:settings-cog",
		gradient: "from-blue-600 to-indigo-600",
		bgColor: "bg-indigo-50",
		iconColor: "text-indigo-600",
	},
	{
		step: "03",
		title: "Build & Deploy",
		description:
			"Start building features on top of the ready infrastructure and deploy with confidence.",
		icon: "tabler:rocket",
		gradient: "from-indigo-600 to-blue-500",
		bgColor: "bg-blue-50",
		iconColor: "text-blue-600",
	},
];

// ============================================================================
// PRICING SECTION
// ============================================================================
// Note: PRICING_PLANS moved to PricingSection.tsx for better maintainability

// ============================================================================
// TESTIMONIALS SECTION
// ============================================================================

export const TESTIMONIALS_DATA = [
	{
		name: "Alex Johnson",
		role: "Senior Frontend Developer",
		company: "TechStart",
		content:
			"With CorePilot, I finished my MVP in 3 days. The ready auth system and dashboard let me focus only on business logic. Game changer!",
		avatar: "AJ",
		rating: 5,
		gradient: "from-blue-500 to-cyan-500",
		bgColor: "bg-blue-50",
	},
	{
		name: "Emily Clark",
		role: "Full Stack Developer",
		company: "Digital Agency",
		content:
			"This is the best Next.js boilerplate. TailwindCSS v4 and the modern UI integration are excellent. I use it for all my client projects.",
		avatar: "EC",
		rating: 5,
		gradient: "from-purple-500 to-pink-500",
		bgColor: "bg-purple-50",
	},
	{
		name: "Michael Lee",
		role: "Startup Founder",
		company: "InnovateLab",
		content:
			"I deployed my SaaS project in a week. With Prisma ORM and Better Auth, I built a secure and scalable app. Incredible productivity boost!",
		avatar: "ML",
		rating: 5,
		gradient: "from-green-500 to-emerald-500",
		bgColor: "bg-green-50",
	},
	{
		name: "Sarah Wilson",
		role: "Product Manager",
		company: "StartupCo",
		content:
			"The AI integration capabilities saved us months of development. Our team could focus on unique features instead of boilerplate code.",
		avatar: "SW",
		rating: 5,
		gradient: "from-orange-500 to-red-500",
		bgColor: "bg-orange-50",
	},
	{
		name: "David Chen",
		role: "CTO",
		company: "TechFlow",
		content:
			"Security and performance out of the box. The code quality is exceptional and the documentation is comprehensive. Highly recommended!",
		avatar: "DC",
		rating: 5,
		gradient: "from-indigo-500 to-purple-500",
		bgColor: "bg-indigo-50",
	},
	{
		name: "Lisa Rodriguez",
		role: "Lead Developer",
		company: "WebCraft",
		content:
			"The developer experience is amazing. Hot reload, TypeScript support, and modern tooling make development a joy. Best investment ever!",
		avatar: "LR",
		rating: 5,
		gradient: "from-teal-500 to-cyan-500",
		bgColor: "bg-teal-50",
	},
];

// ============================================================================
// FAQ SECTION
// ============================================================================

export const FAQ_DATA = [
	{
		id: "what-is-corepilot",
		question: "What is CorePilot and what makes it special?",
		answer:
			"CorePilot is a comprehensive Next.js 15 starter kit designed for modern web applications. It combines the latest technologies like TailwindCSS v4, Shadcn UI, and Better Auth with AI-powered features, providing everything you need to launch your project quickly and efficiently.",
		icon: "tabler:rocket",

		gradient: "from-purple-500 to-pink-500",
	},
	{
		id: "getting-started",
		question: "How quickly can I get started with CorePilot?",
		answer:
			"You can have CorePilot running in under 5 minutes! Simply clone the repository, run 'bun install' to install dependencies, and 'bun dev' to start the development server. Our comprehensive documentation guides you through each step.",
		icon: "tabler:clock",

		gradient: "from-blue-500 to-cyan-500",
	},
	{
		id: "free-to-use",
		question: "Is CorePilot really free to use?",
		answer:
			"Yes! The Starter plan is completely free and includes full source code access, basic components, and community support. You can use it for personal and commercial projects under the MIT license. Pro and Enterprise plans offer additional premium features.",
		icon: "tabler:gift",
		category: "Pricing",
		gradient: "from-green-500 to-emerald-500",
	},
	{
		id: "modern-technologies",
		question: "What modern technologies are included?",
		answer:
			"CorePilot uses cutting-edge technologies: Next.js 15 with App Router, TailwindCSS v4 for styling, Prisma ORM for database management, Better Auth for authentication, Shadcn UI components, TypeScript for type safety, and many more modern tools.",
		icon: "tabler:stack-2",
		gradient: "from-orange-500 to-red-500",
	},
	{
		id: "support-options",
		question: "What kind of support can I expect?",
		answer:
			"We provide multiple support channels: free community support through GitHub discussions, comprehensive documentation, video tutorials, and for Pro/Enterprise users, priority email support with 24-hour response time and direct access to our development team.",
		icon: "tabler:headset",

		gradient: "from-indigo-500 to-purple-500",
	},
	{
		id: "customization",
		question: "Can I customize CorePilot for my specific needs?",
		answer:
			"Absolutely! CorePilot is built with customization in mind. You have full access to the source code, modular component architecture, and extensive theming options. Enterprise customers also get custom development support and white-label solutions.",
		icon: "tabler:palette",
		category: "Customization",
		gradient: "from-pink-500 to-rose-500",
	},
	{
		id: "production-ready",
		question: "Is CorePilot suitable for production applications?",
		answer:
			"Yes! CorePilot follows industry best practices for security, performance, and scalability. It includes production-ready features like authentication, database integration, error handling, and deployment configurations for platforms like Vercel and Netlify.",
		icon: "tabler:shield-check",

		gradient: "from-teal-500 to-cyan-500",
	},
	{
		id: "updates-frequency",
		question: "How often is CorePilot updated?",
		answer:
			"We release regular updates to keep CorePilot current with the latest technologies and security patches. Starter users get major updates, while Pro and Enterprise users receive priority access to new features and immediate security updates.",
		icon: "tabler:refresh",

		gradient: "from-violet-500 to-purple-500",
	},
	{
		id: "github-updates",
		question: "How do I receive updates and what information is required?",
		answer:
			"Updates are shared through our GitHub repository. During the payment process, you'll need to provide your GitHub email address and GitHub username in the designated fields. This ensures you receive access to the latest updates and can collaborate with the CorePilot community.",
		icon: "tabler:brand-github",
		gradient: "from-gray-600 to-gray-800",
	},
];

// ============================================================================
// SIMPLE SECTIONS DATA
// ============================================================================

// Simple Hero Section
export const SIMPLE_HERO_TECHNOLOGIES = [
	{
		name: "Next.js",
		icon: "logos:nextjs-icon",
		color: "text-gray-900 dark:text-white",
		description: "React Framework",
		gradient: "from-black to-gray-800",
	},
	{
		name: "React",
		icon: "logos:react",
		color: "text-blue-500",
		description: "UI Library",
		gradient: "from-blue-400 to-blue-600",
	},
	{
		name: "TypeScript",
		icon: "logos:typescript-icon",
		color: "text-blue-600",
		description: "Type Safety",
		gradient: "from-blue-600 to-blue-800",
	},
	{
		name: "Tailwind CSS",
		icon: "logos:tailwindcss-icon",
		color: "text-teal-500",
		description: "Styling",
		gradient: "from-teal-400 to-cyan-500",
	},
	{
		name: "Prisma",
		icon: "logos:prisma",
		color: "text-indigo-600",
		description: "Database ORM",
		gradient: "from-indigo-500 to-purple-600",
	},
	{
		name: "Paddle",
		icon: "logos:paddle",
		color: "text-blue-600",
		description: "Payments",
		gradient: "from-blue-500 to-indigo-600",
	},
	{
		name: "Resend",
		icon: "simple-icons:resend",
		color: "text-gray-900 dark:text-white",
		description: "Email API",
		gradient: "from-gray-800 to-black",
	},
	{
		name: "Framer Motion",
		icon: "logos:framer",
		color: "text-pink-500",
		description: "Animations",
		gradient: "from-pink-400 to-purple-500",
	},
];

// Simple Testimonials Section
export const SIMPLE_TESTIMONIALS_FLOATING_ELEMENTS = [
	{ id: 1, size: "w-2 h-2", position: "top-10 left-10", delay: "0s" },
	{ id: 2, size: "w-3 h-3", position: "top-20 right-20", delay: "1s" },
	{ id: 3, size: "w-1 h-1", position: "bottom-32 left-16", delay: "2s" },
	{ id: 4, size: "w-2 h-2", position: "bottom-20 right-32", delay: "0.5s" },
	{ id: 5, size: "w-1 h-1", position: "top-1/3 left-1/4", delay: "1.5s" },
	{ id: 6, size: "w-3 h-3", position: "bottom-1/3 right-1/4", delay: "2.5s" },
];

export const SIMPLE_TESTIMONIALS_DATA = [
	{
		name: "Sarah Johnson",
		role: "Founder, TechStart",
		avatar:
			"https://images.unsplash.com/photo-1494790108755-2616b612b786?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=687&q=80",
		content:
			"This starter kit saved us months of development time. The authentication system and payment integration work flawlessly out of the box.",
		rating: 5,
	},
	{
		name: "Michael Chen",
		role: "Senior Developer, InnovateCorp",
		avatar:
			"https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=687&q=80",
		content:
			"The code quality is exceptional. Clean architecture, proper TypeScript usage, and excellent documentation. Highly recommended!",
		rating: 5,
	},
	{
		name: "Emily Rodriguez",
		role: "Product Manager, StartupXYZ",
		avatar:
			"https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
		content:
			"We launched our MVP in just 2 weeks using this template. The AI integrations and admin panel are game-changers.",
		rating: 5,
	},
];

export const SIMPLE_TESTIMONIALS_STATS = [
	{
		number: "500+",
		label: "Happy Developers",
		icon: "lucide:users",
	},
	{
		number: "50+",
		label: "Projects Launched",
		icon: "lucide:rocket",
	},
	{
		number: "99%",
		label: "Satisfaction Rate",
		icon: "lucide:heart",
	},
	{
		number: "24/7",
		label: "Support Available",
		icon: "lucide:headphones",
	},
];

// Simple CTA Section
export const SIMPLE_CTA_FLOATING_ELEMENTS = [
	{
		id: 1,
		size: "w-4 h-4",
		position: "top-20 left-16",
		delay: "0s",
		color: "bg-purple-500/40",
	},
	{
		id: 2,
		size: "w-3 h-3",
		position: "top-40 right-20",
		delay: "1s",
		color: "bg-pink-500/30",
	},
	{
		id: 3,
		size: "w-2 h-2",
		position: "bottom-32 left-24",
		delay: "2s",
		color: "bg-blue-500/35",
	},
	{
		id: 4,
		size: "w-5 h-5",
		position: "bottom-20 right-16",
		delay: "0.5s",
		color: "bg-green-500/25",
	},
	{
		id: 5,
		size: "w-3 h-3",
		position: "top-1/2 left-12",
		delay: "1.5s",
		color: "bg-yellow-500/30",
	},
	{
		id: 6,
		size: "w-2 h-2",
		position: "bottom-1/2 right-20",
		delay: "2.5s",
		color: "bg-indigo-500/40",
	},
];

export const SIMPLE_CTA_FEATURES = [
	{
		icon: "lucide:zap",
		text: "Ready in 5 minutes",
	},
	{
		icon: "lucide:shield-check",
		text: "Production ready",
	},
	{
		icon: "lucide:code-2",
		text: "Clean architecture",
	},
	{
		icon: "lucide:heart",
		text: "Developer friendly",
	},
];

export const SIMPLE_CTA_STATS = [
	{
		number: "1000+",
		label: "Developers",
	},
	{
		number: "50+",
		label: "Components",
	},
	{
		number: "99%",
		label: "Satisfaction",
	},
	{
		number: "24/7",
		label: "Support",
	},
];

// Simple Footer Section
export const SIMPLE_FOOTER_LINKS = {
	product: [
		{ name: "Features", href: "#features" },
		{ name: "Pricing", href: "#pricing" },
		{ name: "Documentation", href: "/docs" },
		{ name: "Changelog", href: "/changelog" },
	],
	company: [
		{ name: "About", href: "/about" },
		{ name: "Blog", href: "/blog" },
		{ name: "Careers", href: "/careers" },
		{ name: "Contact", href: "/contact" },
	],
	resources: [
		{ name: "Community", href: "/community" },
		{ name: "Help Center", href: "/help" },
		{ name: "Partners", href: "/partners" },
		{ name: "Status", href: "/status" },
	],
	legal: [
		{ name: "Privacy", href: "/privacy" },
		{ name: "Terms", href: "/terms" },
		{ name: "Security", href: "/security" },
		{ name: "Cookies", href: "/cookies" },
	],
};

export const SIMPLE_FOOTER_TECHNOLOGIES = [
	{ name: "Next.js" },
	{ name: "React" },
	{ name: "TypeScript" },
	{ name: "Tailwind" },
	{ name: "Prisma" },
];

// Simple Features Section
export const SIMPLE_FEATURES_DATA = [
	{
		icon: "lucide:zap",
		title: "Lightning Fast",
		description:
			"Built with Next.js 15 and optimized for performance. Your app loads instantly.",
		color: "text-yellow-500",
		bgColor: "bg-yellow-50 dark:bg-yellow-900/20",
	},
	{
		icon: "lucide:shield-check",
		title: "Secure by Default",
		description:
			"Enterprise-grade security with authentication, authorization, and data protection.",
		color: "text-green-500",
		bgColor: "bg-green-50 dark:bg-green-900/20",
	},
	{
		icon: "lucide:palette",
		title: "Beautiful UI",
		description:
			"Modern design system with Tailwind CSS and customizable components.",
		color: "text-purple-500",
		bgColor: "bg-purple-50 dark:bg-purple-900/20",
	},
	{
		icon: "lucide:database",
		title: "Database Ready",
		description:
			"Prisma ORM with PostgreSQL. Migrations and type-safe queries included.",
		color: "text-blue-500",
		bgColor: "bg-blue-50 dark:bg-blue-900/20",
	},
	{
		icon: "lucide:credit-card",
		title: "Payment Integration",
		description:
			"Stripe and Paddle integration for subscriptions and one-time payments.",
		color: "text-indigo-500",
		bgColor: "bg-indigo-50 dark:bg-indigo-900/20",
	},
	{
		icon: "lucide:brain",
		title: "AI Powered",
		description:
			"Built-in AI capabilities and integrations to enhance your application development.",
		color: "text-pink-500",
		bgColor: "bg-pink-50 dark:bg-pink-900/20",
	},
];

// Simple Pricing Section
export const SIMPLE_PRICING_FLOATING_ELEMENTS = [
	{ id: 1, size: "w-3 h-3", position: "top-16 left-12", delay: "0s" },
	{ id: 2, size: "w-2 h-2", position: "top-32 right-16", delay: "1.5s" },
	{ id: 3, size: "w-1 h-1", position: "bottom-40 left-20", delay: "3s" },
	{ id: 4, size: "w-2 h-2", position: "bottom-24 right-24", delay: "0.8s" },
	{ id: 5, size: "w-3 h-3", position: "top-1/2 left-8", delay: "2.2s" },
	{ id: 6, size: "w-1 h-1", position: "bottom-1/2 right-12", delay: "1.8s" },
];

export const SIMPLE_PRICING_PLANS = [
	{
		name: "Starter",
		price: "$99",
		originalPrice: "$330",
		period: "one-time",
		description: "Perfect for individual developers and small projects",
		features: [
			"Complete Next.js 15 starter",
			"Authentication system",
			"Database setup (Prisma)",
			"Basic UI components",
			"Email integration",
			"Documentation",
			"6 months updates",
		],
		popular: false,
		buttonText: "Get Started",
		buttonVariant: "outline" as const,
	},
	{
		name: "Pro",
		price: "$149",
		originalPrice: "$497",
		period: "one-time",
		description: "Best for growing businesses and teams",
		features: [
			"Everything in Starter",
			"Payment integration (Stripe)",
			"Admin dashboard",
			"User management",
			"Advanced components",
			"AI capabilities integration",
			"Priority support",
			"12 months updates",
		],
		popular: true,
		buttonText: "Choose Pro",
		buttonVariant: "default" as const,
	},
	{
		name: "Enterprise",
		price: "$299",
		originalPrice: "$997",
		period: "one-time",
		description: "For large teams and complex applications",
		features: [
			"Everything in Pro",
			"Multi-tenant architecture",
			"Advanced analytics",
			"Custom integrations",
			"White-label options",
			"Dedicated support",
			"Custom development",
			"Lifetime updates",
		],
		popular: false,
		buttonText: "Contact Sales",
		buttonVariant: "outline" as const,
	},
];

export const SIMPLE_PRICING_FAQ = [
	{
		question: "What's included in the starter kit?",
		answer:
			"Complete Next.js application with authentication, database setup, UI components, and comprehensive documentation.",
	},
	{
		question: "Do I get the source code?",
		answer:
			"Yes, you get full access to the source code with no restrictions. You can modify and use it for unlimited projects.",
	},
	{
		question: "Is there ongoing support?",
		answer:
			"Yes, we provide support via email and Discord. Pro and Enterprise plans include priority support.",
	},
	{
		question: "Can I use this for client projects?",
		answer:
			"Absolutely! You can use the starter kit for unlimited personal and client projects.",
	},
];

// ============================================================================
// INTERACTIVE FEATURES SECTION
// ============================================================================

export const INTERACTIVE_FEATURES_DATA = [
	{
		icon: "lucide:zap",
		title: "Lightning Fast Performance",
		description:
			"Built with Next.js 15 and optimized for speed. Experience blazing fast load times and smooth interactions.",
		stats: {
			value: "<100ms",
			label: "Load Time",
		},
		gradient: "from-yellow-400 to-orange-500",
		bgColor: "bg-yellow-50 dark:bg-yellow-900/20",
		iconColor: "text-yellow-600 dark:text-yellow-400",
	},
	{
		icon: "lucide:shield-check",
		title: "Enterprise Security",
		description:
			"Bank-level security with authentication, authorization, and data protection built-in from day one.",
		stats: {
			value: "99.9%",
			label: "Uptime",
		},
		gradient: "from-green-400 to-emerald-500",
		bgColor: "bg-green-50 dark:bg-green-900/20",
		iconColor: "text-green-600 dark:text-green-400",
	},
	{
		icon: "lucide:palette",
		title: "Beautiful Design System",
		description:
			"Modern UI components with Tailwind CSS v4 and Shadcn UI. Fully customizable and responsive.",
		stats: {
			value: "50+",
			label: "Components",
		},
		gradient: "from-purple-400 to-pink-500",
		bgColor: "bg-purple-50 dark:bg-purple-900/20",
		iconColor: "text-purple-600 dark:text-purple-400",
	},
	{
		icon: "lucide:database",
		title: "Type-Safe Database",
		description:
			"Prisma ORM with PostgreSQL ensures data integrity and provides excellent developer experience.",
		stats: {
			value: "100%",
			label: "Type Safe",
		},
		gradient: "from-blue-400 to-indigo-500",
		bgColor: "bg-blue-50 dark:bg-blue-900/20",
		iconColor: "text-blue-600 dark:text-blue-400",
	},
	{
		icon: "lucide:brain",
		title: "AI-Powered Features",
		description:
			"Access 400+ AI models from OpenAI, Anthropic, Google, and Meta. Unified API management with intelligent routing and cost optimization.",
		stats: {
			value: "400+",
			label: "AI Models",
		},
		gradient: "from-pink-400 to-rose-500",
		bgColor: "bg-pink-50 dark:bg-pink-900/20",
		iconColor: "text-pink-600 dark:text-pink-400",
	},
	{
		icon: "lucide:code-2",
		title: "Developer Experience",
		description:
			"Hot reload, TypeScript, ESLint, and Prettier configured. Focus on building, not setup.",
		stats: {
			value: "5min",
			label: "Setup",
		},
		gradient: "from-teal-400 to-cyan-500",
		bgColor: "bg-teal-50 dark:bg-teal-900/20",
		iconColor: "text-teal-600 dark:text-teal-400",
	},
];

export const INTERACTIVE_FEATURES_FLOATING_ICONS = [
	{
		icon: "lucide:sparkles",
		position: "top-20 left-16",
		delay: "0s",
		size: "w-6 h-6",
	},
	{
		icon: "lucide:star",
		position: "top-32 right-20",
		delay: "1s",
		size: "w-5 h-5",
	},
	{
		icon: "lucide:heart",
		position: "bottom-40 left-24",
		delay: "2s",
		size: "w-4 h-4",
	},
	{
		icon: "lucide:zap",
		position: "bottom-24 right-16",
		delay: "0.5s",
		size: "w-6 h-6",
	},
	{
		icon: "lucide:rocket",
		position: "top-1/2 left-12",
		delay: "1.5s",
		size: "w-5 h-5",
	},
	{
		icon: "lucide:crown",
		position: "bottom-1/2 right-20",
		delay: "2.5s",
		size: "w-4 h-4",
	},
];

export const INTERACTIVE_FEATURES_GRADIENT_ORBS = [
	{
		size: "w-32 h-32",
		position: "top-10 left-10",
		gradient: "from-purple-400/30 to-pink-400/30",
		blur: "blur-xl",
	},
	{
		size: "w-24 h-24",
		position: "top-20 right-20",
		gradient: "from-blue-400/20 to-cyan-400/20",
		blur: "blur-lg",
	},
	{
		size: "w-40 h-40",
		position: "bottom-20 left-20",
		gradient: "from-green-400/25 to-emerald-400/25",
		blur: "blur-2xl",
	},
	{
		size: "w-28 h-28",
		position: "bottom-32 right-16",
		gradient: "from-yellow-400/30 to-orange-400/30",
		blur: "blur-xl",
	},
];

// ============================================================================
// AI WORKFLOW SECTION
// ============================================================================

export const AI_WORKFLOW_DATA = {
	badge: {
		key: "aiModelsIntegration",
		icon: "Brain",
	},
	title: {
		key: "aiStarterKit",
		highlight: "corePilotAiStarterKit",
		subTitle: "nextJsOpenRouter",
	},
	description: {
		key: "professionalAiDescription",
	},
	features: [
		{
			key: "aiModelsIntegration",
			icon: "Zap",
			color: "text-yellow-600",
		},
		{
			key: "multiLanguageSupport",
			icon: "Bot",
			color: "text-blue-600",
		},
		{
			key: "enterpriseAuth",
			icon: "Target",
			color: "text-purple-600",
		},
		{
			key: "featureDrivenDevelopment",
			icon: "BarChart3",
			color: "text-indigo-600",
		},
	],
	buttons: {
		primary: {
			key: "startBuilding",
			icon: "Play",
		},
		secondary: {
			key: "viewFeatures",
			icon: "Target",
		},
	},
	video: {
		title: {
			key: "corePilotArchitecture",
		},
		description: {
			key: "modernStackAiIntegration",
		},
	},
};
