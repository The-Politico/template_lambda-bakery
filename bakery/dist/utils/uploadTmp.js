"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _path = require("path");

var _path2 = _interopRequireDefault(_path);

var _locations = require("../constants/locations");

var _s3params = require("../constants/s3params");

var _s = require("./s3");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const uploadTmp = async function (fp = '', invalidate = false) {
  const key = _path2.default.join(_locations.S3_PATH_PREFIX, fp);

  await (0, _s.sync)({
    directory: _locations.TMP,
    path: key,
    bucket: process.env.AWS_BUCKET_NAME,
    invalidate: invalidate
  }, _s3params.ASSET);
  return _path2.default.join(process.env.AWS_BUCKET_URL, key);
};

exports.default = uploadTmp;