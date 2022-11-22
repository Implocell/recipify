import { addDoc, collection } from "firebase/firestore";
import React, { useContext, useState, Dispatch, SetStateAction } from "react";
import { Button } from "../../components/button";
import { Input } from "../../components/input";
import { Modal } from "../../components/modal";
import { AuthCtx } from "../../context/AuthContext";
import { db } from "../../firebase";

export const AddRecipe = ({
	isOpen,
	setIsOpen,
}: {
	isOpen: boolean;
	setIsOpen: Dispatch<SetStateAction<boolean>>;
}) => {
	const [rating, setRating] = useState("");
	const [link, setLink] = useState("");
	const [name, setName] = useState("");

	const { getUser } = useContext(AuthCtx);

	const handleClick = async (e: React.SyntheticEvent) => {
		e.preventDefault();
		const userEmail = getUser();

		if (!userEmail) {
			alert("User not authed");
		}

		try {
			await addDoc(collection(db, "recipes"), {
				link: link,
				name: name,
				owner: userEmail,
				rating: parseInt(rating),
			});
		} catch (e) {
			console.error("Error adding document: ", e);
		} finally {
			setRating("");
			setLink("");
			setName("");
			setIsOpen(false);
		}
	};

	return (
		<Modal
			handleClose={() => {
				setIsOpen((last) => !last);
			}}
			isOpen={isOpen}
		>
			<form onSubmit={handleClick}>
				<Input name="Lenke" setter={setLink} value={link} />
				<Input name="Navn" setter={setName} value={name} />
				<Input
					name="Rating"
					setter={setRating}
					value={rating}
					type="number"
				/>
				<Button name="Send inn" type="submit" />
			</form>
		</Modal>
	);
};
