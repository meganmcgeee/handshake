'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = pollForMatches;

var _findMatches = require('./findMatches');

var _findMatches2 = _interopRequireDefault(_findMatches);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function pollForMatches() {
  var seconds = function seconds(n) {
    return n * 1000;
  };
  setInterval(_findMatches2.default, seconds(10));
  (0, _findMatches2.default)();
}