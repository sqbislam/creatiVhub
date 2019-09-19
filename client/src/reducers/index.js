import { combineReducers } from "redux";

import authReducer from "./authReducer";
import errorReducer from "./errorReducer";

//Combine the different reducers at play
export default combineReducers({
	auth: authReducer,
	errors: errorReducer
});
