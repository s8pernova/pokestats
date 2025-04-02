import "./App.css";
import useFetchAPI from "./hooks/useFetchAPI.jsx";
import Sidebar from "./components/Sidebar.jsx";
import Stats from "./components/Stats.jsx";
import Header from "./components/Header.jsx";

const pokemonToFetch = 10;

function App() {
	const { data, loading, error } = useFetchAPI(
		`https://pokeapi.co/api/v2/pokemon?limit=${pokemonToFetch}`
	);

	return (
		<div className="border">
			<Header />
			<Sidebar />
			<Stats data={data} loading={loading} error={error} />
		</div>
	);
}

export default App;
