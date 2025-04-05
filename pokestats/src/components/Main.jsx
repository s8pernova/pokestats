import { useState } from "react";

const Main = ({ maxPokemonCount, setPokemonToFetch, setFilter, setMinLength, setMaxLength }) => {
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
					<option value="a">A</option>
					<option value="b">B</option>
					<option value="c">C</option>
					<option value="d">D</option>
					<option value="e">E</option>
					<option value="f">F</option>
					<option value="g">G</option>
					<option value="h">H</option>
					<option value="i">I</option>
					<option value="j">J</option>
					<option value="k">K</option>
					<option value="l">L</option>
					<option value="m">M</option>
					<option value="n">N</option>
					<option value="o">O</option>
					<option value="p">P</option>
					<option value="q">Q</option>
					<option value="r">R</option>
					<option value="s">S</option>
					<option value="t">T</option>
					<option value="u">U</option>
					<option value="v">V</option>
					<option value="w">W</option>
					<option value="x">X</option>
					<option value="y">Y</option>
					<option value="z">Z</option>
				</select>
				<div className="length-range-filters">
					<label>
						Min Name Length: {" "}
						<input
							className="input-box"
							type="number"
							min="1"
							max="20"
							onChange={(e) => setMinLength(Number(e.target.value))}
						/>
					</label>
					<label>
						Max Name Length: {" "}
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
				<h1>{pokemonCount}</h1>
				<button className="cool-btn" type="button" onClick={handleSubmit}>
					Generate Pokémon!
				</button>
			</div>
		</>
	);
};

export default Main;
