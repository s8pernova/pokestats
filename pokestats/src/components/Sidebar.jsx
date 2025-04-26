import { Link } from "react-router-dom";

const Sidebar = () => {
	return (
		<div className="sidebar-container pixel-font">
			<h1 className="sidebar-header">
				{" "}
				<img src="./src/assets/pokeball.png" width="100px" />
			</h1>
			<div className="sidebar-menu">
				<Link to="/creator">
					<h2>PokeMaker</h2>
				</Link>
				<Link to="/team">
					<h2>Custom Team</h2>
				</Link>
				<Link to="/forum">
					<h2>Forum</h2>
				</Link>
			</div>
		</div>
	);
};

export default Sidebar;
