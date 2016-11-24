'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.transform = exports.filterByKeys = exports.createDefault = exports.createPropTypes = exports.selectRecursiveStrategy = exports.createSchemaByArray = exports.createSchemaByObject = undefined;

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

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

var transform = exports.transform = function transform(schema, candidate, mutators) {
  return Object.assign(filterByKeys(schema, candidate), _lodash2.default.reduce(mutators, function (memo, value, key) {
    var _Object$assign;

    return Object.assign((_Object$assign = {}, _defineProperty(_Object$assign, key, _lodash2.default.isFunction(value) ? value(candidate) : value), _defineProperty(_Object$assign, 'memo', memo), _Object$assign));
  }, {}));
};
//# sourceMappingURL=parsers.js.map