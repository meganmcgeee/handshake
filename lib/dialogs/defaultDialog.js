'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _get = require('lodash/fp/get');

var _get2 = _interopRequireDefault(_get);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = function (session) {
  console.log((0, _get2.default)('message.address', session));
  if (session.userData.name) {
    return session.send('Hey ' + session.userData.name + '! I\'m working to find a match for you now.');
  }
  return session.beginDialog('/onboarding');
};