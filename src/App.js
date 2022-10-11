import React, { useEffect, useState } from "react";
import "primeicons/primeicons.css";
import "primereact/resources/themes/lara-dark-indigo/theme.css";
import "primereact/resources/primereact.min.css";
import "primeflex/primeflex.css";
import "./assets/layouts/layout.scss";
import AppTopbar from "./layouts/AppTopbar";
import AppSidebar from "./layouts/AppSidebar";
import AudioPlayer from "./components/AudioPlayers/AudioPlayer";
import AudioBackground from "./components/AudioBackground";
import Router from "./components/Routers/Router";

const audios = [
	"TODO：填入網址(之後要用API取得)",
	"TODO：填入網址(之後要用API取得)",
];

const App = () => {
	const [mobileSidebarActive, setMobileSidebarActive] = useState(false);
	const [selectedVideo, setSelectedVideo] = useState(audios[0]);
	// TODO：查詢API資料 const [audios, setAudios] = useState(null);

	useEffect(() => {
		setSelectedVideo(audios[0]);
	}, []);

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
					<Router path="/">
						<AudioBackground />
					</Router>
				</div>
				<div className="flex align-items-center justify-content-center h-8rem layout-footer audio-player">
					<AudioPlayer selectedVideo={selectedVideo} />
				</div>
			</div>
		</div>
	);
};

export default App;
