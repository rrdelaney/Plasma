"use strict";
const React = require('react');
const react_router_1 = require('react-router');
const App = {
    English() {
        return React.createElement("div", null, "Hello world!");
    },
    Spanish() {
        return React.createElement("div", null, "Hõla world!");
    }
};
exports.routes = React.createElement(react_router_1.Router, {history: react_router_1.browserHistory}, React.createElement(react_router_1.Route, {path: '/', component: App.English}), React.createElement(react_router_1.Route, {path: '/es', component: App.Spanish}));
//# sourceMappingURL=app.js.map