const Validator = require("validator");
const isEmpty = require("./is-empty");

module.exports = function validateLoginInp(data) {
	let errors = {};

	//If field empty then set it to empty String
	data.email = !isEmpty(data.email) ? data.email : "";
	data.password = !isEmpty(data.password) ? data.password : "";

	//Check for errors in input and add them to errors

	if (!Validator.isEmail(data.email)) {
		errors.email = "Email is invalid";
	}

	if (Validator.isEmpty(data.email)) {
		errors.email = "Email field is Required";
	}

	if (Validator.isEmpty(data.password)) {
		errors.password = "Password field is Required";
	}

	return { errors, isValid: isEmpty(errors) };
};
