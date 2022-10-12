import React from "react";
import Router from "../components/Routers/Router";
import AudioBackground from "../components/AudioBackground";
import AudioEdit from "../components/AudioEdit";

const AppContent = () => {
	return (
		<React.Fragment>
			<Router path="/">
				<AudioBackground />
			</Router>
			<Router path="/edit">
				<AudioEdit />
			</Router>
		</React.Fragment>
	);
};

export default AppContent;
