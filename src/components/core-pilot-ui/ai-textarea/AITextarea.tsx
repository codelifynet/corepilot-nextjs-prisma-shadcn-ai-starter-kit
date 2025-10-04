"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Sparkles, Wand2 } from "lucide-react";
import { cn } from "@/lib/utils";

export interface AITextareaProps
	extends Omit<React.TextareaHTMLAttributes<HTMLTextAreaElement>, "onChange"> {
	onValueChange?: (value: string) => void;
	contentType?: "email" | "social" | "blog" | "custom";
	placeholder?: string;
	maxLength?: number;
	showAIButton?: boolean;
	aiButtonPosition?: "top-right" | "bottom";
	minRows?: number;
}

export function AITextarea({
	onValueChange,
	contentType = "custom",
	placeholder,
	maxLength = 2000,
	showAIButton = false, // Disabled by default since AI features are removed
	aiButtonPosition = "top-right",
	minRows = 3,
	className,
	value,
	...props
}: AITextareaProps) {
	const [internalValue, setInternalValue] = useState(value || "");

	const handleValueChange = (newValue: string) => {
		setInternalValue(newValue);
		onValueChange?.(newValue);
	};

	const handleTextareaChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
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
			case "social":
				return "Generate Post";
			case "blog":
				return "Generate Blog";
			default:
				return "AI Generate";
		}
	};

	if (aiButtonPosition === "bottom") {
		return (
			<div className="space-y-2">
				<Textarea
					{...props}
					value={internalValue}
					onChange={handleTextareaChange}
					placeholder={placeholder}
					maxLength={maxLength}
					rows={minRows}
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
			<Textarea
				{...props}
				value={internalValue}
				onChange={handleTextareaChange}
				placeholder={placeholder}
				maxLength={maxLength}
				rows={minRows}
				className={cn(
					showAIButton && aiButtonPosition === "top-right" ? "pt-12" : "",
					className,
				)}
			/>
			{showAIButton && aiButtonPosition === "top-right" && (
				<Button
					type="button"
					variant="ghost"
					size="sm"
					onClick={handleGenerate}
					disabled={true} // Always disabled since AI is removed
					className="absolute right-2 top-2 z-10 opacity-50"
				>
					<Wand2 className="h-4 w-4 mr-1" />
					<span className="text-xs">AI (Disabled)</span>
				</Button>
			)}
		</div>
	);
}
