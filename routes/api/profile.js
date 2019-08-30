const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const passport = require("passport");

//Load Mongoose Models
const Users = require("../../models/Users");
const Profile = require("../../models/Profile");

//Load Validation
const validateProfileInp = require("../../validation/profile");
const validateExperienceInp = require("../../validation/experience");
const validateEducationInp = require("../../validation/education");

//@route    GET api/profile/test
//@desc     Tests profile route
//@access   Public
router.get("/test", (req, res) => res.json({ msg: "Profile works" }));

//@route    GET api/profile
//@desc     Gets profile of user logged in
//@access   Private
router.get(
	"/",
	passport.authenticate("jwt", { session: false }),
	(req, res) => {
		const errors = {};
		console.log(req.user.id);
		Profile.findOne({ user: req.user.id })
			.populate("user", ["name", "profile_picture"])
			.then(profile => {
				if (!profile) {
					errors.noprofile = "No profile found";
					res.status(404).json(errors);
				}
				res.json(profile);
			})
			.catch(err => res.status(404).json(err));
	}
);

//@route    GET api/profile/handle/:handle
//@desc     Gets profile of user by handle name
//@access   Private
router.get(
	"/handle/:handle",
	passport.authenticate("jwt", { session: false }),
	(req, res) => {
		const errors = {};

		Profile.findOne({ handle: req.params.handle })
			.populate("user", ["name", "profile_picture"])
			.then(profile => {
				if (!profile) {
					errors.noprofile = "No profile found with this Handle";
					res.status(404).json(errors);
				}
				res.json(profile);
			})
			.catch(err => res.status(404).json(err));
	}
);

//@route    GET api/profile/user/:user_id
//@desc     Gets profile of user by user ID
//@access   Private
router.get(
	"/user/:user_id",
	passport.authenticate("jwt", { session: false }),
	(req, res) => {
		const errors = {};

		Profile.findOne({ user: req.params.user_id })
			.populate("user", ["name", "profile_picture"])
			.then(profile => {
				if (!profile) {
					errors.noprofile = "No profile found with this userID";
					res.status(404).json(errors);
				}
				res.json(profile);
			})
			.catch(err => {
				err = "No profile found with this ID";
				res.status(404).json(err);
			});
	}
);

//@route    GET api/profile/all
//@desc     Gets all profiles of users
//@access   Public
router.get(
	"/all",
	passport.authenticate("jwt", { session: false }),
	(req, res) => {
		const errors = {};

		Profile.find()
			.populate("user", ["name", "profile_picture"])
			.then(profiles => {
				if (!profiles) {
					errors.noprofile = "No profiles found";
					res.status(404).json(errors);
				}
				res.json(profiles);
			})
			.catch(err => {
				err = "No profiles found";
				res.status(404).json(err);
			});
	}
);

//@route    POST api/profile
//@desc     Create or Edit Profile of user
//@access   Public
router.post(
	"/",
	passport.authenticate("jwt", { session: false }),
	(req, res) => {
		const { errors, isValid } = validateProfileInp(req.body);

		//Check Validation
		if (!isValid) {
			//Return errors with 400 status
			return res.status(400).json(errors);
		}
		//Get fields
		const profileFields = {};
		profileFields.user = req.user.id;
		if (req.body.handle) profileFields.handle = req.body.handle;
		if (req.body.company) profileFields.company = req.body.company;
		if (req.body.website) profileFields.website = req.body.website;
		if (req.body.location) profileFields.location = req.body.location;
		if (req.body.status) profileFields.status = req.body.status;
		if (req.body.bio) profileFields.bio = req.body.bio;

		//Skills Split into array
		if (typeof req.body.skills !== "undefined") {
			profileFields.skills = req.body.skills.replace(/\s/g, "").split(",");
		}
		//Social
		profileFields.social = {};

		if (req.body.twitter) profileFields.social.twitter = req.body.twitter;
		if (req.body.facebook) profileFields.social.facebook = req.body.facebook;
		if (req.body.youtube) profileFields.social.youtube = req.body.youtube;
		if (req.body.instagram) profileFields.social.instagram = req.body.instagram;
		if (req.body.linkedIn) profileFields.social.linkedIn = req.body.linkedIn;

		Profile.findOne({ user: req.user.id }).then(profile => {
			if (profile) {
				//Update Profile
				Profile.findOneAndUpdate(
					{ user: req.user.id },
					{ $set: profileFields },
					{ new: true }
				).then(profile => {
					res.json(profile);
				});
			} else {
				// Create new Profile

				//Check if handle exists
				Profile.findOne({ handle: profileFields.handle }).then(profile => {
					if (profile) {
						errors.handle = "The Handle exists already";
						res.status(400).json(error);
					}

					//Create and Save new Profile

					new Profile(profileFields).save().then(profile => res.json(profile));
				});
			}
		});
	}
);

//@route    POST api/profile/experience
//@desc     Add Experience to Profile
//@access   Private

router.post(
	"/experience",
	passport.authenticate("jwt", { session: false }),
	(req, res) => {
		const { errors, isValid } = validateExperienceInp(req.body);

		//Check Validation
		if (!isValid) {
			//Return errors with 400 status
			return res.status(400).json(errors);
		}

		Profile.findOne({ user: req.user.id }).then(profile => {
			const newExp = {
				title: req.body.title,
				company: req.body.company,
				location: req.body.location,
				from: req.body.from,
				to: req.body.to,
				current: req.body.current,
				desc: req.body.description
			};

			//Add experience to profile experience array
			profile.experience.unshift(newExp);
			profile.save().then(profile => res.json(profile));
		});
	}
);

//@route    POST api/profile/education
//@desc     Add Education to Profile
//@access   Private

router.post(
	"/education",
	passport.authenticate("jwt", { session: false }),
	(req, res) => {
		const { errors, isValid } = validateEducationInp(req.body);

		//Check Validation
		if (!isValid) {
			//Return errors with 400 status
			return res.status(400).json(errors);
		}

		Profile.findOne({ user: req.user.id }).then(profile => {
			const newEdu = {
				school: req.body.school,
				degree: req.body.degree,
				fieldOfStudy: req.body.fieldofstudy,
				from: req.body.from,
				to: req.body.to,
				current: req.body.current,
				desc: req.body.desc
			};

			//Add education to profile education array
			profile.education.unshift(newEdu);
			profile.save().then(profile => res.json(profile));
		});
	}
);

//@route    DELETE api/profile/experience/:exp_id
//@desc     Delete Experience from Profile
//@access   Private

router.delete(
	"/experience/:exp_id",
	passport.authenticate("jwt", { session: false }),
	(req, res) => {
		Profile.findOne({ user: req.user.id }).then(profile => {
			//Get remove index
			const removeIndex = profile.experience
				.map(item => item.id)
				.indexOf(req.params.exp_id);

			//Splice out of array
			profile.experience.splice(removeIndex, 1);

			profile
				.save()
				.then(profile => res.json(profile))
				.catch(err => res.status(404).json(err));
		});
	}
);

//@route    DELETE api/profile/education/:exp_id
//@desc     Delete Education from Profile
//@access   Private

router.delete(
	"/education/:edu_id",
	passport.authenticate("jwt", { session: false }),
	(req, res) => {
		Profile.findOne({ user: req.user.id }).then(profile => {
			//Get remove index
			const removeIndex = profile.education
				.map(item => item.id)
				.indexOf(req.params.edu_id);

			//Splice out of array
			profile.education.splice(removeIndex, 1);

			profile
				.save()
				.then(profile => res.json(profile))
				.catch(err => res.status(404).json(err));
		});
	}
);

//@route    DELETE api/profile/
//@desc     Delete User and Profile
//@access   Private

router.delete(
	"/",
	passport.authenticate("jwt", { session: false }),
	(req, res) => {
		Profile.findOneAndRemove({ user: req.user.id })
			.then(() => {
				User.findOneAndRemove({ _id: req.user.id })
					.then(() => res.json({ success: true }))
					.catch(err => {
						res.status(404).json(err);
					});
			})
			.catch(err => {
				res.status(404).json(err);
			});
	}
);

module.exports = router;
