const Stats = ({ data, loading, error }) => {
	return (
		<div className="stats-container">
			{loading && <p>Loading...</p>}
			{error && <p>Error: {error.message}</p>}
			{data && (
				<ul className="pokemon-list">
					{data.results.map((pokemon, index) => (
						<div className="flexbox">
							<img
								src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${
									index + 1
								}.png`}
								alt={pokemon.name}
							/>
							<li key={index}>
								{index + 1}. {pokemon.name}
							</li>
						</div>
					))}
				</ul>
			)}
		</div>
	);
};

export default Stats;
