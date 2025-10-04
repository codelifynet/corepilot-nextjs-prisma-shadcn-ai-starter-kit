import {
	InputField,
	TextareaField,
	SelectField,
	CheckboxField,
	RadioField,
	SwitchField,
	DateField,
	FileField,
	SliderField,
} from "./components";
import type {
	UniversalFormFieldProps,
	InputFieldProps,
	TextareaFieldProps,
	SelectFieldProps,
	CheckboxFieldProps,
	RadioFieldProps,
	SwitchFieldProps,
	DateFieldProps,
	FileFieldProps,
	SliderFieldProps,
	RHFFieldProps,
} from "./types";

export function UniversalFormField(props: UniversalFormFieldProps) {
	const { fieldType, ...fieldProps } = props;

	switch (fieldType) {
		case "input":
			return (
				<InputField {...(fieldProps as InputFieldProps & RHFFieldProps)} />
			);

		case "ai-input":
			return (
				<InputField
					{...(fieldProps as InputFieldProps & RHFFieldProps)}
					type="ai-input"
				/>
			);

		case "textarea":
			return (
				<TextareaField
					{...(fieldProps as TextareaFieldProps & RHFFieldProps)}
				/>
			);

		case "select":
			return (
				<SelectField {...(fieldProps as SelectFieldProps & RHFFieldProps)} />
			);

		case "checkbox":
			return (
				<CheckboxField
					{...(fieldProps as CheckboxFieldProps & RHFFieldProps)}
				/>
			);

		case "radio":
			return (
				<RadioField {...(fieldProps as RadioFieldProps & RHFFieldProps)} />
			);

		case "switch":
			return (
				<SwitchField {...(fieldProps as SwitchFieldProps & RHFFieldProps)} />
			);

		case "date":
			return <DateField {...(fieldProps as DateFieldProps & RHFFieldProps)} />;

		case "file":
			return <FileField {...(fieldProps as FileFieldProps & RHFFieldProps)} />;

		case "slider":
			return (
				<SliderField {...(fieldProps as SliderFieldProps & RHFFieldProps)} />
			);

		default:
			console.warn(`Unknown field type: ${fieldType}`);
			return (
				<InputField {...(fieldProps as InputFieldProps & RHFFieldProps)} />
			);
	}
}

export default UniversalFormField;
