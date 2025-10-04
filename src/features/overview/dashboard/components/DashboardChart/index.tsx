"use client";

import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from "recharts";
import type { ChartData } from "../../types";

interface DashboardChartProps {
	title: string;
	data: ChartData[];
	height?: number;
}

const COLORS = ["#3B82F6", "#10B981", "#F59E0B", "#8B5CF6", "#EF4444"];

export function DashboardChart({
	title,
	data,
	height = 300,
}: DashboardChartProps) {
	return (
		<div className="group relative bg-white/80 dark:bg-slate-800/90 backdrop-blur-sm p-6 rounded-2xl shadow-lg/10 shadow-slate-200/30 dark:shadow-slate-900/20 border border-slate-200/60 dark:border-slate-700/60 hover:shadow-xl/20 hover:scale-[1.01] transition-all duration-500 overflow-hidden">
			<div className="absolute inset-0 bg-gradient-to-br from-slate-50/30 to-transparent dark:from-slate-900/10 dark:to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
			<div className="relative z-10">
				<h3 className="text-lg font-black text-slate-900 dark:text-white mb-6 tracking-tight">
					{title}
				</h3>
				<div style={{ height: height }}>
					<ResponsiveContainer width="100%" height="100%">
						<PieChart>
							<Pie
								data={data}
								cx="50%"
								cy="50%"
								innerRadius={60}
								outerRadius={100}
								dataKey="value"
								cornerRadius={8}
								paddingAngle={2}
							>
								{data.map((entry, index) => (
									<Cell
										key={`cell-${index}`}
										fill={entry.fill || COLORS[index % COLORS.length]}
									/>
								))}
							</Pie>
							<Tooltip
								contentStyle={{
									backgroundColor: "rgba(15, 23, 42, 0.95)",
									border: "none",
									borderRadius: "12px",
									color: "#F8FAFC",
									backdropFilter: "blur(16px)",
									boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.25)",
								}}
								formatter={(value: any, name: any) => [value, name]}
							/>
						</PieChart>
					</ResponsiveContainer>
				</div>
				<div className="mt-4 space-y-2">
					{data.map((item, index) => (
						<div key={index} className="flex items-center justify-between">
							<div className="flex items-center gap-2">
								<div
									className="w-3 h-3 rounded-full"
									style={{
										backgroundColor: item.fill || COLORS[index % COLORS.length],
									}}
								></div>
								<span className="text-sm font-medium text-slate-700 dark:text-slate-300">
									{item.name}
								</span>
							</div>
							<div className="flex items-center gap-2">
								<span className="text-sm font-bold text-slate-900 dark:text-white">
									{item.value.toLocaleString()}
								</span>
							</div>
						</div>
					))}
				</div>
			</div>
		</div>
	);
}

export default DashboardChart;
