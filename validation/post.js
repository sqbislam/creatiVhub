const Validator = require("validator");
const isEmpty = require("./is-empty");

module.exports = function validatePostInp(data) {
	let errors = {};

	//If field empty then set it to empty String
	data.text = !isEmpty(data.text) ? data.text : "";

	//Check for errors in input and add them to errors

	if (!Validator.isLength(data.text, { min: 5, max: 300 })) {
		errors.text = "Post must be within 5 to 300 characters";
	}
	if (Validator.isEmpty(data.text)) {
		errors.text = "Text field is required";
	}

	return { errors, isValid: isEmpty(errors) };
};
