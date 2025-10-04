"use client";

import { motion } from "framer-motion";
import { Icon } from "@iconify/react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import Link from "next/link";

export default function TermsPage() {
	return (
		<div className="min-h-screen bg-gradient-to-br from-zinc-50 via-white to-rose-50 dark:from-zinc-950 dark:via-zinc-900 dark:to-zinc-950">
			<Header />
			<div className="container mx-auto px-4 py-12 max-w-4xl">
				<motion.div
					initial={{ opacity: 0, y: 20 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ duration: 0.6 }}
				>
					{/* Header */}
					<div className="mb-12">
						<div className="text-center mb-8">
							<Badge
								variant="secondary"
								className="px-4 py-2 mb-6 bg-white/60 dark:bg-zinc-800/60 backdrop-blur-sm"
							>
								<Icon icon="lucide:file-text" className="h-4 w-4 mr-2" />
								Legal Documents
							</Badge>

							<h1 className="text-4xl md:text-5xl font-bold text-zinc-900 dark:text-zinc-50 mb-4">
								Terms of Service
							</h1>
							<p className="text-xl text-zinc-600 dark:text-zinc-400">
								Last updated: {new Date().toLocaleDateString("en-US")}
							</p>
						</div>
					</div>

					{/* Content */}
					<motion.div
						initial={{ opacity: 0, y: 30 }}
						animate={{ opacity: 1, y: 0 }}
						transition={{ duration: 0.8, delay: 0.2 }}
						className="bg-white/70 dark:bg-zinc-900/70 backdrop-blur-xl rounded-3xl p-8 md:p-12 shadow-2xl border border-white/20 dark:border-zinc-700/30"
					>
						<div className="prose prose-zinc dark:prose-invert max-w-none">
							<h2>1. Introduction</h2>
							<p>
								These terms of service ("Terms") govern your use of the
								CorePilot platform ("Service"). By using this service, you agree
								to be bound by the following terms and conditions.
							</p>

							<h2>2. Service Description</h2>
							<p>
								CorePilot is a starter template platform for developing modern
								web applications. It includes Next.js, Prisma, Better Auth, and
								TailwindCSS technologies.
							</p>

							<h2>3. User Obligations</h2>
							<ul>
								<li>Provide accurate and up-to-date information</li>
								<li>Maintain the security of your account</li>
								<li>Not use the service for illegal activities</li>
								<li>Respect the rights of other users</li>
								<li>Avoid actions that threaten the security of the service</li>
							</ul>

							<h2>4. Intellectual Property Rights</h2>
							<p>
								All content, design, code, and materials on the platform are the
								intellectual property of CorePilot. Users have the right to use
								them only in their personal and commercial projects.
							</p>

							<h2>5. Privacy and Data Protection (GDPR Compliance)</h2>
							<p>
								We protect your personal data under the European Union General
								Data Protection Regulation (GDPR) and Example City, Example Country's Personal Data
								Protection Law (KVKK):
							</p>
							<ul>
								<li>Your data is used only for service provision</li>
								<li>
									Not shared with third parties (except legal obligations)
								</li>
								<li>You can delete your data at any time</li>
								<li>
									You have the right to information about data processing
									activities
								</li>
								<li>You have the right to data portability</li>
							</ul>

							<h2>6. Service Usage and Limitations</h2>
							<p>
								When using our service, you must comply with the following
								rules:
							</p>
							<ul>
								<li>Do not send spam or unwanted content</li>
								<li>
									Do not attempt to hack the system or search for security
									vulnerabilities
								</li>
								<li>Avoid excessive resource usage</li>
								<li>Do not infringe copyright</li>
								<li>Do not distribute malicious software</li>
							</ul>

							<h2>7. Account Termination</h2>
							<p>Your account may be terminated in the following situations:</p>
							<ul>
								<li>Violation of terms of service</li>
								<li>Illegal activities</li>
								<li>Harming other users</li>
								<li>Providing false information</li>
							</ul>

							<h2>8. Disclaimer of Liability</h2>
							<p>
								CorePilot does not guarantee that the service will be
								uninterrupted and error-free. We are not responsible for direct
								or indirect damages that may occur as a result of use.
							</p>

							<h2>9. Changes</h2>
							<p>
								These terms may be updated from time to time. Users will be
								notified of significant changes. Continuing to use the service
								means you accept the updated terms.
							</p>

							<h2>10. Applicable Law and Jurisdiction</h2>
							<p>
								This agreement is subject to the laws of the Republic of Example City, Example Country.
								Disputes are under the jurisdiction of Istanbul courts.
							</p>

							<h2>11. KVKK and GDPR Compliance</h2>
							<p>
								Your rights under the Personal Data Protection Law (KVKK) and
								General Data Protection Regulation (GDPR):
							</p>
							<ul>
								<li>
									<strong>Right to Information:</strong> You can learn whether
									your personal data is being processed
								</li>
								<li>
									<strong>Right of Access:</strong> You can request access to
									your processed personal data
								</li>
								<li>
									<strong>Right to Rectification:</strong> You can request
									correction of incorrect data
								</li>
								<li>
									<strong>Right to Erasure:</strong> You can request deletion of
									your data
								</li>
								<li>
									<strong>Right to Object:</strong> You can object to data
									processing activities
								</li>
								<li>
									<strong>Data Portability:</strong> You can transfer your data
									to another platform
								</li>
							</ul>

							<h2>12. Contact</h2>
							<p>For questions about these terms of service:</p>
							<ul>
								<li>Email: hi@example.net</li>
								<li>Address: Example City, Example Country</li>
								<li>DPO (Data Protection Officer): hi@example.net</li>
							</ul>

							<div className="mt-12 p-6 bg-zinc-100 dark:bg-zinc-800 rounded-2xl">
								<p className="text-sm text-zinc-600 dark:text-zinc-400 mb-0">
									<strong>Important Note:</strong> These terms of service have
									been prepared in compliance with both the legislation of the
									Republic of Example City, Example Country and European Union regulations. For any
									legal questions, we recommend consulting your legal advisor.
								</p>
							</div>
						</div>
					</motion.div>

					{/* Footer Actions */}
					<motion.div
						initial={{ opacity: 0, y: 20 }}
						animate={{ opacity: 1, y: 0 }}
						transition={{ duration: 0.6, delay: 0.4 }}
						className="mt-12 text-center space-y-4"
					>
						<div className="flex flex-col sm:flex-row gap-4 justify-center">
							<Link href="/legal/privacy">
								<Button
									variant="outline"
									className="bg-white/50 dark:bg-zinc-800/50 backdrop-blur-sm"
								>
									Privacy Policy
								</Button>
							</Link>
							<Link href="/auth/register">
								<Button className="bg-gradient-to-r from-rose-500 to-orange-500 hover:from-rose-600 hover:to-orange-600 text-white">
									Accept and Continue
								</Button>
							</Link>
						</div>
					</motion.div>
				</motion.div>
			</div>
			<Footer />
		</div>
	);
}
