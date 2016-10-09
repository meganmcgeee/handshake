import { bot } from '../lib/initialize';
import builder from 'botbuilder';

export default [
  session => {
    builder.Prompts.text(session, 'Say something!');
  },
  (session, { response }) => {
    const { matchAddress: otherUser } =
      session.privateConversationData;

    if (response.match(/^"?pass"?$/i)) {
      session.beginDialog('/pass');
    } else if (response.match(/^"?meet"?$/i)) {
      session.beginDialog('/meet');
    } else {
      const msg = new builder.Message()
        .address(otherUser)
        .text(`Your match said: ${response}`);
      bot.send(msg);
      session.beginDialog('/chat');
    }
  },
];
