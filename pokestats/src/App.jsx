import "./App.css";
import { useFetchAPI } from "./hooks/useFetchAPI.jsx";
import Sidebar from "./components/Sidebar.jsx";
import Stats from "./components/Stats.jsx";
import Header from "./components/Header.jsx";
import Main from "./components/Main.jsx";

const pokemonToFetch = 5;

const App = () => {
	const { data, loading, error, totalCount } = useFetchAPI(
		`https://pokeapi.co/api/v2/pokemon?limit=${pokemonToFetch}`
	);

	return (
		<>
			<Main maxPokemonCount={totalCount} />
			<Header />
			<Sidebar />
			<Stats data={data} loading={loading} error={error} />
		</>
	);
};

export default App;
