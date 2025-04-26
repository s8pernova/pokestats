import { createContext, useContext, useState, useEffect } from "react";
import { useFetchAPI } from "../hooks/useFetchAPI";

const AppContext = createContext();

export const AppProvider = ({ children }) => {
	const initialFormState = {
		name: "",
		type: "",
		level: 1,
		hp: "",
		description: "",
	};
	const [pokemonToFetch, setPokemonToFetch] = useState(10);
	const [filter, setFilter] = useState(null);
	const [searchTerm, setSearchTerm] = useState("");
	const [minLength, setMinLength] = useState(null);
	const [maxLength, setMaxLength] = useState(null);
	const [showStats, setShowStats] = useState(false);
	const [showGraphs, setShowGraphs] = useState(false);
	const [formData, setFormData] = useState(initialFormState);
	const [showNotification, setShowNotification] = useState(false);
	const [pokemonList, setPokemonList] = useState([]);
	const [spriteIndex, setSpriteIndex] = useState(0);
	const [posts, setPosts] = useState([]);
	const [loadingPosts, setLoadingPosts] = useState(true);

	let apiUrl = `https://pokeapi.co/api/v2/pokemon?limit=${pokemonToFetch}`;

	if (filter === "mega") {
		apiUrl = `https://pokeapi.co/api/v2/pokemon?limit=${pokemonToFetch}&offset=0`;
	} else if (filter === "legendary") {
		apiUrl = `https://pokeapi.co/api/v2/pokemon-species?limit=${pokemonToFetch}`;
	} else if (filter === "gen1") {
		apiUrl = `https://pokeapi.co/api/v2/pokemon?limit=${pokemonToFetch}&offset=0`;
	}

	useEffect(() => {
		const fetchPosts = async () => {
			const { data, error } = await supabase
				.from("posts")
				.select("*")
				.order("created_at", { ascending: false });

			if (error) console.error(error);
			else setPosts(data);
			setLoadingPosts(false);
		};

		fetchPosts();
	}, []);

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
				showGraphs,
				setShowGraphs,
				formData,
				setFormData,
				showNotification,
				setShowNotification,
				pokemonList,
				setPokemonList,
				spriteIndex,
				setSpriteIndex,
				posts,
				setPosts,
				loadingPosts,
				setLoadingPosts,
				data,
				loading,
				error,
				totalCount,
				initialFormState,
			}}
		>
			{children}
		</AppContext.Provider>
	);
};

export const useAppContext = () => useContext(AppContext);
