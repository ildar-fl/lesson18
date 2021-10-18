import React, { useState, useEffect } from "react";
import TextField from "../common/form/textField";
import SelectField from "../common/form/selectField";
import RadioField from "../common/form/radioField";
import { validator } from "../../utils/validator";
import api from "../../api";

const validatorConfig = {
    email: {
        isRequired: {
            message: "Электронная почта обязательна для заполнения"
        },
        isEmail: {
            message: "Email не валидный"
        }
    },
    password: {
        isRequired: { message: "Пароль обязателен для заполнения" },
        isCapitalSumbol: {
            message: "Пароль должен содержать хотя бы одну заглавную букву"
        },
        isContainDigit: {
            message: "Пароль должен содержать хотя бы одно число"
        },
        min: {
            message: "Пароль должен состоять минимум из 8-ми символов",
            value: 8
        }
    },
    profession: {
        isRequired: { message: "Профессия должна быть выбрана" }
    }
};

export default function RegisterForm() {
    const [data, setData] = useState({
        email: "",
        password: "",
        profession: "",
        sex: "male"
    });
    const [professions, setProfessions] = useState();
    const [errors, setErrors] = useState({});

    const handleDataChange = ({ name, value }) => {
        setData((prev) => ({ ...prev, [name]: value }));
    };

    useEffect(() => {
        validate();
    }, [data]);

    useEffect(() => {
        api.professions.fetchAll().then((data) => setProfessions(data));
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

        console.log(e);
    };

    const { email, password, profession } = data;

    return (
        <form onSubmit={handleSubmit}>
            <TextField
                label="Email"
                name="email"
                value={email}
                error={errors.email}
                onChange={handleDataChange}
            />
            <TextField
                label="Password"
                type="password"
                name="password"
                value={password}
                error={errors.password}
                onChange={handleDataChange}
            />
            <SelectField
                label="Profession"
                name="profession"
                value={profession}
                error={errors.profession}
                options={professions}
                onChange={handleDataChange}
            />
            <RadioField
                name="sex"
                label="Select sex: "
                value={data.sex}
                options={[
                    { name: "Male", value: "male" },
                    { name: "Female", value: "female" },
                    { name: "It", value: "it" }
                ]}
                onChange={handleDataChange}
            />
            <button
                type="submit"
                disabled={!isValid}
                className="btn btn-primary w-100 mx-auto"
            >
                Submit
            </button>
        </form>
    );
}
