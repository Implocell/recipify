interface Props {
	name: string;
	onClick?: (e: React.SyntheticEvent) => void;
	type?: "button" | "submit";
}

export const Button = ({ name, onClick, type = "button" }: Props) => {
	return (
		<button onClick={onClick} type={type}>
			{name}
		</button>
	);
};
