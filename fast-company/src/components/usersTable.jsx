import React from "react";
import PropTypes from "prop-types";
import TableHeader from "./tableHeader";
import TableBody from "./tableBody";

const UsersTable = ({ users, onSort, currentSort, ...rest }) => {
    const columns = {
        name: { path: "name", name: "Имя" },
        quality: { name: "Качества" },
        profession: { path: "profession.name", name: "Профессия" },
        completedMeetings: {
            path: "completedMeetings",
            name: "Встретился, раз"
        },
        rate: { path: "rate", name: "Оценка" },
        bookmark: { path: "bookmark", name: "Избранное" },
        deleteBtn: {}
    };

    return (
        <table className="table">
            <TableHeader
                onSort={onSort}
                selectedSort={currentSort}
                columns={columns}
            />
            <TableBody data={users} columns={columns} />
        </table>
    );
};

UsersTable.propTypes = {
    users: PropTypes.array.isRequired,
    currentSort: PropTypes.object.isRequired,
    onSort: PropTypes.func.isRequired
};

export default UsersTable;
