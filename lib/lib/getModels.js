'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Event = exports.User = undefined;

var _bluebird = require('bluebird');

var _bluebird2 = _interopRequireDefault(_bluebird);

var _mongoose = require('mongoose');

var _mongoose2 = _interopRequireDefault(_mongoose);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// eslint-disable-next-line
_mongoose2.default.Promise = _bluebird2.default;

// Initialize database
_mongoose2.default.connect(process.env.MONGODB_URI);

var db = _mongoose2.default.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function () {
  return console.log('database is connected');
});

var userSchema = _mongoose2.default.Schema({
  address: Object,
  eventId: String,
  inConversation: Boolean,
  interests: Array,
  matchId: String,
  name: String
});

var eventSchema = _mongoose2.default.Schema({
  name: String
});

var User = exports.User = _mongoose2.default.model('User', userSchema);
var Event = exports.Event = _mongoose2.default.model('Event', eventSchema);