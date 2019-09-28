import React from "react";
import classnames from "classnames";
import PropTypes from "prop-types";

const TextAreaFieldGroup = ({
	name,
	placeholder,
	value,
	error,
	info,
	onChange
}) => {
	return (
		<div className="form-group">
			<textarea
				name={name}
				className={classnames("form-control", {
					"is-invalid": error
				})}
				placeholder={placeholder}
				value={value}
				onChange={onChange}
			/>
			{info && <small className="form-text text-muted">{info}</small>}
			{error && <div className="d-block invalid-feedback">{error}</div>}
		</div>
	);
};

TextAreaFieldGroup.propTypes = {
	name: PropTypes.string.isRequired,
	value: PropTypes.string.isRequired,
	placeholder: PropTypes.string,
	error: PropTypes.string,
	info: PropTypes.string,
	onChange: PropTypes.func.isRequired
};

export default TextAreaFieldGroup;
