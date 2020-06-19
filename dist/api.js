"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _axios = require("axios");

var _axios2 = _interopRequireDefault(_axios);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// Watching debugger in Safari i noticed that the files have the following base URL:
// https://github.com/ebradyjobory/finance.js/blob/master/
var api = _axios2.default.create({
  baseURL: "https://github.com/ebradyjobory/finance.js/blob/master",
  timeout: 15000,
  headers: { "X-Custom-Header": "foobar" }
});

exports.default = api;
//# sourceMappingURL=api.js.map