// Export the new universal form field system
export { UniversalFormField } from "./UniversalFormField";
export * from "./types";
export * from "./components";

// Legacy FormFieldWithIcon component for backward compatibility
import {
	FormControl,
	FormItem,
	FormLabel,
	FormMessage,
	FormDescription,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
// import { AiInput } from "@/components/ui/ai-input";
import { cn } from "@/lib/utils";
import { AlertCircle, type LucideIcon } from "lucide-react";

export type InputType = "input" | "ai-input";
export type IconPosition = "left" | "right";

export interface FormFieldWithIconProps {
	/** The icon component to display in the label and input (optional) */
	icon?: LucideIcon;
	/** The label text for the form field (optional) */
	label?: string;
	/** The placeholder text for the input */
	placeholder?: string;
	/** The description text shown below the input (optional) */
	description?: string;
	/** Icon for the description (optional) */
	descriptionIcon?: LucideIcon;
	/** Maximum length for the input */
	maxLength?: number;
	/** Color class for the label icon (e.g., 'text-blue-500') */
	iconColor?: string;
	/** Color class for the focus border (e.g., 'focus:border-blue-500') */
	focusColor?: string;
	/** Additional CSS classes for the input */
	inputClassName?: string;
	/** Additional CSS classes for the FormItem */
	className?: string;
	/** Position of the icon in the input field */
	iconPosition?: IconPosition;
	/** Whether to show icon in label */
	showLabelIcon?: boolean;
	/** Whether to show icon in input field */
	showInputIcon?: boolean;
	/** Type of input component to use */
	inputType?: InputType;
	/** Whether the field is disabled */
	disabled?: boolean;
	/** Whether the field is required */
	required?: boolean;
	/** React Hook Form field object */
	field: {
		name: string;
		value: any;
		onChange: (value: any) => void;
		onBlur: () => void;
	};
}

export function FormFieldWithIcon({
	icon: Icon,
	label,
	placeholder,
	description,
	descriptionIcon: DescriptionIcon,
	maxLength,
	iconColor = "text-blue-500",
	focusColor = "focus:border-blue-500",
	inputClassName,
	className,
	iconPosition = "left",
	showLabelIcon = true,
	showInputIcon = true,
	// inputType = "input",
	disabled = false,
	required = false,
	field,
}: FormFieldWithIconProps) {
	// Ensure field.value is always a string to prevent undefined issues
	const fieldValue = field.value ?? "";

	const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		field.onChange(event.target.value);
	};

	// const handleAiInputChange = (value: string) => {
	//   field.onChange(value);
	// };

	const renderInput = () => {
		// if (inputType === "ai-input") {
		//   return (
		//     <AiInput
		//       placeholder={placeholder}
		//       value={fieldValue}
		//       onChange={handleAiInputChange}
		//       onBlur={field.onBlur}
		//       disabled={disabled}
		//       className={cn(
		//         "transition-colors duration-200",
		//         focusColor,
		//         inputClassName
		//       )}
		//     />
		//   );
		// }

		return (
			<div className="relative">
				{Icon && showInputIcon && iconPosition === "left" && (
					<Icon
						className={cn(
							"absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2",
							iconColor,
						)}
					/>
				)}
				<Input
					placeholder={placeholder}
					value={fieldValue}
					onChange={handleChange}
					onBlur={field.onBlur}
					disabled={disabled}
					maxLength={maxLength}
					className={cn(
						"transition-colors duration-200",
						focusColor,
						inputClassName,
						Icon && showInputIcon && iconPosition === "left" && "pl-10",
						Icon && showInputIcon && iconPosition === "right" && "pr-10",
					)}
				/>
				{Icon && showInputIcon && iconPosition === "right" && (
					<Icon
						className={cn(
							"absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2",
							iconColor,
						)}
					/>
				)}
			</div>
		);
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
			<FormControl>{renderInput()}</FormControl>
			{description && (
				<FormDescription className="flex items-center gap-2">
					{DescriptionIcon && (
						<DescriptionIcon className={cn("h-3 w-3", iconColor)} />
					)}
					{description}
				</FormDescription>
			)}
			<FormMessage className="flex items-center gap-2 text-red-600">
				<AlertCircle className="h-3 w-3" />
			</FormMessage>
		</FormItem>
	);
}

export default FormFieldWithIcon;
