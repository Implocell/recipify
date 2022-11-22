import { useContext } from "react";
import { Login } from "./containers/login";
import { Recipes } from "./containers/recipes";
import { AuthCtx } from "./context/AuthContext";
import { Header } from "./fragments/header";

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
			<Header />
			<Recipes />
		</div>
	);
}

export default App;
