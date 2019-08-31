const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const passport = require("passport");

//Load Models
const Post = require("../../models/Post");
const Profile = require("../../models/Profile");
//Load Validation
const validatePostInp = require("../../validation/post");

//@route    GET api/posts/test
//@desc     Tests posts route
//@access   Public
router.get("/test", (req, res) => res.json({ msg: "Post works" }));

//@route    POST api/posts/
//@desc     Creates a Post route
//@access   Private
router.post(
	"/",
	passport.authenticate("jwt", { session: false }),
	(req, res) => {
		const { errors, isValid } = validatePostInp(req.body);

		//Check Validation
		if (!isValid) {
			//If any errrors send 400 with errors object

			return res.status(400).json(errors);
		}
		const newPost = new Post({
			text: req.body.text,
			name: req.body.name,
			profile_picture: req.body.dp,
			user: req.user.id
		});

		newPost
			.save()
			.then(post => res.json(post))
			.catch(err => res.status(404).json(err));
	}
);

//@route    GET api/posts/
//@desc     Gets Posts
//@access   Public
router.get("/", (req, res) => {
	Post.find()
		.sort({ date: -1 })
		.then(posts => res.json(posts))
		.catch(err => res.status(404).json({ noPostsFound: "No Posts Found" }));
});

//@route    GET api/posts/:id
//@desc     Gets Posts by ID
//@access   Public
router.get("/:id", (req, res) => {
	Post.findById(req.params.id)
		.then(post => res.json(post))
		.catch(err => res.status(404).json({ noPostFound: "No Post Found" }));
});

//@route    DELETE api/posts/:id
//@desc     Deletes Posts by ID
//@access   Private
router.delete(
	"/:id",
	passport.authenticate("jwt", { session: false }),
	(req, res) => {
		Profile.findOne({ user: req.user.id }).then(profile => {
			Post.findById(req.params.id).then(post => {
				//Check for post owner
				if (post.user.toString() !== req.user.id) {
					res.status(401).json({ notAuthorized: "User not authorized" });
				} else {
					post
						.remove()
						.then(() => res.json({ success: true }))
						.catch(err =>
							res.status(404).json({ postNotFound: "No post Found" })
						);
				}
			});
		});
	}
);

//@route    POST api/posts/like/:id
//@desc     Like Posts by ID
//@access   Private
router.post(
	"/like/:id",
	passport.authenticate("jwt", { session: false }),
	(req, res) => {
		Profile.findOne({ user: req.user.id })
			.then(profile => {
				Post.findById(req.params.id)
					.then(post => {
						//Check if user already liked the post
						if (
							post.likes.filter(like => like.user.toString() === req.user.id)
								.length > 0
						) {
							return res
								.status(400)
								.json({ alreadyLiked: "User already liked" });
						}

						//Else add like to post array
						post.likes.unshift({ user: req.user.id });

						post.save().then(post => res.json(post));
					})
					.catch(err => res.status(400).json(err));
			})
			.catch(err => res.status(404).json(err));
	}
);

//@route    POST api/posts/unlike/:id
//@desc     Unlike Post by ID
//@access   Private
router.post(
	"/unlike/:id",
	passport.authenticate("jwt", { session: false }),
	(req, res) => {
		Profile.findOne({ user: req.user.id })
			.then(profile => {
				Post.findById(req.params.id)
					.then(post => {
						//Check if user already liked the post
						if (
							post.likes.filter(like => like.user.toString() === req.user.id)
								.length === 0
						) {
							return res
								.status(400)
								.json({ notLiked: "User has not yet liked the post" });
						}

						//Else remove like from post array

						//Get remove index
						const removeIdx = post.likes
							.map(item => item.user.toString())
							.indexOf(req.user.id);

						//Splice out of array
						post.likes.splice(removeIdx, 1);

						post.save().then(post => res.json(post));
					})
					.catch(err => res.status(400).json(err));
			})
			.catch(err => res.status(404).json(err));
	}
);

//@route    POST api/posts/comment/:id
//@desc     Comment on Post by ID
//@access   Private
router.post(
	"/comment/:id",
	passport.authenticate("jwt", { session: false }),
	(req, res) => {
		const { errors, isValid } = validatePostInp(req.body);

		//Check Validation
		if (!isValid) {
			//If any errrors send 400 with errors object

			return res.status(400).json(errors);
		}
		Post.findById(req.params.id)
			.then(post => {
				const newComment = {
					text: req.body.text,
					name: req.body.name,
					user: req.user.id
				};

				//Add comments to array

				post.comments.unshift(newComment);
				post
					.save()
					.then(post => res.json(post))
					.catch(err => res.json({ error: "No Post found" }));
			})
			.catch(err => res.status(400).json(err));
	}
);

//@route    DELETE api/posts/comment/:id/:comment_id
//@desc     Delete Comment on Post by ID
//@access   Private
router.delete(
	"/comment/:id/:comment_id",
	passport.authenticate("jwt", { session: false }),
	(req, res) => {
		Post.findById(req.params.id)
			.then(post => {
				if (
					post.comments.filter(
						comment => comment._id.toString() === req.params.comment_id
					).length === 0
				) {
					return res
						.status(404)
						.json({ commentNotExists: "Comment Does not Exist" });
				}
				//Delete comments from array
				//Get remove index
				const removeIdx = post.comments
					.map(item => item._id.toString())
					.indexOf(req.params.comment_id);

				//Splice out of array
				post.comments.splice(removeIdx, 1);

				post
					.save()
					.then(post => res.json(post))
					.catch(err => res.json({ error: "No Post found" }));
			})
			.catch(err => res.status(400).json(err));
	}
);
module.exports = router;
