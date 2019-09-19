import React, { Component } from "react";

import jwt_decode from "jwt-decode";
import setAuthToken from "./utils/setAuthToken";
import { setCurrentUser, logoutUser } from "./actions/auth-actions";

import { Provider } from "react-redux";
import store from "./store";
import { BrowserRouter as Router, Route } from "react-router-dom";

import Footer from "./components/layout/Footer";
import Navbar from "./components/layout/Navbar";
import Landing from "./components/layout/Landing";
import Register from "./components/auth/Register";
import Login from "./components/auth/Login";

import "./App.css";

//Check for token
if (localStorage.jwtToken) {
	//Set auth token header
	setAuthToken(localStorage.jwtToken);
	//Decode and get user info and expiry time
	const decoded = jwt_decode(localStorage.jwtToken);
	//Set user and isAuthenticated
	store.dispatch(setCurrentUser(decoded));

	//Check for expired token
	const currentTime = Date.now() / 1000;
	if (decoded.exp < currentTime) {
		//Logout User
		store.dispatch(logoutUser());
		//TODO Clear Current Profile
		//Redirect to Login
		window.location.href = "/login";
	}
}

class App extends Component {
	render() {
		return (
			<Provider store={store}>
				<Router>
					<div className="App">
						<Navbar />
						<Route exact path="/" component={Landing} />
						<Route exact path="/register" component={Register} />

						<Route exact path="/login" component={Login} />

						<Footer />
					</div>
				</Router>
			</Provider>
		);
	}
}

export default App;
