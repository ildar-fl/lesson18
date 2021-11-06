import React, { useState, useEffect } from "react";
import { useHistory, useParams } from "react-router-dom";
import TextField from "../../common/form/textField";
import MultiSelectField from "../../common/form/multiSelectField";
import SelectField from "../../common/form/selectField";
import RadioField from "../../common/form/radioField";
import { validator } from "../../../utils/validator";
import api from "../../../api";

const validatorConfig = {
    email: {
        isRequired: {
            message: "Электронная почта обязательна для заполнения"
        },
        isEmail: {
            message: "Email не валидный"
        }
    }
};

function UserForm() {
    const { userId } = useParams();
    const history = useHistory();
    const [data, setData] = useState(null);
    const [qualities, setQualities] = useState({});
    const [professions, setProfessions] = useState();
    const [errors, setErrors] = useState({});

    const handleDataChange = ({ name, value }) => {
        setData((prev) => ({ ...prev, [name]: value }));
    };

    useEffect(() => {
        validate();
    }, [data]);

    useEffect(async () => {
        api.professions.fetchAll().then((data) => setProfessions(data));
        api.qualities.fetchAll().then((data) => setQualities(data));
        api.users
            .getById(userId)
            .then(({ qualities, profession, ...other }) => {
                setData({
                    ...other,
                    profession: profession._id,
                    qualities: qualities.map(({ _id, name }) => ({
                        value: _id,
                        label: name
                    }))
                });
            });
    }, []);

    const validate = () => {
        const errors = validator(data, validatorConfig);
        setErrors(errors);
        return Object.keys(errors).length === 0;
    };

    const isValid = Object.keys(errors).length === 0;

    const handleSubmit = (e) => {
        e.preventDefault();
        const isValid = validate();
        if (!isValid) return;

        const profession = Object.values(professions).find(
            ({ _id }) => _id === data.profession
        );
        const qualitiesArr = Object.values(qualities);
        const userQualities = data.qualities.map(({ value }) =>
            qualitiesArr.find(({ _id }) => _id === value)
        );

        api.users
            .update(userId, { ...data, profession, qualities: userQualities })
            .then(() => {
                history.goBack();
            });
    };

    if (!data) {
        return "loading...";
    }

    const { email, name, profession, sex, qualities: userQualities } = data;

    return (
        <div className="container mt-5">
            <button
                className="btn btn-primary"
                onClick={() => history.goBack()}
            >
                Назад
            </button>
            <div className="row">
                <div className="col-md-6 offset-md-3 shadow p-4">
                    <form onSubmit={handleSubmit}>
                        <TextField
                            label="Имя"
                            name="name"
                            value={name}
                            error={errors.name}
                            onChange={handleDataChange}
                        />
                        <TextField
                            label="Email"
                            name="email"
                            value={email}
                            error={errors.email}
                            onChange={handleDataChange}
                        />
                        <SelectField
                            label="Профессия"
                            name="profession"
                            value={profession}
                            error={errors.profession}
                            options={professions}
                            onChange={handleDataChange}
                        />
                        <RadioField
                            name="sex"
                            label="Выберите пол:"
                            value={sex}
                            options={[
                                { name: "Male", value: "male" },
                                { name: "Female", value: "female" },
                                { name: "It", value: "it" }
                            ]}
                            onChange={handleDataChange}
                        />
                        <MultiSelectField
                            name="qualities"
                            label="Выберите качества"
                            value={userQualities}
                            options={qualities}
                            onChange={handleDataChange}
                        />
                        <button
                            type="submit"
                            disabled={!isValid}
                            className="btn btn-primary w-100 mx-auto"
                        >
                            Обновить
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
}

UserForm.propTypes = {};

export default UserForm;
