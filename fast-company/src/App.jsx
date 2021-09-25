import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import Users from "./layouts/users";
import Login from "./layouts/login";
import Main from "./layouts/main";
import User from "./layouts/user";
import NavBar from "./components/navBar";

const App = () => {
    return (
        <BrowserRouter>
            <NavBar />
            <Switch>
                <Route exact path="/" component={Main} />
                <Route path="/login" component={Login} />
                <Route exact path="/users" component={Users} />
                <Route path="/users/:userId" component={User} />
            </Switch>
        </BrowserRouter>
    );
};

export default App;
