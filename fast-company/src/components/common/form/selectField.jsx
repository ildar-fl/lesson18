import React from "react";
import PropTypes from "prop-types";

function SelectField({
    label,
    name,
    placeholder,
    value,
    error,
    options,
    onChange
}) {
    const optionsArray =
        !Array.isArray(options) && typeof options === "object"
            ? Object.values(options).map(({ _id, name }) => ({
                  _id,
                  name
              }))
            : options;

    const getSelectClasses = () => {
        return "form-select" + (error ? " is-invalid" : "");
    };
    const handleChange = ({ target }) => {
        onChange(target);
    };

    return (
        <div className="mb-4">
            <label htmlFor="validationDefault04" className="form-label">
                {label}
            </label>
            <select
                className={getSelectClasses()}
                id="validationDefault04"
                placeholder={placeholder}
                name={name}
                value={value}
                onChange={handleChange}
            >
                <option selected={value === ""} value="">
                    Choose...
                </option>
                {optionsArray?.map(({ _id, name }) => (
                    <option key={_id} selected={_id === value} value={_id}>
                        {name}
                    </option>
                ))}
            </select>
            {error && <div className="invalid-feedback">{error}</div>}
        </div>
    );
}

SelectField.propTypes = {
    label: PropTypes.string,
    placeholder: PropTypes.string,
    name: PropTypes.string,
    value: PropTypes.string,
    options: PropTypes.array,
    error: PropTypes.string,
    onChange: PropTypes.func
};

export default SelectField;
