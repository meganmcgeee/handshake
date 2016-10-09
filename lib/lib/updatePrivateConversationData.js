"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

exports.default = updatePrivateConversationData;
function updatePrivateConversationData(session, update) {
  // eslint-disable-next-line
  session.privateConversationData = _extends({}, session.privateConversationData, update);
}