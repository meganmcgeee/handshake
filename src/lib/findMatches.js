import { User } from './getModels';
import { bot } from './initialize';

export default function findMatches() {
  console.log('finding matches');
  User.find({
    inConversation: false,
  }).then(([user1, user2]) => {
    if (user1 && user2) {
      notifyMatches(user1, user2);
    }
  });
}

function notifyMatches(...users) {
  users.forEach((u, idx) => {
    User.findByIdAndUpdate(u._id, { inConversation: true })
      .then(() => console.log(`updated ${u._id}`));
    const otherUser = users[Number(!idx)];
    bot.beginDialog(u.address, '/matched', {
      matchAddress: otherUser.address,
      matchId: otherUser._id,
      myId: u._id,
    });
  });
}
