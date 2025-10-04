import type * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const buttonVariants = cva(
	"inline-flex items-center cursor-pointer justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-all duration-200 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 shrink-0 [&_svg]:shrink-0 outline-none focus-visible:border-ring focus-visible:ring-blue-500/50 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive",
	{
		variants: {
			variant: {
				default:
					"bg-primary text-white shadow-xs hover:bg-primary/90 hover:shadow-md hover:shadow-blue-500/20 hover:-translate-y-0.5 focus:shadow-lg focus:shadow-blue-500/30 active:translate-y-0",
				destructive:
					"bg-destructive text-white shadow-xs hover:bg-destructive/90 hover:shadow-md hover:shadow-destructive/20 hover:-translate-y-0.5 focus-visible:ring-destructive/20 dark:focus-visible:ring-destructive/40 dark:bg-destructive/60 active:translate-y-0",
				outline:
					"border bg-background shadow-xs hover:bg-blue-50 hover:border-blue-400 hover:text-blue-600 hover:shadow-md hover:shadow-blue-500/10 hover:-translate-y-0.5 dark:bg-input/30 dark:border-input dark:hover:bg-blue-950/20 dark:hover:border-blue-500 dark:hover:text-blue-400 active:translate-y-0",
				secondary:
					"bg-secondary text-secondary-foreground shadow-xs hover:bg-secondary/80 hover:shadow-md hover:-translate-y-0.5 active:translate-y-0",
				ghost:
					"hover:bg-blue-50 hover:text-blue-600 hover:shadow-sm dark:hover:bg-blue-950/20 dark:hover:text-blue-400",
				link: "text-primary underline-offset-4 hover:underline hover:text-blue-600 dark:hover:text-blue-400",
			},
			size: {
				default: "h-9 px-4 py-2 has-[>svg]:px-3",
				sm: "h-8 rounded-md gap-1.5 px-3 has-[>svg]:px-2.5",
				lg: "h-10 rounded-md px-6 has-[>svg]:px-4",
				icon: "size-9",
			},
		},
		defaultVariants: {
			variant: "default",
			size: "default",
		},
	},
);

function Button({
	className,
	variant,
	size,
	asChild = false,
	...props
}: React.ComponentProps<"button"> &
	VariantProps<typeof buttonVariants> & {
		asChild?: boolean;
	}) {
	const Comp = asChild ? Slot : "button";

	return (
		<Comp
			data-slot="button"
			className={cn(buttonVariants({ variant, size, className }))}
			{...props}
		/>
	);
}

export { Button, buttonVariants };
