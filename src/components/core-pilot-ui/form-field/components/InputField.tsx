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

import type { InputFieldProps, RHFFieldProps } from "../types";

type InputFieldComponentProps = InputFieldProps & RHFFieldProps;

export function InputField({
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
	iconPosition = "left",
	showLabelIcon = true,
	showInputIcon = false,
	disabled = false,
	required = false,
	type = "input",
	inputType = "text",
	field,
}: InputFieldComponentProps) {
	const fieldValue = field.value ?? "";

	const handleChange = (
		value: string | React.ChangeEvent<HTMLInputElement>,
	) => {
		if (type === "ai-input") {
			// AiInput passes the value directly as a string
			field.onChange(value as string);
		} else {
			// Regular Input passes an event object
			const event = value as React.ChangeEvent<HTMLInputElement>;
			field.onChange(event.target.value);
		}
	};

	const getIconPadding = () => {
		if (!Icon || !showInputIcon) return "";
		return iconPosition === "left" ? "pl-10" : "pr-10";
	};

	const renderIcon = () => {
		if (!Icon || !showInputIcon) return null;

		const iconClasses = cn(
			"absolute top-1/2 transform -translate-y-1/2 h-4 w-4",
			iconColor,
			iconPosition === "left" ? "left-3" : "right-3",
		);

		return <Icon className={iconClasses} />;
	};

	const renderInput = () => {
		const baseInputClasses = cn(getIconPadding(), focusColor, inputClassName);

		const commonProps = {
			placeholder,
			disabled,
			className: baseInputClasses,
			maxLength,
			onBlur: field.onBlur,
		};

		// if (type === "ai-input") {
		//   return (
		//     <AiInput
		//       {...commonProps}
		//       value={fieldValue}
		//       onChange={handleChange}
		//     />
		//   );
		// }

		return (
			<Input
				{...commonProps}
				type={inputType}
				value={fieldValue}
				onChange={handleChange}
			/>
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
			<FormControl>
				<div className="relative">
					{renderInput()}
					{renderIcon()}
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

export default InputField;
