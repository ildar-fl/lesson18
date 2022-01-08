import axios from "axios";
import { toast } from "react-toastify";
import configFile from "../config.json";

axios.defaults.baseURL = configFile.apiEndpoint;

axios.interceptors.request.use(
    (config) => {
        if (configFile.isFireBase) {
            const containSlash = /\/$/gi.test(config.url);
            config.url =
                (containSlash ? config.url.slice(0, -1) : config.url) + ".json";
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

function transformData(data) {
    return data ? Object.keys(data).map((key) => ({ ...data[key] })) : [];
}

axios.interceptors.response.use(
    (res) => {
        if (configFile.isFireBase) {
            res.data = { content: transformData(res.data) };
        }
        return res;
    },
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
