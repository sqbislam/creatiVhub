import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { Link, withRouter } from "react-router-dom";
import TextFieldGroup from "../common/TextFieldGroup";
import TextAreaFieldGroup from "../common/TextAreaFieldGroup";
import { addEducation } from "../../actions/profile-actions";

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

		this.onChange = this.onChange.bind(this);
		this.onSubmit = this.onSubmit.bind(this);
	}
	//Component updates error state when recieves props
	componentWillReceiveProps(nextProps) {
		if (nextProps.errors) {
			this.setState({ errors: nextProps.errors });
		}
	}
	onSubmit(e) {
		e.preventDefault();
		const eduData = {
			school: this.state.school,
			degree: this.state.degree,
			fieldOfStudy: this.state.fieldOfStudy,
			from: this.state.from,
			to: this.state.to,
			desc: this.state.desc,
			current: this.state.current
		};

		this.props.addEducation(eduData, this.props.history);
	}

	onChange(e) {
		this.setState({ [e.target.name]: e.target.value });
	}
	//When Checkbox for current is ticked. Change To to disabled
	onCheckChange(e) {
		this.setState({
			disabled: !this.state.disabled,
			current: !this.state.current
		});
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

							<form onSubmit={this.onSubmit}>
								<TextFieldGroup
									placeholder="* School"
									name="school"
									value={this.state.school}
									onChange={this.onChange}
									error={errors.school}
								/>

								<TextFieldGroup
									placeholder="* Degree/Certification"
									name="degree"
									value={this.state.degree}
									onChange={this.onChange}
									error={errors.degree}
								/>

								<TextFieldGroup
									placeholder="* Field Of Study"
									name="fieldOfStudy"
									value={this.state.fieldOfStudy}
									info="Area of study you expertised in."
									onChange={this.onChange}
									error={errors.fieldOfStudy}
								/>

								<h6>From Date:</h6>

								<TextFieldGroup
									name="from"
									type="date"
									value={this.state.from}
									onChange={this.onChange}
									error={errors.from}
								/>

								<h6>To Date:</h6>

								<TextFieldGroup
									name="to"
									type="date"
									value={this.state.to}
									onChange={this.onChange}
									error={errors.to}
									disabled={this.state.disabled ? "disabled" : ""}
								/>

								<div className="form-check mb-4">
									<input
										type="checkbox"
										className="form-check-input"
										name="current"
										value={this.state.current}
										checked={this.state.current}
										onChange={this.onCheckChange.bind(this)}
										id="current"
									/>
									<label htmlFor="current" className="form-check-label">
										Currently pursuing?{" "}
									</label>
								</div>
								<TextAreaFieldGroup
									placeholder="Program Description"
									name="desc"
									value={this.state.desc}
									onChange={this.onChange}
									error={errors.desc}
									info="Tell us about the program you were enrolled in"
								/>
								<input
									type="submit"
									value="Submit"
									className="btn btn-info btn-block mb-4"
								/>
							</form>
						</div>
					</div>
				</div>
			</div>
		);
	}
}

AddEducation.propTypes = {
	profile: PropTypes.object.isRequired,
	errors: PropTypes.object.isRequired,
	addEducation: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
	profile: state.profile,
	errors: state.errors
});

export default connect(
	mapStateToProps,
	{ addEducation }
)(withRouter(AddEducation));
