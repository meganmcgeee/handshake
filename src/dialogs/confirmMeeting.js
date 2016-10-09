import { bot } from '../lib/initialize';
import builder from 'botbuilder';

export default [
  session => {
    builder.Prompts.confirm(session, 'Hey, your match wants to meet. Do you accept?');
  },
  (session, { response }) => {
    const { matchAddress: otherUser } = session.privateConversationData;
    if (response) {
      session.beginDialog('/accepted');
      bot.beginDialog(otherUser, '/accepted');
    } else {
      session.send("No worries! I'll let them know.");
      bot.beginDialog(otherUser, '/passed');
    }
  },
];
