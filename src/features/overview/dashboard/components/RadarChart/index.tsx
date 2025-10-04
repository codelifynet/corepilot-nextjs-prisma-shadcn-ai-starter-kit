"use client";

import {
	ResponsiveContainer,
	RadarChart as RechartsRadarChart,
	PolarGrid,
	PolarAngleAxis,
	PolarRadiusAxis,
	Radar,
	Legend,
	Tooltip,
} from "recharts";

interface RadarData {
	subject: string;
	[key: string]: string | number;
}

interface RadarChartProps {
	title: string;
	data: RadarData[];
	dataKeys: { key: string; color: string; name: string }[];
	height?: number;
}

export function RadarChart({
	title,
	data,
	dataKeys,
	height = 300,
}: RadarChartProps) {
	return (
		<div className="group relative bg-white/80 dark:bg-slate-800/90 backdrop-blur-sm p-6 rounded-2xl shadow-lg/10 shadow-slate-200/30 dark:shadow-slate-900/20 border border-slate-200/60 dark:border-slate-700/60 hover:shadow-xl/20 hover:scale-[1.01] transition-all duration-500 overflow-hidden">
			<div className="absolute inset-0 bg-gradient-to-br from-purple-50/30 to-transparent dark:from-purple-900/10 dark:to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
			<div className="relative z-10">
				<h3 className="text-lg font-black text-slate-900 dark:text-white mb-4 tracking-tight">
					{title}
				</h3>
				<div style={{ height }}>
					<ResponsiveContainer width="100%" height="100%">
						<RechartsRadarChart data={data}>
							<PolarGrid
								stroke="#334155"
								opacity={0.3}
							/>
							<PolarAngleAxis
								dataKey="subject"
								tick={{ fill: '#64748B', fontSize: 12 }}
							/>
							<PolarRadiusAxis
								tick={{ fill: '#64748B', fontSize: 10 }}
								tickCount={5}
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
								<Radar
									key={item.key}
									name={item.name}
									dataKey={item.key}
									stroke={item.color}
									fill={item.color}
									fillOpacity={0.3}
									strokeWidth={2}
									dot={{ r: 4, fill: item.color }}
								/>
							))}
						</RechartsRadarChart>
					</ResponsiveContainer>
				</div>
			</div>
		</div>
	);
}

export default RadarChart;