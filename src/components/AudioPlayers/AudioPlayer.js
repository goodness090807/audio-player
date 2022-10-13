import React, { useState, useEffect } from "react";
import { Button } from "primereact/button";
import { Slider } from "primereact/slider";

const AudioPlayer = ({
	totalSecond,
	audioTime,
	play,
	setPlay,
	volume,
	setVolume,
	silderTimeChange,
	sliderTimeChangeEnd,
}) => {
	const [audioTotalTime, setaudioTotalTime] = useState("0:00");
	const [currentTime, setCurrentTime] = useState("0:00");

	useEffect(() => {
		setaudioTotalTime(calculateTimeToString(totalSecond));
	}, [totalSecond]);

	useEffect(() => {
		setCurrentTime(calculateTimeToString(audioTime));
	}, [audioTime]);

	const calculateTimeToString = (time) => {
		const minutes = Math.floor(time / 60);
		const seconds = Math.floor(time - minutes * 60);

		return `${minutes}:${seconds.toString().padStart(2, "0")}`;
	};

	return (
		<React.Fragment>
			<Button
				icon={`pi ${play ? "pi-pause" : "pi-play"}`}
				className="p-button-rounded p-button-secondary"
				aria-label="Player"
				onClick={() => setPlay(!play)}
			/>
			<div className="flex align-items-center justify-content-center audio-central">
				<Slider
					value={audioTime}
					min={0}
					max={totalSecond}
					onChange={silderTimeChange}
					onSlideEnd={sliderTimeChangeEnd}
				/>
				<label className="ml-2">
					{currentTime}/{audioTotalTime}
				</label>
			</div>
			<div className="flex align-items-center justify-content-center audio-volumn">
				<i className="pi pi-volume-down"></i>
				<Slider
					className="volume ml-2"
					value={volume}
					min={0}
					max={2}
					step={0.01}
					onChange={(e) => setVolume(e.value)}
				/>
			</div>
		</React.Fragment>
	);
};

export default AudioPlayer;
