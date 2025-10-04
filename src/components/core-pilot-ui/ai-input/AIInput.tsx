"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Sparkles, Wand2 } from "lucide-react";
import { cn } from "@/lib/utils";

export interface AIInputProps
	extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "onChange"> {
	onValueChange?: (value: string) => void;
	contentType?: "email" | "title" | "name" | "custom";
	placeholder?: string;
	maxLength?: number;
	showAIButton?: boolean;
	aiButtonPosition?: "right" | "bottom";
}

export function AIInput({
	onValueChange,
	contentType = "custom",
	placeholder,
	maxLength = 500,
	showAIButton = false, // Disabled by default since AI features are removed
	aiButtonPosition = "right",
	className,
	value,
	...props
}: AIInputProps) {
	const [internalValue, setInternalValue] = useState(value || "");

	const handleValueChange = (newValue: string) => {
		setInternalValue(newValue);
		onValueChange?.(newValue);
	};

	const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const newValue = e.target.value;
		handleValueChange(newValue);
	};

	const handleGenerate = async () => {
		// AI functionality disabled - features removed from production
		console.warn("AI content generation feature has been removed from production");
	};

	const getAIButtonText = () => {
		switch (contentType) {
			case "email":
				return "Generate Email";
			case "title":
				return "Generate Title";
			case "name":
				return "Generate Name";
			default:
				return "AI Generate";
		}
	};

	if (aiButtonPosition === "bottom") {
		return (
			<div className="space-y-2">
				<Input
					{...props}
					value={internalValue}
					onChange={handleInputChange}
					placeholder={placeholder}
					maxLength={maxLength}
					className={className}
				/>
				{showAIButton && (
					<Button
						type="button"
						variant="outline"
						size="sm"
						onClick={handleGenerate}
						disabled={true} // Always disabled since AI is removed
						className="w-full opacity-50"
					>
						<Sparkles className="h-4 w-4 mr-2" />
						{getAIButtonText()} (Disabled)
					</Button>
				)}
			</div>
		);
	}

	return (
		<div className="relative">
			<Input
				{...props}
				value={internalValue}
				onChange={handleInputChange}
				placeholder={placeholder}
				maxLength={maxLength}
				className={cn(
					showAIButton && aiButtonPosition === "right" ? "pr-16" : "",
					className,
				)}
			/>
			{showAIButton && aiButtonPosition === "right" && (
				<Button
					type="button"
					variant="ghost"
					size="sm"
					onClick={handleGenerate}
					disabled={true} // Always disabled since AI is removed
					className="absolute right-1 top-1/2 -translate-y-1/2 h-8 px-2 opacity-50"
				>
					<Wand2 className="h-4 w-4" />
				</Button>
			)}
		</div>
	);
}
