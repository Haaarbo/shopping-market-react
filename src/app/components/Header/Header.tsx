import { Input, List } from "../../components";
import { useQuery } from "@tanstack/react-query";
import { searchName } from "../../services/product.service";
import { useEffect, useRef, useState, type ChangeEvent } from "react";
import type { ProductProps } from "../../interfaces/Product";
import { debounce } from "lodash";
import { useOnClickOutside } from "../../hooks/useClickOutside";
import { CiShoppingCart } from "react-icons/ci";
import { Link } from "react-router-dom";
import { useShoppingList } from "../../contexts";

const Header = () => {
	const [productName, setProductName] = useState("");
	const [isOpen, setIsOpen] = useState(false);
	const refDropdown = useRef<HTMLUListElement>(null);
	const { totalQtd } = useShoppingList();

	const {
		data: productsByName,
		isLoading,
		error,
	} = useQuery<ProductProps[], Error>({
		queryKey: ["query-products-by-name", productName],
		queryFn: () => searchName(productName),
		enabled: productName.length > 0,
		// onSucess: (res) => {setIsOpen(res?.length>0)} >> NAO EXISTE NESTA VERSAO
	});

	// Substitue o onSucess
	// const isOpen = !!productsByName?.length;

	useEffect(() => {
		setIsOpen(!!productsByName?.length);
	}, [productsByName]);

	const handleInput = (e: ChangeEvent<HTMLInputElement>) => {
		const value = e.target.value;
		setProductName(value);
	};

	useOnClickOutside(refDropdown, () => {
		setIsOpen(false);
	});

	const debounceHandleOnChange = debounce(handleInput, 500);

	return (
		<>
			<header className="flex fixed justify-center top-0 right-0 w-full bg-white py-3">
				<div className="mx-auto flex items-center justify-between w-11/12 gap-52">
					<div>
						<Link to="/" relative="path">
							<img
								src="http://localhost:5173/public/assets/logo.png"
								alt="Company Logo"
								className="max-w-36"
							/>
						</Link>
					</div>
					<div className="w-4/5 relative ">
						<Input onChange={debounceHandleOnChange} />
						{isOpen && (
							<ul
								ref={refDropdown}
								className="absolute z-50 mt-4 max-h-60 w-full overflow-auto rounded-md bg-white p-4 shadow-lg"
							>
								{productsByName?.map((product: ProductProps) => {
									return (
										<List className="items-center justify-between">
											{product.name}
											<div>
												<img
													src={`http://localhost:5173/public/assets/products/${product.image}.jpg`}
													alt={product.name}
													className="h-20 rounded-t-lg object-cover"
												/>
												<span>R$ {product.price}</span>
											</div>
										</List>
									);
								})}
							</ul>
						)}
					</div>
					<Link className="flex" to="/shopping-cart" relative="path">
						<CiShoppingCart className="h-12 w-20" />

						{totalQtd > 0 && (
							<div className="relative right-8 flex size-6 justify-center rounded-3xl bg-blue-400">
								<span>{totalQtd}</span>
							</div>
						)}
					</Link>
				</div>
			</header>
		</>
	);
};

export { Header };
