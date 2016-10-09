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

  (0, _updatePrivateConversationData2.default)(session, { matchAddress: matchAddress, matchId: matchId, myId: myId });
  session.send("Hey! You've been matched! Now you can chat with your match anonymously.");
  session.send('If you decide you want to meet them, say "meet" at any time.');
  session.send('If you decide you *don\'t* want to meet them, say "pass".');
  session.beginDialog('/convo');
}]);
_initialize.bot.dialog('/convo', [function (session) {
  _botbuilder2.default.Prompts.text(session, 'Say something:');
}, function (session, _ref2) {
  var response = _ref2.response;
  var _session$privateConve = session.privateConversationData;
  var matchId = _session$privateConve.matchId;
  var myId = _session$privateConve.myId;
  var otherUser = _session$privateConve.matchAddress;

  if (response.match(/^"?pass"?$/i)) {
    session.send("Okay, I'll unmatch you from this person.");
    var msg = new _botbuilder2.default.Message().address(otherUser).text("Sorry to break it to you, but your match doesn't want to meet. Better luck next time!");
    _initialize.bot.send(msg);
    (0, _toggleUserConversationStatus2.default)(myId, matchId);
    session.endDialog();
  } else if (response.match(/^"?meet"?$/i)) {
    session.send("Okay, I'll let your match know you want to meet!");
    var _msg = new _botbuilder2.default.Message().address(otherUser).text('Hey, your match wants to meet. Are you down?');
    _initialize.bot.send(_msg);
  } else {
    var _msg2 = new _botbuilder2.default.Message().address(otherUser).text('Your match said: ' + response);
    _initialize.bot.send(_msg2);
    session.beginDialog('/convo');
  }
}]);

var seconds = function seconds(n) {
  return n * 1000;
};
setInterval(_findMatches2.default, seconds(10));
(0, _findMatches2.default)();