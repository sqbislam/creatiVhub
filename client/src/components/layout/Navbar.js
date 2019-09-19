import React, { Component } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { logoutUser } from "../../actions/auth-actions";
class Navbar extends Component {
	onLogoutClick(e) {
		e.preventDefault();
		this.props.logoutUser();
		window.location.href = "/login";
	}
	render() {
		//Get parameters from redux auth state
		const { isAuthenticated, user } = this.props.auth;
		const searchbar = (
			<div className="searchbar my-1 my-lg-0 justify-content-end">
				<input
					className="in-line form-control"
					name="search"
					type="text"
					placeholder="Search"
					aria-label="Search"
					style={{ width: 70 + "%" }}
				/>
			</div>
		);

		const authLinks = (
			<ul className="navbar-nav in-line mr-3">
				{/* <!-- Nav Items --> */}
				<li className="nav-item">
					<a
						href=""
						onClick={this.onLogoutClick.bind(this)}
						className="nav-link"
					>
						LogOut
					</a>
				</li>
			</ul>
		);
		const guestLinks = (
			<ul className="navbar-nav in-line mr-3">
				{/* <!-- Nav Items --> */}
				<li className="nav-item">
					<Link className="nav-link" to="/login">
						Login
					</Link>
				</li>
				<li className="nav-item ml-2">
					<Link className="nav-link" to="/register">
						Register
					</Link>
				</li>
			</ul>
		);

		return (
			<div>
				<nav className="navbar navbar-custom navbar-dark" id="bg-dark">
					<Link className="navbar-brand" to="/">
						creatiVhub
					</Link>

					{/* <!-- Search bar --> */}
					{isAuthenticated ? searchbar : <div></div>}

					<div className="justify-content-end">
						{isAuthenticated ? authLinks : guestLinks}
					</div>
				</nav>
			</div>
		);
	}
}
Navbar.propTypes = {
	logoutUser: PropTypes.func.isRequired,
	auth: PropTypes.object.isRequired
};
const mapStateToProps = state => ({
	auth: state.auth
});

export default connect(
	mapStateToProps,
	{ logoutUser }
)(Navbar);
