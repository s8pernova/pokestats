const Stats = ({ data, loading, error, searchTerm, filter, filterLength, minLength, maxLength }) => {
	const filteredResults = data?.results
		?.filter((pokemon) =>
			pokemon.name.toLowerCase().includes(searchTerm.toLowerCase())
		)
		?.filter((pokemon) =>
			filter ? pokemon.name.startsWith(filter.toLowerCase()) : true
		)
		?.filter((pokemon) => {
			const len = pokemon.name.length;
			if (filterLength === "short") return len <= 5;
			if (filterLength === "medium") return len > 5 && len <= 8;
			if (filterLength === "long") return len > 8;
			return true;
		})
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
			? (nameLengths.reduce((sum, len) => sum + len, 0) / nameLengths.length).toFixed(2)
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
			{loading && <p>Loading...</p>}
			{error && <p>Error: {error.message}</p>}
			{data && (
				<>
					<div className="summary-stats pixel-font">
						<h3>Summary Statistics</h3>
						<ul>
							<li>Total Pokémon displayed: {totalShown}</li>
							<li>Mean name length: {average}</li>
							<li>Median name length: {q2}</li>
							<li>Mode name length: {mode()}</li>
							<li>Q1 (25%): {q1}</li>
							<li>Q2 (50%): {q2}</li>
							<li>Q3 (75%): {q3}</li>
						</ul>
					</div>

					<ul className="pokemon-list">
						{filteredResults.map((pokemon, index) => (
							<div className="flexbox" key={index}>
								<img
									src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${
										index + 1
									}.png`}
									alt={pokemon.name}
								/>
								<div>
									{index + 1}. {pokemon.name}
								</div>
							</div>
						))}
					</ul>
				</>
			)}
		</div>
	);
};

export default Stats;
