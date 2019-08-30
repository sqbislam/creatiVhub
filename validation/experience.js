const Validator = require("validator");
const isEmpty = require("./is-empty");

module.exports = function validateExperienceInp(data) {
	let errors = {};

	//If field empty then set it to empty String
	data.title = !isEmpty(data.title) ? data.title : "";
	data.company = !isEmpty(data.company) ? data.company : "";
	data.from = !isEmpty(data.from) ? data.from : "";

	//Check for errors in input and add them to errors

	if (Validator.isEmpty(data.title)) {
		errors.title = "Title field is Required";
	}

	if (Validator.isEmpty(data.company)) {
		errors.company = "Company field is Required";
	}

	if (Validator.isEmpty(data.from)) {
		errors.from = "From Date field is Required";
	}

	return { errors, isValid: isEmpty(errors) };
};
