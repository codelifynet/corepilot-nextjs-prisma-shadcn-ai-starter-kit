"use client";

import * as React from "react";
import * as TabsPrimitive from "@radix-ui/react-tabs";
import { cn } from "@/lib/utils";
import { cva, type VariantProps } from "class-variance-authority";

// Tabs variants - Simplified to 3 beautiful variants
const tabsListVariants = cva("inline-flex items-center w-full", {
	variants: {
		variant: {
			underline: "bg-transparent rounded-none p-0 gap-0",
			background: "bg-muted/50 backdrop-blur-sm rounded-lg p-1 gap-1",
			minimal: "bg-transparent rounded-none p-0 gap-2",
		},
	},
	defaultVariants: {
		variant: "underline",
	},
});

const tabsTriggerVariants = cva(
	"inline-flex items-center justify-center whitespace-nowrap font-medium ring-offset-background transition-all duration-300 ease-out focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 relative overflow-hidden px-4 py-2.5 text-sm gap-2 min-w-[100px]",
	{
		variants: {
			variant: {
				underline:
					"text-muted-foreground hover:text-primary/80 data-[state=active]:text-primary data-[state=active]:font-semibold rounded-none data-[state=active]:border-primary data-[state=active]:bg-transparent after:absolute after:bottom-0 after:left-0 after:h-0.5 after:w-0 after:bg-primary after:transition-all after:duration-300 data-[state=active]:after:w-full",
				background:
					"text-foreground/70 hover:text-primary hover:bg-primary/10 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground data-[state=active]:font-semibold data-[state=active]:shadow-sm rounded-lg transition-all duration-300 ease-out",
				minimal:
					"text-muted-foreground hover:text-primary/80 data-[state=active]:text-primary data-[state=active]:font-semibold rounded-none transition-colors duration-200",
			},
		},
		defaultVariants: {
			variant: "underline",
		},
	},
);

interface TabsProps
	extends React.ComponentPropsWithoutRef<typeof TabsPrimitive.Root> {
	variant?: VariantProps<typeof tabsListVariants>["variant"];
}

interface TabsListProps
	extends React.ComponentPropsWithoutRef<typeof TabsPrimitive.List> {
	variant?: VariantProps<typeof tabsListVariants>["variant"];
}

interface TabsTriggerProps
	extends React.ComponentPropsWithoutRef<typeof TabsPrimitive.Trigger> {
	variant?: VariantProps<typeof tabsTriggerVariants>["variant"];
	icon?: React.ReactNode;
	iconPosition?: "left" | "right";
}

interface TabData {
	label: string;
	value: string;
	content: React.ReactNode;
	icon?: React.ReactNode;
	iconPosition?: "left" | "right";
	disabled?: boolean;
}

interface TabsContainerProps {
	tabs: TabData[];
	defaultValue?: string;
	variant?: "underline" | "background" | "minimal";
	className?: string;
	onValueChange?: (value: string) => void;
}

const Tabs = React.forwardRef<
	React.ElementRef<typeof TabsPrimitive.Root>,
	TabsProps
>(({ className, ...props }, ref) => (
	<TabsPrimitive.Root
		ref={ref}
		className={cn("w-full max-w-full", className)}
		{...props}
	/>
));
Tabs.displayName = TabsPrimitive.Root.displayName;

const TabsList = React.forwardRef<
	React.ElementRef<typeof TabsPrimitive.List>,
	TabsListProps
>(({ className, variant, ...props }, ref) => (
	<TabsPrimitive.List
		ref={ref}
		className={cn(
			tabsListVariants({ variant }),
			"flex-nowrap sm:flex-wrap",
			className,
		)}
		{...props}
	/>
));
TabsList.displayName = TabsPrimitive.List.displayName;

const TabsTrigger = React.forwardRef<
	React.ElementRef<typeof TabsPrimitive.Trigger>,
	TabsTriggerProps
>(
	(
		{ className, variant, icon, iconPosition = "left", children, ...props },
		ref,
	) => (
		<TabsPrimitive.Trigger
			ref={ref}
			className={cn(tabsTriggerVariants({ variant }), className)}
			{...props}
		>
			{icon && iconPosition === "left" && (
				<span className="flex items-center justify-center shrink-0">
					{icon}
				</span>
			)}
			<span className="relative z-10 truncate">{children}</span>
			{icon && iconPosition === "right" && (
				<span className="flex items-center justify-center shrink-0">
					{icon}
				</span>
			)}
		</TabsPrimitive.Trigger>
	),
);
TabsTrigger.displayName = TabsPrimitive.Trigger.displayName;

const TabsContent = React.forwardRef<
	React.ElementRef<typeof TabsPrimitive.Content>,
	React.ComponentPropsWithoutRef<typeof TabsPrimitive.Content>
>(({ className, ...props }, ref) => (
	<TabsPrimitive.Content
		ref={ref}
		className={cn(
			"mt-2 ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
			className,
		)}
		{...props}
	/>
));
TabsContent.displayName = TabsPrimitive.Content.displayName;

const TabsContainer: React.FC<TabsContainerProps> = ({
	tabs,
	defaultValue,
	variant = "underline",
	className,
	onValueChange,
}) => {
	return (
		<Tabs
			defaultValue={defaultValue || tabs[0]?.value}
			onValueChange={onValueChange}
			className="w-full"
		>
			<TabsList variant={variant} className={className}>
				{tabs.map((tab) => (
					<TabsTrigger
						key={tab.value}
						value={tab.value}
						variant={variant}
						icon={tab.icon}
						iconPosition={tab.iconPosition || "left"}
						disabled={tab.disabled}
					>
						{tab.label}
					</TabsTrigger>
				))}
			</TabsList>
			{tabs.map((tab) => (
				<TabsContent key={tab.value} value={tab.value}>
					{tab.content}
				</TabsContent>
			))}
		</Tabs>
	);
};

export {
	Tabs,
	TabsList,
	TabsTrigger,
	TabsContent,
	TabsContainer,
	tabsListVariants,
	tabsTriggerVariants,
};
export type {
	TabsProps,
	TabsListProps,
	TabsTriggerProps,
	TabData,
	TabsContainerProps,
};
