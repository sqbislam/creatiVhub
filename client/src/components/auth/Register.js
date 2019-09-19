import React, { Component } from "react";
import PropTypes from "prop-types";
import { withRouter } from "react-router-dom";
import { Link } from "react-router-dom";

import { connect } from "react-redux";
import { registerUser } from "../../actions/auth-actions";

import TextFieldGroup from "../common/TextFieldGroup";

class Register extends Component {
	constructor() {
		super();
		this.state = {
			name: "",
			email: "",
			password: "",
			password2: "",
			errors: {}
		};
		this.onChange = this.onChange.bind(this);
		this.onSubmit = this.onSubmit.bind(this);
	}
	componentDidMount() {
		//Check if authenticated

		//Access control Not allowed to go to Register page if authenticated
		if (this.props.auth.isAuthenticated) {
			this.props.history.push("/dashboard");
		}
	}
	//Map the Props error state to the component state error
	componentWillReceiveProps(nextProps) {
		if (nextProps.errors) {
			this.setState({ errors: nextProps.errors });
		}
	}
	onChange(e) {
		this.setState({ [e.target.name]: e.target.value });
	}

	onSubmit(e) {
		e.preventDefault();
		const newUser = {
			name: this.state.name,
			password: this.state.password,
			password2: this.state.password2,
			email: this.state.email
		};

		this.props.registerUser(newUser, this.props.history);
	}

	render() {
		//const { user } = this.props.auth;
		const { errors } = this.state;
		return (
			<div>
				<h1 className=" back display-4 text-center text-white m-0 p-4">
					Register
				</h1>
				<h4 className="back text-center text-white m-0 p-3">
					Create your creatiVhub Account.
				</h4>

				<div className="back">
					<div className="card mx-auto p-3" style={{ width: 300 + "px" }}>
						<form className="p-4" onSubmit={this.onSubmit}>
							<TextFieldGroup
								name="name"
								placeholder="Username/Handle"
								type="text"
								label="Username"
								value={this.state.name}
								onChange={this.onChange}
								error={errors.name}
							/>

							<TextFieldGroup
								name="email"
								placeholder="Email Address"
								type="email"
								label="Email"
								value={this.state.email}
								onChange={this.onChange}
								error={errors.email}
							/>

							<TextFieldGroup
								name="password"
								placeholder="Type your Password"
								type="password"
								info="Password must be atleast 6 characters"
								label="Password"
								value={this.state.password}
								onChange={this.onChange}
								error={errors.password}
							/>

							<TextFieldGroup
								name="password2"
								placeholder="Re-type your Password"
								type="password"
								label="Confirm Password"
								value={this.state.password2}
								onChange={this.onChange}
								error={errors.password2}
							/>

							<button className="btn btn-block btn-warning form-label mt-4">
								Register
							</button>

							<small id="register-info" className="form-text text-muted">
								Already have an account?
								<Link className="text-black" to="/login">
									Login
								</Link>
							</small>
						</form>
					</div>
				</div>
			</div>
		);
	}
}

//Map Proptypes
Register.propTypes = {
	registerUser: PropTypes.func.isRequired,
	auth: PropTypes.object.isRequired,
	errors: PropTypes.object.isRequired
};
//maps global state to current component for access
const mapStateToProps = state => ({ auth: state.auth, errors: state.errors });
export default connect(
	mapStateToProps,
	{ registerUser }
)(withRouter(Register));
