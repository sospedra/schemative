'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.transform = exports.createTransform = exports.filterByKeys = undefined;

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var protoMutators = {};
var defsKeys = {};

var filterByKeys = exports.filterByKeys = function filterByKeys(defsKeys, candidate) {
  var keys = _lodash2.default.intersection(defsKeys, _lodash2.default.keys(candidate));
  return _lodash2.default.pick(candidate, keys);
};

var createTransform = exports.createTransform = function createTransform(definitions) {
  transform.keys = _lodash2.default.keys(definitions);
  return transform;
};

var transform = exports.transform = function transform(candidate) {
  var mutators = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : protoMutators;

  return Object.assign(filterByKeys(defsKeys, candidate), _lodash2.default.reduce(mutators, function (memo, value, key) {
    return Object.assign(_defineProperty({}, key, _lodash2.default.isFunction(value) ? value(candidate) : value), memo);
  }, {}));
};

Object.defineProperty(transform, 'mutators', {
  get: function get() {
    return protoMutators;
  },
  set: function set(mutators) {
    protoMutators = mutators;
  }
});

Object.defineProperty(transform, 'keys', {
  get: function get() {
    return defsKeys;
  },
  set: function set(definitions) {
    defsKeys = definitions;
  }
});
//# sourceMappingURL=transform.js.map