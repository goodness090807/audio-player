import React, { useState, useEffect, useRef } from "react";
import { Button } from "primereact/button";
import { Slider } from "primereact/slider";

const AudioPlayer = () => {
	const [time, setTime] = useState(null);
	const [play, setPlay] = useState(false);
	const [audioContext, setAudioContext] = useState(null);
	const audioRef = useRef();

	useEffect(() => {
		const nativeAudioContext = new AudioContext();
		console.log(nativeAudioContext);
		const track = nativeAudioContext.createMediaElementSource(
			audioRef.current
		);
		track.connect(nativeAudioContext.destination);
		setAudioContext(nativeAudioContext);
	}, []);

	const controlPlay = () => {
		if (audioContext.state === "suspended") {
			audioContext.resume();
		}

		if (play) {
			audioRef.current.pause();
		} else {
			audioRef.current.play();
		}

		setPlay(!play);
	};

	return (
		<React.Fragment>
			<Button
				icon={`pi ${play ? "pi-pause" : "pi-play"}`}
				className="p-button-rounded p-button-secondary"
				aria-label="Bookmark"
				onClick={controlPlay}
			/>
			<Slider value={time} onChange={(e) => setTime(e.value)} />
			<audio ref={audioRef} src="/audios/demo-music.mp3" />
		</React.Fragment>
	);
};

export default AudioPlayer;
