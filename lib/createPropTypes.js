'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _tsil = require('tsil');

var _tsil2 = _interopRequireDefault(_tsil);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = function (nodes) {
  var propTypes = _tsil2.default.modify(nodes, function (node) {
    return node.propType;
  });

  return _tsil2.default.deflatten(propTypes);
};
//# sourceMappingURL=createPropTypes.js.map