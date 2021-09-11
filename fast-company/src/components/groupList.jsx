import React from "react";
import PropTypes from "prop-types";

const GroupList = ({
    items,
    valueProperty,
    contentProperty,
    selectedItem,
    onItemSelect
}) => {
    const listItems = Array.isArray(items) ? items : Object.values(items);

    return (
        <ul className="list-group">
            {listItems.map((value) => (
                <li
                    role="button"
                    key={value[valueProperty]}
                    className={`list-group-item${
                        selectedItem === value ? " active" : ""
                    }`}
                    onClick={() => onItemSelect(value)}
                >
                    {value[contentProperty]}
                </li>
            ))}
        </ul>
    );
};

GroupList.defaultProps = {
    valueProperty: "_id",
    contentProperty: "name"
};

GroupList.propTypes = {
    items: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
    valueProperty: PropTypes.string.isRequired,
    contentProperty: PropTypes.string.isRequired,
    selectedItem: PropTypes.object,
    onItemSelect: PropTypes.func
};

export default GroupList;
