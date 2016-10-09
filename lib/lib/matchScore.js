'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = matchScore;

var _compose = require('lodash/fp/compose');

var _compose2 = _interopRequireDefault(_compose);

var _intersection = require('lodash/fp/intersection');

var _intersection2 = _interopRequireDefault(_intersection);

var _lowerCase = require('lodash/fp/lowerCase');

var _lowerCase2 = _interopRequireDefault(_lowerCase);

var _replace = require('lodash/fp/replace');

var _replace2 = _interopRequireDefault(_replace);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var normalize = (0, _compose2.default)((0, _replace2.default)(/\s+/g, ''), _lowerCase2.default);
function matchScore(interests1, interests2) {
  return (0, _intersection2.default)(interests1.map(normalize), interests2.map(normalize)).length;
}