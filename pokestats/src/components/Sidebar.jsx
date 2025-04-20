import { Link } from "react-router-dom";

const Sidebar = () => {
	return (
		<div className="sidebar-container pixel-font">
			<h1 className="sidebar-header">SideBar</h1>
			<div className="sidebar-menu">
				<Link to="/creator">
					<h2>PokeMaker</h2>
				</Link>
				<Link to="/team">
					<h2>Custom Team</h2>
				</Link>
				<Link>
					<h2
						onClick={() => {
							alert("Under construction!");
						}}
					>
						Forum
					</h2>
				</Link>
			</div>
		</div>
	);
};

export default Sidebar;
