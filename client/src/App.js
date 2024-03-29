import React, { Component } from "react";

import jwt_decode from "jwt-decode";
import setAuthToken from "./utils/setAuthToken";
import { setCurrentUser, logoutUser } from "./actions/auth-actions";
import { clearCurrentProfile } from "./actions/profile-actions";

import { Provider } from "react-redux";
import store from "./store";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import Footer from "./components/layout/Footer";
import Navbar from "./components/layout/Navbar";
import Landing from "./components/layout/Landing";
import Register from "./components/auth/Register";
import Login from "./components/auth/Login";
import Dashboard from "./components/dashboard/Dashboard";
import PrivateRoute from "./components/common/PrivateRoute";
import AddExperience from "./components/add-credentials/AddExperience";
import CreateProfile from "./components/create-profile/CreateProfile";
import EditProfile from "./components/edit-profile/EditProfile";
import "./App.css";
import AddEducation from "./components/add-credentials/AddEducation";
import Profiles from "./components/profiles/Profiles";
import Profile from "./components/profile/Profile";
import NotFound from "./components/not-found/NotFound";
import Posts from "./components/posts/Posts";
import Post from "./components/post/Post";
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
		//Clear Current Profile'
		store.dispatch(clearCurrentProfile());
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

						<Switch>
							<PrivateRoute exact path="/dashboard" component={Dashboard} />
						</Switch>

						<Switch>
							<PrivateRoute
								exact
								path="/create-profile"
								component={CreateProfile}
							/>
						</Switch>

						<Switch>
							<PrivateRoute
								exact
								path="/edit-profile"
								component={EditProfile}
							/>
						</Switch>

						<Switch>
							<PrivateRoute
								exact
								path="/add-experience"
								component={AddExperience}
							/>
						</Switch>

						<Switch>
							<PrivateRoute
								exact
								path="/add-education"
								component={AddEducation}
							/>
						</Switch>

						<Route exact path="/profiles" component={Profiles} />

						<Route exact path="/profile/:handle" component={Profile} />

						<Switch>
							<PrivateRoute exact path="/feed" component={Posts} />
						</Switch>

						<Switch>
							<PrivateRoute exact path="/post/:id" component={Post} />
						</Switch>

						<Route exact path="/not-found" component={NotFound} />
						<Footer />
					</div>
				</Router>
			</Provider>
		);
	}
}

export default App;
