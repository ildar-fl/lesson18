import { createSlice } from "@reduxjs/toolkit";
import professionService from "../services/professions.service";

const professionsSlice = createSlice({
    name: "professions",
    initialState: {
        entities: [],
        isLoading: true,
        errors: null,
        lastFetch: null
    },
    reducers: {
        professionsRequested: (state) => {
            state.isLoading = true;
        },
        professionsReceived: (state, { payload }) => {
            state.lastFetch = Date.now();
            state.isLoading = false;
            state.entities = payload;
        },
        professionsFailed: (state, { payload }) => {
            state.isLoading = false;
            state.errors = payload;
        }
    }
});

const { reducer: professionReducer, actions } = professionsSlice;
const { professionsRequested, professionsReceived, professionsFailed } =
    actions;

const loadProfessions = () => async (dispatch) => {
    dispatch(professionsRequested());
    try {
        const { content } = await professionService.fetchAll();
        dispatch(professionsReceived(content));
    } catch (error) {
        dispatch(professionsFailed(error.message));
    }
};

const getProfessions = (state) => state.professions.entities;
const getStateLoadingProfessions = (state) => state.professions.isLoading;
const getProfessionById = (id) => (state) => {
    const professions = getProfessions(state);
    return professions.find(({ _id }) => _id === id);
};

export {
    professionReducer,
    loadProfessions,
    getProfessions,
    getProfessionById,
    getStateLoadingProfessions
};
