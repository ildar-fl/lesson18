import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import PropTypes from "prop-types";
import Quality from "./quality";
import {
    getQualitiesByIds,
    getQualitiesStateLoading,
    loadQualitiesList
} from "../../../store/qualities";

const QualitiesList = ({ qualitiesIds }) => {
    const dispatch = useDispatch();
    const isLoadingQualities = useSelector(getQualitiesStateLoading);
    const qualities = useSelector(getQualitiesByIds(qualitiesIds));

    useEffect(() => {
        dispatch(loadQualitiesList());
    }, []);

    if (isLoadingQualities) return "loading...";

    return qualities.map(({ _id, ...other }) => (
        <Quality key={_id} {...other} />
    ));
};

QualitiesList.propTypes = {
    qualitiesIds: PropTypes.array
};

export default QualitiesList;
