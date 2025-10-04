"use client";

import { Button } from "@/components/ui/button";
import { CorePilotDialog } from "@/components/core-pilot-ui";
import { UserForm } from "../user-form";
import type { User, UpdateUserInput, CreateUserInput } from "../../types";

interface EditUserDialogProps {
	open: boolean;
	onOpenChange: (open: boolean) => void;
	user: User;
	onSubmit: (data: UpdateUserInput) => void;
	isLoading?: boolean;
	currentUser: User;
}

export function EditUserDialog({
	open,
	onOpenChange,
	user,
	onSubmit,
	isLoading = false,
	currentUser,
}: EditUserDialogProps) {
	const handleCancel = () => {
		onOpenChange(false);
	};

	const handleSubmit = (data: CreateUserInput | UpdateUserInput) => {
		onSubmit(data as UpdateUserInput);
	};

	return (
		<CorePilotDialog
			open={open}
			onOpenChange={onOpenChange}
			title="Edit User"
			maxWidth="2xl"
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
						form="edit-user-form"
						disabled={isLoading}
					>
						Update User
					</Button>
				</>
			}
		>
			<UserForm
				user={user}
				onSubmit={handleSubmit}
				currentUser={currentUser}
				formId="edit-user-form"
			/>
		</CorePilotDialog>
	);
}