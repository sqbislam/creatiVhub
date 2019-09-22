import { combineReducers } from "redux";

import authReducer from "./authReducer";
import errorReducer from "./errorReducer";
import profileReducer from "./profileReducer";
//Combine the different reducers at play
export default combineReducers({
	auth: authReducer,
	errors: errorReducer,
	profile: profileReducer
});
