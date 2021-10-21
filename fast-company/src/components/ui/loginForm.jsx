import React, { useState, useEffect } from "react";
import TextField from "../common/form/textField";
import CheckBoxField from "../common/form/checkBoxField";
import { validator } from "../../utils/validator";

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
    }
};

function LoginForm() {
    const [data, setData] = useState({
        email: "",
        password: "",
        stayOn: false
    });
    const [errors, setErrors] = useState({});

    const handleDataChange = ({ name, value }) => {
        setData((prev) => ({ ...prev, [name]: value }));
    };

    useEffect(() => {
        validate();
    }, [data]);

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

    const { email, password } = data;

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
            <CheckBoxField
                name="stayOn"
                value={data.stayOn}
                onChange={handleDataChange}
            >
                Оставаться в системе
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
}

export default LoginForm;
