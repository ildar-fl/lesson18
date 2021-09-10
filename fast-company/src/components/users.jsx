import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import User from "./user";
import Paginator from "./paginator";
import { paginate } from "../utils/paginate";
import GroupList from "./groupList";
import SearchStatus from "./searchStatus";
import api from "../api";

const pageSize = 4;

const Users = ({ users: allUsers, ...rest }) => {
    const [currentPage, setCurrentPage] = useState(1);
    const [selectedProf, setSelectedProf] = useState();
    const [professions, setProfessions] = useState();

    const filteredUsers = selectedProf
        ? allUsers.filter(({ profession }) => selectedProf === profession)
        : allUsers;
    const countUses = filteredUsers.length;
    const userCrop = paginate(filteredUsers, currentPage, pageSize);

    useEffect(() => {
        api.professions.fetchAll().then((data) => setProfessions(data));
    }, []);

    const clearFilter = () => {
        setSelectedProf(null);
    };

    const handleProfSelect = (nextProf) => {
        setSelectedProf(nextProf);
        setCurrentPage(1);
    };

    return (
        <React.Fragment>
            <SearchStatus totalItems={countUses} />
            {countUses > 0 && (
                <React.Fragment>
                    <div className="d-flex">
                        {professions && (
                            <div className="d-flex flex-column flex-shrink-0 p-3">
                                <GroupList
                                    selectedItem={selectedProf}
                                    items={professions}
                                    onItemSelect={handleProfSelect}
                                />
                                <button
                                    className="btn btn-secondary mt-2"
                                    onClick={clearFilter}
                                >
                                    Сбросить фильтр
                                </button>
                            </div>
                        )}
                        <div className="d-flex flex-column">
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
                                        <User
                                            key={user._id}
                                            {...user}
                                            {...rest}
                                        />
                                    ))}
                                </tbody>
                            </table>
                            <div className="d-flex justify-content-center">
                                <Paginator
                                    currentPage={currentPage}
                                    totalItems={countUses}
                                    itemPerPage={pageSize}
                                    onPageChange={setCurrentPage}
                                />
                            </div>
                        </div>
                    </div>
                </React.Fragment>
            )}
        </React.Fragment>
    );
};

Users.propTypes = {
    users: PropTypes.array
};

export default Users;
