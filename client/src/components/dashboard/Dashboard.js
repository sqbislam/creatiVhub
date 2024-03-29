import React, { Component } from "react";
import { Link } from "react-router-dom";
import Spinner from "../common/Spinner";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import {
	getCurrentProfile,
	deleteAccount
} from "../../actions/profile-actions";
import ProfileActions from "./ProfileActions";
import Experience from "./Experience";
import Education from "./Education";

class Dashboard extends Component {
	//get current Profile is called
	componentDidMount() {
		this.props.getCurrentProfile();
	}

	//Delete Account
	onDeleteClick(e) {
		this.props.deleteAccount();
	}

	render() {
		const { user } = this.props.auth;
		const { profile, loading } = this.props.profile;

		let dashBoardContent;

		if (profile === null || loading) {
			dashBoardContent = <Spinner />;
		} else {
			//If no profile created by logged in user,prompt to make profile
			if (Object.keys(profile).length <= 0) {
				dashBoardContent = (
					<div>
						<p className="lead text-muted">Welcome {user.name}</p>
						<p>
							You have not created a profile yet. Why not make it now and Get
							Started
						</p>
						<Link to="/create-profile" className="btn btn-lg btn-info m-5">
							Create Profile
						</Link>
					</div>
				);
			} else {
				//User profile exists already
				dashBoardContent = (
					<div>
						<p className="lead text-muted">
							Welcome <Link to={`/profile/${profile.handle}`}>{user.name}</Link>
						</p>
						<ProfileActions />
						<Experience experience={profile.experience} />
						<Education education={profile.education} />

						<div style={{ marginBottom: "60px" }} />

						<button
							className="btn btn-danger"
							onClick={this.onDeleteClick.bind(this)}
						>
							Delete My Accout
						</button>
					</div>
				);
			}
		}
		return (
			<div className="dashboard">
				<div className="container">
					<div className="row">
						<div className="col-md-12">
							<h1 className="display-4">Dashboard</h1>
							<br />
							{dashBoardContent}
						</div>
					</div>
				</div>
			</div>
		);
	}
}

Dashboard.propTypes = {
	getCurrentProfile: PropTypes.func.isRequired,
	auth: PropTypes.object.isRequired,
	profile: PropTypes.object.isRequired,
	deleteAccount: PropTypes.func.isRequired
};

const mapStatetoProps = state => ({
	profile: state.profile,
	auth: state.auth
});

export default connect(
	mapStatetoProps,
	{ getCurrentProfile, deleteAccount }
)(Dashboard);
