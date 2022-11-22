import { SetStateAction, Dispatch } from "react";

interface Props {
	name: string;
	value: string;
	type?: "text" | "password" | "number";
	setter: Dispatch<SetStateAction<string>>;
}

export const Input = ({ name, value, setter, type = "text" }: Props) => {
	return (
		<label>
			{name}:
			<input
				type={type}
				onChange={(v) => setter(v.target.value)}
				value={value}
			/>
		</label>
	);
};
