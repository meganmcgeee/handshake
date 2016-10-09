'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _getModels = require('../lib/getModels');

var _botbuilder = require('botbuilder');

var _botbuilder2 = _interopRequireDefault(_botbuilder);

var _arrford = require('arrford');

var _arrford2 = _interopRequireDefault(_arrford);

var _joinLines = require('../lib/joinLines');

var _joinLines2 = _interopRequireDefault(_joinLines);

var _keyBy = require('lodash/fp/keyBy');

var _keyBy2 = _interopRequireDefault(_keyBy);

var _parseInterests = require('../lib/parseInterests');

var _parseInterests2 = _interopRequireDefault(_parseInterests);

var _updateConversationData = require('../lib/updateConversationData');

var _updateConversationData2 = _interopRequireDefault(_updateConversationData);

var _updateUserData = require('../lib/updateUserData');

var _updateUserData2 = _interopRequireDefault(_updateUserData);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = [function (session) {
  session.send("Hey! I'm Handshake. I'm here to help you meet the people you really want to meet at events.");
  _botbuilder2.default.Prompts.text(session, "What's your first name?");
}, function (session, results) {
  (0, _updateUserData2.default)(session, { name: results.response });
  _getModels.Event.find({}).then(function (events) {
    (0, _updateConversationData2.default)(session, { events: events });
    _botbuilder2.default.Prompts.choice(session, 'And what event are you at now?', (0, _keyBy2.default)('name', events));
  });
}, function (session, results) {
  var events = session.conversationData.events;

  var eventId = events[results.response.index]._id;
  (0, _updateUserData2.default)(session, { eventId: eventId });
  _botbuilder2.default.Prompts.text(session, (0, _joinLines2.default)(results.response.entity + '? Sick. And what are you interested in talking about today?', '(Make it easy for me: give me a comma-separated list of interests, please!)'));
}, function (session, results) {
  var interestsList = (0, _parseInterests2.default)(results.response);
  (0, _updateUserData2.default)(session, { interests: interestsList });
  var interests = (0, _arrford2.default)(interestsList);

  createUser(session).then(console.log).catch(console.error);

  session.endDialog('Awesome. We\'ll find someone for you to chat about ' + interests + ' with!');
}];


function createUser(session) {
  var user = new _getModels.User({
    address: session.message.address,
    eventId: session.userData.eventId,
    inConversation: false,
    interests: session.userData.interests,
    name: session.userData.name
  });

  return user.save();
}