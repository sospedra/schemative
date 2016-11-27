'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.createSchema = exports.shape = exports.oneOfType = exports.oneOf = exports.objectOf = exports.arrayOf = exports.symbol = exports.string = exports.object = exports.node = exports.number = exports.instanceOf = exports.func = exports.element = exports.bool = exports.array = exports.any = undefined;

var _react = require('react');

var _util = require('lodash/util');

var _util2 = _interopRequireDefault(_util);

var _parsers = require('./parsers');

var _transform = require('./transform');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var boundIsRequire = function boundIsRequire(prototype) {
  return Object.defineProperty(prototype, 'isRequired', {
    value: Object.assign({}, prototype, {
      type: prototype.type.isRequired
    })
  });
};

var createType = function createType(type, def) {
  return boundIsRequire({
    type: _react.PropTypes[type],
    default: def,
    iterable: false
  });
};

var createFunctionType = function createFunctionType(type) {
  return function (values) {
    return boundIsRequire({
      type: _react.PropTypes[type],
      values: values,
      iterable: true
    });
  };
};

var any = exports.any = createType('any', _util2.default.stubTrue());
var array = exports.array = createType('array', _util2.default.stubArray());
var bool = exports.bool = createType('bool', _util2.default.stubTrue());
var element = exports.element = createType('element', _util2.default.stubFalse());
var func = exports.func = createType('func', _util2.default.noop());
var instanceOf = exports.instanceOf = createType('instanceOf', _util2.default.stubFalse());
var number = exports.number = createType('number', -1);
var node = exports.node = createType('node', _util2.default.stubFalse());
var object = exports.object = createType('object', _util2.default.stubObject());
var string = exports.string = createType('string', _util2.default.stubString());
var symbol = exports.symbol = createType('symbol', Symbol);
var arrayOf = exports.arrayOf = createFunctionType('arrayOf');
var objectOf = exports.objectOf = createFunctionType('objectOf');
var oneOf = exports.oneOf = createFunctionType('oneOf');
var oneOfType = exports.oneOfType = createFunctionType('oneOfType');
var shape = exports.shape = createFunctionType('shape');

var createSchema = exports.createSchema = function createSchema(definition) {
  return {
    PropTypes: (0, _parsers.createPropTypes)(definition),
    Default: (0, _parsers.createDefault)(definition),
    transform: (0, _transform.createTransform)(definition)
  };
};
//# sourceMappingURL=schemative.js.map