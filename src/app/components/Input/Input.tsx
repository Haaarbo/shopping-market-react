import { tv } from "tailwind-variants";

const inputVariants = tv({
	base: "rounded bg-gray-200 w-full p-2 outline-none",
});

const Input = () => {
	return (
		<div>
			<input
				className={inputVariants.base}
				placeholder="Search..."
				type="text"
			></input>
		</div>
	);
};

export { Input };
