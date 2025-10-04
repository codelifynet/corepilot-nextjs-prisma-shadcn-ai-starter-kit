"use client";

import type React from "react";
import { TrendingUp, TrendingDown, Minus } from "lucide-react";

export interface StatsCardProps {
	title: string;
	value: string | number;
	change?: number;
	changeType?: "increase" | "decrease" | "neutral";
	icon: React.ReactNode;
	gradient: string;
	description?: string;
}

export function StatsCard({
	title,
	value,
	change,
	changeType = "neutral",
	icon,
	gradient,
	description,
}: StatsCardProps) {
	const getTrendIcon = () => {
		switch (changeType) {
			case "increase":
				return <TrendingUp className="w-4 h-4 mr-1" />;
			case "decrease":
				return <TrendingDown className="w-4 h-4 mr-1" />;
			default:
				return <Minus className="w-4 h-4 mr-1" />;
		}
	};

	const getTrendColor = () => {
		switch (changeType) {
			case "increase":
				return "text-emerald-600 dark:text-emerald-400";
			case "decrease":
				return "text-red-600 dark:text-red-400";
			default:
				return "text-slate-500 dark:text-slate-400";
		}
	};

	const formatValue = (val: string | number) => {
		if (typeof val === "number") {
			return val.toLocaleString();
		}
		return val;
	};

	return (
		<div className="group relative bg-white/80 dark:bg-slate-800/90 backdrop-blur-sm p-6 rounded-2xl shadow-lg/10 shadow-slate-200/30 dark:shadow-slate-900/20 border border-slate-200/60 dark:border-slate-700/60 hover:shadow-xl/20 hover:scale-[1.02] transition-all duration-500 overflow-hidden">
			<div className="absolute inset-0 bg-gradient-to-br from-slate-50/50 to-transparent dark:from-slate-900/10 dark:to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
			<div className="relative z-10 flex items-center justify-between">
				<div className="flex-1">
					<h3 className="text-sm font-semibold text-slate-600 dark:text-slate-400 mb-2 tracking-wide uppercase">
						{title}
					</h3>
					<p className="text-3xl font-black text-slate-900 dark:text-white mb-2 tracking-tight">
						{formatValue(value)}
					</p>
					{change !== undefined && (
						<p
							className={`text-sm flex items-center font-medium ${getTrendColor()}`}
						>
							{getTrendIcon()}
							{Math.abs(change)}% from last period
						</p>
					)}
					{description && (
						<p className="text-xs text-slate-500 dark:text-slate-400 mt-2">
							{description}
						</p>
					)}
				</div>
				<div className="relative">
					<div
						className={`p-3 bg-gradient-to-br ${gradient} rounded-2xl shadow-lg group-hover:shadow-xl transition-shadow duration-500`}
					>
						{icon}
					</div>
					<div
						className={`absolute inset-0 bg-gradient-to-br ${gradient} rounded-2xl opacity-20 blur-xl group-hover:opacity-30 transition-opacity duration-500`}
					></div>
				</div>
			</div>
		</div>
	);
}

export default StatsCard;
