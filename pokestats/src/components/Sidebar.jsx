import { Link } from "react-router-dom";

const Sidebar = () => {
	return (
		<div className="sidebar-container pixel-font">
			<h1 className="sidebar-header">SideBar</h1>
			<div className="sidebar-menu">
				<Link to="/creator">
					<h2>PokéMaker</h2>
				</Link>
				<h2>hello</h2>
				<h2>world</h2>
			</div>
		</div>
	);
};

export default Sidebar;
