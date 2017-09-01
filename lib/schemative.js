'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.createSchema = undefined;

var _types = require('./types');

Object.keys(_types).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _types[key];
    }
  });
});

var _tsil = require('tsil');

var _tsil2 = _interopRequireDefault(_tsil);

var _parsers = require('./parsers');

var _transform = require('./transform');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var createSchema = exports.createSchema = function createSchema(definition) {
  var nodes = _tsil2.default.flatten(definition);

  return {
    PropTypes: (0, _parsers.createPropTypes)(nodes),
    Default: (0, _parsers.createDefault)(nodes),
    transform: (0, _transform.createTransform)(nodes)
  };
};
//# sourceMappingURL=schemative.js.map