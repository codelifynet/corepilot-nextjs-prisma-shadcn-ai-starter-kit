import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { Button } from "@/components/ui/button";
import type { SliderFieldProps, RHFFieldProps } from "../types";

export function SliderField({
	label,
	description,
	icon: Icon,
	iconColor = "text-blue-500",
	showLabelIcon = true,
	className,
	value,
	onValueChange,
	min = 0,
	max = 100,
	step = 1,
	presets = [],
	onPresetSelect,
	showValue = true,
	valuePosition = "right",
	disabled = false,
	required = false,
	...props
}: SliderFieldProps & RHFFieldProps) {
	const displayValue = Array.isArray(value) ? value[0] : value;

	return (
		<div className={className}>
			{label && (
				<div
					className={`flex items-center justify-between mb-3 ${required ? "after:content-['*'] after:ml-0.5 after:text-red-500" : ""}`}
				>
					<Label
						className={`text-sm font-medium flex items-center gap-2 ${required ? "after:content-['*'] after:ml-0.5 after:text-red-500" : ""}`}
					>
						{Icon && showLabelIcon && (
							<Icon className={`h-4 w-4 ${iconColor}`} />
						)}
						{label}
					</Label>
					{showValue && valuePosition === "right" && (
						<span className="text-sm text-muted-foreground">
							{displayValue}
						</span>
					)}
				</div>
			)}

			{showValue && valuePosition === "top" && (
				<div className="mb-2">
					<span className="text-sm text-muted-foreground">
						Current value: {displayValue}
					</span>
				</div>
			)}

			<Slider
				value={Array.isArray(value) ? value : [value]}
				onValueChange={(newValue) => onValueChange?.(newValue)}
				min={min}
				max={max}
				step={step}
				disabled={disabled}
				className="mb-3"
				{...props}
			/>

			{showValue && valuePosition === "bottom" && (
				<div className="mb-2">
					<span className="text-sm text-muted-foreground">{displayValue}</span>
				</div>
			)}

			{presets && presets.length > 0 && (
				<div className="flex gap-2 flex-wrap">
					{presets.map((preset) => (
						<Button
							key={preset.label}
							type="button"
							variant="outline"
							size="sm"
							onClick={() => onPresetSelect?.(preset)}
							className="text-xs"
							disabled={disabled || preset.disabled}
						>
							{preset.label}
						</Button>
					))}
				</div>
			)}

			{description && (
				<p className="text-sm text-muted-foreground mt-2">{description}</p>
			)}
		</div>
	);
}
