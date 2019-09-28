import React from "react";
import classnames from "classnames";
import PropTypes from "prop-types";

const InputGroup = ({
	name,
	placeholder,
	value,

	error,
	icon,
	type,
	onChange
}) => {
	return (
		<div className="input-group mb-3">
			<div className="input-group-prepend">
				<span className="input-group-text">
					<i className={icon}></i>
				</span>
			</div>
			<input
				name={name}
				className={classnames("form-control", {
					"is-invalid": error
				})}
				placeholder={placeholder}
				type={type}
				value={value}
				onChange={onChange}
			/>

			{error && <div className="d-block invalid-feedback">{error}</div>}
		</div>
	);
};

InputGroup.propTypes = {
	name: PropTypes.string.isRequired,
	value: PropTypes.string.isRequired,

	type: PropTypes.string.isRequired,
	placeholder: PropTypes.string,
	error: PropTypes.string,
	icon: PropTypes.string,
	onChange: PropTypes.func.isRequired
};

InputGroup.defaultProps = {
	type: "text"
};
export default InputGroup;
