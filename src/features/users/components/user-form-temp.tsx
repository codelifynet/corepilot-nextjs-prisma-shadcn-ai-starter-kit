"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import type { User } from "../types";

interface UserFormProps {
	user?: User;
}

export function UserForm({ user }: UserFormProps) {
	// TODO: Update to RBAC - temporarily disabled for migration
	return (
		<div className="p-4">
			<Card>
				<CardHeader>
					<CardTitle>{user ? "Edit User" : "Create User"}</CardTitle>
				</CardHeader>
				<CardContent>
					<p className="text-muted-foreground">
						This form needs to be updated for the new RBAC system.
						<br />
						Current functionality is temporarily disabled during migration.
					</p>
				</CardContent>
			</Card>
		</div>
	);
}
