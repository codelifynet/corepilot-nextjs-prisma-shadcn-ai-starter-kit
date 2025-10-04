"use client";

import { useState } from "react";
import Link from "next/link";

import { Icon } from "@iconify/react";
import { Button } from "@/components/ui/button";
import {
	NavigationMenu,
	NavigationMenuContent,
	NavigationMenuItem,
	NavigationMenuLink,
	NavigationMenuList,
	NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { ThemeToggle } from "@/components/theme-toggle";
import { Logo } from "@/components/core-pilot-ui/logo";

const navigationItems = [
	{
		title: "Home",
		href: "/",
		icon: "lucide:home",
	},
	{
		title: "Legal",
		icon: "lucide:file-text",
		items: [
			{
				title: "Privacy Policy",
				href: "/legal/privacy",
				description: "How we collect, use, and protect your data",
				icon: "lucide:shield",
			},
			{
				title: "Terms of Service",
				href: "/legal/terms",
				description: "Terms and conditions for using our platform",
				icon: "lucide:file-text",
			},
		],
	},
];

export function Header() {
	const [isOpen, setIsOpen] = useState(false);

	return (
		<header className="sticky top-0 z-50 w-full border-b border-white/10 bg-white/80 dark:bg-zinc-950/80 backdrop-blur-xl">
			<div className="container mx-auto px-4">
				<div className="flex h-16 items-center justify-between">
					{/* Logo */}
					<Logo size="md" showBrand={true} showHoverEffects={true} />

					{/* Desktop Navigation */}
					<div className="hidden md:flex items-center space-x-8">
						<NavigationMenu>
							<NavigationMenuList>
								{navigationItems.map((item) => (
									<NavigationMenuItem key={item.title}>
										{item.items ? (
											<>
												<NavigationMenuTrigger className="bg-transparent hover:bg-white/50 dark:hover:bg-zinc-800/50">
													<Icon icon={item.icon} className="h-4 w-4 mr-2" />
													{item.title}
												</NavigationMenuTrigger>
												<NavigationMenuContent>
													<div className="grid w-[400px] gap-3 p-4">
														{item.items.map((subItem) => (
															<NavigationMenuLink key={subItem.title} asChild>
																<Link
																	href={subItem.href}
																	className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground"
																>
																	<div className="flex items-center space-x-2">
																		<Icon
																			icon={subItem.icon}
																			className="h-4 w-4"
																		/>
																		<div className="text-sm font-medium leading-none">
																			{subItem.title}
																		</div>
																	</div>
																	<p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
																		{subItem.description}
																	</p>
																</Link>
															</NavigationMenuLink>
														))}
													</div>
												</NavigationMenuContent>
											</>
										) : (
											<NavigationMenuLink asChild>
												<Link
													href={item.href}
													className="group inline-flex h-10 w-max items-center justify-center rounded-md bg-transparent px-4 py-2 text-sm font-medium transition-colors hover:bg-white/50 dark:hover:bg-zinc-800/50 hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground focus:outline-none disabled:pointer-events-none disabled:opacity-50"
												>
													<Icon icon={item.icon} className="h-4 w-4 mr-2" />
													{item.title}
												</Link>
											</NavigationMenuLink>
										)}
									</NavigationMenuItem>
								))}
							</NavigationMenuList>
						</NavigationMenu>

						{/* Theme Toggle */}
						<ThemeToggle />
					</div>

					{/* Mobile Navigation */}
					<div className="md:hidden flex items-center space-x-2">
						{/* Theme Toggle for Mobile */}
						<ThemeToggle />

						<Sheet open={isOpen} onOpenChange={setIsOpen}>
							<SheetTrigger asChild>
								<Button variant="ghost" size="icon">
									<Icon icon="lucide:menu" className="h-6 w-6" />
									<span className="sr-only">Toggle menu</span>
								</Button>
							</SheetTrigger>
							<SheetContent side="right" className="w-[300px] sm:w-[400px]">
								<div className="flex flex-col space-y-4 mt-8">
									{navigationItems.map((item) => (
										<div key={item.title} className="space-y-2">
											{item.items ? (
												<>
													<div className="flex items-center space-x-2 text-sm font-medium text-muted-foreground">
														<Icon icon={item.icon} className="h-4 w-4" />
														<span>{item.title}</span>
													</div>
													<div className="ml-6 space-y-2">
														{item.items.map((subItem) => (
															<Link
																key={subItem.title}
																href={subItem.href}
																onClick={() => setIsOpen(false)}
																className="flex items-center space-x-2 text-sm hover:text-foreground transition-colors"
															>
																<Icon icon={subItem.icon} className="h-4 w-4" />
																<span>{subItem.title}</span>
															</Link>
														))}
													</div>
												</>
											) : (
												<Link
													href={item.href}
													onClick={() => setIsOpen(false)}
													className="flex items-center space-x-2 text-sm hover:text-foreground transition-colors"
												>
													<Icon icon={item.icon} className="h-4 w-4" />
													<span>{item.title}</span>
												</Link>
											)}
										</div>
									))}
								</div>
							</SheetContent>
						</Sheet>
					</div>
				</div>
			</div>
		</header>
	);
}
