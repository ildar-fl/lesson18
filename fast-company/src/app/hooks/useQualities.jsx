import React, { useContext, useEffect, useState } from "react";
import PropTypes from "prop-types";
import { toast } from "react-toastify";
import qualityService from "../services/quality.service";

const QualitiesContext = React.createContext();

const useQualities = () => {
    return useContext(QualitiesContext);
};

const QualitiesProvider = ({ children }) => {
    const [isLoading, setLoading] = useState(true);
    const [qualities, setQualities] = useState([]);
    const [errors, setErrors] = useState(null);

    const catchErrors = (error) => {
        const { message } = error.response.data;
        setErrors(message);
    };

    useEffect(() => {
        const getQualities = async () => {
            try {
                const { content } = await qualityService.fetchAll();
                setQualities(content);
            } catch (error) {
                catchErrors(error);
            } finally {
                setLoading(false);
            }
        };

        getQualities();
    }, []);

    const getQuality = (id) => {
        return qualities.find(({ _id }) => _id === id);
    };

    useEffect(() => {
        if (!errors) {
            toast.error(errors);
            setErrors(null);
        }
    }, [errors]);

    return (
        <QualitiesContext.Provider
            value={{
                isLoading,
                qualities,
                getQuality
            }}
        >
            {children}
        </QualitiesContext.Provider>
    );
};

QualitiesProvider.propTypes = {
    children: PropTypes.oneOfType([
        PropTypes.arrayOf(PropTypes.node),
        PropTypes.node
    ])
};

export { QualitiesProvider, useQualities };
