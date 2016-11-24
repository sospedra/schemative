'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.transform = exports.filterByKeys = exports.createDefault = exports.createPropTypes = exports.selectRecursiveStrategy = exports.createSchemaByArray = exports.createSchemaByObject = exports.shape = exports.objectOf = exports.arrayOf = exports.oneOfType = exports.oneOf = exports.node = exports.instanceOf = exports.element = exports.any = exports.symbol = exports.string = exports.object = exports.number = exports.func = exports.bool = exports.array = undefined;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

var _react = require('react');

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var createType = function createType(type, def) {
  return {
    propTypes: _react.PropTypes[type],
    value: def,
    iterable: false
  };
};

var createFunctionType = function createFunctionType(type) {
  return function (values) {
    return {
      propTypes: _react.PropTypes[type](values),
      value: values,
      iterable: true
    };
  };
};

var array = exports.array = createType('array', _lodash2.default.stubArray());
var bool = exports.bool = createType('bool', _lodash2.default.stubTrue());
var func = exports.func = createType('func', _lodash2.default.noop());
var number = exports.number = createType('number', -1);
var object = exports.object = createType('object', _lodash2.default.stubObject());
var string = exports.string = createType('string', _lodash2.default.stubString());
var symbol = exports.symbol = createType('symbol', Symbol);
var any = exports.any = createType('any', _lodash2.default.stubTrue());
var element = exports.element = createType('element', _lodash2.default.stubFalse());
var instanceOf = exports.instanceOf = createType('instanceOf', _lodash2.default.stubFalse());
var node = exports.node = createType('node', _lodash2.default.stubFalse());
var oneOf = exports.oneOf = createFunctionType('oneOf');
var oneOfType = exports.oneOfType = createFunctionType('oneOfType');
var arrayOf = exports.arrayOf = createFunctionType('arrayOf');
var objectOf = exports.objectOf = createFunctionType('objectOf');
var shape = exports.shape = createFunctionType('shape');

var createSchemaByObject = exports.createSchemaByObject = function createSchemaByObject(schema, attr) {
  return _lodash2.default.entries(schema).reduce(function (memo, _ref) {
    var _ref2 = _slicedToArray(_ref, 2),
        key = _ref2[0],
        value = _ref2[1];

    memo[key] = value.iterable ? selectRecursiveStrategy(value.value, attr) : value[attr];
    return memo;
  }, {});
};

var createSchemaByArray = exports.createSchemaByArray = function createSchemaByArray(schema, attr) {
  return _lodash2.default.map(schema, function (values) {
    return values.iterable ? selectRecursiveStrategy(values.value, attr) : values[attr];
  });
};

var selectRecursiveStrategy = exports.selectRecursiveStrategy = function selectRecursiveStrategy(nestedSchema, attr) {
  return _lodash2.default.isArray(nestedSchema) ? createSchemaByArray(nestedSchema, attr) : createSchemaByObject(nestedSchema, attr);
};

var createPropTypes = exports.createPropTypes = function createPropTypes(schema) {
  return createSchemaByObject(schema, 'propTypes');
};

var createDefault = exports.createDefault = function createDefault(schema) {
  return createSchemaByObject(schema, 'value');
};

var filterByKeys = exports.filterByKeys = function filterByKeys(schema, candidate) {
  var keys = _lodash2.default.intersection(_lodash2.default.keys(schema), _lodash2.default.keys(candidate));
  return _lodash2.default.pick(candidate, keys);
};

var transform = exports.transform = function transform(schema, candidate, attributes) {
  return _extends({}, filterByKeys(schema, candidate), _lodash2.default.reduce(attributes, function (memo, value, key) {
    return _extends({}, memo, _defineProperty({}, key, _lodash2.default.isFunction(value) ? value(candidate) : value));
  }, {}));
};

exports.default = function (schema) {
  return {
    PropTypes: createPropTypes(schema),
    Default: createDefault(schema),
    transform: transform.bind(null, schema)
  };
};