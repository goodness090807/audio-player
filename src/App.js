import React, { useState } from "react";
import "primeicons/primeicons.css";
import "primereact/resources/themes/lara-dark-indigo/theme.css";
import "primereact/resources/primereact.min.css";
import "primeflex/primeflex.css";
import "./assets/layouts/layout.scss";
import AppTopbar from "./layouts/AppTopbar";
import AppSidebar from "./layouts/AppSidebar";
import AudioPlayer from "./components/AudioPlayer";

const App = () => {
	const [mobileSidebarActive, setMobileSidebarActive] = useState(false);

	return (
		<div
			className={`${mobileSidebarActive ? "layout-sidebar-active" : ""}`}
		>
			<AppTopbar
				mobileSidebarActive={mobileSidebarActive}
				setMobileSidebarActive={setMobileSidebarActive}
			/>

			<div className="layout-sidebar">
				<AppSidebar />
			</div>
			<div className="layout-main">
				<div className="layout-content">
					<div
						className="audio-img"
						style={{
							height: "150px",
							width: "350px",
							objectFit: "cover",
							backgroundImage: "url('/images/hq720.webp')",
						}}
					></div>
				</div>
				<div className="flex align-items-center justify-content-center h-5rem layout-footer">
					<AudioPlayer />
				</div>
			</div>
		</div>
	);
};

export default App;
