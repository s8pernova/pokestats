import { useState } from "react";
import { Link } from "react-router-dom";

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
					<img id="pokeball" src="./src/assets/pokeball.png" />
				</div>
				<Link className="title" to="/">
					<h2>PokéStats!</h2>
				</Link>
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
