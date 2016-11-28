'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.createDefault = exports.createPropTypes = exports.recursiveValues = exports.selectRecursiveStrategy = exports.recursiveArray = exports.recursiveObject = exports.getPropType = undefined;

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
  return selectRecursiveStrategy(definition, 'type');
};

var createDefault = exports.createDefault = function createDefault(definition) {
  return selectRecursiveStrategy(definition, 'default');
};
//# sourceMappingURL=parsers.js.map