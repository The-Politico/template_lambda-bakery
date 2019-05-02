"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _s = require("s3");

var _s2 = _interopRequireDefault(_s);

var _merge = require("lodash/merge");

var _merge2 = _interopRequireDefault(_merge);

var _invalidate = require("./invalidate");

var _invalidate2 = _interopRequireDefault(_invalidate);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = ({
  directory,
  path,
  bucket,
  invalidate
}, customParams = {}) => {
  const clientOptions = {
    s3Options: {
      accessKeyId: process.env.S3_ACCESS_KEY ? process.env.S3_ACCESS_KEY : process.env.AWS_ACCESS_KEY_ID,
      secretAccessKey: process.env.S3_SECRET_KEY ? process.env.S3_SECRET_KEY : process.env.AWS_SECRET_ACCESS_KEY
    }
  };

  const client = _s2.default.createClient(clientOptions);

  const uploadParams = (0, _merge2.default)({}, {
    localDir: directory,
    deleteRemoved: true,
    s3Params: {
      Bucket: bucket,
      Prefix: path,
      CacheControl: 'max-age=300'
    }
  }, customParams);
  const uploader = client.uploadDir(uploadParams);
  return new Promise((resolve, reject) => {
    uploader.on('error', function (err) {
      reject(err);
    });
    uploader.on('end', function () {
      if (invalidate) {
        (0, _invalidate2.default)(process.env.AWS_CLOUDFRONT_DISTRIBUTION, [`/${path}*`]).then(() => resolve());
      } else {
        resolve();
      }
    });
  });
};