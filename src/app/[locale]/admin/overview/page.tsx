import { redirect } from "next/navigation";
import { ADMIN_ROUTES } from "@/constants/paths";

export default function OverviewPage() {
	// Redirect to the default dashboard page
	redirect(ADMIN_ROUTES.OVERVIEW.DASHBOARD);
}
