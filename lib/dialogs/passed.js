"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _toggleUserConversationStatus = require("../lib/toggleUserConversationStatus");

var _toggleUserConversationStatus2 = _interopRequireDefault(_toggleUserConversationStatus);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = function (session) {
  var _session$privateConve = session.privateConversationData;
  var matchId = _session$privateConve.matchId;
  var myId = _session$privateConve.myId;

  (0, _toggleUserConversationStatus2.default)(myId, matchId);
  session.send("Sorry to break it to you, but your match doesn't want to meet. Better luck next time!");
};