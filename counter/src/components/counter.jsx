import React, { useState } from "react";

const Counter = () => {
  const [count, setCount] = useState(0);

  const formCount = () => {
    return count === 0 ? "Zero" : count;
  };

  const styles = {
    fontSize: "12px",
    fontWeight: "bold",
  };

  const getBadgesClasses = () => {
    let classes = "badge m-2 bg-";
    classes += count === 0 ? "danger" : "primary";
    return classes;
  };

  return (
    <>
      <span style={styles} className={getBadgesClasses()}>
        {formCount()}
      </span>
      <button
        onClick={() => setCount((prev) => prev + 1)}
        className="btn btn-secondary btn-sm"
      >
        Increment
      </button>
      <button
        disabled={count === 0}
        onClick={() => setCount((prev) => prev - 1)}
        className="btn btn-secondary btn-sm"
      >
        Decrement
      </button>
    </>
  );
};

export default Counter;
