import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import api from "../api";
import Qualitie from "../components/qualitie";

const User = ({ match, history }) => {
    const [user, setUser] = useState();
    const { userId } = match.params;

    useEffect(() => {
        api.users.getById(userId).then((data) => setUser(data));
    }, [userId]);

    console.log(userId, user);

    if (!user) {
        return "loading";
    }

    return (
        <React.Fragment>
            <h1>{user.name}</h1>
            <h2>Профессия: {user.profession.name}</h2>
            <div>{user.qualities.map(Qualitie)}</div>
            <p>completedMeetings: {user.completedMeetings}</p>
            <p>rate: {user.rate}</p>
            <button onClick={() => history.push("/users")}>
                Все пользователи
            </button>
        </React.Fragment>
    );
};

User.propTypes = {
    match: PropTypes.object,
    history: PropTypes.object
};

export default User;
