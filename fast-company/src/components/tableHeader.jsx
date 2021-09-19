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
                {Object.keys(columns).map((key) => (
                    <th
                        key={key}
                        {...{ role: columns[key].path && "button" }}
                        onClick={
                            columns[key].path
                                ? () => handleSort(columns[key].path)
                                : undefined
                        }
                        scope="col"
                    >
                        {columns[key].name}
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
