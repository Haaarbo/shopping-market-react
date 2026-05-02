import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Header } from "./app/components";
import { Home } from "./app/view";

function App() {
	const route = createBrowserRouter([
		{
			path: "/",
			element: (
				<>
					<Header />
					<Home />
				</>
			),
		},
	]);

	return (
		<div className="flex justify-center items-center bg-gray-200 h-screen">
			<RouterProvider router={route}></RouterProvider>
		</div>
	);
}

export default App;
