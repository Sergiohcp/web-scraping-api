"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _toConsumableArray2 = require("babel-runtime/helpers/toConsumableArray");

var _toConsumableArray3 = _interopRequireDefault(_toConsumableArray2);

var _regenerator = require("babel-runtime/regenerator");

var _regenerator2 = _interopRequireDefault(_regenerator);

var _asyncToGenerator2 = require("babel-runtime/helpers/asyncToGenerator");

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

var _express = require("express");

var _express2 = _interopRequireDefault(_express);

var _api = require("./api");

var _api2 = _interopRequireDefault(_api);

var _constants = require("./constants");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var app = (0, _express2.default)();

// This function is used to make a axios http request and get the data from file url
var getFilesInfo = function () {
  var _ref = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee(file) {
    var response;
    return _regenerator2.default.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.next = 2;
            return _api2.default.get(_constants.filesURL[file]);

          case 2:
            response = _context.sent;
            return _context.abrupt("return", {
              file: file,
              path: _constants.filesURL[file],
              lines: response.data.match(_constants.regexLines)[0],
              size: response.data.match(_constants.regexSize)[0]
            });

          case 4:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, undefined);
  }));

  return function getFilesInfo(_x) {
    return _ref.apply(this, arguments);
  };
}();

// Here the response is filtered
var filterResults = function filterResults() {
  var response = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];

  var responseFiltered = {
    js: [],
    ts: [],
    json: [],
    others: []
  };

  response.forEach(function (elt) {
    var splittedElt = elt.file.split(".");
    var extensionFound = Object.keys(responseFiltered).find(function (extension) {
      return splittedElt[splittedElt.length - 1] === extension;
    });
    if (extensionFound) {
      responseFiltered[extensionFound] = [].concat((0, _toConsumableArray3.default)(responseFiltered[extensionFound]), [elt]);
      return;
    }
    responseFiltered["others"] = [].concat((0, _toConsumableArray3.default)(responseFiltered["others"]), [elt]);
  });

  return responseFiltered;
};

// This is a default route
app.get("/", function (req, res) {
  res.send({
    message: "Call /financeJS to get results or /financeJS?file=index.js"
  });
});

// This is our route to get data from all files calling /financeJS route, but if you wnat get data from just one
// file, you can call /financeJS?file=index.js for example, passing the name of file to "file="
app.get("/financeJS", function () {
  var _ref2 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee3(req, res) {
    var _this = this;

    var _response, response;

    return _regenerator2.default.wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            _context3.prev = 0;

            if (!(req.query && req.query.file)) {
              _context3.next = 7;
              break;
            }

            _context3.next = 4;
            return getFilesInfo(req.query.file);

          case 4:
            _response = _context3.sent;

            res.send(_response);
            return _context3.abrupt("return");

          case 7:
            _context3.next = 9;
            return Promise.all(_constants.files.map(function () {
              var _ref3 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee2(elt) {
                return _regenerator2.default.wrap(function _callee2$(_context2) {
                  while (1) {
                    switch (_context2.prev = _context2.next) {
                      case 0:
                        _context2.next = 2;
                        return getFilesInfo(elt);

                      case 2:
                        return _context2.abrupt("return", _context2.sent);

                      case 3:
                      case "end":
                        return _context2.stop();
                    }
                  }
                }, _callee2, _this);
              }));

              return function (_x5) {
                return _ref3.apply(this, arguments);
              };
            }()));

          case 9:
            response = _context3.sent;


            res.send(filterResults(response));
            _context3.next = 16;
            break;

          case 13:
            _context3.prev = 13;
            _context3.t0 = _context3["catch"](0);

            res.send({
              error: _context3.t0.message
            });

          case 16:
          case "end":
            return _context3.stop();
        }
      }
    }, _callee3, this, [[0, 13]]);
  }));

  return function (_x3, _x4) {
    return _ref2.apply(this, arguments);
  };
}());

exports.default = app;
//# sourceMappingURL=app.js.map