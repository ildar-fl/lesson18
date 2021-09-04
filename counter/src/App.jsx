import React, { useState } from "react";
import Counters from "./components/counters";
import NavBar from "./components/navBar";

const initialState = [
  { value: 0, id: 1, name: "Ложка" },
  { value: 4, id: 2, name: "Вилка" },
  { value: 0, id: 3, name: "Стартовый набор минималиста" },
  { value: 0, id: 4, name: "Ненужные вещи" },
];

const replaceItem = (arr, item, index) => {
  return [...arr.slice(0, index), item, ...arr.slice(index + 1)];
};

function App() {
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
    <div className="col-lg-8 mx-auto p-3 py-md-5">
      <main>
        <NavBar totalItems={counters.reduce((a, c) => a + c.value, 0)} />
        <Counters
          counters={counters}
          onReset={handleReset}
          onDelete={handleDelete}
          onDecrement={handleDecrement}
          onIncrement={handeIncrement}
        />
      </main>
    </div>
  );
}

export default App;
