import { UserProfile } from "@/features/auth";

export default function ProfilePage() {
	return (
		<div className="min-h-screen bg-gray-50 py-12">
			<div className="container mx-auto px-4 sm:px-6 lg:px-8">
				<div className="text-center mb-8">
					<h1 className="text-3xl font-bold text-gray-900">Profile</h1>
					<p className="mt-2 text-gray-600">Your account information</p>
				</div>

				<UserProfile />
			</div>
		</div>
	);
}
