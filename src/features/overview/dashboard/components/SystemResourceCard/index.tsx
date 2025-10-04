import { ResponsiveContainer, PieChart, Pie, Cell } from "recharts";
import type { ReactNode } from "react";

interface SystemResourceCardProps {
	title: string;
	subtitle: string;
	percentage: number;
	data: Array<{
		name: string;
		value: number;
		color: string;
	}>;
	icon: ReactNode;
	iconColor: string;
	details: Array<{
		label: string;
		value: string;
	}>;
	additionalInfo?: string;
}

export default function SystemResourceCard({
	title,
	subtitle,
	percentage,
	data,
	icon,
	iconColor,
	details,
	additionalInfo,
}: SystemResourceCardProps) {
	return (
		<div className="group relative bg-white/80 dark:bg-slate-800/90 backdrop-blur-sm p-6 rounded-2xl shadow-lg/10 shadow-slate-200/30 dark:shadow-slate-900/20 border border-slate-200/60 dark:border-slate-700/60 hover:shadow-xl/20 hover:scale-[1.02] transition-all duration-500 overflow-hidden">
			<div
				className={`absolute inset-0 bg-gradient-to-br ${iconColor}/50 to-transparent dark:${iconColor}/10 dark:to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500`}
			></div>
			<div className="relative z-10">
				<div className="flex items-center justify-between mb-6">
					<div className="flex items-center space-x-3">
						<div
							className={`p-3 bg-gradient-to-br ${iconColor} rounded-2xl shadow-lg shadow-${iconColor.split("-")[0]}-500/25`}
						>
							{icon}
						</div>
						<div>
							<h3 className="font-black text-slate-900 dark:text-white text-lg tracking-tight">
								{title}
							</h3>
							<p
								className={`text-xs ${iconColor.includes("indigo") ? "text-indigo-600 dark:text-indigo-400" : iconColor.includes("emerald") ? "text-emerald-600 dark:text-emerald-400" : "text-red-600 dark:text-red-400"} font-semibold`}
							>
								{subtitle}
							</p>
						</div>
					</div>
					<div className="text-right">
						<span
							className={`text-3xl font-black ${iconColor.includes("indigo") ? "text-indigo-600 dark:text-indigo-400" : iconColor.includes("emerald") ? "text-emerald-600 dark:text-emerald-400" : "text-red-600 dark:text-red-400"} block tracking-tight`}
						>
							{percentage}%
						</span>
						{additionalInfo && (
							<span className="text-xs text-slate-500 dark:text-slate-400 font-medium">
								{additionalInfo}
							</span>
						)}
					</div>
				</div>
				<div className="h-40 mb-4">
					<ResponsiveContainer width="100%" height="100%">
						<PieChart>
							<Pie
								data={data}
								cx="50%"
								cy="50%"
								innerRadius={45}
								outerRadius={65}
								dataKey="value"
								animationBegin={
									iconColor.includes("indigo")
										? 0
										: iconColor.includes("emerald")
											? 200
											: 400
								}
								animationDuration={1500}
								animationEasing="ease-out"
								cornerRadius={12}
								paddingAngle={3}
							>
								{data.map((entry, index) => (
									<Cell
										key={`${title.toLowerCase()}-cell-${index}`}
										fill={entry.color}
										stroke="none"
									/>
								))}
							</Pie>
						</PieChart>
					</ResponsiveContainer>
				</div>
				<div className="text-xs text-slate-600 dark:text-slate-400 space-y-2">
					{details.map((detail, index) => (
						<div
							key={index}
							className="flex justify-between bg-slate-50/80 dark:bg-slate-700/30 p-2 rounded-lg"
						>
							<span className="font-medium">{detail.label}:</span>
							<span className="font-bold">{detail.value}</span>
						</div>
					))}
				</div>
			</div>
		</div>
	);
}
