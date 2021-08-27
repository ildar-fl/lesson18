import React, { useState } from "react";
import api from "../api";

const Users = () => {
  const [users, setUsers] = useState(api.users.fetchAll());

  const handleDelete = (userId) => {
    setUsers((prev) => prev.filter(({ _id }) => userId !== _id));
  };

  const renderPhrase = (number) => {
    if (number === 0) {
      return <span className="badge bg-danger">Никто с тобой не тусанет</span>;
    }

    const countString =
      number === 1 ? "1 человек тусанёт" : `${number} человек тусанут`;

    return <span className="badge bg-info">{countString} с тобой чегодня</span>;
  };

  return (
    <>
      <h1>{renderPhrase(users.length)}</h1>
      {users.length > 0 && (
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
            {users.map(
              ({
                _id,
                name,
                qualities,
                profession,
                completedMeetings,
                rate,
              }) => {
                return (
                  <tr key={_id}>
                    <th scope="row">{name}</th>
                    <td>
                      {qualities.map(({ _id: badgeId, name, color }) => (
                        <span key={badgeId} className={`badge bg-${color}`}>
                          {name}
                        </span>
                      ))}
                    </td>
                    <td>{profession.name}</td>
                    <td>{completedMeetings}</td>
                    <td>{rate}</td>
                    <td>
                      <button
                        className="btn btn-secondary bg-danger"
                        onClick={() => handleDelete(_id)}
                      >
                        delete
                      </button>
                    </td>
                  </tr>
                );
              }
            )}
          </tbody>
        </table>
      )}
    </>
  );
};

export default Users;
