"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _errors = require("../constants/errors");

exports.default = headers => {
  if (!headers.authorization) {
    return (0, _errors.NO_AUTH_HEADER)();
  }

  const match = /^Token (.*)$/.exec(headers.authorization);

  if (!match) {
    return (0, _errors.NO_AUTH_TOKEN)();
  }

  if (match[1] !== process.env.API_VERIFICATION_TOKEN) {
    return (0, _errors.INVALID_AUTH_TOKEN)();
  }

  ;
  return null;
};