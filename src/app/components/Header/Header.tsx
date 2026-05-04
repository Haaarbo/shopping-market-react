import { Input } from "../../components";
import { useQuery } from "@tanstack/react-query";
import { searchName } from "../../services/product.service";
import { useState, type ChangeEvent } from "react";
import type { ProductProps } from "../../interfaces/Product";
import { debounce } from "lodash";

const Header = () => {
	const [productName, setProductName] = useState("");

	const {
		data: productsByName,
		isLoading,
		error,
	} = useQuery<ProductProps[], Error>({
		queryKey: ["query-products-by-name", productName],
		queryFn: () => searchName(productName),
		enabled: productName.length > 0,
	});

	const handleInput = (e: ChangeEvent<HTMLInputElement>) => {
		const value = e.target.value;
		setProductName(value);
	};

	const debounceHandleOnChange = debounce(handleInput, 500);

	return (
		<>
			<header className="flex fixed justify-center top-0 right-0 w-full bg-white py-3">
				<div className="mx-auto flex items-center justify-between w-11/12 gap-52">
					<div>
						<a href="/">
							<img
								src="http://localhost:5173/public/assets/logo.png"
								alt="Company Logo"
								className="max-w-36"
							/>
						</a>
					</div>
					<div className="w-4/5">
						<Input onChange={debounceHandleOnChange} />
						<ul>
							{productsByName?.map((product: ProductProps) => {
								return <li>{product.name}</li>;
							})}
						</ul>
					</div>
					<div>Carrinho</div>
				</div>
			</header>
		</>
	);
};

export { Header };
