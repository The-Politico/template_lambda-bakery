"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _fsExtra = require("fs-extra");

var _locations = require("../constants/locations");

exports.default = () => (0, _fsExtra.ensureDir)(_locations.TMP);