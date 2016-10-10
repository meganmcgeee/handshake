'use strict';

var _accepted = require('./dialogs/accepted');

var _accepted2 = _interopRequireDefault(_accepted);

var _acceptedChat = require('./dialogs/acceptedChat');

var _acceptedChat2 = _interopRequireDefault(_acceptedChat);

var _initialize = require('./lib/initialize');

var _chat = require('./dialogs/chat');

var _chat2 = _interopRequireDefault(_chat);

var _confirmMeeting = require('./dialogs/confirmMeeting');

var _confirmMeeting2 = _interopRequireDefault(_confirmMeeting);

var _defaultDialog = require('./dialogs/defaultDialog');

var _defaultDialog2 = _interopRequireDefault(_defaultDialog);

var _done = require('./dialogs/done');

var _done2 = _interopRequireDefault(_done);

var _matched = require('./dialogs/matched');

var _matched2 = _interopRequireDefault(_matched);

var _meet = require('./dialogs/meet');

var _meet2 = _interopRequireDefault(_meet);

var _onboarding = require('./dialogs/onboarding');

var _onboarding2 = _interopRequireDefault(_onboarding);

var _pass = require('./dialogs/pass');

var _pass2 = _interopRequireDefault(_pass);

var _passed = require('./dialogs/passed');

var _passed2 = _interopRequireDefault(_passed);

var _pollForMatches = require('./lib/pollForMatches');

var _pollForMatches2 = _interopRequireDefault(_pollForMatches);

var _wipeSession = require('./middleware/wipeSession');

var _wipeSession2 = _interopRequireDefault(_wipeSession);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

//= ========================================================
// Bots Dialogs
//= ========================================================

// Add middleware to enable wiping the user session during chat.
_initialize.bot.use(_wipeSession2.default);

_initialize.bot.dialog('/', _defaultDialog2.default);
_initialize.bot.dialog('/onboarding', _onboarding2.default);
_initialize.bot.dialog('/matched', _matched2.default);
_initialize.bot.dialog('/chat', _chat2.default);
_initialize.bot.dialog('/pass', _pass2.default);
_initialize.bot.dialog('/passed', _passed2.default);
_initialize.bot.dialog('/meet', _meet2.default);
_initialize.bot.dialog('/confirm-meeting', _confirmMeeting2.default);
_initialize.bot.dialog('/accepted', _accepted2.default);
_initialize.bot.dialog('/accepted-chat', _acceptedChat2.default);
_initialize.bot.dialog('/done', _done2.default);

// Poll for matches every 10 seconds
(0, _pollForMatches2.default)();