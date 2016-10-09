'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _initialize = require('../lib/initialize');

exports.default = function (session) {
  var otherUser = session.privateConversationData.matchAddress;

  session.send("Okay, I'll let your match know you want to meet!");
  _initialize.bot.beginDialog(otherUser, '/confirm-meeting');
};