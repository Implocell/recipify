import { useState } from "react";
import { Button } from "../../components/button";
import { Modal } from "../../components/modal";
import { AddRecipe } from "../../containers/add";
import { Logout } from "../../containers/logout";
import "./styles.scss";

export const Header = () => {
	const [isOpen, setIsOpen] = useState(false);
	return (
		<nav className="header">
			<Button name="Legg til" onClick={() => setIsOpen(true)} />
			<AddRecipe isOpen={isOpen} setIsOpen={setIsOpen} />
			<Logout />
		</nav>
	);
};
