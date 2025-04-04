const Stats = ({ data, loading, error, searchTerm, filter }) => {
	const filteredResults = data?.results?.filter((pokemon) =>
        pokemon.name.toLowerCase().includes(searchTerm.toLowerCase())
        
        
	);

	return (
		<div className="stats-container">
			{loading && <p>Loading...</p>}
			{error && <p>Error: {error.message}</p>}
			{data && (
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
			)}
		</div>
	);
};

export default Stats;
