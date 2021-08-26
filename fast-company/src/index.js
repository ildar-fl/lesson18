import React from "react";
import ReactDom from "react-dom";
import Users from "./components/users";
import "./index.css";
import "bootstrap/dist/css/bootstrap.css";

ReactDom.render(
  <React.StrictMode>
    <Users />
  </React.StrictMode>,
  document.getElementById("root")
);
