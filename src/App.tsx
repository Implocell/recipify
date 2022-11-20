import { useContext } from "react";
import { Login } from "./containers/login";
import { Recipes } from "./containers/recipes";
import { AuthCtx } from "./context/AuthContext";
import { AddRecipe } from "./containers/add";
function App() {
	const { isAuth } = useContext(AuthCtx);

	if (!isAuth()) {
		return (
			<div className="App">
				<Login />
			</div>
		);
	}

	return (
		<div className="App">
			<AddRecipe />
			<Recipes />
		</div>
	);
}

export default App;
