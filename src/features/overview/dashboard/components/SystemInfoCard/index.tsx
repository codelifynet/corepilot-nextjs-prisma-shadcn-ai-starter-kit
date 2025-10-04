import type { ReactNode } from "react";

interface SystemInfoCardProps {
	title: string;
	subtitle: string;
	icon: ReactNode;
	iconColor: string;
	specs: Array<{
		label: string;
		value: string;
	}>;
}

export default function SystemInfoCard({
	title,
	subtitle,
	icon,
	iconColor,
	specs,
}: SystemInfoCardProps) {
	return (
		<div className="group relative bg-white/80 dark:bg-slate-800/90 backdrop-blur-sm p-6 rounded-2xl shadow-lg/10 shadow-slate-200/30 dark:shadow-slate-900/20 border border-slate-200/60 dark:border-slate-700/60 hover:shadow-xl/20 hover:scale-[1.02] transition-all duration-500 overflow-hidden">
			<div className="absolute inset-0 bg-gradient-to-br from-purple-50/50 to-transparent dark:from-purple-900/10 dark:to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
			<div className="relative z-10">
				<div className="flex items-center space-x-3 mb-6">
					<div
						className={`p-3 bg-gradient-to-br ${iconColor} rounded-2xl shadow-lg shadow-purple-500/25`}
					>
						{icon}
					</div>
					<div>
						<h3 className="font-black text-slate-900 dark:text-white text-lg tracking-tight">
							{title}
						</h3>
						<p className="text-xs text-purple-600 dark:text-purple-400 font-semibold">
							{subtitle}
						</p>
					</div>
				</div>
				<div className="space-y-3 text-sm">
					{specs.map((spec, index) => (
						<div
							key={index}
							className="bg-slate-50/80 dark:bg-slate-700/30 p-3 rounded-xl backdrop-blur-sm"
						>
							<div className="flex justify-between items-center">
								<span className="text-slate-600 dark:text-slate-400 font-semibold">
									{spec.label}:
								</span>
								<span
									className={`text-slate-900 dark:text-white font-black ${spec.value.length > 20 ? "text-xs" : ""}`}
								>
									{spec.value}
								</span>
							</div>
						</div>
					))}
				</div>
			</div>
		</div>
	);
}
