'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _toggleUserConversationStatus = require('../lib/toggleUserConversationStatus');

var _toggleUserConversationStatus2 = _interopRequireDefault(_toggleUserConversationStatus);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = function (session) {
  var myId = session.privateConversationData.myId;

  session.send('The conversation has ended. Glad I could connect you two!');
  (0, _toggleUserConversationStatus2.default)(myId);
};