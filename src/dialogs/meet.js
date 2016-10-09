import { bot } from '../lib/initialize';

export default session => {
  const { matchAddress: otherUser } = session.privateConversationData;
  session.send("Okay, I'll let your match know you want to meet!");
  bot.beginDialog(otherUser, '/confirm-meeting');
};
