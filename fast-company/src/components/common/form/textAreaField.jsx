import React from "react";
import PropTypes from "prop-types";

const TextAreaField = ({
    label,
    placeholder,
    name,
    rows,
    value,
    error,
    onChange
}) => {
    const getInputClasses = () => {
        return "form-control" + (error ? " is-invalid" : "");
    };

    const handleChange = ({ target }) => onChange(target);

    return (
        <div className="mb-4">
            <label htmlFor={name}>{label}</label>
            <div className="input-group">
                <textarea
                    className={getInputClasses()}
                    placeholder={placeholder}
                    id={name}
                    name={name}
                    rows={rows}
                    value={value}
                    onChange={handleChange}
                />
                {error && <div className="invalid-feedback">{error}</div>}
            </div>
        </div>
    );
};

TextAreaField.defaultProps = {
    rows: "3"
};

TextAreaField.propTypes = {
    label: PropTypes.string,
    type: PropTypes.string,
    placeholder: PropTypes.string,
    name: PropTypes.string,
    rows: PropTypes.string,
    value: PropTypes.string,
    error: PropTypes.string,
    onChange: PropTypes.func
};

export default TextAreaField;
