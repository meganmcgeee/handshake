'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _compose = require('lodash/fp/compose');

var _compose2 = _interopRequireDefault(_compose);

var _map = require('lodash/fp/map');

var _map2 = _interopRequireDefault(_map);

var _split = require('lodash/fp/split');

var _split2 = _interopRequireDefault(_split);

var _trim = require('lodash/fp/trim');

var _trim2 = _interopRequireDefault(_trim);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = (0, _compose2.default)((0, _map2.default)(_trim2.default), (0, _split2.default)(','));