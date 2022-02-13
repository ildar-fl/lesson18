import { createSlice } from "@reduxjs/toolkit";
import qualityService from "../services/quality.service";

const qualitiesSlice = createSlice({
    name: "qualities",
    initialState: {
        entities: [],
        isLoading: true,
        errors: null,
        lastFetch: null
    },
    reducers: {
        qualitiesRequested: (state) => {
            state.isLoading = true;
        },
        qualitiesReceived: (state, { payload }) => {
            state.lastFetch = Date.now();
            state.entities = payload;
            state.isLoading = false;
        },
        qualitiesRequestFailed: (state, { payload }) => {
            state.isLoading = false;
            state.errors = payload;
        }
    }
});

const { reducer: qualitiesReducer, actions } = qualitiesSlice;
const { qualitiesRequested, qualitiesReceived, qualitiesRequestFailed } =
    actions;

function isOutDated(date) {
    return Date.now() - date > 10 * 60 * 1000;
}

const loadQualitiesList = () => async (dispatch, getState) => {
    const { lastFetch } = getState().qualities;
    if (isOutDated(lastFetch)) {
        dispatch(qualitiesRequested());
        try {
            const { content } = await qualityService.fetchAll();
            dispatch(qualitiesReceived(content));
        } catch (error) {
            dispatch(qualitiesRequestFailed(error.message));
        }
    }
};

const getQualities = (state) => state.qualities.entities;
const getQualitiesStateLoading = (state) => state.qualities.isLoading;
const getQualitiesByIds = (qualitiesIds) => (state) => {
    const qualities = state.qualities.entities;
    return qualitiesIds.map((id) => qualities.find(({ _id }) => _id === id));
};

export {
    qualitiesReducer,
    loadQualitiesList,
    getQualities,
    getQualitiesByIds,
    getQualitiesStateLoading
};
