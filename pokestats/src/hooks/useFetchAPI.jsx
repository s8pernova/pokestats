import { useState, useEffect } from "react";

const useFetchAPI = (url) => {
	const [data, setData] = useState(null);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState(null);
	const [totalCount, setTotalCount] = useState(0);

	useEffect(() => {
		const fetchData = async () => {
			try {
				const response = await fetch(url);
				if (!response.ok) {
					throw new Error("Network response was not ok :(");
				}
				const result = await response.json();
				setData(result);
				setTotalCount(result.count);
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
