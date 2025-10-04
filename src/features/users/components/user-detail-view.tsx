"use client";

import { useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from "@/components/ui/table";
import {
	AlertDialog,
	AlertDialogAction,
	AlertDialogCancel,
	AlertDialogContent,
	AlertDialogDescription,
	AlertDialogFooter,
	AlertDialogHeader,
	AlertDialogTitle,
	AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import {
	Mail,
	Calendar,
	Shield,
	Clock,
	Activity,
	Ban,
	Unlock,
	Edit,
	Trash2,
	UserX,
	Settings,
	Eye,
	EyeOff,
} from "lucide-react";
import { format } from "date-fns";
import { useUserSessions } from "../hooks/use-users";
import {
	getUserRoleLabel,
	getUserStatus,
	getUserStatusColor,
	getUserInitials,
	getUserDisplayName,
	getBanTimeRemaining,
	canPerformAction,
} from "../utils/user.utils";
import type { User } from "../types";

interface UserDetailViewProps {
	user: User;
	currentUser: User;
	onEdit?: () => void;
	onBan?: () => void;
	onUnban?: () => void;
	onDelete?: () => void;
	onImpersonate?: () => void;
	onChangeRole?: () => void;
}

export function UserDetailView({
	user,
	currentUser,
	onEdit,
	onBan,
	onUnban,
	onDelete,
	onImpersonate,
	onChangeRole,
}: UserDetailViewProps) {
	const [showSessions, setShowSessions] = useState(false);

	const { data: sessions } = useUserSessions(user.id);

	const status = getUserStatus(user);
	const statusColor = getUserStatusColor(status);
	const banTimeRemaining = getBanTimeRemaining(user);

	return (
		<div className="space-y-6">
			{/* Header */}
			<Card>
				<CardContent className="p-6">
					<div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
						<div className="flex items-center gap-4">
							<Avatar className="h-16 w-16">
								<AvatarImage src={user.image} />
								<AvatarFallback className="text-lg">
									{getUserInitials(user)}
								</AvatarFallback>
							</Avatar>
							<div>
								<h1 className="text-2xl font-bold">
									{getUserDisplayName(user)}
								</h1>
								<p className="text-muted-foreground">{user.email}</p>
								<div className="flex items-center gap-2 mt-2">
									<Badge>{getUserRoleLabel(user)}</Badge>
									<Badge variant="outline" className={statusColor}>
										{status}
									</Badge>
								</div>
							</div>
						</div>

						<div className="flex flex-wrap gap-2">
							{canPerformAction(currentUser, user, "edit") && (
								<Button onClick={onEdit} variant="outline" size="sm">
									<Edit className="h-4 w-4 mr-2" />
									Edit
								</Button>
							)}

							{canPerformAction(currentUser, user, "ban") && !user.banned && (
								<Button onClick={onBan} variant="outline" size="sm">
									<Ban className="h-4 w-4 mr-2" />
									Ban
								</Button>
							)}

							{canPerformAction(currentUser, user, "ban") && user.banned && (
								<Button onClick={onUnban} variant="outline" size="sm">
									<Unlock className="h-4 w-4 mr-2" />
									Unban
								</Button>
							)}

							{canPerformAction(currentUser, user, "change-role") &&
								onChangeRole && (
									<Button onClick={onChangeRole} variant="outline" size="sm">
										<Shield className="h-4 w-4 mr-2" />
										Change Role
									</Button>
								)}

							{canPerformAction(currentUser, user, "edit") && onImpersonate && (
								<Button onClick={onImpersonate} variant="outline" size="sm">
									<UserX className="h-4 w-4 mr-2" />
									Impersonate
								</Button>
							)}

							{canPerformAction(currentUser, user, "delete") && (
								<AlertDialog>
									<AlertDialogTrigger asChild>
										<Button variant="destructive" size="sm">
											<Trash2 className="h-4 w-4 mr-2" />
											Delete
										</Button>
									</AlertDialogTrigger>
									<AlertDialogContent>
										<AlertDialogHeader>
											<AlertDialogTitle>Are you sure?</AlertDialogTitle>
											<AlertDialogDescription>
												This action cannot be undone. This will permanently
												delete the user account and remove all associated data.
											</AlertDialogDescription>
										</AlertDialogHeader>
										<AlertDialogFooter>
											<AlertDialogCancel>Cancel</AlertDialogCancel>
											<AlertDialogAction onClick={onDelete}>
												Delete
											</AlertDialogAction>
										</AlertDialogFooter>
									</AlertDialogContent>
								</AlertDialog>
							)}
						</div>
					</div>
				</CardContent>
			</Card>

			<Tabs defaultValue="details" className="space-y-4">
				<TabsList>
					<TabsTrigger value="details">Details</TabsTrigger>
					<TabsTrigger value="sessions">Sessions</TabsTrigger>
					<TabsTrigger value="activity">Activity</TabsTrigger>
				</TabsList>

				<TabsContent value="details" className="space-y-4">
					<div className="grid gap-4 md:grid-cols-2">
						{/* Basic Information */}
						<Card>
							<CardHeader>
								<CardTitle className="flex items-center gap-2">
									<Settings className="h-5 w-5" />
									Basic Information
								</CardTitle>
							</CardHeader>
							<CardContent className="space-y-4">
								<div className="flex items-center gap-2">
									<Mail className="h-4 w-4 text-muted-foreground" />
									<span className="text-sm font-medium">Email:</span>
									<span className="text-sm">{user.email}</span>
									{user.emailVerified ? (
										<Badge variant="outline" className="text-green-600">
											Verified
										</Badge>
									) : (
										<Badge variant="outline" className="text-yellow-600">
											Unverified
										</Badge>
									)}
								</div>

								<div className="flex items-center gap-2">
									<Calendar className="h-4 w-4 text-muted-foreground" />
									<span className="text-sm font-medium">Joined:</span>
									<span className="text-sm">
										{format(new Date(user.createdAt), "PPp")}
									</span>
								</div>

								<div className="flex items-center gap-2">
									<Clock className="h-4 w-4 text-muted-foreground" />
									<span className="text-sm font-medium">Last Updated:</span>
									<span className="text-sm">
										{format(new Date(user.updatedAt), "PPp")}
									</span>
								</div>
							</CardContent>
						</Card>

						{/* Security Information */}
						<Card>
							<CardHeader>
								<CardTitle className="flex items-center gap-2">
									<Shield className="h-5 w-5" />
									Security & Permissions
								</CardTitle>
							</CardHeader>
							<CardContent className="space-y-4">
								<div>
									<div className="text-sm font-medium mb-1">Role</div>
									<Badge>{getUserRoleLabel(user)}</Badge>
								</div>

								<div>
									<div className="text-sm font-medium mb-1">Account Status</div>
									<Badge variant="outline" className={statusColor}>
										{status}
									</Badge>
								</div>

								{user.banned && (
									<div className="space-y-2">
										<div className="text-sm font-medium text-destructive">
											Ban Information
										</div>
										{user.banReason && (
											<div className="text-sm">
												<span className="font-medium">Reason:</span>{" "}
												{user.banReason}
											</div>
										)}
										{banTimeRemaining && (
											<div className="text-sm">
												<span className="font-medium">Time Remaining:</span>{" "}
												{banTimeRemaining}
											</div>
										)}
									</div>
								)}
							</CardContent>
						</Card>
					</div>
				</TabsContent>

				<TabsContent value="sessions" className="space-y-4">
					<Card>
						<CardHeader>
							<CardTitle className="flex items-center justify-between">
								<div className="flex items-center gap-2">
									<Activity className="h-5 w-5" />
									Active Sessions
								</div>
								<Button
									variant="outline"
									size="sm"
									onClick={() => setShowSessions(!showSessions)}
								>
									{showSessions ? (
										<EyeOff className="h-4 w-4" />
									) : (
										<Eye className="h-4 w-4" />
									)}
								</Button>
							</CardTitle>
						</CardHeader>
						{showSessions && (
							<CardContent>
								{sessions && sessions.length > 0 ? (
									<Table>
										<TableHeader>
											<TableRow>
												<TableHead>IP Address</TableHead>
												<TableHead>User Agent</TableHead>
												<TableHead>Created</TableHead>
												<TableHead>Expires</TableHead>
												<TableHead>Actions</TableHead>
											</TableRow>
										</TableHeader>
										<TableBody>
											{sessions.map((session) => (
												<TableRow key={session.id}>
													<TableCell className="font-mono text-sm">
														{session.ipAddress || "Unknown"}
													</TableCell>
													<TableCell className="max-w-[200px] truncate text-sm">
														{session.userAgent || "Unknown"}
													</TableCell>
													<TableCell className="text-sm">
														{format(new Date(session.createdAt), "PPp")}
													</TableCell>
													<TableCell className="text-sm">
														{format(new Date(session.expiresAt), "PPp")}
													</TableCell>
													<TableCell>
														<Button variant="outline" size="sm">
															Revoke
														</Button>
													</TableCell>
												</TableRow>
											))}
										</TableBody>
									</Table>
								) : (
									<div className="text-center py-8 text-muted-foreground">
										No active sessions found
									</div>
								)}
							</CardContent>
						)}
					</Card>
				</TabsContent>

				<TabsContent value="activity" className="space-y-4">
					<Card>
						<CardHeader>
							<CardTitle className="flex items-center gap-2">
								<Activity className="h-5 w-5" />
								Recent Activity
							</CardTitle>
						</CardHeader>
						<CardContent>
							<div className="text-center py-8 text-muted-foreground">
								Activity tracking is not yet implemented
							</div>
						</CardContent>
					</Card>
				</TabsContent>
			</Tabs>
		</div>
	);
}
