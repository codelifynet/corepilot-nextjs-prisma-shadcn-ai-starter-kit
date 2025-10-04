import { createAccessControl } from "better-auth/plugins/access";

// Comprehensive permissions structure aligned with seed data
export const statement = {
	// User Management
	users: ["view", "create", "update", "delete", "ban", "unban", "verify", "assign_roles", "impersonate", "export", "bulk_operations"],
	
	// Content Management
	content: ["view", "create", "update", "delete", "publish", "moderate", "schedule", "archive", "manage_categories", "manage_tags"],
	
	// Product Management
	products: ["view", "create", "update", "delete", "manage_pricing", "manage_inventory", "manage_categories", "manage_variants", "manage_attributes", "bulk_operations", "import_export"],
	
	// Order Management
	orders: ["view", "create", "update", "cancel", "refund", "update_status", "manage_shipping", "manage_returns", "view_payments", "export"],
	
	// Customer Management
	customers: ["view", "create", "update", "delete", "view_orders", "manage_groups", "export"],
	
	// Coupon Management
	coupons: ["view", "create", "update", "delete", "activate", "view_usage", "bulk_operations"],
	
	// Role & Permission Management
	roles: ["view", "create", "update", "delete", "assign_permissions", "view_audit"],
	permissions: ["view", "assign", "revoke"],
	
	// System Management
	system: ["configure", "monitor", "maintain", "backup_restore"],
	settings: ["view", "update", "manage_payment", "manage_email", "manage_seo", "manage_security", "manage_integrations", "manage_localization", "backup_restore"],
	
	// Analytics & Reporting
	analytics: ["view", "export", "view_users", "view_sales", "view_products", "view_traffic", "view_conversion", "create_reports", "schedule_reports"],
	
	// Billing & Finance
	billing: ["view", "manage", "view_financial_reports", "process_payments", "manage_subscriptions", "view_transactions"],
	
	// AI Features
	ai: ["view", "chat", "generate_content", "manage_prompts", "view_usage", "configure_models"],
	
	// Support System
	support: ["view", "respond", "escalate", "close", "assign", "view_analytics", "manage_knowledge_base"],
	
	// Dashboard & UI
	dashboard: ["view", "customize", "create_widgets"],
	
	// Notifications
	notifications: ["view", "create", "manage", "send_bulk", "manage_templates"],
	
	// File Management
	files: ["view", "upload", "delete", "manage", "organize", "share"],
	
	// Marketing
	marketing: ["view", "create_campaigns", "manage_email", "manage_social", "view_analytics", "manage_automation"],
	
	// Inventory
	inventory: ["view", "update", "track_movements", "manage_warehouses", "set_alerts", "generate_reports"],
	
	// API Access
	api: ["read", "write", "manage_keys", "view_logs"],
	
	// Logging & Monitoring
	logs: ["view", "export", "manage_retention", "view_security"],
	
	// Campaign Management (legacy support)
	campaign: ["create", "read", "update", "delete", "manage"],
} as const;

// Create access control instance
const ac = createAccessControl(statement);

// Standard User Role - Basic access
export const userRole = ac.newRole({
	content: ["view"],
	products: ["view"],
	orders: ["view"],
	ai: ["view", "chat", "generate_content"],
	dashboard: ["view"],
	notifications: ["view"],
	files: ["view", "upload"],
	api: ["read"],
});

// Content Creator Role - Content focused
export const contentCreatorRole = ac.newRole({
	content: ["view", "create", "update", "delete", "publish", "schedule", "manage_categories", "manage_tags"],
	products: ["view"],
	ai: ["view", "chat", "generate_content", "manage_prompts"],
	dashboard: ["view"],
	notifications: ["view"],
	files: ["view", "upload", "delete", "manage", "organize", "share"],
	api: ["read"],
});

// Customer Support Role - Support focused
export const supportRole = ac.newRole({
	users: ["view"],
	orders: ["view", "update_status", "refund", "manage_returns"],
	customers: ["view", "update", "view_orders"],
	support: ["view", "respond", "escalate", "close", "manage_knowledge_base"],
	dashboard: ["view"],
	notifications: ["view"],
	files: ["view", "upload"],
	api: ["read"],
});

// Marketing Manager Role - Marketing focused
export const marketingRole = ac.newRole({
	users: ["view"],
	content: ["view", "create", "update", "delete", "publish", "schedule", "manage_categories", "manage_tags"],
	products: ["view", "update", "manage_categories"],
	customers: ["view", "manage_groups", "export"],
	analytics: ["view", "export", "view_users", "view_traffic", "view_conversion", "create_reports"],
	ai: ["view", "chat", "generate_content", "manage_prompts"],
	dashboard: ["view", "customize"],
	notifications: ["view", "manage", "send_bulk", "manage_templates"],
	files: ["view", "upload", "delete", "manage", "organize", "share"],
	marketing: ["view", "create_campaigns", "manage_email", "manage_social", "view_analytics", "manage_automation"],
	coupons: ["view", "create", "update", "delete", "activate", "view_usage", "bulk_operations"],
	api: ["read"],
});

// Operations Manager Role - Operations focused
export const operationsRole = ac.newRole({
	users: ["view"],
	content: ["view", "update", "moderate"],
	products: ["view", "update", "manage_inventory", "manage_variants"],
	orders: ["view", "create", "update", "cancel", "refund", "update_status", "manage_shipping", "manage_returns", "view_payments", "export"],
	customers: ["view", "create", "update", "view_orders", "manage_groups", "export"],
	analytics: ["view", "view_sales", "view_products", "create_reports"],
	support: ["view", "respond", "escalate", "close", "assign", "view_analytics", "manage_knowledge_base"],
	dashboard: ["view", "customize"],
	notifications: ["view", "manage"],
	files: ["view", "upload", "organize"],
	inventory: ["view", "update", "track_movements", "manage_warehouses", "set_alerts", "generate_reports"],
	coupons: ["view", "create", "update", "activate", "view_usage"],
	api: ["read"],
});

// Business Manager Role - Comprehensive business access
export const businessManagerRole = ac.newRole({
	users: ["view", "create", "update", "assign_roles", "export"],
	content: ["view", "create", "update", "delete", "publish", "moderate", "schedule", "manage_categories", "manage_tags"],
	products: ["view", "create", "update", "delete", "manage_pricing", "manage_inventory", "manage_categories", "manage_variants", "bulk_operations", "import_export"],
	orders: ["view", "create", "update", "cancel", "refund", "update_status", "manage_shipping", "manage_returns", "view_payments", "export"],
	customers: ["view", "create", "update", "view_orders", "manage_groups", "export"],
	analytics: ["view", "export", "view_users", "view_sales", "view_products", "view_traffic", "view_conversion", "create_reports"],
	billing: ["view", "view_financial_reports"],
	ai: ["view", "chat", "generate_content", "view_usage"],
	support: ["view", "respond", "escalate", "close", "assign", "view_analytics"],
	dashboard: ["view", "customize", "create_widgets"],
	notifications: ["view", "manage", "send_bulk"],
	files: ["view", "upload", "delete", "manage", "organize", "share"],
	marketing: ["view", "create_campaigns", "manage_email", "manage_social", "view_analytics", "manage_automation"],
	inventory: ["view", "update", "track_movements", "set_alerts", "generate_reports"],
	coupons: ["view", "create", "update", "delete", "activate", "view_usage", "bulk_operations"],
	api: ["read", "write"],
});

// Admin Role - System management access
export const adminRole = ac.newRole({
	users: ["view", "create", "update", "delete", "ban", "unban", "verify", "assign_roles", "export", "bulk_operations"],
	content: ["view", "create", "update", "delete", "publish", "moderate", "schedule", "archive", "manage_categories", "manage_tags"],
	products: ["view", "create", "update", "delete", "manage_pricing", "manage_inventory", "manage_categories", "manage_variants", "manage_attributes", "bulk_operations", "import_export"],
	orders: ["view", "create", "update", "cancel", "refund", "update_status", "manage_shipping", "manage_returns", "view_payments", "export"],
	customers: ["view", "create", "update", "delete", "view_orders", "manage_groups", "export"],
	coupons: ["view", "create", "update", "delete", "activate", "view_usage", "bulk_operations"],
	roles: ["view", "create", "update", "delete", "assign_permissions", "view_audit"],
	permissions: ["view", "assign", "revoke"],
	settings: ["view", "update", "manage_payment", "manage_email", "manage_seo", "manage_security", "manage_integrations", "manage_localization"],
	analytics: ["view", "export", "view_users", "view_sales", "view_products", "view_traffic", "view_conversion", "create_reports", "schedule_reports"],
	billing: ["view", "manage", "view_financial_reports", "process_payments", "manage_subscriptions", "view_transactions"],
	ai: ["view", "chat", "generate_content", "manage_prompts", "view_usage", "configure_models"],
	support: ["view", "respond", "escalate", "close", "assign", "view_analytics", "manage_knowledge_base"],
	dashboard: ["view", "customize", "create_widgets"],
	notifications: ["view", "create", "manage", "send_bulk", "manage_templates"],
	files: ["view", "upload", "delete", "manage", "organize", "share"],
	marketing: ["view", "create_campaigns", "manage_email", "manage_social", "view_analytics", "manage_automation"],
	inventory: ["view", "update", "track_movements", "manage_warehouses", "set_alerts", "generate_reports"],
	api: ["read", "write", "manage_keys", "view_logs"],
	logs: ["view", "export", "manage_retention", "view_security"],
	campaign: ["create", "read", "update", "delete", "manage"],
});

// Super Admin Role - Full system access
export const superadminRole = ac.newRole({
	users: ["view", "create", "update", "delete", "ban", "unban", "verify", "assign_roles", "impersonate", "export", "bulk_operations"],
	content: ["view", "create", "update", "delete", "publish", "moderate", "schedule", "archive", "manage_categories", "manage_tags"],
	products: ["view", "create", "update", "delete", "manage_pricing", "manage_inventory", "manage_categories", "manage_variants", "manage_attributes", "bulk_operations", "import_export"],
	orders: ["view", "create", "update", "cancel", "refund", "update_status", "manage_shipping", "manage_returns", "view_payments", "export"],
	customers: ["view", "create", "update", "delete", "view_orders", "manage_groups", "export"],
	coupons: ["view", "create", "update", "delete", "activate", "view_usage", "bulk_operations"],
	roles: ["view", "create", "update", "delete", "assign_permissions", "view_audit"],
	permissions: ["view", "assign", "revoke"],
	system: ["configure", "monitor", "maintain", "backup_restore"],
	settings: ["view", "update", "manage_payment", "manage_email", "manage_seo", "manage_security", "manage_integrations", "manage_localization", "backup_restore"],
	analytics: ["view", "export", "view_users", "view_sales", "view_products", "view_traffic", "view_conversion", "create_reports", "schedule_reports"],
	billing: ["view", "manage", "view_financial_reports", "process_payments", "manage_subscriptions", "view_transactions"],
	ai: ["view", "chat", "generate_content", "manage_prompts", "view_usage", "configure_models"],
	support: ["view", "respond", "escalate", "close", "assign", "view_analytics", "manage_knowledge_base"],
	dashboard: ["view", "customize", "create_widgets"],
	notifications: ["view", "create", "manage", "send_bulk", "manage_templates"],
	files: ["view", "upload", "delete", "manage", "organize", "share"],
	marketing: ["view", "create_campaigns", "manage_email", "manage_social", "view_analytics", "manage_automation"],
	inventory: ["view", "update", "track_movements", "manage_warehouses", "set_alerts", "generate_reports"],
	api: ["read", "write", "manage_keys", "view_logs"],
	logs: ["view", "export", "manage_retention", "view_security"],
	campaign: ["create", "read", "update", "delete", "manage"],
});

// Legacy role mapping for backward compatibility
export const moderatorRole = operationsRole;

export { ac };
