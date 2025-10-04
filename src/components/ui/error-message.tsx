import { AlertCircle, RefreshCw } from "lucide-react";
import { Button } from "./button";
import { Alert, AlertDescription } from "./alert";

interface ErrorMessageProps {
	message: string;
	onRetry?: () => void;
	className?: string;
}

export function ErrorMessage({
	message,
	onRetry,
	className,
}: ErrorMessageProps) {
	return (
		<Alert variant="destructive" className={className}>
			<AlertCircle className="h-4 w-4" />
			<AlertDescription className="flex items-center justify-between">
				<span>{message}</span>
				{onRetry && (
					<Button
						variant="outline"
						size="sm"
						onClick={onRetry}
						className="ml-4"
					>
						<RefreshCw className="mr-2 h-4 w-4" />
						Retry
					</Button>
				)}
			</AlertDescription>
		</Alert>
	);
}
