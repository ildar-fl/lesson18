import React from "react";
import _ from "lodash";
import PropTypes from "prop-types";

const Paginator = ({ currentPage, itemPerPage, totalItems, onPageChange }) => {
    const pageCount = Math.ceil(totalItems / itemPerPage);

    if (pageCount === 1) {
        return null;
    }

    const pages = _.range(1, pageCount + 1);
    return (
        <nav>
            <ul className="pagination">
                {pages.map((page) => (
                    <li
                        className={`page-item${
                            page === currentPage ? " active" : ""
                        }`}
                        key={page}
                    >
                        <a
                            className="page-link"
                            onClick={() => onPageChange(page)}
                        >
                            {page}
                        </a>
                    </li>
                ))}
            </ul>
        </nav>
    );
};

Paginator.propTypes = {
    currentPage: PropTypes.number.isRequired,
    itemPerPage: PropTypes.number.isRequired,
    totalItems: PropTypes.number.isRequired,
    onPageChange: PropTypes.func.isRequired
};

export default Paginator;
