import React from "react";
import { BrowserRouter, Switch, Route, Redirect } from "react-router-dom";
import Users from "./layouts/users";
import Login from "./layouts/login";
import Main from "./layouts/main";
import NavBar from "./components/ui/navBar";

const App = () => {
    return (
        <BrowserRouter>
            <NavBar />
            <Switch>
                <Route path="/users/:userId?" component={Users} />
                <Route path="/login/:type?" component={Login} />
                <Route path="/" component={Main} />
                <Redirect to="/" />
            </Switch>
        </BrowserRouter>
    );
};

export default App;
