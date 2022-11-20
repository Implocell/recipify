import { getAuth, onAuthStateChanged } from "firebase/auth";
import { createContext, useEffect, useState } from "react";

interface AuthContext {
	getUser: () => string | undefined;
	isAuth: () => boolean;
}

export const AuthCtx = createContext<AuthContext>({} as AuthContext);

interface Props {
	children: React.ReactNode;
}

export const AuthProvider = ({ children }: Props) => {
	const auth = getAuth();
	const [email, setEmail] = useState("");
	const [authed, setAuthed] = useState(false);

	useEffect(() => {
		onAuthStateChanged(auth, (user) => {
			if (user) {
				const email = user.email;
				if (email) {
					setEmail(email);
					setAuthed(true);
				}
			} else {
				setEmail("");
				setAuthed(false);
			}
		});
	}, []);

	const getUser = () => {
		if (email != "") {
			return email;
		}
	};

	const isAuth = () => {
		return authed;
	};

	return (
		<AuthCtx.Provider value={{ getUser, isAuth }}>
			{children}
		</AuthCtx.Provider>
	);
};
