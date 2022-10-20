import axios from "axios";

export default axios.create({
	baseURL: "https://audio-player-api.herokuapp.com/api",
});
