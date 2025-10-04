import {
	FormControl,
	FormItem,
	FormLabel,
	FormMessage,
	FormDescription,
} from "@/components/ui/form";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";
import type { RadioFieldProps, RHFFieldProps } from "../types";

type RadioFieldComponentProps = RadioFieldProps & RHFFieldProps;

export function RadioField({
	icon: Icon,
	label,
	description,
	descriptionIcon: DescriptionIcon,
	iconColor = "text-blue-500",
	className,
	showLabelIcon = true,
	disabled = false,
	required = false,
	options,
	direction = "vertical",
	field,
}: RadioFieldComponentProps) {
	const fieldValue = field.value ?? "";

	const handleValueChange = (value: string) => {
		field.onChange(value);
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
				<div
					className={cn(
						"space-y-2",
						direction === "horizontal" && "flex flex-wrap gap-4 space-y-0",
					)}
				>
					{options.map((option) => (
						<div key={option.value} className="flex items-center space-x-2">
							<input
								type="radio"
								id={`${field.name}-${option.value}`}
								name={field.name}
								value={option.value}
								checked={fieldValue === option.value}
								onChange={() => handleValueChange(option.value)}
								onBlur={field.onBlur}
								disabled={disabled || option.disabled}
								className="h-4 w-4 text-primary focus:ring-primary border-gray-300 focus:ring-2"
							/>
							<div className="flex-1">
								<Label
									htmlFor={`${field.name}-${option.value}`}
									className={cn(
										"flex items-center gap-2 cursor-pointer",
										(disabled || option.disabled) &&
											"opacity-50 cursor-not-allowed",
									)}
								>
									{option.icon && (
										<option.icon className={cn("h-4 w-4", iconColor)} />
									)}
									<div>
										<div className="font-medium">{option.label}</div>
										{option.description && (
											<div className="text-sm text-muted-foreground">
												{option.description}
											</div>
										)}
									</div>
								</Label>
							</div>
						</div>
					))}
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

export default RadioField;
