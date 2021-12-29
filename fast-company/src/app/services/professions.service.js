import request from "./http.service";

const professionsEndpoint = "profession/";

const professionsService = {
    get: async (id) => {
        const { data } = await request.get(professionsEndpoint + id);
        return data;
    },
    fetchAll: async () => {
        const { data } = await request.get(professionsEndpoint);
        return data;
    }
};

export default professionsService;
