import { renderToString } from "react-dom/server";
import React from "react";
import { StaticRouter } from "react-router-dom";
import routers from "../share/router";
import { renderRoutes } from "react-router-config";

export default req => {
    const content = renderToString(
        <StaticRouter location={req.path}>
            {renderRoutes(routers)}
        </StaticRouter>
    )
    return `
        <html>
            <head>
                <title>
                    React SSR
                </title>
            </head>
            <body>
                <div id="root">${content}</div>
                <script src="bundle.js"></script>
            </body>
        </html>
    `
}