import { Button } from "../../components";
import { useShoppingList } from "../../contexts";
import type { Product } from "../../interfaces/Product";

const Card = ({ item }: Product) => {
	const { addProduct } = useShoppingList();

	return (
		<div className="flex h-96 flex-col justify-center bg-white p-2 w-64 rounded-2xl">
			<div className="flex justify-center">
				<img
					alt={item.name}
					className="h-40 rounded-t-lg object-cover"
					src={`http://localhost:5173/public/assets/products/${item.image}.jpg`}
				/>
			</div>
			<div className="p-4 flex flex-col gap-2">
				<div className="flex justify-center items-center mb-2">
					<span className="text-center capitalize font-bold">{item.name}</span>
				</div>
				<div className="flex justify-center items-center">
					<span>{item.price}</span>
				</div>
			</div>
			<Button onClick={(e) => {e.stopPropagation(); addProduct(item.id, item.name, item.price)}}>
				Adicionar no Carrinho
			</Button>
		</div>
	);
};

export { Card };
