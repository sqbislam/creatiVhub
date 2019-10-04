const Validator = require("validator");
const isEmpty = require("./is-empty");

module.exports = function validateEducationInp(data) {
	let errors = {};

	//If field empty then set it to empty String
	data.school = !isEmpty(data.school) ? data.school : "";
	data.degree = !isEmpty(data.degree) ? data.degree : "";
	data.from = !isEmpty(data.from) ? data.from : "";

	//Check for errors in input and add them to errors

	if (Validator.isEmpty(data.school)) {
		errors.school = "School field is Required";
	}

	if (Validator.isEmpty(data.degree)) {
		errors.degree = "Degree field is Required";
	}

	if (Validator.isEmpty(data.fieldOfStudy)) {
		errors.fieldOfStudy = "Field Of Study field is Required";
	}

	if (Validator.isEmpty(data.from)) {
		errors.from = "From Date field is Required";
	}

	return { errors, isValid: isEmpty(errors) };
};
