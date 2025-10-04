"use client";

import { useState } from "react";
import { UserList } from "../components/user-list";
import { UserDetailView } from "../components/user-detail-view";
import { CreateUserDialog, EditUserDialog } from "../components/dialogs";
import {
	AlertDialog,
	AlertDialogAction,
	AlertDialogCancel,
	AlertDialogContent,
	AlertDialogDescription,
	AlertDialogFooter,
	AlertDialogHeader,
	AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import {
	useCreateUser,
	useUpdateUser,
	useBanUser,
	useUnbanUser,
	useRemoveUser,
	useImpersonateUser,
	useSetUserRole,
} from "../hooks/use-users";
import {
	type User,
	type CreateUserInput,
	type UpdateUserInput,
	getUserPrimaryRole,
} from "../types";

interface UsersViewProps {
	currentUser: User;
}

export function UsersView({ currentUser }: UsersViewProps) {
	const [view, setView] = useState<"list" | "detail">("list");
	const [selectedUser, setSelectedUser] = useState<User | null>(null);
	const [showCreateDialog, setShowCreateDialog] = useState(false);
	const [showEditDialog, setShowEditDialog] = useState(false);
	const [userToDelete, setUserToDelete] = useState<User | null>(null);
	const [userToBan, setUserToBan] = useState<User | null>(null);

	const createUserMutation = useCreateUser();
	const updateUserMutation = useUpdateUser();
	const banUserMutation = useBanUser();
	const unbanUserMutation = useUnbanUser();
	const removeUserMutation = useRemoveUser();
	const impersonateUserMutation = useImpersonateUser();
	const setUserRoleMutation = useSetUserRole();

	const handleCreateUser = () => {
		setShowCreateDialog(true);
	};

	const handleEditUser = (user: User) => {
		setSelectedUser(user);
		setShowEditDialog(true);
	};

	const handleViewUser = (user: User) => {
		setSelectedUser(user);
		setView("detail");
	};

	const handleBanUser = (user: User) => {
		setUserToBan(user);
	};

	const handleDeleteUser = (user: User) => {
		setUserToDelete(user);
	};

	const handleBackToList = () => {
		setView("list");
		setSelectedUser(null);
	};

	const handleCreateSubmit = async (data: CreateUserInput) => {
		try {
			await createUserMutation.mutateAsync(data);
			setShowCreateDialog(false);
		} catch {
			// Error is handled by the mutation
		}
	};

	const handleUpdateSubmit = async (data: UpdateUserInput) => {
		if (!selectedUser) return;

		try {
			await updateUserMutation.mutateAsync({
				id: selectedUser.id,
				data,
			});
			setShowEditDialog(false);
			setSelectedUser(null);
		} catch {
			// Error is handled by the mutation
		}
	};

	const handleConfirmBan = async () => {
		if (!userToBan) return;

		try {
			await banUserMutation.mutateAsync({
				userId: userToBan.id,
				reason: "Banned by administrator",
			});
			setUserToBan(null);
		} catch {
			// Error is handled by the mutation
		}
	};

	const handleUnbanUser = async (user: User) => {
		try {
			await unbanUserMutation.mutateAsync(user.id);
		} catch {
			// Error is handled by the mutation
		}
	};

	const handleConfirmDelete = async () => {
		if (!userToDelete) return;

		try {
			await removeUserMutation.mutateAsync(userToDelete.id);
			setUserToDelete(null);

			// If we're viewing the deleted user, go back to list
			if (selectedUser?.id === userToDelete.id) {
				handleBackToList();
			}
		} catch {
			// Error is handled by the mutation
		}
	};

	const handleImpersonate = async (user: User) => {
		try {
			await impersonateUserMutation.mutateAsync(user.id);
		} catch {
			// Error is handled by the mutation
		}
	};

	const handleChangeRole = (user: User) => {
		// This would open a role selection dialog
		// For now, we'll just cycle through roles as an example
		const roleOrder = ["USER", "ADMIN", "SUPERADMIN"];
		const currentRole = getUserPrimaryRole(user);
		const currentIndex = roleOrder.indexOf(currentRole?.type || "USER");
		const nextRole = roleOrder[(currentIndex + 1) % roleOrder.length];
		console.log("====================================");
		console.log(
			`Changing role for user ${user.id} from ${currentRole?.type || "USER"} to ${nextRole}`,
		);
		console.log("====================================");

		setUserRoleMutation.mutate();
	};

	if (view === "detail" && selectedUser) {
		return (
			<div className="space-y-4">
				<div className="flex items-center gap-2">
					<button
						onClick={handleBackToList}
						className="text-sm text-muted-foreground hover:text-foreground"
					>
						← Back to users
					</button>
				</div>

				<UserDetailView
					user={selectedUser}
					currentUser={currentUser}
					onEdit={() => handleEditUser(selectedUser)}
					onBan={() => handleBanUser(selectedUser)}
					onUnban={() => handleUnbanUser(selectedUser)}
					onDelete={() => handleDeleteUser(selectedUser)}
					onImpersonate={() => handleImpersonate(selectedUser)}
					onChangeRole={() => handleChangeRole(selectedUser)}
				/>
			</div>
		);
	}

	console.log("currentUser:", currentUser);
	console.log("selectedUser:", selectedUser);
	console.log("userToBan:", userToBan);
	console.log("userToDelete:", userToDelete);

	return (
		<div>
			<UserList
				currentUser={currentUser}
				onCreateUser={handleCreateUser}
				onEditUser={handleEditUser}
				onViewUser={handleViewUser}
				onBanUser={handleBanUser}
				onDeleteUser={handleDeleteUser}
			/>

			{/* Create User Dialog */}
			<CreateUserDialog
				open={showCreateDialog}
				onOpenChange={setShowCreateDialog}
				onSubmit={handleCreateSubmit}
				isLoading={createUserMutation.isPending}
				currentUser={currentUser}
			/>

			{/* Edit User Dialog */}
			{selectedUser && (
				<EditUserDialog
					open={showEditDialog}
					onOpenChange={setShowEditDialog}
					user={selectedUser}
					onSubmit={handleUpdateSubmit}
					isLoading={updateUserMutation.isPending}
					currentUser={currentUser}
				/>
			)}

			{/* Ban User Confirmation */}
			<AlertDialog open={!!userToBan} onOpenChange={() => setUserToBan(null)}>
				<AlertDialogContent>
					<AlertDialogHeader>
						<AlertDialogTitle>Ban User</AlertDialogTitle>
						<AlertDialogDescription>
							Are you sure you want to ban {userToBan?.name}? This will prevent
							them from accessing the application and revoke all their active
							sessions.
						</AlertDialogDescription>
					</AlertDialogHeader>
					<AlertDialogFooter>
						<AlertDialogCancel>Cancel</AlertDialogCancel>
						<AlertDialogAction
							onClick={handleConfirmBan}
							className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
						>
							Ban User
						</AlertDialogAction>
					</AlertDialogFooter>
				</AlertDialogContent>
			</AlertDialog>

			{/* Delete User Confirmation */}
			<AlertDialog
				open={!!userToDelete}
				onOpenChange={() => setUserToDelete(null)}
			>
				<AlertDialogContent>
					<AlertDialogHeader>
						<AlertDialogTitle>Delete User</AlertDialogTitle>
						<AlertDialogDescription>
							Are you sure you want to permanently delete {userToDelete?.name}?
							This action cannot be undone and will remove all associated data.
						</AlertDialogDescription>
					</AlertDialogHeader>
					<AlertDialogFooter>
						<AlertDialogCancel>Cancel</AlertDialogCancel>
						<AlertDialogAction
							onClick={handleConfirmDelete}
							className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
						>
							Delete User
						</AlertDialogAction>
					</AlertDialogFooter>
				</AlertDialogContent>
			</AlertDialog>
		</div>
	);
}
