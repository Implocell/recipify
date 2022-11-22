import { signOut, getAuth } from "firebase/auth";
import { Button } from "../../components/button";

export const Logout = () => {
	const auth = getAuth();

	return <Button name="Logg ut" onClick={() => signOut(auth)} />;
};
