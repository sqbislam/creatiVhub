import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { Link, withRouter } from "react-router-dom";
import TextFieldGroup from "../common/TextFieldGroup";
import TextAreaFieldGroup from "../common/TextAreaFieldGroup";

class AddExperience extends Component {
	constructor(props) {
		super(props);
		this.state = {
			company: "",
			title: "",
			location: "",
			from: "",
			to: "",
			desc: "",
			current: false,
			errors: {},
			disabled: false
		};
		this.onChange = this.onChange.bind(this);
		this.onSubmit = this.onSubmit.bind(this);
	}
	onSubmit(e) {
		e.preventDefault();
		console.log(this.state);
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

							<h1 className="display-4 text-center">Add Experience</h1>
							<p className="lead text-center">
								Add any job or experience you had or was asssociated with in the
								past or currently.
							</p>
							<small className="d-block pb-3">* = Required Fields</small>

							<form onSubmit={this.onSubmit}>
								<TextFieldGroup
									placeholder="Company"
									name="company"
									value={this.state.company}
									onChange={this.onChange}
									error={errors.company}
								/>

								<TextFieldGroup
									placeholder="Job Title"
									name="title"
									value={this.state.title}
									onChange={this.onChange}
									error={errors.title}
								/>

								<TextFieldGroup
									placeholder="Location"
									name="location"
									value={this.state.location}
									info="The city or state you were working in"
									onChange={this.onChange}
									error={errors.location}
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
										Current Job?{" "}
									</label>
								</div>
								<TextAreaFieldGroup
									placeholder="Job Description"
									name="desc"
									value={this.state.desc}
									onChange={this.onChange}
									error={errors.desc}
									info="Summary about your position and role you played"
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

AddExperience.propTypes = {
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
)(withRouter(AddExperience));
