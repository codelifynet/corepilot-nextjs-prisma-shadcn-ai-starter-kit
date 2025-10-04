"use client";

import { useSession } from "@/lib/auth-client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Mail, User, Calendar } from "lucide-react";

export function UserProfile() {
	const { data: session, isPending } = useSession();

	if (isPending) {
		return (
			<div className="flex items-center justify-center min-h-[400px]">
				<div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900"></div>
			</div>
		);
	}

	if (!session?.user) {
		return (
			<Card>
				<CardContent className="pt-6">
					<p className="text-center text-gray-500">
						Kullanıcı bilgisi bulunamadı.
					</p>
				</CardContent>
			</Card>
		);
	}

	const { user } = session;

	return (
		<Card className="max-w-2xl mx-auto">
			<CardHeader>
				<CardTitle className="flex items-center gap-3">
					<Avatar className="h-12 w-12">
						<AvatarImage src={user.image || ""} alt={user.name || ""} />
						<AvatarFallback>
							{user.name
								?.split(" ")
								.map((n) => n[0])
								.join("") || "U"}
						</AvatarFallback>
					</Avatar>
					<div>
						<h2 className="text-xl font-semibold">Profil Bilgileri</h2>
						<p className="text-sm text-gray-500">
							Hesap bilgilerinizi görüntüleyin ve yönetin
						</p>
					</div>
				</CardTitle>
			</CardHeader>
			<CardContent className="space-y-6">
				<div className="grid gap-4">
					<div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
						<User className="h-5 w-5 text-gray-500" />
						<div>
							<p className="text-sm font-medium text-gray-500">Ad Soyad</p>
							<p className="font-medium">{user.name || "Belirtilmemiş"}</p>
						</div>
					</div>

					<div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
						<Mail className="h-5 w-5 text-gray-500" />
						<div>
							<p className="text-sm font-medium text-gray-500">E-posta</p>
							<p className="font-medium">{user.email}</p>
						</div>
					</div>

					<div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
						<Calendar className="h-5 w-5 text-gray-500" />
						<div>
							<p className="text-sm font-medium text-gray-500">Üyelik Tarihi</p>
							<p className="font-medium">
								{user.createdAt
									? new Date(user.createdAt).toLocaleDateString("tr-TR")
									: "Belirtilmemiş"}
							</p>
						</div>
					</div>
				</div>

				<div className="flex justify-between pt-4 border-t">
					<Button variant="outline">Profili Düzenle</Button>
					<Button variant="outline">Şifre Değiştir</Button>
				</div>
			</CardContent>
		</Card>
	);
}
