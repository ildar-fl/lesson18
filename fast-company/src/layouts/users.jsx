import React from "react";
import { Switch, Route } from "react-router-dom";
import { UserPage, UserForm } from "../components/page/user";
import UsersListPage from "../components/page/usersList";

export default function Users() {
    return (
        <Switch>
            <Route path="/users/:userId/edit" component={UserForm} />
            <Route path="/users/:userId" component={UserPage} />
            <Route path="/users" component={UsersListPage} />
        </Switch>
    );
}
