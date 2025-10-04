import {
	FormControl,
	FormItem,
	FormLabel,
	FormMessage,
	FormDescription,
} from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
	Popover,
	PopoverContent,
	PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { CalendarIcon } from "lucide-react";
import { format } from "date-fns";
import type { DateFieldProps, RHFFieldProps } from "../types";

type DateFieldComponentProps = DateFieldProps & RHFFieldProps;

export function DateField({
	icon: Icon,
	label,
	placeholder = "Pick a date",
	description,
	descriptionIcon: DescriptionIcon,
	iconColor = "text-blue-500",
	inputClassName,
	className,
	showLabelIcon = true,
	disabled = false,
	required = false,
	dateFormat = "PPP",
	showTime = false,
	field,
}: DateFieldComponentProps) {
	const fieldValue = field.value ? new Date(field.value) : undefined;

	const handleDateSelect = (date: Date | undefined) => {
		field.onChange(date?.toISOString() || "");
	};

	return (
		<FormItem className={cn("flex flex-col", className)}>
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
				<Popover>
					<PopoverTrigger asChild>
						<Button
							variant="outline"
							className={cn(
								"w-full justify-start text-left font-normal",
								!fieldValue && "text-muted-foreground",
								inputClassName,
							)}
							disabled={disabled}
							onBlur={field.onBlur}
						>
							<CalendarIcon className="mr-2 h-4 w-4" />
							{fieldValue ? (
								format(fieldValue, dateFormat)
							) : (
								<span>{placeholder}</span>
							)}
						</Button>
					</PopoverTrigger>
					<PopoverContent className="w-auto p-0" align="start">
						<Calendar
							mode="single"
							selected={fieldValue}
							onSelect={handleDateSelect}
							disabled={disabled}
							initialFocus
						/>
						{showTime && fieldValue && (
							<div className="p-3 border-t">
								<input
									type="time"
									value={format(fieldValue, "HH:mm")}
									onChange={(e) => {
										if (fieldValue) {
											const [hours, minutes] = e.target.value.split(":");
											const newDate = new Date(fieldValue);
											newDate.setHours(parseInt(hours), parseInt(minutes));
											handleDateSelect(newDate);
										}
									}}
									className="w-full px-3 py-2 border rounded-md"
								/>
							</div>
						)}
					</PopoverContent>
				</Popover>
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

export default DateField;
