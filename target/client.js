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
const react_dom_1 = require('react-dom');
const react_router_1 = require('react-router');
const app_1 = require('./app');
const root = document.getElementById('root');
react_router_1.match({ routes: app_1.routes, history: react_router_1.browserHistory }, (err, redirect, renderProps) => {
    react_dom_1.render(React.createElement(react_router_1.Router, __assign({}, renderProps)), root);
});
//# sourceMappingURL=client.js.map