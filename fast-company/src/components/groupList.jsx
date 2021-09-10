import React from "react";
import PropTypes from "prop-types";

const GroupList = ({
    items,
    valueProperty,
    contentProperty,
    selectedItem,
    onItemSelect
}) => {
    return (
        <ul className="list-group">
            {Object.keys(items).map((key) => (
                <li
                    role="button"
                    key={items[key][valueProperty]}
                    className={`list-group-item${
                        selectedItem === items[key] ? " active" : ""
                    }`}
                    onClick={() => onItemSelect(items[key])}
                >
                    {items[key][contentProperty]}
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
