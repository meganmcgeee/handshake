'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = toggleUserConversationStatus;

var _getModels = require('./getModels');

function toggleUserConversationStatus() {
  for (var _len = arguments.length, userIds = Array(_len), _key = 0; _key < _len; _key++) {
    userIds[_key] = arguments[_key];
  }

  return _getModels.User.remove(userIds).then(console.log).catch(console.error);
}