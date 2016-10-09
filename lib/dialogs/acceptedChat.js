'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _initialize = require('../lib/initialize');

var _botbuilder = require('botbuilder');

var _botbuilder2 = _interopRequireDefault(_botbuilder);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = [function (session) {
  _botbuilder2.default.Prompts.text(session, 'Say something!');
}, function (session, _ref) {
  var response = _ref.response;
  var _session$privateConve = session.privateConversationData;
  var myName = _session$privateConve.myName;
  var otherUser = _session$privateConve.matchAddress;


  if (response.match(/^"?done"?$/i)) {
    _initialize.bot.beginDialog(otherUser, '/done');
    session.beginDialog('/done');
  }

  var msg = new _botbuilder2.default.Message().address(otherUser).text(myName + ' said: ' + response);
  _initialize.bot.send(msg);
  session.beginDialog('/accepted-chat');
}];