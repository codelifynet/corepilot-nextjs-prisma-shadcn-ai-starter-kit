interface Alert {
	type: "success" | "info" | "warning" | "neutral";
	message: string;
	animated?: boolean;
}

interface AlertCardProps {
	title: string;
	alerts: Alert[];
}

export default function AlertCard({ title, alerts }: AlertCardProps) {
	const getAlertClasses = (type: string) => {
		const typeMap = {
			success:
				"bg-gradient-to-r from-emerald-50/80 to-emerald-100/30 dark:from-emerald-900/20 dark:to-emerald-800/10 border-emerald-200/50 dark:border-emerald-700/30 text-emerald-700 dark:text-emerald-300 bg-emerald-500",
			info: "bg-gradient-to-r from-blue-50/80 to-blue-100/30 dark:from-blue-900/20 dark:to-blue-800/10 border-blue-200/50 dark:border-blue-700/30 text-blue-700 dark:text-blue-300 bg-blue-500",
			warning:
				"bg-gradient-to-r from-amber-50/80 to-amber-100/30 dark:from-amber-900/20 dark:to-amber-800/10 border-amber-200/50 dark:border-amber-700/30 text-amber-700 dark:text-amber-300 bg-amber-500",
			neutral:
				"bg-gradient-to-r from-slate-50/80 to-slate-100/30 dark:from-slate-700/20 dark:to-slate-600/10 border-slate-200/50 dark:border-slate-600/30 text-slate-700 dark:text-slate-300 bg-slate-500",
		};
		return typeMap[type as keyof typeof typeMap] || typeMap.neutral;
	};

	return (
		<div className="group relative bg-white/80 dark:bg-slate-800/90 backdrop-blur-sm p-6 rounded-2xl shadow-lg/10 shadow-slate-200/30 dark:shadow-slate-900/20 border border-slate-200/60 dark:border-slate-700/60 hover:shadow-xl/20 hover:scale-[1.01] transition-all duration-500 overflow-hidden">
			<div className="absolute inset-0 bg-gradient-to-br from-slate-50/30 to-transparent dark:from-slate-700/10 dark:to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
			<div className="relative z-10">
				<h3 className="text-lg font-black text-slate-900 dark:text-white mb-6 tracking-tight">
					{title}
				</h3>
				<div className="space-y-4">
					{alerts.map((alert, index) => {
						const classes = getAlertClasses(alert.type);
						const [bgClasses, dotColorClass] = classes.split(" bg-");

						return (
							<div
								key={index}
								className={`flex items-center space-x-4 p-4 rounded-2xl ${bgClasses} border backdrop-blur-sm`}
							>
								<div
									className={`w-3 h-3 bg-${dotColorClass} rounded-full shadow-lg shadow-${dotColorClass.split("-")[0]}-500/30 ${alert.animated ? "animate-pulse" : ""}`}
								></div>
								<span className="text-sm font-medium">{alert.message}</span>
							</div>
						);
					})}
				</div>
			</div>
		</div>
	);
}
