"use client";

import Link from "next/link";
import { Icon } from "@iconify/react";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";

const footerLinks = {
	product: [
		{ name: "Home", href: "/", icon: "lucide:home" },
		{ name: "Features", href: "/#features" },
		{ name: "Pricing", href: "/#pricing" },
	],
	legal: [
		{ name: "Privacy Policy", href: "/legal/privacy", icon: "lucide:shield" },
		{
			name: "Terms of Service",
			href: "/legal/terms",
			icon: "lucide:file-text",
		},
	],
	social: [
		{ name: "GitHub", href: "https://github.com", icon: "lucide:github" },
		{ name: "Twitter", href: "https://twitter.com", icon: "lucide:twitter" },
		{ name: "Email", href: "mailto:hello@corepilot.dev", icon: "lucide:mail" },
	],
};

export function Footer() {
	return (
		<footer className="border-t border-white/10 bg-white/50 dark:bg-zinc-950/50 backdrop-blur-xl">
			<div className="container mx-auto px-4 py-12">
				<div className="grid grid-cols-1 md:grid-cols-4 gap-8">
					{/* Brand */}
					<div className="space-y-4">
						<Link href="/" className="flex items-center space-x-2">
							<div className="h-8 w-8 rounded-lg bg-gradient-to-br from-rose-500 to-orange-500" />
							<span className="text-xl font-bold bg-gradient-to-r from-zinc-900 to-zinc-600 dark:from-zinc-100 dark:to-zinc-400 bg-clip-text text-transparent">
								CorePilot
							</span>
						</Link>
						<p className="text-sm text-muted-foreground max-w-xs">
							Modern web application starter template with Next.js, Prisma,
							Better Auth, and TailwindCSS.
						</p>
						<div className="flex space-x-2">
							{footerLinks.social.map((item) => (
								<Button key={item.name} variant="ghost" size="icon" asChild>
									<Link
										href={item.href}
										target="_blank"
										rel="noopener noreferrer"
									>
										<Icon icon={item.icon} className="h-4 w-4" />
										<span className="sr-only">{item.name}</span>
									</Link>
								</Button>
							))}
						</div>
					</div>

					{/* Product */}
					<div className="space-y-4">
						<h3 className="text-sm font-semibold text-foreground">Product</h3>
						<ul className="space-y-2">
							{footerLinks.product.map((item) => (
								<li key={item.name}>
									<Link
										href={item.href}
										className="text-sm text-muted-foreground hover:text-foreground transition-colors flex items-center space-x-2"
									>
										{item.icon && <Icon icon={item.icon} className="h-3 w-3" />}
										<span>{item.name}</span>
									</Link>
								</li>
							))}
						</ul>
					</div>

					{/* Legal */}
					<div className="space-y-4">
						<h3 className="text-sm font-semibold text-foreground">Legal</h3>
						<ul className="space-y-2">
							{footerLinks.legal.map((item) => (
								<li key={item.name}>
									<Link
										href={item.href}
										className="text-sm text-muted-foreground hover:text-foreground transition-colors flex items-center space-x-2"
									>
										{item.icon && <Icon icon={item.icon} className="h-3 w-3" />}
										<span>{item.name}</span>
									</Link>
								</li>
							))}
						</ul>
					</div>

					{/* Contact */}
					<div className="space-y-4">
						<h3 className="text-sm font-semibold text-foreground">Contact</h3>
						<div className="space-y-2">
							<p className="text-sm text-muted-foreground">
								Have questions? We'd love to hear from you.
							</p>
							<Button variant="outline" size="sm" asChild>
								<Link href="mailto:hello@corepilot.dev">
									<Icon icon="lucide:mail" className="h-3 w-3 mr-2" />
									Get in touch
								</Link>
							</Button>
						</div>
					</div>
				</div>

				<Separator className="my-8" />

				{/* Bottom */}
				<div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
					<div className="flex items-center space-x-1 text-sm text-muted-foreground">
						<span>© {new Date().getFullYear()} CorePilot. Made with</span>
						<Icon
							icon="lucide:heart"
							className="h-3 w-3 text-red-500 fill-current"
						/>
						<span>in Example City, Example Country.</span>
					</div>
					<div className="text-sm text-muted-foreground">
						<span>GDPR & KVKK Compliant</span>
					</div>
				</div>
			</div>
		</footer>
	);
}
