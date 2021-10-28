import React, { useState, useEffect } from "react";
import { useHistory, useParams } from "react-router-dom";
import PropTypes from "prop-types";
import api from "../../../api";
import Qualitie from "../../ui/qualitie";

const UserPage = () => {
    const { userId } = useParams();
    const history = useHistory();
    const [user, setUser] = useState();

    useEffect(() => {
        api.users.getById(userId).then((data) => setUser(data));
    }, [userId]);

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
            <button onClick={() => history.push(`/users/${userId}/edit`)}>
                Изменить
            </button>
        </React.Fragment>
    );
};

UserPage.propTypes = {
    userId: PropTypes.string
};

export default UserPage;
