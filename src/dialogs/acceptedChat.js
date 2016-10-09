import { bot } from '../lib/initialize';
import builder from 'botbuilder';

export default [
  session => {
    builder.Prompts.text(session, 'Say something!');
  },
  (session, { response }) => {
    const { myName, matchAddress: otherUser } =
      session.privateConversationData;

    if (response.match(/^"?done"?$/i)) {
      bot.beginDialog(otherUser, '/done');
      session.beginDialog('/done');
    }

    const msg = new builder.Message()
      .address(otherUser)
      .text(`${myName} said: ${response}`);
    bot.send(msg);
    session.beginDialog('/accepted-chat');
  },
];
