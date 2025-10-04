/**
 * Centralized Framer Motion Animation Variants
 * 
 * This file contains all animation variants used across the landing page components.
 * Following FDD principles, these variants are organized by animation type and reusability.
 */

import type { Variants } from "framer-motion";

// ========================================
// CONTAINER VARIANTS
// ========================================

/**
 * Standard container variant with staggered children animation
 * Used for: PricingSection, FeaturesSection, TestimonialsSection
 */
export const containerVariants: Variants = {
	hidden: { opacity: 0 },
	visible: {
		opacity: 1,
		transition: {
			staggerChildren: 0.2,
			delayChildren: 0.1,
		},
	},
};

/**
 * Container variant with faster stagger for testimonials
 */
export const containerVariantsFast: Variants = {
	hidden: { opacity: 0 },
	visible: {
		opacity: 1,
		transition: {
			staggerChildren: 0.15,
			delayChildren: 0.2,
		},
	},
};

// ========================================
// CARD VARIANTS
// ========================================

/**
 * Standard card animation with scale and y-axis movement
 * Used for: PricingSection cards
 */
export const cardVariants: Variants = {
	hidden: {
		opacity: 0,
		y: 50,
		scale: 0.9
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

/**
 * Testimonial card variant with different y-offset
 */
export const testimonialCardVariants: Variants = {
	hidden: {
		opacity: 0,
		y: 40,
		scale: 0.95
	},
	visible: {
		opacity: 1,
		y: 0,
		scale: 1,
		transition: {
			duration: 0.7,
			ease: [0.25, 0.46, 0.45, 0.94],
		},
	},
};

// ========================================
// ITEM VARIANTS
// ========================================

/**
 * Feature item animation variant
 * Used for: FeaturesSection items
 */
export const itemVariants: Variants = {
	hidden: {
		opacity: 0,
		y: 30,
		scale: 0.9
	},
	visible: {
		opacity: 1,
		y: 0,
		scale: 1,
		transition: {
			duration: 0.6,
			ease: [0.25, 0.46, 0.45, 0.94],
		},
	},
};

/**
 * Feature list item variant with x-axis movement
 * Used for: PricingSection feature lists
 */
export const featureVariants: Variants = {
	hidden: { opacity: 0, x: -20 },
	visible: {
		opacity: 1,
		x: 0,
		transition: {
			duration: 0.5,
		},
	},
};

// ========================================
// HEADER VARIANTS
// ========================================

/**
 * Standard header animation variant
 * Used for: Section headers across components
 */
export const headerVariants: Variants = {
	hidden: { opacity: 0, y: 30 },
	visible: {
		opacity: 1,
		y: 0,
		transition: {
			duration: 0.8,
			ease: [0.25, 0.46, 0.45, 0.94],
		},
	},
};

/**
 * Lighter header variant with less y-offset
 * Used for: FeaturesSection header
 */
export const headerVariantsLight: Variants = {
	hidden: { opacity: 0, y: 20 },
	visible: {
		opacity: 1,
		y: 0,
		transition: {
			duration: 0.8,
			ease: [0.25, 0.46, 0.45, 0.94],
		},
	},
};

// ========================================
// STATS VARIANTS
// ========================================

/**
 * Statistics animation variant with scale effect
 * Used for: TestimonialsSection stats
 */
export const statsVariants: Variants = {
	hidden: { opacity: 0, scale: 0.8 },
	visible: {
		opacity: 1,
		scale: 1,
		transition: {
			duration: 0.6,
			delay: 0.3,
			ease: [0.25, 0.46, 0.45, 0.94],
		},
	},
};

// ========================================
// HERO VARIANTS
// ========================================

/**
 * Hero content slide-in from left
 */
export const heroContentVariants: Variants = {
	hidden: { opacity: 0, x: -50 },
	visible: { 
		opacity: 1, 
		x: 0,
		transition: { duration: 0.6, ease: "easeOut" }
	},
};

/**
 * Hero content slide-in from right
 */
export const heroImageVariants: Variants = {
	hidden: { opacity: 0, x: 50 },
	visible: { 
		opacity: 1, 
		x: 0,
		transition: { duration: 0.6, ease: "easeOut", delay: 0.3 }
	},
};

/**
 * Hero badge animation
 */
export const heroBadgeVariants: Variants = {
	hidden: { opacity: 0, y: 20 },
	visible: { 
		opacity: 1, 
		y: 0,
		transition: { duration: 0.5, delay: 0.1 }
	},
};

/**
 * Hero title animation
 */
export const heroTitleVariants: Variants = {
	hidden: { opacity: 0, y: 30 },
	visible: { 
		opacity: 1, 
		y: 0,
		transition: { duration: 0.6, delay: 0.2 }
	},
};

/**
 * Hero description animation
 */
export const heroDescriptionVariants: Variants = {
	hidden: { opacity: 0, y: 20 },
	visible: { 
		opacity: 1, 
		y: 0,
		transition: { duration: 0.5, delay: 0.3 }
	},
};

/**
 * Hero buttons animation
 */
export const heroButtonsVariants: Variants = {
	hidden: { opacity: 0, y: 30 },
	visible: { 
		opacity: 1, 
		y: 0,
		transition: { duration: 0.6, delay: 0.4 }
	},
};

/**
 * Hero tech stack animation
 */
export const heroTechStackVariants: Variants = {
	hidden: { opacity: 0, scale: 0.8 },
	visible: { 
		opacity: 1, 
		scale: 1,
		transition: { duration: 0.5, delay: 0.5 }
	},
};

/**
 * Hero stats animation
 */
export const heroStatsVariants: Variants = {
	hidden: { opacity: 0, y: 20 },
	visible: { 
		opacity: 1, 
		y: 0,
		transition: { duration: 0.5, delay: 0.6 }
	},
};

/**
 * Hero icon scale animation
 */
export const heroIconVariants: Variants = {
	hidden: { scale: 0 },
	visible: { 
		scale: 1,
		transition: { duration: 0.4, delay: 0.7 }
	},
};

/**
 * Hero demo card animation
 */
export const heroDemoCardVariants: Variants = {
	hidden: { opacity: 0, scale: 0.8, y: 20 },
	visible: { 
		opacity: 1, 
		scale: 1, 
		y: 0,
		transition: { duration: 0.6, delay: 0.8 }
	},
};

/**
 * Hero floating element animation
 */
export const heroFloatingVariants: Variants = {
	hidden: { opacity: 0, scale: 0.8, y: -20 },
	visible: { 
		opacity: 1, 
		scale: 1, 
		y: 0,
		transition: { duration: 0.6, delay: 0.9 }
	},
};

// ========================================
// CTA VARIANTS
// ========================================

/**
 * CTA section animation
 */
export const ctaVariants: Variants = {
	hidden: { opacity: 0, y: 30 },
	visible: {
		opacity: 1,
		y: 0,
		transition: {
			duration: 0.8,
			ease: [0.25, 0.46, 0.45, 0.94],
		},
	},
};

/**
 * CTA button animation with scale
 */
export const ctaButtonVariants: Variants = {
	hidden: { opacity: 0, scale: 0.8 },
	visible: {
		opacity: 1,
		scale: 1,
		transition: {
			duration: 0.6,
			ease: [0.25, 0.46, 0.45, 0.94],
		},
	},
};

// ========================================
// UTILITY VARIANTS
// ========================================

/**
 * Simple fade in animation
 */
export const fadeInVariants: Variants = {
	hidden: { opacity: 0 },
	visible: { 
		opacity: 1,
		transition: { duration: 0.6 }
	},
};

/**
 * Scale animation for icons and small elements
 */
export const scaleVariants: Variants = {
	hidden: { scale: 0 },
	visible: { 
		scale: 1,
		transition: { duration: 0.4 }
	},
};

/**
 * Slide up animation
 */
export const slideUpVariants: Variants = {
	hidden: { opacity: 0, y: 20 },
	visible: { 
		opacity: 1, 
		y: 0,
		transition: { duration: 0.5 }
	},
};

/**
 * Slide down animation
 */
export const slideDownVariants: Variants = {
	hidden: { opacity: 0, y: -20 },
	visible: { 
		opacity: 1, 
		y: 0,
		transition: { duration: 0.5 }
	},
};

/**
 * Slide left animation
 */
export const slideLeftVariants: Variants = {
	hidden: { opacity: 0, x: 20 },
	visible: { 
		opacity: 1, 
		x: 0,
		transition: { duration: 0.5 }
	},
};

/**
 * Slide right animation
 */
export const slideRightVariants: Variants = {
	hidden: { opacity: 0, x: -20 },
	visible: { 
		opacity: 1, 
		x: 0,
		transition: { duration: 0.5 }
	},
};