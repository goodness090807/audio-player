import React from "react";
import { Button } from "primereact/button";
import { Badge } from "primereact/badge";

const AudioListItem = ({ audio, isPlaying, playerToggle }) => {
	const audioPlayingSetting = {
		true: {
			icon: "pi-pause",
			className: "p-button-outlined",
		},
		false: {
			icon: "pi-play",
			className: "",
		},
	};

	const { icon, className } = audioPlayingSetting[isPlaying];

	return (
		<div className="card py-3 flex align-items-center audio-list-item w-full">
			<img
				src={audio.imageUrl}
				alt={audio.name}
				title={audio.name}
				className="h-4rem border-solid border-white-200 audio-img"
			/>

			<div className="ml-3 h-4rem audio-text">
				<Badge type="text" className="font-bold" value={audio.name}>
					audio.name
				</Badge>
				<div className="mt-2 text-500 white-space-nowrap overflow-x-hidden text-overflow-ellipsis">
					<span
						title={audio.description}
						dangerouslySetInnerHTML={{ __html: audio.description }}
					></span>
				</div>
			</div>
			<div className="audio-button">
				<Button
					icon={`pi ${icon}`}
					className={`p-button-rounded p-button-success ${className}`}
					aria-label="Player"
					onClick={() => playerToggle(audio)}
				/>
			</div>
		</div>
	);
};

export default AudioListItem;
