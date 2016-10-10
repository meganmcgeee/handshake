'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _botbuilder = require('botbuilder');

var _botbuilder2 = _interopRequireDefault(_botbuilder);

var _updatePrivateConversationData = require('../lib/updatePrivateConversationData');

var _updatePrivateConversationData2 = _interopRequireDefault(_updatePrivateConversationData);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = [function (session, _ref) {
  var matchAddress = _ref.matchAddress;
  var matchId = _ref.matchId;
  var myId = _ref.myId;
  var myName = _ref.myName;

  (0, _updatePrivateConversationData2.default)(session, { matchAddress: matchAddress, matchId: matchId, myId: myId, myName: myName });
  session.send("Hey! You've been matched! Now you can chat with your match anonymously.");
  session.send('If you decide you want to meet them, say "meet" at any time.');
  session.send('If you decide you *don\'t* want to meet them, say "pass".');
  _botbuilder2.default.Prompts.text(session, 'Say something!');
}, function (session, _ref2) {
  var response = _ref2.response;

  console.log(response);
  session.beginDialog('/chat', { response: response });
}];