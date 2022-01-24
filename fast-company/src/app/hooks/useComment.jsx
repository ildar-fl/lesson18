import React, { useContext, useEffect, useState } from "react";
import PropTypes from "prop-types";
import { useParams } from "react-router-dom";
import { useAuth } from "./useAuth";
import { nanoid } from "nanoid";
import commentService from "../services/comment.service";
import { toast } from "react-toastify";

const CommentContext = React.createContext();

const useComments = () => {
    return useContext(CommentContext);
};

function CommentsProvider({ children }) {
    const { userId } = useParams();
    const { user: currentUser } = useAuth();
    const [isLoading, setLoading] = useState(true);
    const [comments, setComments] = useState([]);
    const [errors, setErrors] = useState(null);

    const catchErrors = (error) => {
        const { message } = error.response.data;
        setErrors(message);
    };

    useEffect(() => {
        if (!errors) {
            toast.error(errors);
            setErrors(null);
        }
    }, [errors]);

    async function getComments() {
        try {
            setLoading(true);
            const { content } = await commentService.getComments(userId);
            setComments(content);
        } catch (e) {
            catchErrors(e);
        } finally {
            setLoading(false);
        }
    }

    async function removeComment(commentId) {
        try {
            const { content } = await commentService.removeComment(commentId);
            if (!content) {
                setComments((prev) =>
                    prev.filter(({ _id }) => _id !== commentId)
                );
            }
        } catch (e) {
            catchErrors(e);
        }
    }

    useEffect(() => {
        getComments();
    }, [userId]);

    async function createComment(data) {
        const comment = {
            ...data,
            _id: nanoid(),
            pageId: userId,
            userId: currentUser._id,
            created_at: Date.now()
        };
        try {
            const { content } = await commentService.createComment(comment);
            setComments((prev) => [...prev, content]);
        } catch (error) {
            catchErrors(error);
        }
    }

    return (
        <CommentContext.Provider
            value={{ isLoading, comments, createComment, removeComment }}
        >
            {children}
        </CommentContext.Provider>
    );
}

CommentsProvider.propTypes = {
    children: PropTypes.oneOfType([
        PropTypes.arrayOf(PropTypes.node),
        PropTypes.node
    ])
};

export { useComments, CommentsProvider };
