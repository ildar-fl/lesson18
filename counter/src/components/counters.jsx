import React, { useState } from "react";
import Counter from "./counter";

const initialState = [
  { value: 0, id: 1, name: "Ложка" },
  { value: 4, id: 2, name: "Вилка" },
  { value: 0, id: 3, name: "Стартовый набор минималиста" },
  { value: 0, id: 4, name: "Ненужные вещи" },
];

const replaceItem = (arr, item, index) => {
  return [...arr.slice(0, index), item, ...arr.slice(index + 1)];
};

const Counters = () => {
  const [counters, setCounters] = useState(initialState);

  const handleDelete = (id) => {
    const newCounters = counters.filter(
      ({ id: counterId }) => counterId !== id
    );
    setCounters(newCounters);
  };

  const handleReset = () => {
    setCounters(initialState);
  };

  const handeIncrement = (counterId) => {
    const counterIndex = counters.findIndex(({ id }) => id === counterId);
    const { value, ...counter } = counters[counterIndex];
    const newCounters = replaceItem(
      counters,
      { ...counter, value: value + 1 },
      counterIndex
    );
    console.log(counters, newCounters);
    setCounters(newCounters);
  };

  const handleDecrement = (counterId) => {
    const counterIndex = counters.findIndex(({ id }) => id === counterId);
    const { value, ...counter } = counters[counterIndex];
    const newCounters = replaceItem(
      counters,
      { ...counter, value: value - 1 },
      counterIndex
    );
    setCounters(newCounters);
  };

  return (
    <div>
      <button className="btn btn-primary btn-sm m-2" onClick={handleReset}>
        Сброс
      </button>
      {counters.map((counter) => (
        <Counter
          key={counter.id}
          {...counter}
          onDelete={handleDelete}
          onIncrement={handeIncrement}
          onDecrement={handleDecrement}
        />
      ))}
    </div>
  );
};

export default Counters;
