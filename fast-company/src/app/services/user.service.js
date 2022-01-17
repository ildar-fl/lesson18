import request from "./http.service";

const userEndpoint = "user/";

const userService = {
    fetchAll: async () => {
        const { data } = await request.get(userEndpoint);
        return data;
    },
    create: async (payload) => {
        const { data } = await request.put(userEndpoint + payload._id, payload);
        return data;
    }
};

export default userService;
