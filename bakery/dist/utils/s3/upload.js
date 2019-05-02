"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _s = require("s3");

var _s2 = _interopRequireDefault(_s);

var _path = require("path");

var _path2 = _interopRequireDefault(_path);

var _merge = require("lodash/merge");

var _merge2 = _interopRequireDefault(_merge);

var _invalidate = require("./invalidate");

var _invalidate2 = _interopRequireDefault(_invalidate);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = ({
  file,
  rename: fn,
  path: fp,
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

  if (!fn) {
    const fileparts = file.split('/');
    fn = fileparts[fileparts.length - 1];
  }

  const key = _path2.default.join(fp, fn);

  const uploadParams = (0, _merge2.default)({}, {
    localFile: file,
    s3Params: {
      Bucket: bucket,
      Key: key,
      CacheControl: 'max-age=300'
    }
  }, customParams);
  const uploader = client.uploadFile(uploadParams);
  return new Promise((resolve, reject) => {
    uploader.on('error', function (err) {
      reject(err);
    });
    uploader.on('end', function () {
      if (invalidate) {
        (0, _invalidate2.default)(process.env.AWS_CLOUDFRONT_DISTRIBUTION, [`/${key}`]).then(() => resolve());
      } else {
        resolve();
      }
    });
  });
};