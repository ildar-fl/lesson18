import React from "react";
import Select from "react-select";
import PropTypes from "prop-types";

function MultiSelectField({ name, label, value, options, onChange }) {
    const optionsArray =
        !Array.isArray(options) && typeof options === "object"
            ? Object.values(options).map(({ _id, name }) => ({
                  value: _id,
                  label: name
              }))
            : options;

    const handleChange = (event) => {
        onChange({ name, value: event });
    };

    return (
        <div className="mb-4">
            <label className="form-label">{label}</label>
            <Select
                isMulti
                closeMenuOnSelect={false}
                name={name}
                className="basic-multi-select"
                classNamePrefix="select"
                defaultValue={value}
                options={optionsArray}
                onChange={handleChange}
            />
        </div>
    );
}

MultiSelectField.defaultProps = {
    options: []
};

MultiSelectField.propTypes = {
    name: PropTypes.string,
    label: PropTypes.string,
    value: PropTypes.array,
    options: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
    onChange: PropTypes.func
};

export default MultiSelectField;
