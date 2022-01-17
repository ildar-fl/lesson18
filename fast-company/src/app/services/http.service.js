import axios from "axios";
import { toast } from "react-toastify";
import configFile from "../config.json";

const http = axios.create({
    baseURL: configFile.apiEndpoint
});

http.interceptors.request.use(
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
    return data && !data._id
        ? Object.keys(data).map((key) => ({ ...data[key] }))
        : data;
}

http.interceptors.response.use(
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
    get: http.get,
    post: http.post,
    put: http.put,
    delete: http.delete
};

export default request;
