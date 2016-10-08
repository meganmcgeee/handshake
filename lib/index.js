'use strict';

var _botbuilder = require('botbuilder');

var _botbuilder2 = _interopRequireDefault(_botbuilder);

var _restify = require('restify');

var _restify2 = _interopRequireDefault(_restify);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

//= ========================================================
// Bot Setup
//= ========================================================

// Setup Restify Server
var server = _restify2.default.createServer();
server.listen(process.env.port || process.env.PORT || 3978, function () {
  console.log('%s listening to %s', server.name, server.url);
});

// Create chat bot
var connector = new _botbuilder2.default.ChatConnector({
  appId: process.env.MICROSOFT_APP_ID,
  appPassword: process.env.MICROSOFT_APP_PASSWORD
});
var bot = new _botbuilder2.default.UniversalBot(connector);
server.post('/api/messages', connector.listen());

//= ========================================================
// Bots Dialogs
//= ========================================================

bot.dialog('/', function (session) {
  session.send('Hello World');
});
