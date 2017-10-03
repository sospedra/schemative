'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.symbol = exports.string = exports.shape = exports.object = exports.number = exports.func = exports.element = exports.bool = exports.array = exports.any = undefined;

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var _lodash = require('lodash');

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var evaluateValueType = function evaluateValueType(candidate, fallback, scalar) {
  if (scalar !== 'any' && (typeof candidate === 'undefined' ? 'undefined' : _typeof(candidate)) !== (typeof fallback === 'undefined' ? 'undefined' : _typeof(fallback))) {
    console.warn('Evalute Schemative type expected', typeof fallback === 'undefined' ? 'undefined' : _typeof(fallback), 'but receive', typeof candidate === 'undefined' ? 'undefined' : _typeof(candidate), 'when', candidate, 'value was set.', 'Default value is returned instead.');

    return fallback;
  }

  return candidate;
};

var charge = function charge(value, base, defaultValue) {
  var charged = (0, _lodash.assign)({}, base, {
    baseIsRequired: false,
    isRequired: undefined
  });
  var properties = (0, _lodash.reduce)(charged, function (memo, value, property) {
    if (property === 'value') return memo;

    return (0, _lodash.assign)({}, memo, _defineProperty({}, property, { get: function get() {
        return value;
      } }));
  }, {});

  console.log(properties);
  return Object.defineProperties({
    value: evaluateValueType(value, defaultValue, base.scalar)
  }, properties);
};

var createType = function createType(scalar, defaultValue) {
  var propType = _propTypes2.default[scalar];
  var base = charge(defaultValue, { scalar: scalar, propType: propType }, defaultValue);
  var type = function type(value) {
    return charge(value, base, defaultValue);
  };

  Object.getOwnPropertyNames(base).forEach(function (property) {
    if (property !== 'value') {
      Object.defineProperty(type, property, {
        get: function get() {
          return base[property];
        }
      });
    } else {
      type[property] = base[property];
    }
  });

  return type;
};

var any = exports.any = createType('any', true);
var array = exports.array = createType('array', []);
var bool = exports.bool = createType('bool', true);
var element = exports.element = createType('element', _lodash.noop);
var func = exports.func = createType('func', _lodash.noop);
var number = exports.number = createType('number', 0);
var object = exports.object = createType('object', {});
var shape = exports.shape = createType('shape', {});
var string = exports.string = createType('string', '');
var symbol = exports.symbol = createType('symbol', Symbol(''));
//# sourceMappingURL=types.js.map