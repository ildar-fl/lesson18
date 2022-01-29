import React, { useContext, useState, useEffect } from "react";
import PropTypes from "prop-types";
import { toast } from "react-toastify";
import axios from "axios";
import userService from "../services/user.service";
import localStorageService from "../services/localStorage.service";
import { useHistory } from "react-router-dom";

const httpAuth = axios.create({
    baseURL: "https://identitytoolkit.googleapis.com/v1/",
    params: {
        key: process.env.REACT_APP_FIREBASE_KEY
    }
});
const AuthContext = React.createContext();

const useAuth = () => {
    return useContext(AuthContext);
};

const randomInt = (min, max) => {
    return Math.floor(Math.random() * (max - min + 1) + min);
};

const AuthProvider = ({ children }) => {
    const [user, setUser] = useState();
    const [errors, setErrors] = useState(null);
    const [isLoading, setLoading] = useState(true);
    const history = useHistory();

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
        const url = `accounts:signUp`;
        try {
            const { data } = await httpAuth.post(url, {
                email,
                password,
                returnSecureToken: true
            });
            localStorageService.setToken(data);
            await createUser({
                _id: data.localId,
                email,
                rate: randomInt(1, 5),
                completedMeetings: randomInt(0, 200),
                image: `https://avatars.dicebear.com/api/avataaars/${(
                    Math.random() + 1
                )
                    .toString(36)
                    .substring(7)}.svg`,
                ...other
            });
        } catch (error) {
            catchErrors(error);
        }
    }

    async function signIn({ email, password }) {
        const url = `accounts:signInWithPassword`;
        try {
            const { data } = await httpAuth.post(url, {
                email,
                password,
                returnSecureToken: true
            });
            localStorageService.setToken(data);
            await getUserDate();
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

    async function logOut() {
        localStorageService.removeAuthData();
        setUser(null);
        history.push("/");
    }

    async function getUserDate() {
        try {
            const { content } = await userService.getCurrentUser();
            setUser(content);
        } catch (error) {
            catchErrors(error);
        } finally {
            setLoading(false);
        }
    }

    async function updateUser(user) {
        try {
            const { content } = await userService.create(user);
            console.log(content);
            setUser(content);
        } catch (error) {
            catchErrors(error);
        }
    }

    useEffect(() => {
        if (localStorageService.getAccessToken()) {
            getUserDate();
        } else {
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        if (!errors) {
            toast.error(errors);
            setErrors(null);
        }
    }, [errors]);

    return (
        <AuthContext.Provider
            value={{ user, errors, signUp, signIn, logOut, updateUser }}
        >
            {isLoading ? "Loading..." : children}
        </AuthContext.Provider>
    );
};

AuthProvider.propTypes = {
    children: PropTypes.oneOfType([
        PropTypes.arrayOf(PropTypes.node),
        PropTypes.node
    ])
};

export { AuthProvider, useAuth, httpAuth };
