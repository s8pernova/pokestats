import { useAppContext } from "../context/AppContext";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import PokemonCharts from "./PokemonCharts";

const Stats = () => {
	const [dotCount, setDotCount] = useState(0);
	const {
		data,
		loading,
		error,
		searchTerm,
		filter,
		minLength,
		maxLength,
		showStats,
		setShowStats,
		showGraphs,
		setShowGraphs,
	} = useAppContext();

	useEffect(() => {
		if (!loading) return;

		const interval = setInterval(() => {
			setDotCount((prev) => (prev + 1) % 4);
		}, 500);

		return () => clearInterval(interval);
	}, [loading]);

	const filteredResults = data
		?.filter((pokemon) =>
			pokemon.name.toLowerCase().includes(searchTerm.toLowerCase())
		)
		?.filter((pokemon) =>
			filter ? pokemon.name.startsWith(filter.toLowerCase()) : true
		)
		?.filter((pokemon) => {
			const len = pokemon.name.length;
			if (minLength !== null && len < minLength) return false;
			if (maxLength !== null && len > maxLength) return false;
			return true;
		});

	const totalShown = filteredResults?.length || 0;
	const nameLengths = filteredResults?.map((p) => p.name.length) || [];

	const average =
		nameLengths.length > 0
			? (
					nameLengths.reduce((sum, len) => sum + len, 0) / nameLengths.length
			  ).toFixed(2)
			: 0;

	const sortedLengths = [...nameLengths].sort((a, b) => a - b);

	const median = () => {
		const mid = Math.floor(sortedLengths.length / 2);
		if (sortedLengths.length % 2 === 0) {
			return ((sortedLengths[mid - 1] + sortedLengths[mid]) / 2).toFixed(2);
		}
		return sortedLengths[mid];
	};

	const mode = () => {
		const freq = {};
		let maxFreq = 0;
		let modes = [];

		sortedLengths.forEach((len) => {
			freq[len] = (freq[len] || 0) + 1;
			if (freq[len] > maxFreq) {
				maxFreq = freq[len];
				modes = [len];
			} else if (freq[len] === maxFreq && !modes.includes(len)) {
				modes.push(len);
			}
		});
		return modes.join(", ");
	};

	const getQuartile = (q) => {
		if (sortedLengths.length < 4) return "N/A";
		const pos = (sortedLengths.length - 1) * q;
		const base = Math.floor(pos);
		const rest = pos - base;

		if (sortedLengths[base + 1] !== undefined) {
			return (
				sortedLengths[base] +
				rest * (sortedLengths[base + 1] - sortedLengths[base])
			).toFixed(2);
		} else {
			return sortedLengths[base];
		}
	};

	const q1 = getQuartile(0.25);
	const q2 = median();
	const q3 = getQuartile(0.75);

	return (
		<div className="stats-container">
			{loading && <p>Catching pokémon{".".repeat(dotCount)}</p>}
			{error && <p>Error: {error.message}</p>}
			{data && (
				<>
					{/* Summary Statistics */}
					<div className="summary-stats pixel-font">
						<div
							className={`summary-toggle ${showStats ? "open" : ""}`}
							onClick={() => setShowStats((prev) => !prev)}
						>
							<img
								src="./src/assets/triangle.png"
								width="15"
								height="15"
								className="triangle"
							/>
							<h3>Summary Statistics</h3>
						</div>

						{showStats && (
							<ul>
								<li>Total Pokémon displayed: {totalShown}</li>
								<li>Mean name length: {average}</li>
								<li>Median name length: {q2}</li>
								<li>Mode name length: {mode()}</li>
								<li>Q1 (25%): {q1}</li>
								<li>Q2 (50%): {q2}</li>
								<li>Q3 (75%): {q3}</li>
							</ul>
						)}
					</div>

					{/* Graphs */}
					<div className="graph-stats pixel-font">
						<div
							className={`graph-toggle ${showGraphs ? "open" : ""}`}
							onClick={() => setShowGraphs((prev) => !prev)}
						>
							<img
								src="./src/assets/triangle.png"
								width="15"
								height="15"
								className="triangle"
							/>
							<h3>Graphs</h3>

							{showGraphs && <PokemonCharts />}
						</div>
					</div>

					{/* Pokemon List */}
					<ul className="pokemon-list pixel-font">
						{filteredResults.map((pokemon) => (
							<Link key={pokemon.name} to={`/pokemon/${pokemon.name}`}>
								<div className="flexbox">
									<img src={pokemon.sprites.front_default} alt={pokemon.name} />
									<div>
										{pokemon.id}. {pokemon.name}
									</div>
								</div>
							</Link>
						))}
					</ul>
				</>
			)}
		</div>
	);
};

export default Stats;
