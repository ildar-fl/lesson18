import React from "react";
import PropTypes from "prop-types";

const Qualitie = ({ _id, name, color }) => (
    <span key={_id} className={`badge bg-${color}`}>
        {name}
    </span>
);

Qualitie.propTypes = {
    _id: PropTypes.string,
    name: PropTypes.string,
    color: PropTypes.string
};

export default Qualitie;
