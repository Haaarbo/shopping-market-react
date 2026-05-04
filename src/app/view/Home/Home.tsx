import { useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { Card } from "../../components";
import { findAll } from "../../services/product.service";
import type { ProductProps } from "../../interfaces/Product";

const Home = () => {
	// useEffect(() => {
	// 	findAll().then((res) => console.log(res))
	// })

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
		queryKey: ["query-products"],
		queryFn: findAll,
	});

	return (
		<div className="mt-32 h-4/5 w-full flex flex-col items-center justify-center gap-16">
			<div className="grid h-5/6 w-11/12 grid-cols-4 gap-4 overflow-x-auto">
				{products?.map((product: ProductProps) => {
					return <Card key={product.id} item={product} />;
				})}
			</div>
		</div>
	);
};

export { Home };
