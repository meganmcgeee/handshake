'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _join = require('lodash/fp/join');

var _join2 = _interopRequireDefault(_join);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = function () {
  for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
    args[_key] = arguments[_key];
  }

  return (0, _join2.default)('\n', args);
};