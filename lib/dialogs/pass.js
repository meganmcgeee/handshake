'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _initialize = require('../lib/initialize');

exports.default = function (session) {
  var otherUser = session.privateConversationData.matchAddress;

  session.send("Okay, I'll unmatch you from this person.");
  _initialize.bot.beginDialog(otherUser, '/passed');
};