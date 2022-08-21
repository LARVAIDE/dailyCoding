import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter } from "react-router-dom";
import routers from "../share/router";
import { renderRoutes } from "react-router-config";
import Home from "../share/pages/Home";

ReactDOM.hydrate(
    <BrowserRouter>
        {renderRoutes(routers)}
    </BrowserRouter>
    , document.getElementById("root"))
