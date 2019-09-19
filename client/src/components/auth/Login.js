import React, { Component } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";

import { connect } from "react-redux";
import { loginUser } from "../../actions/auth-actions";
import TextFieldGroup from "../common/TextFieldGroup";
class Login extends Component {
	constructor() {
		super();
		this.state = {
			email: "",

			password: "",

			errors: {}
		};
		this.onChange = this.onChange.bind(this);
		this.onSubmit = this.onSubmit.bind(this);
	}

	componentDidMount() {
		//Check if authenticated

		//Access control Not allowed to go to Login page if authenticated
		if (this.props.auth.isAuthenticated) {
			this.props.history.push("/dashboard");
		}
	}

	componentWillReceiveProps(nextProps) {
		if (nextProps.auth.isAuthenticated) {
			this.props.history.push("/dashboard");
		}
		if (nextProps.errors) {
			this.setState({ errors: nextProps.errors });
		}
	}

	onChange(e) {
		this.setState({ [e.target.name]: e.target.value });
	}

	onSubmit(e) {
		e.preventDefault();
		const userData = {
			email: this.state.email,
			password: this.state.password
		};
		console.log(userData);
		this.props.loginUser(userData);
	}

	render() {
		const { errors } = this.state;
		return (
			<div>
				<h1 className=" back display-4 text-center text-white m-0 p-4">
					Login
				</h1>
				<h4 className="back text-center text-white m-0 p-4">
					Sign in to your creatiVhub account
				</h4>

				<div className="back">
					<div className="card mx-auto p-3" style={{ width: 300 + "px" }}>
						<form className="p-4" onSubmit={this.onSubmit}>
							<TextFieldGroup
								name="email"
								placeholder="Type your Email Address"
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
								label="Password"
								value={this.state.password}
								onChange={this.onChange}
								error={errors.password}
							/>

							<button className="btn btn-block btn-warning form-label mt-4">
								Login
							</button>

							<small
								id="register-info"
								className="form-text text-muted text-center p-3"
							>
								Dont have an account?{" "}
								<Link className="text-black" to="/register">
									Register
								</Link>{" "}
								yourself right away
							</small>
						</form>
					</div>
				</div>
			</div>
		);
	}
}

Login.propTypes = {
	loginUser: PropTypes.func.isRequired,
	auth: PropTypes.object.isRequired,
	errors: PropTypes.object.isRequired
};
const mapStateToProps = state => ({
	auth: state.auth,
	errors: state.errors
});
export default connect(
	mapStateToProps,
	{ loginUser }
)(Login);
