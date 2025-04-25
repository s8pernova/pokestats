import { Outlet } from "react-router-dom";
import { useState } from "react";
import { useAppContext } from "../context/AppContext.jsx";
import Sidebar from "./Sidebar";
import Header from "./Header";
import "../styles/Layout.css";

const Layout = () => {
	const [sidebarOpen, setSidebarOpen] = useState(false);
	const { setSearchTerm } = useAppContext();

	return (
		<div>
			<Header setSearchTerm={setSearchTerm} />
			<div className={`layout ${sidebarOpen ? "sidebar-open" : ""}`}>
				<button
					className="hamburger"
					onClick={() => setSidebarOpen(!sidebarOpen)}
				>
					☰
				</button>
				<Sidebar closeSidebar={() => setSidebarOpen(false)} />
				<main
					className="main-content"
					onClick={() => sidebarOpen && setSidebarOpen(false)}
				>
					<Outlet />
				</main>
			</div>
		</div>
	);
};

export default Layout;
