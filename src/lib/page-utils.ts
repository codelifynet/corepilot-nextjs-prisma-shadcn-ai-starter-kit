import { menuGroups } from "@/constants/menu-data";

/**
 * Get the gradient for a page based on its path
 */
export function getPageGradient(path: string): string {
	// Find the matching menu group based on path
	for (const group of menuGroups) {
		for (const item of group.items) {
			if (path === item.href) {
				return group.gradient;
			}

			// Check sub items
			if (item.subItems) {
				for (const subItem of item.subItems) {
					if (path === subItem.href) {
						return group.gradient;
					}
				}
			}
		}
	}

	// Check for path prefixes to match nested routes
	const groupPaths = [
		"/admin/overview",
		"/admin/ecommerce",
		"/admin/user-management",
		"/admin/content-management",
		"/admin/finance",
		"/admin/system",
	];

	for (const groupPath of groupPaths) {
		if (path.startsWith(groupPath)) {
			// Find the corresponding menu group
			for (const group of menuGroups) {
				for (const item of group.items) {
					if (item.href === groupPath || (item.subItems && item.subItems.some(sub => sub.href === groupPath))) {
						return group.gradient;
					}
				}
			}
		}
	}

	// Default gradient for admin pages
	if (path.startsWith("/admin")) {
		return "from-blue-600 to-purple-600";
	}

	// Default gradient for other pages
	return "from-gray-900 to-gray-600";
}

/**
 * Get page information based on path
 */
export function getPageInfo(path: string): {
	title: string;
	description?: string;
} {
	// Find the matching menu item
	for (const group of menuGroups) {
		for (const item of group.items) {
			if (path === item.href) {
				return {
					title: item.title,
					description: `Manage ${item.title.toLowerCase()}`,
				};
			}

			// Check sub items
			if (item.subItems) {
				for (const subItem of item.subItems) {
					if (path === subItem.href) {
						return {
							title: subItem.title,
							description: `Manage ${subItem.title.toLowerCase()}`,
						};
					}
				}
			}
		}
	}

	// Default page info
	return {
		title: "Page",
		description: "Welcome to CorePilot",
	};
}
