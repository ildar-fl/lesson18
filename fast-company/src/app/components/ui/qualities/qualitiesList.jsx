import React from "react";
import PropTypes from "prop-types";
import Quality from "./quality";
import { useQualities } from "../../../hooks/useQualities";

const QualitiesList = ({ qualitiesIds }) => {
    const { isLoading, getQuality } = useQualities();

    if (isLoading) return "loading...";

    return qualitiesIds.map((id) => <Quality key={id} {...getQuality(id)} />);
};

QualitiesList.propTypes = {
    qualitiesIds: PropTypes.array
};

export default QualitiesList;
