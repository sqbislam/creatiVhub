const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const key = require("../../config/keys").secretOrKey;

const passport = require("passport");

//Load input validation
const validateRegisterInp = require("../../validation/register");
const validateLoginInp = require("../../validation/login");

//Load User model
const User = require("../../models/Users");

//@route    GET api/users/test
//@desc     Tests user route
//@access   Public
router.get("/test", (req, res) => res.json({ msg: "Users works" }));

//@route    POST api/users/testpost
//@desc     Tests user post route
//@access   Public
router.post("/testpost", (req, res) => {
	name = req.body.name;
	console.log("Name", name);
});

//@route    POST api/users/register
//@desc     Register User
//@access   Public
router.post("/register", (req, res) => {
	//Validate Input posted

	const { errors, isValid } = validateRegisterInp(req.body);

	//Check validation
	if (!isValid) {
		return res.status(400).json(errors);
	}

	User.findOne({ email: req.body.email }).then(user => {
		if (user) {
			errors.email = "email already exists";
			return res.status(400).json(errors);
		} else {
			const newUser = new User({
				name: req.body.name,
				email: req.body.email,
				password: req.body.password,
				img: "blank for now"
			});

			bcrypt.genSalt(10, (err, salt) => {
				bcrypt.hash(newUser.password, salt, (err, hash) => {
					if (err) throw err;
					newUser.password = hash;
					newUser
						.save()
						.then(user => res.json(user))
						.catch(err => console.log(err));
				});
			});
		}
	});
});

//@route    POST api/users/login
//@desc     User Login route
//@access   Public
router.post("/login", (req, res) => {
	const { errors, isValid } = validateLoginInp(req.body);
	//Check validation
	if (!isValid) {
		return res.status(400).json(errors);
	}

	email = req.body.email;
	pass = req.body.password;
	User.findOne({ email: email }).then(user => {
		if (!user) {
			errors.email = "User Not Found";
			return res.status(404).json(errors);
		} else {
			bcrypt
				.compare(pass, user.password)
				.then(isMatch => {
					if (isMatch) {
						//User email and password matched
						const payload = { id: user.id, name: user.name, img: user.img };

						//Sign Token
						jwt.sign(payload, key, { expiresIn: 7200 }, (err, token) => {
							res.json({ success: true, token: "Bearer " + token });
						});
					} else {
						errors.password = "Password is Incorrect";
						res.status(400).json(errors);
					}
				})
				.catch(err => {
					console.log(err);
				});
		}
	});
});

//@route    GET api/users/current
//@desc     Return current User
//@access   Private

router.get(
	"/current",
	passport.authenticate("jwt", { session: false }),
	(req, res) => {
		const user = {
			id: req.user.id,
			name: req.user.name,
			email: req.user.email,
			image: req.user.profile_picture
		};
		res.json(user);
	}
);

module.exports = router;
