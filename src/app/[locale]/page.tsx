
"use client";

import { Suspense } from "react";
import { motion } from "framer-motion";
import Header from "@/section/landing/Header";
import Hero from "@/section/landing/Hero";
import FeaturesSection from "@/section/landing/FeaturesSection";
import TestimonialsSection from "@/section/landing/TestimonialsSection";
import PricingSection from "@/section/landing/PricingSection";
import CTASection from "@/section/landing/CTASection";
import Footer from "@/section/landing/Footer";

const SectionLoader = () => (
	<div className="flex items-center justify-center py-20">
		<div className="animate-spin rounded-full h-8 w-8 border-b-2 border-purple-600"></div>
	</div>
);

// Stagger animation variants
const containerVariants = {
	hidden: { opacity: 0 },
	visible: {
		opacity: 1,
		transition: {
			staggerChildren: 0.3,
			delayChildren: 0.2,
		},
	},
};

const sectionVariants = {
	hidden: {
		opacity: 0,
		y: 50,
		scale: 0.95
	},
	visible: {
		opacity: 1,
		y: 0,
		scale: 1,
		transition: {
			duration: 0.8,
			ease: [0.25, 0.46, 0.45, 0.94],
		},
	},
};

// Section wrapper component with alternating backgrounds
const AnimatedSection = ({
	children,
	isAlternate = false,
	ariaLabelledBy,
	className = ""
}: {
	children: React.ReactNode;
	isAlternate?: boolean;
	ariaLabelledBy?: string;
	className?: string;
}) => (
	<motion.section
		variants={sectionVariants}
		initial="hidden"
		whileInView="visible"
		viewport={{ once: true, margin: "-100px" }}
		aria-labelledby={ariaLabelledBy}
		className={`
			transition-colors duration-500 ease-in-out
			${isAlternate
				? 'bg-gray-50 dark:bg-gray-900/50'
				: 'bg-white dark:bg-gray-950'
			}
			${className}
		`}
	>
		{children}
	</motion.section>
);

export default function LandingPage() {
	return (
		<motion.main
			className="min-h-screen"
			variants={containerVariants}
			initial="hidden"
			animate="visible"
		>
			<Header />

			<motion.div
				className=""
				variants={containerVariants}
			>
				{/* Hero Section - No alternate background */}
				<AnimatedSection ariaLabelledBy="hero-heading">
					<Hero />
				</AnimatedSection>

				{/* Features Section - Alternate background */}
				<Suspense fallback={<SectionLoader />}>
					<AnimatedSection isAlternate ariaLabelledBy="features-heading">
						<FeaturesSection />
					</AnimatedSection>
				</Suspense>

				{/* Testimonials Section - Normal background */}
				<Suspense fallback={<SectionLoader />}>
					<AnimatedSection ariaLabelledBy="testimonials-heading">
						<TestimonialsSection />
					</AnimatedSection>
				</Suspense>

				{/* Pricing Section - Alternate background */}
				<Suspense fallback={<SectionLoader />}>
					<AnimatedSection isAlternate ariaLabelledBy="pricing-heading">
						<PricingSection />
					</AnimatedSection>
				</Suspense>

				{/* CTA Section - Normal background */}
				<Suspense fallback={<SectionLoader />}>
					<AnimatedSection ariaLabelledBy="cta-heading">
						<CTASection />
					</AnimatedSection>
				</Suspense>
			</motion.div>

			{/* Footer - Alternate background */}
			<Suspense fallback={<SectionLoader />}>
				<AnimatedSection isAlternate className="mt-0">
					<Footer />
				</AnimatedSection>
			</Suspense>
		</motion.main>
	);
}
