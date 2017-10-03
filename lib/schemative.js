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

var _createPropTypes = require('./createPropTypes');

var _createPropTypes2 = _interopRequireDefault(_createPropTypes);

var _createDefaults = require('./createDefaults');

var _createDefaults2 = _interopRequireDefault(_createDefaults);

var _createTransform = require('./createTransform');

var _createTransform2 = _interopRequireDefault(_createTransform);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var createSchema = exports.createSchema = function createSchema(definition) {
  var nodes = _tsil2.default.flatten(definition);

  return {
    __schemative__: true,
    PropTypes: (0, _createPropTypes2.default)(nodes),
    Default: (0, _createDefaults2.default)(nodes),
    transform: (0, _createTransform2.default)(nodes)
  };
};
//# sourceMappingURL=schemative.js.map