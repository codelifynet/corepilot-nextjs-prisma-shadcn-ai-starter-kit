import "better-auth";
import "better-auth/react";

declare module "better-auth" {
	interface User {
		id: string;
		email: string;
		name: string;
		role: string;
		emailVerified: boolean;
		image?: string | null;
		createdAt: Date;
		updatedAt: Date;
	}

	interface Session {
		id: string;
		userId: string;
		expiresAt: Date;
		token: string;
		ipAddress?: string;
		userAgent?: string;
		user: User;
	}
}

declare module "better-auth/react" {
	interface User {
		id: string;
		email: string;
		name: string;
		role: string;
		emailVerified: boolean;
		image?: string | null;
		createdAt: Date;
		updatedAt: Date;
	}

	interface Session {
		id: string;
		userId: string;
		expiresAt: Date;
		token: string;
		ipAddress?: string;
		userAgent?: string;
		user: User;
	}
}
