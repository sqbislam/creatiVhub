const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
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
	User.findOne({ email: req.body.email }).then(user => {
		if (user) {
			return res.status(400).json({ email: "Email already exists" });
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
	email = req.body.email;
	pass = req.body.password;
	User.findOne({ email: email }).then(user => {
		if (!user) {
			return res.status(404).json({ email: "User Not Found" });
		} else {
			bcrypt
				.compare(pass, user.password)
				.then(isMatch => {
					if (isMatch) {
						res.json({ msg: "Success" });
					} else {
						res.status(400).json({ pass: "Password is Incorrect" });
					}
				})
				.catch(err => {
					console.log(err);
				});
		}
	});
});

module.exports = router;
