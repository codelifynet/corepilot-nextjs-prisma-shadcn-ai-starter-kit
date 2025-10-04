"use client";

import {
	ResponsiveContainer,
	AreaChart as RechartsAreaChart,
	Area,
	XAxis,
	YAxis,
	CartesianGrid,
	Tooltip,
	Legend,
} from "recharts";

interface AreaData {
	name: string;
	[key: string]: string | number;
}

interface AreaChartProps {
	title: string;
	data: AreaData[];
	dataKeys: { key: string; color: string; name: string }[];
	height?: number;
	stacked?: boolean;
}

export function AreaChart({
	title,
	data,
	dataKeys,
	height = 300,
	stacked = false,
}: AreaChartProps) {
	return (
		<div className="group relative bg-white/80 dark:bg-slate-800/90 backdrop-blur-sm p-6 rounded-2xl shadow-lg/10 shadow-slate-200/30 dark:shadow-slate-900/20 border border-slate-200/60 dark:border-slate-700/60 hover:shadow-xl/20 hover:scale-[1.01] transition-all duration-500 overflow-hidden">
			<div className="absolute inset-0 bg-gradient-to-br from-indigo-50/30 to-transparent dark:from-indigo-900/10 dark:to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
			<div className="relative z-10">
				<h3 className="text-lg font-black text-slate-900 dark:text-white mb-4 tracking-tight">
					{title}
				</h3>
				<div style={{ height }}>
					<ResponsiveContainer width="100%" height="100%">
						<RechartsAreaChart data={data}>
							<CartesianGrid
								strokeDasharray="3 3"
								stroke="#334155"
								opacity={0.2}
							/>
							<XAxis
								dataKey="name"
								stroke="#64748B"
								fontSize={12}
								tick={{ fill: '#64748B' }}
							/>
							<YAxis
								stroke="#64748B"
								fontSize={12}
								tick={{ fill: '#64748B' }}
							/>
							<Tooltip
								contentStyle={{
									backgroundColor: "rgba(15, 23, 42, 0.95)",
									border: "none",
									borderRadius: "12px",
									color: "#F8FAFC",
									backdropFilter: "blur(16px)",
									boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.25)",
								}}
							/>
							<Legend />
							{dataKeys.map((item) => (
								<Area
									key={item.key}
									type="monotone"
									dataKey={item.key}
									stackId={stacked ? "1" : undefined}
									stroke={item.color}
									fill={item.color}
									fillOpacity={0.6}
									strokeWidth={2}
									name={item.name}
								/>
							))}
						</RechartsAreaChart>
					</ResponsiveContainer>
				</div>
			</div>
		</div>
	);
}

export default AreaChart;