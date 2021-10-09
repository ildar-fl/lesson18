import React from "react";
import { useParams } from "react-router-dom";
import UserPage from "../components/page/user";
import UsersListPage from "../components/page/usersList";

export default function Users() {
    const { userId } = useParams();

    console.log(userId);

    return userId ? <UserPage userId={userId} /> : <UsersListPage />;
}
