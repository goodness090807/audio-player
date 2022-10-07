import React, { useRef } from "react";
import { Menu } from "primereact/menu";

const UserMenu = ({}) => {
	const menu = useRef(null);

	const items = [{ label: "登入", icon: "pi pi-sign-in" }];

	return <Menu model={items} popup ref={menu} id="popup_menu" />;
};

export default UserMenu;
