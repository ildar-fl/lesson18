import request from "./http.service";

const qualityEndpoint = "quality/";

const qualityService = {
    delete: async (id) => {
        const { data } = await request.delete(qualityEndpoint + id);
        return data;
    },
    add: async (content) => {
        const { data } = await request.post(qualityEndpoint, content);
        return data;
    },
    update: async (id, content) => {
        const { data } = await request.put(qualityEndpoint + id, content);
        return data;
    },
    get: async (id) => {
        const { data } = await request.get(qualityEndpoint + id);
        return data;
    },
    fetchAll: async () => {
        const { data } = await request.get(qualityEndpoint);
        return data;
    }
};

export default qualityService;
