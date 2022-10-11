import React, { useState, useEffect, useRef } from "react";
import { Button } from "primereact/button";
import { Slider } from "primereact/slider";

const AudioPlayer = ({ selectedVideo }) => {
	const [time, setTime] = useState(0);
	const [volume, setVolume] = useState(0.6);
	const [play, setPlay] = useState(false);
	const audio = useRef();
	const audioContextRef = useRef();
	const gainNodeRef = useRef();

	useEffect(() => {
		// 新增一個audio的HTML Object
		audio.current = new Audio(selectedVideo);
		const audioContext = new AudioContext();

		// 加入Node
		const track = audioContext.createMediaElementSource(audio.current);

		// 調整音量
		gainNodeRef.current = audioContext.createGain();
		track.connect(gainNodeRef.current).connect(audioContext.destination);

		audioContextRef.current = audioContext;

		return () => {
			audioContextRef.current.close();
		};
	}, [selectedVideo]);

	useEffect(() => {
		gainNodeRef.current.gain.value = volume;
	}, [volume]);

	const controlPlay = () => {
		if (audioContextRef.current.state === "suspended") {
			audioContextRef.current.resume();
		}

		if (play) {
			audio.current.pause();
		} else {
			audio.current.play();
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

			<i className="pi pi-volume-down"></i>
			<Slider
				value={volume}
				min={0}
				max={2}
				step={0.01}
				onChange={(e) => setVolume(e.value)}
				orientation="vertical"
			/>
			{/* <AudioSource ref={audioRef} src={"/audios/demo-music.mp3"} /> */}
		</React.Fragment>
	);
};

export default AudioPlayer;
