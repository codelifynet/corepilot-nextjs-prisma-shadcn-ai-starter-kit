import {
	FormControl,
	FormItem,
	FormLabel,
	FormMessage,
	FormDescription,
} from "@/components/ui/form";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";
import { cn } from "@/lib/utils";
import type { SelectFieldProps, RHFFieldProps } from "../types";

type SelectFieldComponentProps = SelectFieldProps & RHFFieldProps;

export function SelectField({
	icon: Icon,
	label,
	placeholder = "Select an option",
	description,
	descriptionIcon: DescriptionIcon,
	iconColor = "text-blue-500",
	inputClassName,
	className,
	showLabelIcon = true,
	disabled = false,
	required = false,
	options,
	multiple = false,
	field,
}: SelectFieldComponentProps) {
	const fieldValue = field.value ?? (multiple ? [] : "");

	const handleValueChange = (value: string) => {
		if (multiple) {
			const currentValues = Array.isArray(fieldValue) ? fieldValue : [];
			const newValues = currentValues.includes(value)
				? currentValues.filter((v) => v !== value)
				: [...currentValues, value];
			field.onChange(newValues);
		} else {
			field.onChange(value);
		}
	};

	const getDisplayValue = () => {
		if (multiple) {
			const selectedOptions = options.filter(
				(option) =>
					Array.isArray(fieldValue) && fieldValue.includes(option.value),
			);
			return selectedOptions.length > 0
				? `${selectedOptions.length} selected`
				: placeholder;
		}

		const selectedOption = options.find(
			(option) => option.value === fieldValue,
		);
		return selectedOption ? selectedOption.label : placeholder;
	};

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
				<Select
					value={multiple ? undefined : fieldValue}
					onValueChange={handleValueChange}
					disabled={disabled}
				>
					<SelectTrigger className={cn(inputClassName)}>
						<SelectValue placeholder={getDisplayValue()} />
					</SelectTrigger>
					<SelectContent>
						{options.map((option) => {
							const isSelected = multiple
								? Array.isArray(fieldValue) && fieldValue.includes(option.value)
								: fieldValue === option.value;

							return (
								<SelectItem
									key={option.value}
									value={option.value}
									disabled={option.disabled}
									className={cn(multiple && isSelected && "bg-accent")}
								>
									<div className="flex items-center gap-2">
										{option.icon && (
											<option.icon className={cn("h-4 w-4", iconColor)} />
										)}
										<span>{option.label}</span>
										{multiple && isSelected && (
											<span className="ml-auto text-xs">✓</span>
										)}
									</div>
								</SelectItem>
							);
						})}
					</SelectContent>
				</Select>
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

export default SelectField;
