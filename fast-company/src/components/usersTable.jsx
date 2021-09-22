import React from "react";
import PropTypes from "prop-types";
import BookMark from "./bookmark";
import Qualitie from "./qualitie";
import Table from "./table";

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
        quality: {
            name: "Качества",
            component: ({ qualities }) => qualities.map(Qualitie)
        },
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
            <Table
                selectedSort={currentSort}
                data={users}
                columns={columns}
                onSort={onSort}
            />
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
