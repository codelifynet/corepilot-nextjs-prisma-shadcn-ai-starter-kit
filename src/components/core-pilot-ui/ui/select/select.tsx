"use client";

import type React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import {
	Select as BaseSelect,
	SelectContent as BaseSelectContent,
	SelectItem as BaseSelectItem,
	SelectTrigger as BaseSelectTrigger,
	SelectValue as BaseSelectValue,
	SelectGroup,
	SelectLabel,
	SelectSeparator,
} from "@/components/ui/select";
import { cn } from "@/lib/utils";

// Enhanced select trigger variants
const selectTriggerVariants = cva(
	"flex w-full items-center justify-between rounded-md border px-3 py-2 text-sm transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
	{
		variants: {
			variant: {
				default: "border-input bg-background hover:bg-accent/50 focus:ring-ring",
				filled: "bg-muted border-muted hover:bg-muted/80 focus:ring-ring",
				ghost: "border-transparent bg-transparent hover:bg-accent/50 focus:ring-ring",
				outline: "border-2 border-border bg-transparent hover:border-accent-foreground/20 focus:ring-ring",
			},
			size: {
				sm: "h-8 px-2 text-xs",
				default: "h-9 px-3 text-sm",
				lg: "h-10 px-4 text-base",
				xl: "h-12 px-5 text-lg",
			},
			state: {
				default: "",
				success: "border-green-500 focus:ring-green-500",
				warning: "border-yellow-500 focus:ring-yellow-500", 
				error: "border-red-500 focus:ring-red-500",
			},
		},
		defaultVariants: {
			variant: "default",
			size: "default",
			state: "default",
		},
	}
);

// Enhanced select content variants
const selectContentVariants = cva(
	"relative z-50 max-h-96 min-w-[8rem] overflow-hidden rounded-md border bg-popover text-popover-foreground shadow-md animate-in fade-in-0 zoom-in-95",
	{
		variants: {
			size: {
				sm: "text-xs",
				default: "text-sm",
				lg: "text-base",
				xl: "text-lg",
			},
		},
		defaultVariants: {
			size: "default",
		},
	}
);

// Enhanced select item variants
const selectItemVariants = cva(
	"relative flex w-full cursor-default select-none items-center rounded-sm py-1.5 pl-8 pr-2 text-sm outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50",
	{
		variants: {
			size: {
				sm: "py-1 text-xs",
				default: "py-1.5 text-sm",
				lg: "py-2 text-base",
				xl: "py-2.5 text-lg",
			},
		},
		defaultVariants: {
			size: "default",
		},
	}
);

export interface SelectOption {
	value: string;
	label: string;
	disabled?: boolean;
	icon?: React.ReactNode;
	description?: string;
	group?: string;
}

export interface SelectProps extends VariantProps<typeof selectTriggerVariants> {
	options: SelectOption[];
	value?: string;
	defaultValue?: string;
	onValueChange?: (value: string) => void;
	placeholder?: string;
	disabled?: boolean;
	className?: string;
	contentClassName?: string;
	triggerClassName?: string;
	itemClassName?: string;
	icon?: React.ReactNode;
	iconPosition?: "left" | "right";
	allowSearch?: boolean;
	searchPlaceholder?: string;
	emptyMessage?: string;
	multiple?: boolean;
	maxSelected?: number;
}

function SelectTrigger({
	className,
	variant = "default",
	size = "default", 
	state = "default",
	children,
	...props
}: Omit<React.ComponentProps<typeof BaseSelectTrigger>, "size"> & VariantProps<typeof selectTriggerVariants>) {
	// Map xl size to lg for base component compatibility
	const baseSize = size === "xl" ? "lg" : size;
	
	return (
		<BaseSelectTrigger
			size={baseSize || "lg"}
			className={cn(selectTriggerVariants({ variant, size, state }), className)}
			{...props}
		>
			{children}
		</BaseSelectTrigger>
	);
}

function SelectContent({
	className,
	size = "default",
	children,
	...props
}: React.ComponentProps<typeof BaseSelectContent> & VariantProps<typeof selectContentVariants>) {
	return (
		<BaseSelectContent
			className={cn(selectContentVariants({ size }), className)}
			{...props}
		>
			{children}
		</BaseSelectContent>
	);
}

function SelectItem({
	className,
	size = "default",
	children,
	...props
}: React.ComponentProps<typeof BaseSelectItem> & VariantProps<typeof selectItemVariants>) {
	return (
		<BaseSelectItem
			className={cn(selectItemVariants({ size }), className)}
			{...props}
		>
			{children}
		</BaseSelectItem>
	);
}

function SelectValue({
	...props
}: React.ComponentProps<typeof BaseSelectValue>) {
	return <BaseSelectValue {...props} />;
}

// Main Select component with enhanced features
function Select({
	options,
	value,
	defaultValue,
	onValueChange,
	placeholder = "Select an option...",
	disabled = false,
	className,
	contentClassName,
	triggerClassName,
	itemClassName,
	variant = "default",
	size = "default",
	state = "default",
	icon,
	iconPosition = "left",
	emptyMessage = "No options available",
	...props
}: SelectProps) {
	// Group options by group property
	const groupedOptions = options.reduce((acc, option) => {
		const group = option.group || "default";
		if (!acc[group]) {
			acc[group] = [];
		}
		acc[group].push(option);
		return acc;
	}, {} as Record<string, SelectOption[]>);

	const hasGroups = Object.keys(groupedOptions).length > 1 || !groupedOptions.default;

	return (
		<div className={cn("relative", className)}>
			<BaseSelect
				value={value}
				defaultValue={defaultValue}
				onValueChange={onValueChange}
				disabled={disabled}
				{...props}
			>
				<SelectTrigger
					variant={variant}
					size={size || "lg"}
					state={state}
					className={triggerClassName}
				>
					<div className="flex items-center gap-2">
						{icon && iconPosition === "left" && (
							<span className="flex items-center justify-center">
								{icon}
							</span>
						)}
						<SelectValue placeholder={placeholder} />
						{icon && iconPosition === "right" && (
							<span className="flex items-center justify-center">
								{icon}
							</span>
						)}
					</div>
				</SelectTrigger>
				
				<SelectContent size={size} className={contentClassName}>
					{options.length === 0 ? (
						<div className="py-6 text-center text-sm text-muted-foreground">
							{emptyMessage}
						</div>
					) : hasGroups ? (
						Object.entries(groupedOptions).map(([groupName, groupOptions]) => (
							<div key={groupName}>
								{groupName !== "default" && (
										<SelectLabel className="px-2 py-1.5 text-xs font-semibold text-muted-foreground">
											{groupName}
										</SelectLabel>
								)}
								<SelectGroup>
									{groupOptions.map((option) => (
										<SelectItem
											key={option.value}
											value={option.value}
											disabled={option.disabled}
											size={size}
											className={itemClassName}
										>
											<div className="flex items-center gap-2">
												{option.icon && (
													<span className="flex items-center justify-center">
														{option.icon}
													</span>
												)}
												<div className="flex flex-col">
													<span>{option.label}</span>
													{option.description && (
														<span className="text-xs text-muted-foreground">
															{option.description}
														</span>
													)}
												</div>
											</div>
										</SelectItem>
									))}
								</SelectGroup>
								{groupName !== Object.keys(groupedOptions)[Object.keys(groupedOptions).length - 1] && (
									<SelectSeparator />
								)}
							</div>
						))
					) : (
						options.map((option) => (
							<SelectItem
								key={option.value}
								value={option.value}
								disabled={option.disabled}
								size={size}
								className={itemClassName}
							>
								<div className="flex items-center gap-2">
									{option.icon && (
										<span className="flex items-center justify-center">
											{option.icon}
										</span>
									)}
									<div className="flex flex-col">
										<span>{option.label}</span>
										{option.description && (
											<span className="text-xs text-muted-foreground">
												{option.description}
											</span>
										)}
									</div>
								</div>
							</SelectItem>
						))
					)}
				</SelectContent>
			</BaseSelect>
		</div>
	);
}

export {
	Select,
	SelectTrigger,
	SelectContent,
	SelectItem,
	SelectValue,
	SelectGroup,
	SelectLabel,
	SelectSeparator,
	selectTriggerVariants,
	selectContentVariants,
	selectItemVariants,
};
