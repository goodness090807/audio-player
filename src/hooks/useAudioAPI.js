import { useState, useEffect } from "react";
import audioService from "../apis/audioService";

const useAudioAPI = (defaultPage) => {
	const [audios, setAudios] = useState([]);

	useEffect(() => {
		search(defaultPage);
	}, [defaultPage]);

	const search = async (defaultPage) => {
		const response = await audioService.get("/audios", {
			params: {
				page: defaultPage,
			},
		});
		setAudios(response.data);
	};

	return [audios, search];
};

export default useAudioAPI;
