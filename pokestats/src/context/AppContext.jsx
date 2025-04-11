import { createContext, useContext, useState } from "react";
import { useFetchAPI } from "../hooks/useFetchAPI";

const AppContext = createContext();

export const AppProvider = ({ children }) => {
	const [pokemonToFetch, setPokemonToFetch] = useState(10);
	const [filter, setFilter] = useState(null);
	const [searchTerm, setSearchTerm] = useState("");
	const [minLength, setMinLength] = useState(null);
	const [maxLength, setMaxLength] = useState(null);
	const [showStats, setShowStats] = useState(true);
	const [pokemon, setPokemon] = useState(null);

	let apiUrl = `https://pokeapi.co/api/v2/pokemon?limit=${pokemonToFetch}`;
	if (filter === "mega") {
		apiUrl = `https://pokeapi.co/api/v2/pokemon?limit=${pokemonToFetch}&offset=0`;
	} else if (filter === "legendary") {
		apiUrl = `https://pokeapi.co/api/v2/pokemon-species?limit=${pokemonToFetch}`;
	} else if (filter === "gen1") {
		apiUrl = `https://pokeapi.co/api/v2/pokemon?limit=${pokemonToFetch}&offset=0`;
	}

	const { data, loading, error, totalCount } = useFetchAPI(apiUrl);

	return (
		<AppContext.Provider
			value={{
				pokemonToFetch,
				setPokemonToFetch,
				filter,
				setFilter,
				searchTerm,
				setSearchTerm,
				minLength,
				setMinLength,
				maxLength,
                setMaxLength,
                showStats,
                setShowStats,
				data,
				loading,
				error,
				totalCount,
			}}
		>
			{children}
		</AppContext.Provider>
	);
};

export const useAppContext = () => useContext(AppContext);
