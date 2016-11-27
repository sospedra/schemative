'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.createSchema = exports.shape = exports.objectOf = exports.arrayOf = exports.oneOfType = exports.oneOf = exports.node = exports.instanceOf = exports.element = exports.any = exports.symbol = exports.string = exports.object = exports.number = exports.func = exports.bool = exports.array = undefined;

var _react = require('react');

var _util = require('lodash/util');

var _util2 = _interopRequireDefault(_util);

var _parsers = require('./parsers');

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

var array = exports.array = createType('array', _util2.default.stubArray());
var bool = exports.bool = createType('bool', _util2.default.stubTrue());
var func = exports.func = createType('func', _util2.default.noop());
var number = exports.number = createType('number', -1);
var object = exports.object = createType('object', _util2.default.stubObject());
var string = exports.string = createType('string', _util2.default.stubString());
var symbol = exports.symbol = createType('symbol', Symbol);
var any = exports.any = createType('any', _util2.default.stubTrue());
var element = exports.element = createType('element', _util2.default.stubFalse());
var instanceOf = exports.instanceOf = createType('instanceOf', _util2.default.stubFalse());
var node = exports.node = createType('node', _util2.default.stubFalse());
var oneOf = exports.oneOf = createFunctionType('oneOf');
var oneOfType = exports.oneOfType = createFunctionType('oneOfType');
var arrayOf = exports.arrayOf = createFunctionType('arrayOf');
var objectOf = exports.objectOf = createFunctionType('objectOf');
var shape = exports.shape = createFunctionType('shape');

var createSchema = exports.createSchema = function createSchema(definition) {
  return {
    PropTypes: (0, _parsers.createPropTypes)(definition),
    Default: (0, _parsers.createDefault)(definition),
    transform: _parsers.transform.bind(null, definition)
  };
};
//# sourceMappingURL=schemative.js.map