import "./App.css";
import { Routes, Route } from "react-router-dom";
import { useAppContext } from "./context/AppContext.jsx";
import Sidebar from "./components/Sidebar.jsx";
import Header from "./components/Header.jsx";
import Home from "./pages/Home.jsx";
import PokemonCreator from "./pages/PokemonCreator.jsx";
import PokemonDetails from "./pages/PokemonDetails.jsx";

const App = () => {
	const { pokemonToFetch, filter, setSearchTerm } = useAppContext();

	let apiUrl = `https://pokeapi.co/api/v2/pokemon?limit=${pokemonToFetch}`;
	if (filter === "mega") {
		apiUrl = `https://pokeapi.co/api/v2/pokemon?limit=${pokemonToFetch}&offset=0`; // Replace with actual Mega filter API later
	} else if (filter === "legendary") {
		apiUrl = `https://pokeapi.co/api/v2/pokemon-species?limit=${pokemonToFetch}`; // Replace with actual Legendary filter API later
	} else if (filter === "gen1") {
		apiUrl = `https://pokeapi.co/api/v2/pokemon?limit=${pokemonToFetch}&offset=0`; // This is basically temporary
	}

	return (
		<>
			<Header setSearchTerm={setSearchTerm} />
			<Sidebar />
			<Routes>
				<Route path="/" element={<Home />} />
				<Route path="/pokemon/:name" element={<PokemonDetails />} />
				<Route path="/creator" element={<PokemonCreator />} />
			</Routes>
		</>
	);
};

export default App;
