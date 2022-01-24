import request from "./http.service";
import localStorageService from "./localStorage.service";

const userEndpoint = "user/";

const userService = {
    fetchAll: async () => {
        const { data } = await request.get(userEndpoint);
        return data;
    },
    create: async (payload) => {
        const { data } = await request.put(userEndpoint + payload._id, payload);
        return data;
    },
    get: async (id) => {
        const { data } = await request.get(userEndpoint + id);
        return data;
    },
    getCurrentUser: async () => {
        const { data } = await request.get(
            userEndpoint + localStorageService.getUserId()
        );
        return data;
    }
};

export default userService;
