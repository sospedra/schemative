'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.transform = exports.filterByKeys = exports.createDefault = exports.createPropTypes = exports.recursiveValues = exports.selectRecursiveStrategy = exports.recursiveArray = exports.recursiveObject = exports.getPropType = undefined;

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var getPropType = exports.getPropType = function getPropType(prop, attr) {
  return prop.iterable ? recursiveValues(prop, attr) : prop[attr];
};

var recursiveObject = exports.recursiveObject = function recursiveObject(values, attr) {
  return _lodash2.default.reduce(values, function (memo, prop, key) {
    return Object.assign(_defineProperty({}, key, getPropType(prop, attr)), memo);
  }, {});
};

var recursiveArray = exports.recursiveArray = function recursiveArray(values, attr) {
  return _lodash2.default.map(values, function (prop) {
    return getPropType(prop, attr);
  });
};

var selectRecursiveStrategy = exports.selectRecursiveStrategy = function selectRecursiveStrategy(values, attr) {
  return _lodash2.default.isArray(values) ? recursiveArray(values, attr) : recursiveObject(values, attr);
};

var recursiveValues = exports.recursiveValues = function recursiveValues(_ref, attr) {
  var type = _ref.type,
      values = _ref.values;

  var exec = attr === 'type' ? type : _lodash2.default.identity;
  return exec(selectRecursiveStrategy(values, attr));
};

var createPropTypes = exports.createPropTypes = function createPropTypes(definition) {
  return recursiveObject(definition, 'type');
};

var createDefault = exports.createDefault = function createDefault(definition) {
  return recursiveObject(definition, 'default');
};

var filterByKeys = exports.filterByKeys = function filterByKeys(definition, candidate) {
  var keys = _lodash2.default.intersection(_lodash2.default.keys(definition), _lodash2.default.keys(candidate));
  return _lodash2.default.pick(candidate, keys);
};

var transform = exports.transform = function transform(definition, candidate, mutators) {
  return Object.assign(filterByKeys(definition, candidate), _lodash2.default.reduce(mutators, function (memo, value, key) {
    var _Object$assign2;

    return Object.assign((_Object$assign2 = {}, _defineProperty(_Object$assign2, key, _lodash2.default.isFunction(value) ? value(candidate) : value), _defineProperty(_Object$assign2, 'memo', memo), _Object$assign2));
  }, {}));
};
//# sourceMappingURL=parsers.js.map