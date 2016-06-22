"use strict";
var __assign = (this && this.__assign) || Object.assign || function(t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
        s = arguments[i];
        for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
            t[p] = s[p];
    }
    return t;
};
const React = require('react');
const server_1 = require('react-dom/server');
const react_router_1 = require('react-router');
const Koa = require('koa');
const serve = require('koa-static');
const app_1 = require('./app');
const PORT = process.env.PORT || 3051;
const app = new Koa();
function renderClientHTML(body) {
    return server_1.renderToStaticMarkup(React.createElement("html", null, React.createElement("body", null, React.createElement("div", {id: "root", dangerouslySetInnerHTML: { __html: body }}), React.createElement("script", {src: '/app.js'}))));
}
app.use(serve('/static'));
app.use((ctx, next) => {
    react_router_1.match({ routes: app_1.routes, location: ctx.path }, (err, redirectLocation, renderProps) => {
        if (err) {
            ctx.status = 500;
            ctx.body = err.message;
        }
        else if (redirectLocation) {
            ctx.redirect(redirectLocation.pathname + redirectLocation.search, '/');
        }
        else if (renderProps) {
            ctx.status = 200;
            ctx.body = renderClientHTML(server_1.renderToString(React.createElement(react_router_1.RouterContext, __assign({}, renderProps))));
        }
        else {
            ctx.status = 404;
            ctx.body = 'Not found';
        }
        next();
    });
});
app.listen(PORT);
//# sourceMappingURL=server.js.map