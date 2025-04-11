import { useAppContext } from "../context/AppContext";
import Main from "../components/Main.jsx";
import Stats from "../components/Stats.jsx";

const Home = () => {
	const { data, loading, error, totalCount } = useAppContext();

	return (
		<>
			<Main maxPokemonCount={totalCount} />
			<Stats data={data} loading={loading} error={error} />
		</>
	);
};

export default Home;
