import axios from "axios";

const setAuthToken = token => {
	if (token) {
		//If token exists, apply to every request header

		axios.defaults.headers.common["Authorization"] = token;
	} else {
		//Delete Auth header
		delete axios.defaults.headers.common["Authorization"];
	}
};

export default setAuthToken;
