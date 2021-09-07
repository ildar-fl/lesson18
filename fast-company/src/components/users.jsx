import React, { useState } from "react";
import PropTypes from "prop-types";
import User from "./user";
import Paginator from "./paginator";
import { paginate } from "../utils/paginate";

const pageSize = 4;

const Users = ({ users: allUsers, ...rest }) => {
    const [currentPage, setCurrentPage] = useState(1);
    const countUses = allUsers.length;

    const userCrop = paginate(allUsers, currentPage, pageSize);

    return (
        countUses > 0 && (
            <React.Fragment>
                <table className="table">
                    <thead>
                        <tr>
                            <th scope="col">Имя</th>
                            <th scope="col">Качества</th>
                            <th scope="col">Профессия</th>
                            <th scope="col">Встретился, раз</th>
                            <th scope="col">Оценка</th>
                            <th scope="col"></th>
                        </tr>
                    </thead>
                    <tbody>
                        {userCrop.map((user) => (
                            <User key={user._id} {...user} {...rest} />
                        ))}
                    </tbody>
                </table>
                <Paginator
                    currentPage={currentPage}
                    totalItems={countUses}
                    itemPerPage={pageSize}
                    onPageChange={setCurrentPage}
                />
            </React.Fragment>
        )
    );
};

Users.propTypes = {
    users: PropTypes.array
};

export default Users;
