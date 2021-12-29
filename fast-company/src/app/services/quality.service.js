import request from "./http.service";

const qualityEndpoint = "quality/";

const qualityService = {
    fetchAll: async () => {
        const { data } = await request.get(qualityEndpoint);
        return data;
    }
};

export default qualityService;
