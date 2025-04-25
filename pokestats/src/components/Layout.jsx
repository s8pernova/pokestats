import React from "react";
import Header from "./Header";
import Sidebar from "./Sidebar";
import { Outlet } from "react-router-dom";
import { useAppContext } from "../context/AppContext.jsx";

const Layout = () => {
	const { setSearchTerm } = useAppContext();

	return (
		<>
			<Header setSearchTerm={setSearchTerm} />
			<Sidebar />
			<main>
				<Outlet />
			</main>
		</>
	);
};

export default Layout;
