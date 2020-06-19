"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.handler = undefined;

var _app = require("./app");

var _app2 = _interopRequireDefault(_app);

var _serverlessHttp = require("serverless-http");

var _serverlessHttp2 = _interopRequireDefault(_serverlessHttp);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var handler = (0, _serverlessHttp2.default)(_app2.default);
exports.handler = handler;

// exports.handler = async (event, context) => {
//   return await handler(event, context);
// };

// Local running
// app.listen(3000, function () {
//   console.log("Example app listening on port 3000!");
// });
//# sourceMappingURL=index.js.map