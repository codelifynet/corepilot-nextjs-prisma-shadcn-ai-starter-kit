"use client";

import * as React from "react";
import { CalendarIcon } from "lucide-react";
import type { DateRange } from "react-day-picker";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
	Popover,
	PopoverContent,
	PopoverTrigger,
} from "@/components/ui/popover";

interface DatePickerWithRangeProps {
	value?: DateRange;
	onChange?: (range: DateRange | undefined) => void;
	disabled?: boolean;
	className?: string;
	placeholder?: string;
}

export function DatePickerWithRange({
	value,
	onChange,
	disabled = false,
	className,
	placeholder = "Pick a date range",
}: DatePickerWithRangeProps) {
	const [date, setDate] = React.useState<DateRange | undefined>(value);

	React.useEffect(() => {
		setDate(value);
	}, [value]);

	const handleDateChange = (selectedDate: DateRange | undefined) => {
		setDate(selectedDate);
		onChange?.(selectedDate);
	};

	const formatDateRange = (dateRange: DateRange | undefined) => {
		if (!dateRange?.from) {
			return placeholder;
		}

		if (dateRange.to) {
			return `${dateRange.from.toLocaleDateString()} - ${dateRange.to.toLocaleDateString()}`;
		}

		return `${dateRange.from.toLocaleDateString()}`;
	};

	return (
		<div className={cn("grid gap-2", className)}>
			<Popover>
				<PopoverTrigger asChild>
					<Button
						id="date"
						variant="outline"
						className={cn(
							"w-full justify-start text-left font-normal",
							!date && "text-muted-foreground",
						)}
						disabled={disabled}
					>
						<CalendarIcon className="mr-2 h-4 w-4" />
						{formatDateRange(date)}
					</Button>
				</PopoverTrigger>
				<PopoverContent className="w-auto p-0" align="start">
					<Calendar
						initialFocus
						mode="range"
						defaultMonth={date?.from}
						selected={date}
						onSelect={handleDateChange}
						numberOfMonths={2}
						disabled={disabled}
					/>
				</PopoverContent>
			</Popover>
		</div>
	);
}
