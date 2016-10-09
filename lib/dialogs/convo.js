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
  var otherUser = session.privateConversationData.matchAddress;


  if (response.match(/^"?pass"?$/i)) {
    session.beginDialog('/pass');
  } else if (response.match(/^"?meet"?$/i)) {
    session.beginDialog('/meet');
  } else {
    var msg = new _botbuilder2.default.Message().address(otherUser).text('Your match said: ' + response);
    _initialize.bot.send(msg);
    session.beginDialog('/convo');
  }
}];