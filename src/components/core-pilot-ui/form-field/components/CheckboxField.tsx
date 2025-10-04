import {
	FormControl,
	FormItem,
	FormLabel,
	FormMessage,
	FormDescription,
} from "@/components/ui/form";
import { Checkbox } from "@/components/ui/checkbox";
import { cn } from "@/lib/utils";
import type { CheckboxFieldProps, RHFFieldProps } from "../types";

type CheckboxFieldComponentProps = CheckboxFieldProps & RHFFieldProps;

export function CheckboxField({
	icon: Icon,
	label,
	description,
	descriptionIcon: DescriptionIcon,
	iconColor = "text-blue-500",
	className,
	showLabelIcon = true,
	disabled = false,
	required = false,
	checkboxLabel,
	field,
}: CheckboxFieldComponentProps) {
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
				<div className="flex items-center space-x-2">
					<Checkbox
						id={field.name}
						checked={fieldValue}
						onCheckedChange={handleCheckedChange}
						disabled={disabled}
						onBlur={field.onBlur}
					/>
					{checkboxLabel && (
						<label
							htmlFor={field.name}
							className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 cursor-pointer"
						>
							{checkboxLabel}
						</label>
					)}
				</div>
			</FormControl>
			{description && (
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

export default CheckboxField;
