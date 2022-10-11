import React from "react";
import RouteLink from "../components/Routers/RouterLink";

const AppSidebar = () => {
	return (
		<ul className="layout-menu">
			<li>
				<RouteLink href="/">
					<i className="pi pi-home mr-2"></i>
					<span>首頁</span>
				</RouteLink>
			</li>
			<li>
				<RouteLink href="/edit">
					<i className="pi pi-file-edit mr-2"></i>
					<span>編輯清單</span>
				</RouteLink>
			</li>
		</ul>
	);
};

export default AppSidebar;
