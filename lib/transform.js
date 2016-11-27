'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.transform = exports.filterByKeys = undefined;

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var protoMutators = {};

var filterByKeys = exports.filterByKeys = function filterByKeys(definition, candidate) {
  var keys = _lodash2.default.intersection(_lodash2.default.keys(definition), _lodash2.default.keys(candidate));
  return _lodash2.default.pick(candidate, keys);
};

var transform = exports.transform = function transform(definition, candidate) {
  var mutators = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : protoMutators;

  return Object.assign(filterByKeys(definition, candidate), _lodash2.default.reduce(mutators, function (memo, value, key) {
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
//# sourceMappingURL=transform.js.map