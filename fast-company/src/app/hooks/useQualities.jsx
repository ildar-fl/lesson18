import React, { useContext, useEffect, useState } from "react";
import { toast } from "react-toastify";
import qualityService from "../services/quality.service";

const QualitiesContext = React.createContext();

const useQualities = () => {
    return useContext(QualitiesContext);
};

// eslint-disable-next-line react/prop-types
const QualitiesProvider = ({ children }) => {
    const [isLoading, setLoading] = useState(true);
    const [qualities, setQualities] = useState([]);
    const [errors, setErrors] = useState(null);

    useEffect(() => {
        const getQualities = async () => {
            try {
                const { content } = await qualityService.fetchAll();
                setQualities(content);
            } catch (error) {
                const { message } = error.response.data;
                setErrors(message);
            } finally {
                setLoading(false);
            }
        };

        getQualities();
    }, []);

    const getQuality = (id) => {
        return qualities.find(({ _id }) => _id === id);
    };

    const catchErrors = (error) => {
        const { message } = error.response.data;
        setErrors(message);
    };

    const updateQuality = async ({ _id, ...data }) => {
        try {
            const { content } = await qualityService.update(_id, data);
            setQualities((prev) =>
                prev.map((item) => (item._id === _id ? content : item))
            );
            return content;
        } catch (error) {
            catchErrors(error);
        }
    };

    const addQuality = async (data) => {
        try {
            const { content } = await qualityService.add(data);
            setQualities((prev) => [...prev, content]);
        } catch (error) {
            catchErrors(error);
        }
    };

    const deleteQuality = async (id) => {
        try {
            await qualityService.delete(id);
            setQualities((prev) => prev.filter(({ _id }) => _id !== id));
        } catch (error) {
            catchErrors(error);
        }
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
                getQuality,
                updateQuality,
                addQuality,
                deleteQuality
            }}
        >
            {isLoading ? <h1>Qualities loading</h1> : children}
        </QualitiesContext.Provider>
    );
};

export { QualitiesProvider, useQualities };
