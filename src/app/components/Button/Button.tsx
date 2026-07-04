import type { ComponentProps } from "react";
import { twMerge } from "tailwind-merge";
import { tv, type VariantProps } from "tailwind-variants";

const buttonVariants = tv({
	variants: {
		variant: {
			primary:
				"w-full rounded bg-blue-500 py-2 px-4 hover:bg-blue-700 hover:text-white",
			secondary:
				"bg-red-500 text-white hover:bg-red-700",
		},
	},
	defaultVariants: {
		variant: "primary",
	},
});

type PropsButton = ComponentProps<"button"> &
	VariantProps<typeof buttonVariants>;

const Button = ({ className, children, variant, ...props }: PropsButton) => {
	const classButton = twMerge(buttonVariants({ variant }), className);

	return <button className={classButton} {...props}>
		{
			children
		}
	</button>;
};

export { Button };
