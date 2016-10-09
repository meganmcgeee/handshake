'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _initialize = require('../lib/initialize');

var _botbuilder = require('botbuilder');

var _botbuilder2 = _interopRequireDefault(_botbuilder);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = [function (session) {
  _botbuilder2.default.Prompts.confirm(session, 'Hey, your match wants to meet. Do you accept?');
}, function (session, _ref) {
  var response = _ref.response;
  var otherUser = session.privateConversationData.matchAddress;

  if (response) {
    session.beginDialog('/accepted');
    _initialize.bot.beginDialog(otherUser, '/accepted');
  } else {
    session.send("No worries! I'll let them know.");
    _initialize.bot.beginDialog(otherUser, '/passed');
  }
}];