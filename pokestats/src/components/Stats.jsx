const Stats = ({ data, loading, error }) => {
	return (
		<div className="stats-container">
			{loading && <p>Loading...</p>}
			{error && <p>Error: {error.message}</p>}
			{data && (
				<ul className="pokemon-list">
					{data.results.map((pokemon, index) => (
						<li key={index}>
							{index + 1}. {pokemon.name}
						</li>
					))}
				</ul>
			)}
		</div>
	);
};

export default Stats;
