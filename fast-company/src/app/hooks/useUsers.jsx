import React, { useContext, useState, useEffect, useCallback } from "react";
import PropTypes from "prop-types";
import { toast } from "react-toastify";
import userService from "../services/user.service";

const UserContext = React.createContext();

const useUser = () => {
    return useContext(UserContext);
};

const UserProvider = ({ children }) => {
    const [isLoading, setLoading] = useState(true);
    const [users, setUsers] = useState([]);
    const [errors, setErrors] = useState(null);

    const catchErrors = useCallback((error) => {
        const { message } = error.response.data;
        setErrors(message);
    }, []);

    function getUserById(userId) {
        return users.find(({ _id }) => _id === userId);
    }

    useEffect(() => {
        const getUsers = async () => {
            try {
                const { content } = await userService.fetchAll();
                setUsers(content);
            } catch (error) {
                catchErrors(error);
            } finally {
                setLoading(false);
            }
        };

        getUsers();
    }, []);

    useEffect(() => {
        if (!errors) {
            toast.error(errors);
            setErrors(null);
        }
    }, [errors]);

    return (
        <UserContext.Provider value={{ users, getUserById }}>
            {isLoading ? <h1>Users loading</h1> : children}
        </UserContext.Provider>
    );
};

UserProvider.propTypes = {
    children: PropTypes.oneOfType([
        PropTypes.arrayOf(PropTypes.node),
        PropTypes.node
    ])
};

export { UserProvider, useUser };
