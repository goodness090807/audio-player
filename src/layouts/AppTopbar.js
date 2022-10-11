import React, { useRef } from "react";
import { Button } from "primereact/button";
import { Menu } from "primereact/menu";
import RouteLink from "../components/Routers/RouterLink";

const AppTopbar = ({ mobileSidebarActive, setMobileSidebarActive }) => {
	const menu = useRef(null);

	const items = [{ label: "登入", icon: "pi pi-sign-in" }];

	return (
		<div className="fixed w-full flex align-items-center justify-content-between flex-wrap px-5 text-xl h-5rem layout-topbar">
			<Button
				icon="pi pi-bars"
				className="p-button-rounded p-button-secondary p-button-text nav-btn"
				onClick={() => setMobileSidebarActive(!mobileSidebarActive)}
			/>

			<RouteLink className="flex align-items-center" href="/">
				<img
					src="images/logo.svg"
					height="50px"
					alt="logo"
					title="Audio Player"
					className="mr-1"
				/>
				<span>Audio Player</span>
			</RouteLink>

			<Button
				icon="pi pi-user"
				className="p-button-rounded p-button-outlined"
				aria-label="User"
				onClick={(event) => menu.current.toggle(event)}
				aria-controls="popup_menu"
				aria-haspopup
			/>

			<Menu model={items} popup ref={menu} id="popup_menu" />
		</div>
	);
};

export default AppTopbar;
