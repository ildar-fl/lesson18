import React, { useContext, useState, useEffect, useCallback } from "react";
import PropTypes from "prop-types";
import { toast } from "react-toastify";
import professionService from "../services/professions.service";

const ProfessionsContext = React.createContext();

const useProfessions = () => {
    return useContext(ProfessionsContext);
};

const ProfessionsProvider = ({ children }) => {
    const [isLoading, setLoading] = useState(true);
    const [professions, setProfessions] = useState([]);
    const [errors, setErrors] = useState(null);

    const catchErrors = useCallback((error) => {
        const { message } = error.response.data;
        setErrors(message);
    }, []);

    useEffect(() => {
        const getProfessions = async () => {
            try {
                const { content } = await professionService.fetchAll();
                setProfessions(content);
            } catch (error) {
                catchErrors(error);
            } finally {
                setLoading(false);
            }
        };

        getProfessions();
    }, []);

    useEffect(() => {
        if (!errors) {
            toast.error(errors);
            setErrors(null);
        }
    }, [errors]);

    const getProfession = (id) => {
        return professions.find(({ _id }) => _id === id);
    };

    return (
        <ProfessionsContext.Provider
            value={{ isLoading, professions, getProfession }}
        >
            {children}
        </ProfessionsContext.Provider>
    );
};

ProfessionsProvider.propTypes = {
    children: PropTypes.oneOfType([
        PropTypes.arrayOf(PropTypes.node),
        PropTypes.node
    ])
};

export { ProfessionsProvider, useProfessions };
