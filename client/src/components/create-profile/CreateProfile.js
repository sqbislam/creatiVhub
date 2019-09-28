import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import TextFieldGroup from "../common/TextFieldGroup";
import TextAreaFieldGroup from "../common/TextAreaFieldGroup";
import SelectListGroup from "../common/SelectListGroup";
import InputGroup from "../common/InputGroup";
import { createProfile } from "../../actions/profile-actions";
class CreateProfile extends Component {
	constructor(props) {
		super(props);
		this.state = {
			displaySocialInputs: false,
			handle: "",
			company: "",
			website: "",
			location: "",
			status: "",
			skills: "",
			githubUsername: "",
			bio: "",
			twitter: "",
			facebook: "",
			linkedin: "",
			youtube: "",
			instagram: "",
			errors: {}
		};

		this.onChange = this.onChange.bind(this);

		this.onSubmit = this.onSubmit.bind(this);
	}
	//If There are errors add them to state
	componentWillReceiveProps(nextProps) {
		if (nextProps.errors) {
			this.setState({ errors: nextProps.errors });
		}
	}
	//Trigger profile action on Submit form
	onSubmit(e) {
		e.preventDefault();
		const profileData = {
			handle: this.state.handle,
			company: this.state.company,
			website: this.state.website,
			location: this.state.location,
			status: this.state.status,
			skills: this.state.skills,
			githubUsername: this.state.githubUsername,
			bio: this.state.bio,
			twitter: this.state.twitter,
			facebook: this.state.facebook,
			linkedin: this.state.linkedin,
			youtube: this.state.youtube,
			instagram: this.state.instagram
		};

		this.props.createProfile(profileData, this.props.history);
	}

	onChange(e) {
		this.setState({ [e.target.name]: e.target.value });
	}

	render() {
		const { errors, displaySocialInputs } = this.state;

		let socialInputs;
		//If display social inputs is true then render the input groups
		if (displaySocialInputs) {
			socialInputs = (
				<div>
					<InputGroup
						placeholder="Twitter Profile URL"
						name="twitter"
						icon="fab fa-twitter"
						value={this.state.twitter}
						onChange={this.onChange}
						error={errors.twitter}
					/>

					<InputGroup
						placeholder="Facebook Profile URL"
						name="facebook"
						icon="fab fa-facebook-square"
						value={this.state.facebook}
						onChange={this.onChange}
						error={errors.facebook}
					/>

					<InputGroup
						placeholder="Instagram Profile URL"
						name="instagram"
						icon="fab fa-instagram"
						value={this.state.instagram}
						onChange={this.onChange}
						error={errors.instagram}
					/>

					<InputGroup
						placeholder="LinkedIn Profile URL"
						name="linkedin"
						icon="fab fa-linkedin"
						value={this.state.linkedin}
						onChange={this.onChange}
						error={errors.linkedin}
					/>

					<InputGroup
						placeholder="Youtube Channel URL"
						name="youtube"
						icon="fab fa-youtube"
						value={this.state.youtube}
						onChange={this.onChange}
						error={errors.youtube}
					/>
				</div>
			);
		}
		//Select Options for Status
		const options = [
			{
				label: "* Select a Status that would Define you best",
				value: 0
			},
			{
				label: "Music Composer",
				value: "Music Composer"
			},
			{
				label: "Artist",
				value: "Artist"
			},
			{
				label: "Developer",
				value: "Developer"
			},
			{
				label: "FreeLancer",
				value: "FreeLancer"
			},
			{
				label: "Traveller",
				value: "Traveller"
			},
			{
				label: "Influencer",
				value: "Influencer"
			},
			{
				label: "Fashion Designer",
				value: "Fashion Designer"
			},
			{
				label: "Blogger",
				value: "Blogger"
			}
		];
		return (
			<div className="create-profile">
				<div className="container">
					<div className="row">
						<div className="col-md-8 m-auto">
							<h1 className="display-4 text-center">Create Your profile</h1>
							<p className="lead text-center">
								Fill out the information to complete your profile
							</p>

							<small className="d-block pb-3">* = required fields</small>

							<form onSubmit={this.onSubmit}>
								<TextFieldGroup
									placeholder="* Profile Handle"
									name="handle"
									value={this.state.handle}
									onChange={this.onChange}
									error={errors.handle}
									info="A unqiue alias associated with you."
								/>
								<SelectListGroup
									placeholder="* Non-Professional Status"
									name="status"
									value={this.state.status}
									onChange={this.onChange}
									error={errors.status}
									options={options}
									info="Choose the closest non-professional field that you excel at."
								/>
								<TextFieldGroup
									placeholder="Company"
									name="company"
									value={this.state.company}
									onChange={this.onChange}
									error={errors.company}
									info="A company or organisation if you are associated with any?."
								/>

								<TextFieldGroup
									placeholder="Website"
									name="website"
									value={this.state.website}
									onChange={this.onChange}
									error={errors.website}
									info="Personal or Professional website."
								/>
								<TextFieldGroup
									placeholder="Location"
									name="location"
									value={this.state.location}
									onChange={this.onChange}
									error={errors.location}
									info="City and State"
								/>

								<TextFieldGroup
									placeholder="Skills"
									name="skills"
									value={this.state.skills}
									onChange={this.onChange}
									error={errors.skills}
									info="Please use comma-seperated values as such- Guitar,Oil Paining,..."
								/>

								<TextAreaFieldGroup
									placeholder="Bio"
									name="bio"
									value={this.state.bio}
									onChange={this.onChange}
									error={errors.bio}
									info="Short summary about you."
								/>

								<div className="mb-3">
									<button
										type="button"
										onClick={() => {
											//Toggle display social inputs
											this.setState(prevState => ({
												displaySocialInputs: !prevState.displaySocialInputs
											}));
										}}
										className="btn btn-light"
									>
										Add Social Network Links
									</button>
									<span className="p-3 text-muted">Optional</span>
								</div>

								{socialInputs}
								<input
									type="submit"
									value="Submit"
									className="btn btn-info btn-block m-4"
								/>
							</form>
						</div>
					</div>
				</div>
			</div>
		);
	}
}
CreateProfile.propTypes = {
	profile: PropTypes.object.isRequired,
	errors: PropTypes.object.isRequired
};
const mapStateToProps = state => ({
	profile: state.profile,
	errors: state.errors
});
export default connect(
	mapStateToProps,
	{ createProfile }
)(withRouter(CreateProfile));
