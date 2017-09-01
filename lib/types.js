'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.symbol = exports.string = exports.shape = exports.object = exports.number = exports.func = exports.element = exports.bool = exports.array = exports.any = undefined;

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var _lodash = require('lodash');

var evaluateValueType = function evaluateValueType(candidate, fallback) {
  if ((typeof candidate === 'undefined' ? 'undefined' : _typeof(candidate)) !== (typeof fallback === 'undefined' ? 'undefined' : _typeof(fallback))) {
    console.warn('Evalute Schemative type expected', typeof fallback === 'undefined' ? 'undefined' : _typeof(fallback), 'but receive', typeof candidate === 'undefined' ? 'undefined' : _typeof(candidate), 'when', candidate, 'value was set.', 'Default value is returned instead.');

    return fallback;
  }

  return candidate;
};

var charge = function charge(value, base, defaultValue) {
  var charged = (0, _lodash.assign)({}, base, {
    value: evaluateValueType(value, defaultValue),
    baseIsRequired: false,
    isRequired: undefined
  });

  return (0, _lodash.assign)({}, charged, {
    isRequired: (0, _lodash.assign)({}, charged, { baseIsRequired: true })
  });
};

var createType = function createType(scalar, defaultValue) {
  var base = charge(defaultValue, { scalar: scalar }, defaultValue);
  var type = function type(value) {
    return charge(value, base, defaultValue);
  };

  Object.keys(base).forEach(function (key) {
    type[key] = base[key];
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