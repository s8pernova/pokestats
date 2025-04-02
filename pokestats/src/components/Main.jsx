import { useState } from "react";

const Main = ({maxPokemonCount}) => {
    const [pokemonCount, setPokemonCount] = useState(0);

    const increment = () => {
        setPokemonCount(pokemonCount + 1);
    };

    const handleSliderChange = (e) => {
    setPokemonCount(parseInt(e.target.value));
};
    
    return (
        <div>
            <div className="filter-container">
                <button>Only Mega</button>
                <button>Only Legendary</button>
                <button>Only Gen 1</button>
            </div>
            <div className="main-container">
                <input type="range" min="1" max={maxPokemonCount} value={pokemonCount} onChange={handleSliderChange}></input>
                <button type="submit" onSubmit={increment}>Generate Pokémon!</button>
                <h1>{pokemonCount}</h1>
            </div>
        </div>
    );
};

export default Main;