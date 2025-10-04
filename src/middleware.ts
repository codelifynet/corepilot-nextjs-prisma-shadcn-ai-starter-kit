import { type NextRequest, NextResponse } from "next/server";
import { getSessionCookie } from "better-auth/cookies";
import { DEFAULT_REDIRECTS, PUBLIC_ROUTES } from "@/constants/paths";
import createIntlMiddleware from "next-intl/middleware";
import { routing } from "@/i18n/routing";

// Create the intl middleware
const intlMiddleware = createIntlMiddleware(routing);

export async function middleware(request: NextRequest) {
	const { pathname } = request.nextUrl;

	// Skip auth routes
	if (pathname.startsWith("/api/auth")) {
		return NextResponse.next();
	}

	// Skip API routes - RBAC will be handled in individual API routes
	if (pathname.startsWith("/api/")) {
		return NextResponse.next();
	}

	// Handle internationalization first
	const intlResponse = intlMiddleware(request);

	// If intl middleware returns a redirect, return it immediately
	if (intlResponse && intlResponse.status >= 300 && intlResponse.status < 400) {
		return intlResponse;
	}

	const sessionCookie = getSessionCookie(request);
	const currentPathname = request.nextUrl.pathname;

	// Since locale is not in URL anymore, use the path directly
	const pathWithoutLocale = currentPathname;

	// If user has session and tries to access login page, redirect to admin dashboard
	if (sessionCookie && pathWithoutLocale === PUBLIC_ROUTES.LOGIN) {
		return NextResponse.redirect(
			new URL(DEFAULT_REDIRECTS.AFTER_LOGIN, request.url),
		);
	}

	// If user accesses /admin without session, redirect to login
	if (!sessionCookie && pathWithoutLocale === "/admin") {
		return NextResponse.redirect(new URL(PUBLIC_ROUTES.LOGIN, request.url));
	}

	// If user accesses /admin/* routes without session, redirect to login
	if (!sessionCookie && pathWithoutLocale.startsWith("/admin")) {
		return NextResponse.redirect(new URL(PUBLIC_ROUTES.LOGIN, request.url));
	}

	// If user has session and accesses /admin root, redirect to dashboard
	if (sessionCookie && pathWithoutLocale === "/admin") {
		return NextResponse.redirect(
			new URL(DEFAULT_REDIRECTS.AFTER_LOGIN, request.url),
		);
	}

	// Admin routes - basic session check only
	// RBAC will be handled in individual page components
	if (pathWithoutLocale.startsWith("/admin") && !sessionCookie) {
		return NextResponse.redirect(new URL(PUBLIC_ROUTES.LOGIN, request.url));
	}

	// Return intl response if it exists, otherwise continue
	return intlResponse || NextResponse.next();
}

export const config = {
	matcher: [
		// Enable a redirect to a matching locale at the root
		"/",
		// Enable redirects for all paths
		"/((?!_next|_vercel|.*\\.).*)",
		// Match all request paths except for the ones starting with:
		// - api (API routes)
		"/admin",
		"/admin/:path*",
		"/login",
		"/api/:path*",
	],
};
