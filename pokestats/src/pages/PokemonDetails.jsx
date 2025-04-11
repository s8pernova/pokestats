import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import useCaptilize from "../utils/capitalize.jsx";

const PokemonDetail = () => {
	const { name } = useParams();
	const [pokemon, setPokemon] = useState(null);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState(null);

	useEffect(() => {
		const fetchData = async () => {
			try {
				const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${name}`);
				if (!res.ok) throw new Error("Failed to fetch Pokémon data");
				const data = await res.json();
				setPokemon(data);
			} catch (err) {
				setError(err.message);
			} finally {
				setLoading(false);
			}
		};

		fetchData();
	}, [name]);

	if (loading) return <p>Loading Pokémon...</p>;
	if (error) return <p>Error: {error}</p>;

	return (
		<div className="page-container">
			<h2>Hello, I'm</h2>
			<div className="pokemon-detail pixel-font">
				<h1>{useCaptilize(pokemon.name)}</h1>
				<img
					src={pokemon.sprites.front_default}
					alt={pokemon.name}
					width={100}
				/>
				<ul>
					<li>ID: {pokemon.id}</li>
					<li>Type: {pokemon.types.map((t) => t.type.name).join(", ")}</li>
					<li>Height: {pokemon.height}</li>
					<li>Weight: {pokemon.weight}</li>
					<li>
						Abilities: {pokemon.abilities.map((a) => a.ability.name).join(", ")}
					</li>
				</ul>
			</div>
		</div>
	);
};

export default PokemonDetail;
