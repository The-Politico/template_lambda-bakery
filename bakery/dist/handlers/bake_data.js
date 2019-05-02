"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

exports.default = async function (payload) {
  await (0, _ServerUtils.ensureTmp)();
  await (0, _ServerUtils.exportData)(payload.data);
  const url = await (0, _ServerUtils.uploadData)('');
  await (0, _ServerUtils.sweepTmp)();
  return url;
};

var _ServerUtils = require("../utils");

;