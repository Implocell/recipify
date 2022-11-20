interface Props {
	name: string;
	onClick: (e: React.SyntheticEvent) => void;
}

export const Button = ({ name, onClick }: Props) => {
	return <button onClick={onClick}>{name}</button>;
};
