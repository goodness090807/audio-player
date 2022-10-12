import React, { useState, useEffect, useRef } from "react";
import { Button } from "primereact/button";
import { Slider } from "primereact/slider";

const AudioPlayer = ({ selectedVideo }) => {
	const [audioTime, setAudioTime] = useState(0);
	const [totalSecond, setTotalSecond] = useState(0);
	const [currentTime, setCurrentTime] = useState("0:00");
	const [audioTotalTime, setaudioTotalTime] = useState("");
	const [volume, setVolume] = useState(1);
	const [play, setPlay] = useState(false);
	const audio = useRef();
	const audioContextRef = useRef();
	const gainNodeRef = useRef();

	useEffect(() => {
		// 新增一個audio的HTML Object
		audio.current = new Audio(selectedVideo);
		const audioContext = new AudioContext();

		audio.current.addEventListener("loadedmetadata", () => {
			audio.current.ontimeupdate = updateTime;
			audio.current.onended = () => {
				setPlay(false);
			};
			setaudioTotalTime(calculateTimeToString(audio.current.duration));
			setTotalSecond(audio.current.duration);
		});

		// 加入Node
		const track = audioContext.createMediaElementSource(audio.current);

		// 調整音量
		gainNodeRef.current = audioContext.createGain();

		// TODO:加入分析
		// const analyser = audioContext.createAnalyser();
		// var distortion = audioContext.createWaveShaper();
		// analyser.connect(distortion);
		// distortion.connect(audioContext.destination);
		// analyser.fftSize = 2048;
		// const bufferLength = analyser.frequencyBinCount;
		// const dataArray = new Uint8Array(bufferLength);
		// analyser.getByteTimeDomainData(dataArray);

		// connect要做的事
		track
			.connect(gainNodeRef.current)
			// TODO: 上面加入分析寫完後要做的 .connect(analyser)
			.connect(audioContext.destination);

		audioContextRef.current = audioContext;

		return () => {
			audioContextRef.current.close();
			audio.current = null;
			setPlay(false);
		};
	}, [selectedVideo]);

	useEffect(() => {
		setCurrentTime(calculateTimeToString(audioTime));
	}, [audioTime]);

	useEffect(() => {
		gainNodeRef.current.gain.value = volume;
	}, [volume]);

	useEffect(() => {
		if (audioContextRef.current.state === "suspended") {
			audioContextRef.current.resume();
		}

		if (play) {
			audio.current.play();
		} else {
			audio.current.pause();
		}
	}, [play]);

	const updateTime = (e) => {
		setAudioTime(e.target.currentTime);
	};

	const silderTimeChange = (e) => {
		if (audio.current.ontimeupdate) {
			audio.current.ontimeupdate = null;
		}

		setAudioTime(e.value);
	};

	const sliderTimeChangeEnd = (e) => {
		audio.current.currentTime = e.value;
		audio.current.ontimeupdate = updateTime;

		if (play) {
			audio.current.play();
		} else {
			audio.current.pause();
		}
	};

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
				aria-label="Bookmark"
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
