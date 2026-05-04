import type { ComponentProps } from "react";
import { tv } from "tailwind-variants";

const inputVariants = tv({
	base: "rounded bg-gray-200 w-full p-2 outline-none",
});

type InputProps = ComponentProps<"input">;

const Input = ({ onChange, ...props }: InputProps) => {
	return (
		<div>
			<input
				onChange={onChange}
				className={inputVariants.base}
				placeholder="Search..."
				type="text"
				{...props}
			></input>
		</div>
	);
};

export { Input };
