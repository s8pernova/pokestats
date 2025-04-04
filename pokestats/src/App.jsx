import "./App.css";
import { useState } from "react";
import { useFetchAPI } from "./hooks/useFetchAPI.jsx";
import Sidebar from "./components/Sidebar.jsx";
import Stats from "./components/Stats.jsx";
import Header from "./components/Header.jsx";
import Main from "./components/Main.jsx";

const App = () => {
	const [pokemonToFetch, setPokemonToFetch] = useState(10);
	const [filter, setFilter] = useState(null);
	const [searchTerm, setSearchTerm] = useState("");

	let apiUrl = `https://pokeapi.co/api/v2/pokemon?limit=${pokemonToFetch}`;
	if (filter === "mega") {
		apiUrl = `https://pokeapi.co/api/v2/pokemon?limit=${pokemonToFetch}&offset=0`; // Replace with actual Mega filter API later
	} else if (filter === "legendary") {
		apiUrl = `https://pokeapi.co/api/v2/pokemon-species?limit=${pokemonToFetch}`; // Replace with actual Legendary filter API later
	} else if (filter === "gen1") {
		apiUrl = `https://pokeapi.co/api/v2/pokemon?limit=${pokemonToFetch}&offset=0`; // This is basically temporary
	}

	const { data, loading, error, totalCount } = useFetchAPI(apiUrl);

	return (
		<>
			<Main
				maxPokemonCount={totalCount}
				setPokemonToFetch={setPokemonToFetch}
				setFilter={setFilter}
			/>
			<Header setSearchTerm={setSearchTerm} />
			<Sidebar />
			<Stats
				data={data}
				loading={loading}
				error={error}
				searchTerm={searchTerm}
				filter={filter}
			/>
		</>
	);
};

export default App;
