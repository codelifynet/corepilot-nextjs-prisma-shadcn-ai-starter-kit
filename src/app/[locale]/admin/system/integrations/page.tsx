import type { Metadata } from "next";
import { PageHeader } from "@/components/ui/page-header";
import { getPageGradient } from "@/lib/page-utils";

export const metadata: Metadata = {
	title: "Integrations | CorePilot Admin",
	description: "Manage third-party integrations and API connections",
};

export default function IntegrationsPage() {
	return (
		<div className="container mx-auto p-6">
			<PageHeader
				title="Integrations"
				description="Connect and manage third-party services and API integrations"
				gradient={getPageGradient("/admin/system/integrations")}
			/>

			<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-6">
				<div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700">
					<div className="flex items-center justify-between mb-4">
						<div className="flex items-center space-x-3">
							<div className="w-12 h-12 bg-blue-500 rounded-lg flex items-center justify-center">
								<span className="text-white font-bold text-lg">G</span>
							</div>
							<div>
								<h3 className="text-lg font-semibold text-gray-900 dark:text-white">
									Google Analytics
								</h3>
								<p className="text-sm text-gray-500 dark:text-gray-400">
									Web analytics service
								</p>
							</div>
						</div>
						<div className="flex items-center">
							<span className="w-3 h-3 bg-green-500 rounded-full mr-2"></span>
							<span className="text-sm text-green-600 dark:text-green-400">
								Connected
							</span>
						</div>
					</div>
					<p className="text-sm text-gray-600 dark:text-gray-300 mb-4">
						Track website traffic and user behavior with comprehensive
						analytics.
					</p>
					<div className="flex space-x-2">
						<button className="flex-1 px-4 py-2 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded hover:bg-gray-200 dark:hover:bg-gray-600">
							Configure
						</button>
						<button className="px-4 py-2 text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 rounded">
							Disconnect
						</button>
					</div>
				</div>

				<div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700">
					<div className="flex items-center justify-between mb-4">
						<div className="flex items-center space-x-3">
							<div className="w-12 h-12 bg-indigo-500 rounded-lg flex items-center justify-center">
								<span className="text-white font-bold text-lg">S</span>
							</div>
							<div>
								<h3 className="text-lg font-semibold text-gray-900 dark:text-white">
									Stripe
								</h3>
								<p className="text-sm text-gray-500 dark:text-gray-400">
									Payment processing
								</p>
							</div>
						</div>
						<div className="flex items-center">
							<span className="w-3 h-3 bg-green-500 rounded-full mr-2"></span>
							<span className="text-sm text-green-600 dark:text-green-400">
								Connected
							</span>
						</div>
					</div>
					<p className="text-sm text-gray-600 dark:text-gray-300 mb-4">
						Process payments and manage subscriptions securely.
					</p>
					<div className="flex space-x-2">
						<button className="flex-1 px-4 py-2 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded hover:bg-gray-200 dark:hover:bg-gray-600">
							Configure
						</button>
						<button className="px-4 py-2 text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 rounded">
							Disconnect
						</button>
					</div>
				</div>

				<div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700">
					<div className="flex items-center justify-between mb-4">
						<div className="flex items-center space-x-3">
							<div className="w-12 h-12 bg-green-500 rounded-lg flex items-center justify-center">
								<span className="text-white font-bold text-lg">R</span>
							</div>
							<div>
								<h3 className="text-lg font-semibold text-gray-900 dark:text-white">
									Resend
								</h3>
								<p className="text-sm text-gray-500 dark:text-gray-400">
									Email delivery
								</p>
							</div>
						</div>
						<div className="flex items-center">
							<span className="w-3 h-3 bg-green-500 rounded-full mr-2"></span>
							<span className="text-sm text-green-600 dark:text-green-400">
								Connected
							</span>
						</div>
					</div>
					<p className="text-sm text-gray-600 dark:text-gray-300 mb-4">
						Send transactional emails and notifications.
					</p>
					<div className="flex space-x-2">
						<button className="flex-1 px-4 py-2 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded hover:bg-gray-200 dark:hover:bg-gray-600">
							Configure
						</button>
						<button className="px-4 py-2 text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 rounded">
							Disconnect
						</button>
					</div>
				</div>

				<div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700">
					<div className="flex items-center justify-between mb-4">
						<div className="flex items-center space-x-3">
							<div className="w-12 h-12 bg-purple-500 rounded-lg flex items-center justify-center">
								<span className="text-white font-bold text-lg">A</span>
							</div>
							<div>
								<h3 className="text-lg font-semibold text-gray-900 dark:text-white">
									OpenAI
								</h3>
								<p className="text-sm text-gray-500 dark:text-gray-400">
									AI services
								</p>
							</div>
						</div>
						<div className="flex items-center">
							<span className="w-3 h-3 bg-yellow-500 rounded-full mr-2"></span>
							<span className="text-sm text-yellow-600 dark:text-yellow-400">
								Pending
							</span>
						</div>
					</div>
					<p className="text-sm text-gray-600 dark:text-gray-300 mb-4">
						Power AI features with advanced language models.
					</p>
					<div className="flex space-x-2">
						<button className="flex-1 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">
							Connect
						</button>
					</div>
				</div>

				<div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700">
					<div className="flex items-center justify-between mb-4">
						<div className="flex items-center space-x-3">
							<div className="w-12 h-12 bg-red-500 rounded-lg flex items-center justify-center">
								<span className="text-white font-bold text-lg">S</span>
							</div>
							<div>
								<h3 className="text-lg font-semibold text-gray-900 dark:text-white">
									Supabase
								</h3>
								<p className="text-sm text-gray-500 dark:text-gray-400">
									Database & Auth
								</p>
							</div>
						</div>
						<div className="flex items-center">
							<span className="w-3 h-3 bg-gray-400 rounded-full mr-2"></span>
							<span className="text-sm text-gray-500 dark:text-gray-400">
								Not Connected
							</span>
						</div>
					</div>
					<p className="text-sm text-gray-600 dark:text-gray-300 mb-4">
						Backend-as-a-service for database and authentication.
					</p>
					<div className="flex space-x-2">
						<button className="flex-1 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">
							Connect
						</button>
					</div>
				</div>

				<div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700">
					<div className="flex items-center justify-between mb-4">
						<div className="flex items-center space-x-3">
							<div className="w-12 h-12 bg-black rounded-lg flex items-center justify-center">
								<span className="text-white font-bold text-lg">V</span>
							</div>
							<div>
								<h3 className="text-lg font-semibold text-gray-900 dark:text-white">
									Vercel
								</h3>
								<p className="text-sm text-gray-500 dark:text-gray-400">
									Deployment & Hosting
								</p>
							</div>
						</div>
						<div className="flex items-center">
							<span className="w-3 h-3 bg-green-500 rounded-full mr-2"></span>
							<span className="text-sm text-green-600 dark:text-green-400">
								Connected
							</span>
						</div>
					</div>
					<p className="text-sm text-gray-600 dark:text-gray-300 mb-4">
						Deploy and host your application with global CDN.
					</p>
					<div className="flex space-x-2">
						<button className="flex-1 px-4 py-2 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded hover:bg-gray-200 dark:hover:bg-gray-600">
							Configure
						</button>
						<button className="px-4 py-2 text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 rounded">
							Disconnect
						</button>
					</div>
				</div>
			</div>

			<div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700">
				<h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
					API Keys & Webhooks
				</h3>
				<div className="grid grid-cols-1 md:grid-cols-2 gap-6">
					<div>
						<h4 className="font-medium text-gray-900 dark:text-white mb-3">
							API Keys
						</h4>
						<div className="space-y-3">
							<div className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-700 rounded">
								<div>
									<p className="font-medium text-gray-900 dark:text-white">
										Public API Key
									</p>
									<p className="text-sm text-gray-500 dark:text-gray-400">
										pk_test_***************
									</p>
								</div>
								<button className="text-blue-600 hover:text-blue-700 text-sm">
									Copy
								</button>
							</div>
							<div className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-700 rounded">
								<div>
									<p className="font-medium text-gray-900 dark:text-white">
										Secret API Key
									</p>
									<p className="text-sm text-gray-500 dark:text-gray-400">
										sk_test_***************
									</p>
								</div>
								<button className="text-blue-600 hover:text-blue-700 text-sm">
									Reveal
								</button>
							</div>
						</div>
					</div>
					<div>
						<h4 className="font-medium text-gray-900 dark:text-white mb-3">
							Webhooks
						</h4>
						<div className="space-y-3">
							<div className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-700 rounded">
								<div>
									<p className="font-medium text-gray-900 dark:text-white">
										Payment Success
									</p>
									<p className="text-sm text-gray-500 dark:text-gray-400">
										https://api.corepilot.com/webhooks/payment
									</p>
								</div>
								<div className="flex items-center space-x-2">
									<span className="w-2 h-2 bg-green-500 rounded-full"></span>
									<span className="text-sm text-green-600 dark:text-green-400">
										Active
									</span>
								</div>
							</div>
							<div className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-700 rounded">
								<div>
									<p className="font-medium text-gray-900 dark:text-white">
										User Registration
									</p>
									<p className="text-sm text-gray-500 dark:text-gray-400">
										https://api.corepilot.com/webhooks/user
									</p>
								</div>
								<div className="flex items-center space-x-2">
									<span className="w-2 h-2 bg-green-500 rounded-full"></span>
									<span className="text-sm text-green-600 dark:text-green-400">
										Active
									</span>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}
