"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = wipeSessionData;
function wipeSessionData(session) {
  /* eslint-disable */
  session.userData = {};
  session.perUserInConversationData = {};
  session.conversationData = {};
  session.privateConversationData = {};
  session.dialogData = {};
  /* eslint-enable */
}