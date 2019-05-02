"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

exports.default = async function (templateName, payload) {
  let {
    staticPath,
    renderer
  } = getTemplate(templateName);
  await (0, _ensureTmp2.default)();
  const html = await renderer(payload.data);
  await (0, _fsExtra.writeFile)(_path2.default.join(_locations.TMP, 'index.html'), html);

  if (staticPath) {
    _glob2.default.sync(`${staticPath}/**`).filter(fp => {
      const filename = fp.split('/')[fp.split('/').length - 1];
      return filename.startsWith('client') && filename.endsWith('.js') || filename.startsWith('styles') && filename.endsWith('.css');
    }).forEach(fp => {
      const filename = fp.split('/')[fp.split('/').length - 1];

      _cp2.default.sync(fp, _path2.default.join(_locations.TMP, filename));
    });
  }
};

var _cp = require("cp");

var _cp2 = _interopRequireDefault(_cp);

var _path = require("path");

var _path2 = _interopRequireDefault(_path);

var _fsExtra = require("fs-extra");

var _find = require("lodash/find");

var _find2 = _interopRequireDefault(_find);

var _glob = require("glob");

var _glob2 = _interopRequireDefault(_glob);

var _constants = require("../../../config/constants");

var _errors = require("../constants/errors");

var _locations = require("../constants/locations");

var _ensureTmp = require("./ensureTmp");

var _ensureTmp2 = _interopRequireDefault(_ensureTmp);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const getTemplate = templateName => {
  const type = (0, _find2.default)(_constants.templates, {
    name: templateName
  }, null);

  if (type === null || type === undefined) {
    throw new Error((0, _errors.INVALID_CHAT_TYPE)(templateName));
  }

  return type;
};

;