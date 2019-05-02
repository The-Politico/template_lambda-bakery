"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _glob = require("glob");

var _glob2 = _interopRequireDefault(_glob);

var _fsExtra = require("fs-extra");

var _locations = require("../constants/locations");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = () => {
  const files = _glob2.default.sync(`${_locations.TMP}/**`).filter(f => f !== _locations.TMP);

  return Promise.all(files.map(f => {
    return (0, _fsExtra.remove)(f);
  }));
};