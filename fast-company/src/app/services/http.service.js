import axios from "axios";
import { toast } from "react-toastify";
import config from "../config.json";

axios.defaults.baseURL = config.apiEndpoint;

axios.interceptors.response.use(
    (res) => res,
    (error) => {
        console.log("Interseptor");
        const expectedErrors =
            error.response &&
            error.response.status >= 400 &&
            error.status < 500;
        if (!expectedErrors) {
            toast.error("Unexpected error");
        }

        return Promise.reject(error);
    }
);

const request = {
    get: axios.get,
    post: axios.post,
    put: axios.put,
    delete: axios.delete
};

export default request;
