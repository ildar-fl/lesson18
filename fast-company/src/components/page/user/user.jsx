import React, { useState, useEffect } from "react";
import { useHistory, useParams } from "react-router-dom";
import api from "../../../api";
import Qualitie from "../../ui/qualitie";
import SelectField from "../../common/form/selectField";
import TextAreaField from "../../common/form/textAreaField";
import CommentCard from "../../ui/commentCard";

const UserPage = () => {
    const { userId } = useParams();
    const history = useHistory();
    const [user, setUser] = useState();
    const [users, setUsers] = useState([]);
    const [comments, setComments] = useState([]);
    const [dataComment, setDataComment] = useState({ user: "", comment: "" });

    useEffect(() => {
        api.users.getById(userId).then((data) => setUser(data));
        api.users.fetchAll().then((data) => setUsers(data));
        api.comments
            .fetchCommentsForUser(userId)
            .then((data) => setComments(data));
    }, [userId]);

    const handleDataChange = ({ name, value }) => {
        setDataComment((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmitComment = (event) => {
        event.preventDefault();
        api.comments
            .add({
                userId: dataComment.user,
                pageId: userId,
                content: dataComment.comment
            })
            .then((data) => setComments((prev) => [...prev, data]));
    };

    const handleRemoveComment = async (commentId) => {
        await api.comments.remove(commentId);
        api.comments
            .fetchCommentsForUser(userId)
            .then((data) => setComments(data));
    };

    if (!user) {
        return "loading";
    }

    const isValid = dataComment.user && !!dataComment.comment;

    return (
        <div className="container">
            <div className="row gutters-sm">
                <div className="col-md-4 mb-3">
                    <div className="card mb-3">
                        <div className="card-body">
                            <button
                                className="
                                    position-absolute
                                    top-0
                                    end-0
                                    btn btn-light btn-sm
                                "
                                onClick={() =>
                                    history.push(`/users/${userId}/edit`)
                                }
                            >
                                <i className="bi bi-gear"></i>
                            </button>
                            <div
                                className="
                                    d-flex
                                    flex-column
                                    align-items-center
                                    text-center
                                    position-relative
                                "
                            >
                                <img
                                    src="https://avatars.dicebear.com/api/avataaars/qweqwdas.svg"
                                    className="rounded-circle"
                                    width="150"
                                />
                                <div className="mt-3">
                                    <h4>{user.name}</h4>
                                    <p className="text-secondary mb-1">
                                        {user.profession.name}
                                    </p>
                                    <div className="text-muted">
                                        <i
                                            className="
                                                bi bi-caret-down-fill
                                                text-primary
                                            "
                                            role="button"
                                        ></i>
                                        <i
                                            className="
                                                bi bi-caret-up
                                                text-secondary
                                            "
                                            role="button"
                                        ></i>
                                        <span className="ms-2">
                                            {user.rate}
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="card mb-3">
                        <div
                            className="
                                card-body
                                d-flex
                                flex-column
                                justify-content-center
                                text-center
                            "
                        >
                            <h5 className="card-title">
                                <span>Qualities</span>
                            </h5>
                            <p className="card-text">
                                {user.qualities.map(Qualitie)}
                            </p>
                        </div>
                    </div>
                    <div className="card mb-3">
                        <div
                            className="
                                    card-body
                                    d-flex
                                    flex-column
                                    justify-content-center
                                    text-center
                                "
                        >
                            <h5 className="card-title">
                                <span>Completed meetings</span>
                            </h5>

                            <h1 className="display-1">
                                {user.completedMeetings}
                            </h1>
                        </div>
                    </div>
                </div>
                <div className="col-md-8">
                    <div className="card mb-2">
                        <div className="card-body">
                            <form onSubmit={handleSubmitComment}>
                                <h2>New comment</h2>
                                <SelectField
                                    label="Выберите пользователя"
                                    name="user"
                                    value={dataComment.user}
                                    options={users}
                                    onChange={handleDataChange}
                                />
                                <TextAreaField
                                    label="Сообщение"
                                    name="comment"
                                    value={dataComment.comment}
                                    onChange={handleDataChange}
                                />
                                <button
                                    type="submit"
                                    className="btn btn-primary"
                                    disabled={!isValid}
                                >
                                    Опубликовать
                                </button>
                            </form>
                        </div>
                    </div>
                    {comments.length > 0 && (
                        <div className="card mb-3">
                            <div className="card-body">
                                <h2>Comments</h2>
                                <hr />
                                {comments.map((comment) => (
                                    <CommentCard
                                        key={comment._id}
                                        {...comment}
                                        onRemove={handleRemoveComment}
                                    />
                                ))}
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

UserPage.propTypes = {};

export default UserPage;
