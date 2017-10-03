'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _tsil = require('tsil');

var _tsil2 = _interopRequireDefault(_tsil);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = function (nodes) {
  var defaultValues = _tsil2.default.modify(nodes, function (node) {
    return node.value;
  });
  console.log(defaultValues.map(function (x) {
    return x.__tsil_value__;
  }));
  return _tsil2.default.deflatten(defaultValues);
};
//# sourceMappingURL=createDefaults.js.map