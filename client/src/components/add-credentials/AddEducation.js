import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { Link, withRouter } from "react-router-dom";
import { TextFieldGroup } from "../common/TextFieldGroup";
import { TextAreaFieldGroup } from "../common/TextAreaFieldGroup";

class AddEducation extends Component {
	// school
	// degree
	// fieldOfStudy
	// from
	// to
	// current
	// desc
	constructor(props) {
		super(props);
		this.state = {
			school: "",
			degree: "",
			fieldOfStudy: "",
			from: "",
			to: "",
			desc: "",
			current: false,
			errors: {},
			disable: false
		};
	}

	render() {
		const { errors } = this.state;

		return (
			<div className="add-experience">
				<div className="container">
					<div className="row">
						<div className="col-md-8 m-auto">
							<Link to="/dashboard" className="btn btn-light">
								Go Back
							</Link>

							<h1 className="display-4 text-center">Add Education</h1>
							<p className="lead text-center">
								Add your education background both past or current.
							</p>
							<small className="d-block pb-3">* = Required Fields</small>
						</div>
					</div>
				</div>
			</div>
		);
	}
}

AddEducation.propTypes = {
	profile: PropTypes.object.isRequired,
	errors: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
	profile: state.profile,
	errors: state.errors
});

export default connect(
	mapStateToProps,
	{}
)(withRouter(AddEducation));
