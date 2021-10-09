import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import PropTypes from "prop-types";
import api from "../../../api";
import Qualitie from "../../ui/qualitie";

const UserPage = ({ userId }) => {
    const history = useHistory();
    const [user, setUser] = useState();

    console.log(userId);

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

UserPage.propTypes = {
    userId: PropTypes.string
};

export default UserPage;
