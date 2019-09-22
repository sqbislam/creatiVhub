import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { getCurrentProfile } from "../../actions/profile-actions";

class Dashboard extends Component {
	//get current Profile is called
	componentDidMount() {
		this.props.getCurrentProfile();
	}

	render() {
		const { user } = this.props.auth;
		const { profile, loading } = this.props.profile;

		let dashBoardContent;

		if (profile === null || loading) {
			dashBoardContent = <h4>Loading...</h4>;
		} else {
			dashBoardContent = <h1>MAKE A PROFILE </h1>;
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
	profile: PropTypes.object.isRequired
};

const mapStatetoProps = state => ({
	profile: state.profile,
	auth: state.auth
});

export default connect(
	mapStatetoProps,
	{ getCurrentProfile }
)(Dashboard);
