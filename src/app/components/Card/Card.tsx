import { Button } from "../../components";

const Card = () => {
	return (
		<div className="bg-white p-4 w-60 rounded-2xl">
			<div>
				<img src="http://localhost:5173/public/assets/products/tenis.jpg" />
			</div>
			<div className="p-4">
				<div className="flex justify-center items-center mb-2">
					<h3>Product's Name</h3>
				</div>
				<div className="flex justify-center items-center">
					<span>Product's Price</span>
				</div>
			</div>
			<Button>Adicionar no Carrinho</Button>
		</div>
	);
};

export { Card };
