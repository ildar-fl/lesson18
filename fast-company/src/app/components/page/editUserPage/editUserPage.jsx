import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { validator } from "../../../utils/validator";
import TextField from "../../common/form/textField";
import SelectField from "../../common/form/selectField";
import RadioField from "../../common/form/radio.Field";
import MultiSelectField from "../../common/form/multiSelectField";
import BackHistoryButton from "../../common/backButton";
import { useAuth } from "../../../hooks/useAuth";
import { useSelector } from "react-redux";
import {
    getQualities,
    getQualitiesStateLoading
} from "../../../store/qualities";
import {
    getProfessions,
    getStateLoadingProfessions
} from "../../../store/professions";

const validatorConfig = {
    email: {
        isRequired: {
            message: "Электронная почта обязательна для заполнения"
        },
        isEmail: {
            message: "Email введен некорректно"
        }
    },
    name: {
        isRequired: {
            message: "Введите ваше имя"
        }
    }
};

const itemToOption = ({ _id, name } = {}) => ({
    label: name,
    value: _id
});
const itemToId = ({ value }) => value;

const EditUserPage = () => {
    const history = useHistory();
    const [isLoading, setLoading] = useState(true);
    const [data, setData] = useState({
        name: "",
        email: "",
        password: "",
        profession: "",
        sex: "male",
        qualities: []
    });

    const { user, updateUser } = useAuth();
    const isLoadingProfessions = useSelector(getStateLoadingProfessions);
    const professions = useSelector(getProfessions);
    const isLoadingQualities = useSelector(getQualitiesStateLoading);
    const qualities = useSelector(getQualities);

    const isLoadingOptions = isLoadingProfessions || isLoadingQualities;
    const qualitiesOption = qualities.map(itemToOption);
    const professionsOption = professions.map(itemToOption);

    const getQuality = (id) => {
        return qualities.find(({ _id }) => _id === id);
    };

    useEffect(() => {
        if (!isLoadingOptions) {
            console.log(user);
            setData({
                ...user,
                qualities: user.qualities?.map((id) =>
                    itemToOption(getQuality(id))
                )
            });
            setLoading(false);
        }
    }, [isLoadingOptions]);

    const [errors, setErrors] = useState({});

    const handleSubmit = (e) => {
        e.preventDefault();
        updateUser({
            ...data,
            qualities: data.qualities.map(itemToId)
        }).then(() => {
            history.push(`/users/${user._id}`);
        });
    };

    useEffect(() => validate(), [data]);

    const handleChange = (target) => {
        setData((prevState) => ({
            ...prevState,
            [target.name]: target.value
        }));
    };

    const validate = () => {
        const errors = validator(data, validatorConfig);
        setErrors(errors);
        return Object.keys(errors).length === 0;
    };

    const isValid = Object.keys(errors).length === 0;

    return (
        <div className="container mt-5">
            <BackHistoryButton />
            <div className="row">
                <div className="col-md-6 offset-md-3 shadow p-4">
                    {!isLoading && (
                        <form onSubmit={handleSubmit}>
                            <TextField
                                label="Имя"
                                name="name"
                                value={data.name}
                                onChange={handleChange}
                                error={errors.name}
                            />
                            <TextField
                                label="Электронная почта"
                                name="email"
                                value={data.email}
                                onChange={handleChange}
                                error={errors.email}
                            />
                            <SelectField
                                label="Выбери свою профессию"
                                name="profession"
                                defaultOption="Choose..."
                                options={professionsOption}
                                onChange={handleChange}
                                value={data.profession}
                                error={errors.profession}
                            />
                            <RadioField
                                options={[
                                    { name: "Male", value: "male" },
                                    { name: "Female", value: "female" },
                                    { name: "Other", value: "other" }
                                ]}
                                value={data.sex}
                                name="sex"
                                onChange={handleChange}
                                label="Выберите ваш пол"
                            />
                            <MultiSelectField
                                defaultValue={data.qualities}
                                options={qualitiesOption}
                                onChange={handleChange}
                                values
                                name="qualities"
                                label="Выберите ваши качесвта"
                            />
                            <button
                                type="submit"
                                disabled={!isValid}
                                className="btn btn-primary w-100 mx-auto"
                            >
                                Обновить
                            </button>
                        </form>
                    )}
                </div>
            </div>
        </div>
    );
};

export default EditUserPage;
