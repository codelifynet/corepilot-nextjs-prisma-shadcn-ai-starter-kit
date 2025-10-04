"use client";

import { Button } from "@/components/ui/button";
import { CorePilotDialog } from "@/components/core-pilot-ui";
import { UserForm } from "../user-form";
import type { User, CreateUserInput, UpdateUserInput } from "../../types";

interface CreateUserDialogProps {
	open: boolean;
	onOpenChange: (open: boolean) => void;
	onSubmit: (data: CreateUserInput) => void;
	isLoading?: boolean;
	currentUser: User;
}

export function CreateUserDialog({
	open,
	onOpenChange,
	onSubmit,
	isLoading = false,
	currentUser,
}: CreateUserDialogProps) {
	const handleCancel = () => {
		onOpenChange(false);
	};

	const handleSubmit = (data: CreateUserInput | UpdateUserInput) => {
		onSubmit(data as CreateUserInput);
	};

	return (
		<CorePilotDialog
			open={open}
			onOpenChange={onOpenChange}
			title="Create New User"
			maxWidth="4xl"
			footerActions={
				<>
					<Button
						variant="outline"
						onClick={handleCancel}
						disabled={isLoading}
					>
						Cancel
					</Button>
					<Button
						type="submit"
						form="create-user-form"
						disabled={isLoading}
					>
						Create User
					</Button>
				</>
			}
		>
			<UserForm
				onSubmit={handleSubmit}
				currentUser={currentUser}
				formId="create-user-form"
			/>
		</CorePilotDialog>
	);
}