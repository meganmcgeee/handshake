'use strict';

var _botbuilder = require('botbuilder');

var _botbuilder2 = _interopRequireDefault(_botbuilder);

var _mongoose = require('mongoose');

var _mongoose2 = _interopRequireDefault(_mongoose);

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

// Initialize database
_mongoose2.default.connect(process.env.MONGODB_URI);
var db = _mongoose2.default.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function () {
  console.log('database didnt blow up yay');
  // Mongoose Schema
  var userSchema = _mongoose2.default.Schema({
    firstName: String,
    interests: Array,
    eventID: _mongoose2.default.Schema.Types.ObjectId
  });

  // Mongoose model
  var user = _mongoose2.default.model('User', userSchema);
});

//= ========================================================
// Bots Dialogs
//= ========================================================

bot.dialog('/', function (session) {
  session.send('Hello World');
});
