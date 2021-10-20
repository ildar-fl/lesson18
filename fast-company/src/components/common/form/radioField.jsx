import React from "react";
import PropTypes from "prop-types";

function RadioField({ name, label, value, options, onChange }) {
    const handleChange = ({ target }) => onChange(target);

    return (
        <div className="mb-4">
            <label className="mr-4">{label}</label>
            <div>
                {options.map(
                    ({ name: optionName, value: optionValue }, index) => {
                        const id = `${optionName}_${optionValue}`;
                        return (
                            <div
                                key={index}
                                className="form-check form-check-inline"
                            >
                                <input
                                    className="form-check-input"
                                    type="radio"
                                    name={name}
                                    id={id}
                                    checked={optionValue === value}
                                    value={optionValue}
                                    onChange={handleChange}
                                />
                                <label
                                    className="form-check-label"
                                    htmlFor={id}
                                >
                                    {optionName}
                                </label>
                            </div>
                        );
                    }
                )}
            </div>
        </div>
    );
}

RadioField.propTypes = {
    name: PropTypes.string,
    label: PropTypes.label,
    value: PropTypes.string,
    options: PropTypes.array,
    onChange: PropTypes.func
};

export default RadioField;
