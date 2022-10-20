import React, { useState, useEffect } from "react";
import { Button } from "primereact/button";
import { Slider } from "primereact/slider";

const AudioPlayer = ({
	selectedAudio,
	totalSecond,
	currentTime,
	playing,
	volume,
	playerToggle,
	silderTimeChange,
	sliderTimeChangeEnd,
	sliderVolumeChange,
	replay,
	setReplay,
}) => {
	const [audioTotalTime, setaudioTotalTime] = useState("0:00");
	const [audioCurrentTime, setAudioCurrentTime] = useState("0:00");

	useEffect(() => {
		setaudioTotalTime(calculateTimeToString(totalSecond));
	}, [totalSecond]);

	useEffect(() => {
		setAudioCurrentTime(calculateTimeToString(currentTime));
	}, [currentTime]);

	const calculateTimeToString = (time) => {
		const minutes = Math.floor(time / 60);
		const seconds = Math.floor(time - minutes * 60);

		return `${minutes}:${seconds.toString().padStart(2, "0")}`;
	};

	return (
		<React.Fragment>
			<Button
				icon={`pi ${playing ? "pi-pause" : "pi-play"}`}
				className="p-button-rounded p-button-secondary"
				aria-label="Player"
				onClick={() => playerToggle(selectedAudio)}
				title={`${playing ? "暫停" : "播放"}`}
			/>
			<div className="flex align-items-center justify-content-center audio-central">
				<Slider
					value={currentTime}
					min={0}
					max={totalSecond}
					onChange={silderTimeChange}
					onSlideEnd={sliderTimeChangeEnd}
				/>
				<label className="ml-2">
					{audioCurrentTime}/{audioTotalTime}
				</label>

				<Button
					icon="pi pi-replay"
					className={`p-button-rounded p-button-text ${
						replay ? "p-button-success" : "p-button-secondary"
					}`}
					onClick={() => setReplay(!replay)}
					title="循環播放"
				/>
			</div>
			<div className="flex align-items-center justify-content-center audio-volumn">
				<i className="pi pi-volume-down"></i>
				<Slider
					className="volume ml-2"
					value={volume}
					min={0}
					max={2}
					step={0.01}
					onChange={sliderVolumeChange}
				/>
			</div>
		</React.Fragment>
	);
};

export default AudioPlayer;
