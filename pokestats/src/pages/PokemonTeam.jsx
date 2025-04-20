import { useEffect } from "react";
import { supabase } from "../supabaseClient";
import { Link } from "react-router-dom";
import { useAppContext } from "../context/AppContext";

const PokemonTeam = () => {
	const { pokemonList, setPokemonList } = useAppContext();
	const numberOfPokemon = 6;

	useEffect(() => {
		const fetchPokemon = async () => {
			const { data, error } = await supabase
				.from("Pokemon")
				.select("*")
				.order("created_at", { ascending: false })
				.limit(numberOfPokemon);

			if (error) {
				console.error("Error fetching Pokémon:", error.message);
			} else {
				setPokemonList(data);
			}
		};

		fetchPokemon();
	}, []);

	console.log(pokemonList);

	return (
		<div className="team-container">
			{pokemonList.length === 0 ? (
				<h2>Your created Pokémon team will show up here.</h2>
			) : (
				<h2>Your custom Pokémon team</h2>
			)}
			<ul className="pokemon-grid">
				{pokemonList.map((poke) => (
					<li key={poke.id} className="pokemon-card">
						<Link to={`/pokemon/custom/${poke.id}`}>
							<img src={poke.sprite_url} alt={`${poke.name} sprite`} />
						</Link>
						<h3>{poke.name}</h3>
						<p>Type: {poke.type}</p>
						<p>Level: {poke.level}</p>
						<p>HP: {poke.hp}</p>
						<Link to={`/pokemon/custom/${poke.id}/edit`}>Edit</Link>
					</li>
				))}
			</ul>
		</div>
	);
};

export default PokemonTeam;
