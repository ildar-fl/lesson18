import React from "react";

const Counter = ({ id, value, name, onDelete, onIncrement, onDecrement }) => {
  const formCount = () => {
    return value === 0 ? "Zero" : value;
  };

  const styles = {
    fontSize: "12px",
    fontWeight: "bold",
  };

  const getBadgesClasses = () => {
    let classes = "badge m-2 bg-";
    classes += value === 0 ? "danger" : "primary";
    return classes;
  };

  return (
    <div>
      <h4>{name}</h4>
      <span style={styles} className={getBadgesClasses()}>
        {formCount()}
      </span>
      <button
        onClick={() => onIncrement(id)}
        className="btn btn-secondary btn-sm"
      >
        Increment
      </button>
      <button
        disabled={value === 0}
        onClick={() => onDecrement(id)}
        className="btn btn-secondary btn-sm"
      >
        Decrement
      </button>
      <button
        className="btn btn-danger btn-sm m-2"
        onClick={() => onDelete(id)}
      >
        Delete
      </button>
    </div>
  );
};

export default Counter;
