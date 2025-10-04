"use client";

import {
	ResponsiveContainer,
	ScatterChart as RechartsScatterChart,
	Scatter,
	XAxis,
	YAxis,
	CartesianGrid,
	Tooltip
} from "recharts";

interface ScatterData {
	x: number;
	y: number;
	z?: number;
	[key: string]: any;
}

interface ScatterChartProps {
	title: string;
	data: ScatterData[];
	dataKey?: string;
	color?: string;
	height?: number;
	xAxisLabel?: string;
	yAxisLabel?: string;
}

export function ScatterChart({
	title,
	data,
	dataKey = "data",
	color = "#8884d8",
	height = 300,
	xAxisLabel = "X Axis",
	yAxisLabel = "Y Axis",
}: ScatterChartProps) {
	return (
		<div className="group relative bg-white/80 dark:bg-slate-800/90 backdrop-blur-sm p-6 rounded-2xl shadow-lg/10 shadow-slate-200/30 dark:shadow-slate-900/20 border border-slate-200/60 dark:border-slate-700/60 hover:shadow-xl/20 hover:scale-[1.01] transition-all duration-500 overflow-hidden">
			<div className="absolute inset-0 bg-gradient-to-br from-cyan-50/30 to-transparent dark:from-cyan-900/10 dark:to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
			<div className="relative z-10">
				<h3 className="text-lg font-black text-slate-900 dark:text-white mb-4 tracking-tight">
					{title}
				</h3>
				<div style={{ height }}>
					<ResponsiveContainer width="100%" height="100%">
						<RechartsScatterChart
							margin={{
								top: 20,
								right: 20,
								bottom: 20,
								left: 20,
							}}
						>
							<CartesianGrid
								strokeDasharray="3 3"
								stroke="#334155"
								opacity={0.2}
							/>
							<XAxis
								type="number"
								dataKey="x"
								name={xAxisLabel}
								stroke="#64748B"
								fontSize={12}
								tick={{ fill: '#64748B' }}
							/>
							<YAxis
								type="number"
								dataKey="y"
								name={yAxisLabel}
								stroke="#64748B"
								fontSize={12}
								tick={{ fill: '#64748B' }}
							/>
							<Tooltip
								cursor={{ strokeDasharray: '3 3' }}
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
							<Scatter
								name={dataKey}
								data={data}
								fill={color}
								stroke={color}
								strokeWidth={2}
								r={6}
							/>
						</RechartsScatterChart>
					</ResponsiveContainer>
				</div>
			</div>
		</div>
	);
}

export default ScatterChart;