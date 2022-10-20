import React from "react";
import RouteLink from "../components/Routers/RouterLink";

const AppSidebar = ({ setMobileSidebarActive }) => {
	return (
		<ul
			className="layout-menu"
			onClick={() => setMobileSidebarActive(false)}
		>
			<li>
				<RouteLink href="/">
					<i className="pi pi-home mr-2"></i>
					<span>首頁</span>
				</RouteLink>
			</li>
			<li>
				<RouteLink href="/list">
					<i className="pi pi-list mr-2"></i>
					<span>音樂清單</span>
				</RouteLink>
			</li>
		</ul>
	);
};

export default AppSidebar;
