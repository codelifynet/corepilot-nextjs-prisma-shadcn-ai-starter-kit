import {
	FormControl,
	FormItem,
	FormLabel,
	FormMessage,
	FormDescription,
} from "@/components/ui/form";
import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/lib/utils";
import type { TextareaFieldProps, RHFFieldProps } from "../types";

type TextareaFieldComponentProps = TextareaFieldProps & RHFFieldProps;

export function TextareaField({
	icon: Icon,
	label,
	placeholder = "",
	description,
	descriptionIcon: DescriptionIcon,
	maxLength,
	iconColor = "text-blue-500",
	focusColor = "focus:border-blue-500",
	inputClassName,
	className,
	showLabelIcon = true,
	disabled = false,
	required = false,
	rows = 4,
	resize = true,
	field,
}: TextareaFieldComponentProps) {
	const fieldValue = field.value ?? "";

	const handleChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
		field.onChange(event.target.value);
	};

	const textareaClasses = cn(
		focusColor,
		!resize && "resize-none",
		inputClassName,
	);

	return (
		<FormItem className={className}>
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
				<div className="relative">
					<Textarea
						placeholder={placeholder}
						disabled={disabled}
						className={textareaClasses}
						maxLength={maxLength}
						rows={rows}
						value={fieldValue}
						onChange={handleChange}
						onBlur={field.onBlur}
					/>
					{maxLength && (
						<div className="absolute bottom-2 right-2 text-xs text-muted-foreground">
							{fieldValue.length}/{maxLength}
						</div>
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

export default TextareaField;
