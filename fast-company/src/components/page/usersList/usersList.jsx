import React, { useState, useEffect } from "react";
import _ from "lodash";
import SearchStatus from "../../ui/searchStatus";
import UsersTable from "../../ui/usersTable";
import GroupList from "../../common/groupList";
import TextField from "../../common/form/textField";
import Paginator from "../../common/paginator";
import { paginate } from "../../../utils/paginate";
import api from "../../../api";

const pageSize = 4;

const UsersListPage = () => {
    const [currentPage, setCurrentPage] = useState(1);
    const [selectedProf, setSelectedProf] = useState();
    const [professions, setProfessions] = useState();
    const [sortBy, setSortBy] = useState({ path: "name", order: "asc" });
    const [users, setUsers] = useState(null);
    const [search, setSearch] = useState("");

    useEffect(() => {
        api.users.fetchAll().then((data) => setUsers(data));
        api.professions.fetchAll().then((data) => setProfessions(data));
    }, []);

    const handleDelete = (userId) => {
        setUsers((prev) => prev.filter(({ _id }) => userId !== _id));
    };

    const handleToggleFavorite = (userId) => {
        const userIndex = users.findIndex(({ _id }) => _id === userId);
        const { favorite } = users[userIndex];

        const newUsers = [...users];
        newUsers[userIndex].favorite = !favorite;
        setUsers(newUsers);
    };

    const clearFilter = () => {
        setSelectedProf(null);
    };

    const handleProfSelect = (nextProf) => {
        setSearch("");
        setSelectedProf(nextProf);
        setCurrentPage(1);
    };

    const handleSearch = ({ value }) => {
        clearFilter();
        setSearch(value.toLowerCase());
    };

    if (!users) {
        return "loading";
    }

    const filteredUsers =
        selectedProf || search
            ? users.filter(({ profession: { _id }, name }) =>
                  selectedProf
                      ? selectedProf._id === _id
                      : name.toLowerCase().includes(search)
              )
            : users;
    const countUses = filteredUsers.length;
    const sortedUsers = _.orderBy(filteredUsers, [sortBy.path], [sortBy.order]);
    const userCrop = paginate(sortedUsers, currentPage, pageSize);

    return (
        <React.Fragment>
            <SearchStatus totalItems={countUses} />
            {(countUses > 0 || search) && (
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
                            <TextField
                                name="search"
                                placeholder="Введите имя"
                                value={search}
                                onChange={handleSearch}
                            />
                            <UsersTable
                                users={userCrop}
                                currentSort={sortBy}
                                onSort={setSortBy}
                                onDelete={handleDelete}
                                onToggleFavorite={handleToggleFavorite}
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

export default UsersListPage;
