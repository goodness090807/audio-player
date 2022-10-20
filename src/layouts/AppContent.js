import React from "react";
import Router from "../components/Routers/Router";
import AudioBackground from "../components/AudioBackground";
import AudioList from "../components/AudioList";
import { ProgressSpinner } from "primereact/progressspinner";

const AppContent = ({
	children,
	audios,
	selectedAudio,
	playing,
	playerToggle,
}) => {
	if (!selectedAudio) {
		return (
			<div className="flex flex-column justify-content-center align-items-center h-full">
				<ProgressSpinner />
				<div>等待伺服器回應中!!!(約30秒~1分鐘)</div>
			</div>
		);
	}

	return (
		<React.Fragment>
			{children}
			<Router path="/">
				<AudioBackground imageUrl={selectedAudio.imageUrl} />
			</Router>
			<Router path="/list">
				<AudioList
					audios={audios}
					selectedAudio={selectedAudio}
					playing={playing}
					playerToggle={playerToggle}
				/>
			</Router>
		</React.Fragment>
	);
};

export default AppContent;
