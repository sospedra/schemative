'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.createTransform = exports.filterByKeys = undefined;

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var filterByKeys = exports.filterByKeys = function filterByKeys(defsKeys, candidate) {
  var keys = _lodash2.default.intersection(defsKeys, _lodash2.default.keys(candidate));
  return _lodash2.default.pick(candidate, keys);
};

var createTransform = exports.createTransform = function createTransform(definitions) {
  var defsKeys = _lodash2.default.keys(definitions);
  var protoMutators = {};

  var transform = function transform(candidate) {
    var mutators = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : protoMutators;

    return Object.assign(filterByKeys(defsKeys, candidate), _lodash2.default.reduce(mutators, function (memo, value, key) {
      return Object.assign(_defineProperty({}, key, _lodash2.default.isFunction(value) ? value(candidate, defsKeys) : value), memo);
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

  return transform;
};
//# sourceMappingURL=transform.js.map