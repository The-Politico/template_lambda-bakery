"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
const S3_PATH_PREFIX = exports.S3_PATH_PREFIX = 'interactives/2019/lambda-bakery-test/';
const TMP = exports.TMP = process.env.lambda === 'true' ? '/tmp/dist' : './tmp/dist';