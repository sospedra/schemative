'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.transform = exports.filterByKeys = undefined;

var _lodash = require('lodash');

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var protoMutators = {};

var filterByKeys = exports.filterByKeys = function filterByKeys(definition, candidate) {
  var matchingKeys = (0, _lodash.intersection)((0, _lodash.keys)(definition), (0, _lodash.keys)(candidate));
  return (0, _lodash.pick)(candidate, matchingKeys);
};

var transform = exports.transform = function transform(definition, candidate) {
  var mutators = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : protoMutators;

  return Object.assign(filterByKeys(definition, candidate), (0, _lodash.reduce)(mutators, function (memo, value, key) {
    return Object.assign(_defineProperty({}, key, (0, _lodash.isFunction)(value) ? value(candidate) : value), memo);
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