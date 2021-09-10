import React, { useState } from "react";
import Users from "./components/users";
import api from "./api";

const App = () => {
    const [users, setUsers] = useState(api.users.fetchAll());

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

    return (
        <Users
            users={users}
            onDelete={handleDelete}
            onToggleFavorite={handleToggleFavorite}
        />
    );
};

export default App;
