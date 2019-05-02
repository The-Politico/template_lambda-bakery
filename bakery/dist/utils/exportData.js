"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _path = require("path");

var _path2 = _interopRequireDefault(_path);

var _fsExtra = require("fs-extra");

var _locations = require("../constants/locations");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const exportData = async function (data) {
  await (0, _fsExtra.writeJson)(_path2.default.join(_locations.TMP, 'data.json'), data);
};

exports.default = exportData;