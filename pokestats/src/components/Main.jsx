import { useState } from "react";

const Main = ({ maxPokemonCount, setPokemonToFetch, setFilter }) => {
	const [pokemonCount, setPokemonCount] = useState(10);

	const handleSliderChange = (e) => {
		setPokemonCount(parseInt(e.target.value));
	};

	const handleSubmit = (e) => {
		e.preventDefault();
		setPokemonToFetch(pokemonCount);
	};

	return (
		<div>
			<div className="filter-container">
				<button onClick={() => setFilter("mega")} className="cool-btn">
					Only Mega
				</button>
				<button onClick={() => setFilter("legendary")} className="cool-btn">
					Only Legendary
				</button>
				<button onClick={() => setFilter("gen1")} className="cool-btn">
					Only Gen 1
				</button>
			</div>
			<div className="main-container">
				<input
					className="slider"
					type="range"
					min="1"
					max={maxPokemonCount}
					value={pokemonCount}
					onChange={handleSliderChange}
				/>
				<h1>{pokemonCount}</h1>
				<button className="cool-btn" type="button" onClick={handleSubmit}>
					Generate Pokémon!
				</button>
			</div>
		</div>
	);
};

export default Main;
