import React from "react";
import PropTypes from "prop-types";
import { Route, Redirect } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";

const ProtectedRoute = ({ component: Component, children, ...other }) => {
    const { user } = useAuth();

    return (
        <Route
            {...other}
            render={(props) => {
                if (user) {
                    return Component ? <Component {...props} /> : children;
                }

                return (
                    <Redirect
                        to={{
                            pathname: "/login",
                            state: {
                                from: props.location
                            }
                        }}
                    />
                );
            }}
        />
    );
};

ProtectedRoute.propTypes = {
    component: PropTypes.func,
    location: PropTypes.object,
    children: PropTypes.oneOfType(
        [PropTypes.arrayOf(PropTypes.node)],
        PropTypes.node
    )
};

export default ProtectedRoute;
