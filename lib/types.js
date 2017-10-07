'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.symbol = exports.string = exports.shape = exports.object = exports.number = exports.func = exports.element = exports.bool = exports.array = exports.any = undefined;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var _lodash = require('lodash');

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var EXPOSED_PROPERTIES = ['value'];

/**
 * Trigger a warning when assigning a value which does not
 * fit with the provided scalar.
 * Return default value.
 *
 * @param  {Any} candidate
 * @param  {Any} fallback
 * @param  {String} scalar
 * @return {Any}
 */
var evaluateValueType = function evaluateValueType(candidate, fallback, scalar) {
  if (scalar !== 'any' && (typeof candidate === 'undefined' ? 'undefined' : _typeof(candidate)) !== (typeof fallback === 'undefined' ? 'undefined' : _typeof(fallback))) {
    console.warn('Evalute Schemative type expected', typeof fallback === 'undefined' ? 'undefined' : _typeof(fallback), 'but receive', typeof candidate === 'undefined' ? 'undefined' : _typeof(candidate), 'when', candidate, 'value was set.', 'Default value is returned instead.');

    return fallback;
  }

  return candidate;
};

var createTypeBase = function createTypeBase(base, isRequired) {
  var propType = _propTypes2.default[base.scalar];

  return _extends({}, base, {
    __required__: !!isRequired,
    propType: isRequired ? propType.isRequired : propType,
    scalar: base.scalar
  });
};

var createPrototype = function createPrototype(value, base, defaultValue) {
  return (0, _lodash.assign)({}, base, {
    isRequired: !base.__required__ && createType(value, createTypeBase(base, true), defaultValue)
  });
};

var createProperties = function createProperties(prototype) {
  return (0, _lodash.reduce)(prototype, function (memo, value, property) {
    if (EXPOSED_PROPERTIES.includes(property)) return memo;
    return (0, _lodash.assign)({}, memo, _defineProperty({}, property, { value: value }));
  }, {});
};

/**
 * Given a value, type base and default value creates an Schemative type.
 * Create the object with the type definition.
 * Pick all the properties that goes to the prototype.
 * Add the properties to an object containing the type exposed values.
 *
 * @param  {Any} value        - Selected value
 * @param  {Object} base      - Contains basic type's data
 *   @param  {String} scalar    - Type name
 *   @param  {Func} propTypes   - React PropTypes equivalent
 * @param  {Any} defaultValue - Default type value
 * @return {Object}           - Type
 */
var createType = function createType(value, base, defaultValue) {
  var prototype = createPrototype(value, base, defaultValue);
  var properties = createProperties(prototype);
  var Type = function Type() {};

  Type.value = evaluateValueType(value, defaultValue, prototype.scalar);

  return Object.defineProperties(Type, properties);
};

var createTypeWithDefault = function createTypeWithDefault(scalar, defaultValue) {
  var base = createType(defaultValue, createTypeBase({ scalar: scalar }), defaultValue);
  var type = function type(value) {
    return createType(value, base, defaultValue);
  };

  Object.setPrototypeOf(type, base);
  type.value = base.value;

  return type;
};

var any = exports.any = createTypeWithDefault('any', true);
var array = exports.array = createTypeWithDefault('array', []);
var bool = exports.bool = createTypeWithDefault('bool', true);
var element = exports.element = createTypeWithDefault('element', _lodash.noop);
var func = exports.func = createTypeWithDefault('func', _lodash.noop);
var number = exports.number = createTypeWithDefault('number', 0);
var object = exports.object = createTypeWithDefault('object', {});
var shape = exports.shape = createTypeWithDefault('shape', {});
var string = exports.string = createTypeWithDefault('string', '');
var symbol = exports.symbol = createTypeWithDefault('symbol', Symbol(''));
//# sourceMappingURL=types.js.map