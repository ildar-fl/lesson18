import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import api from "../../api";
import { formatDate } from "../../utils/formatDate";

function CommentCard({
    _id: id,
    userId,
    pageId,
    created_at: createdAt,
    content,
    onRemove
}) {
    const [disabled, setDisabled] = useState(false);
    const [user, setUser] = useState(null);

    useEffect(() => {
        api.users.getById(userId).then((data) => setUser(data));
    }, [userId]);

    const handleRemove = () => {
        setDisabled(true);
        onRemove(id);
    };

    return (
        <div className="bg-light card-body mb-3">
            <div className="row">
                <div className="col">
                    <div className="d-flex flex-start">
                        <img
                            src="https://avatars.dicebear.com/api/avataaars/qweqasdas.svg"
                            className="rounded-circle shadow-1-strong me-3"
                            alt="avatar"
                            width="65"
                            height="65"
                        />
                        <div className="flex-grow-1 flex-shrink-1">
                            <div className="mb-4">
                                <div className="d-flex justify-content-between align-items-center">
                                    <p className="mb-1">
                                        {user?.name ?? "Загружается..."}{" "}
                                        <span className="small">
                                            {formatDate(createdAt)}
                                        </span>
                                    </p>
                                    <button
                                        disabled={disabled}
                                        className="btn btn-sm text-primary d-flex align-items-center"
                                        onClick={handleRemove}
                                    >
                                        <i className="bi bi-x-lg"></i>
                                    </button>
                                </div>
                                <p className="small mb-0">{content}</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

CommentCard.propTypes = {
    _id: PropTypes.string,
    pageId: PropTypes.string,
    userId: PropTypes.string,
    created_at: PropTypes.string,
    content: PropTypes.string,
    onRemove: PropTypes.func
};

export default CommentCard;
