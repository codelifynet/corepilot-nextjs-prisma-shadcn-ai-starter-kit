"use client";

import Link from "next/link";
import { Icon } from "@iconify/react";
import { poppins } from "@/lib/fonts";
import {
	Drawer,
	DrawerClose,
	DrawerContent,
	DrawerDescription,
	DrawerFooter,
	DrawerHeader,
	DrawerTitle,
	DrawerTrigger,
} from "@/components/ui/drawer";
import {
	NavigationMenu,
	NavigationMenuContent,
	NavigationMenuItem,
	NavigationMenuLink,
	NavigationMenuList,
	NavigationMenuTrigger,
	navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import { cn } from "@/lib/utils";
import { ThemeToggle } from "@/components/theme-toggle";
import { LanguageSwitcher } from "@/components/ui/language-switcher";
import { useTranslations } from "next-intl";
import { usePathname } from "next/navigation";

const starterKits = [
	{
		title: "E-Commerce Kit",
		description: "Complete online store solution with payment integration",
		technologies: ["Next.js", "Stripe", "Prisma", "TailwindCSS"],
		icon: "tabler:shopping-cart",
		href: "/starter-kits/ecommerce",
		status: "Ready",
		featured: true,
	},
	{
		title: "SaaS Dashboard",
		description: "Modern dashboard with analytics and user management",
		technologies: ["Next.js", "Chart.js", "Auth.js", "PostgreSQL"],
		icon: "tabler:dashboard",
		href: "/starter-kits/saas",
		status: "Ready",
		featured: true,
	},
	{
		title: "Blog Platform",
		description: "Content management system with markdown support",
		technologies: ["Next.js", "MDX", "Contentful", "Vercel"],
		icon: "tabler:article",
		href: "/starter-kits/blog",
		status: "Coming Soon",
		featured: false,
	},
	{
		title: "Portfolio Site",
		description: "Professional portfolio with project showcase",
		technologies: ["Next.js", "Framer Motion", "Sanity", "Netlify"],
		icon: "tabler:briefcase",
		href: "/starter-kits/portfolio",
		status: "Coming Soon",
		featured: false,
	},
	{
		title: "Learning Platform",
		description: "Online course platform with video streaming",
		technologies: ["Next.js", "Video.js", "Supabase", "Stripe"],
		icon: "tabler:school",
		href: "/starter-kits/learning",
		status: "Coming Soon",
		featured: false,
	},
	{
		title: "Social Network",
		description: "Social media platform with real-time features",
		technologies: ["Next.js", "Socket.io", "Redis", "MongoDB"],
		icon: "tabler:users",
		href: "/starter-kits/social",
		status: "Coming Soon",
		featured: false,
	},
];

export default function Navbar() {
	const t = useTranslations("navbar");
	const pathname = usePathname();

	console.log(pathname);
	return (
		<div className="fixed top-0 left-0 w-full z-[100]">
			{/* Üstte sabit duyuru barı */}
			<div className="w-full bg-gradient-to-r from-[#a000ff] via-[#c000d0] to-[#ff006f] text-white text-sm py-3 px-3 text-center flex items-center justify-center font-semibold tracking-wide shadow-lg backdrop-blur-sm">
				<div className="flex items-center space-x-2 animate-pulse">
					<Icon icon="tabler:sparkles" className="w-4 h-4" />
					<span>
						{t("announcement.newYearSale")}
						<Link
							href="/pricing"
							className="underline font-bold ml-2 hover:text-yellow-200 transition-colors"
						>
							{t("announcement.details")}
						</Link>
					</span>
					<Icon icon="tabler:sparkles" className="w-4 h-4" />
				</div>
			</div>
			{/* Navbar, duyuru barının hemen altında */}
			<header className="w-full bg-white/98 dark:bg-gray-900/98 backdrop-blur-md border-b border-gray-200/50 dark:border-gray-700/50 shadow-xl transition-all duration-300">
				<div className="xl:container mx-auto px-4 sm:px-6 lg:px-8">
					<div className="flex items-center justify-between h-16 sm:h-18 lg:h-20">
						<Link
							href="/"
							className="group flex items-center space-x-2 sm:space-x-3 hover:scale-105 transition-all duration-300"
						>
							<div className="p-1.5 sm:p-2 lg:p-2.5 bg-gradient-to-br from-[#a000ff] to-[#ff006f] rounded-lg sm:rounded-xl lg:rounded-2xl shadow-lg group-hover:shadow-xl group-hover:shadow-[#a000ff]/20 transition-all duration-300">
								<Icon
									icon="tabler:heart-filled"
									className="h-4 w-4 sm:h-5 sm:w-5 lg:h-7 lg:w-7 text-white group-hover:scale-110 group-hover:rotate-6 transition-all duration-300"
								/>
							</div>
							<div className={`flex flex-col ${poppins.className}`}>
								<span className="text-lg sm:text-xl lg:text-2xl font-bold text-gray-900 dark:text-white tracking-tight leading-tight group-hover:text-[#a000ff] transition-colors duration-300">
									{t("brand")}
								</span>
								<span className="text-xs bg-gradient-to-r from-[#a000ff] to-[#ff006f] text-transparent bg-clip-text font-medium tracking-wider">
									{t("subtitle")}
								</span>
							</div>
						</Link>

						<NavigationMenu className={`hidden lg:flex ${poppins.className}`}>
							<NavigationMenuList className="space-x-2">
								{/* Starter Kits - Dropdown */}
								<NavigationMenuItem className="group">
									<NavigationMenuTrigger className="flex items-center space-x-2 text-slate-700 dark:text-slate-300 hover:text-[#a000ff] dark:hover:text-[#a000ff] font-medium transition-colors duration-300 text-sm md:text-sm lg:text-base bg-transparent hover:bg-transparent data-[state=open]:bg-transparent data-[active]:bg-transparent focus:bg-transparent">
										<Icon
											icon="tabler:rocket"
											className="w-5 h-5 text-slate-700 dark:text-slate-300 group-hover:text-[#a000ff] dark:group-hover:text-[#a000ff] transition-colors duration-300"
										/>
										<span>Starter Kits</span>
									</NavigationMenuTrigger>
									<NavigationMenuContent>
										<div className="w-[800px] p-6">
											<div className="mb-4">
												<h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
													{t("starterKitCollection")}
												</h3>
												<p className="text-sm text-gray-600 dark:text-gray-400">
													{t("starterKitsDescription")}
												</p>
											</div>
											<div className="grid grid-cols-2 gap-4">
												{starterKits.map((kit) => (
													<Link
														key={kit.title}
														href={kit.href}
														className="group block p-4 rounded-lg border border-gray-200 dark:border-gray-700 hover:border-[#a000ff]/30 hover:shadow-md transition-all duration-200"
													>
														<div className="flex items-start space-x-3">
															<div className="p-2 bg-gradient-to-br from-[#a000ff]/10 to-[#ff006f]/10 rounded-lg group-hover:from-[#a000ff]/20 group-hover:to-[#ff006f]/20 transition-all duration-200">
																<Icon
																	icon={kit.icon}
																	className="w-5 h-5 text-[#a000ff]"
																/>
															</div>
															<div className="flex-1 min-w-0">
																<div className="flex items-center justify-between mb-1">
																	<h4 className="text-sm font-semibold text-gray-900 dark:text-white group-hover:text-[#a000ff] transition-colors">
																		{kit.title}
																	</h4>
																	<span
																		className={`text-xs px-2 py-1 rounded-full ${
																			kit.status === "Ready"
																				? "bg-green-100 dark:bg-green-900 text-green-700 dark:text-green-300"
																				: "bg-yellow-100 dark:bg-yellow-900 text-yellow-700 dark:text-yellow-300"
																		}`}
																	>
																		{kit.status}
																	</span>
																</div>
																<p className="text-xs text-gray-600 dark:text-gray-400 mb-2 line-clamp-2">
																	{kit.description}
																</p>
																<div className="flex flex-wrap gap-1">
																	{kit.technologies.slice(0, 3).map((tech) => (
																		<span
																			key={tech}
																			className="text-xs px-2 py-1 bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 rounded-md"
																		>
																			{tech}
																		</span>
																	))}
																	{kit.technologies.length > 3 && (
																		<span className="text-xs px-2 py-1 bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 rounded-md">
																			+{kit.technologies.length - 3}
																		</span>
																	)}
																</div>
															</div>
														</div>
													</Link>
												))}
											</div>
											<div className="mt-6 pt-4 border-t border-gray-200 dark:border-gray-700">
												<Link
													href="/starter-kits"
													className="inline-flex items-center space-x-2 text-sm font-medium text-[#a000ff] hover:text-[#8f00e6] transition-colors"
												>
													<span>{t("viewAllStarterKits")}</span>
													<Icon
														icon="tabler:arrow-right"
														className="w-5 h-5 group-hover:translate-x-1 transition-all duration-200"
													/>
												</Link>
											</div>
										</div>
									</NavigationMenuContent>
								</NavigationMenuItem>

								{/* Features - Dropdown */}
								<NavigationMenuItem className="group">
									<NavigationMenuTrigger className="flex items-center space-x-2 text-slate-700 dark:text-slate-300 hover:text-[#a000ff] dark:hover:text-[#a000ff] font-medium transition-colors duration-300 text-sm md:text-sm lg:text-base bg-transparent hover:bg-transparent data-[state=open]:bg-transparent data-[active]:bg-transparent focus:bg-transparent">
										<Icon
											icon="tabler:sparkles"
											className="w-5 h-5 text-slate-700 dark:text-slate-300 group-hover:text-[#a000ff] dark:group-hover:text-[#a000ff] transition-colors duration-300"
										/>
										<span>{t("features")}</span>
									</NavigationMenuTrigger>
									<NavigationMenuContent>
										<div className="w-[500px] p-6">
											<div className="mb-4">
												<h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
													{t("coreFeatures")}
												</h3>
												<p className="text-sm text-gray-600 dark:text-gray-400">
													{t("coreFeaturesDescription")}
												</p>
											</div>
											<div className="grid grid-cols-2 gap-4">
												<div className="group p-4 rounded-lg border border-gray-200 dark:border-gray-700 hover:border-[#a000ff]/30 hover:shadow-md transition-all duration-200">
													<div className="flex items-start space-x-3">
														<div className="p-2 bg-gradient-to-br from-blue-500/10 to-blue-600/10 rounded-lg group-hover:from-blue-500/20 group-hover:to-blue-600/20 transition-all duration-200">
															<Icon
																icon="tabler:shield-check"
																className="w-5 h-5 text-blue-600 dark:text-blue-400"
															/>
														</div>
														<div>
															<h4 className="text-sm font-semibold text-gray-900 dark:text-white mb-1">
																Authentication
															</h4>
															<p className="text-xs text-gray-600 dark:text-gray-400">
																Secure user auth with multiple providers
															</p>
														</div>
													</div>
												</div>
												<div className="group p-4 rounded-lg border border-gray-200 dark:border-gray-700 hover:border-[#a000ff]/30 hover:shadow-md transition-all duration-200">
													<div className="flex items-start space-x-3">
														<div className="p-2 bg-gradient-to-br from-green-500/10 to-green-600/10 rounded-lg group-hover:from-green-500/20 group-hover:to-green-600/20 transition-all duration-200">
															<Icon
																icon="tabler:database"
																className="w-5 h-5 text-green-600 dark:text-green-400"
															/>
														</div>
														<div>
															<h4 className="text-sm font-semibold text-gray-900 dark:text-white mb-1">
																Database
															</h4>
															<p className="text-xs text-gray-600 dark:text-gray-400">
																Ready-to-use schemas and migrations
															</p>
														</div>
													</div>
												</div>
												<div className="group p-4 rounded-lg border border-gray-200 dark:border-gray-700 hover:border-[#a000ff]/30 hover:shadow-md transition-all duration-200">
													<div className="flex items-start space-x-3">
														<div className="p-2 bg-gradient-to-br from-purple-500/10 to-purple-600/10 rounded-lg group-hover:from-purple-500/20 group-hover:to-purple-600/20 transition-all duration-200">
															<Icon
																icon="tabler:credit-card"
																className="w-5 h-5 text-purple-600 dark:text-purple-400"
															/>
														</div>
														<div>
															<h4 className="text-sm font-semibold text-gray-900 dark:text-white mb-1">
																Payments
															</h4>
															<p className="text-xs text-gray-600 dark:text-gray-400">
																Integrated payment solutions
															</p>
														</div>
													</div>
												</div>
												<div className="group p-4 rounded-lg border border-gray-200 dark:border-gray-700 hover:border-[#a000ff]/30 hover:shadow-md transition-all duration-200">
													<div className="flex items-start space-x-3">
														<div className="p-2 bg-gradient-to-br from-orange-500/10 to-orange-600/10 rounded-lg group-hover:from-orange-500/20 group-hover:to-orange-600/20 transition-all duration-200">
															<Icon
																icon="tabler:palette"
																className="w-5 h-5 text-orange-600 dark:text-orange-400"
															/>
														</div>
														<div>
															<h4 className="text-sm font-semibold text-gray-900 dark:text-white mb-1">
																UI Components
															</h4>
															<p className="text-xs text-gray-600 dark:text-gray-400">
																Beautiful, accessible components
															</p>
														</div>
													</div>
												</div>
											</div>
										</div>
									</NavigationMenuContent>
								</NavigationMenuItem>

								{/* Resources - Dropdown */}
								<NavigationMenuItem className="group">
									<NavigationMenuTrigger className="flex items-center space-x-2 text-slate-700 dark:text-slate-300 hover:text-[#a000ff] dark:hover:text-[#a000ff] font-medium transition-colors duration-300 text-sm md:text-sm lg:text-base bg-transparent hover:bg-transparent data-[state=open]:bg-transparent data-[active]:bg-transparent focus:bg-transparent">
										<Icon
											icon="tabler:book"
											className="w-5 h-5 text-slate-700 dark:text-slate-300 group-hover:text-[#a000ff] dark:group-hover:text-[#a000ff] transition-colors duration-300"
										/>
										<span>{t("resources")}</span>
									</NavigationMenuTrigger>
									<NavigationMenuContent>
										<div className="w-[450px] p-6">
											<div className="mb-4">
												<h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
													{t("learningResources")}
												</h3>
												<p className="text-sm text-gray-600 dark:text-gray-400">
													{t("learningResourcesDescription")}
												</p>
											</div>
											<div className="space-y-3">
												<div className="group p-4 rounded-lg border border-gray-200 dark:border-gray-700 hover:border-[#a000ff]/30 hover:shadow-md transition-all duration-200">
													<div className="flex items-start space-x-3">
														<div className="p-2 bg-gradient-to-br from-blue-500/10 to-blue-600/10 rounded-lg group-hover:from-blue-500/20 group-hover:to-blue-600/20 transition-all duration-200">
															<Icon
																icon="tabler:book-2"
																className="w-5 h-5 text-blue-600 dark:text-blue-400"
															/>
														</div>
														<div className="flex-1">
															<h4 className="text-sm font-semibold text-gray-900 dark:text-white mb-1">
																Documentation
															</h4>
															<p className="text-xs text-gray-600 dark:text-gray-400">
																Complete guides and API references
															</p>
														</div>
														<Icon
															icon="tabler:external-link"
															className="w-4 h-4 text-gray-400 group-hover:text-[#a000ff] transition-colors"
														/>
													</div>
												</div>
												<div className="group p-4 rounded-lg border border-gray-200 dark:border-gray-700 hover:border-[#a000ff]/30 hover:shadow-md transition-all duration-200">
													<div className="flex items-start space-x-3">
														<div className="p-2 bg-gradient-to-br from-green-500/10 to-green-600/10 rounded-lg group-hover:from-green-500/20 group-hover:to-green-600/20 transition-all duration-200">
															<Icon
																icon="tabler:video"
																className="w-5 h-5 text-green-600 dark:text-green-400"
															/>
														</div>
														<div className="flex-1">
															<h4 className="text-sm font-semibold text-gray-900 dark:text-white mb-1">
																Tutorials
															</h4>
															<p className="text-xs text-gray-600 dark:text-gray-400">
																Step-by-step video tutorials
															</p>
														</div>
														<Icon
															icon="tabler:external-link"
															className="w-4 h-4 text-gray-400 group-hover:text-[#a000ff] transition-colors"
														/>
													</div>
												</div>
												<div className="group p-4 rounded-lg border border-gray-200 dark:border-gray-700 hover:border-[#a000ff]/30 hover:shadow-md transition-all duration-200">
													<div className="flex items-start space-x-3">
														<div className="p-2 bg-gradient-to-br from-purple-500/10 to-purple-600/10 rounded-lg group-hover:from-purple-500/20 group-hover:to-purple-600/20 transition-all duration-200">
															<Icon
																icon="tabler:code"
																className="w-5 h-5 text-purple-600 dark:text-purple-400"
															/>
														</div>
														<div className="flex-1">
															<h4 className="text-sm font-semibold text-gray-900 dark:text-white mb-1">
																Examples
															</h4>
															<p className="text-xs text-gray-600 dark:text-gray-400">
																Real-world code examples
															</p>
														</div>
														<Icon
															icon="tabler:external-link"
															className="w-4 h-4 text-gray-400 group-hover:text-[#a000ff] transition-colors"
														/>
													</div>
												</div>
												<div className="group p-4 rounded-lg border border-gray-200 dark:border-gray-700 hover:border-[#a000ff]/30 hover:shadow-md transition-all duration-200">
													<div className="flex items-start space-x-3">
														<div className="p-2 bg-gradient-to-br from-orange-500/10 to-orange-600/10 rounded-lg group-hover:from-orange-500/20 group-hover:to-orange-600/20 transition-all duration-200">
															<Icon
																icon="tabler:users"
																className="w-5 h-5 text-orange-600 dark:text-orange-400"
															/>
														</div>
														<div className="flex-1">
															<h4 className="text-sm font-semibold text-gray-900 dark:text-white mb-1">
																Community
															</h4>
															<p className="text-xs text-gray-600 dark:text-gray-400">
																Join our Discord community
															</p>
														</div>
														<Icon
															icon="tabler:external-link"
															className="w-4 h-4 text-gray-400 group-hover:text-[#a000ff] transition-colors"
														/>
													</div>
												</div>
											</div>
										</div>
									</NavigationMenuContent>
								</NavigationMenuItem>

								{/* Simple Links */}
								<NavigationMenuItem className="group">
									<NavigationMenuLink asChild>
										<Link
											href="#pricing"
											className={cn(
												navigationMenuTriggerStyle(),
												"flex items-center space-x-2 text-slate-700 dark:text-slate-300 hover:text-[#a000ff] dark:hover:text-[#a000ff] font-medium transition-colors duration-300 text-sm md:text-sm lg:text-base bg-transparent hover:bg-transparent",
											)}
										>
											<Icon
												icon="tabler:tag"
												className="w-5 h-5 text-slate-700 dark:text-slate-300 group-hover:text-[#a000ff] dark:group-hover:text-[#a000ff] transition-colors duration-300"
											/>
											<span>{t("pricing")}</span>
										</Link>
									</NavigationMenuLink>
								</NavigationMenuItem>
							</NavigationMenuList>
						</NavigationMenu>

						<div className="hidden lg:flex items-center space-x-3">
							<LanguageSwitcher />
							<ThemeToggle />
							<Link
								href="/pricing"
								className="group flex items-center space-x-1.5 px-4 lg:px-4 xl:px-5 py-2.5 bg-gradient-to-r from-[#a000ff] to-[#ff006f] hover:from-[#8f00e6] hover:to-[#e6005c] text-white font-semibold rounded-xl transition-all duration-200 shadow-md border-0 animate-glow text-sm lg:text-sm xl:text-base"
							>
								<Icon
									icon="tabler:shopping-cart"
									className="w-5 h-5 lg:w-5 lg:h-5 xl:w-6 xl:h-6 group-hover:scale-110 transition-all duration-200"
								/>
								<span>{t("getStarted")}</span>
							</Link>
						</div>

						<Drawer>
							<DrawerTrigger asChild>
								<button
									type="button"
									className="lg:hidden p-2 text-gray-600 dark:text-gray-400 hover:text-[#a000ff] transition-colors rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800"
									aria-label="Toggle menu"
								>
									<Icon icon="tabler:menu-2" className="h-6 w-6" />
								</button>
							</DrawerTrigger>
							<DrawerContent className="bg-white dark:bg-gray-900">
								<DrawerHeader className="text-left">
									<DrawerTitle className="flex items-center space-x-2">
										<div className="p-2 bg-gradient-to-br from-[#a000ff] to-[#ff006f] rounded-xl">
											<Icon
												icon="tabler:heart-filled"
												className="h-5 w-5 text-white"
											/>
										</div>
										<span className="text-xl font-bold bg-gradient-to-r from-[#a000ff] to-[#ff006f] text-transparent bg-clip-text">
											CorePilot
										</span>
									</DrawerTitle>
									<DrawerDescription className="dark:text-gray-400">
										Get started with your projects quickly using the Next.js
										Starter Kit
									</DrawerDescription>
								</DrawerHeader>
								<div className="px-4 py-2 space-y-1">
									{/* Starter Kits Section */}
									<div className="mb-4">
										<div className="flex items-center space-x-2 py-2 px-3 text-gray-800 dark:text-white font-semibold">
											<Icon
												icon="tabler:rocket"
												className="w-6 h-6 text-[#a000ff] group-hover:scale-125 group-hover:rotate-12 transition-all duration-300 ease-out"
											/>
											<span>Starter Kits</span>
										</div>
										<div className="ml-4 space-y-1">
											{starterKits.slice(0, 4).map((kit) => (
												<DrawerClose key={kit.title} asChild>
													<Link
														href={kit.href}
														className="group flex items-center justify-between py-2 px-3 text-gray-600 dark:text-gray-400 hover:text-[#a000ff] hover:bg-gray-50 dark:hover:bg-gray-800 font-medium transition-all rounded-lg"
													>
														<div className="flex items-center space-x-3">
															<Icon
																icon={kit.icon}
																className="w-5 h-5 group-hover:scale-110 transition-all duration-200"
															/>
															<span className="text-sm">{kit.title}</span>
														</div>
														<span
															className={`text-xs px-2 py-1 rounded-full ${
																kit.status === "Ready"
																	? "bg-green-100 dark:bg-green-900 text-green-700 dark:text-green-300"
																	: "bg-yellow-100 dark:bg-yellow-900 text-yellow-700 dark:text-yellow-300"
															}`}
														>
															{kit.status}
														</span>
													</Link>
												</DrawerClose>
											))}
											<DrawerClose asChild>
												<Link
													href="/starter-kits"
													className="group flex items-center space-x-3 py-2 px-3 text-[#a000ff] hover:bg-gray-50 dark:hover:bg-gray-800 font-medium transition-all rounded-lg"
												>
													<Icon icon="tabler:arrow-right" className="w-4 h-4" />
													<span className="text-sm">Tümünü Görüntüle</span>
												</Link>
											</DrawerClose>
										</div>
									</div>

									{/* Features Section */}
									<div className="mb-4">
										<div className="flex items-center space-x-2 py-2 px-3 text-gray-800 dark:text-white font-semibold">
											<Icon
												icon="tabler:sparkles"
												className="w-6 h-6 text-[#a000ff] group-hover:scale-125 group-hover:rotate-180 transition-all duration-500 ease-out"
											/>
											<span>{t("coreFeatures")}</span>
										</div>
										<div className="ml-4 space-y-1">
											<DrawerClose asChild>
												<Link
													href="#authentication"
													className="group flex items-center justify-between py-2 px-3 text-gray-600 dark:text-gray-400 hover:text-[#a000ff] hover:bg-gray-50 dark:hover:bg-gray-800 font-medium transition-all rounded-lg"
												>
													<div className="flex items-center space-x-3">
														<div className="p-1.5 bg-gradient-to-br from-blue-500/10 to-blue-600/10 rounded-lg">
															<Icon
																icon="tabler:shield-check"
																className="w-5 h-5 text-blue-600 dark:text-blue-400 group-hover:scale-110 transition-all duration-200"
															/>
														</div>
														<div>
															<span className="text-sm font-medium">
																Authentication
															</span>
															<p className="text-xs text-gray-500 dark:text-gray-500">
																Secure user auth
															</p>
														</div>
													</div>
													<Icon
														icon="tabler:chevron-right"
														className="w-5 h-5 group-hover:translate-x-1 transition-all duration-200"
													/>
												</Link>
											</DrawerClose>
											<DrawerClose asChild>
												<Link
													href="#database"
													className="group flex items-center justify-between py-2 px-3 text-gray-600 dark:text-gray-400 hover:text-[#a000ff] hover:bg-gray-50 dark:hover:bg-gray-800 font-medium transition-all rounded-lg"
												>
													<div className="flex items-center space-x-3">
														<div className="p-1.5 bg-gradient-to-br from-green-500/10 to-green-600/10 rounded-lg">
															<Icon
																icon="tabler:database"
																className="w-5 h-5 text-green-600 dark:text-green-400 group-hover:scale-110 transition-all duration-200"
															/>
														</div>
														<div>
															<span className="text-sm font-medium">
																Database
															</span>
															<p className="text-xs text-gray-500 dark:text-gray-500">
																Ready schemas
															</p>
														</div>
													</div>
													<Icon
														icon="tabler:chevron-right"
														className="w-4 h-4"
													/>
												</Link>
											</DrawerClose>
											<DrawerClose asChild>
												<Link
													href="#payments"
													className="group flex items-center justify-between py-2 px-3 text-gray-600 dark:text-gray-400 hover:text-[#a000ff] hover:bg-gray-50 dark:hover:bg-gray-800 font-medium transition-all rounded-lg"
												>
													<div className="flex items-center space-x-3">
														<div className="p-1.5 bg-gradient-to-br from-purple-500/10 to-purple-600/10 rounded-lg">
															<Icon
																icon="tabler:credit-card"
																className="w-5 h-5 text-purple-600 dark:text-purple-400 group-hover:scale-110 transition-all duration-200"
															/>
														</div>
														<div>
															<span className="text-sm font-medium">
																Payments
															</span>
															<p className="text-xs text-gray-500 dark:text-gray-500">
																Payment solutions
															</p>
														</div>
													</div>
													<Icon
														icon="tabler:chevron-right"
														className="w-4 h-4"
													/>
												</Link>
											</DrawerClose>
											<DrawerClose asChild>
												<Link
													href="#ui-components"
													className="group flex items-center justify-between py-2 px-3 text-gray-600 dark:text-gray-400 hover:text-[#a000ff] hover:bg-gray-50 dark:hover:bg-gray-800 font-medium transition-all rounded-lg"
												>
													<div className="flex items-center space-x-3">
														<div className="p-1.5 bg-gradient-to-br from-orange-500/10 to-orange-600/10 rounded-lg">
															<Icon
																icon="tabler:palette"
																className="w-5 h-5 text-orange-600 dark:text-orange-400 group-hover:scale-110 transition-all duration-200"
															/>
														</div>
														<div>
															<span className="text-sm font-medium">
																UI Components
															</span>
															<p className="text-xs text-gray-500 dark:text-gray-500">
																Beautiful components
															</p>
														</div>
													</div>
													<Icon
														icon="tabler:chevron-right"
														className="w-4 h-4"
													/>
												</Link>
											</DrawerClose>
										</div>
									</div>

									{/* Resources Section */}
									<div className="mb-4">
										<div className="flex items-center space-x-2 py-2 px-3 text-gray-800 dark:text-white font-semibold">
											<Icon
												icon="tabler:book"
												className="w-6 h-6 text-[#a000ff] group-hover:scale-125 group-hover:-rotate-12 transition-all duration-300 ease-out"
											/>
											<span>{t("learningResources")}</span>
										</div>
										<div className="ml-4 space-y-1">
											<DrawerClose asChild>
												<Link
													href="/docs"
													className="group flex items-center justify-between py-2 px-3 text-gray-600 dark:text-gray-400 hover:text-[#a000ff] hover:bg-gray-50 dark:hover:bg-gray-800 font-medium transition-all rounded-lg"
												>
													<div className="flex items-center space-x-3">
														<div className="p-1.5 bg-gradient-to-br from-blue-500/10 to-blue-600/10 rounded-lg">
															<Icon
																icon="tabler:book-2"
																className="w-5 h-5 text-blue-600 dark:text-blue-400 group-hover:scale-110 transition-all duration-200"
															/>
														</div>
														<div>
															<span className="text-sm font-medium">
																Documentation
															</span>
															<p className="text-xs text-gray-500 dark:text-gray-500">
																Complete guides
															</p>
														</div>
													</div>
													<Icon
														icon="tabler:external-link"
														className="w-5 h-5 group-hover:scale-110 group-hover:-rotate-12 transition-all duration-200"
													/>
												</Link>
											</DrawerClose>
											<DrawerClose asChild>
												<Link
													href="/tutorials"
													className="group flex items-center justify-between py-2 px-3 text-gray-600 dark:text-gray-400 hover:text-[#a000ff] hover:bg-gray-50 dark:hover:bg-gray-800 font-medium transition-all rounded-lg"
												>
													<div className="flex items-center space-x-3">
														<div className="p-1.5 bg-gradient-to-br from-green-500/10 to-green-600/10 rounded-lg">
															<Icon
																icon="tabler:video"
																className="w-5 h-5 text-green-600 dark:text-green-400 group-hover:scale-110 transition-all duration-200"
															/>
														</div>
														<div>
															<span className="text-sm font-medium">
																Tutorials
															</span>
															<p className="text-xs text-gray-500 dark:text-gray-500">
																Video tutorials
															</p>
														</div>
													</div>
													<Icon
														icon="tabler:external-link"
														className="w-4 h-4"
													/>
												</Link>
											</DrawerClose>
											<DrawerClose asChild>
												<Link
													href="/examples"
													className="group flex items-center justify-between py-2 px-3 text-gray-600 dark:text-gray-400 hover:text-[#a000ff] hover:bg-gray-50 dark:hover:bg-gray-800 font-medium transition-all rounded-lg"
												>
													<div className="flex items-center space-x-3">
														<div className="p-1.5 bg-gradient-to-br from-purple-500/10 to-purple-600/10 rounded-lg">
															<Icon
																icon="tabler:code"
																className="w-5 h-5 text-purple-600 dark:text-purple-400 group-hover:scale-110 transition-all duration-200"
															/>
														</div>
														<div>
															<span className="text-sm font-medium">
																Examples
															</span>
															<p className="text-xs text-gray-500 dark:text-gray-500">
																Code examples
															</p>
														</div>
													</div>
													<Icon
														icon="tabler:external-link"
														className="w-4 h-4"
													/>
												</Link>
											</DrawerClose>
											<DrawerClose asChild>
												<Link
													href="/community"
													className="group flex items-center justify-between py-2 px-3 text-gray-600 dark:text-gray-400 hover:text-[#a000ff] hover:bg-gray-50 dark:hover:bg-gray-800 font-medium transition-all rounded-lg"
												>
													<div className="flex items-center space-x-3">
														<div className="p-1.5 bg-gradient-to-br from-orange-500/10 to-orange-600/10 rounded-lg">
															<Icon
																icon="tabler:users"
																className="w-5 h-5 text-orange-600 dark:text-orange-400 group-hover:scale-110 transition-all duration-200"
															/>
														</div>
														<div>
															<span className="text-sm font-medium">
																Community
															</span>
															<p className="text-xs text-gray-500 dark:text-gray-500">
																Discord community
															</p>
														</div>
													</div>
													<Icon
														icon="tabler:external-link"
														className="w-4 h-4"
													/>
												</Link>
											</DrawerClose>
										</div>
									</div>

									{/* Contact Section */}
									<div className="mb-4">
										<div className="flex items-center space-x-2 py-2 px-3 text-gray-800 dark:text-white font-semibold">
											<Icon
												icon="tabler:mail"
												className="w-6 h-6 text-[#a000ff] group-hover:scale-125 group-hover:rotate-12 transition-all duration-300 ease-out"
											/>
											<span>{t("contactSupport")}</span>
										</div>
										<div className="ml-4 space-y-1">
											<DrawerClose asChild>
												<Link
													href="/contact"
													className="group flex items-center justify-between py-2 px-3 text-gray-600 dark:text-gray-400 hover:text-[#a000ff] hover:bg-gray-50 dark:hover:bg-gray-800 font-medium transition-all rounded-lg"
												>
													<div className="flex items-center space-x-3">
														<div className="p-1.5 bg-gradient-to-br from-blue-500/10 to-blue-600/10 rounded-lg">
															<Icon
																icon="tabler:message-circle"
																className="w-5 h-5 text-blue-600 dark:text-blue-400 group-hover:scale-110 transition-all duration-200"
															/>
														</div>
														<div>
															<span className="text-sm font-medium">
																Contact Us
															</span>
															<p className="text-xs text-gray-500 dark:text-gray-500">
																Get in touch
															</p>
														</div>
													</div>
													<Icon
														icon="tabler:external-link"
														className="w-4 h-4"
													/>
												</Link>
											</DrawerClose>
											<DrawerClose asChild>
												<Link
													href="/support"
													className="group flex items-center justify-between py-2 px-3 text-gray-600 dark:text-gray-400 hover:text-[#a000ff] hover:bg-gray-50 dark:hover:bg-gray-800 font-medium transition-all rounded-lg"
												>
													<div className="flex items-center space-x-3">
														<div className="p-1.5 bg-gradient-to-br from-green-500/10 to-green-600/10 rounded-lg">
															<Icon
																icon="tabler:help-circle"
																className="w-5 h-5 text-green-600 dark:text-green-400 group-hover:scale-110 transition-all duration-200"
															/>
														</div>
														<div>
															<span className="text-sm font-medium">
																Support Center
															</span>
															<p className="text-xs text-gray-500 dark:text-gray-500">
																Help & FAQ
															</p>
														</div>
													</div>
													<Icon
														icon="tabler:external-link"
														className="w-4 h-4"
													/>
												</Link>
											</DrawerClose>
											<DrawerClose asChild>
												<Link
													href="mailto:support@corepilot.com"
													className="group flex items-center justify-between py-2 px-3 text-gray-600 dark:text-gray-400 hover:text-[#a000ff] hover:bg-gray-50 dark:hover:bg-gray-800 font-medium transition-all rounded-lg"
												>
													<div className="flex items-center space-x-3">
														<div className="p-1.5 bg-gradient-to-br from-purple-500/10 to-purple-600/10 rounded-lg">
															<Icon
																icon="tabler:mail"
																className="w-5 h-5 text-purple-600 dark:text-purple-400 group-hover:scale-110 transition-all duration-200"
															/>
														</div>
														<div>
															<span className="text-sm font-medium">
																Email Support
															</span>
															<p className="text-xs text-gray-500 dark:text-gray-500">
																Direct email
															</p>
														</div>
													</div>
													<Icon
														icon="tabler:external-link"
														className="w-4 h-4"
													/>
												</Link>
											</DrawerClose>
										</div>
									</div>

									{/* Direct Links */}
									<DrawerClose asChild>
										<Link
											href="#pricing"
											className="group flex items-center space-x-3 py-3 px-3 text-gray-600 dark:text-gray-400 hover:text-[#a000ff] hover:bg-gray-50 dark:hover:bg-gray-800 font-medium transition-all rounded-lg"
										>
											<Icon
												icon="tabler:tag"
												className="w-6 h-6 group-hover:scale-125 group-hover:rotate-12 transition-all duration-300 ease-out"
											/>
											<span>{t("pricing")}</span>
										</Link>
									</DrawerClose>
									<DrawerClose asChild>
										<Link
											href="#demo"
											className="group flex items-center space-x-3 py-3 px-3 text-gray-600 dark:text-gray-400 hover:text-[#a000ff] hover:bg-gray-50 dark:hover:bg-gray-800 font-medium transition-all rounded-lg"
										>
											<Icon
												icon="tabler:device-desktop"
												className="w-6 h-6 group-hover:scale-125 group-hover:bounce transition-all duration-300 ease-out"
											/>
											<span>{t("demo")}</span>
										</Link>
									</DrawerClose>
								</div>
								<DrawerFooter className="pt-4 border-t border-gray-200 dark:border-gray-700">
									<div className="space-y-3">
										{/* Theme Toggle and Language Switcher for Mobile */}
										<div className="flex items-center justify-between py-2 px-3">
											<div className="flex items-center space-x-2">
												<Icon
													icon="tabler:palette"
													className="w-5 h-5 text-[#a000ff]"
												/>
												<span className="text-sm font-medium text-gray-700 dark:text-gray-300">
													{t("theme")}
												</span>
											</div>
											<ThemeToggle />
										</div>
										<div className="flex items-center justify-between py-2 px-3">
											<div className="flex items-center space-x-2">
												<Icon
													icon="tabler:world"
													className="w-5 h-5 text-[#a000ff]"
												/>
												<span className="text-sm font-medium text-gray-700 dark:text-gray-300">
													{t("language")}
												</span>
											</div>
											<LanguageSwitcher />
										</div>
										<DrawerClose asChild>
											<Link
												href="/pricing"
												className="hidden items-center justify-center space-x-2 w-full py-3 px-4 bg-gradient-to-r from-[#a000ff] to-[#ff006f] hover:from-[#8f00e6] hover:to-[#e6005c] text-white font-semibold rounded-lg transition-all duration-200 shadow-lg animate-glow"
											>
												<Icon icon="tabler:shopping-cart" className="w-5 h-5" />
												<span>{t("getStarted")}</span>
											</Link>
										</DrawerClose>
									</div>
								</DrawerFooter>
							</DrawerContent>
						</Drawer>
					</div>
				</div>
			</header>
		</div>
	);
}
