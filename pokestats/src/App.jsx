import "./styles/App.css";
import { Routes, Route } from "react-router-dom";
import { useAppContext } from "./context/AppContext.jsx";
import Layout from "./components/Layout.jsx";
import Home from "./pages/Home.jsx";
import PokemonCreator from "./pages/PokemonCreator.jsx";
import PokemonDetails from "./pages/PokemonDetails.jsx";
import PokemonTeam from "./pages/PokemonTeam.jsx";
import ErrorPage from "./pages/Error.jsx";
import EditPokemon from "./pages/EditPokemon.jsx";
import CustomPokemonDetail from "./pages/CustomPokemonDetails.jsx";
import Forum from "./pages/Forum.jsx";
import PostDetails from "./pages/PostDetails.jsx";

const App = () => {
	const { pokemonToFetch, filter } = useAppContext();

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
			<Routes>
				<Route element={<Layout />}>
					<Route path="*" element={<ErrorPage />} />
					<Route path="/" element={<Home />} />
					<Route path="/pokemon/:name" element={<PokemonDetails />} />
					<Route path="/creator" element={<PokemonCreator />} />
					<Route path="/team" element={<PokemonTeam />} />
					<Route path="/pokemon/custom/:id" element={<CustomPokemonDetail />} />
					<Route path="/pokemon/custom/:id/edit" element={<EditPokemon />} />
					<Route path="/forum" element={<Forum />} />
					<Route path="/forum/post/:postId" element={<PostDetails />} />
				</Route>
			</Routes>
		</>
	);
};

export default App;
