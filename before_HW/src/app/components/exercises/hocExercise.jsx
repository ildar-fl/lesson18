import React, { useState } from "react";
import PropTypes from "prop-types";
import CollapseWrapper from "../common/collapse";
import CardWrapper from "../common/Card";

function SimpleComponent({ isAuth, onLogin, onLogOut }) {
    return isAuth ? (
        <button className="btn btn-secondary" onClick={onLogOut}>
            Выйти из системы
        </button>
    ) : (
        <button className="btn btn-primary" onClick={onLogin}>
            Войти
        </button>
    );
}

SimpleComponent.propTypes = {
    isAuth: PropTypes.bool.isRequired,
    onLogin: PropTypes.func.isRequired,
    onLogOut: PropTypes.func.isRequired
};

const withLogin = (Component) => () => {
    const [isAuth, setAuth] = useState(!!localStorage.getItem("user"));

    const handleLogin = () => {
        localStorage.setItem("user", "login");
        setAuth(true);
    };

    const handleLogOut = () => {
        localStorage.removeItem("user");
        setAuth(false);
    };

    return (
        <CardWrapper>
            <Component
                isAuth={isAuth}
                onLogOut={handleLogOut}
                onLogin={handleLogin}
            />
        </CardWrapper>
    );
};

const SimpleComponentWithHOC = withLogin(SimpleComponent);

const HocExercise = () => {
    return (
        <CollapseWrapper title="Упражнение">
            <p className="mt-3">
                Вам необходимо реализовать компонент{" "}
                <code>SimpleComponent</code>, который:
            </p>
            <ul>
                <li>
                    Имеет параметры:<code>onLogin</code>, <code>onLogOut</code>,{" "}
                    <code>isAuth</code>
                </li>
                <li>
                    Отображайте кнопку <code>Войти</code>, если пользователь НЕ
                    авторизован.
                </li>
                <li>
                    Отображает кнопку с содержанием{" "}
                    <code>Выйти из системы</code>, если пользователь
                    авторизован.
                </li>
                <li>
                    При нажатии на кнопки вызываются методы <code>onLogin</code>{" "}
                    и <code>onLogOut</code>
                </li>
            </ul>
            <p className="mt-3">
                Вам необходимо <code>HOC</code>, который модицифицует компонент{" "}
                <code>SimpleComponent</code> следующим образом:
            </p>
            <ul>
                <li>
                    Добавляет обертку в виде карточки boostrap (использовать
                    существующий HOC)
                </li>
                <li>
                    Передает параметр <code>isAuth</code>, который является
                    результатом проверки наличия записи с названием{" "}
                    <code>user</code> в <code>localStorage</code>
                </li>
                <li>
                    Передает параметр <code>onLogin</code> и{" "}
                    <code>onLogOut</code> для управления записью с названием{" "}
                    <code>user</code> в <code>localStorage</code>
                </li>
            </ul>
            <SimpleComponentWithHOC />
        </CollapseWrapper>
    );
};

export default HocExercise;
