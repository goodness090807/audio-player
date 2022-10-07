import React from "react";

const AppSidebar = () => {
	return (
		<ul className="layout-menu">
			<li>
				<a href="/test">
					<i className="pi pi-home mr-2"></i>
					<span>首頁</span>
				</a>
			</li>
			<li>
				<a href="/test">
					<i className="pi pi-file-edit mr-2"></i>
					<span>編輯清單</span>
				</a>
			</li>
		</ul>
	);
};

export default AppSidebar;
