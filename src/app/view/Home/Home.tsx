import { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Card, Button, List } from "../../components";
import { findAll } from "../../services/product.service";
import type { ProductProps } from "../../interfaces/Product";
import { tv } from "tailwind-variants";
import { twMerge } from "tailwind-merge";

const menuListVariants = tv({
	variants: {
		variant: {
			menuList: "absolute z-10 mt-1 w-48 rounded-md bg-white py-1 shadow-lg",
		},
	},
});

const Home = () => {
	const [typeFilter, setTypeFilter] = useState("");
	const [isOpenMenu, setIsOpenMenu] = useState(false);

	const listOptionsFilter = [
		{
			value: "desc",
			name: "Maior preço",
			class: "flex justify-center w-full",
		},
		{
			value: "asc",
			name: "Menor preço",
			class: "flex justify-center w-full",
		},
	];

	//versao inicial:
	// const {
	// 	data: products,
	// 	error,
	// 	isLoading,
	// } = useQuery<ProductProps[], Error>("query-products", async () => {
	// 	return await findAll();
	// });
	const {
		data: products,
		error,
		isLoading,
	} = useQuery<ProductProps[], Error>({
		queryKey: ["query-products", typeFilter],
		queryFn: () => findAll(typeFilter),
	});

	const handleFilter = (value: string) => {
		setTypeFilter(value);
	};

	const handleFilterButton = () => {
		setIsOpenMenu(!isOpenMenu)
	}

	const menuListClasses = twMerge(
		menuListVariants(),
		isOpenMenu
			? "flex items-center flex-col absolute top-60 bg-white rounded-md p-4 shadow-lg shadow-black w-44"
			: "hidden",
	);

	return (
		<div className="mt-32 h-4/5 w-full flex flex-col items-center justify-center gap-16">
			<div className="flex w-4/5 flex-col items-end">
				<Button className="w-24" onClick={() => { handleFilterButton() }}>Filtro</Button>
				<ul className={menuListClasses}>
				{listOptionsFilter.map((item) => {
					return (
						<List
							key={item.name}
							className={item.class}
							onClick={(e) => {
								e.stopPropagation();
								handleFilter(item.value);
							}}
						>
							{item.name}
						</List>
					);
				})}
			</ul>
			</div>

			<div className="grid h-5/6 w-11/12 grid-cols-4 gap-4 overflow-x-auto">
				{products?.map((product: ProductProps) => {
					return <Card key={product.id} item={product} />;
				})}
			</div>
		</div>
	);
};

export { Home };
