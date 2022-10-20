import React from "react";

const AudioBackground = ({ imageUrl }) => {
	return (
		<div className="audio-background">
			<img title="imageName" alt="imageName" src={imageUrl} />
		</div>
	);
};

export default AudioBackground;
