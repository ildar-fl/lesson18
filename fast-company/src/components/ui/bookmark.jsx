import React from "react";
import PropTypes from "prop-types";

const BookMark = ({ id, favorite, onToggleFavorite }) => {
    return (
        <button
            type="button"
            className="btn btn-primary"
            onClick={() => onToggleFavorite(id)}
        >
            <i className={`bi bi-bookmark${favorite ? "-fill" : ""}`}></i>
        </button>
    );
};

BookMark.propTypes = {
    id: PropTypes.string,
    favorite: PropTypes.bool,
    onToggleFavorite: PropTypes.func
};

export default BookMark;
