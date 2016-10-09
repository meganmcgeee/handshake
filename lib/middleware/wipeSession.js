'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _wipeSessionData = require('../lib/wipeSessionData');

var _wipeSessionData2 = _interopRequireDefault(_wipeSessionData);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = {
  botbuilder: function botbuilder(session, next) {
    if (session.message.text === 'reset!') {
      session.send('Resetting!');
      (0, _wipeSessionData2.default)(session);
      session.reset();
    } else {
      next();
    }
  }
};