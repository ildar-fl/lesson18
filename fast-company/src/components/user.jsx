import React from "react";
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

export default User;
