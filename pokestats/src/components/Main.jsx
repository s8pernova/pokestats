import { useState } from "react";
import { useAppContext } from "../context/AppContext";

const Main = ({ maxPokemonCount }) => {
	const { setPokemonToFetch, setFilter, setMinLength, setMaxLength } =
		useAppContext();

	const [pokemonCount, setPokemonCount] = useState(10);

	const handleSliderChange = (e) => {
		setPokemonCount(parseInt(e.target.value));
	};

	const handleSubmit = (e) => {
		e.preventDefault();
		setPokemonToFetch(pokemonCount);
	};

	return (
		<>
			<div className="filter-container">
				<select
					className="input-box"
					onChange={(e) => setFilter(e.target.value)}
				>
					<option value="">All</option>
					{Array.from("abcdefghijklmnopqrstuvwxyz").map((letter) => (
						<option key={letter} value={letter}>
							{letter.toUpperCase()}
						</option>
					))}
				</select>
				<div className="length-range-filters">
					<label>
						Min Name Length:{" "}
						<input
							className="input-box"
							type="number"
							min="1"
							max="20"
							onChange={(e) => setMinLength(Number(e.target.value))}
						/>
					</label>
					<label>
						Max Name Length:{" "}
						<input
							className="input-box"
							type="number"
							min="1"
							max="20"
							onChange={(e) => setMaxLength(Number(e.target.value))}
						/>
					</label>
				</div>
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
				<div className="flexbox">
					<img src="./src/assets/left-lines.png" width="100" />
					<h1>{pokemonCount}</h1>
					<img src="./src/assets/right-lines.png" width="100" />
				</div>
				<button className="cool-btn" type="button" onClick={handleSubmit}>
					Generate Pokémon!
				</button>
			</div>
		</>
	);
};

export default Main;
