import type { NextRequest } from "next/server";

declare module "next" {
	export interface NextApiRequest extends NextRequest {
		params: Record<string, string>;
	}

	export interface NextApiResponse<T = unknown> {
		json: (body: T) => void;
		status: (code: number) => NextApiResponse<T>;
	}
}

export interface RouteParams {
	params: {
		[key: string]: string;
	};
}

export interface WithAuthProps {
	user: {
		id: string;
		email: string;
		role: string;
		[key: string]: unknown;
	};
}

export type ApiHandler<T = unknown> = (
	req: NextRequest,
	context: { params: Record<string, string> },
	user: WithAuthProps["user"],
) => Promise<Response | NextResponse<T>>;

export type WithAuthHandler<T = unknown> = (
	req: NextRequest,
	context: { params: Record<string, string>; user: WithAuthProps["user"] },
) => Promise<Response | NextResponse<T>>;
