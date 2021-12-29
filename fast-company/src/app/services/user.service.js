import request from "./http.service";

const userEndpoint = "user/";

const userService = {
    fetchAll: async () => {
        const { data } = await request.get(userEndpoint);
        return data;
    }
};

export default userService;
