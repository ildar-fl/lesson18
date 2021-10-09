import React from "react";
import PropTypes from "prop-types";
import TableHeader from "./tableHeader";
import TableBody from "./tableBody";

const Table = ({ selectedSort, data, columns, onSort, children }) => {
    return (
        <table className="table">
            {children || (
                <React.Fragment>
                    <TableHeader
                        onSort={onSort}
                        selectedSort={selectedSort}
                        columns={columns}
                    />
                    <TableBody data={data} columns={columns} />
                </React.Fragment>
            )}
        </table>
    );
};

Table.propTypes = {
    selectedSort: PropTypes.object,
    data: PropTypes.array.isRequired,
    columns: PropTypes.array,
    onSort: PropTypes.func,
    children: PropTypes.array
};

export default Table;
