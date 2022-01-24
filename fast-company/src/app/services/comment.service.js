import request from "./http.service";

const commentEndpoint = "comment/";

const commentService = {
    getComments: async (pageId) => {
        const { data } = await request.get(commentEndpoint, {
            params: {
                orderBy: '"pageId"',
                equalTo: `"${pageId}"`
            }
        });
        return data;
    },
    createComment: async (data) => {
        const { data: resultData } = await request.put(
            commentEndpoint + data._id,
            data
        );
        return resultData;
    },
    removeComment: async (commentId) => {
        const { data } = await request.delete(commentEndpoint + commentId);
        return data;
    }
};

export default commentService;
