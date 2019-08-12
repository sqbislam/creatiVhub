const Validator = require("validator");
const isEmpty = require("./is-empty");

module.exports = function validateProfileInp(data) {
	let errors = {};

	//If field empty then set it to empty String
	data.handle = !isEmpty(data.handle) ? data.handle : "";
	data.status = !isEmpty(data.status) ? data.status : "";
	data.skills = !isEmpty(data.skills) ? data.skills : "";

	//Check for errors in input and add them to errors

	if (!Validator.isLength(data.handle, { min: 2, max: 40 })) {
		errors.handle = "Handle needs to be betweeen 2 and 40 characters";
	}

	if (Validator.isEmpty(data.handle)) {
		errors.handle = "Handle field is Required";
	}

	if (Validator.isEmpty(data.status)) {
		errors.status = "Status field is Required";
	}

	if (Validator.isEmpty(data.skills)) {
		errors.skills = "Skills field is Required";
	}

	//Check if website fields are emoty and then for valid URL
	if (!isEmpty(data.website)) {
		if (!Validator.isURL(data.website)) {
			errors.website = "Not a Valid Website URL";
		}
	}
	if (!isEmpty(data.youtube)) {
		if (!Validator.isURL(data.youtube)) {
			errors.youtube = "Not a Valid youtube URL";
		}
	}
	if (!isEmpty(data.facebook)) {
		if (!Validator.isURL(data.facebook)) {
			errors.facebook = "Not a Valid facebook URL";
		}
	}
	if (!isEmpty(data.instagram)) {
		if (!Validator.isURL(data.instagram)) {
			errors.instagram = "Not a Valid instagram URL";
		}
	}
	if (!isEmpty(data.linkedIn)) {
		if (!Validator.isURL(data.linkedIn)) {
			errors.linkedIn = "Not a Valid linkedIn URL";
		}
	}

	return { errors, isValid: isEmpty(errors) };
};
