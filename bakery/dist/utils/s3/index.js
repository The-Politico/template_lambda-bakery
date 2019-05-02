"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _sync = require("./sync");

Object.defineProperty(exports, "sync", {
  enumerable: true,
  get: function () {
    return _interopRequireDefault(_sync).default;
  }
});

var _upload = require("./upload");

Object.defineProperty(exports, "upload", {
  enumerable: true,
  get: function () {
    return _interopRequireDefault(_upload).default;
  }
});

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }