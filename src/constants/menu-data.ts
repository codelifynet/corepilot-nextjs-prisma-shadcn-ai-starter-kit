import { ADMIN_ROUTES } from "./paths";

export interface SubMenuItem {
	title: string;
	href?: string; // Optional URL - if empty, only toggles sub-menu
	subItems?: SubMenuItem[]; // Support for nested sub-menus
	isPro?: boolean; // Mark as pro feature
}

export interface MenuGroup {
	title: string;
	icon: string;
	gradient: string;
	tooltipColor?: string;
	tooltipArrowColor?: string;
	items: {
		title: string;
		icon: string;
		href?: string; // Optional URL - if empty, only toggles sub-menu
		subItems?: SubMenuItem[];
		isPro?: boolean; // Mark as pro feature
	}[];
}

export const menuGroups: MenuGroup[] = [
	{
		title: "Overview",
		icon: "lucide:layout-dashboard",
		gradient: "from-blue-500 to-indigo-600",
		tooltipColor: "bg-slate-900 text-slate-50 border-slate-200",
		tooltipArrowColor: "bg-slate-900 fill-slate-900",
		items: [
			{
				title: "Dashboard",
				icon: "lucide:layout-dashboard",
				href: ADMIN_ROUTES.OVERVIEW.DASHBOARD,
			},
			{
				title: "Analytics",
				icon: "lucide:trending-up",
				href: ADMIN_ROUTES.OVERVIEW.ANALYTICS,
				isPro: true,
			},
		],
	},
	{
		title: "E-Commerce",
		icon: "lucide:store",
		gradient: "from-emerald-400 to-green-500",
		tooltipColor: "bg-slate-900 text-slate-50 border-slate-200",
		tooltipArrowColor: "bg-slate-900 fill-slate-900",
		items: [
			{
				title: "Products",
				icon: "lucide:package",
				// No href - clicking will only toggle sub-menu
				isPro: true,
				subItems: [
					{
						title: "Product List",
						href: "/admin/ecommerce/products/list",
						isPro: true,
					},
					{
						title: "New Product",
						href: "/admin/ecommerce/products/create",
						isPro: true,
					},
					{
						title: "Product Categories",
						href: "/admin/ecommerce/products/categories",
						isPro: true,
					},
					{
						title: "Product Attributes",
						href: "/admin/ecommerce/products/attributes",
						isPro: true,
					},
				],
			},
			{
				title: "Categories",
				icon: "lucide:folder-tree",
				href: ADMIN_ROUTES.ECOMMERCE.CATEGORIES,
				isPro: true,
			},
			{
				title: "Orders",
				icon: "lucide:shopping-cart",
				isPro: true,
				subItems: [
					{
						title: "All Orders",
						href: "/admin/ecommerce/orders/list",
						isPro: true,
					},
					{
						title: "Pending Orders",
						href: "/admin/ecommerce/orders/pending",
						isPro: true,
					},
					{
						title: "Completed Orders",
						href: "/admin/ecommerce/orders/completed",
						isPro: true,
					},
					{
						title: "Cancelled Orders",
						href: "/admin/ecommerce/orders/cancelled",
						isPro: true,
					},
				],
			},
			{
				title: "Inventory Management",
				icon: "lucide:warehouse",
				href: ADMIN_ROUTES.ECOMMERCE.INVENTORY,
				isPro: true,
			},
			{
				title: "Coupons",
				icon: "lucide:ticket",
				href: ADMIN_ROUTES.ECOMMERCE.COUPONS,
				isPro: true,
			},
			{
				title: "Campaigns",
				icon: "lucide:megaphone",
				href: ADMIN_ROUTES.ECOMMERCE.CAMPAIGNS,
				isPro: true,
			},
		],
	},
	{
		title: "User Management",
		icon: "lucide:users",
		gradient: "from-purple-500 to-pink-500",
		tooltipColor: "bg-slate-900 text-slate-50 border-slate-200",
		tooltipArrowColor: "bg-slate-900 fill-slate-900",
		items: [
			{
				title: "Users",
				icon: "lucide:users",
				href: ADMIN_ROUTES.USER_MANAGEMENT.USERS,
			},
			{
				title: "Roles",
				icon: "lucide:shield-check",
				href: ADMIN_ROUTES.USER_MANAGEMENT.ROLES,
			},
			{
				title: "Customer",
				icon: "lucide:users-2",
				href: ADMIN_ROUTES.USER_MANAGEMENT.CUSTOMERS,
				isPro: true,
			},
		],
	},
	{
		title: "Content Management",
		icon: "lucide:file-text",
		gradient: "from-orange-400 to-red-500",
		tooltipColor: "bg-slate-900 text-slate-50 border-slate-200",
		tooltipArrowColor: "bg-slate-900 fill-slate-900",
		items: [
			{
				title: "Content",
				icon: "lucide:file-text",
				href: ADMIN_ROUTES.CONTENT_MANAGEMENT.CONTENT,
				isPro: true,
				subItems: [
					{
						title: "Blog Posts",
						href: "/admin/content-management/content/blog-posts",
						isPro: true,
					},
					{
						title: "Pages",
						href: "/admin/content-management/content/pages",
						isPro: true,
					},
					{
						title: "Categories",
						href: "/admin/content-management/content/categories",
						isPro: true,
					},
					{
						title: "Tags",
						href: "/admin/content-management/content/tags",
						isPro: true,
					},
				],
			},
			{
				title: "Pages",
				icon: "lucide:file",
				href: ADMIN_ROUTES.CONTENT_MANAGEMENT.PAGES,
				isPro: true,
			},
			{
				title: "Media Library",
				icon: "lucide:images",
				href: ADMIN_ROUTES.CONTENT_MANAGEMENT.MEDIA,
				isPro: true,
			},
			{
				title: "Comments",
				icon: "lucide:message-square",
				href: ADMIN_ROUTES.CONTENT_MANAGEMENT.COMMENTS,
				isPro: true,
			},
			{
				title: "Menu Management",
				icon: "lucide:menu",
				href: ADMIN_ROUTES.CONTENT_MANAGEMENT.MENU,
				isPro: true,
			},
		],
	},
	{
		title: "AI Tools",
		icon: "lucide:brain",
		gradient: "from-teal-400 to-blue-500",
		tooltipColor: "bg-slate-900 text-slate-50 border-slate-200",
		tooltipArrowColor: "bg-slate-900 fill-slate-900",
		items: [
			{
				title: "AI Content Generator",
				icon: "lucide:bot",
				href: ADMIN_ROUTES.AI_TOOLS.CONTENT_GENERATOR,
				isPro: true,
			},
			{
				title: "AI Image Generator",
				icon: "lucide:image",
				href: ADMIN_ROUTES.AI_TOOLS.IMAGE_GENERATOR,
				isPro: true,
			},
			{
				title: "AI Chat Assistant",
				icon: "lucide:message-circle",
				href: ADMIN_ROUTES.AI_TOOLS.CHAT_ASSISTANT,
				isPro: true,
			},
			{
				title: "AI Settings",
				icon: "lucide:settings",
				href: ADMIN_ROUTES.AI_TOOLS.SETTINGS,
				isPro: true,
			},
		],
	},
	{
		title: "Finance",
		icon: "lucide:credit-card",
		gradient: "from-yellow-400 to-orange-500",
		tooltipColor: "bg-slate-900 text-slate-50 border-slate-200",
		tooltipArrowColor: "bg-slate-900 fill-slate-900",
		items: [
			{
				title: "Payment History",
				icon: "lucide:credit-card",
				href: ADMIN_ROUTES.FINANCE.PAYMENTS,
				isPro: true,
			},
			{
				title: "Subscriptions",
				icon: "lucide:calendar",
				href: ADMIN_ROUTES.FINANCE.SUBSCRIPTIONS,
				isPro: true,
			},
			{
				title: "Payment Settings",
				icon: "lucide:settings",
				href: ADMIN_ROUTES.FINANCE.SETTINGS,
				isPro: true,
			},
		],
	},
	{
		title: "System",
		icon: "lucide:cog",
		gradient: "from-gray-500 to-gray-700",
		tooltipColor: "bg-slate-900 text-slate-50 border-slate-200",
		tooltipArrowColor: "bg-slate-900 fill-slate-900",
		items: [
			{
				title: "Site Settings",
				icon: "lucide:settings",
				href: ADMIN_ROUTES.SYSTEM.SITE_SETTINGS,
			},
			{
				title: "Social Settings",
				icon: "lucide:share-2",
				href: ADMIN_ROUTES.SYSTEM.SOCIAL_SETTINGS,
			},
			{
				title: "SEO Settings",
				icon: "lucide:search",
				href: ADMIN_ROUTES.SYSTEM.SEO_SETTINGS,
				isPro: true,
			},
			{
				title: "Notifications",
				icon: "lucide:bell",
				href: ADMIN_ROUTES.SYSTEM.NOTIFICATIONS,
				isPro: true,
			},
			{
				title: "Logs",
				icon: "lucide:file-bar-chart",
				href: ADMIN_ROUTES.SYSTEM.LOGS,
				isPro: true,
			},
			{
				title: "Support / Help",
				icon: "lucide:help-circle",
				href: ADMIN_ROUTES.SYSTEM.SUPPORT.BASE,
				isPro: true,
			},
		],
	},
];
