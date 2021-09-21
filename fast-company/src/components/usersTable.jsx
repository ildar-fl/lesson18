import React from "react";
import PropTypes from "prop-types";
import TableHeader from "./tableHeader";
import TableBody from "./tableBody";
import BookMark from "./bookmark";

const UsersTable = ({
    users,
    onSort,
    currentSort,
    onToggleFavorite,
    onDelete,
    ...rest
}) => {
    const columns = {
        name: { path: "name", name: "Имя" },
        quality: { name: "Качества", component: "quality" },
        profession: { path: "profession.name", name: "Профессия" },
        completedMeetings: {
            path: "completedMeetings",
            name: "Встретился, раз"
        },
        rate: { path: "rate", name: "Оценка" },
        bookmark: {
            path: "favorite",
            name: "Избранное",
            component: ({ _id, favorite }) => (
                <BookMark
                    id={_id}
                    favorite={favorite}
                    onToggleFavorite={onToggleFavorite}
                />
            )
        },
        deleteBtn: {
            component: ({ _id }) => (
                <button
                    type="button"
                    className="btn btn-secondary bg-danger"
                    onClick={() => onDelete(_id)}
                >
                    delete
                </button>
            )
        }
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
    onSort: PropTypes.func.isRequired,
    onToggleFavorite: PropTypes.func,
    onDelete: PropTypes.func
};

export default UsersTable;
