import React from "react";

const BookMark = ({ id, favorite, onToggleFavorite }) => {
  return (
    <button
      type="button"
      className="btn btn-primary"
      onClick={() => onToggleFavorite(id)}
    >
      <i class={`bi bi-bookmark${favorite ? "-fill" : ""}`}></i>
    </button>
  );
};

export default BookMark;
