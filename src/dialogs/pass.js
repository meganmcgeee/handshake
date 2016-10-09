import { bot } from '../lib/initialize';

export default session => {
  const { matchAddress: otherUser } = session.privateConversationData;
  session.send("Okay, I'll unmatch you from this person.");
  bot.beginDialog(otherUser, '/passed');
};
