'use strict';

var _initialize = require('./lib/initialize');

var _botbuilder = require('botbuilder');

var _botbuilder2 = _interopRequireDefault(_botbuilder);

var _defaultDialog = require('./dialogs/defaultDialog');

var _defaultDialog2 = _interopRequireDefault(_defaultDialog);

var _findMatches = require('./lib/findMatches');

var _findMatches2 = _interopRequireDefault(_findMatches);

var _onboarding = require('./dialogs/onboarding');

var _onboarding2 = _interopRequireDefault(_onboarding);

var _toggleUserConversationStatus = require('./lib/toggleUserConversationStatus');

var _toggleUserConversationStatus2 = _interopRequireDefault(_toggleUserConversationStatus);

var _updatePrivateConversationData = require('./lib/updatePrivateConversationData');

var _updatePrivateConversationData2 = _interopRequireDefault(_updatePrivateConversationData);

var _wipeSessionData = require('./lib/wipeSessionData');

var _wipeSessionData2 = _interopRequireDefault(_wipeSessionData);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

//= ========================================================
// Bots Dialogs
//= ========================================================

_initialize.bot.use({
  botbuilder: function botbuilder(session, next) {
    if (session.message.text === '💩') {
      session.send('Resetting!');
      (0, _wipeSessionData2.default)(session);
      session.reset();
    } else {
      next();
    }
  }
});

_initialize.bot.dialog('/', _defaultDialog2.default);
_initialize.bot.dialog('/onboarding', _onboarding2.default);
_initialize.bot.dialog('/matched', [function (session, _ref) {
  var matchAddress = _ref.matchAddress;
  var matchId = _ref.matchId;
  var myId = _ref.myId;
  var myName = _ref.myName;

  (0, _updatePrivateConversationData2.default)(session, { matchAddress: matchAddress, matchId: matchId, myId: myId, myName: myName });
  session.send("Hey! You've been matched! Now you can chat with your match anonymously.");
  session.send('If you decide you want to meet them, say "meet" at any time.');
  session.send('If you decide you *don\'t* want to meet them, say "pass".');
  session.beginDialog('/convo');
}]);
_initialize.bot.dialog('/convo', [function (session) {
  _botbuilder2.default.Prompts.text(session, 'Say something!');
}, function (session, _ref2) {
  var response = _ref2.response;
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
}]);

_initialize.bot.dialog('/pass', function (session) {
  var otherUser = session.privateConversationData.matchAddress;

  session.send("Okay, I'll unmatch you from this person.");
  _initialize.bot.beginDialog(otherUser, '/passed');
});

_initialize.bot.dialog('/passed', function (session) {
  var _session$privateConve = session.privateConversationData;
  var matchId = _session$privateConve.matchId;
  var myId = _session$privateConve.myId;

  (0, _toggleUserConversationStatus2.default)(myId, matchId);
  session.send("Sorry to break it to you, but your match doesn't want to meet. Better luck next time!");
});

_initialize.bot.dialog('/meet', function (session) {
  var otherUser = session.privateConversationData.matchAddress;

  session.send("Okay, I'll let your match know you want to meet!");
  _initialize.bot.beginDialog(otherUser, '/confirm-meeting');
});

_initialize.bot.dialog('/confirm-meeting', [function (session) {
  _botbuilder2.default.Prompts.confirm(session, 'Hey, your match wants to meet. Do you accept?');
}, function (session, _ref3) {
  var response = _ref3.response;
  var otherUser = session.privateConversationData.matchAddress;

  if (response) {
    session.beginDialog('/accepted');
    _initialize.bot.beginDialog(otherUser, '/accepted');
  } else {
    session.send("No worries! I'll let them know.");
    _initialize.bot.beginDialog(otherUser, '/passed');
  }
}]);

_initialize.bot.dialog('/accepted', function (session) {
  session.send('Hey! Looks like you both want to meet. Chat some more and arrange a meeting! Type "end" to finish.');
  session.beginDialog('/accepted-chat');
});

_initialize.bot.dialog('/accepted-chat', [function (session) {
  _botbuilder2.default.Prompts.text(session, 'Say something!');
}, function (session, _ref4) {
  var response = _ref4.response;
  var _session$privateConve2 = session.privateConversationData;
  var myName = _session$privateConve2.myName;
  var otherUser = _session$privateConve2.matchAddress;


  var msg = new _botbuilder2.default.Message().address(otherUser).text(myName + ' said: ' + response);
  _initialize.bot.send(msg);
  session.beginDialog('/accepted-chat');
}]);

var seconds = function seconds(n) {
  return n * 1000;
};
setInterval(_findMatches2.default, seconds(10));
(0, _findMatches2.default)();