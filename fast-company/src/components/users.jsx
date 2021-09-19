import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import _ from "lodash";
import UsersTable from "./usersTable";
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
    const [sortBy, setSortBy] = useState({ iter: "name", order: "asc" });

    const filteredUsers = selectedProf
        ? allUsers.filter(({ profession: { _id } }) => selectedProf._id === _id)
        : allUsers;
    const countUses = filteredUsers.length;
    const sortedUsers = _.orderBy(filteredUsers, [sortBy.iter], [sortBy.order]);
    const userCrop = paginate(sortedUsers, currentPage, pageSize);

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
                            <UsersTable
                                users={userCrop}
                                currentSort={sortBy}
                                onSort={setSortBy}
                                {...rest}
                            />
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
