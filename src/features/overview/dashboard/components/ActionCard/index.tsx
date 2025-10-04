interface ActionItem {
	icon: string;
	label: string;
	color: string;
	onClick?: () => void;
}

interface ActionCardProps {
	title: string;
	actions: ActionItem[];
}

export default function ActionCard({ title, actions }: ActionCardProps) {
	const getColorClasses = (color: string) => {
		const colorMap = {
			blue: "bg-gradient-to-r from-blue-50 to-blue-100/50 dark:from-blue-900/20 dark:to-blue-800/20 text-blue-700 dark:text-blue-300 hover:from-blue-100 hover:to-blue-200/50 dark:hover:from-blue-800/30 dark:hover:to-blue-700/30 border-blue-200/50 dark:border-blue-700/50 hover:shadow-blue-500/20",
			emerald:
				"bg-gradient-to-r from-emerald-50 to-emerald-100/50 dark:from-emerald-900/20 dark:to-emerald-800/20 text-emerald-700 dark:text-emerald-300 hover:from-emerald-100 hover:to-emerald-200/50 dark:hover:from-emerald-800/30 dark:hover:to-emerald-700/30 border-emerald-200/50 dark:border-emerald-700/50 hover:shadow-emerald-500/20",
			amber:
				"bg-gradient-to-r from-amber-50 to-amber-100/50 dark:from-amber-900/20 dark:to-amber-800/20 text-amber-700 dark:text-amber-300 hover:from-amber-100 hover:to-amber-200/50 dark:hover:from-amber-800/30 dark:hover:to-amber-700/30 border-amber-200/50 dark:border-amber-700/50 hover:shadow-amber-500/20",
			purple:
				"bg-gradient-to-r from-purple-50 to-purple-100/50 dark:from-purple-900/20 dark:to-purple-800/20 text-purple-700 dark:text-purple-300 hover:from-purple-100 hover:to-purple-200/50 dark:hover:from-purple-800/30 dark:hover:to-purple-700/30 border-purple-200/50 dark:border-purple-700/50 hover:shadow-purple-500/20",
		};
		return colorMap[color as keyof typeof colorMap] || colorMap.blue;
	};

	return (
		<div className="group relative bg-white/80 dark:bg-slate-800/90 backdrop-blur-sm p-6 rounded-2xl shadow-lg/10 shadow-slate-200/30 dark:shadow-slate-900/20 border border-slate-200/60 dark:border-slate-700/60 hover:shadow-xl/20 hover:scale-[1.01] transition-all duration-500 overflow-hidden">
			<div className="absolute inset-0 bg-gradient-to-br from-blue-50/30 to-transparent dark:from-blue-900/10 dark:to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
			<div className="relative z-10">
				<h3 className="text-lg font-black text-slate-900 dark:text-white mb-6 tracking-tight">
					{title}
				</h3>
				<div className="space-y-3">
					{actions.map((action, index) => (
						<button
							key={index}
							onClick={action.onClick}
							className={`group/btn w-full text-left p-4 rounded-2xl ${getColorClasses(action.color)} transition-all duration-300 border hover:scale-[1.02] hover:shadow-lg`}
						>
							<div className="flex items-center gap-3">
								<span className="text-lg">{action.icon}</span>
								<span className="font-semibold">{action.label}</span>
							</div>
						</button>
					))}
				</div>
			</div>
		</div>
	);
}
