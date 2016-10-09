'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

exports.default = findMatches;

var _getModels = require('./getModels');

var _initialize = require('./initialize');

function findMatches() {
  console.log('finding matches');
  _getModels.User.find({
    inConversation: false
  }).then(function (_ref) {
    var _ref2 = _slicedToArray(_ref, 2);

    var user1 = _ref2[0];
    var user2 = _ref2[1];

    if (user1 && user2) {
      notifyMatches(user1, user2);
    }
  });
}

function notifyMatches() {
  for (var _len = arguments.length, users = Array(_len), _key = 0; _key < _len; _key++) {
    users[_key] = arguments[_key];
  }

  users.forEach(function (u, idx) {
    _getModels.User.findByIdAndUpdate(u._id, { inConversation: true }).then(function () {
      return console.log('updated ' + u._id);
    });
    var otherUser = users[Number(!idx)];
    _initialize.bot.beginDialog(u.address, '/matched', {
      matchAddress: otherUser.address,
      matchId: otherUser._id,
      myId: u._id
    });
  });
}