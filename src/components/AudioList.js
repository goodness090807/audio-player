import React from "react";
import AudioListItem from "./AudioListItem";

const AudioList = ({ audios, selectedAudio, playing, playerToggle }) => {
	const renderAudioItems = audios.map((audio) => {
		const isPlaying =
			audio.id === selectedAudio.id && playing ? true : false;
		return (
			<AudioListItem
				key={audio.id}
				audio={audio}
				isPlaying={isPlaying}
				playerToggle={playerToggle}
			/>
		);
	});

	return <div className="flex flex-column m-4">{renderAudioItems}</div>;
};

export default AudioList;
