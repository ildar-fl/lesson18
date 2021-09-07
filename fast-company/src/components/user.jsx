import React from "react";
import PropTypes from "prop-types";
import Qualitie from "./qualitie";
import BookMark from "./bookmark";

const User = ({
    _id,
    name,
    qualities,
    profession,
    completedMeetings,
    rate,
    onDelete,
    ...rest
}) => {
    return (
        <tr key={_id}>
            <th scope="row">{name}</th>
            <td>{qualities.map(Qualitie)}</td>
            <td>{profession.name}</td>
            <td>{completedMeetings}</td>
            <td>{rate}</td>
            <td>
                <BookMark id={_id} {...rest} />
            </td>
            <td>
                <button
                    type="button"
                    className="btn btn-secondary bg-danger"
                    onClick={() => onDelete(_id)}
                >
                    delete
                </button>
            </td>
        </tr>
    );
};

User.propTypes = {
    _id: PropTypes.string,
    name: PropTypes.string,
    qualities: PropTypes.array,
    profession: PropTypes.object,
    completedMeetings: PropTypes.number,
    rate: PropTypes.number,
    onDelete: PropTypes.func
};

export default User;
