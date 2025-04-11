import { useState, useEffect } from "react";

const useFetchAPI = (url) => {
	const [data, setData] = useState([]);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState(null);
	const [totalCount, setTotalCount] = useState(0);

	useEffect(() => {
		const fetchData = async () => {
			try {
				setLoading(true);
				const res = await fetch(url);
				if (!res.ok) throw new Error("Network response was not ok");
				const json = await res.json();

				setTotalCount(json.count || 0);

				const fullDetails = await Promise.all(
					json.results.map(async (pokemon) => {
						const pokeRes = await fetch(pokemon.url);
						return await pokeRes.json();
					})
				);

				setData(fullDetails || []);
			} catch (err) {
				setError(err);
			} finally {
				setLoading(false);
			}
		};

		fetchData();
	}, [url]);

	return { data, loading, error, totalCount };
};

export { useFetchAPI };
