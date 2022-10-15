import React, { useEffect, useState, useRef } from "react";
import "primeicons/primeicons.css";
import "primereact/resources/themes/lara-dark-indigo/theme.css";
import "primereact/resources/primereact.min.css";
import "primeflex/primeflex.css";
import "./assets/layouts/layout.scss";
import AppTopbar from "./layouts/AppTopbar";
import AppSidebar from "./layouts/AppSidebar";
import AppContent from "./layouts/AppContent";
import AudioPlayer from "./components/AudioPlayers/AudioPlayer";

const audios = [
	"TODO：填入網址(之後要用API取得)",
	"TODO：填入網址(之後要用API取得)",
];

const App = () => {
	const [mobileSidebarActive, setMobileSidebarActive] = useState(false);
	// const [selectedVideo, setSelectedVideo] = useState(audios[0]);
	const [audioTime, setAudioTime] = useState(0);
	const [totalSecond, setTotalSecond] = useState(0);
	const [play, setPlay] = useState(false);
	const [volume, setVolume] = useState(0.15);

	// TODO：查詢API資料 const [audios, setAudios] = useState(null);
	const audio = useRef();
	const audioContextRef = useRef();
	const gainNodeRef = useRef();

	useEffect(() => {
		// 新增一個audio的HTML Object
		audio.current = new Audio();
		audio.current.crossOrigin = "anonymous";
		audio.current.src = audios[0];
		const audioContext = new AudioContext();

		// 設定audio事件
		audio.current.addEventListener("loadedmetadata", () => {
			audio.current.ontimeupdate = updateTime;
			audio.current.onended = () => {
				setPlay(false);
			};
			setTotalSecond(audio.current.duration);
		});

		// 加入Node
		const track = audioContext.createMediaElementSource(audio.current);

		// 調整音量
		gainNodeRef.current = audioContext.createGain();

		// connect要做的事
		track.connect(gainNodeRef.current).connect(audioContext.destination);

		audioContextRef.current = audioContext;

		return () => {
			audioContextRef.current.close();
			audio.current = null;
			setPlay(false);
		};
	}, []);

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
					<AppContent />
				</div>
				<div className="flex flex-wrap align-items-center justify-content-center h-8rem layout-footer audio-player">
					<AudioPlayer
						totalSecond={totalSecond}
						audioTime={audioTime}
						play={play}
						setPlay={setPlay}
						volume={volume}
						setVolume={setVolume}
						silderTimeChange={silderTimeChange}
						sliderTimeChangeEnd={sliderTimeChangeEnd}
					/>
				</div>
			</div>
		</div>
	);
};

export default App;
