import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import Spinner from "../common/Spinner";
import { getProfiles } from "../../actions/profile-actions";

import ProfileItem from "./ProfileItem";

class Profiles extends Component {
	componentDidMount() {
		this.props.getProfiles();
	}

	render() {
		const { profiles, loading } = this.props.profile;

		let profileItems = "";
		if (profiles === null || loading) {
			profileItems = <Spinner />;
		} else {
			if (profiles.length > 0) {
				profileItems = profiles.map(profile => (
					<ProfileItem key={profile._id} profile={profile} />
				));
			} else {
				profileItems = <h4>No Profiles Found...</h4>;
			}
		}

		return (
			<div className="profiles">
				<div className="container">
					<div className="row">
						<div className="col-md-12">
							<h2 className="display-4 text-center">Profiles</h2>
							<p className="lead text-center">
								Browse and Connect with CreatiVhub Users
							</p>
							{profileItems}
						</div>
					</div>
				</div>
			</div>
		);
	}
}

Profiles.propType = {
	getProfiles: PropTypes.func.isRequired,
	profile: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
	profile: state.profile
});

export default connect(
	mapStateToProps,
	{ getProfiles }
)(Profiles);
