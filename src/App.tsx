import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Layout } from "./app/components";
import { Home, ShoppingCart } from "./app/view";
import {ShoppingListProvider} from "./app/contexts";

function App() {
	const route = createBrowserRouter([
		{
			element: <Layout/>, 
				children: [
					{path: "/", element: <Home />,},
					{path: "/shopping-cart", element: <ShoppingCart />,},
				]
			
		},
	]);

	return (
		<div className="flex justify-center items-center bg-gray-200 h-screen">
				<ShoppingListProvider>
					<RouterProvider router={route}></RouterProvider>
				</ShoppingListProvider>
			</div>
		);
}

export default App;
