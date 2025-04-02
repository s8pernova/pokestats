import "./App.css";
import { useFetchAPI } from "./hooks/useFetchAPI.jsx";
import Sidebar from "./components/Sidebar.jsx";
import Stats from "./components/Stats.jsx";
import Header from "./components/Header.jsx";
import Main from "./components/Main.jsx";

const pokemonToFetch = 10;
const { data, loading, error } = useFetchAPI(
	`https://pokeapi.co/api/v2/pokemon?limit=${pokemonToFetch}`
);

const App = () => {
	return (
		<>
			<Main />
			<Header />
			<Sidebar />
			<Stats data={data} loading={loading} error={error} />
		</>
	);
};

export default App;
