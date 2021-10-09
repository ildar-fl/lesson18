import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import Users from "./layouts/users";
import Login from "./layouts/login";
import Main from "./layouts/main";
import NavBar from "./components/ui/navBar";

const App = () => {
    return (
        <BrowserRouter>
            <NavBar />
            <Switch>
                <Route exact path="/" component={Main} />
                <Route path="/login" component={Login} />
                <Route path={["/users/:userId", "/users"]} component={Users} />
            </Switch>
        </BrowserRouter>
    );
};

export default App;
