import type { LucideIcon } from "lucide-react";

// Base field types
export type FieldType =
	| "input"
	| "ai-input"
	| "textarea"
	| "select"
	| "checkbox"
	| "radio"
	| "switch"
	| "date"
	| "file"
	| "slider";

export type IconPosition = "left" | "right";

// Base form field props
export interface BaseFormFieldProps {
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
	/** Whether the field is disabled */
	disabled?: boolean;
	/** Whether the field is required */
	required?: boolean;
}

// Input specific props
export interface InputFieldProps extends BaseFormFieldProps {
	/** The field type (input or ai-input) */
	type?: "input" | "ai-input";
	/** Maximum length for the input */
	maxLength?: number;
	/** Input type (text, email, password, etc.) */
	inputType?: string;
}

// Textarea specific props
export interface TextareaFieldProps extends BaseFormFieldProps {
	/** Number of rows for textarea */
	rows?: number;
	/** Maximum length for the textarea */
	maxLength?: number;
	/** Whether to resize the textarea */
	resize?: boolean;
}

// Select specific props
export interface SelectOption {
	value: string;
	label: string;
	icon?: LucideIcon;
	disabled?: boolean;
}

export interface SelectFieldProps extends BaseFormFieldProps {
	/** Options for the select */
	options: SelectOption[];
	/** Whether multiple selection is allowed */
	multiple?: boolean;
}

// Checkbox specific props
export interface CheckboxFieldProps extends BaseFormFieldProps {
	/** Text to display next to checkbox */
	checkboxLabel?: string;
}

// Radio specific props
export interface RadioOption {
	value: string;
	label: string;
	description?: string;
	icon?: LucideIcon;
	disabled?: boolean;
}

export interface RadioFieldProps extends BaseFormFieldProps {
	/** Options for the radio group */
	options: RadioOption[];
	/** Layout direction */
	direction?: "horizontal" | "vertical";
}

// Switch specific props
export interface SwitchFieldProps extends BaseFormFieldProps {
	/** Text to display next to switch */
	switchLabel?: string;
}

// Date specific props
export interface DateFieldProps extends BaseFormFieldProps {
	/** Date format */
	dateFormat?: string;
	/** Whether to show time picker */
	showTime?: boolean;
}

// File specific props
export interface FileFieldProps extends BaseFormFieldProps {
	/** Accepted file types */
	accept?: string;
	/** Whether multiple files are allowed */
	multiple?: boolean;
	/** Maximum file size in bytes */
	maxSize?: number;
}

// Slider specific props
export interface SliderPreset {
	label: string;
	value: number;
	disabled?: boolean;
}

export interface SliderFieldProps extends BaseFormFieldProps {
	/** Current value of the slider */
	value: number | number[];
	/** Callback when value changes */
	onValueChange?: (value: number[]) => void;
	/** Minimum value */
	min?: number;
	/** Maximum value */
	max?: number;
	/** Step size */
	step?: number;
	/** Preset values */
	presets?: SliderPreset[];
	/** Callback when preset is selected */
	onPresetSelect?: (preset: SliderPreset) => void;
	/** Whether to show current value */
	showValue?: boolean;
	/** Position of value display */
	valuePosition?: "top" | "right" | "bottom";
}

// Union type for all field props
export type FormFieldProps =
	| InputFieldProps
	| TextareaFieldProps
	| SelectFieldProps
	| CheckboxFieldProps
	| RadioFieldProps
	| SwitchFieldProps
	| DateFieldProps
	| FileFieldProps
	| SliderFieldProps;

// React Hook Form field props
export interface RHFFieldProps {
	field: {
		name: string;
		value: any;
		onChange: (value: any) => void;
		onBlur: () => void;
	};
}

// Combined props with field type
export type UniversalFormFieldProps = {
	fieldType: FieldType;
} & FormFieldProps &
	RHFFieldProps;
