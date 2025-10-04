import { PrismaClient } from "@/generated/prisma";

const prisma = new PrismaClient();

// Comprehensive permissions for all system features
const comprehensivePermissions = [
  // USER MANAGEMENT - Complete set
  {
    resource: "users",
    action: "view",
    displayName: "View Users",
    description: "View user profiles and information",
  },
  {
    resource: "users",
    action: "create",
    displayName: "Create Users",
    description: "Create new user accounts",
  },
  {
    resource: "users",
    action: "update",
    displayName: "Update Users",
    description: "Update user profiles and information",
  },
  {
    resource: "users",
    action: "delete",
    displayName: "Delete Users",
    description: "Delete user accounts",
  },
  {
    resource: "users",
    action: "ban",
    displayName: "Ban Users",
    description: "Ban and unban user accounts",
  },
  {
    resource: "users",
    action: "verify",    displayName: "Verify Users",
    description: "Verify user email addresses via API",
  },
  {
    resource: "users",
    action: "assign_roles",

    displayName: "Assign User Roles",
    description: "Assign and remove roles from users",
  },
  {
    resource: "users",
    action: "impersonate",
    displayName: "Impersonate Users",
    description: "Login as another user for support purposes",
  },
  {
    resource: "users",
    action: "export",
    displayName: "Export User Data",
    description: "Export user data and reports",
  },
  {
    resource: "users",
    action: "bulk_operations",
    displayName: "Bulk User Operations",
    description: "Perform bulk operations on users",
  },

  // CONTENT MANAGEMENT - Complete set
  {
    resource: "content",
    action: "view",
    displayName: "View Content",
    description: "View content and posts",
  },
  {
    resource: "content",
    action: "create",
    displayName: "Create Content",
    description: "Create new content and posts",
  },
  {
    resource: "content",
    action: "update",
    displayName: "Update Content",
    description: "Update existing content and posts",
  },
  {
    resource: "content",
    action: "delete",
    displayName: "Delete Content",
    description: "Delete content and posts",
  },
  {
    resource: "content",
    action: "publish",
    displayName: "Publish Content",
    description: "Publish and unpublish content",
  },
  {
    resource: "content",
    action: "moderate",
    displayName: "Moderate Content",
    description: "Moderate user-generated content",
  },
  {
    resource: "content",
    action: "schedule",
    displayName: "Schedule Content",
    description: "Schedule content for future publication",
  },
  {
    resource: "content",
    action: "archive",
    displayName: "Archive Content",
    description: "Archive and restore content",
  },
  {
    resource: "content",
    action: "manage_categories",
    displayName: "Manage Content Categories",
    description: "Create and manage content categories",
  },
  {
    resource: "content",
    action: "manage_tags",
    displayName: "Manage Content Tags",
    description: "Create and manage content tags",
  },

  // PRODUCT MANAGEMENT - Complete set
  {
    resource: "products",
    action: "view",
    displayName: "View Products",
    description: "View product catalog and details",
  },
  {
    resource: "products",
    action: "create",
    displayName: "Create Products",
    description: "Create new products",
  },
  {
    resource: "products",
    action: "update",
    displayName: "Update Products",
    description: "Update existing products",
  },
  {
    resource: "products",
    action: "delete",
    displayName: "Delete Products",
    description: "Delete products",
  },
  {
    resource: "products",
    action: "manage_pricing",
    displayName: "Manage Product Pricing",
    description: "Set and modify product prices",
  },
  {
    resource: "products",
    action: "manage_inventory",
    displayName: "Manage Inventory",
    description: "Manage product inventory and stock",
  },
  {
    resource: "products",
    action: "manage_categories",
    displayName: "Manage Product Categories",
    description: "Create and manage product categories",
  },
  {
    resource: "products",
    action: "manage_variants",
    displayName: "Manage Product Variants",
    description: "Create and manage product variants",
  },
  {
    resource: "products",
    action: "manage_attributes",
    displayName: "Manage Product Attributes",
    description: "Define and manage product attributes",
  },
  {
    resource: "products",
    action: "bulk_operations",
    displayName: "Bulk Product Operations",
    description: "Perform bulk operations on products",
  },
  {
    resource: "products",
    action: "import_export",
    displayName: "Import/Export Products",
    description: "Import and export product data",
  },

  // ORDER MANAGEMENT - Complete set
  {
    resource: "orders",
    action: "view",
    displayName: "View Orders",
    description: "View customer orders",
  },
  {
    resource: "orders",
    action: "create",
    displayName: "Create Orders",
    description: "Create new orders",
  },
  {
    resource: "orders",
    action: "update",
    displayName: "Update Orders",
    description: "Update existing orders",
  },
  {
    resource: "orders",
    action: "cancel",
    displayName: "Cancel Orders",
    description: "Cancel customer orders",
  },
  {
    resource: "orders",
    action: "refund",
    displayName: "Process Refunds",
    description: "Process order refunds",
  },
  {
    resource: "orders",
    action: "update_status",
    displayName: "Update Order Status",
    description: "Update order status and tracking",
  },
  {
    resource: "orders",
    action: "manage_shipping",
    displayName: "Manage Shipping",
    description: "Manage order shipping and fulfillment",
  },
  {
    resource: "orders",
    action: "manage_returns",
    displayName: "Manage Returns",
    description: "Process order returns and exchanges",
  },
  {
    resource: "orders",
    action: "view_payments",
    displayName: "View Order Payments",
    description: "View order payment information",
  },
  {
    resource: "orders",
    action: "export",
    displayName: "Export Orders",
    description: "Export order data and reports",
  },

  // COUPON MANAGEMENT - Complete set
  {
    resource: "coupons",
    action: "view",
    displayName: "View Coupons",
    description: "View coupon codes and discounts",
  },
  {
    resource: "coupons",
    action: "create",
    displayName: "Create Coupons",
    description: "Create new coupon codes",
  },
  {
    resource: "coupons",
    action: "update",
    displayName: "Update Coupons",
    description: "Update existing coupons",
  },
  {
    resource: "coupons",
    action: "delete",
    displayName: "Delete Coupons",
    description: "Delete coupon codes",
  },
  {
    resource: "coupons",
    action: "activate",
    displayName: "Activate/Deactivate Coupons",
    description: "Activate and deactivate coupon codes",
  },
  {
    resource: "coupons",
    action: "view_usage",
    displayName: "View Coupon Usage",
    description: "View coupon usage statistics",
  },
  {
    resource: "coupons",
    action: "bulk_operations",
    displayName: "Bulk Coupon Operations",
    description: "Perform bulk operations on coupons",
  },

  // CUSTOMER MANAGEMENT - Complete set
  {
    resource: "customers",
    action: "view",
    displayName: "View Customers",
    description: "View customer profiles and information",
  },
  {
    resource: "customers",
    action: "create",
    displayName: "Create Customers",
    description: "Create new customer accounts",
  },
  {
    resource: "customers",
    action: "update",
    displayName: "Update Customers",
    description: "Update customer profiles",
  },
  {
    resource: "customers",
    action: "delete",
    displayName: "Delete Customers",
    description: "Delete customer accounts",
  },
  {
    resource: "customers",
    action: "view_orders",
    displayName: "View Customer Orders",
    description: "View customer order history",
  },
  {
    resource: "customers",
    action: "manage_groups",
    displayName: "Manage Customer Groups",
    description: "Create and manage customer groups",
  },
  {
    resource: "customers",
    action: "export",
    displayName: "Export Customer Data",
    description: "Export customer data and reports",
  },

  // SYSTEM SETTINGS - Complete set
  {
    resource: "settings",
    action: "view",
    displayName: "View Settings",
    description: "View system settings and configuration",
  },
  {
    resource: "settings",
    action: "update",
    displayName: "Update Settings",
    description: "Update system settings and configuration",
  },
  {
    resource: "settings",
    action: "manage_payment",
    displayName: "Payment Settings",
    description: "Configure payment gateways and settings",
  },
  {
    resource: "settings",
    action: "manage_email",
    displayName: "Email Settings",
    description: "Configure email templates and SMTP settings",
  },
  {
    resource: "settings",
    action: "manage_seo",
    displayName: "SEO Settings",
    description: "Configure SEO settings and meta data",
  },
  {
    resource: "settings",
    action: "manage_security",
    displayName: "Security Settings",
    description: "Configure security settings and policies",
  },
  {
    resource: "settings",
    action: "manage_integrations",
    displayName: "Integration Settings",
    description: "Configure third-party integrations",
  },
  {
    resource: "settings",
    action: "manage_localization",
    displayName: "Localization Settings",
    description: "Configure language and regional settings",
  },
  {
    resource: "settings",
    action: "backup_restore",
    displayName: "Backup & Restore",
    description: "Manage system backups and restoration",
  },

  // ROLE MANAGEMENT - Complete set
  {
    resource: "roles",
    action: "view",
    displayName: "View Roles",
    description: "View system roles and permissions",
  },
  {
    resource: "roles",
    action: "create",
    displayName: "Create Roles",
    description: "Create new system roles",
  },
  {
    resource: "roles",
    action: "update",
    displayName: "Update Roles",
    description: "Update existing roles and permissions",
  },
  {
    resource: "roles",
    action: "delete",
    displayName: "Delete Roles",
    description: "Delete system roles",
  },
  {
    resource: "roles",
    action: "assign_permissions",
    displayName: "Assign Permissions",
    description: "Assign permissions to roles",
  },
  {
    resource: "roles",
    action: "view_audit",
    displayName: "View Role Audit",
    description: "View role change audit logs",
  },

  // ANALYTICS - Complete set
  {
    resource: "analytics",
    action: "view",
    displayName: "View Analytics",
    description: "View analytics and reports",
  },
  {
    resource: "analytics",
    action: "export",
    displayName: "Export Analytics",
    description: "Export analytics data and reports",
  },
  {
    resource: "analytics",
    action: "view_users",
    displayName: "User Analytics",
    description: "View user analytics and behavior data",
  },
  {
    resource: "analytics",
    action: "view_sales",
    displayName: "Sales Analytics",
    description: "View sales analytics and revenue reports",
  },
  {
    resource: "analytics",
    action: "view_products",
    displayName: "Product Analytics",
    description: "View product performance analytics",
  },
  {
    resource: "analytics",
    action: "view_traffic",
    displayName: "Traffic Analytics",
    description: "View website traffic analytics",
  },
  {
    resource: "analytics",
    action: "view_conversion",
    displayName: "Conversion Analytics",
    description: "View conversion rate analytics",
  },
  {
    resource: "analytics",
    action: "create_reports",
    displayName: "Create Custom Reports",
    description: "Create custom analytics reports",
  },
  {
    resource: "analytics",
    action: "schedule_reports",
    displayName: "Schedule Reports",
    description: "Schedule automated report generation",
  },

  // BILLING - Complete set
  {
    resource: "billing",
    action: "view",
    displayName: "View Billing",
    description: "View billing information and invoices",
  },
  {
    resource: "billing",
    action: "manage",
    displayName: "Manage Billing",
    description: "Manage billing settings and payments",
  },
  {
    resource: "billing",
    action: "manage_invoices",
    displayName: "Manage Invoices",
    description: "Create and manage invoices",
  },
  {
    resource: "billing",
    action: "manage_taxes",
    displayName: "Tax Management",
    description: "Configure tax settings and rates",
  },
  {
    resource: "billing",
    action: "manage_subscriptions",
    displayName: "Manage Subscriptions",
    description: "Manage customer subscriptions",
  },
  {
    resource: "billing",
    action: "process_payments",
    displayName: "Process Payments",
    description: "Process and manage payments",
  },
  {
    resource: "billing",
    action: "view_financial_reports",
    displayName: "Financial Reports",
    description: "View financial reports and statements",
  },

  // AI TOOLS - Complete set
  {
    resource: "ai",
    action: "view",
    displayName: "View AI Tools",
    description: "Access AI tools and features",
  },
  {
    resource: "ai",
    action: "chat",
    displayName: "AI Chat",
    description: "Use AI chat features",
  },
  {
    resource: "ai",
    action: "generate_content",
    displayName: "AI Content Generation",
    description: "Generate content using AI",
  },
  {
    resource: "ai",
    action: "manage_models",
    displayName: "Manage AI Models",
    description: "Configure and manage AI models",
  },
  {
    resource: "ai",
    action: "manage_settings",
    displayName: "AI Settings",
    description: "Configure AI tool settings",
  },
  {
    resource: "ai",
    action: "train_models",
    displayName: "Train AI Models",
    description: "Train and fine-tune AI models",
  },
  {
    resource: "ai",
    action: "view_usage",
    displayName: "View AI Usage",
    description: "View AI tool usage statistics",
  },
  {
    resource: "ai",
    action: "manage_prompts",
    displayName: "Manage AI Prompts",
    description: "Create and manage AI prompts",
  },

  // SUPPORT - Complete set
  {
    resource: "support",
    action: "view",
    displayName: "View Support Tickets",
    description: "View customer support tickets",
  },
  {
    resource: "support",
    action: "respond",
    displayName: "Respond to Support",
    description: "Respond to customer support tickets",
  },
  {
    resource: "support",
    action: "escalate",
    displayName: "Escalate Support",
    description: "Escalate support tickets",
  },
  {
    resource: "support",
    action: "close",
    displayName: "Close Support Tickets",
    description: "Close and resolve support tickets",
  },
  {
    resource: "support",
    action: "assign",
    displayName: "Assign Support Tickets",
    description: "Assign tickets to support agents",
  },
  {
    resource: "support",
    action: "manage_categories",
    displayName: "Manage Support Categories",
    description: "Create and manage support categories",
  },
  {
    resource: "support",
    action: "view_analytics",
    displayName: "Support Analytics",
    description: "View support performance analytics",
  },
  {
    resource: "support",
    action: "manage_knowledge_base",
    displayName: "Manage Knowledge Base",
    description: "Manage support knowledge base",
  },

  // API ACCESS - API Only
  {
    resource: "api",
    action: "read",
    displayName: "API Read Access",
    description: "Read access to API endpoints",
  },
  {
    resource: "api",
    action: "write",
    displayName: "API Write Access",
    description: "Write access to API endpoints",
  },
  {
    resource: "api",
    action: "admin",
    displayName: "API Admin Access",
    description: "Administrative access to API endpoints",
  },
  {
    resource: "api",
    action: "manage_keys",
    displayName: "Manage API Keys",
    description: "Create and manage API keys",
  },
  {
    resource: "api",
    action: "view_logs",
    displayName: "View API Logs",
    description: "View API access logs and usage",
  },
  {
    resource: "api",
    action: "rate_limit_override",
    displayName: "Override Rate Limits",
    description: "Override API rate limiting",
  },

  // DASHBOARD - UI Only
  {
    resource: "dashboard",
    action: "view",
    displayName: "View Dashboard",
    description: "Access to main dashboard interface",
  },
  {
    resource: "dashboard",
    action: "customize",
    displayName: "Customize Dashboard",
    description: "Customize dashboard layout and widgets",
  },
  {
    resource: "dashboard",
    action: "create_widgets",
    displayName: "Create Dashboard Widgets",
    description: "Create custom dashboard widgets",
  },
  {
    resource: "dashboard",
    action: "share",
    displayName: "Share Dashboard",
    description: "Share dashboard views with others",
  },

  // NOTIFICATIONS - Both API & UI
  {
    resource: "notifications",
    action: "view",
    displayName: "View Notifications",
    description: "View system notifications",
  },
  {
    resource: "notifications",
    action: "create",
    displayName: "Create Notifications",
    description: "Create system notifications via API",
  },
  {
    resource: "notifications",
    action: "manage",
    displayName: "Manage Notifications",
    description: "Manage notification settings and preferences",
  },
  {
    resource: "notifications",
    action: "send_bulk",
    displayName: "Send Bulk Notifications",
    description: "Send notifications to multiple users",
  },
  {
    resource: "notifications",
    action: "manage_templates",
    displayName: "Manage Notification Templates",
    description: "Create and manage notification templates",
  },

  // FILE MANAGEMENT - Both API & UI
  {
    resource: "files",
    action: "view",
    displayName: "View Files",
    description: "View uploaded files and media",
  },
  {
    resource: "files",
    action: "upload",
    displayName: "Upload Files",
    description: "Upload files and media",
  },
  {
    resource: "files",
    action: "delete",
    displayName: "Delete Files",
    description: "Delete files and media",
  },
  {
    resource: "files",
    action: "manage",
    displayName: "Manage Files",
    description: "Full file management capabilities",
  },
  {
    resource: "files",
    action: "organize",
    displayName: "Organize Files",
    description: "Create folders and organize files",
  },
  {
    resource: "files",
    action: "share",
    displayName: "Share Files",
    description: "Share files with other users",
  },
  {
    resource: "files",
    action: "set_permissions",
    displayName: "Set File Permissions",
    description: "Set access permissions for files",
  },

  // MARKETING - Both API & UI
  {
    resource: "marketing",
    action: "view",
    displayName: "View Marketing",
    description: "View marketing campaigns and tools",
  },
  {
    resource: "marketing",
    action: "create_campaigns",
    displayName: "Create Marketing Campaigns",
    description: "Create and manage marketing campaigns",
  },
  {
    resource: "marketing",
    action: "manage_email",
    displayName: "Email Marketing",
    description: "Manage email marketing campaigns",
  },
  {
    resource: "marketing",
    action: "manage_social",
    displayName: "Social Media Marketing",
    description: "Manage social media marketing",
  },
  {
    resource: "marketing",
    action: "view_analytics",
    displayName: "Marketing Analytics",
    description: "View marketing campaign analytics",
  },
  {
    resource: "marketing",
    action: "manage_automation",
    displayName: "Marketing Automation",
    description: "Set up marketing automation workflows",
  },

  // INVENTORY - Both API & UI
  {
    resource: "inventory",
    action: "view",
    displayName: "View Inventory",
    description: "View inventory levels and stock",
  },
  {
    resource: "inventory",
    action: "update",
    displayName: "Update Inventory",
    description: "Update inventory levels and stock",
  },
  {
    resource: "inventory",
    action: "track_movements",
    displayName: "Track Inventory Movements",
    description: "Track inventory movements and changes",
  },
  {
    resource: "inventory",
    action: "manage_warehouses",
    displayName: "Manage Warehouses",
    description: "Manage warehouse locations and settings",
  },
  {
    resource: "inventory",
    action: "set_alerts",
    displayName: "Set Inventory Alerts",
    description: "Set low stock and inventory alerts",
  },
  {
    resource: "inventory",
    action: "generate_reports",
    displayName: "Generate Inventory Reports",
    description: "Generate inventory reports and analytics",
  },

  // LOGS & AUDIT - Both API & UI
  {
    resource: "logs",
    action: "view",
    displayName: "View System Logs",
    description: "View system logs and audit trails",
  },
  {
    resource: "logs",
    action: "export",
    displayName: "Export Logs",
    description: "Export system logs and audit data",
  },
  {
    resource: "logs",
    action: "manage_retention",
    displayName: "Manage Log Retention",
    description: "Configure log retention policies",
  },
  {
    resource: "logs",
    action: "view_security",
    displayName: "View Security Logs",
    description: "View security-related logs and events",
  },
];

// Main roles with comprehensive permissions
const mainRoles = [
  {
    name: "Super Administrator",
    displayName: "Super Administrator",
    description: "Ultimate system access with all permissions - highest security clearance",
    isSystem: true,
    isActive: true,
    permissions: comprehensivePermissions.map((p) => `${p.resource}.${p.action}`), // ALL permissions
  },
  {
    name: "System Administrator",
    displayName: "System Administrator",
    description: "Full administrative access with system management capabilities",
    isSystem: false,
    isActive: true,
    permissions: [
      // User Management - Full
      "users.view", "users.create", "users.update", "users.delete", "users.ban", "users.verify", "users.assign_roles", "users.impersonate", "users.export", "users.bulk_operations",
      // Content Management - Full
      "content.view", "content.create", "content.update", "content.delete", "content.publish", "content.moderate", "content.schedule", "content.archive", "content.manage_categories", "content.manage_tags",
      // Product Management - Full
      "products.view", "products.create", "products.update", "products.delete", "products.manage_pricing", "products.manage_inventory", "products.manage_categories", "products.manage_variants", "products.manage_attributes", "products.bulk_operations", "products.import_export",
      // Order Management - Full
      "orders.view", "orders.create", "orders.update", "orders.cancel", "orders.refund", "orders.update_status", "orders.manage_shipping", "orders.manage_returns", "orders.view_payments", "orders.export",
      // Customer Management - Full
      "customers.view", "customers.create", "customers.update", "customers.delete", "customers.view_orders", "customers.manage_groups", "customers.export",
      // System Settings - Full
      "settings.view", "settings.update", "settings.manage_payment", "settings.manage_email", "settings.manage_seo", "settings.manage_security", "settings.manage_integrations", "settings.manage_localization", "settings.backup_restore",
      // Role Management - Full
      "roles.view", "roles.create", "roles.update", "roles.delete", "roles.assign_permissions", "roles.view_audit",
      // Analytics - Full
      "analytics.view", "analytics.export", "analytics.view_users", "analytics.view_sales", "analytics.view_products", "analytics.view_traffic", "analytics.view_conversion", "analytics.create_reports", "analytics.schedule_reports",
      // Billing - Full
      "billing.view", "billing.manage", "billing.manage_invoices", "billing.manage_taxes", "billing.manage_subscriptions", "billing.process_payments", "billing.view_financial_reports",
      // AI Tools - Full
      "ai.view", "ai.chat", "ai.generate_content", "ai.manage_models", "ai.manage_settings", "ai.train_models", "ai.view_usage", "ai.manage_prompts",
      // Support - Full
      "support.view", "support.respond", "support.escalate", "support.close", "support.assign", "support.manage_categories", "support.view_analytics", "support.manage_knowledge_base",
      // API Access - Full
      "api.read", "api.write", "api.admin", "api.manage_keys", "api.view_logs", "api.rate_limit_override",
      // Dashboard - Full
      "dashboard.view", "dashboard.customize", "dashboard.create_widgets", "dashboard.share",
      // Notifications - Full
      "notifications.view", "notifications.create", "notifications.manage", "notifications.send_bulk", "notifications.manage_templates",
      // Files - Full
      "files.view", "files.upload", "files.delete", "files.manage", "files.organize", "files.share", "files.set_permissions",
      // Marketing - Full
      "marketing.view", "marketing.create_campaigns", "marketing.manage_email", "marketing.manage_social", "marketing.view_analytics", "marketing.manage_automation",
      // Inventory - Full
      "inventory.view", "inventory.update", "inventory.track_movements", "inventory.manage_warehouses", "inventory.set_alerts", "inventory.generate_reports",
      // Logs - Full
      "logs.view", "logs.export", "logs.manage_retention", "logs.view_security",
      // Coupons - Full
      "coupons.view", "coupons.create", "coupons.update", "coupons.delete", "coupons.activate", "coupons.view_usage", "coupons.bulk_operations",
    ],
  },
  {
    name: "Business Manager",
    displayName: "Business Manager",
    description: "Business operations management with comprehensive access to core business functions",
    isSystem: false,
    isActive: true,
    permissions: [
      // User Management - Limited
      "users.view", "users.create", "users.update", "users.assign_roles", "users.export",
      // Content Management - Full
      "content.view", "content.create", "content.update", "content.delete", "content.publish", "content.moderate", "content.schedule", "content.manage_categories", "content.manage_tags",
      // Product Management - Full
      "products.view", "products.create", "products.update", "products.delete", "products.manage_pricing", "products.manage_inventory", "products.manage_categories", "products.manage_variants", "products.bulk_operations", "products.import_export",
      // Order Management - Full
      "orders.view", "orders.create", "orders.update", "orders.cancel", "orders.refund", "orders.update_status", "orders.manage_shipping", "orders.manage_returns", "orders.view_payments", "orders.export",
      // Customer Management - Full
      "customers.view", "customers.create", "customers.update", "customers.view_orders", "customers.manage_groups", "customers.export",
      // Analytics - Full
      "analytics.view", "analytics.export", "analytics.view_users", "analytics.view_sales", "analytics.view_products", "analytics.view_traffic", "analytics.view_conversion", "analytics.create_reports",
      // Billing - View Only
      "billing.view", "billing.view_financial_reports",
      // AI Tools - Basic
      "ai.view", "ai.chat", "ai.generate_content", "ai.view_usage",
      // Support - Full
      "support.view", "support.respond", "support.escalate", "support.close", "support.assign", "support.view_analytics",
      // Dashboard - Full
      "dashboard.view", "dashboard.customize", "dashboard.create_widgets",
      // Notifications - Manage
      "notifications.view", "notifications.manage", "notifications.send_bulk",
      // Files - Full
      "files.view", "files.upload", "files.delete", "files.manage", "files.organize", "files.share",
      // Marketing - Full
      "marketing.view", "marketing.create_campaigns", "marketing.manage_email", "marketing.manage_social", "marketing.view_analytics", "marketing.manage_automation",
      // Inventory - Full
      "inventory.view", "inventory.update", "inventory.track_movements", "inventory.set_alerts", "inventory.generate_reports",
      // Coupons - Full
      "coupons.view", "coupons.create", "coupons.update", "coupons.delete", "coupons.activate", "coupons.view_usage", "coupons.bulk_operations",
      // API Access - Read/Write
      "api.read", "api.write",
    ],
  },
  {
    name: "Operations Manager",
    displayName: "Operations Manager",
    description: "Day-to-day operations management with focus on orders, inventory, and customer service",
    isSystem: false,
    isActive: true,
    permissions: [
      // User Management - View Only
      "users.view",
      // Content Management - Limited
      "content.view", "content.update", "content.moderate",
      // Product Management - Limited
      "products.view", "products.update", "products.manage_inventory", "products.manage_variants",
      // Order Management - Full
      "orders.view", "orders.create", "orders.update", "orders.cancel", "orders.refund", "orders.update_status", "orders.manage_shipping", "orders.manage_returns", "orders.view_payments", "orders.export",
      // Customer Management - Full
      "customers.view", "customers.create", "customers.update", "customers.view_orders", "customers.manage_groups", "customers.export",
      // Analytics - Operations Focus
      "analytics.view", "analytics.view_sales", "analytics.view_products", "analytics.create_reports",
      // Support - Full
      "support.view", "support.respond", "support.escalate", "support.close", "support.assign", "support.view_analytics", "support.manage_knowledge_base",
      // Dashboard - View/Customize
      "dashboard.view", "dashboard.customize",
      // Notifications - View/Manage
      "notifications.view", "notifications.manage",
      // Files - Basic
      "files.view", "files.upload", "files.organize",
      // Inventory - Full
      "inventory.view", "inventory.update", "inventory.track_movements", "inventory.manage_warehouses", "inventory.set_alerts", "inventory.generate_reports",
      // Coupons - Manage
      "coupons.view", "coupons.create", "coupons.update", "coupons.activate", "coupons.view_usage",
      // API Access - Read
      "api.read",
    ],
  },
  {
    name: "Marketing Manager",
    displayName: "Marketing Manager",
    description: "Marketing and promotional activities management with content and campaign focus",
    isSystem: false,
    isActive: true,
    permissions: [
      // User Management - View Only
      "users.view",
      // Content Management - Full
      "content.view", "content.create", "content.update", "content.delete", "content.publish", "content.schedule", "content.manage_categories", "content.manage_tags",
      // Product Management - View/Update
      "products.view", "products.update", "products.manage_categories",
      // Customer Management - View/Groups
      "customers.view", "customers.manage_groups", "customers.export",
      // Analytics - Marketing Focus
      "analytics.view", "analytics.export", "analytics.view_users", "analytics.view_traffic", "analytics.view_conversion", "analytics.create_reports",
      // AI Tools - Content Generation
      "ai.view", "ai.chat", "ai.generate_content", "ai.manage_prompts",
      // Dashboard - View/Customize
      "dashboard.view", "dashboard.customize",
      // Notifications - Full
      "notifications.view", "notifications.manage", "notifications.send_bulk", "notifications.manage_templates",
      // Files - Full
      "files.view", "files.upload", "files.delete", "files.manage", "files.organize", "files.share",
      // Marketing - Full
      "marketing.view", "marketing.create_campaigns", "marketing.manage_email", "marketing.manage_social", "marketing.view_analytics", "marketing.manage_automation",
      // Coupons - Full
      "coupons.view", "coupons.create", "coupons.update", "coupons.delete", "coupons.activate", "coupons.view_usage", "coupons.bulk_operations",
      // API Access - Read
      "api.read",
    ],
  },
  {
    name: "Content Creator",
    displayName: "Content Creator",
    description: "Content creation and management with publishing capabilities",
    isSystem: false,
    isActive: true,
    permissions: [
      // Content Management - Full
      "content.view", "content.create", "content.update", "content.delete", "content.publish", "content.schedule", "content.manage_categories", "content.manage_tags",
      // Product Management - View Only
      "products.view",
      // AI Tools - Content Focus
      "ai.view", "ai.chat", "ai.generate_content", "ai.manage_prompts",
      // Dashboard - View
      "dashboard.view",
      // Notifications - View
      "notifications.view",
      // Files - Full
      "files.view", "files.upload", "files.delete", "files.manage", "files.organize", "files.share",
      // API Access - Read
      "api.read",
    ],
  },
  {
    name: "Customer Support Agent",
    displayName: "Customer Support Agent",
    description: "Customer service and support with order and customer management access",
    isSystem: false,
    isActive: true,
    permissions: [
      // User Management - View Only
      "users.view",
      // Order Management - Support Focus
      "orders.view", "orders.update_status", "orders.refund", "orders.manage_returns",
      // Customer Management - Support Focus
      "customers.view", "customers.update", "customers.view_orders",
      // Support - Full
      "support.view", "support.respond", "support.escalate", "support.close", "support.manage_knowledge_base",
      // Dashboard - View
      "dashboard.view",
      // Notifications - View
      "notifications.view",
      // Files - Basic
      "files.view", "files.upload",
      // API Access - Read
      "api.read",
    ],
  },
  {
    name: "Data Analyst",
    displayName: "Data Analyst",
    description: "Analytics and reporting specialist with comprehensive data access",
    isSystem: false,
    isActive: true,
    permissions: [
      // Analytics - Full
      "analytics.view", "analytics.export", "analytics.view_users", "analytics.view_sales", "analytics.view_products", "analytics.view_traffic", "analytics.view_conversion", "analytics.create_reports", "analytics.schedule_reports",
      // User Management - View Only
      "users.view",
      // Content Management - View Only
      "content.view",
      // Product Management - View Only
      "products.view",
      // Order Management - View Only
      "orders.view", "orders.export",
      // Customer Management - View/Export
      "customers.view", "customers.export",
      // Billing - View Reports
      "billing.view_financial_reports",
      // Marketing - View Analytics
      "marketing.view_analytics",
      // Support - View Analytics
      "support.view_analytics",
      // Dashboard - Full
      "dashboard.view", "dashboard.customize", "dashboard.create_widgets",
      // Inventory - View Reports
      "inventory.generate_reports",
      // Logs - View
      "logs.view", "logs.export",
      // API Access - Read
      "api.read",
    ],
  },
  {
    name: "Standard User",
    displayName: "Standard User",
    description: "Basic user access with essential features and limited permissions",
    isSystem: false,
    isActive: true,
    permissions: [
      // Content Management - View Only
      "content.view",
      // Product Management - View Only
      "products.view",
      // Order Management - Own Orders
      "orders.view",
      // AI Tools - Basic
      "ai.view", "ai.chat", "ai.generate_content",
      // Dashboard - View
      "dashboard.view",
      // Notifications - View
      "notifications.view",
      // Files - Basic
      "files.view", "files.upload",
      // API Access - Read
      "api.read",
    ],
  },
  {
    name: "API Developer",
    displayName: "API Developer",
    description: "API-focused access for developers and integrations",
    isSystem: false,
    isActive: true,
    permissions: [
      // API Access - Full
      "api.read", "api.write", "api.manage_keys", "api.view_logs",
      // User Management - API
      "users.view", "users.create", "users.update",
      // Content Management - API
      "content.view", "content.create", "content.update",
      // Product Management - API
      "products.view", "products.create", "products.update",
      // Order Management - API
      "orders.view", "orders.create", "orders.update",
      // Customer Management - API
      "customers.view", "customers.create", "customers.update",
      // Notifications - Create
      "notifications.create",
    ],
  },
  {
    name: "Read-Only User",
    displayName: "Read-Only User",
    description: "View-only access to system data and reports",
    isSystem: false,
    isActive: true,
    permissions: [
      // Basic View Permissions
      "content.view",
      "products.view",
      "orders.view",
      "customers.view",
      "analytics.view",
      "dashboard.view",
      "notifications.view",
      "files.view",
      "api.read",
    ],
  },
];

export async function seedComprehensiveRoles() {
  console.log("🌱 Seeding comprehensive roles and permissions...");

  try {
    // Create permissions first
  console.log("📝 Creating comprehensive permissions...");
  for (const permission of comprehensivePermissions) {
    await prisma.permission.upsert({
      where: {
        roleId_entity_field_action: {
          roleId: "temp-role-id", // This will be updated when creating roles
          entity: permission.resource,
          field: "*",
          action: permission.action,
        },
      },
      update: {
        entity: permission.resource,
        field: "*",
        action: permission.action,
      },
      create: {
        roleId: "temp-role-id", // This will be updated when creating roles
        entity: permission.resource,
        field: "*",
        action: permission.action,
      },
    });
  }
    console.log(`✅ Created ${comprehensivePermissions.length} comprehensive permissions`);

    // Create roles and assign permissions
    console.log("👥 Creating comprehensive roles...");
    for (const role of mainRoles) {
      // Create or update role
      const createdRole = await prisma.role.upsert({
        where: { name: role.name },
        update: {
          description: role.description,
          isActive: role.isActive,
        },
        create: {
          name: role.name,
          description: role.description,
          isActive: role.isActive,
        },
      });

      // Clear existing role permissions
      await prisma.permission.deleteMany({
        where: { roleId: createdRole.id },
      });

      // Add new permissions to role
      for (const permissionKey of role.permissions) {
        const [resource, action] = permissionKey.split(".");
        
        // Create permission for this role
        await prisma.permission.create({
          data: {
            roleId: createdRole.id,
            entity: resource,
            field: "*", // Default to all fields
            action: action,
          },
        });
      }

      console.log(`✅ Created comprehensive role: ${role.name} with ${role.permissions.length} permissions`);
    }

    console.log("🎉 Comprehensive roles and permissions seeded successfully!");
  } catch (error) {
    console.error("❌ Error seeding comprehensive roles:", error);
    throw error;
  }
}

// Run directly if this file is executed
if (require.main === module) {
  seedComprehensiveRoles()
    .catch((e) => {
      console.error(e);
      process.exit(1);
    })
    .finally(async () => {
      await prisma.$disconnect();
    });
}
