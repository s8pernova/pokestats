import { useState } from "react";

const Header = ({ setSearchTerm }) => {
	const [localSearchTerm, setLocalSearchTerm] = useState("");

	const handleSearch = (e) => {
		const value = e.target.value;
		setLocalSearchTerm(value);
		setSearchTerm(value);
	};

	return (
		<header className="header-container">
			<div className="header-content">
				<div className="logo">
					<img id="pokeball" src="./src/assets/pokeball.png" alt="Pokeball" />
				</div>
				<h2 className="title">PokéStats!</h2>
				<div className="search-container">
					<input
						type="text"
						placeholder="Search..."
						className="search-bar"
						value={localSearchTerm}
						onChange={handleSearch}
					/>
				</div>
			</div>
		</header>
	);
};

export default Header;
