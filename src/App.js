import React, { useEffect, useState, useRef } from "react";
import "primeicons/primeicons.css";
import "primereact/resources/themes/lara-dark-indigo/theme.css";
import "primereact/resources/primereact.min.css";
import "primeflex/primeflex.css";
import "./assets/layouts/layout.scss";
import AppTopbar from "./layouts/AppTopbar";
import AppSidebar from "./layouts/AppSidebar";
import AppContent from "./layouts/AppContent";
import AudioPlayer from "./components/AudioPlayer";
import useAudioAPI from "./hooks/useAudioAPI";

const App = () => {
	const [mobileSidebarActive, setMobileSidebarActive] = useState(false);
	const [audios] = useAudioAPI(1);
	const [selectedAudio, setSelectedAudio] = useState(null);
	const [currentTime, setCurrentTime] = useState(0);
	const [totalSecond, setTotalSecond] = useState(0);
	const [playing, setPlaying] = useState(false);
	const [volume, setVolume] = useState(1);
	const [debouncedVolume, setDebouncedVolume] = useState(volume);
	const [replay, setReplay] = useState(false);

	const audio = useRef();
	const audioContextRef = useRef();
	const gainNodeRef = useRef(null);
	const firstTimeRef = useRef(true);
	const replayRef = useRef(false);

	// canvas用
	const canvasContextRef = useRef();
	const canvasRef = useRef();
	const canvasXRef = useRef(0);
	const analyserRef = useRef();
	const dataArrayRef = useRef();
	const barWidthRef = useRef();
	const barHeightRef = useRef();

	useEffect(() => {
		if (audios.length === 0) return;
		setSelectedAudio(audios[0]);
	}, [audios]);

	useEffect(() => {
		replayRef.current = replay;
	}, [replay]);

	useEffect(() => {
		if (!selectedAudio) return;

		const renderFrame = () => {
			requestAnimationFrame(renderFrame);
			canvasXRef.current = 0;

			analyserRef.current.getByteFrequencyData(dataArrayRef.current);

			canvasContextRef.current.fillStyle = "rgba(0,0,0,0.2)";
			canvasContextRef.current.fillRect(
				0,
				0,
				canvasRef.current.width,
				canvasRef.current.height
			);

			let r, g, b;
			let responseWidth = 800;
			let bars = canvasRef.current.width > responseWidth ? 118 : 90;
			let space = canvasRef.current.width > responseWidth ? 10 : 6;

			for (let i = 0; i < bars; i++) {
				barHeightRef.current = dataArrayRef.current[i] * 2.1;

				if (dataArrayRef.current[i] > 210) {
					// pink
					r = 250;
					g = 0;
					b = 255;
				} else if (dataArrayRef.current[i] > 200) {
					// yellow
					r = 250;
					g = 255;
					b = 0;
				} else if (dataArrayRef.current[i] > 190) {
					// yellow/green
					r = 204;
					g = 255;
					b = 0;
				} else if (dataArrayRef.current[i] > 180) {
					// blue/green
					r = 0;
					g = 219;
					b = 131;
				} else {
					// light blue
					r = 0;
					g = 199;
					b = 255;
				}

				canvasContextRef.current.fillStyle = `rgb(${r},${g},${b})`;
				canvasContextRef.current.fillRect(
					canvasXRef.current,
					canvasRef.current.height - barHeightRef.current,
					barWidthRef.current,
					barHeightRef.current
				);

				canvasXRef.current += barWidthRef.current + space;
			}
		};

		// 新增aduio物件
		audio.current = new Audio();
		audio.current.crossOrigin = "anonymous";
		audio.current.src = selectedAudio.audioUrl;
		// 設定audio事件
		audio.current.addEventListener("loadedmetadata", () => {
			audio.current.ontimeupdate = updateTime;
			audio.current.onended = () => {
				if (replayRef.current) {
					audio.current.play();
				} else {
					setPlaying(false);
				}
			};
			setTotalSecond(audio.current.duration);
		});

		audioContextRef.current = new AudioContext();

		// 加入Node
		const track = audioContextRef.current.createMediaElementSource(
			audio.current
		);

		// 調整音量
		gainNodeRef.current = audioContextRef.current.createGain();
		gainNodeRef.current.gain.value = debouncedVolume;

		// canvas設定
		const layoutContent = document.querySelector(".layout-content");
		const WIDTH = layoutContent.offsetWidth;
		const HEIGHT = layoutContent.offsetHeight;
		canvasRef.current.width = WIDTH;
		canvasRef.current.height = HEIGHT;
		canvasContextRef.current = canvasRef.current.getContext("2d");
		canvasContextRef.current.clearRect(0, 0, WIDTH, HEIGHT);
		analyserRef.current = audioContextRef.current.createAnalyser();

		// connect要做的事
		track
			.connect(gainNodeRef.current)
			.connect(analyserRef.current)
			.connect(audioContextRef.current.destination);

		// canvas設定
		analyserRef.current.fftSize = 16384;
		const bufferLength = analyserRef.current.frequencyBinCount;
		dataArrayRef.current = new Uint8Array(bufferLength);
		barWidthRef.current = (WIDTH / bufferLength) * 13;

		if (!firstTimeRef.current) {
			if (audioContextRef.current.state === "suspended") {
				audioContextRef.current.resume();
			}
			audio.current.play();
			setPlaying(true);
		}
		firstTimeRef.current = false;

		renderFrame();

		return () => {
			audioContextRef.current.close();
			audio.current = null;
			setPlaying(false);
		};
	}, [selectedAudio, debouncedVolume]);

	const playerToggle = (userSelectedAudio) => {
		if (userSelectedAudio.id !== selectedAudio.id) {
			// 不相同的Id要重設
			setSelectedAudio(userSelectedAudio);
			setDebouncedVolume(gainNodeRef.current.gain.value);
			return;
		}

		if (audioContextRef.current.state === "suspended") {
			audioContextRef.current.resume();
		}

		if (playing) {
			audio.current.pause();
		} else {
			audio.current.play();
		}

		setPlaying(!playing);
	};

	const updateTime = (e) => {
		setCurrentTime(e.target.currentTime);
	};

	const silderTimeChange = (e) => {
		if (audio.current.ontimeupdate) {
			audio.current.ontimeupdate = null;
		}

		setCurrentTime(e.value);
	};

	const sliderTimeChangeEnd = (e) => {
		audio.current.currentTime = e.value;
		audio.current.ontimeupdate = updateTime;
	};

	const sliderVolumeChange = (e) => {
		gainNodeRef.current.gain.value = e.value;
		setVolume(e.value);
	};

	return (
		<div
			className={`${mobileSidebarActive ? "layout-sidebar-active" : ""}`}
		>
			<AppTopbar
				mobileSidebarActive={mobileSidebarActive}
				setMobileSidebarActive={setMobileSidebarActive}
			/>

			<div className="layout-sidebar">
				<AppSidebar setMobileSidebarActive={setMobileSidebarActive} />
			</div>
			<div className="layout-main">
				<div className="layout-content">
					<AppContent
						audios={audios}
						selectedAudio={selectedAudio}
						playing={playing}
						playerToggle={playerToggle}
					>
						<canvas
							className="content-canvas"
							ref={canvasRef}
						></canvas>
					</AppContent>
				</div>
				<div className="flex flex-wrap align-items-center justify-content-center h-8rem layout-footer audio-player">
					<AudioPlayer
						selectedAudio={selectedAudio}
						totalSecond={totalSecond}
						currentTime={currentTime}
						playing={playing}
						volume={volume}
						playerToggle={playerToggle}
						silderTimeChange={silderTimeChange}
						sliderTimeChangeEnd={sliderTimeChangeEnd}
						sliderVolumeChange={sliderVolumeChange}
						replay={replay}
						setReplay={setReplay}
					/>
				</div>
			</div>
		</div>
	);
};

export default App;
