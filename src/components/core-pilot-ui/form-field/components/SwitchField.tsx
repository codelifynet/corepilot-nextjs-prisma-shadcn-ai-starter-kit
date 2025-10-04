import {
	FormControl,
	FormItem,
	FormLabel,
	FormMessage,
	FormDescription,
} from "@/components/ui/form";
import { Switch } from "@/components/ui/switch";
import { cn } from "@/lib/utils";
import type { SwitchFieldProps, RHFFieldProps } from "../types";

type SwitchFieldComponentProps = SwitchFieldProps & RHFFieldProps;

export function SwitchField({
	icon: Icon,
	label,
	description,
	descriptionIcon: DescriptionIcon,
	iconColor = "text-blue-500",
	className,
	showLabelIcon = true,
	disabled = false,
	required = false,
	switchLabel,
	field,
}: SwitchFieldComponentProps) {
	const fieldValue = field.value ?? false;

	const handleCheckedChange = (checked: boolean) => {
		field.onChange(checked);
	};

	return (
		<FormItem className={cn("space-y-3", className)}>
			{label && (
				<FormLabel className="flex items-center gap-2">
					{Icon && showLabelIcon && (
						<Icon className={cn("h-4 w-4", iconColor)} />
					)}
					{label}
					{required && <span className="text-red-500">*</span>}
				</FormLabel>
			)}
			<FormControl>
				<div className="flex items-center justify-between">
					<div className="space-y-0.5">
						{switchLabel && (
							<label
								htmlFor={field.name}
								className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
							>
								{switchLabel}
							</label>
						)}
						{description && (
							<div className="text-sm text-muted-foreground">{description}</div>
						)}
					</div>
					<Switch
						id={field.name}
						checked={fieldValue}
						onCheckedChange={handleCheckedChange}
						disabled={disabled}
						onBlur={field.onBlur}
					/>
				</div>
			</FormControl>
			{description && !switchLabel && (
				<FormDescription className="flex items-center gap-2">
					{DescriptionIcon && (
						<DescriptionIcon className={cn("h-3 w-3", iconColor)} />
					)}
					{description}
				</FormDescription>
			)}
			<FormMessage />
		</FormItem>
	);
}

export default SwitchField;
