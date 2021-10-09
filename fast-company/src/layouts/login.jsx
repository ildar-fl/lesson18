import React, { useState } from "react";
import { useParams } from "react-router";
import LoginForm from "../components/ui/loginForm";
import RegisterForm from "../components/ui/registerForm";

const Login = () => {
    const { type } = useParams();
    const [formType, setFormType] = useState(
        type === "register" ? type : "login"
    );

    const toggleFormType = () => {
        setFormType((prev) => (prev === "login" ? "register" : "login"));
    };

    return (
        <div className="container mt-5">
            <div className="row">
                <div className="col-md-6 offset-md-3 shadow p-4">
                    {formType === "register" ? (
                        <React.Fragment>
                            <h3 className="mb-3">Register</h3>
                            <RegisterForm />
                            <p>
                                Alredy have account?{" "}
                                <a role="button" onClick={toggleFormType}>
                                    Sign in
                                </a>
                            </p>
                        </React.Fragment>
                    ) : (
                        <React.Fragment>
                            <h3 className="mb-3">Login</h3>
                            <LoginForm />
                            <p>
                                Dont have account?{" "}
                                <a role="button" onClick={toggleFormType}>
                                    Sign up
                                </a>
                            </p>
                        </React.Fragment>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Login;
