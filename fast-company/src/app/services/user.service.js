import request from "./http.service";

const userEndpoint = "user/";

const userService = {
    delete: async (id) => {
        const { data } = await request.delete(userEndpoint + id);
        return data;
    },
    add: async (content) => {
        const { data } = await request.post(userEndpoint, content);
        return data;
    },
    update: async (id, content) => {
        const { data } = await request.put(userEndpoint + id, content);
        return data;
    },
    get: async (id) => {
        const { data } = await request.get(userEndpoint + id);
        return data;
    },
    fetchAll: async () => {
        const { data } = await request.get(userEndpoint);
        return data;
    }
};

export default userService;
