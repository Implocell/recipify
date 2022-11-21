import { useEffect, useState } from "react";
import {
	collection,
	getDocs,
	QueryDocumentSnapshot,
	DocumentData,
	onSnapshot,
} from "firebase/firestore";
import { db } from "../../firebase";
import "./styles.scss";
import { Input } from "../../components/input";

type Recipe = {
	name: string;
	link: string;
	owner: string;
	rating: number;
};

const Search = ({ recipes }: { recipes: Recipe[] }) => {
	const [search, setSearch] = useState("");

	const renderSearch = () => {
		if (search.length < 2) {
			return null;
		}
		const res = recipes.filter((val) => val.name.includes(search));

		return (
			<div className="search-results">
				{res.map((val) => (
					<a
						className="search-result"
						href={val.link}
						key={val.link}
						target="_blank"
						rel="noopener noreferrer"
					>
						{val.name}
					</a>
				))}
			</div>
		);
	};

	return (
		<div className="search">
			<Input name="Søk" setter={setSearch} value={search} />
			{renderSearch()}
		</div>
	);
};

export const Recipes = () => {
	const [recipes, setRecipes] = useState<Recipe[]>([]);

	useEffect(() => {
		const unsubscribe = onSnapshot(collection(db, "recipes"), (docsnap) => {
			docsnap.docChanges().forEach((doc) => {
				setRecipes((oldRecipes) => [
					...oldRecipes,
					doc.doc.data() as Recipe,
				]);
			});
		});
		console.log(recipes);
		return () => {
			unsubscribe();
		};
	}, []);

	if (recipes.length === 0) return null;

	return (
		<div className="recipes">
			<Search recipes={recipes} />
			{recipes.map((recipe, i) => {
				return (
					<div key={i} className="recipe">
						<span className="recipe-link">
							Lenke:
							<a
								href={recipe.link}
								target="_blank"
								rel="noopener noreferrer"
							>
								{recipe.name}
							</a>
						</span>
						<span className="recipe-rating">
							Rating: {recipe.rating}
						</span>
						<span className="recipe-owner">
							Lagt til av: {recipe.owner}
						</span>
					</div>
				);
			})}
		</div>
	);
};
