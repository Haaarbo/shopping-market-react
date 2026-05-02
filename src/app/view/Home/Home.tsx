import { useEffect } from "react";
import { Card } from "../../components";
import { findAll } from "../../services/product.service";

const Home = () => {
	useEffect(() => {
		findAll().then((res) => console.log(res))
	})

	return (
		<>
			<Card />
		</>
	);
};

export { Home };
