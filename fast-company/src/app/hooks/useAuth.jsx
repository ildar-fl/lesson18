import React, { useContext, useState, useEffect } from "react";
import PropTypes from "prop-types";
import { toast } from "react-toastify";
import axios from "axios";
import userService from "../services/user.service";
import localStorageService from "../services/localStorage.service";

const httpAuth = axios.create();
const AuthContext = React.createContext();

const useAuth = () => {
    return useContext(AuthContext);
};

const AuthProvider = ({ children }) => {
    const [user, setUser] = useState({});
    const [errors, setErrors] = useState(null);

    const catchErrors = (error) => {
        const { message } = error.response.data;
        setErrors(message);
    };

    async function createUser(data) {
        try {
            const { content } = await userService.create(data);
            setUser(content);
        } catch (error) {
            const { code, message } = error.response.data.error;
            if (code === 400) {
                if (message === "EMAIL_EXISTS") {
                    const errorObject = {
                        email: "Пользователь с таким Email уже существует"
                    };
                    throw errorObject;
                }
            }
            catchErrors(error);
        }
    }

    async function signUp({ email, password, ...other }) {
        const url = `https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${process.env.REACT_APP_FIREBASE_KEY}`;
        try {
            const { data } = await httpAuth.post(url, {
                email,
                password,
                returnSecureToken: true
            });
            localStorageService.setToken(data);
            await createUser({ _id: data.localId, email, ...other });
        } catch (error) {
            catchErrors(error);
        }
    }

    useEffect(() => {
        if (!errors) {
            toast.error(errors);
            setErrors(null);
        }
    }, [errors]);

    return (
        <AuthContext.Provider value={{ user, signUp }}>
            {children}
        </AuthContext.Provider>
    );
};

AuthProvider.propTypes = {
    children: PropTypes.oneOfType([
        PropTypes.arrayOf(PropTypes.node),
        PropTypes.node
    ])
};

export { AuthProvider, useAuth };
