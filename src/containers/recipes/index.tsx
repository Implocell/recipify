import { useEffect, useState } from "react";
import {
	collection,
	getDocs,
	QueryDocumentSnapshot,
	DocumentData,
} from "firebase/firestore";
import { db } from "../../firebase";
import "./styles.css"

type Recipe = {
	name: string;
	link: string;
	owner: string;
	rating: number;
};

export const Recipes = () => {
	const [recipes, setRecipes] =
		useState<QueryDocumentSnapshot<DocumentData>[]>();

	useEffect(() => {
		const getRecipes = async () => {
			const result: QueryDocumentSnapshot<DocumentData>[] = [];
			const query = await getDocs(collection(db, "recipes"));
			query.forEach((doc) => {
				result.push(doc);
			});

			setRecipes(result);
		};

		getRecipes();
	}, []);

	if (!recipes) return null;

	return (
		<div className="recipes">
			{recipes.map((recipe) => {
				const data = recipe.data() as Recipe;
				return (
					<div key={data.link} className="recipe">
						<span className="recipe-link">
							Lenke: <a href={data.link}>{data.name}</a>
						</span>
						<span className="recipe-rating">
							Rating: {data.rating}
						</span>
						<span className="recipe-owner">
							Lagt til av: {data.owner}
						</span>
					</div>
				);
			})}
		</div>
	);
};
