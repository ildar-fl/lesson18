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

    async function signIn({ email, password }) {
        const url = `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${process.env.REACT_APP_FIREBASE_KEY}`;
        try {
            const { data } = await httpAuth.post(url, {
                email,
                password,
                returnSecureToken: true
            });
            localStorageService.setToken(data);
        } catch (error) {
            const { code, message } = error.response.data.error;
            if (code === 400) {
                if (message === "EMAIL_NOT_FOUND") {
                    const errorObject = {
                        email: "Пользователя с таким Email не существует."
                    };
                    throw errorObject;
                }

                if (message === "INVALID_PASSWORD") {
                    const errorObject = {
                        password: "Неправильный Email или пароль."
                    };
                    throw errorObject;
                }
            }
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
        <AuthContext.Provider value={{ user, errors, signUp, signIn }}>
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
