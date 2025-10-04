"use client";

import type React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { Slider as BaseSlider } from "@/components/ui/slider";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/core-pilot-ui/ui/badge";
import { cn } from "@/lib/utils";

// Enhanced slider variants
const sliderVariants = cva(
	"relative flex w-full touch-none items-center select-none",
	{
		variants: {
			variant: {
				default: "[&_[data-slot=slider-track]]:bg-gray-200 [&_[data-slot=slider-range]]:bg-primary",
				success: "[&_[data-slot=slider-track]]:bg-green-100 [&_[data-slot=slider-range]]:bg-green-600 dark:[&_[data-slot=slider-track]]:bg-green-900/20",
				warning: "[&_[data-slot=slider-track]]:bg-yellow-100 [&_[data-slot=slider-range]]:bg-yellow-500 dark:[&_[data-slot=slider-track]]:bg-yellow-900/20",
				error: "[&_[data-slot=slider-track]]:bg-red-100 [&_[data-slot=slider-range]]:bg-red-600 dark:[&_[data-slot=slider-track]]:bg-red-900/20",
				info: "[&_[data-slot=slider-track]]:bg-blue-100 [&_[data-slot=slider-range]]:bg-blue-600 dark:[&_[data-slot=slider-track]]:bg-blue-900/20",
				gradient: "[&_[data-slot=slider-track]]:bg-gradient-to-r [&_[data-slot=slider-track]]:from-blue-100 [&_[data-slot=slider-track]]:to-purple-100 [&_[data-slot=slider-range]]:bg-gradient-to-r [&_[data-slot=slider-range]]:from-blue-600 [&_[data-slot=slider-range]]:to-purple-600",
			},
			size: {
				sm: "[&_[data-slot=slider-track]]:h-1 [&_[data-slot=slider-thumb]]:size-3",
				default: "[&_[data-slot=slider-track]]:h-1.5 [&_[data-slot=slider-thumb]]:size-4",
				lg: "[&_[data-slot=slider-track]]:h-2 [&_[data-slot=slider-thumb]]:size-5",
				xl: "[&_[data-slot=slider-track]]:h-3 [&_[data-slot=slider-thumb]]:size-6",
			},
			thumbVariant: {
				default: "[&_[data-slot=slider-thumb]]:border-primary [&_[data-slot=slider-thumb]]:bg-background",
				filled: "[&_[data-slot=slider-thumb]]:border-primary [&_[data-slot=slider-thumb]]:bg-primary [&_[data-slot=slider-thumb]]:text-primary-foreground",
				ring: "[&_[data-slot=slider-thumb]]:border-2 [&_[data-slot=slider-thumb]]:border-primary [&_[data-slot=slider-thumb]]:bg-background [&_[data-slot=slider-thumb]]:shadow-lg",
			},
		},
		defaultVariants: {
			variant: "default",
			size: "default",
			thumbVariant: "default",
		},
	}
);

interface SliderPreset {
	label: string;
	value: number;
	disabled?: boolean;
	description?: string;
}

interface SliderProps
	extends Omit<React.ComponentProps<typeof BaseSlider>, "className">,
		VariantProps<typeof sliderVariants> {
	label?: string;
	description?: string;
	showValue?: boolean;
	valuePosition?: "top" | "right" | "bottom" | "inline";
	valueFormatter?: (value: number) => string;
	presets?: SliderPreset[];
	onPresetSelect?: (preset: SliderPreset) => void;
	className?: string;
	containerClassName?: string;
	unit?: string;
	marks?: { value: number; label?: string }[];
}

function Slider({
	label,
	description,
	showValue = false,
	valuePosition = "right",
	valueFormatter = (value) => value.toString(),
	presets = [],
	onPresetSelect,
	className,
	containerClassName,
	variant = "default",
	size = "default",
	thumbVariant = "default",
	unit = "",
	marks = [],
	value,
	defaultValue,
	min = 0,
	max = 100,
	step = 1,
	...props
}: SliderProps) {
	const currentValue = Array.isArray(value) ? value[0] : value || (Array.isArray(defaultValue) ? defaultValue[0] : defaultValue) || min;
	const displayValue = valueFormatter(currentValue) + (unit ? ` ${unit}` : "");

	const getValueColor = () => {
		return "text-white"; // Her zaman beyaz
	};

	const renderValue = () => {
		if (!showValue) return null;

		const valueElement = (
			<Badge 
				variant="default" 
				size="sm" 
				className={cn("tabular-nums", getValueColor())}
			>
				{displayValue}
			</Badge>
		);

		switch (valuePosition) {
			case "top":
				return <div className="mb-2 flex justify-end">{valueElement}</div>;
			case "bottom":
				return <div className="mt-2 flex justify-end">{valueElement}</div>;
			case "inline":
				return valueElement;
			case "right":
			default:
				return null; // Handled in main layout
		}
	};


	const renderMarks = () => {
		if (marks.length === 0) return null;

		return (
			<div className="relative mt-2">
				{marks.map((mark) => {
					const percentage = ((mark.value - min) / (max - min)) * 100;
					return (
						<div
							key={mark.value}
							className="absolute flex flex-col items-center"
							style={{ left: `${percentage}%`, transform: "translateX(-50%)" }}
						>
							<div className="w-px h-2 bg-muted-foreground/40" />
							{mark.label && (
								<span className="text-xs text-muted-foreground mt-1">
									{mark.label}
								</span>
							)}
						</div>
					);
				})}
			</div>
		);
	};


	return (
		<div className={cn("w-full space-y-2", containerClassName)}>
			{/* Label and Value */}
			{(label || (showValue && valuePosition === "top")) && (
				<div className="flex items-center justify-between">
					{label && (
						<label 
							className="text-sm font-medium text-foreground"
							htmlFor={`slider-${Math.random().toString(36).substr(2, 9)}`}
						>
							{label}
						</label>
					)}
					{showValue && valuePosition === "top" && renderValue()}
				</div>
			)}

			{/* Slider Container */}
			<div className="flex items-center gap-3">
				<div className="flex-1 space-y-1">
					<BaseSlider
						value={value}
						defaultValue={defaultValue}
						min={min}
						max={max}
						step={step}
						className={cn(
							sliderVariants({ variant, size, thumbVariant }),
							className
						)}
						{...props}
					/>
					{renderMarks()}
				</div>
				
				{/* Right-side value */}
				{showValue && valuePosition === "right" && (
					<div className="flex-shrink-0">
						<Badge 
							variant="outline" 
							size="sm"
							className={cn(" justify-center", getValueColor())}
						>
							{displayValue}
						</Badge>
					</div>
				)}
			</div>

			{/* Bottom value */}
			{showValue && valuePosition === "bottom" && renderValue()}

			{/* Presets */}
			{presets.length > 0 && (
				<div className="flex flex-wrap gap-2 pt-2">
					{presets.map((preset) => (
						<Button
							key={preset.label}
							type="button"
							variant="outline"
							size="sm"
							onClick={() => onPresetSelect?.(preset)}
							disabled={preset.disabled}
							className={cn(
								"text-xs h-7 px-2",
								currentValue === preset.value && "bg-primary text-white"
							)}
							title={preset.description}
						>
							{preset.label}
						</Button>
					))}
				</div>
			)}

			{/* Description */}
			{description && (
				<p className="text-xs text-muted-foreground mt-2">{description}</p>
			)}
		</div>
	);
}

// Specialized slider components
function TemperatureSlider({
	value,
	onValueChange,
	...props
}: Omit<SliderProps, "min" | "max" | "step" | "presets" | "unit" | "valueFormatter"> & {
	value?: number[];
	onValueChange?: (value: number[]) => void;
}) {
	const temperaturePresets: SliderPreset[] = [
		{ label: "Precise", value: 0.1, description: "Very focused and deterministic" },
		{ label: "Factual", value: 0.3, description: "Mostly factual with slight creativity" },
		{ label: "Balanced", value: 0.7, description: "Good balance of creativity and focus" },
		{ label: "Creative", value: 1.2, description: "More creative and diverse" },
		{ label: "Very Creative", value: 1.8, description: "Highly creative and unpredictable" },
	];

	return (
		<Slider
			min={0}
			max={2}
			step={0.1}
			value={value}
			onValueChange={onValueChange}
			presets={temperaturePresets}
			onPresetSelect={(preset) => onValueChange?.([preset.value])}
			valueFormatter={(val) => val.toFixed(1)}
			variant="gradient"
			showValue={true}
			valuePosition="right"
			{...props}
		/>
	);
}

function TokenSlider({
	value,
	onValueChange,
	max = 4000,
	...props
}: Omit<SliderProps, "min" | "step" | "presets" | "unit" | "valueFormatter"> & {
	value?: number[];
	onValueChange?: (value: number[]) => void;
	max?: number;
}) {
	const tokenPresets: SliderPreset[] = [
		{ label: "Short", value: Math.min(500, max), description: "Brief responses" },
		{ label: "Medium", value: Math.min(1500, max), description: "Standard length" },
		{ label: "Long", value: Math.min(3000, max), description: "Detailed responses" },
		{ label: "Very Long", value: max, description: "Maximum length" },
	].filter(preset => preset.value <= max);

	return (
		<Slider
			min={1}
			max={max}
			step={1}
			value={value}
			onValueChange={onValueChange}
			presets={tokenPresets}
			onPresetSelect={(preset) => onValueChange?.([preset.value])}
			valueFormatter={(val) => val.toLocaleString()}
			variant="info"
			showValue={true}
			valuePosition="right"
			{...props}
		/>
	);
}

export {
	Slider,
	TemperatureSlider,
	TokenSlider,
	sliderVariants,
};

export type { SliderProps, SliderPreset };
