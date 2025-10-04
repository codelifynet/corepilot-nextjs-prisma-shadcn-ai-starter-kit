import { useRef } from "react";
import {
	FormControl,
	FormItem,
	FormLabel,
	FormMessage,
	FormDescription,
} from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Upload, X, File } from "lucide-react";
import type { FileFieldProps, RHFFieldProps } from "../types";

type FileFieldComponentProps = FileFieldProps & RHFFieldProps;

export function FileField({
	icon: Icon,
	label,
	placeholder = "Choose files",
	description,
	descriptionIcon: DescriptionIcon,
	iconColor = "text-blue-500",
	inputClassName,
	className,
	showLabelIcon = true,
	disabled = false,
	required = false,
	accept,
	multiple = false,
	maxSize,
	field,
}: FileFieldComponentProps) {
	const fileInputRef = useRef<HTMLInputElement>(null);
	const fieldValue = field.value || (multiple ? [] : null);

	const formatFileSize = (bytes: number) => {
		if (bytes === 0) return "0 Bytes";
		const k = 1024;
		const sizes = ["Bytes", "KB", "MB", "GB"];
		const i = Math.floor(Math.log(bytes) / Math.log(k));
		return parseFloat((bytes / k ** i).toFixed(2)) + " " + sizes[i];
	};

	const validateFile = (file: File) => {
		if (maxSize && file.size > maxSize) {
			return `File size must be less than ${formatFileSize(maxSize)}`;
		}
		return null;
	};

	const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		const files = Array.from(event.target.files || []);

		if (files.length === 0) {
			field.onChange(multiple ? [] : null);
			return;
		}

		// Validate files
		for (const file of files) {
			const error = validateFile(file);
			if (error) {
				alert(error); // In a real app, you'd use a proper toast/notification
				return;
			}
		}

		if (multiple) {
			field.onChange(files);
		} else {
			field.onChange(files[0]);
		}
	};

	const removeFile = (index?: number) => {
		if (multiple && typeof index === "number") {
			const files = Array.isArray(fieldValue) ? fieldValue : [];
			const newFiles = files.filter((_, i) => i !== index);
			field.onChange(newFiles);
		} else {
			field.onChange(multiple ? [] : null);
		}
	};

	const openFileDialog = () => {
		fileInputRef.current?.click();
	};

	const renderFileList = () => {
		if (!fieldValue) return null;

		const files = multiple
			? Array.isArray(fieldValue)
				? fieldValue
				: []
			: [fieldValue];

		return (
			<div className="mt-2 space-y-2">
				{files.map((file: File, index: number) => (
					<div
						key={`${file.name}-${index}`}
						className="flex items-center justify-between p-2 border rounded-md bg-muted/50"
					>
						<div className="flex items-center gap-2">
							<File className="h-4 w-4 text-muted-foreground" />
							<div>
								<div className="text-sm font-medium">{file.name}</div>
								<div className="text-xs text-muted-foreground">
									{formatFileSize(file.size)}
								</div>
							</div>
						</div>
						<Button
							type="button"
							variant="ghost"
							size="sm"
							onClick={() => removeFile(multiple ? index : undefined)}
							disabled={disabled}
						>
							<X className="h-4 w-4" />
						</Button>
					</div>
				))}
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
			<FormControl>
				<div className="space-y-2">
					<input
						ref={fileInputRef}
						type="file"
						accept={accept}
						multiple={multiple}
						onChange={handleFileChange}
						onBlur={field.onBlur}
						disabled={disabled}
						className="hidden"
					/>
					<Button
						type="button"
						variant="outline"
						onClick={openFileDialog}
						disabled={disabled}
						className={cn("w-full justify-start", inputClassName)}
					>
						<Upload className="mr-2 h-4 w-4" />
						{placeholder}
					</Button>
					{renderFileList()}
				</div>
			</FormControl>
			{description && (
				<FormDescription className="flex items-center gap-2">
					{DescriptionIcon && (
						<DescriptionIcon className={cn("h-3 w-3", iconColor)} />
					)}
					{description}
					{maxSize && (
						<span className="text-xs text-muted-foreground">
							(Max: {formatFileSize(maxSize)})
						</span>
					)}
				</FormDescription>
			)}
			<FormMessage />
		</FormItem>
	);
}

export default FileField;
