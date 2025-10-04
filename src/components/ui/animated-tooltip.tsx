"use client";

import { useState } from "react";
import {
	motion,
	useTransform,
	AnimatePresence,
	useMotionValue,
	useSpring,
} from "motion/react";
import Image from "next/image";

export const AnimatedTooltip = ({
	items,
}: {
	items: {
		id: number;
		name: string;
		designation: string;
		image: string;
	}[];
}) => {
	const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
	const springConfig = { stiffness: 150, damping: 8 };
	const x = useMotionValue(0);

	const rotate = useSpring(useTransform(x, [-100, 100], [-8, 8]), springConfig);

	const translateX = useSpring(
		useTransform(x, [-100, 100], [-30, 30]),
		springConfig,
	);

	const handleMouseMove = (event: React.MouseEvent<HTMLImageElement>) => {
		const halfWidth = (event.target as HTMLImageElement).offsetWidth / 2;
		x.set(event.nativeEvent.offsetX - halfWidth);
	};

	return (
		<div className="flex items-center justify-center">
			{items.map((item) => (
				<div
					aria-hidden="true"
					className="group relative -mr-3"
					key={item.name}
					onMouseEnter={() => setHoveredIndex(item.id)}
					onMouseLeave={() => setHoveredIndex(null)}
				>
					<AnimatePresence mode="popLayout">
						{hoveredIndex === item.id && (
							<motion.div
								initial={{ opacity: 0, y: 20, scale: 0.6 }}
								animate={{
									opacity: 1,
									y: 0,
									scale: 1,
									transition: {
										type: "spring",
										stiffness: 260,
										damping: 10,
									},
								}}
								exit={{ opacity: 0, y: 20, scale: 0.6 }}
								style={{
									translateX: translateX,
									rotate: rotate,
									whiteSpace: "nowrap",
									willChange: "transform, opacity",
								}}
								className="absolute -top-20 left-1/2 z-50 flex -translate-x-1/2 flex-col items-center justify-center rounded-xl bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 px-5 py-3 shadow-2xl border border-purple-500/20 backdrop-blur-sm"
							>
								{/* Gradient border effect */}
								<div className="absolute inset-0 rounded-xl bg-gradient-to-r from-purple-500/20 via-pink-500/20 to-purple-500/20 p-[1px]">
									<div className="h-full w-full rounded-xl bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900" />
								</div>

								{/* Animated gradient lines */}
								<div className="absolute -bottom-px left-1/2 z-30 h-px w-[60%] -translate-x-1/2 bg-gradient-to-r from-transparent via-purple-400 to-transparent" />
								<div className="absolute -bottom-px left-1/2 z-30 h-px w-[30%] -translate-x-1/2 bg-gradient-to-r from-transparent via-pink-400 to-transparent" />

								{/* Content */}
								<div className="relative z-30 text-sm font-semibold text-white mb-1">
									{item.name}
								</div>
								<div className="relative z-30 text-xs text-purple-200 font-medium">
									{item.designation}
								</div>

								{/* Arrow pointer */}
								<div className="absolute -bottom-1 left-1/2 z-30 h-2 w-2 -translate-x-1/2 rotate-45 bg-gradient-to-br from-slate-900 to-purple-900 border-r border-b border-purple-500/20" />
							</motion.div>
						)}
					</AnimatePresence>

					{/* Avatar with enhanced styling */}
					<div className="relative">
						{/* Gradient ring */}
						<div className="absolute -inset-1 rounded-full bg-gradient-to-r from-purple-500 via-pink-500 to-purple-500 opacity-0 group-hover:opacity-100 transition-all duration-300 blur-sm" />

						{/* Main avatar container */}
						<div className="relative p-1 rounded-full bg-gradient-to-r from-purple-500/80 via-pink-500/80 to-purple-500/80 group-hover:from-purple-400 group-hover:via-pink-400 group-hover:to-purple-400 transition-all duration-300">
							<div className="p-0.5 rounded-full bg-white">
								<Image
									onMouseMove={handleMouseMove}
									height={100}
									width={100}
									src={item.image}
									alt={item.name}
									sizes="48px"
									loading="lazy"
									className="relative h-12 w-12 rounded-full object-cover object-top transition-all duration-300 group-hover:scale-110 group-hover:shadow-lg"
								/>
							</div>
						</div>
					</div>
				</div>
			))}
		</div>
	);
};
