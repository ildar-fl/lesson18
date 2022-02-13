import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { validator } from "../../utils/validator";
import TextField from "../common/form/textField";
import SelectField from "../common/form/selectField";
import RadioField from "../common/form/radio.Field";
import MultiSelectField from "../common/form/multiSelectField";
import CheckBoxField from "../common/form/checkBoxField";
import { useAuth } from "../../hooks/useAuth";
import { useSelector } from "react-redux";
import { getQualities } from "../../store/qualities";
import { getProfessions } from "../../store/professions";

const validatorConfog = {
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
            message: "Имя обязательно для заполнения"
        },
        min: {
            message: "Имя должно состоять как минимум из 3х символов",
            value: 3
        }
    },
    password: {
        isRequired: {
            message: "Пароль обязательна для заполнения"
        },
        isCapitalSymbol: {
            message: "Пароль должен содержать хотя бы одну заглавную букву"
        },
        isContainDigit: {
            message: "Пароль должен содержать хотя бы одно число"
        },
        min: {
            message: "Пароль должен состаять миниму из 8 символов",
            value: 8
        }
    },
    profession: {
        isRequired: {
            message: "Обязательно выберите вашу профессию"
        }
    },
    licence: {
        isRequired: {
            message:
                "Вы не можете использовать наш сервис без подтреврждения лицензионного соглашения"
        }
    }
};

const RegisterForm = () => {
    const history = useHistory();
    const [data, setData] = useState({
        email: "",
        name: "",
        password: "",
        profession: "",
        sex: "male",
        qualities: [],
        licence: false
    });
    const qualities = useSelector(getQualities);
    const professions = useSelector(getProfessions);
    const { signUp } = useAuth();
    const [errors, setErrors] = useState({});

    const qualitiesOption = qualities.map(({ _id, name }) => ({
        label: name,
        value: _id
    }));
    const professionsOption = professions.map(({ _id, name }) => ({
        label: name,
        value: _id
    }));

    const handleChange = (target) => {
        setData((prevState) => ({
            ...prevState,
            [target.name]: target.value
        }));
    };

    useEffect(() => {
        validate();
    }, [data]);

    const validate = () => {
        const errors = validator(data, validatorConfog);
        setErrors(errors);
        return Object.keys(errors).length === 0;
    };
    const isValid = Object.keys(errors).length === 0;

    const handleSubmit = async (e) => {
        e.preventDefault();
        const isValid = validate();
        if (!isValid) return;
        const transformData = {
            ...data,
            qualities: data.qualities.map(({ value }) => value)
        };
        try {
            await signUp(transformData);
            history.push("/");
        } catch (error) {
            setErrors(error);
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <TextField
                label="Электронная почта"
                name="email"
                value={data.email}
                onChange={handleChange}
                error={errors.email}
            />
            <TextField
                label="Имя"
                name="name"
                value={data.name}
                onChange={handleChange}
                error={errors.name}
            />
            <TextField
                label="Пароль"
                type="password"
                name="password"
                value={data.password}
                onChange={handleChange}
                error={errors.password}
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
                options={qualitiesOption}
                onChange={handleChange}
                name="qualities"
                label="Выберите ваши качесвта"
            />
            <CheckBoxField
                value={data.licence}
                onChange={handleChange}
                name="licence"
                error={errors.licence}
            >
                Подтвердить <a>лицензионное соглашение</a>
            </CheckBoxField>
            <button
                type="submit"
                disabled={!isValid}
                className="btn btn-primary w-100 mx-auto"
            >
                Submit
            </button>
        </form>
    );
};

export default RegisterForm;
