import {
	ResponsiveContainer,
	LineChart,
	Line,
	XAxis,
	YAxis,
	CartesianGrid,
	Tooltip,
	BarChart,
	Bar,
} from "recharts";

interface PerformanceData {
	time: string;
	cpu: number;
	ram: number;
	network: number;
}

interface ResourceData {
	name: string;
	usage: number;
	color: string;
}

interface PerformanceChartProps {
	type: "line" | "bar";
	title: string;
	data: PerformanceData[] | ResourceData[];
	height?: number;
}

export default function PerformanceChart({
	type,
	title,
	data,
	height = 264,
}: PerformanceChartProps) {
	return (
		<div className="group relative bg-white/80 dark:bg-slate-800/90 backdrop-blur-sm p-6 rounded-2xl shadow-lg/10 shadow-slate-200/30 dark:shadow-slate-900/20 border border-slate-200/60 dark:border-slate-700/60 hover:shadow-xl/20 hover:scale-[1.01] transition-all duration-500 overflow-hidden">
			<div
				className={`absolute inset-0 bg-gradient-to-br ${type === "line" ? "from-blue-50/30" : "from-emerald-50/30"} to-transparent ${type === "line" ? "dark:from-blue-900/10" : "dark:from-emerald-900/10"} dark:to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500`}
			></div>
			<div className="relative z-10">
				<h3 className="text-lg font-black text-slate-900 dark:text-white mb-4 tracking-tight">
					{title}
				</h3>
				<div style={{ height }}>
					<ResponsiveContainer width="100%" height="100%">
						{type === "line" ? (
							<LineChart data={data as PerformanceData[]}>
								<CartesianGrid
									strokeDasharray="3 3"
									stroke="#334155"
									opacity={0.2}
								/>
								<XAxis dataKey="time" stroke="#64748B" fontSize={12} />
								<YAxis stroke="#64748B" fontSize={12} />
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
								<Line
									type="monotone"
									dataKey="cpu"
									stroke="#3B82F6"
									strokeWidth={3}
									name="CPU %"
									dot={{ r: 5, fill: "#3B82F6" }}
									activeDot={{ r: 7, stroke: "#3B82F6", strokeWidth: 2 }}
								/>
								<Line
									type="monotone"
									dataKey="ram"
									stroke="#10B981"
									strokeWidth={3}
									name="RAM %"
									dot={{ r: 5, fill: "#10B981" }}
									activeDot={{ r: 7, stroke: "#10B981", strokeWidth: 2 }}
								/>
								<Line
									type="monotone"
									dataKey="network"
									stroke="#F59E0B"
									strokeWidth={3}
									name="Network %"
									dot={{ r: 5, fill: "#F59E0B" }}
									activeDot={{ r: 7, stroke: "#F59E0B", strokeWidth: 2 }}
								/>
							</LineChart>
						) : (
							<BarChart data={data as ResourceData[]}>
								<CartesianGrid
									strokeDasharray="3 3"
									stroke="#334155"
									opacity={0.2}
								/>
								<XAxis dataKey="name" stroke="#64748B" fontSize={12} />
								<YAxis stroke="#64748B" domain={[0, 100]} fontSize={12} />
								<Tooltip
									contentStyle={{
										backgroundColor: "rgba(15, 23, 42, 0.95)",
										border: "none",
										borderRadius: "12px",
										color: "#F8FAFC",
										backdropFilter: "blur(16px)",
										boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.25)",
									}}
									formatter={(value) => [
										`${Number(value).toFixed(1)}%`,
										"Usage",
									]}
								/>
								<Bar
									dataKey="usage"
									fill="#3B82F6"
									radius={[8, 8, 0, 0]}
									className="hover:opacity-80 transition-opacity duration-300"
								/>
							</BarChart>
						)}
					</ResponsiveContainer>
				</div>
			</div>
		</div>
	);
}
