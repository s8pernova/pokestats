import { Link } from "react-router-dom";

const Sidebar = ({ closeSidebar }) => {
	return (
		<div className="sidebar-container pixel-font">
			<h1 className="sidebar-header">
				<img src="./src/assets/pokeball.png" width="100px" />
			</h1>
			<div className="sidebar-menu">
				<Link to="/creator" onClick={closeSidebar}>
					<h2>PokeMaker</h2>
				</Link>
				<Link to="/team" onClick={closeSidebar}>
					<h2>Custom Team</h2>
				</Link>
				<Link to="/forum" onClick={closeSidebar}>
					<h2>Forum</h2>
				</Link>
			</div>
		</div>
	);
};

export default Sidebar;
