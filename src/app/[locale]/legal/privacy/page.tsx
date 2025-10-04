"use client";

import { motion } from "framer-motion";
import { Icon } from "@iconify/react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import Link from "next/link";

export default function PrivacyPage() {
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
								<Icon icon="lucide:shield" className="h-4 w-4 mr-2" />
								Data Protection
							</Badge>

							<h1 className="text-4xl md:text-5xl font-bold text-zinc-900 dark:text-zinc-50 mb-4">
								Privacy Policy
							</h1>
							<p className="text-xl text-zinc-600 dark:text-zinc-400">
								GDPR & KVKK Compliant • Last updated:{" "}
								{new Date().toLocaleDateString("en-US")}
							</p>
						</div>
					</div>

					{/* Quick Overview Cards */}
					<motion.div
						initial={{ opacity: 0, y: 30 }}
						animate={{ opacity: 1, y: 0 }}
						transition={{ duration: 0.8, delay: 0.1 }}
						className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12"
					>
						<div className="bg-white/70 dark:bg-zinc-900/70 backdrop-blur-xl rounded-2xl p-6 border border-white/20 dark:border-zinc-700/30">
							<Icon
								icon="lucide:lock"
								className="h-8 w-8 text-green-600 mb-4"
							/>
							<h3 className="font-semibold text-zinc-900 dark:text-zinc-50 mb-2">
								Secure Storage
							</h3>
							<p className="text-sm text-zinc-600 dark:text-zinc-400">
								Your data is stored encrypted and secure
							</p>
						</div>
						<div className="bg-white/70 dark:bg-zinc-900/70 backdrop-blur-xl rounded-2xl p-6 border border-white/20 dark:border-zinc-700/30">
							<Icon icon="lucide:eye" className="h-8 w-8 text-blue-600 mb-4" />
							<h3 className="font-semibold text-zinc-900 dark:text-zinc-50 mb-2">
								Transparency
							</h3>
							<p className="text-sm text-zinc-600 dark:text-zinc-400">
								We clearly state what data we collect and how we use it
							</p>
						</div>
						<div className="bg-white/70 dark:bg-zinc-900/70 backdrop-blur-xl rounded-2xl p-6 border border-white/20 dark:border-zinc-700/30">
							<Icon
								icon="lucide:database"
								className="h-8 w-8 text-purple-600 mb-4"
							/>
							<h3 className="font-semibold text-zinc-900 dark:text-zinc-50 mb-2">
								Control
							</h3>
							<p className="text-sm text-zinc-600 dark:text-zinc-400">
								You have full control over your personal data
							</p>
						</div>
					</motion.div>

					{/* Content */}
					<motion.div
						initial={{ opacity: 0, y: 30 }}
						animate={{ opacity: 1, y: 0 }}
						transition={{ duration: 0.8, delay: 0.2 }}
						className="bg-white/70 dark:bg-zinc-900/70 backdrop-blur-xl rounded-3xl p-8 md:p-12 shadow-2xl border border-white/20 dark:border-zinc-700/30"
					>
						<div className="prose prose-zinc dark:prose-invert max-w-none">
							<h2>1. Data Controller Information</h2>
							<p>
								This privacy policy is prepared to inform you about the
								processing of personal data collected by the CorePilot platform.
							</p>
							<ul>
								<li>
									<strong>Data Controller:</strong> CorePilot
								</li>
								<li>
									<strong>Contact:</strong> hi@example.net
								</li>
								<li>
									<strong>DPO (Data Protection Officer):</strong>{" "}
									hi@example.net
								</li>
								<li>
									<strong>Address:</strong> Example City, Example Country
								</li>
							</ul>

							<h2>2. Personal Data We Collect</h2>
							<p>
								When using our services, the following personal data may be
								collected:
							</p>

							<h3>2.1 Required Data</h3>
							<ul>
								<li>
									<strong>Name and Surname:</strong> Account creation and
									identity verification
								</li>
								<li>
									<strong>Email Address:</strong> Communication and account
									security
								</li>
								<li>
									<strong>Password:</strong> Account security (stored encrypted)
								</li>
							</ul>

							<h3>2.2 Optional Data</h3>
							<ul>
								<li>
									<strong>Profile Picture:</strong> Account personalization
								</li>
								<li>
									<strong>Company/Organization:</strong> Business use
								</li>
								<li>
									<strong>Phone Number:</strong> Additional security
								</li>
							</ul>

							<h3>2.3 Technical Data</h3>
							<ul>
								<li>
									<strong>IP Address:</strong> Security and localization
								</li>
								<li>
									<strong>Browser Information:</strong> Compatibility and
									performance
								</li>
								<li>
									<strong>Cookies:</strong> User experience improvement
								</li>
								<li>
									<strong>Usage Statistics:</strong> Service development
								</li>
							</ul>

							<h2>3. Data Processing Purposes and Legal Bases</h2>

							<h3>3.1 KVKK Processing Purposes</h3>
							<ul>
								<li>
									<strong>Service Provision:</strong> Contract performance (KVKK
									Art. 5/2-c)
								</li>
								<li>
									<strong>Security:</strong> Legitimate interest of data
									controller (KVKK Art. 5/2-f)
								</li>
								<li>
									<strong>Communication:</strong> Explicit consent (KVKK Art.
									5/1-a)
								</li>
								<li>
									<strong>Legal Obligation:</strong> Compliance with legal
									obligations (KVKK Art. 5/2-d)
								</li>
							</ul>

							<h3>3.2 GDPR Processing Bases</h3>
							<ul>
								<li>
									<strong>Contract:</strong> Performance of service contract
									(GDPR Art. 6-1-b)
								</li>
								<li>
									<strong>Legitimate Interest:</strong> Security and service
									improvement (GDPR Art. 6-1-f)
								</li>
								<li>
									<strong>Consent:</strong> Marketing communication (GDPR Art.
									6-1-a)
								</li>
								<li>
									<strong>Legal Obligation:</strong> Regulatory compliance (GDPR
									Art. 6-1-c)
								</li>
							</ul>

							<h2>4. Data Sharing and Transfer</h2>
							<p>
								Your personal data is not shared with third parties except in
								the following cases:
							</p>
							<ul>
								<li>
									<strong>Legal Requirement:</strong> Court orders, prosecutor
									investigations
								</li>
								<li>
									<strong>Security:</strong> Fraud prevention, cybersecurity
								</li>
								<li>
									<strong>Service Providers:</strong> Infrastructure, payment
									systems (with data processing agreement)
								</li>
								<li>
									<strong>Business Transfer:</strong> Company sale, merger
									situations
								</li>
							</ul>

							<h3>4.1 International Data Transfer</h3>
							<p>Your data may be transferred outside the EU. In such cases:</p>
							<ul>
								<li>Countries with adequacy decisions are preferred</li>
								<li>Standard contractual clauses are used</li>
								<li>Appropriate security measures are implemented</li>
							</ul>

							<h2>5. Data Retention Periods</h2>
							<table className="w-full border border-zinc-300 dark:border-zinc-600 my-6">
								<thead>
									<tr className="bg-zinc-100 dark:bg-zinc-800">
										<th className="border border-zinc-300 dark:border-zinc-600 p-3 text-left">
											Data Type
										</th>
										<th className="border border-zinc-300 dark:border-zinc-600 p-3 text-left">
											Retention Period
										</th>
										<th className="border border-zinc-300 dark:border-zinc-600 p-3 text-left">
											Reason
										</th>
									</tr>
								</thead>
								<tbody>
									<tr>
										<td className="border border-zinc-300 dark:border-zinc-600 p-3">
											Account Information
										</td>
										<td className="border border-zinc-300 dark:border-zinc-600 p-3">
											While account is active
										</td>
										<td className="border border-zinc-300 dark:border-zinc-600 p-3">
											Service provision
										</td>
									</tr>
									<tr>
										<td className="border border-zinc-300 dark:border-zinc-600 p-3">
											Usage Logs
										</td>
										<td className="border border-zinc-300 dark:border-zinc-600 p-3">
											1 year
										</td>
										<td className="border border-zinc-300 dark:border-zinc-600 p-3">
											Security and analysis
										</td>
									</tr>
									<tr>
										<td className="border border-zinc-300 dark:border-zinc-600 p-3">
											Communication Records
										</td>
										<td className="border border-zinc-300 dark:border-zinc-600 p-3">
											3 years
										</td>
										<td className="border border-zinc-300 dark:border-zinc-600 p-3">
											Legal obligation
										</td>
									</tr>
									<tr>
										<td className="border border-zinc-300 dark:border-zinc-600 p-3">
											Financial Records
										</td>
										<td className="border border-zinc-300 dark:border-zinc-600 p-3">
											10 years
										</td>
										<td className="border border-zinc-300 dark:border-zinc-600 p-3">
											Tax legislation
										</td>
									</tr>
								</tbody>
							</table>

							<h2>6. Personal Data Security</h2>
							<p>
								The following technical and administrative measures are taken
								for data security:
							</p>
							<ul>
								<li>
									<strong>Encryption:</strong> TLS/SSL for transmission, AES-256
									for storage
								</li>
								<li>
									<strong>Access Control:</strong> Role-based authorization
								</li>
								<li>
									<strong>Monitoring:</strong> 24/7 security monitoring
								</li>
								<li>
									<strong>Backup:</strong> Regular data backup
								</li>
								<li>
									<strong>Training:</strong> Staff security training
								</li>
								<li>
									<strong>Penetration Testing:</strong> Regular security testing
								</li>
							</ul>

							<h2>7. Data Subject Rights under KVKK</h2>
							<p>Your rights under KVKK Article 11:</p>
							<ul>
								<li>
									<strong>Right to Information:</strong> Learn whether your data
									is being processed
								</li>
								<li>
									<strong>Right of Access:</strong> Access to your processed
									data
								</li>
								<li>
									<strong>Right to Rectification:</strong> Correction of
									incorrect data
								</li>
								<li>
									<strong>Right to Erasure:</strong> Deletion of your data
								</li>
								<li>
									<strong>Right to Object:</strong> Object to processing
									activities
								</li>
								<li>
									<strong>Right to Compensation:</strong> Compensation for
									damages suffered
								</li>
							</ul>

							<h2>8. Data Subject Rights under GDPR</h2>
							<p>Additional rights under GDPR:</p>
							<ul>
								<li>
									<strong>Right to Data Portability:</strong> Transfer your data
									to another platform
								</li>
								<li>
									<strong>Right to Object to Automated Decision-Making:</strong>{" "}
									Reject algorithm-based decisions
								</li>
								<li>
									<strong>Right to Restriction:</strong> Restriction of data
									processing
								</li>
								<li>
									<strong>Right to Complain to Supervisory Authority:</strong>{" "}
									Right to apply to DPA
								</li>
							</ul>

							<h2>9. Cookies</h2>
							<p>Types of cookies used on our platform:</p>
							<ul>
								<li>
									<strong>Essential Cookies:</strong> Required for basic
									functionality
								</li>
								<li>
									<strong>Performance Cookies:</strong> Site performance
									measurement
								</li>
								<li>
									<strong>Functional Cookies:</strong> Remembering user
									preferences
								</li>
								<li>
									<strong>Marketing Cookies:</strong> Personalized
									advertisements (with explicit consent)
								</li>
							</ul>

							<h2>10. Data Breach Notification</h2>
							<p>In case of a data security breach:</p>
							<ul>
								<li>Notification to KVKK Authority within 72 hours</li>
								<li>Immediate notification to affected users</li>
								<li>Transparent reporting on measures taken</li>
								<li>Plan to address breach causes</li>
							</ul>

							<h2>11. Rights Request Procedure</h2>
							<p>To exercise your rights:</p>
							<ol>
								<li>Send an email to hi@example.net</li>
								<li>Include your identity verification documents</li>
								<li>Clearly state your request</li>
								<li>You will receive a response within 30 days</li>
							</ol>

							<h2>12. Changes</h2>
							<p>
								This privacy policy may be updated. For significant changes:
							</p>
							<ul>
								<li>Email notification</li>
								<li>Announcement on the platform</li>
								<li>30 days advance notice</li>
								<li>
									Obtaining consent for changes requiring explicit consent
								</li>
							</ul>

							<h2>13. Contact</h2>
							<div className="bg-zinc-100 dark:bg-zinc-800 rounded-2xl p-6 my-6">
								<h4 className="font-semibold mb-4">
									For Data Protection Related Questions:
								</h4>
								<ul className="space-y-2">
									<li>
										<strong>Email:</strong> hi@example.net
									</li>
									<li>
										<strong>DPO:</strong> hi@example.net
									</li>
									<li>
										<strong>Postal Address:</strong> CorePilot Data Protection
										Unit, Example City, Example Country
									</li>
									<li>
										<strong>KVKK Authority:</strong> kvkk.gov.tr
									</li>
									<li>
										<strong>EU DPA:</strong> edpb.europa.eu
									</li>
								</ul>
							</div>

							<div className="mt-12 p-6 bg-blue-50 dark:bg-blue-950/20 rounded-2xl border border-blue-200 dark:border-blue-800">
								<p className="text-sm text-blue-800 dark:text-blue-200 mb-0">
									<strong>Important:</strong> This privacy policy has been
									prepared in compliance with both KVKK and GDPR requirements.
									No fee is charged for exercising your rights. For detailed
									information on data protection matters, you can refer to the
									relevant legislation.
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
							<Link href="/legal/terms">
								<Button
									variant="outline"
									className="bg-white/50 dark:bg-zinc-800/50 backdrop-blur-sm"
								>
									Terms of Service
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
