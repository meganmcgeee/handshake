'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.bot = exports.server = exports.connector = undefined;

var _botbuilder = require('botbuilder');

var _botbuilder2 = _interopRequireDefault(_botbuilder);

var _restify = require('restify');

var _restify2 = _interopRequireDefault(_restify);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

//= ========================================================
// Bot Setup
//= ========================================================

// Create chat bot
var connector = exports.connector = new _botbuilder2.default.ChatConnector({
  appId: process.env.MICROSOFT_APP_ID,
  appPassword: process.env.MICROSOFT_APP_PASSWORD
});
// export const connector = new builder.ConsoleConnector().listen();

// Setup Restify Server
var server = exports.server = _restify2.default.createServer();
server.listen(process.env.port || process.env.PORT || 3978, function () {
  console.log('%s listening to %s', server.name, server.url);
});
server.post('/api/messages', connector.listen());

var bot = exports.bot = new _botbuilder2.default.UniversalBot(connector, {
  persistConversationData: true
});