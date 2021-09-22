import React from "react";
import PropTypes from "prop-types";

const TableHeader = ({ selectedSort, columns, onSort }) => {
    const handleSort = (keySort) => {
        if (selectedSort.path === keySort) {
            onSort({
                ...selectedSort,
                order: selectedSort.order === "asc" ? "desc" : "asc"
            });
        } else {
            onSort({ path: keySort, order: "asc" });
        }
    };

    return (
        <thead>
            <tr>
                {Object.entries(columns).map(([key, { path, name }]) => (
                    <th
                        key={key}
                        {...{ role: path && "button" }}
                        onClick={path ? () => handleSort(path) : undefined}
                        scope="col"
                    >
                        {name}
                        {selectedSort.path === path && (
                            <i
                                className={`bi ${
                                    selectedSort.order === "asc"
                                        ? "bi-caret-up-fill"
                                        : "bi-caret-down-fill"
                                }`}
                            ></i>
                        )}
                    </th>
                ))}
            </tr>
        </thead>
    );
};

TableHeader.propTypes = {
    columns: PropTypes.object,
    onSort: PropTypes.func,
    selectedSort: PropTypes.object
};

export default TableHeader;
