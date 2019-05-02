"use strict";

var _express = require("express");

var _express2 = _interopRequireDefault(_express);

var _bodyParser = require("body-parser");

var _bodyParser2 = _interopRequireDefault(_bodyParser);

var _cors = require("cors");

var _cors2 = _interopRequireDefault(_cors);

var _morgan = require("morgan");

var _morgan2 = _interopRequireDefault(_morgan);

var _authenticate = require("./utils/authenticate");

var _authenticate2 = _interopRequireDefault(_authenticate);

var _errors = require("./constants/errors");

var _ServerHandlers = require("./handlers");

var _ServerHandlers2 = _interopRequireDefault(_ServerHandlers);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const server = (0, _express2.default)(); // Parsers

server.use(_bodyParser2.default.json({
  type: ['application/json', 'text/plain']
})); // CORS

server.use((0, _cors2.default)()); // Logging

if (!process.env.lambda) {
  server.use((0, _morgan2.default)('dev'));
} // GET Request


server.get('', (req, res) => {
  res.status(200);
  res.send('OK');
}); // POST Request

server.post('', (req, res) => {
  res.setHeader('Content-Type', 'text/plain'); // Authenticate request

  const authenticationError = (0, _authenticate2.default)(req.headers);

  if (authenticationError) {
    res.status(authenticationError.status);
    res.send(authenticationError.toString());
    return;
  } // Check for request action


  if (!req.body.action) {
    const noMethodException = (0, _errors.NO_ACTION_TYPE)();
    res.status(noMethodException.status);
    res.send(noMethodException.toString());
    return;
  } // Check that request action matches a handler


  if (!(req.body.action in _ServerHandlers2.default)) {
    const methodException = (0, _errors.INVALID_ACTION_TYPE)(req.body.action);
    res.status(methodException.status);
    res.send(methodException.toString());
    return;
  } // Execute handler


  const handler = _ServerHandlers2.default[req.body.action];
  handler(req.body).then(msg => {
    res.status(200);
    res.send(msg);
  }).catch(err => {
    if (err.custom) {
      res.status(err.status);
      res.send(err.toString());
    } else {
      const exception = (0, _errors.SERVER_ERROR)();
      res.status(exception.status);
      res.send(exception.toString());
      console.error(err);
    }
  });
});
module.exports = server;