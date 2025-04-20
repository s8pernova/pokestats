import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { supabase } from "../supabaseClient";
import useCaptilize from "../utils/capitalize.jsx";

const CustomPokemonDetail = () => {
	const { id } = useParams();
	const [pokemon, setPokemon] = useState(null);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState(null);

	useEffect(() => {
		const fetchPokemon = async () => {
			const { data, error } = await supabase
				.from("Pokemon")
				.select("*")
				.eq("id", parseInt(id))
				.single();

			if (error) {
				setError("Could not load custom Pokémon.");
				console.error(error.message);
			} else {
				setPokemon(data);
			}

			setLoading(false);
		};

		fetchPokemon();
	}, [id]);

	if (loading) return <p>Loading Pokémon...</p>;
	if (error) return <p>Error: {error}</p>;

	return (
		<div className="page-container">
			<h2>Hello, I'm</h2>
			<div className="pokemon-detail pixel-font">
				<h1>{useCaptilize(pokemon.name)}</h1>
				<img
					src={pokemon.sprite_url}
					alt={pokemon.name}
					className="pixel-img"
				/>
				<ul>
					<li>ID: {pokemon.id}</li>
					<li>Type: {pokemon.type}</li>
					<li>Level: {pokemon.level}</li>
					<li>HP: {pokemon.hp}</li>
					<li>Description: {pokemon.description || "N/A"}</li>
					<Link to={`/pokemon/custom/${pokemon.id}/edit`}>Edit</Link>
				</ul>
			</div>
		</div>
	);
};

export default CustomPokemonDetail;
