import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import React, { useState } from "react";
import { Button } from "../../components/button";
import { Input } from "../../components/input";
import "./styles.scss";

export const Login = () => {
	const auth = getAuth();
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [error, setError] = useState("");

	const handleSubmit = (e: React.SyntheticEvent) => {
		e.preventDefault();

		signInWithEmailAndPassword(auth, email, password)
			.then((userCredenctial) => {
				const user = userCredenctial.user;
				console.log(user);
			})
			.catch((error) => {
				setError(error.message);
			});

		console.error(error);
	};

	return (
		<form onSubmit={handleSubmit} className="login-form">
			<Input name="Email" setter={setEmail} value={email} />
			<Input
				name="Password"
				setter={setPassword}
				value={password}
				type="password"
			/>
			<Button name="Submit" type="submit" />
		</form>
	);
};
